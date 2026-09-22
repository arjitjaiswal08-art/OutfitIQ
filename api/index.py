"""
Wearlytics - AI Fashion Virtual Try-On System Backend API
"""

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
import time
import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from services.brand_catalog import get_all_brands, get_brand_by_id, find_item_by_id
from services.brand_scraper import extract_product_from_url
from services.tryon_engine import get_tryon_engine, generate_session_drm_token

app = FastAPI(
    title="Wearlytics AI Try-On API",
    version="1.0.0",
    description="Advanced Virtual Try-On System supporting 29 top fashion brands with DRM protection"
)

# Enable CORS for frontend Vite dev server and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExtractProductRequest(BaseModel):
    url: str = Field(..., description="Brand product URL from Zara, Nike, Uniqlo, etc.")

class TryOnRequest(BaseModel):
    user_image: Optional[str] = Field(None, description="Base64 encoded user photo or preset ID")
    selected_brand: str = Field("zara", description="Brand ID or Brand Name")
    product_data: Optional[Dict[str, Any]] = Field(None, description="Product metadata or item dictionary")
    product_item_id: Optional[str] = Field(None, description="Catalog product ID if selected from catalog")
    gender: str = Field("female", description="male or female")
    body_type: str = Field("regular", description="slim, regular, athletic, or plus")
    pose_preference: str = Field("same_pose", description="same_pose or auto-adjust")
    fit_style: str = Field("regular", description="tight, regular, or oversized")
    size: str = Field("M", description="S, M, L, or XL")
    lighting: str = Field("studio", description="studio, golden_hour, or urban_night")
    angle: str = Field("front", description="front, side, or mirror")
    drm_session_id: Optional[str] = Field(None, description="Client session ID for DRM token verification")

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Wearlytics AI Virtual Try-On",
        "timestamp": int(time.time()),
        "drm_protection_enabled": True
    }

@app.get("/api/brands")
def list_brands():
    """Returns all 29 supported global fashion brands and their curated garments."""
    brands = get_all_brands()
    return {
        "total_brands": len(brands),
        "brands": brands
    }

@app.get("/api/brands/{brand_id}")
def get_brand(brand_id: str):
    brand = get_brand_by_id(brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand

@app.post("/api/extract-product")
async def extract_product(req: ExtractProductRequest):
    """Scrapes product image and metadata from brand URLs."""
    if not req.url or not req.url.strip():
        raise HTTPException(status_code=400, detail="Product URL is required")
    try:
        extracted = await extract_product_from_url(req.url)
        return {
            "status": "success",
            "product": extracted
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to extract product: {str(e)}")

@app.post("/api/drm-token")
def create_drm_token():
    """Generates an ephemeral cryptographic DRM session token for secure canvas rendering."""
    token = generate_session_drm_token()
    return token

@app.post("/api/try-on")
def run_virtual_try_on(req: TryOnRequest):
    """
    Executes the neural virtual try-on pipeline:
    - Landmark extraction
    - Body segmentation
    - Cloth warping
    - Photometric harmony
    - Multi-angle generation
    - DRM security watermarking
    """
    # Resolve product
    product = req.product_data
    if not product and req.product_item_id:
        product = find_item_by_id(req.product_item_id)
    
    if not product:
        # Fallback to brand default item
        brand = get_brand_by_id(req.selected_brand)
        if brand and brand.get("items"):
            product = {**brand["items"][0], "brand_name": brand["name"], "brand_id": brand["id"]}
        else:
            default_brand = get_all_brands()[0]
            product = {**default_brand["items"][0], "brand_name": default_brand["name"], "brand_id": default_brand["id"]}

    drm_token = generate_session_drm_token()
    if req.drm_session_id:
        drm_token["session_id"] = req.drm_session_id
        drm_token["watermark_text"] = f"PREVIEW ONLY • WEARLYTICS DRM • {req.drm_session_id}"

    engine = get_tryon_engine()
    result = engine.process_tryon(
        user_image_raw=req.user_image,
        product=product,
        gender=req.gender,
        body_type=req.body_type,
        pose_preference=req.pose_preference,
        fit_style=req.fit_style,
        size=req.size,
        lighting=req.lighting,
        angle=req.angle,
        drm_token=drm_token
    )
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
