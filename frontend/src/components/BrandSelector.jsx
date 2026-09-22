import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Check, Globe, ArrowUpRight, X, Layers, Compass, Building2 } from 'lucide-react';

const COUNTRY_FLAGS = {
  'spain': '🇪🇸',
  'italy': '🇮🇹',
  'france': '🇫🇷',
  'usa': '🇺🇸',
  'united states': '🇺🇸',
  'japan': '🇯🇵',
  'uk': '🇬🇧',
  'united kingdom': '🇬🇧',
  'germany': '🇩🇪',
  'sweden': '🇸🇪',
  'india': '🇮🇳'
};

const getFlag = (origin = '') => {
  const clean = origin.toLowerCase().trim();
  for (const [key, flag] of Object.entries(COUNTRY_FLAGS)) {
    if (clean.includes(key)) return flag;
  }
  return '🌐';
};

export default function BrandSelector({
  brands = [],
  selectedBrand,
  onSelectBrand
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Houses' },
    { id: 'Luxury & Couture', label: 'Haute Couture & Luxury' },
    { id: 'High Street', label: 'High Street & Contemporary' },
    { id: 'Athletic & Performance', label: 'Athletic & Performance' },
    { id: 'Heritage Denim', label: 'Heritage Denim & Casual' },
    { id: 'Ethnic / Formal', label: 'Handcrafted & Formal' }
  ];

  const filteredBrands = useMemo(() => {
    return brands.filter(b => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q ||
        b.name.toLowerCase().includes(q) ||
        b.tier.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        (b.category && b.category.toLowerCase().includes(q));

      if (!matchesSearch) return false;
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Luxury & Couture') {
        return (b.category && (b.category.includes('Luxury') || b.category.includes('Haute') || b.category.includes('Glamour'))) ||
               (b.tier && (b.tier.includes('Luxury') || b.tier.includes('Couture')));
      }
      if (activeCategory === 'Athletic & Performance') {
        return (b.category && (b.category.includes('Athletic') || b.category.includes('Sportswear') || b.category.includes('Performance'))) ||
               (b.tier && b.tier.includes('Athletic'));
      }
      if (activeCategory === 'High Street') {
        return (b.category && (b.category.includes('High Street') || b.category.includes('Contemporary') || b.category.includes('Fast') || b.category.includes('Chic'))) ||
               (b.tier && (b.tier.includes('Fast') || b.tier.includes('Contemporary')));
      }
      if (activeCategory === 'Heritage Denim') {
        return (b.category && (b.category.includes('Denim') || b.category.includes('Heritage'))) ||
               (b.tier && b.tier.includes('Denim'));
      }
      if (activeCategory === 'Ethnic / Formal') {
        return (b.category && (b.category.includes('Ethnic') || b.category.includes('Handloom') || b.category.includes('Formal') || b.category.includes('Tailored') || b.category.includes('Executive'))) ||
               (b.tier && (b.tier.includes('Formal') || b.tier.includes('Handloom') || b.tier.includes('Artisanal')));
      }
      return true;
    });
  }, [brands, searchTerm, activeCategory]);

  return (
    <div className="wl-panel">
      {/* 1. Header Banner & Global Metrics */}
      <div className="wl-section-head">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="wl-badge wl-badge-gold">
              <Sparkles style={{ width: 13, height: 13 }} /> 29 GLOBAL FASHION HOUSES
            </span>
            <span className="wl-section-desc">Official Catalogues • Instant Try-On • Neural Link Extractor</span>
          </div>
          <h2 className="wl-section-title" style={{ fontSize: '22px' }}>
            International Fashion Houses & Designers
          </h2>
        </div>

        {/* Search Bar with live clear button */}
        <div className="wl-search-wrapper" style={{ width: '340px' }}>
          <Search className="wl-search-icon" />
          <input
            type="text"
            placeholder="Search Zara, Gucci, Nike, FabIndia, Origin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wl-search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Clear search"
            >
              <X style={{ width: 14, height: 14 }} />
            </button>
          )}
        </div>
      </div>

      {/* 2. House Directory Metrics Pill Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '10px',
        marginBottom: '16px',
        padding: '12px 16px',
        background: 'rgba(8, 12, 20, 0.75)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 style={{ width: 16, height: 16, color: 'var(--accent-gold)' }} />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Catalog Capacity</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>29 Luxury Houses</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers style={{ width: 16, height: 16, color: 'var(--accent-cyan)' }} />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verified Pieces</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>87+ Garments Ready</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe style={{ width: 16, height: 16, color: '#10b981' }} />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Global Origins</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>8 Major Fashion Capitals</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass style={{ width: 16, height: 16, color: 'var(--accent-gold-light)' }} />
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filtered Result</div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-gold-light)' }}>
              {filteredBrands.length} of {brands.length || 29} Houses
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="wl-category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`wl-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. Brands Grid */}
      <div className="wl-brands-grid" style={{ maxHeight: '380px' }}>
        {filteredBrands.map(b => {
          const isSelected = selectedBrand?.id === b.id;
          const flag = getFlag(b.origin);
          const itemCount = b.items?.length || 3;

          return (
            <div
              key={b.id}
              onClick={() => onSelectBrand(b)}
              className={`wl-brand-card ${isSelected ? 'active' : ''}`}
              style={{
                cursor: 'pointer',
                transition: 'all 0.22s ease',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div className="wl-check-badge">
                  <Check style={{ width: 11, height: 11, strokeWidth: 3 }} />
                </div>
              )}

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span className="wl-brand-origin" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
                    <span style={{ fontSize: '13px' }}>{flag}</span> {b.origin}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: isSelected ? 'rgba(223, 178, 107, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                    color: isSelected ? 'var(--accent-gold-light)' : 'var(--text-muted)'
                  }}>
                    {itemCount} items
                  </span>
                </div>

                <div className="wl-brand-name" style={{ fontSize: '16px', letterSpacing: '0.4px' }}>
                  {b.name}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div className="wl-brand-tier" style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {b.tier}
                </div>
                {b.domain && (
                  <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center' }}>
                    <ArrowUpRight style={{ width: 11, height: 11 }} />
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredBrands.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            padding: '40px 20px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            background: 'rgba(10, 14, 22, 0.5)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border-subtle)'
          }}>
            <Search style={{ width: 28, height: 28, margin: '0 auto 10px auto', opacity: 0.4 }} />
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>No matching fashion house found</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Try adjusting your search query or switching category filter tab.</div>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="wl-tool-btn"
              style={{ margin: '14px auto 0 auto' }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
