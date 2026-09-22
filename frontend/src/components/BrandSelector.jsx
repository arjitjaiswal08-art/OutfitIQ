import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Check } from 'lucide-react';

export default function BrandSelector({
  brands,
  selectedBrand,
  onSelectBrand
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Luxury & Couture', 'Athletic & Performance', 'High Street', 'Heritage Denim', 'Ethnic / Formal'];

  const filteredBrands = useMemo(() => {
    return brands.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.tier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            b.origin.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Luxury & Couture') return b.category.includes('Luxury') || b.category.includes('Haute') || b.tier.includes('Luxury') || b.category.includes('Glamour');
      if (activeCategory === 'Athletic & Performance') return b.category.includes('Athletic') || b.category.includes('Sportswear') || b.category.includes('Performance');
      if (activeCategory === 'High Street') return b.category.includes('High Street') || b.category.includes('Contemporary') || b.category.includes('Fast') || b.category.includes('Chic');
      if (activeCategory === 'Heritage Denim') return b.category.includes('Denim') || b.category.includes('Heritage');
      if (activeCategory === 'Ethnic / Formal') return b.category.includes('Ethnic') || b.category.includes('Handloom') || b.category.includes('Formal') || b.category.includes('Tailored') || b.category.includes('Executive');
      return true;
    });
  }, [brands, searchTerm, activeCategory]);

  return (
    <div className="wl-panel">
      {/* Section Header */}
      <div className="wl-section-head">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="wl-badge wl-badge-gold">
              <Sparkles style={{ width: 13, height: 13 }} /> 29 GLOBAL FASHION HOUSES
            </span>
            <span className="wl-section-desc">Official Catalogues & Direct Link Scraper</span>
          </div>
          <h2 className="wl-section-title">
            Select Fashion House & Brand
          </h2>
        </div>

        {/* Search Bar */}
        <div className="wl-search-wrapper">
          <Search className="wl-search-icon" />
          <input
            type="text"
            placeholder="Search Zara, Nike, Gucci, FabIndia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wl-search-input"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="wl-category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`wl-cat-btn ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Brands Grid */}
      <div className="wl-brands-grid">
        {filteredBrands.map(b => {
          const isSelected = selectedBrand?.id === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBrand(b)}
              className={`wl-brand-card ${isSelected ? 'active' : ''}`}
            >
              {isSelected && (
                <div className="wl-check-badge">
                  <Check style={{ width: 12, height: 12, strokeWidth: 3 }} />
                </div>
              )}
              <div>
                <span className="wl-brand-origin">{b.origin}</span>
                <div className="wl-brand-name">{b.name}</div>
              </div>
              <div className="wl-brand-tier">{b.tier}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
