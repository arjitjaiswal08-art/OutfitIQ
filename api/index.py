"""
Wearlytics - AI Fashion Virtual Try-On System Backend API (Vercel Serverless Ready)
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def vercel_routing_middleware(request: Request, call_next):
    route = request.query_params.get("__route__")
    if route is not None:
        clean = route.strip("/")
        request.scope["path"] = f"/api/{clean}" if clean else "/api"
    response = await call_next(request)
    return response

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

@app.get("/")
@app.get("/api")
@app.get("/api/")
def root_info():
    return {
        "service": "Wearlytics AI Virtual Try-On API",
        "status": "online",
        "version": "1.0.0",
        "brands_supported": 29
    }

@app.get("/health")
@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Wearlytics AI Virtual Try-On",
        "timestamp": int(time.time()),
        "drm_protection_enabled": True
    }

@app.get("/brands")
@app.get("/api/brands")
def list_brands():
    brands = get_all_brands()
    return {
        "total_brands": len(brands),
        "brands": brands
    }

@app.get("/brands/{brand_id}")
@app.get("/api/brands/{brand_id}")
def get_brand(brand_id: str):
    brand = get_brand_by_id(brand_id)
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return brand

@app.post("/extract-product")
@app.post("/api/extract-product")
async def extract_product(req: ExtractProductRequest):
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

@app.get("/drm-token")
@app.post("/drm-token")
@app.get("/api/drm-token")
@app.post("/api/drm-token")
def create_drm_token():
    token = generate_session_drm_token()
    return token

@app.post("/try-on")
@app.post("/api/try-on")
def run_virtual_try_on(req: TryOnRequest):
    product = req.product_data
    if not product and req.product_item_id:
        product = find_item_by_id(req.product_item_id)
    
    if not product:
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
