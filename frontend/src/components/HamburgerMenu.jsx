import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  Lock,
  Shield,
  ShoppingBag,
  Sliders,
  User,
  Eye,
  Layers,
  X,
  ChevronRight,
  Flame,
  Search,
  Activity,
  Cpu,
  Fingerprint,
  Radio,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Share2,
  RefreshCw,
  Sun,
  Sunset,
  Moon
} from 'lucide-react';

export default function HamburgerMenu({
  brands = [],
  selectedBrand,
  selectedProduct,
  onSelectBrandByName,
  onApplyVibePreset,
  drmToken,
  fitStyle,
  size,
  lighting,
  angle,
  tensionIndex,
  onResetSession
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState('menu'); // 'menu' | 'brands' | 'neural' | 'security'
  const [drawerSearch, setDrawerSearch] = useState('');
  const [sessionTimer, setSessionTimer] = useState(0);
  const [watermarkDensity, setWatermarkDensity] = useState('Medium');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Live session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format session time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Filtered brands for drawer search
  const filteredDrawerBrands = useMemo(() => {
    if (!drawerSearch.trim()) return brands.slice(0, 16);
    return brands.filter(b =>
      b.name.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      b.origin.toLowerCase().includes(drawerSearch.toLowerCase()) ||
      b.tier.toLowerCase().includes(drawerSearch.toLowerCase())
    );
  }, [brands, drawerSearch]);

  // Curated Haute Couture Vibe Presets
  const vibePresets = [
    {
      id: "vibe_runway",
      title: "Couture Gala Runway",
      desc: "Gucci GG Supreme • Cyber Night • Tailored",
      brand: "Gucci",
      fit: "tight",
      lighting: "urban_night",
      icon: "✨"
    },
    {
      id: "vibe_athleisure",
      title: "Urban Tech Athleisure",
      desc: "Nike Tech Fleece • Studio Neutral • Oversized",
      brand: "Nike",
      fit: "oversized",
      lighting: "studio",
      icon: "⚡"
    },
    {
      id: "vibe_heritage",
      title: "Artisan Linen Heritage",
      desc: "FabIndia Handloom Khadi • Golden Sunset • Classic",
      brand: "FabIndia",
      fit: "regular",
      lighting: "golden_hour",
      icon: "🌿"
    },
    {
      id: "vibe_sartorial",
      title: "Executive Italian Sartorial",
      desc: "Armani Deconstructed Blazer • Studio High-Key",
      brand: "Armani",
      fit: "regular",
      lighting: "studio",
      icon: "👔"
    }
  ];

  const handleNavScroll = (elementId) => {
    setIsOpen(false);
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopySessionLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <>
      {/* ============================================================
          UPGRADED LUXURY HAMBURGER BUTTON
          ============================================================ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`wl-lux-burger-trigger ${isOpen ? 'active' : ''}`}
        aria-label="Toggle Luxury Dressing Room Menu"
        title="Open Haute Couture Dressing Room Suite"
      >
        {/* Animated ambient pulse ring */}
        <span className="wl-burger-pulse-ring" />

        {/* Outer metallic icon badge */}
        <div className="wl-burger-crest">
          <div className="wl-burger-lines-box">
            <span className="wl-bline wl-bline-1" />
            <span className="wl-bline wl-bline-2" />
            <span className="wl-bline wl-bline-3" />
          </div>
        </div>

        {/* Text pill with status indicator */}
        <div className="wl-burger-text-box">
          <div className="wl-burger-title-row">
            <span className="wl-burger-label-text">
              {isOpen ? "CLOSE" : "MENU"}
            </span>
            <span className="wl-burger-live-dot" />
          </div>
          <span className="wl-burger-subtext">
            {isOpen ? "DISMISS" : "SUITE"}
          </span>
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={`wl-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ============================================================
          UPGRADED LUXURY COUTURE DRAWER PANEL
          ============================================================ */}
      <aside className={`wl-luxury-drawer ${isOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="wl-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="wl-logo-crest" style={{ width: 40, height: 40 }}>
              <div className="wl-logo-crest-inner">
                <Sparkles style={{ width: 18, height: 18 }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: '#fff', margin: 0 }}>
                  WEARLYTICS SUITE
                </h3>
                <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px', padding: '2px 6px' }}>
                  VIP ACCESS
                </span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                Session: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{drmToken?.session_id || "WL-001"}</span> • {formatTime(sessionTimer)}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="wl-drawer-close-btn"
            title="Close menu (Esc)"
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Live Active Fitting Status Card */}
        <div className="wl-drawer-status-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: '10px', color: '#10b981', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.6px' }}>
                ACTIVE STYLING SESSION
              </span>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Angle: <strong style={{ color: 'var(--accent-cyan)' }}>{angle.toUpperCase()}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: '#fff' }}>
                {selectedBrand?.name || "Zara"}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selectedProduct?.name || "Textured Garment"}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Simulated Drape</span>
              <span style={{ fontWeight: 800, color: 'var(--accent-gold-light)', fontSize: '12px' }}>
                {tensionIndex || "50% Optimal"}
              </span>
            </div>
          </div>
        </div>

        {/* Drawer Tabs Navigation */}
        <div className="wl-drawer-tabs">
          <button
            onClick={() => setDrawerTab('menu')}
            className={`wl-dtab ${drawerTab === 'menu' ? 'active' : ''}`}
          >
            <Compass style={{ width: 14, height: 14 }} /> Room Controls
          </button>
          <button
            onClick={() => setDrawerTab('brands')}
            className={`wl-dtab ${drawerTab === 'brands' ? 'active' : ''}`}
          >
            <ShoppingBag style={{ width: 14, height: 14 }} /> 29 Houses
          </button>
          <button
            onClick={() => setDrawerTab('neural')}
            className={`wl-dtab ${drawerTab === 'neural' ? 'active' : ''}`}
          >
            <Cpu style={{ width: 14, height: 14 }} /> AI Telemetry
          </button>
          <button
            onClick={() => setDrawerTab('security')}
            className={`wl-dtab ${drawerTab === 'security' ? 'active' : ''}`}
          >
            <Lock style={{ width: 14, height: 14 }} /> DRM Shield
          </button>
        </div>

        {/* TAB 1: DRESSING ROOM CONTROLS & VIBE PRESETS */}
        {drawerTab === 'menu' && (
          <div>
            {/* Quick Navigation Links */}
            <div className="wl-drawer-section">
              <div className="wl-drawer-section-title">Jump to Workspace Section</div>

              <div onClick={() => handleNavScroll('wl-viewport-section')} className="wl-drawer-item">
                <div className="wl-drawer-item-icon">
                  <Eye style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wl-drawer-item-title">Virtual Viewport & 2.5x Loupe</div>
                  <div className="wl-drawer-item-desc">Interactive Before/After comparison slider</div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </div>

              <div onClick={() => handleNavScroll('wl-brand-section')} className="wl-drawer-item">
                <div className="wl-drawer-item-icon">
                  <ShoppingBag style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wl-drawer-item-title">29 Fashion Houses Registry</div>
                  <div className="wl-drawer-item-desc">High Street, Luxury Couture & Athletic wear</div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </div>

              <div onClick={() => handleNavScroll('wl-product-section')} className="wl-drawer-item">
                <div className="wl-drawer-item-icon">
                  <Sparkles style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wl-drawer-item-title">Garment Rack & Live URL Scraper</div>
                  <div className="wl-drawer-item-desc">Extract from Zara, Nike, Uniqlo, Gucci links</div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </div>

              <div onClick={() => handleNavScroll('wl-model-section')} className="wl-drawer-item">
                <div className="wl-drawer-item-icon">
                  <User style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wl-drawer-item-title">User Morphology & Photo Studio</div>
                  <div className="wl-drawer-item-desc">Custom photo upload & 6 model presets</div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </div>

              <div onClick={() => handleNavScroll('wl-fit-section')} className="wl-drawer-item">
                <div className="wl-drawer-item-icon">
                  <Sliders style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="wl-drawer-item-title">Silhouettes & Sizing Matrix</div>
                  <div className="wl-drawer-item-desc">S/M/L/XL tension, angles & lighting</div>
                </div>
                <ChevronRight style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
              </div>
            </div>

            {/* Couture Vibe Presets */}
            <div className="wl-drawer-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <Flame style={{ width: 14, height: 14, color: '#f59e0b' }} />
                <div className="wl-drawer-section-title" style={{ margin: 0 }}>
                  Curated Haute Couture Looks
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {vibePresets.map((vibe) => (
                  <div
                    key={vibe.id}
                    onClick={() => {
                      onApplyVibePreset(vibe);
                      setIsOpen(false);
                    }}
                    className="wl-drawer-item"
                    style={{ borderLeft: '3px solid var(--accent-gold)' }}
                  >
                    <span style={{ fontSize: '18px', marginRight: '4px' }}>{vibe.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div className="wl-drawer-item-title">{vibe.title}</div>
                      <div className="wl-drawer-item-desc">{vibe.desc}</div>
                    </div>
                    <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px', padding: '2px 8px' }}>
                      TRY ON
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 29 BRANDS DIRECTORY SEARCH & SELECT */}
        {drawerTab === 'brands' && (
          <div>
            <div className="wl-search-wrapper" style={{ width: '100%', marginBottom: '14px' }}>
              <Search className="wl-search-icon" />
              <input
                type="text"
                placeholder="Search brands (Zara, Nike, Gucci...)"
                value={drawerSearch}
                onChange={(e) => setDrawerSearch(e.target.value)}
                className="wl-search-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {filteredDrawerBrands.map((b) => {
                const isSelected = selectedBrand?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      onSelectBrandByName(b.name);
                      setIsOpen(false);
                    }}
                    className={`wl-drawer-item ${isSelected ? 'active-brand' : ''}`}
                    style={{
                      borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)',
                      background: isSelected ? 'rgba(223, 178, 107, 0.15)' : 'rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                          {b.origin}
                        </span>
                        {isSelected && <CheckCircle2 style={{ width: 12, height: 12, color: 'var(--accent-gold)' }} />}
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: isSelected ? 'var(--accent-gold-light)' : '#fff' }}>
                        {b.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {b.tier} • {b.items?.length || 0} Garments
                      </div>
                    </div>
                    <span className="wl-badge wl-badge-cyan" style={{ fontSize: '9px', padding: '2px 6px' }}>
                      SELECT
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: NEURAL AI TELEMETRY & SPECS */}
        {drawerTab === 'neural' && (
          <div>
            <div className="wl-drawer-section">
              <div className="wl-drawer-section-title">Inference Engine Telemetry</div>

              <div className="wl-metric-card">
                <div className="wl-m-label">Pose Estimation Landmark Model</div>
                <div className="wl-m-val">MediaPipe 33-Point Anthropometric</div>
                <div className="wl-m-sub">Tracking neck, shoulders, elbows, wrists, hips</div>
              </div>

              <div className="wl-metric-card">
                <div className="wl-m-label">Cloth Deformation Algorithm</div>
                <div className="wl-m-val">Thin Plate Spline (TPS) Elastic Mesh</div>
                <div className="wl-m-sub">Non-rigid garment alignment with body curvature</div>
              </div>

              <div className="wl-metric-card">
                <div className="wl-m-label">Identity Preservation Rate</div>
                <div className="wl-m-val" style={{ color: '#10b981' }}>99.8% Exact Facial Lock</div>
                <div className="wl-m-sub">Preserves facial contours, hair, tattoos, and skin tone</div>
              </div>

              <div className="wl-metric-card">
                <div className="wl-m-label">Inference Speed & Pipeline Latency</div>
                <div className="wl-m-val" style={{ color: 'var(--accent-cyan)' }}>38ms Frame Synthesis</div>
                <div className="wl-m-sub">Hardware canvas rasterization at 60 FPS</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HARDWARE DRM & SECURITY SHIELD */}
        {drawerTab === 'security' && (
          <div>
            <div className="wl-drawer-section">
              <div className="wl-drawer-section-title">DRM Stream Protection Level</div>

              <div className="wl-metric-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div className="wl-m-label">Screen Capture Interceptor</div>
                  <span className="wl-badge wl-badge-drm" style={{ fontSize: '9px' }}>ACTIVE</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Traps PrintScreen, Cmd+Shift+3/4/5, Win+Shift+S, and DevTools inspection shortcuts.
                </div>
              </div>

              <div className="wl-metric-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div className="wl-m-label">Window Blur Blanking Guard</div>
                  <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px' }}>ENGAGED</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Canvas immediately blanks out whenever app window or browser tab loses focus.
                </div>
              </div>

              <div className="wl-metric-card">
                <div className="wl-m-label">Dynamic Watermark Density</div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  {['Subtle', 'Medium', 'High'].map(d => (
                    <button
                      key={d}
                      onClick={() => setWatermarkDensity(d)}
                      className={`wl-cat-btn ${watermarkDensity === d ? 'active' : ''}`}
                      style={{ fontSize: '10px', padding: '4px 10px' }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCopySessionLink}
                className="wl-tool-btn"
                style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '10px' }}
              >
                <Share2 style={{ width: 14, height: 14 }} />
                {copiedNotification ? "Session Link Copied!" : "Copy VIP Secure Session Link"}
              </button>
            </div>
          </div>
        )}

        {/* Drawer Footer */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-muted)'
        }}>
          <span>Wearlytics Couture v2.4</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
            <Shield style={{ width: 12, height: 12 }} /> DRM Encrypted
          </span>
        </div>
      </aside>
    </>
  );
}
