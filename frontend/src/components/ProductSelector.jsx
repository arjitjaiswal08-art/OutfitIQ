import React, { useState, useMemo } from 'react';
import {
  Link2,
  Sparkles,
  ShoppingBag,
  Loader2,
  Info,
  Check,
  Tag,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Layers,
  Scissors
} from 'lucide-react';

export default function ProductSelector({
  selectedBrand,
  selectedProduct,
  onSelectProduct,
  onExtractUrl,
  isExtractingUrl
}) {
  const [activeTab, setActiveTab] = useState('catalog');
  const [inputUrl, setInputUrl] = useState('');
  const [garmentFilter, setGarmentFilter] = useState('All');

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onExtractUrl(inputUrl);
  };

  const sampleLinks = [
    {
      brand: "Zara",
      label: "Textured Relaxed Overshirt",
      url: "https://www.zara.com/us/en/textured-relaxed-fit-overshirt-p05967550.html"
    },
    {
      brand: "Nike",
      label: "Tech Fleece Windrunner Hoodie",
      url: "https://www.nike.com/t/tech-fleece-windrunner-mens-full-zip-hoodie-9kK13L"
    },
    {
      brand: "Uniqlo",
      label: "AIRism Cotton Oversized Crew",
      url: "https://www.uniqlo.com/us/en/products/E422992-000/00"
    },
    {
      brand: "Gucci",
      label: "GG Supreme Canvas Track Jacket",
      url: "https://www.gucci.com/us/en/pr/men/ready-to-wear-for-men/jackets-for-men/gg-supreme-web-jacket"
    },
    {
      brand: "Burberry",
      label: "Vintage Check Cotton Twill Shirt",
      url: "https://us.burberry.com/vintage-check-cotton-shirt-p80106401"
    },
    {
      brand: "Levi's",
      label: "Vintage Fit Trucker Jacket",
      url: "https://www.levi.com/US/en_US/clothing/men/outerwear/vintage-fit-trucker-jacket/p/773800015"
    }
  ];

  // Unique categories within current brand
  const items = selectedBrand?.items || [];
  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category));
    return ['All', ...Array.from(cats)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (garmentFilter === 'All') return items;
    return items.filter(i => i.category === garmentFilter);
  }, [items, garmentFilter]);

  return (
    <div className="wl-panel">
      {/* 1. Header Navigation Tabs */}
      <div className="wl-product-tabs">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`wl-product-tab-btn ${activeTab === 'catalog' ? 'active' : ''}`}
        >
          <ShoppingBag style={{ width: 16, height: 16 }} />
          <span>{selectedBrand?.name || "Brand"} Garment Rack</span>
          <span style={{
            fontSize: '11px',
            background: 'rgba(223, 178, 107, 0.15)',
            color: 'var(--accent-gold-light)',
            padding: '2px 8px',
            borderRadius: '12px',
            fontWeight: 800
          }}>
            {items.length} Curated Pieces
          </span>
        </button>

        <button
          onClick={() => setActiveTab('url')}
          className={`wl-product-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
        >
          <Link2 style={{ width: 16, height: 16 }} />
          <span>Neural Brand URL Extractor</span>
          <span className="wl-badge wl-badge-cyan" style={{ fontSize: '9px', padding: '1px 6px' }}>
            Direct DOM Scraper
          </span>
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="wl-badge wl-badge-gold">
            {selectedBrand?.tier || "Designer House"}
          </span>
          {selectedBrand?.domain && (
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {selectedBrand.domain}
            </span>
          )}
        </div>
      </div>

      {/* 2. TAB 1: Brand Catalog Garment Rack */}
      {activeTab === 'catalog' && (
        <div>
          {/* Sub-category Filter Tabs if brand has multiple garment types */}
          {categories.length > 2 && (
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setGarmentFilter(cat)}
                  style={{
                    background: garmentFilter === cat ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
                    color: garmentFilter === cat ? '#07090e' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: garmentFilter === cat ? 'var(--accent-gold)' : 'var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Garments Grid */}
          <div className="wl-products-grid">
            {filteredItems.map((item) => {
              const isSelected = selectedProduct?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className={`wl-product-card ${isSelected ? 'active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    background: isSelected ? 'rgba(223, 178, 107, 0.09)' : 'rgba(12, 16, 26, 0.75)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative'
                  }}
                >
                  {/* Garment Thumbnail */}
                  <div className="wl-product-thumb-wrap" style={{ width: '84px', height: '104px', borderRadius: 'var(--radius-sm)' }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="wl-product-thumb"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="wl-check-badge" style={{ top: 6, right: 6 }}>
                        <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                      </div>
                    )}
                  </div>

                  {/* Garment Details */}
                  <div className="wl-product-details" style={{ flex: 1, minWidth: 0 }}>
                    <div>
                      <div className="wl-product-cat-row">
                        <span className="wl-product-category">{item.category}</span>
                        <span className="wl-product-price" style={{ fontSize: '14px', fontWeight: 800 }}>
                          {item.price}
                        </span>
                      </div>
                      <div className="wl-product-title" style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                        {item.name}
                      </div>
                      <div className="wl-product-fabric" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.fabric}
                      </div>
                    </div>

                    {/* Tags & Quick Try-On Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', flexWrap: 'wrap', gap: '6px' }}>
                      <div className="wl-product-tags" style={{ margin: 0 }}>
                        <span className="wl-tag-pill" style={{ fontSize: '9px' }}>
                          Fit: {item.fit_type}
                        </span>
                        {item.color && (
                          <span className="wl-tag-pill" style={{ fontSize: '9px' }}>
                            {item.color}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(item);
                        }}
                        style={{
                          background: isSelected ? 'var(--accent-gold)' : 'rgba(223, 178, 107, 0.15)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--accent-gold)' : 'rgba(223, 178, 107, 0.4)',
                          color: isSelected ? '#07090e' : 'var(--accent-gold-light)',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-xs)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'var(--transition-smooth)'
                        }}
                      >
                        <Sparkles style={{ width: 10, height: 10 }} />
                        {isSelected ? 'Active Garment' : 'Try On'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. TAB 2: Live Brand URL Scraper */}
      {activeTab === 'url' && (
        <div>
          <div style={{
            background: 'rgba(8, 12, 20, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Tag style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                Universal E-Commerce Product Extractor
              </span>
              <span className="wl-badge wl-badge-cyan" style={{ fontSize: '9px', padding: '1px 6px' }}>
                Automated DOM Parser
              </span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
              Paste any product URL from Zara, Nike, Uniqlo, Gucci, Burberry, or any major fashion retailer. Our serverless scraper extracts the high-resolution product imagery, fabric compositions, and sizing specifications for instant virtual draping.
            </p>

            <form onSubmit={handleUrlSubmit} className="wl-url-form" style={{ marginBottom: '12px' }}>
              <div className="wl-url-input-wrap">
                <Link2 className="wl-url-icon" />
                <input
                  type="url"
                  placeholder="https://www.zara.com/us/en/textured-relaxed-fit-overshirt..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="wl-search-input"
                  style={{ paddingLeft: '38px', width: '100%' }}
                />
              </div>
              <button
                type="submit"
                disabled={isExtractingUrl || !inputUrl.trim()}
                className="wl-btn-primary"
                style={{
                  width: 'auto',
                  padding: '0 20px',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  fontWeight: 800
                }}
              >
                {isExtractingUrl ? (
                  <>
                    <Loader2 style={{ width: 15, height: 15, animation: 'spin 1s linear infinite' }} />
                    Extracting Garment...
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: 15, height: 15 }} />
                    Extract & Try On
                  </>
                )}
              </button>
            </form>

            {/* Quick 1-Click Sample Links */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Info style={{ width: 13, height: 13, color: 'var(--accent-cyan)' }} />
                Quick Test Links (Click to load):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {sampleLinks.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputUrl(sample.url);
                      onExtractUrl(sample.url);
                    }}
                    disabled={isExtractingUrl}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent-gold-light)', display: 'block' }}>
                        {sample.brand}
                      </span>
                      <span style={{ fontSize: '11px', color: '#fff', fontWeight: 600 }}>
                        {sample.label}
                      </span>
                    </div>
                    <ArrowRight style={{ width: 13, height: 13, color: 'var(--text-muted)' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Extracted Product Summary Card */}
          {selectedProduct?.source && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.12) 0%, rgba(0, 242, 254, 0.06) 100%)',
              border: '1px solid var(--border-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  style={{
                    width: '64px',
                    height: '76px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover',
                    border: '1px solid var(--border-gold)'
                  }}
                />
                <div>
                  <span className="wl-product-category">
                    {selectedProduct.brand_name || "Extracted Brand"} • {selectedProduct.category}
                  </span>
                  <div className="wl-product-title" style={{ fontSize: '15px', color: '#fff', marginTop: '2px' }}>
                    {selectedProduct.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span className="wl-product-price" style={{ fontSize: '15px', color: 'var(--accent-gold-light)' }}>
                      {selectedProduct.price}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      • {selectedProduct.fabric}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="wl-badge wl-badge-gold">
                  <ShieldCheck style={{ width: 12, height: 12 }} /> URL EXTRACTED & READY
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
