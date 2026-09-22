import React from 'react';
import { Sliders, Sun, Sunset, Moon, Sparkles, Activity } from 'lucide-react';

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
  tensionIndex = "50% Tension"
}) {
  const sizes = ['S', 'M', 'L', 'XL'];
  const fitStyles = [
    { id: 'tight', label: 'Tight' },
    { id: 'regular', label: 'Regular' },
    { id: 'oversized', label: 'Oversized' }
  ];

  const lightingModes = [
    { id: 'studio', label: 'Studio', icon: Sun },
    { id: 'golden_hour', label: 'Sunset', icon: Sunset },
    { id: 'urban_night', label: 'Cyber', icon: Moon }
  ];

  const angles = [
    { id: 'front', label: 'Front (0°)' },
    { id: 'side', label: 'Side (45°)' },
    { id: 'mirror', label: 'Mirror' }
  ];

  return (
    <div className="wl-panel" style={{ padding: '20px', marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="wl-badge wl-badge-gold" style={{ marginBottom: '6px' }}>
            <Sliders style={{ width: 13, height: 13 }} /> SILHOUETTE & LIGHTING
          </span>
          <h3 className="wl-section-title" style={{ fontSize: '17px' }}>
            Garment Fitting & Perspectives
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
          <Activity style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Drape Tension:</span>
          <span style={{ fontWeight: 800, color: 'var(--accent-cyan)' }}>{tensionIndex}</span>
        </div>
      </div>

      {/* 1. Size Switcher */}
      <div className="wl-control-row">
        <label className="wl-control-label">Garment Size</label>
        <div className="wl-segmented-group">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSizeChange(s)}
              className={`wl-segmented-btn ${size === s ? 'active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Fit Silhouette */}
      <div className="wl-control-row">
        <label className="wl-control-label">Fit Silhouette</label>
        <div className="wl-segmented-group">
          {fitStyles.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onFitStyleChange(f.id)}
              className={`wl-segmented-btn ${fitStyle === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. View Angle */}
      <div className="wl-control-row">
        <label className="wl-control-label">Camera Angle & Perspective</label>
        <div className="wl-segmented-group">
          {angles.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onAngleChange(a.id)}
              className={`wl-segmented-btn ${angle === a.id ? 'active-cyan' : ''}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Lighting Environment */}
      <div className="wl-control-row">
        <label className="wl-control-label">Photometric Lighting</label>
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
                <Icon style={{ width: 13, height: 13 }} />
                <span>{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Action Button */}
      <button
        onClick={onRunTryOn}
        disabled={isLoading}
        className="wl-btn-primary"
      >
        <Sparkles style={{ width: 18, height: 18 }} />
        {isLoading ? "Synthesizing Try-On..." : "Render AI Virtual Try-On"}
      </button>
    </div>
  );
}
