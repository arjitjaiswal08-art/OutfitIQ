import React from 'react';
import {
  Sliders,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Activity,
  Layers,
  Camera,
  Maximize2,
  RefreshCw,
  Check
} from 'lucide-react';

export default function FitControlsPanel({
  fitStyle,
  onFitStyleChange,
  size,
  onSizeChange,
  lighting,
  onLightingChange,
  angle,
  onAngleChange,
  onRunTryOn,
  isLoading,
  tensionIndex = "50% Optimal"
}) {
  const sizes = [
    { label: 'XS', desc: '34" Chest' },
    { label: 'S', desc: '36" Chest' },
    { label: 'M', desc: '38" Chest' },
    { label: 'L', desc: '40" Chest' },
    { label: 'XL', desc: '42" Chest' },
    { label: 'XXL', desc: '44" Chest' }
  ];

  const fitStyles = [
    { id: 'tight', label: 'Tight', desc: 'Form-Fitting' },
    { id: 'regular', label: 'Regular', desc: 'Natural Drape' },
    { id: 'oversized', label: 'Oversized', desc: 'Relaxed Street' }
  ];

  const lightingModes = [
    { id: 'studio', label: 'Studio', desc: '5600K Key', icon: Sun },
    { id: 'golden_hour', label: 'Sunset', desc: '3200K Warm', icon: Sunset },
    { id: 'urban_night', label: 'Cyber Neon', desc: 'Cyan / Magenta', icon: Moon }
  ];

  const angles = [
    { id: 'front', label: 'Front (0°)', desc: 'Runway Stance' },
    { id: 'side', label: 'Side (45°)', desc: 'Profile View' },
    { id: 'mirror', label: 'Mirror', desc: 'Full Dressing Ref' }
  ];

  return (
    <div className="wl-panel" style={{ padding: '22px', marginBottom: 0 }}>
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div>
          <span className="wl-badge wl-badge-gold" style={{ marginBottom: '6px' }}>
            <Sliders style={{ width: 13, height: 13 }} /> SILHOUETTE & LIGHTING
          </span>
          <h3 className="wl-section-title" style={{ fontSize: '18px' }}>
            Garment Fitting & Perspectives
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', background: 'rgba(0, 242, 254, 0.08)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          <Activity style={{ width: 13, height: 13, color: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Strain:</span>
          <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{tensionIndex}</span>
        </div>
      </div>

      {/* 1. Size Switcher */}
      <div className="wl-control-row">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label className="wl-control-label" style={{ margin: 0 }}>Garment Size</label>
          <span style={{ fontSize: '10px', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
            Active: Size {size} ({sizes.find(s => s.label === size)?.desc})
          </span>
        </div>
        <div className="wl-segmented-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {sizes.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={() => onSizeChange(s.label)}
              className={`wl-segmented-btn ${size === s.label ? 'active' : ''}`}
              style={{ padding: '8px 2px', fontSize: '11px', fontWeight: 800 }}
              title={s.desc}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Fit Silhouette */}
      <div className="wl-control-row">
        <label className="wl-control-label">Fit Silhouette Deformation</label>
        <div className="wl-segmented-group">
          {fitStyles.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFitStyleChange(f.id)}
              className={`wl-segmented-btn ${fitStyle === f.id ? 'active' : ''}`}
            >
              <span style={{ display: 'block', fontWeight: 700 }}>{f.label}</span>
              <span style={{ fontSize: '9px', opacity: 0.75, display: 'block', marginTop: '1px' }}>{f.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. View Angle */}
      <div className="wl-control-row">
        <label className="wl-control-label">Camera Perspective</label>
        <div className="wl-segmented-group">
          {angles.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onAngleChange(a.id)}
              className={`wl-segmented-btn ${angle === a.id ? 'active-cyan' : ''}`}
            >
              <span style={{ display: 'block', fontWeight: 700 }}>{a.label}</span>
              <span style={{ fontSize: '9px', opacity: 0.75, display: 'block', marginTop: '1px' }}>{a.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Lighting Environment */}
      <div className="wl-control-row">
        <label className="wl-control-label">Photometric Radiance & Environment</label>
        <div className="wl-segmented-group">
          {lightingModes.map((l) => {
            const Icon = l.icon;
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => onLightingChange(l.id)}
                className={`wl-segmented-btn ${lighting === l.id ? 'active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <Icon style={{ width: 13, height: 13 }} />
                  <span style={{ fontWeight: 700 }}>{l.label}</span>
                </div>
                <span style={{ fontSize: '9px', opacity: 0.75, display: 'block', marginTop: '2px' }}>{l.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Virtual Try-On Render Action Button */}
      <button
        onClick={onRunTryOn}
        disabled={isLoading}
        className="wl-btn-primary"
        style={{
          marginTop: '6px',
          padding: '14px',
          fontSize: '13px',
          fontWeight: 800,
          letterSpacing: '0.6px',
          boxShadow: '0 4px 20px rgba(223, 178, 107, 0.3)'
        }}
      >
        <Sparkles style={{ width: 17, height: 17 }} />
        {isLoading ? "Synthesizing AI Try-On..." : "Render AI Virtual Try-On"}
      </button>
    </div>
  );
}
