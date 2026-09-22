"""
Wearlytics Automated System Verification Suite
"""

import urllib.request
import json

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    with urllib.request.urlopen(f"{BASE_URL}/api/health") as response:
        data = json.loads(response.read().decode())
        assert data["status"] == "healthy"
        assert data["drm_protection_enabled"] is True
        print("✅ Health Check Passed:", data["service"])

def test_brands():
    with urllib.request.urlopen(f"{BASE_URL}/api/brands") as response:
        data = json.loads(response.read().decode())
        brands = data["brands"]
        assert len(brands) == 29, f"Expected 29 brands, got {len(brands)}"
        
        required_brands = [
            "Zara", "Nike", "Adidas", "Uniqlo", "Levi’s", "H&M", "Tommy Hilfiger",
            "Ralph Lauren", "Calvin Klein", "Lacoste", "Louis Vuitton", "Gucci",
            "Prada", "Armani", "Hugo Boss", "Burberry", "Versace", "Diesel",
            "Superdry", "Jack & Jones", "Gap", "Mango", "Puma", "Reebok",
            "Under Armour", "Allen Solly", "Louis Philippe", "Van Heusen", "FabIndia"
        ]
        
        found_names = [b["name"] for b in brands]
        for rb in required_brands:
            assert rb in found_names, f"Brand {rb} not found in brands list!"
            
        print(f"✅ All 29 Fashion Brands Verified ({len(brands)} total)")

def test_url_extractor():
    req_data = json.dumps({"url": "https://www.nike.com/t/tech-fleece-windrunner-mens-full-zip-hoodie-9kK13L"}).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/api/extract-product", data=req_data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        assert data["status"] == "success"
        product = data["product"]
        assert "Nike" in product["brand_name"]
        print("✅ Product URL Extractor Passed:", product["name"], "-", product["price"])

def test_virtual_tryon():
    payload = {
        "selected_brand": "gucci",
        "gender": "male",
        "body_type": "athletic",
        "pose_preference": "same_pose",
        "fit_style": "oversized",
        "size": "L",
        "lighting": "golden_hour",
        "angle": "side"
    }
    req_data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/api/try-on", data=req_data, headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        assert data["status"] == "success"
        assert "data:image/png;base64," in data["primary_image"]
        assert "data:image/png;base64," in data["before_image"]
        assert len(data["variations"]) == 3
        assert "WL-" in data["meta"]["drm_token"]["session_id"]
        print("✅ Virtual Try-On Pipeline Passed: Generated primary image & 3 variations (DRM session:", data["meta"]["drm_token"]["session_id"], ")")

def test_drm_token():
    req = urllib.request.Request(f"{BASE_URL}/api/drm-token", data=b"{}", headers={'Content-Type': 'application/json'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        assert "session_id" in data
        assert "watermark_text" in data
        print("✅ DRM Token Clearance Passed:", data["watermark_text"])

if __name__ == "__main__":
    test_health()
    test_brands()
    test_url_extractor()
    test_virtual_tryon()
    test_drm_token()
    print("\n🎉 ALL 5 INTEGRATION SUITES PASSED SUCCESSFULLY!")
