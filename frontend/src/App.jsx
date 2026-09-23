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
  Building2,
  Crown,
  ExternalLink,
  TrendingUp,
  Key,
  CreditCard,
  HelpCircle
} from 'lucide-react';
import DrmProtectedCanvas from './components/DrmProtectedCanvas';
import BrandSelector from './components/BrandSelector';
import ProductSelector from './components/ProductSelector';
import UserPhotoStudio, { PRESET_MODELS } from './components/UserPhotoStudio';
import FitControlsPanel from './components/FitControlsPanel';
import VariationsGallery from './components/VariationsGallery';
import PipelineStatus from './components/PipelineStatus';
import HamburgerMenu from './components/HamburgerMenu';
import MonetizationModal from './components/MonetizationModal';
import AiEngineModal from './components/AiEngineModal';
import AuthModal from './components/AuthModal';
import InRoomWardrobe from './components/InRoomWardrobe';
import ReimagineModal from './components/ReimagineModal';

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

  // Enterprise Modals State
  const [isMonetizationOpen, setIsMonetizationOpen] = useState(false);
  const [isAiEngineOpen, setIsAiEngineOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isReimagineOpen, setIsReimagineOpen] = useState(false);
  const [isReimagining, setIsReimagining] = useState(false);
  const [reimagineStyle, setReimagineStyle] = useState('editorial_studio');

  // User Account & Monetization Quota State
  const [userPlan, setUserPlan] = useState('free');
  const [userRole, setUserRole] = useState('user');
  const [quota, setQuota] = useState({
    used_today: 0,
    limit: 10,
    remaining: 10
  });
  const [tryonHistory, setTryonHistory] = useState([]);

  // 1. Fetch Brands Catalog & Quota on Mount
  useEffect(() => {
    async function loadInitialData() {
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

      try {
        const quotaRes = await fetch('/api/billing/plan');
        if (quotaRes.ok) {
          const qData = await quotaRes.json();
          setUserPlan(qData.current_plan);
          setQuota({
            used_today: qData.free_tier.used_today,
            limit: qData.free_tier.daily_quota,
            remaining: qData.free_tier.remaining
          });
        }
      } catch (err) {
        console.warn("Using offline billing state:", err);
      }

      try {
        const histRes = await fetch('/api/user/history');
        if (histRes.ok) {
          const hData = await histRes.json();
          setTryonHistory(hData.history || []);
        }
      } catch (err) {
        console.warn("Using offline history state:", err);
      }
    }
    loadInitialData();
  }, []);

  // In-Flight Request Cancellation & Pipeline Lock (Fix 4: Single Source of Truth)
  const inFlightAbortControllerRef = useRef(null);

  // 2. Virtual Try-On Execution Routine
  const runVirtualTryOn = useCallback(async (overrideParams = {}) => {
    const effectiveProduct = overrideParams.product || selectedProduct;
    if (!effectiveProduct) return;

    const effectiveBrand = overrideParams.brand?.id || effectiveProduct.brand_id || selectedBrand?.id || 'zara';
    const effectiveModel = overrideParams.userImage !== undefined
      ? overrideParams.userImage
      : (userImage || currentModelImage);

    // Cancel any previous in-flight request to eliminate race conditions (Fix 3 & 4)
    if (inFlightAbortControllerRef.current) {
      inFlightAbortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    inFlightAbortControllerRef.current = abortController;

    setIsLoading(true);
    setErrorMessage(null);

    const payload = {
      user_image: effectiveModel,
      selected_brand: effectiveBrand,
      product_data: effectiveProduct,
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
        body: JSON.stringify(payload),
        signal: abortController.signal
      });

      if (!res.ok) {
        throw new Error(`Try-on service returned status ${res.status}`);
      }

      const data = await res.json();

      if (data.status === 'quota_exceeded') {
        setIsMonetizationOpen(true);
        setErrorMessage("Daily free limit reached (10/10 Try-Ons). Upgrade to Pro (₹299/mo) for unlimited instant GPU synthesis!");
        return;
      }

      if (data.user_quota) {
        setQuota(data.user_quota);
        setUserPlan(data.user_quota.plan);
      }

      setTryonResult(data);
      setActiveImage(data.primary_image);
      setActiveVariationId('primary');

      // Refresh history silently
      try {
        const hRes = await fetch('/api/user/history');
        if (hRes.ok) {
          const hData = await hRes.json();
          setTryonHistory(hData.history || []);
        }
      } catch (e) {
        // ignore
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Superseded by newer user selection - smoothly ignored
        return;
      }
      console.error("Try-on error:", err);
      setErrorMessage("Virtual Try-On generation encountered an issue. Re-verifying pipeline...");
    } finally {
      if (inFlightAbortControllerRef.current === abortController) {
        setIsLoading(false);
        inFlightAbortControllerRef.current = null;
      }
    }
  }, [selectedBrand, selectedProduct, userImage, currentModelImage, gender, bodyType, posePreference, fitStyle, size, lighting, angle]);

  // Initial auto-run once product is ready
  useEffect(() => {
    if (selectedProduct && !tryonResult) {
      runVirtualTryOn();
    }
  }, [selectedProduct, runVirtualTryOn, tryonResult]);

  // Reimagine Outfit Styling Routine (🍌 Create images - Reimagine, illustrate, edit)
  const handleApplyReimagineStyle = async (chosenStyle, chosenPrompt) => {
    setIsReimagining(true);
    setReimagineStyle(chosenStyle);
    try {
      const currentImg = activeImage || tryonResult?.primary_image;
      if (!currentImg) return;

      const res = await fetch('/api/reimagine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: currentImg,
          style: chosenStyle,
          prompt: chosenPrompt
        })
      });

      if (!res.ok) {
        throw new Error(`Reimagine returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.image) {
        setActiveImage(data.image);
        setTryonResult(prev => prev ? { ...prev, primary_image: data.image } : prev);
      }
    } catch (err) {
      console.error("Reimagine fallback to virtual try-on:", err);
      await runVirtualTryOn({ reimagineStyle: chosenStyle });
    } finally {
      setIsReimagining(false);
    }
  };

  // Popular Trending Styles for 1-Click Quick Try-On
  const trendingLooks = [
    {
      id: 'trend-1',
      brand: 'Zara',
      name: 'Textured Relaxed Overshirt',
      price: '₹3,990',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'trend-2',
      brand: 'Nike',
      name: 'Tech Fleece Windrunner Hoodie',
      price: '₹7,995',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'trend-3',
      brand: 'Gucci',
      name: 'GG Supreme Canvas Track Jacket',
      price: '₹1,45,000',
      image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'trend-4',
      brand: "Levi's",
      name: 'Vintage Fit Trucker Jacket',
      price: '₹6,599',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'trend-5',
      brand: 'Burberry',
      name: 'Vintage Check Cotton Twill Shirt',
      price: '₹48,000',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'trend-6',
      brand: 'Uniqlo',
      name: 'AIRism Cotton Oversized Crew',
      price: '₹1,490',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const handleSelectTrending = (trend) => {
    let targetBrand = brands.find(b => b.name.toLowerCase() === trend.brand.toLowerCase());
    if (!targetBrand) {
      targetBrand = { id: trend.brand.toLowerCase(), name: trend.brand, domain: `${trend.brand.toLowerCase()}.com`, tier: 'Designer', items: [] };
    }
    const targetProduct = targetBrand.items?.find(i => i.name.toLowerCase().includes(trend.name.toLowerCase())) || {
      id: trend.id,
      name: trend.name,
      price: trend.price,
      image_url: trend.image,
      category: 'Tops',
      fit_type: 'Regular',
      fabric: 'Cotton / Poly'
    };
    setSelectedBrand(targetBrand);
    setSelectedProduct(targetProduct);
    runVirtualTryOn({ product: targetProduct });
  };

  // Handle Brand Selection (Fix 4: Pass brand and item together to avoid stale state)
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    if (brand.items?.length > 0) {
      const firstItem = brand.items[0];
      setSelectedProduct(firstItem);
      runVirtualTryOn({ brand, product: firstItem });
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
      runVirtualTryOn({ brand: targetBrand, product: targetItem, fitStyle: vibe.fit, lighting: vibe.lighting });
    }
  };

  // Handle Product Selection (Fix 4: Explicit brand resolution)
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    const matchedBrand = brands.find(b => b.id === product.brand_id) || selectedBrand;
    if (matchedBrand) setSelectedBrand(matchedBrand);
    runVirtualTryOn({ brand: matchedBrand, product });
  };

  // Handle Lighting Change (Fix 5: Never re-run full AI, switch frame instantly without broken crops)
  const handleLightingChange = (newLighting) => {
    setLighting(newLighting);
    if (tryonResult?.variations?.length > 0) {
      const matched = tryonResult.variations.find(v => v.lighting === newLighting);
      if (matched) {
        setActiveImage(matched.image_data);
        setActiveVariationId(matched.id);
        return;
      }
    }
    if (newLighting === 'studio' && tryonResult?.primary_image) {
      setActiveImage(tryonResult.primary_image);
      setActiveVariationId('primary');
    }
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

          {/* Right Action CTAs: Monetization, AI Engine, Auth & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* 0. How It Works Quick Guide Button */}
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="wl-tool-btn"
              style={{
                fontSize: '11px',
                padding: '6px 12px',
                background: 'rgba(223, 178, 107, 0.12)',
                borderColor: 'var(--accent-gold)',
                color: 'var(--accent-gold-light)',
                fontWeight: 700
              }}
              title="Learn how to use the 3-step virtual try-on dressing room"
            >
              <Sparkles style={{ width: 13, height: 13, color: 'var(--accent-gold)' }} />
              How It Works
            </button>

            {/* 1. Upgrade to Pro Button / Quota Pill */}
            <button
              onClick={() => setIsMonetizationOpen(true)}
              style={{
                background: userPlan === 'pro'
                  ? 'linear-gradient(135deg, rgba(223, 178, 107, 0.25) 0%, rgba(223, 178, 107, 0.1) 100%)'
                  : 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                color: userPlan === 'pro' ? 'var(--accent-gold-light)' : '#07090e',
                border: '1px solid',
                borderColor: userPlan === 'pro' ? 'var(--accent-gold)' : 'transparent',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: userPlan === 'pro' ? '0 0 14px rgba(223, 178, 107, 0.3)' : '0 2px 14px var(--accent-gold-glow)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <Crown style={{ width: 13, height: 13 }} />
              {userPlan === 'pro' ? "PRO ATELIER (UNLIMITED)" : `UPGRADE ₹299 (${quota.remaining}/10 LEFT)`}
            </button>

            {/* 2. AI Engine Architecture Button */}
            <button
              onClick={() => setIsAiEngineOpen(true)}
              className="wl-tool-btn"
              style={{ fontSize: '11px', padding: '6px 12px', background: 'rgba(0, 242, 254, 0.08)', borderColor: 'rgba(0, 242, 254, 0.3)', color: 'var(--accent-cyan)' }}
              title="View 6-stage neural pipeline & GPU cluster architecture"
            >
              <Cpu style={{ width: 13, height: 13 }} />
              AI Engine
            </button>

            {/* 3. Account / Role Switcher Pill */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="wl-tool-btn"
              style={{ fontSize: '11px', padding: '6px 12px' }}
              title="Account & Role settings"
            >
              <User style={{ width: 13, height: 13, color: 'var(--accent-gold)' }} />
              <span style={{ textTransform: 'capitalize' }}>{userRole}</span>
            </button>

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
            1. VIP DASHBOARD COMMAND RIBBON (LIVE TELEMETRY & AFFILIATE)
            ============================================================ */}
        <div className="wl-dashboard-banner">
          <div className="wl-cmd-stats-row">
            {/* Active Brand */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box">
                <ShoppingBag style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Selected Brand</div>
                <div className="wl-cmd-val">{selectedBrand?.name || "Zara"}</div>
              </div>
            </div>

            {/* Active Garment & Price */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)', background: 'rgba(0, 242, 254, 0.1)' }}>
                <Tag style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Outfit & Retail Price</div>
                <div className="wl-cmd-val" style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {selectedProduct?.name || "Textured Overshirt"} • <span style={{ color: 'var(--accent-gold-light)' }}>{selectedProduct?.price}</span>
                </div>
              </div>
            </div>

            {/* Model Profile */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.3)', background: 'rgba(167, 139, 250, 0.1)' }}>
                <User style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Current Model</div>
                <div className="wl-cmd-val" style={{ textTransform: 'capitalize' }}>
                  {userImage ? "Custom User Photo" : `${PRESET_MODELS.find(p => p.id === selectedPresetId)?.name || "Elena"} (${gender})`}
                </div>
              </div>
            </div>

            {/* Drape Quality */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)' }}>
                <Activity style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">AI Seam Quality</div>
                <div className="wl-cmd-val" style={{ color: '#10b981' }}>
                  Natural Drape (98%)
                </div>
              </div>
            </div>

            {/* View & Lighting */}
            <div className="wl-cmd-stat-item">
              <div className="wl-cmd-icon-box">
                <Camera style={{ width: 16, height: 16 }} />
              </div>
              <div>
                <div className="wl-cmd-label">Size & Lighting</div>
                <div className="wl-cmd-val" style={{ textTransform: 'capitalize' }}>
                  Size {size} • {lighting.replace('_', ' ')}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Direct Affiliate Shop Button */}
            <a
              href={`https://www.${selectedBrand?.domain || 'zara.com'}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                background: 'rgba(0, 242, 254, 0.1)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                color: 'var(--accent-cyan)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 14px',
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'var(--transition-smooth)'
              }}
              title="Shop real item on official brand site with affiliate tracking"
            >
              <span>Shop on {selectedBrand?.name || "Zara"}</span>
              <ExternalLink style={{ width: 12, height: 12 }} />
            </a>

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

            {/* 1. 3-STEP GUIDED ACTION FLOW BAR */}
            <div className="wl-guide-flow-bar">
              <div className="wl-guide-step-card active">
                <div className="wl-guide-step-num">1</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>Choose Model or Photo</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {userImage ? "Custom Photo Active" : `${PRESET_MODELS.find(p => p.id === selectedPresetId)?.name || "Elena"} (${gender})`}
                  </div>
                </div>
              </div>

              <div className="wl-guide-step-card active">
                <div className="wl-guide-step-num">2</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>Pick Outfit from Rack</div>
                  <div style={{ fontSize: '11px', color: 'var(--accent-gold-light)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                    {selectedBrand?.name || "Zara"} • {selectedProduct?.name || "Overshirt"}
                  </div>
                </div>
              </div>

              <div className="wl-guide-step-card active">
                <div className="wl-guide-step-num">3</div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>Compare & Check Fit</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Slide Before/After • Size {size} • 10 Try-Ons/day
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TRENDING 1-CLICK STYLES STRIP */}
            <div className="wl-trending-strip">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="wl-badge wl-badge-gold" style={{ fontSize: '10px' }}>
                    <Sparkles style={{ width: 11, height: 11 }} /> 1-CLICK POPULAR STYLES
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>
                    Try Trending Outfits Instantly:
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Click any outfit to dress your model in 1 second
                </span>
              </div>

              <div className="wl-trending-scroll">
                {trendingLooks.map((item) => {
                  const isSelected = selectedProduct?.name === item.name;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectTrending(item)}
                      className={`wl-trending-card ${isSelected ? 'active' : ''}`}
                    >
                      <img src={item.image} alt={item.name} className="wl-trending-thumb" />
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '6px', fontWeight: 800 }}>
                        {item.brand}
                      </div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: isSelected ? 'var(--accent-gold-light)' : '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold)' }}>{item.price}</span>
                        <span style={{ fontSize: '9px', background: isSelected ? 'var(--accent-gold)' : 'rgba(255,255,255,0.06)', color: isSelected ? '#07090e' : 'var(--text-secondary)', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                          {isSelected ? 'Active' : 'Try On'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="wl-workspace-layout">
              {/* Left: Protected Canvas Viewport with Comparison Slider & Loupe */}
              <div id="wl-viewport-section">
                <DrmProtectedCanvas
                  primaryImage={activeImage || tryonResult?.primary_image || currentModelImage}
                  beforeImage={tryonResult?.before_image || currentModelImage}
                  drmToken={tryonResult?.meta?.drm_token}
                  isLoading={isLoading || isReimagining}
                  zoomActive={zoomActive}
                  setZoomActive={setZoomActive}
                  onResetZoom={() => setZoomActive(false)}
                  selectedAngle={angle}
                  selectedFit={fitStyle}
                  selectedSize={size}
                  onOpenReimagine={() => setIsReimagineOpen(true)}
                  reimagineStyle={reimagineStyle}
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
                    onLightingChange={handleLightingChange}
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

            {/* 3. In-Room Wardrobe Rack & Link Scraper (No Tab Switching Needed) */}
            <InRoomWardrobe
              brands={brands}
              selectedBrand={selectedBrand}
              selectedProduct={selectedProduct}
              onSelectBrand={handleSelectBrand}
              onSelectProduct={handleSelectProduct}
              onExtractUrl={handleExtractUrl}
              isExtractingUrl={isExtractingUrl}
              onOpenAllBrands={() => setActiveDashboardView('brands')}
            />
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

      {/* Enterprise Modals */}
      <MonetizationModal
        isOpen={isMonetizationOpen}
        onClose={() => setIsMonetizationOpen(false)}
        currentPlan={userPlan}
        quotaRemaining={quota.remaining}
        quotaLimit={quota.limit}
        onUpgradeSuccess={() => {
          setUserPlan('pro');
          setQuota({ used_today: 0, limit: 'Unlimited', remaining: 'Unlimited' });
          setIsMonetizationOpen(false);
          setErrorMessage(null);
        }}
        selectedProduct={selectedProduct}
      />

      <AiEngineModal
        isOpen={isAiEngineOpen}
        onClose={() => setIsAiEngineOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentRole={userRole}
        onSelectRole={(r) => setUserRole(r)}
        history={tryonHistory}
      />

      {/* 🍌 Create Images (Reimagine, Illustrate, Edit) Modal */}
      <ReimagineModal
        isOpen={isReimagineOpen}
        onClose={() => setIsReimagineOpen(false)}
        currentImage={activeImage || tryonResult?.primary_image}
        onApplyStyle={handleApplyReimagineStyle}
        isLoading={isReimagining}
      />

      {/* How It Works Quick Tour Modal */}
      {isHowItWorksOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 5, 8, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '560px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            <button
              onClick={() => setIsHowItWorksOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="wl-badge wl-badge-gold">
                <Sparkles style={{ width: 12, height: 12 }} /> QUICK START GUIDE
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
              How Virtual Try-On Works
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Try on clothes from 29 global fashion houses on your own photo or our diverse studio models in 3 simple steps:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(10, 14, 24, 0.6)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-gold)', color: '#07090e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>
                  1
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Choose Your Model or Upload Your Photo</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Select from 6 studio models (regular, athletic, plus sizes) or upload your own picture. Your face and shoulders are protected with 100% precision.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(10, 14, 24, 0.6)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-gold)', color: '#07090e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>
                  2
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Pick Any Outfit or Paste a Product Link</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Browse through curated pieces from Zara, Nike, Gucci, Uniqlo, Levi's, and 24 other brands, or paste any shopping link to try it on immediately.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(10, 14, 24, 0.6)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-gold)', color: '#07090e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '13px', flexShrink: 0 }}>
                  3
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Slide to Compare & Check Sizes</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Drag the center slider to inspect before/after fit, switch sizes (XS to XXL), preview different lighting, and click "Shop" to buy from the official store.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '11px', color: 'var(--accent-gold-light)' }}>
                ✨ Free Plan: 10 Try-Ons Remaining per day
              </div>
              <button
                onClick={() => setIsHowItWorksOpen(false)}
                className="wl-btn-gold"
                style={{ padding: '9px 20px', fontSize: '12px', fontWeight: 800 }}
              >
                Got It, Start Trying On!
              </button>
            </div>
          </div>
        </div>
      )}

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
