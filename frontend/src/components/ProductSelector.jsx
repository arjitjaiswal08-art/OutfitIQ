import React, { useState } from 'react';
import { Link2, Sparkles, ShoppingBag, Loader2, Info, Check } from 'lucide-react';

export default function ProductSelector({
  selectedBrand,
  selectedProduct,
  onSelectProduct,
  onExtractUrl,
  isExtractingUrl
}) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [inputUrl, setInputUrl] = useState('');

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onExtractUrl(inputUrl);
  };

  const sampleLinks = [
    { label: "Zara Textured Overshirt", url: "https://www.zara.com/us/en/textured-relaxed-fit-overshirt-p05967550.html" },
    { label: "Nike Tech Fleece Windrunner", url: "https://www.nike.com/t/tech-fleece-windrunner-mens-full-zip-hoodie-9kK13L" },
    { label: "Uniqlo AIRism Oversized Tee", url: "https://www.uniqlo.com/us/en/products/E422992-000/00" },
    { label: "Gucci GG Supreme Web Jacket", url: "https://www.gucci.com/us/en/pr/men/ready-to-wear-for-men/jackets-for-men/gg-supreme-web-jacket" }
  ];

  return (
    <div className="wl-panel">
      {/* Product Section Header & Tab Controls */}
      <div className="wl-product-tabs">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`wl-product-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
        >
          <ShoppingBag style={{ width: 16, height: 16 }} />
          {selectedBrand?.name || "Brand"} Signature Collection ({selectedBrand?.items?.length || 0} Pieces)
        </button>

        <button
          onClick={() => setActiveTab('url')}
          className={`wl-product-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
        >
          <Link2 style={{ width: 16, height: 16 }} />
          Live Brand Product URL Scraper
        </button>

        <div style={{ marginLeft: 'auto' }}>
          <span className="wl-badge wl-badge-gold">
            {selectedBrand?.tier || "Designer House"}
          </span>
        </div>
      </div>

      {/* Tab 1: Brand Catalog Garments */}
      {activeTab === 'catalog' && (
        <div className="wl-products-grid">
          {selectedBrand?.items?.map((item) => {
            const isSelected = selectedProduct?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className={`wl-product-card ${isSelected ? 'active' : ''}`}
              >
                <div className="wl-product-thumb-wrap">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="wl-product-thumb"
                  />
                  {isSelected && (
                    <div className="wl-check-badge" style={{ top: 6, right: 6 }}>
                      <Check style={{ width: 10, height: 10, strokeWidth: 3 }} />
                    </div>
                  )}
                </div>

                <div className="wl-product-details">
                  <div>
                    <div className="wl-product-cat-row">
                      <span className="wl-product-category">{item.category}</span>
                      <span className="wl-product-price">{item.price}</span>
                    </div>
                    <div className="wl-product-title">{item.name}</div>
                    <div className="wl-product-fabric">{item.fabric}</div>
                  </div>

                  <div className="wl-product-tags">
                    <span className="wl-tag-pill">Fit: {item.fit_type}</span>
                    <span className="wl-tag-pill">Sizes: S - XL</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Live Brand URL Scraper */}
      {activeTab === 'url' && (
        <div>
          <form onSubmit={handleUrlSubmit} className="wl-url-form">
            <div className="wl-url-input-wrap">
              <Link2 className="wl-url-icon" />
              <input
                type="url"
                placeholder="Paste brand product link (e.g. https://www.zara.com/us/en/relaxed-overshirt...)"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="wl-url-input"
              />
            </div>
            <button
              type="submit"
              disabled={isExtractingUrl || !inputUrl.trim()}
              className="wl-btn-extract"
            >
              {isExtractingUrl ? (
                <>
                  <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                  Extracting Garment...
                </>
              ) : (
                <>
                  <Sparkles style={{ width: 16, height: 16 }} />
                  Extract & Load Item
                </>
              )}
            </button>
          </form>

          {/* Preset Sample Quick Links */}
          <div className="wl-url-samples">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)' }}>
              <Info style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} /> Or try live brand URLs:
            </span>
            {sampleLinks.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputUrl(sample.url);
                  onExtractUrl(sample.url);
                }}
                className="wl-sample-chip"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* Show Current Extracted Item if active */}
          {selectedProduct?.source && (
            <div style={{
              marginTop: '16px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(223, 178, 107, 0.1)',
              border: '1px solid var(--border-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  style={{ width: '56px', height: '64px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--border-gold)' }}
                />
                <div>
                  <span className="wl-product-category">{selectedProduct.brand_name} • {selectedProduct.category}</span>
                  <div className="wl-product-title" style={{ fontSize: '14px', marginTop: '2px' }}>{selectedProduct.name}</div>
                  <span className="wl-product-price" style={{ fontSize: '14px' }}>{selectedProduct.price}</span>
                </div>
              </div>
              <span className="wl-badge wl-badge-gold">
                URL EXTRACTED & READY
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
