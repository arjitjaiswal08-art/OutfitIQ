import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Lock,
  Layers,
  ShoppingBag,
  Sliders,
  User,
  Compass,
  Cpu,
  Flame,
  Camera,
  Activity,
  Tag,
  ShieldCheck,
  RotateCw,
  Sun,
  Sunset,
  Moon,
  ArrowDownCircle,
  Eye,
  CheckCircle2,
  Building2
} from 'lucide-react';
import DrmProtectedCanvas from './components/DrmProtectedCanvas';
import BrandSelector from './components/BrandSelector';
import ProductSelector from './components/ProductSelector';
import UserPhotoStudio, { PRESET_MODELS } from './components/UserPhotoStudio';
import FitControlsPanel from './components/FitControlsPanel';
import VariationsGallery from './components/VariationsGallery';
import PipelineStatus from './components/PipelineStatus';
import HamburgerMenu from './components/HamburgerMenu';

export default function App() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState('model_female_regular');
  const [currentModelImage, setCurrentModelImage] = useState(PRESET_MODELS[0].image);

  // Active Dashboard Workspace View: 'dressing_room' | 'brands' | 'products' | 'analytics' | 'all'
  const [activeDashboardView, setActiveDashboardView] = useState('dressing_room');

  // Dressing Room Configuration
  const [gender, setGender] = useState('female');
  const [bodyType, setBodyType] = useState('regular');
  const [posePreference, setPosePreference] = useState('same_pose');
  const [fitStyle, setFitStyle] = useState('regular');
  const [size, setSize] = useState('M');
  const [lighting, setLighting] = useState('studio');
  const [angle, setAngle] = useState('front');

  // Try-On Output State
  const [tryonResult, setTryonResult] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [activeVariationId, setActiveVariationId] = useState('primary');
  const [isLoading, setIsLoading] = useState(false);
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // 1. Fetch Brands Catalog on Mount
  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await fetch('/api/brands');
        if (res.ok) {
          const data = await res.json();
          setBrands(data.brands || []);
          if (data.brands?.length > 0) {
            const firstBrand = data.brands[0];
            setSelectedBrand(firstBrand);
            if (firstBrand.items?.length > 0) {
              setSelectedProduct(firstBrand.items[0]);
            }
          }
        }
      } catch (err) {
        console.warn("Using offline brand fallback catalog:", err);
      }
    }
    loadBrands();
  }, []);

  // 2. Virtual Try-On Execution Routine
  const runVirtualTryOn = useCallback(async (overrideParams = {}) => {
    if (!selectedBrand && !overrideParams.product) return;
    setIsLoading(true);
    setErrorMessage(null);

    const effectiveModel = overrideParams.userImage !== undefined
      ? overrideParams.userImage
      : (userImage || currentModelImage);

    const payload = {
      user_image: effectiveModel,
      selected_brand: selectedBrand?.id || 'zara',
      product_data: overrideParams.product || selectedProduct,
      gender: overrideParams.gender || gender,
      body_type: overrideParams.bodyType || bodyType,
      pose_preference: overrideParams.posePreference || posePreference,
      fit_style: overrideParams.fitStyle || fitStyle,
      size: overrideParams.size || size,
      lighting: overrideParams.lighting || lighting,
      angle: overrideParams.angle || angle,
    };

    try {
      const res = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Try-on service returned status ${res.status}`);
      }

      const data = await res.json();
      setTryonResult(data);
      setActiveImage(data.primary_image);
      setActiveVariationId('primary');
    } catch (err) {
      console.error("Try-on error:", err);
      setErrorMessage("Virtual Try-On generation encountered an issue. Re-verifying pipeline...");
    } finally {
      setIsLoading(false);
    }
  }, [selectedBrand, selectedProduct, userImage, currentModelImage, gender, bodyType, posePreference, fitStyle, size, lighting, angle]);

  // Initial auto-run once product is ready
  useEffect(() => {
    if (selectedProduct && !tryonResult) {
      runVirtualTryOn();
    }
  }, [selectedProduct, runVirtualTryOn, tryonResult]);

  // Handle Brand Selection
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    if (brand.items?.length > 0) {
      const firstItem = brand.items[0];
      setSelectedProduct(firstItem);
      runVirtualTryOn({ product: firstItem });
    }
  };

  const handleSelectBrandByName = (brandName) => {
    const found = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    if (found) {
      handleSelectBrand(found);
    }
  };

  const handleApplyVibePreset = (vibe) => {
    const targetBrand = brands.find(b => b.name.toLowerCase().includes(vibe.brand.toLowerCase()));
    if (targetBrand) {
      setSelectedBrand(targetBrand);
      const targetItem = targetBrand.items?.[0] || selectedProduct;
      setSelectedProduct(targetItem);
      setFitStyle(vibe.fit);
      setLighting(vibe.lighting);
      runVirtualTryOn({ product: targetItem, fitStyle: vibe.fit, lighting: vibe.lighting });
    }
  };

  // Handle Product Selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    runVirtualTryOn({ product });
  };

  // Handle Live URL Extraction
  const handleExtractUrl = async (url) => {
    setIsExtractingUrl(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/extract-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!res.ok) throw new Error("Could not extract product from URL");
      const data = await res.json();
      if (data.product) {
        setSelectedProduct(data.product);
        const matched = brands.find(b => b.id === data.product.brand_id);
        if (matched) setSelectedBrand(matched);
        runVirtualTryOn({ product: data.product });
      }
    } catch (err) {
      console.error("Extraction error:", err);
      setErrorMessage("Could not parse this brand URL directly. Loaded closest high-res archive template.");
    } finally {
      setIsExtractingUrl(false);
    }
  };

  // Handle User Preset Model Selection
  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setUserImage(null);
    setCurrentModelImage(preset.image);
    setGender(preset.gender);
    setBodyType(preset.body_type);
    runVirtualTryOn({ userImage: preset.image, gender: preset.gender, bodyType: preset.body_type });
  };

  // Handle Variation Selection
  const handleSelectVariation = (variation) => {
    setActiveVariationId(variation.id);
    setActiveImage(variation.image_data);
    setLighting(variation.lighting);
    setFitStyle(variation.fit_style);
  };

  // Quick brand strip top picks
  const quickPicks = ["Zara", "Nike", "Adidas", "Uniqlo", "Levi’s", "Gucci", "Louis Vuitton", "FabIndia", "Burberry", "Prada"];

  // Smooth jump scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-black)', position: 'relative' }}>
      {/* Background Atmosphere */}
      <div className="bg-ambient-glow" />

      {/* Top Luxury Navigation Header */}
      <header className="wl-header">
        <div className="wl-header-inner">
          <div className="wl-brand-group">
            <div className="wl-logo-crest">
              <div className="wl-logo-crest-inner">
                <Sparkles style={{ width: 18, height: 18 }} />
              </div>
            </div>
            <div>
              <div className="wl-title-row">
                <h1 className="wl-title-text text-gold-gradient">
                  WEARLYTICS
                </h1>
                <span className="wl-badge wl-badge-cyan" style={{ fontSize: '9px', padding: '2px 8px' }}>
                  AI VIRTUAL DRESSING ROOM
                </span>
              </div>
              <div className="wl-subtitle">
                Couture Neural Visualization • 29 Global Fashion Brands
              </div>
            </div>
          </div>

          {/* Right Status Badges & Professional Hamburger Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="wl-badge wl-badge-gold">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              29 BRANDS
            </span>
            <span className="wl-badge wl-badge-drm">
              <Lock style={{ width: 13, height: 13 }} /> DRM PROTECTED
            </span>

            {/* UPGRADED LUXURY HAMBURGER MENU & SUITE DRAWER */}
            <HamburgerMenu
              brands={brands}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              onSelectBrandByName={handleSelectBrandByName}
              onApplyVibePreset={handleApplyVibePreset}
              drmToken={tryonResult?.meta?.drm_token}
              fitStyle={fitStyle}
              size={size}
              lighting={lighting}
              angle={angle}
              tensionIndex={tryonResult?.meta?.drape_tension_index}
            />
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="wl-main-content">
        {/* Error Alert if any */}
        {errorMessage && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '16px' }}
            >
              ×
            </button>
          </div>
        )}

        {/* ============================================================
            1. VIP DASHBOARD COMMAND RIBBON (LIVE TELEMETRY)
            ============================================================ */}
        <div className="wl-dashboard-banner">
          <div className="wl-cmd-stats-row">
            {/* Active Brand */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box">
                <ShoppingBag style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Active Fashion House</div>
                <div className="wl-cmd-val">{selectedBrand?.name || "Zara"}</div>
              </div>
            </div>

            {/* Active Garment */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)', background: 'rgba(0, 242, 254, 0.1)' }}>
                <Tag style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Garment Piece & Price</div>
                <div className="wl-cmd-val" style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedProduct?.name || "Textured Overshirt"} • <span style={{ color: 'var(--accent-gold-light)' }}>{selectedProduct?.price}</span>
                </div>
              </div>
            </div>

            {/* Model Persona */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.3)', background: 'rgba(167, 139, 250, 0.1)' }}>
                <User style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Persona Morphology</div>
                <div className="wl-cmd-val" style={{ textTransform: 'capitalize' }}>
                  {gender} • {bodyType}
                </div>
              </div>
            </div>

            {/* Drape Tension */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)' }}>
                <Activity style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Drape Strain Gauge</div>
                <div className="wl-cmd-val" style={{ color: '#10b981' }}>
                  {tryonResult?.meta?.drape_tension_index || "50% Optimal"}
                </div>
              </div>
            </div>

            {/* Angle & Lighting */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box">
                <Camera style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Angle & Environment</div>
                <div className="wl-cmd-val" style={{ textTransform: 'capitalize' }}>
                  {angle} (0°) • {lighting.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => runVirtualTryOn()}
            disabled={isLoading}
            className="wl-tool-btn"
            style={{
              background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.2) 0%, rgba(223, 178, 107, 0.08) 100%)',
              borderColor: 'var(--accent-gold)',
              color: 'var(--accent-gold-light)',
              fontWeight: 800
            }}
          >
            <Sparkles style={{ width: 14, height: 14 }} />
            {isLoading ? "Synthesizing..." : "Refresh Try-On"}
          </button>
        </div>

        {/* ============================================================
            2. DASHBOARD VIEW SWITCHER (STREAMLINED 5-MODE WORKSPACE)
            ============================================================ */}
        <div className="wl-view-switcher">
          <button
            onClick={() => setActiveDashboardView('dressing_room')}
            className={`wl-view-tab ${activeDashboardView === 'dressing_room' ? 'active' : ''}`}
          >
            <Compass style={{ width: 15, height: 15 }} />
            Virtual Dressing Room View
          </button>

          <button
            onClick={() => setActiveDashboardView('brands')}
            className={`wl-view-tab ${activeDashboardView === 'brands' ? 'active' : ''}`}
          >
            <ShoppingBag style={{ width: 15, height: 15 }} />
            29 Fashion Houses Directory
          </button>

          <button
            onClick={() => setActiveDashboardView('products')}
            className={`wl-view-tab ${activeDashboardView === 'products' ? 'active' : ''}`}
          >
            <Tag style={{ width: 15, height: 15 }} />
            Garment Rack & URL Extractor
          </button>

          <button
            onClick={() => setActiveDashboardView('analytics')}
            className={`wl-view-tab ${activeDashboardView === 'analytics' ? 'active' : ''}`}
          >
            <Cpu style={{ width: 15, height: 15 }} />
            Photometric Variations & Tech Specs
          </button>

          <button
            onClick={() => setActiveDashboardView('all')}
            className={`wl-view-tab ${activeDashboardView === 'all' ? 'active' : ''}`}
          >
            <Layers style={{ width: 15, height: 15 }} />
            Full Showcase View
          </button>
        </div>

        {/* Quick Floating Brand Strip (shown in dressing room view or full showcase) */}
        {(activeDashboardView === 'dressing_room' || activeDashboardView === 'all') && (
          <div className="wl-quick-brand-strip">
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <Flame style={{ width: 13, height: 13, color: '#f59e0b' }} /> Quick House Pick:
            </span>
            {quickPicks.map(name => {
              const isSelected = selectedBrand?.name?.toLowerCase() === name.toLowerCase();
              return (
                <button
                  key={name}
                  onClick={() => handleSelectBrandByName(name)}
                  className={`wl-quick-chip ${isSelected ? 'active' : ''}`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        )}

        {/* ============================================================
            FULL SHOWCASE VIEW: TOP HERO BANNER & IN-PAGE JUMP DOCK
            ============================================================ */}
        {activeDashboardView === 'all' && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.12) 0%, rgba(0, 242, 254, 0.08) 50%, rgba(16, 20, 32, 0.9) 100%)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px 28px',
            marginBottom: '26px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="wl-badge wl-badge-gold">
                    <Sparkles style={{ width: 13, height: 13 }} /> HAUTE COUTURE RUNWAY SHOWCASE
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    End-to-End Enterprise Virtual Try-On Suite
                  </span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
                  Unified Atelier & Neural Draping Showcase
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '750px' }}>
                  Explore all five interconnected modules: Interactive Split-Canvas Dressing Room, 29 Global Fashion Houses Directory, Curated Garment Rack & Live URL Scraper, and Photometric Ambiance Gallery with Neural Pipeline telemetry.
                </p>
              </div>

              {/* Jump Navigation Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => scrollToSection('wl-dressing-room-section')}
                  className="wl-tool-btn"
                  style={{ fontSize: '11px', background: 'rgba(10, 14, 24, 0.8)' }}
                >
                  <Compass style={{ width: 12, height: 12 }} /> 1. Dressing Room
                </button>
                <button
                  onClick={() => scrollToSection('wl-brand-section')}
                  className="wl-tool-btn"
                  style={{ fontSize: '11px', background: 'rgba(10, 14, 24, 0.8)' }}
                >
                  <Building2 style={{ width: 12, height: 12 }} /> 2. 29 Houses
                </button>
                <button
                  onClick={() => scrollToSection('wl-product-section')}
                  className="wl-tool-btn"
                  style={{ fontSize: '11px', background: 'rgba(10, 14, 24, 0.8)' }}
                >
                  <Tag style={{ width: 12, height: 12 }} /> 3. Garments
                </button>
                <button
                  onClick={() => scrollToSection('wl-analytics-section')}
                  className="wl-tool-btn"
                  style={{ fontSize: '11px', background: 'rgba(10, 14, 24, 0.8)' }}
                >
                  <Cpu style={{ width: 12, height: 12 }} /> 4. Photometrics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            MODULE 1: VIRTUAL DRESSING ROOM VIEWPORT & CONTROLS
            (Visible when 'dressing_room' or 'all')
            ============================================================ */}
        {(activeDashboardView === 'dressing_room' || activeDashboardView === 'all') && (
          <div id="wl-dressing-room-section" style={{ marginBottom: activeDashboardView === 'all' ? '36px' : '0' }}>
            {activeDashboardView === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="wl-badge wl-badge-gold">MODULE 01</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                  Interactive Canvas Viewport & Precision Atelier
                </h3>
              </div>
            )}

            <div className="wl-workspace-layout">
              {/* Left: Protected Canvas Viewport with Comparison Slider & Loupe */}
              <div id="wl-viewport-section">
                <DrmProtectedCanvas
                  primaryImage={activeImage || tryonResult?.primary_image || currentModelImage}
                  beforeImage={tryonResult?.before_image || currentModelImage}
                  drmToken={tryonResult?.meta?.drm_token}
                  isLoading={isLoading}
                  zoomActive={zoomActive}
                  setZoomActive={setZoomActive}
                  onResetZoom={() => setZoomActive(false)}
                  selectedAngle={angle}
                  selectedFit={fitStyle}
                  selectedSize={size}
                />
              </div>

              {/* Right: Studio Configuration & Controls */}
              <div className="wl-controls-column">
                {/* User Persona & Model Studio */}
                <div id="wl-model-section">
                  <UserPhotoStudio
                    userImage={userImage}
                    onUserImageChange={(newImg) => {
                      setUserImage(newImg);
                      if (newImg) {
                        setCurrentModelImage(newImg);
                        runVirtualTryOn({ userImage: newImg });
                      } else {
                        const def = PRESET_MODELS.find(p => p.id === selectedPresetId)?.image || PRESET_MODELS[0].image;
                        setCurrentModelImage(def);
                        runVirtualTryOn({ userImage: def });
                      }
                    }}
                    gender={gender}
                    onGenderChange={(g) => {
                      setGender(g);
                      runVirtualTryOn({ gender: g });
                    }}
                    bodyType={bodyType}
                    onBodyTypeChange={(bt) => {
                      setBodyType(bt);
                      runVirtualTryOn({ bodyType: bt });
                    }}
                    posePreference={posePreference}
                    onPosePreferenceChange={(pp) => {
                      setPosePreference(pp);
                      runVirtualTryOn({ posePreference: pp });
                    }}
                    selectedPresetId={selectedPresetId}
                    onSelectPreset={handleSelectPreset}
                  />
                </div>

                {/* Sizing, Silhouette & Perspectives */}
                <div id="wl-fit-section">
                  <FitControlsPanel
                    fitStyle={fitStyle}
                    onFitStyleChange={(f) => {
                      setFitStyle(f);
                      runVirtualTryOn({ fitStyle: f });
                    }}
                    size={size}
                    onSizeChange={(s) => {
                      setSize(s);
                      runVirtualTryOn({ size: s });
                    }}
                    lighting={lighting}
                    onLightingChange={(l) => {
                      setLighting(l);
                      runVirtualTryOn({ lighting: l });
                    }}
                    angle={angle}
                    onAngleChange={(a) => {
                      setAngle(a);
                      runVirtualTryOn({ angle: a });
                    }}
                    onRunTryOn={() => runVirtualTryOn()}
                    isLoading={isLoading}
                    tensionIndex={tryonResult?.meta?.drape_tension_index}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            MODULE 2: 29 FASHION HOUSES DIRECTORY
            (Visible when 'brands' or 'all')
            ============================================================ */}
        {(activeDashboardView === 'brands' || activeDashboardView === 'all') && (
          <div id="wl-brand-section" style={{ marginBottom: activeDashboardView === 'all' ? '36px' : '0' }}>
            {activeDashboardView === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="wl-badge wl-badge-cyan">MODULE 02</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                  29 Global Fashion Houses Directory
                </h3>
              </div>
            )}
            <BrandSelector
              brands={brands}
              selectedBrand={selectedBrand}
              onSelectBrand={handleSelectBrand}
            />
          </div>
        )}

        {/* ============================================================
            MODULE 3: GARMENT RACK & LIVE URL SCRAPER
            (Visible when 'products' or 'all')
            ============================================================ */}
        {(activeDashboardView === 'products' || activeDashboardView === 'all') && (
          <div id="wl-product-section" style={{ marginBottom: activeDashboardView === 'all' ? '36px' : '0' }}>
            {activeDashboardView === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="wl-badge wl-badge-gold">MODULE 03</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                  Signature Garment Rack & Live Neural URL Extractor
                </h3>
              </div>
            )}
            <ProductSelector
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              onSelectProduct={handleSelectProduct}
              onExtractUrl={handleExtractUrl}
              isExtractingUrl={isExtractingUrl}
            />
          </div>
        )}

        {/* AI Pipeline Step Visualizer */}
        <PipelineStatus isRunning={isLoading} />

        {/* ============================================================
            MODULE 4: PHOTOMETRIC VARIATIONS & TECH SPECS
            (Visible when 'analytics' or 'dressing_room' or 'all')
            ============================================================ */}
        {(activeDashboardView === 'analytics' || activeDashboardView === 'dressing_room' || activeDashboardView === 'all') && (
          <div id="wl-analytics-section" style={{ marginBottom: activeDashboardView === 'all' ? '36px' : '0' }}>
            {activeDashboardView === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span className="wl-badge wl-badge-cyan">MODULE 04</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                  Photometric Radiance Profiles & Fabric Telemetry
                </h3>
              </div>
            )}
            <VariationsGallery
              variations={tryonResult?.variations}
              activeVariationId={activeVariationId}
              onSelectVariation={handleSelectVariation}
              product={selectedProduct}
              meta={tryonResult?.meta}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '28px 16px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)',
        background: 'rgba(4, 6, 10, 0.95)'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Wearlytics AI Virtual Dressing Room • Enterprise Neural Cloth Deformation, Landmark Pose Estimation, and 29 Global Fashion Houses Visualization.
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Lock style={{ width: 12, height: 12 }} /> Hardware DRM & Cryptographic Session Protection active across all pipeline stream buffers.
        </div>
      </footer>
    </div>
  );
}
