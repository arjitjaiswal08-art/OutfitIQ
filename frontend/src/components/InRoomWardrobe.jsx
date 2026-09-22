import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Sparkles,
  Link2,
  ExternalLink,
  Check,
  Search,
  Layers,
  ArrowRight,
  Loader2,
  Tag,
  Building2
} from 'lucide-react';

export default function InRoomWardrobe({
  brands = [],
  selectedBrand,
  selectedProduct,
  onSelectBrand,
  onSelectProduct,
  onExtractUrl,
  isExtractingUrl,
  onOpenAllBrands
}) {
  const [inputUrl, setInputUrl] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isUrlMode, setIsUrlMode] = useState(false);

  // Popular quick brands for fast switching
  const quickBrands = useMemo(() => {
    const popularNames = ['Zara', 'Nike', 'Gucci', 'Uniqlo', "Levi's", 'Burberry', 'H&M', 'FabIndia'];
    const popular = [];
    popularNames.forEach(name => {
      const found = brands.find(b => b.name.toLowerCase() === name.toLowerCase());
      if (found) popular.push(found);
    });
    // Fill with rest if needed
    brands.forEach(b => {
      if (!popular.some(p => p.id === b.id) && popular.length < 12) {
        popular.push(b);
      }
    });
    return popular;
  }, [brands]);

  const items = selectedBrand?.items || [];

  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter(i => i.category === activeCategory);
  }, [items, activeCategory]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onExtractUrl(inputUrl);
  };

  return (
    <div className="wl-inroom-wardrobe">
      {/* Header Bar */}
      <div className="wl-wardrobe-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="wl-step-pill">
            STEP 2
          </span>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '17px', fontWeight: 800, color: '#fff', margin: 0 }}>
              Wardrobe & Garment Rack
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Click any piece to try it on your model instantly
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Toggle URL Scraper */}
          <button
            onClick={() => setIsUrlMode(!isUrlMode)}
            className={`wl-tool-btn ${isUrlMode ? 'active' : ''}`}
            style={{ fontSize: '11px', padding: '6px 12px' }}
          >
            <Link2 style={{ width: 13, height: 13 }} />
            {isUrlMode ? "Browse Catalog" : "Paste Shopping Link"}
          </button>

          {/* Jump to 29 Brands Directory */}
          {onOpenAllBrands && (
            <button
              onClick={onOpenAllBrands}
              className="wl-tool-btn"
              style={{ fontSize: '11px', padding: '6px 12px', background: 'rgba(0, 242, 254, 0.08)', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 242, 254, 0.3)' }}
            >
              <Building2 style={{ width: 13, height: 13 }} />
              All 29 Fashion Houses
            </button>
          )}
        </div>
      </div>

      {/* URL Extractor Sub-bar (if toggled) */}
      {isUrlMode ? (
        <div className="wl-url-box-inroom">
          <form onSubmit={handleUrlSubmit} style={{ display: 'flex', gap: '8px', width: '100%', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Link2 style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: 'var(--accent-gold)' }} />
              <input
                type="url"
                placeholder="Paste any product URL (e.g., https://www.zara.com/... or nike.com/...)"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(7, 9, 14, 0.9)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 12px 9px 36px',
                  color: '#fff',
                  fontSize: '12px',
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isExtractingUrl || !inputUrl.trim()}
              className="wl-btn-gold"
              style={{ padding: '8px 16px', fontSize: '12px', whiteSpace: 'nowrap' }}
            >
              {isExtractingUrl ? (
                <>
                  <Loader2 style={{ width: 13, height: 13, animation: 'spin 1s linear infinite' }} />
                  Extracting...
                </>
              ) : (
                <>
                  <Sparkles style={{ width: 13, height: 13 }} />
                  Try On This Link
                </>
              )}
            </button>
          </form>
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px', alignItems: 'center', flexWrap: 'wrap', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span>Quick try:</span>
            <button
              type="button"
              onClick={() => setInputUrl("https://www.zara.com/us/en/textured-relaxed-fit-overshirt-p05967550.html")}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '11px' }}
            >
              Zara Overshirt
            </button>
            •
            <button
              type="button"
              onClick={() => setInputUrl("https://www.nike.com/t/tech-fleece-windrunner-mens-full-zip-hoodie-9kK13L")}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '11px' }}
            >
              Nike Tech Hoodie
            </button>
            •
            <button
              type="button"
              onClick={() => setInputUrl("https://www.gucci.com/us/en/pr/men/ready-to-wear-for-men/jackets-for-men/gg-supreme-web-jacket")}
              style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '11px' }}
            >
              Gucci Jacket
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Horizontal Brand Pills Strip */}
          <div className="wl-brand-pills-row">
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              HOUSE:
            </span>
            {quickBrands.map((brand) => {
              const isSelected = selectedBrand?.id === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => onSelectBrand(brand)}
                  className={`wl-brand-pill-btn ${isSelected ? 'active' : ''}`}
                >
                  <span>{brand.name}</span>
                  {isSelected && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#07090e' }} />}
                </button>
              );
            })}
          </div>

          {/* Category Filter Chips if brand has multiple categories */}
          {categories.length > 2 && (
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '2px' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    background: activeCategory === cat ? 'rgba(223, 178, 107, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: activeCategory === cat ? 'var(--accent-gold-light)' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: activeCategory === cat ? 'var(--accent-gold)' : 'var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '3px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Garments Horizontal Shelf / Grid */}
          <div className="wl-inroom-garments-scroll">
            {filteredItems.map((item) => {
              const isSelected = selectedProduct?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectProduct(item)}
                  className={`wl-inroom-item-card ${isSelected ? 'active' : ''}`}
                  title={`Click to try on ${item.name}`}
                >
                  {/* Item Image */}
                  <div className="wl-inroom-thumb-wrap">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="wl-inroom-thumb"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="wl-check-badge" style={{ top: 6, right: 6, width: 18, height: 18 }}>
                        <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                      </div>
                    )}
                    <div className="wl-inroom-price-badge">
                      {item.price}
                    </div>
                  </div>

                  {/* Item Info */}
                  <div style={{ padding: '8px 10px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      {item.category || selectedBrand?.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: isSelected ? 'var(--accent-gold-light)' : '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '2px'
                    }}>
                      {item.name}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                        Fit: {item.fit_type || 'Regular'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(item);
                        }}
                        style={{
                          background: isSelected ? 'var(--accent-gold)' : 'rgba(223, 178, 107, 0.15)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--accent-gold)' : 'rgba(223, 178, 107, 0.35)',
                          color: isSelected ? '#07090e' : 'var(--accent-gold-light)',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-xs)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <Sparkles style={{ width: 9, height: 9 }} />
                        {isSelected ? 'Active' : 'Try On'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
