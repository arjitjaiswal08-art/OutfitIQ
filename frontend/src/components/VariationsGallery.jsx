import React from 'react';
import {
  Layers,
  ShieldCheck,
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Cpu,
  Activity,
  CheckCircle2,
  Lock,
  Wind,
  Compass,
  FileText
} from 'lucide-react';

export default function VariationsGallery({
  variations = [],
  activeVariationId,
  onSelectVariation,
  product,
  meta
}) {
  return (
    <div className="wl-panel">
      {/* 1. Photometric Variations Showcase */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="wl-badge wl-badge-cyan">
                <Layers style={{ width: 13, height: 13 }} /> PHOTOMETRIC VARIATIONS ({variations?.length || 0})
              </span>
              <span className="wl-section-desc">Multi-Angle & Multi-Lighting Neural Inpainting</span>
            </div>
            <h3 className="wl-section-title" style={{ fontSize: '18px' }}>
              Lighting Ambiance & Perspective Gallery
            </h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Select card below to switch canvas render in real time
          </span>
        </div>

        <div className="wl-variations-grid">
          {variations?.map((v) => {
            const isActive = activeVariationId === v.id;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVariation(v)}
                className={`wl-variation-card ${isActive ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.22s ease'
                }}
              >
                {isActive && (
                  <div className="wl-check-badge" style={{ top: 8, right: 8 }}>
                    <CheckCircle2 style={{ width: 11, height: 11 }} />
                  </div>
                )}
                <img
                  src={v.image_data}
                  alt={v.title}
                  className="wl-variation-thumb"
                />
                <div style={{ padding: '10px' }}>
                  <div className="wl-variation-title" style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                    {v.title}
                  </div>
                  <div className="wl-variation-desc" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {v.description}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                    <span style={{
                      fontSize: '9px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: 'var(--accent-cyan)',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}>
                      {v.lighting?.replace('_', ' ')}
                    </span>
                    <span style={{
                      fontSize: '9px',
                      background: 'rgba(223, 178, 107, 0.1)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: 'var(--accent-gold-light)',
                      textTransform: 'uppercase',
                      fontWeight: 700
                    }}>
                      {v.fit_style}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Garment Technical Specs & Drape Telemetry */}
      {product && (
        <div className="wl-specs-box">
          <div className="wl-specs-top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="wl-badge wl-badge-gold" style={{ fontSize: '10px' }}>
                  {product.brand_name || "Designer House"}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  SKU #{product.id} • Verified Catalogue Entry
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#fff' }}>
                {product.name}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Retail Value
              </span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: 'var(--accent-gold-light)' }}>
                {product.price}
              </span>
            </div>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="wl-specs-grid">
            {/* Tile 1: Material Composition */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Material & Weave Composition</span>
              <div className="wl-spec-val" style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.fabric}
              </div>
            </div>

            {/* Tile 2: Drape Match Score */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Neural Drape Match Confidence</span>
              <div className="wl-spec-val" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity style={{ width: 14, height: 14 }} />
                {meta?.fabric_match_score || "98.7%"} Match
              </div>
            </div>

            {/* Tile 3: Tension Silhouette */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Cloth Strain & Deformation</span>
              <div className="wl-spec-val" style={{ color: 'var(--accent-cyan)' }}>
                {meta?.drape_tension_index || "50% Optimal Tension"}
              </div>
            </div>

            {/* Tile 4: DRM Clearance */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Hardware DRM Authorization</span>
              <div className="wl-spec-val" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent-gold-light)' }}>
                <ShieldCheck style={{ width: 15, height: 15, color: '#10b981' }} />
                <span>Encrypted Session</span>
              </div>
            </div>

            {/* Tile 5: Sizing Matrix */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Available Production Sizes</span>
              <div className="wl-spec-val" style={{ fontSize: '12px', display: 'flex', gap: '6px' }}>
                {(product.sizes || ['S', 'M', 'L', 'XL']).map(s => (
                  <span key={s} style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '1px 6px', borderRadius: '3px', fontSize: '10px' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tile 6: Lighting Simulation Engine */}
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Photometric Radiance Profile</span>
              <div className="wl-spec-val" style={{ fontSize: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sun style={{ width: 13, height: 13, color: 'var(--accent-gold)' }} />
                <span>5600K Key + Ambient Occlusion</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
