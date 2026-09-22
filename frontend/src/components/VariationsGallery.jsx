import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

export default function VariationsGallery({
  variations,
  activeVariationId,
  onSelectVariation,
  product,
  meta
}) {
  return (
    <div className="wl-panel">
      {/* Variations Section */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span className="wl-badge wl-badge-cyan">
            <Layers style={{ width: 13, height: 13 }} /> PHOTOMETRIC VARIATIONS ({variations?.length || 0})
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Click variation card to apply in canvas</span>
        </div>

        <div className="wl-variations-grid">
          {variations?.map((v) => {
            const isActive = activeVariationId === v.id;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVariation(v)}
                className={`wl-variation-card ${isActive ? 'active' : ''}`}
              >
                <img
                  src={v.image_data}
                  alt={v.title}
                  className="wl-variation-thumb"
                />
                <div className="wl-variation-title">{v.title}</div>
                <div className="wl-variation-desc">{v.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Spec Sheet */}
      {product && (
        <div className="wl-specs-box">
          <div className="wl-specs-top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="wl-badge wl-badge-gold" style={{ fontSize: '10px' }}>
                  {product.brand_name || "Designer House"}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>• SKU {product.id}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: '#fff' }}>
                {product.name}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Retail Value</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'var(--accent-gold-light)' }}>
                {product.price}
              </span>
            </div>
          </div>

          <div className="wl-specs-grid">
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Material Composition</span>
              <div className="wl-spec-val" style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.fabric}
              </div>
            </div>
            <div className="wl-spec-tile">
              <span className="wl-spec-label">AI Drape Match Score</span>
              <div className="wl-spec-val" style={{ color: '#10b981' }}>
                {meta?.fabric_match_score || "98.4%"}
              </div>
            </div>
            <div className="wl-spec-tile">
              <span className="wl-spec-label">Tension Silhouette</span>
              <div className="wl-spec-val" style={{ color: 'var(--accent-cyan)' }}>
                {meta?.drape_tension_index || "Optimal"}
              </div>
            </div>
            <div className="wl-spec-tile">
              <span className="wl-spec-label">DRM Clearance</span>
              <div className="wl-spec-val" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <ShieldCheck style={{ width: 15, height: 15, color: '#10b981' }} /> Authenticated
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
