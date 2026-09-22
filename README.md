# Wearlytics — Advanced AI Fashion Virtual Try-On System

Wearlytics is an enterprise AI-powered virtual dressing room that allows users to visualize how clothes from 29 real-world fashion brands look on them using their uploaded photo or diverse studio model presets.

---

## 🌟 Key Features

### 1. Multi-Brand Support (All 29 Requested Brands)
- **Zara, Nike, Adidas, Uniqlo, Levi’s, H&M, Tommy Hilfiger, Ralph Lauren, Calvin Klein, Lacoste, Louis Vuitton, Gucci, Prada, Armani, Hugo Boss, Burberry, Versace, Diesel, Superdry, Jack & Jones, Gap, Mango, Puma, Reebok, Under Armour, Allen Solly, Louis Philippe, Van Heusen, FabIndia**.
- Curated brand catalogues with high-resolution garments, fabric specs, prices, and fit silhouettes.
- **Live Product URL Extractor**: Paste any product link (from Zara, Nike, Uniqlo, etc.) to extract garment metadata, title, and image.

### 2. Neural Virtual Try-On Pipeline
- **Human Pose Estimation**: Landmark detection for shoulders, neck, chest, waist, and hips.
- **Identity & Facial Preservation**: Locks facial features, hair, skin tones, and bodily proportions.
- **Deformable Mesh Warping**: Thin Plate Spline / elastic deformation matching garment dimensions to torso keypoints.
- **Realistic Fabric Shading**: Dynamic crease generation, natural folds, drop shadows, and ambient occlusion.
- **Garment Sizing (S / M / L / XL)** & **Fit Silhouettes (Tight / Regular / Oversized)** with real-time simulated drape tension indicators.
- **Multi-Angle Perspectives**: Front (0°), Side Angle (45°), and Mirror Depth views.
- **Multi-Lighting Variations**: Studio Neutral, Golden Hour Warm Glow, and Cyber Runway Neon.

### 3. Strict DRM & Screenshot Protection
- ❌ **No Downloading / Saving**: Right-click context menus, image dragging, long-press saves, and inspector saves are disabled.
- ❌ **Anti-Screenshot Shield**:
  - Traps keyboard shortcuts (`PrintScreen`, `Cmd+Shift+3/4/5`, `Win+Shift+S`, `Ctrl+Shift+I`).
  - Active detection of `window.blur` and `document.visibilitychange` (switching windows or apps) immediately blurs and blacks out the canvas with the security warning: *"⚠️ SCREEN CAPTURE BLOCKED - PREVIEW PROTECTED"*.
- ❌ **Dynamic Moving Watermarks**: Real-time ticker: `"PREVIEW ONLY • WEARLYTICS DRM • [SESSION_ID] • [LIVE TIMESTAMP]"` rendered directly onto canvas pixel buffers.
- ❌ **Hardware Canvas Rendering**: Try-on images are rendered exclusively into an obfuscated HTML5 canvas rather than exposing raw `<img>` files.

### 4. Interactive Luxury Dressing Room UI
- **Before / After Comparison Slider**: Smooth 60fps draggable slider to swipe between the user's original photo and the AI virtual try-on.
- **2.5x Inspection Loupe**: Circular magnifying lens to inspect fabric weave, stitching, logos, and shadow details.
- **Photometric Variations Gallery**: Switch between Studio, Golden Hour, and Cyber Runway lighting setups.
- **AI Pipeline Step Visualizer**: Real-time progress tracker across all 5 neural processing stages.

---

## 🚀 Running the System

### Start the Backend (FastAPI):
```bash
cd backend
python3 -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation is available at `http://127.0.0.1:8000/docs`.

### Start the Frontend (Vite + React):
```bash
cd frontend
npm run dev
```
Open `http://127.0.0.1:5173` in your browser to access the dressing room.

---

## 🧪 Verification & Tests

Run the automated test suite:
```bash
python3 test_system.py
```
Validates:
- Health check
- 29 Brand catalogue completeness
- Live product URL extractor
- Virtual Try-On pipeline execution & variations
- Cryptographic DRM token generation
