import React, { useState, useEffect } from 'react';
import {
  Shirt,
  Sparkles,
  Camera,
  Rotate3d,
  Sliders,
  CheckCircle2,
  ShoppingCart,
  Share2,
  Download,
  Eye,
  Layers,
  ArrowRight,
  RefreshCw,
  Maximize2,
  CreditCard,
  ShieldCheck,
  Check,
  ExternalLink,
  Tag,
  Zap,
  ChevronRight,
  Building2,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function EcommerceTryOnFlow({
  brands = [],
  selectedBrand,
  onSelectBrand,
  selectedProduct,
  onSelectProduct,
  currentModelImage,
  userImage,
  selectedPresetId,
  onSelectPreset,
  onOpenPhotoStudio,
  size = 'M',
  onChangeSize,
  fitStyle = 'regular',
  onChangeFitStyle,
  lighting = 'studio',
  onChangeLighting,
  angle = 'front',
  onChangeAngle,
  tryonResult,
  activeImage,
  isLoading = false,
  onRunTryOn,
  quota,
  onOpenMonetization
}) {
  // Current active stage (1 to 5)
  const [activeStep, setActiveStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [torsoLength, setTorsoLength] = useState(50);
  const [shoulderWidth, setShoulderWidth] = useState(50);
  const [rotationAngle, setRotationAngle] = useState(0); // 0, 45, 90, 180
  const [view3DActive, setView3DActive] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Available categories for Step 1
  const categories = [
    { id: 'all', label: 'All', icon: Shirt },
    { id: 'tops', label: 'Tops', icon: Shirt },
    { id: 'jackets', label: 'Outerwear', icon: Layers },
    { id: 'bottoms', label: 'Pants', icon: Tag },
    { id: 'streetwear', label: 'Luxury', icon: Sparkles }
  ];

  // Filter products by active category or fallback to brand items
  const brandProducts = selectedBrand?.items || [];
  const displayProducts = selectedCategory === 'all'
    ? brandProducts
    : brandProducts.filter(item => {
        const title = (item.title || '').toLowerCase();
        if (selectedCategory === 'tops') return title.includes('shirt') || title.includes('tee') || title.includes('top');
        if (selectedCategory === 'jackets') return title.includes('jacket') || title.includes('hoodie') || title.includes('blazer');
        if (selectedCategory === 'bottoms') return title.includes('trouser') || title.includes('pant') || title.includes('jean');
        return true;
      });

  // Format currency properly handling strings or numbers without NaN
  const formatPrice = (val, curr = 'INR') => {
    if (!val) return '₹3,990';
    if (typeof val === 'string') {
      if (val.includes('₹') || val.includes('$') || val.includes('€') || val.includes('£')) {
        return val;
      }
      const num = parseFloat(val.replace(/[^0-9.]/g, ''));
      if (!isNaN(num) && num > 0) {
        return curr === 'INR' ? `₹${num.toLocaleString('en-IN')}` : `$${num}`;
      }
      return val;
    }
    if (typeof val === 'number') {
      return curr === 'INR' ? `₹${val.toLocaleString('en-IN')}` : `$${val}`;
    }
    return '₹3,990';
  };

  const activeProduct = selectedProduct || brandProducts[0] || {
    id: 'sample_01',
    title: 'Textured Relaxed Overshirt',
    name: 'Textured Relaxed Overshirt',
    price: '₹3,990',
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    color: 'Sand Beige',
    category: 'Overshirt'
  };

  const productImg = activeProduct.image || activeProduct.image_url || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80';
  const productTitle = activeProduct.title || activeProduct.name || 'Textured Relaxed Overshirt';
  const productPrice = formatPrice(activeProduct.price, activeProduct.currency);

  // Preset models for Fitting Room
  const studioModels = [
    { id: 'model_female_regular', name: 'Elena V.', gender: 'female', body: 'Regular Fit', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: 'model_male_athletic', name: 'Marcus T.', gender: 'male', body: 'Athletic Fit', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { id: 'model_female_athletic', name: 'Priya K.', gender: 'female', body: 'Athletic Fit', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { id: 'model_male_regular', name: 'David L.', gender: 'male', body: 'Classic Fit', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
  ];

  // Size chips
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Lighting choices
  const lightingOptions = [
    { id: 'studio', name: 'Studio Neutral' },
    { id: 'sunset', name: 'Golden Hour' },
    { id: 'cyber_runway', name: 'Cyber Runway' },
    { id: 'nightclub', name: 'Nightclub Neon' }
  ];

  // Handle Checkout Action
  const handleProceedToCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 5000);
  };

  // Copy look share link
  const handleCopyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Download DRM protected try-on render
  const handleDownloadRender = () => {
    const imgUrl = activeImage || tryonResult?.primary_image || currentModelImage;
    if (!imgUrl) return;
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = `wearlytics-tryon-${activeProduct.id || 'fit'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="wl-ecom-section">
      {/* 1. Header Banner */}
      <div className="wl-ecom-header">
        <div className="wl-ecom-badge">
          <Sparkles style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} />
          <span>END-TO-END VIRTUAL SHOPPING EXPERIENCE</span>
        </div>
        <h2 className="wl-ecom-title">AI GARMENT TRY-ON FLOW FOR E-COMMERCE</h2>
        <p className="wl-ecom-subtitle">Simplifying the Virtual Shopping Experience</p>
        
        {/* Step Indicator Tracker Bar */}
        <div className="wl-step-tracker">
          {[
            { num: 1, title: 'Selection' },
            { num: 2, title: 'Fitting Room' },
            { num: 3, title: 'Size & Adjust' },
            { num: 4, title: 'Visualization' },
            { num: 5, title: 'Checkout' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`wl-step-chip ${activeStep === s.num ? 'active' : ''} ${activeStep > s.num ? 'completed' : ''}`}
            >
              <span className="wl-step-num-pill">
                {activeStep > s.num ? <Check style={{ width: 11, height: 11 }} /> : s.num}
              </span>
              <span className="wl-step-chip-name">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive 5-Stage Container with Circuit Lines */}
      <div className="wl-ecom-cards-stage">
        {/* Glowing Circuit Bus SVG Background */}
        <div className="wl-circuit-line-bus" aria-hidden="true">
          <svg className="wl-circuit-svg" width="100%" height="100%" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <line x1="120" y1="20" x2="1080" y2="20" stroke="rgba(0, 242, 254, 0.25)" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="120" cy="20" r="4" fill="var(--accent-cyan)" />
            <circle cx="360" cy="20" r="4" fill="var(--accent-cyan)" />
            <circle cx="600" cy="20" r="4" fill="var(--accent-cyan)" />
            <circle cx="840" cy="20" r="4" fill="var(--accent-cyan)" />
            <circle cx="1080" cy="20" r="4" fill="var(--accent-cyan)" />
          </svg>
        </div>

        <div className="wl-flow-cards-grid">
          {/* ========================================================
              CARD 1: SELECTION
              ======================================================== */}
          <div
            className={`wl-flow-card ${activeStep === 1 ? 'active' : ''}`}
            onClick={() => setActiveStep(1)}
          >
            <div className="wl-card-header">
              <span className="wl-step-tag">1. SELECTION</span>
              <span className="wl-step-status-dot" />
            </div>

            {/* Category Icons Row */}
            <div className="wl-card-cat-icons">
              {categories.map(cat => {
                const IconComp = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory(cat.id);
                    }}
                    className={`wl-cat-icon-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                    title={cat.label}
                  >
                    <IconComp style={{ width: 14, height: 14 }} />
                  </button>
                );
              })}
            </div>

            {/* Selected Garment Miniature Card */}
            <div className="wl-card-product-box">
              <div className="wl-card-prod-img-wrap">
                <img
                  src={productImg}
                  alt={productTitle}
                  className="wl-card-prod-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <span className="wl-card-brand-pill">{selectedBrand?.name || 'Zara'}</span>
              </div>
              <div className="wl-card-prod-info">
                <h4 className="wl-card-prod-title">{productTitle}</h4>
                <div className="wl-card-prod-meta">
                  <span className="wl-card-price">{productPrice}</span>
                  <span className="wl-card-badge">{activeProduct.color || activeProduct.category || 'Standard'}</span>
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRunTryOn?.({ product: activeProduct });
                setActiveStep(2);
              }}
              className="wl-flow-btn wl-flow-btn-primary"
            >
              <span>TRY ON VIRTUALLY</span>
              <ArrowRight style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {/* ========================================================
              CARD 2: VIRTUAL FITTING ROOM
              ======================================================== */}
          <div
            className={`wl-flow-card ${activeStep === 2 ? 'active' : ''}`}
            onClick={() => setActiveStep(2)}
          >
            <div className="wl-card-header">
              <span className="wl-step-tag">2. VIRTUAL FITTING ROOM</span>
              <span className="wl-step-status-dot" />
            </div>

            {/* Holographic Wireframe Chamber */}
            <div className="wl-hologram-chamber">
              {/* Silhouette Avatar Wireframe */}
              <div className="wl-hologram-avatar">
                <svg viewBox="0 0 100 160" className="wl-avatar-wireframe-svg">
                  {/* Head */}
                  <ellipse cx="50" cy="20" rx="10" ry="13" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" />
                  {/* Neck */}
                  <line x1="50" y1="33" x2="50" y2="40" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                  {/* Shoulders */}
                  <line x1="30" y1="42" x2="70" y2="42" stroke="var(--accent-cyan)" strokeWidth="2" />
                  {/* Torso & Dress Wireframe */}
                  <polygon points="30,42 70,42 64,88 36,88" stroke="var(--accent-cyan)" strokeWidth="1.2" fill="rgba(0, 242, 254, 0.05)" />
                  <polygon points="36,88 64,88 74,130 26,130" stroke="var(--accent-cyan)" strokeWidth="1.2" strokeDasharray="3 2" fill="rgba(0, 242, 254, 0.08)" />
                  {/* Arms */}
                  <line x1="30" y1="42" x2="22" y2="85" stroke="var(--accent-cyan)" strokeWidth="1.2" />
                  <line x1="70" y1="42" x2="78" y2="85" stroke="var(--accent-cyan)" strokeWidth="1.2" />
                  {/* Legs */}
                  <line x1="42" y1="130" x2="40" y2="155" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                  <line x1="58" y1="130" x2="60" y2="155" stroke="var(--accent-cyan)" strokeWidth="1.5" />
                  {/* Keypoint nodes */}
                  <circle cx="30" cy="42" r="2.5" fill="#fff" />
                  <circle cx="70" cy="42" r="2.5" fill="#fff" />
                  <circle cx="50" cy="42" r="2.5" fill="var(--accent-gold)" />
                </svg>

                {/* Floating Tool Badges */}
                <button
                  className="wl-holo-float-btn tl"
                  title="Front / Mirror View"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeAngle?.('front');
                  }}
                >
                  <Camera style={{ width: 11, height: 11 }} />
                </button>
                <button
                  className="wl-holo-float-btn tr"
                  title="Upload Custom Photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPhotoStudio?.();
                  }}
                >
                  <Tag style={{ width: 11, height: 11 }} />
                </button>
                <button
                  className="wl-holo-float-btn bl"
                  title="Rotate Avatar"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRotationAngle(prev => (prev + 90) % 360);
                  }}
                >
                  <Rotate3d style={{ width: 11, height: 11 }} />
                </button>
                <button
                  className="wl-holo-float-btn br"
                  title="Fit Calibration"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStep(3);
                  }}
                >
                  <Sliders style={{ width: 11, height: 11 }} />
                </button>
              </div>

              {/* Model Preset Switcher Mini-Strip */}
              <div className="wl-mini-model-strip">
                {studioModels.slice(0, 3).map(m => (
                  <button
                    key={m.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPreset?.(m);
                    }}
                    className={`wl-mini-model-thumb ${selectedPresetId === m.id ? 'active' : ''}`}
                    title={`${m.name} (${m.body})`}
                  >
                    <img src={m.img} alt={m.name} />
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRunTryOn?.();
                setActiveStep(3);
              }}
              className="wl-flow-btn wl-flow-btn-secondary"
            >
              <span>{isLoading ? 'ANALYZING POSE...' : 'START TRY-ON'}</span>
              <Sparkles style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {/* ========================================================
              CARD 3: SIZE & ORIENTATION ADJUSTMENT
              ======================================================== */}
          <div
            className={`wl-flow-card ${activeStep === 3 ? 'active' : ''}`}
            onClick={() => setActiveStep(3)}
          >
            <div className="wl-card-header">
              <span className="wl-step-tag">3. SIZE & ADJUSTMENT</span>
              <span className="wl-step-status-dot" />
            </div>

            {/* Circular 3D Rotation Wheel & Wireframe Mesh */}
            <div className="wl-rotation-box">
              <div className="wl-rotation-wheel-wrap">
                <svg className="wl-rotation-circle-svg" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  <path d="M 60 10 A 50 50 0 0 1 110 60" stroke="var(--accent-cyan)" strokeWidth="2" fill="none" />
                  <polygon points="108,62 113,58 113,66" fill="var(--accent-cyan)" />
                </svg>
                <div className="wl-rotation-center-body">
                  <span className="wl-rotation-angle-badge">{rotationAngle}°</span>
                  <span className="wl-rotation-label">360° SPIN</span>
                </div>
              </div>

              {/* 360 Angle Pills */}
              <div className="wl-angle-chips-row">
                {[
                  { deg: 0, label: 'Front' },
                  { deg: 45, label: '45°' },
                  { deg: 90, label: 'Side' },
                  { deg: 180, label: 'Back' }
                ].map(item => (
                  <button
                    key={item.deg}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRotationAngle(item.deg);
                      onChangeAngle?.(item.deg === 0 ? 'front' : item.deg === 90 ? 'side' : 'front');
                    }}
                    className={`wl-angle-chip ${rotationAngle === item.deg ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector Chips (XS to XXL) */}
            <div className="wl-flow-size-container">
              <div className="wl-size-label-row">
                <span className="wl-field-title">CHOOSE SIZE</span>
                <span className="wl-fit-indicator">98% Fit Accuracy</span>
              </div>
              <div className="wl-size-chips-grid">
                {sizeOptions.map(s => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeSize?.(s);
                    }}
                    className={`wl-flow-size-chip ${size === s ? 'active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Dual Fit Sliders */}
            <div className="wl-sliders-container">
              <div className="wl-slider-row">
                <div className="wl-slider-header">
                  <span>Torso Hem</span>
                  <span>{torsoLength}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={torsoLength}
                  onChange={(e) => setTorsoLength(Number(e.target.value))}
                  className="wl-custom-range"
                />
              </div>

              <div className="wl-slider-row">
                <div className="wl-slider-header">
                  <span>Chest Drape</span>
                  <span>{shoulderWidth}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shoulderWidth}
                  onChange={(e) => setShoulderWidth(Number(e.target.value))}
                  className="wl-custom-range"
                />
              </div>
            </div>

            {/* Action CTA Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStep(4);
              }}
              className="wl-flow-btn wl-flow-btn-primary"
            >
              <span>APPLY & VISUALIZE</span>
              <ArrowRight style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {/* ========================================================
              CARD 4: VISUALIZATION
              ======================================================== */}
          <div
            className={`wl-flow-card ${activeStep === 4 ? 'active' : ''}`}
            onClick={() => setActiveStep(4)}
          >
            <div className="wl-card-header">
              <span className="wl-step-tag">4. VISUALIZATION</span>
              <span className="wl-step-status-dot" />
            </div>

            {/* Neural Try-On Render Box with Holographic Aura Cone */}
            <div className="wl-render-stage-box">
              {/* Volumetric Hologram Aura Effect */}
              <div className="wl-holo-cone-aura" aria-hidden="true" />
              
              <div className="wl-render-img-frame">
                <img
                  src={activeImage || tryonResult?.primary_image || currentModelImage}
                  alt="Virtual Try-On Result"
                  className="wl-render-main-img"
                  onError={(e) => {
                    e.currentTarget.src = currentModelImage;
                  }}
                />

                {/* DRM Security Overlay Badge */}
                <div className="wl-render-drm-tag">
                  <ShieldCheck style={{ width: 10, height: 10, color: 'var(--accent-cyan)' }} />
                  <span>PREVIEW ONLY • WEARLYTICS DRM</span>
                </div>
              </div>

              {/* Lighting Preset Switcher Bar */}
              <div className="wl-render-lighting-bar">
                {lightingOptions.map(l => (
                  <button
                    key={l.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeLighting?.(l.id);
                    }}
                    className={`wl-lighting-pill ${lighting === l.id ? 'active' : ''}`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dual Action Buttons (CAPTURE IMAGE + VIEW IN 3D) */}
            <div className="wl-vis-actions-row">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadRender();
                }}
                className="wl-vis-action-btn"
                title="Download high-resolution image"
              >
                <Download style={{ width: 12, height: 12 }} />
                <span>CAPTURE IMAGE</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setView3DActive(!view3DActive);
                }}
                className={`wl-vis-action-btn ${view3DActive ? 'active' : ''}`}
                title="Toggle 3D Holo Mesh"
              >
                <Rotate3d style={{ width: 12, height: 12 }} />
                <span>{view3DActive ? 'EXIT 3D' : 'VIEW IN 3D'}</span>
              </button>
            </div>

            {/* Step Forward Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveStep(5);
              }}
              className="wl-flow-btn wl-flow-btn-primary"
              style={{ marginTop: '10px' }}
            >
              <span>READY TO BUY</span>
              <ArrowRight style={{ width: 13, height: 13 }} />
            </button>
          </div>

          {/* ========================================================
              CARD 5: CHECKOUT
              ======================================================== */}
          <div
            className={`wl-flow-card ${activeStep === 5 ? 'active' : ''}`}
            onClick={() => setActiveStep(5)}
          >
            <div className="wl-card-header">
              <span className="wl-step-tag">5. CHECKOUT</span>
              <span className="wl-step-status-dot" />
            </div>

            {/* Success Shopping Cart Icon Badge */}
            <div className="wl-checkout-badge-wrap">
              <div className="wl-checkout-cart-circle">
                <ShoppingCart style={{ width: 22, height: 22, color: 'var(--accent-emerald)' }} />
                <div className="wl-checkout-check-dot">
                  <Check style={{ width: 10, height: 10, color: '#fff' }} />
                </div>
              </div>
              <span className="wl-checkout-brand-title">{selectedBrand?.name?.toUpperCase() || 'ZARA'} OFFICIAL</span>
            </div>

            {/* Order Specification Fields */}
            <div className="wl-checkout-fields-box">
              <div className="wl-checkout-field">
                <span className="wl-co-label">ITEM:</span>
                <span className="wl-co-val" title={productTitle}>{productTitle}</span>
              </div>
              <div className="wl-checkout-field">
                <span className="wl-co-label">SIZE:</span>
                <span className="wl-co-val">Size {size} • {fitStyle.toUpperCase()}</span>
              </div>
              <div className="wl-checkout-field">
                <span className="wl-co-label">PRICE:</span>
                <span className="wl-co-val wl-co-price">{productPrice}</span>
              </div>
              <div className="wl-checkout-field">
                <span className="wl-co-label">SHARE:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyShareLink();
                  }}
                  className="wl-co-share-btn"
                >
                  <Share2 style={{ width: 11, height: 11 }} />
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Look Link'}</span>
                </button>
              </div>
            </div>

            {/* Big Green Proceed to Checkout Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleProceedToCheckout();
              }}
              className="wl-flow-btn wl-flow-btn-checkout"
            >
              <span>{orderPlaced ? 'LOOK ORDERED!' : 'PROCEED TO CHECKOUT'}</span>
              <CreditCard style={{ width: 14, height: 14 }} />
            </button>

            {/* Payment Trust Chips */}
            <div className="wl-payment-chips-row">
              <span className="wl-pay-chip">VISA</span>
              <span className="wl-pay-chip">MC</span>
              <span className="wl-pay-chip">APPLE PAY</span>
              <span className="wl-pay-chip">GPAY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
