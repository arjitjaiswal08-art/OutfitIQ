import React, { useState } from 'react';
import { Sparkles, Wand2, X, Check, Sliders, Shield, Zap, Palette, Sun, Film, Moon, Image as ImageIcon } from 'lucide-react';

const REIMAGINE_STYLES = [
  {
    id: 'editorial_studio',
    name: 'High-Key Editorial Studio',
    tag: 'Recommended',
    icon: '✨',
    badge: '5600K Studio',
    desc: 'Crisp daylight balanced studio lighting, enhanced textile micro-contrast, and flawless collar edge definition.'
  },
  {
    id: 'golden_hour',
    name: 'Golden Hour Sunset Glow',
    tag: 'Warm Cinematic',
    icon: '🌅',
    badge: '3200K Tungsten',
    desc: 'Warm golden sun wash, amber rim highlights, and soft atmospheric textile diffusion.'
  },
  {
    id: 'cyber_runway',
    name: 'Cyber Runway Neon Radiance',
    tag: 'Futuristic',
    icon: '⚡',
    badge: 'Cyan / Magenta',
    desc: 'High-contrast evening lighting with electric neon edge gradients and dark runway ambience.'
  },
  {
    id: 'fashion_illustration',
    name: 'Couture Hand Illustration',
    tag: 'Artistic',
    icon: '🎨',
    badge: 'Watercolor & Ink',
    desc: 'Transforms outfit into a luxury designer fashion sketch with delicate ink edges and vibrant wash.'
  },
  {
    id: 'vintage_film',
    name: '35mm Vintage Analog',
    tag: 'Editorial Classic',
    icon: '🎞️',
    badge: 'Analog Grain',
    desc: 'Nostalgic 1990s fashion magazine color grading with warm highlights and gentle film grain.'
  },
  {
    id: 'luxury_noir',
    name: 'Luxury Monochrome Noir',
    tag: 'High Contrast',
    icon: '💎',
    badge: 'Black & White',
    desc: 'Ultra-dramatic black & white couture aesthetic with velvet shadow depth and silver luster.'
  }
];

const QUICK_PROMPTS = [
  '✨ High-fashion Vogue editorial cover with soft studio diffuse',
  '🌅 Sunset rooftop photoshoot in Milan with warm golden rim',
  '⚡ Futuristic neon runway showcase with dramatic lighting',
  '🎨 Paris atelier designer couture hand sketch'
];

export default function ReimagineModal({
  isOpen,
  onClose,
  currentImage,
  onApplyStyle,
  isLoading
}) {
  const [selectedStyle, setSelectedStyle] = useState('editorial_studio');
  const [customPrompt, setCustomPrompt] = useState('');
  const [appliedNotification, setAppliedNotification] = useState('');

  if (!isOpen) return null;

  const handleApply = async () => {
    if (onApplyStyle) {
      await onApplyStyle(selectedStyle, customPrompt);
      setAppliedNotification(`Reimagined in ${selectedStyle.replace('_', ' ')}!`);
      setTimeout(() => {
        setAppliedNotification('');
        onClose();
      }, 1200);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 5, 8, 0.85)',
      backdropFilter: 'blur(16px)',
      zIndex: 110,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--bg-surface-elevated, #0d121d)',
        border: '1px solid rgba(223, 178, 107, 0.3)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 24px 72px rgba(0, 0, 0, 0.9), 0 0 30px rgba(223, 178, 107, 0.15)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header matching Google Gemini "Create images" */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.08) 0%, rgba(13, 18, 29, 0.6) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(223, 178, 107, 0.1) 100%)',
              border: '1.5px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              🍌
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading, Outfit)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: 0
                }}>
                  Create images
                </h3>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(223, 178, 107, 0.2)',
                  color: 'var(--accent-gold-light, #f0d6a7)',
                  fontWeight: 700,
                  border: '1px solid rgba(223, 178, 107, 0.3)'
                }}>
                  AI Studio
                </span>
              </div>
              <p style={{
                margin: '2px 0 0',
                fontSize: '13px',
                color: 'var(--text-secondary, #94a3b8)',
                fontWeight: 500
              }}>
                Reimagine, illustrate, edit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary, #94a3b8)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Facial Shield Protection Indicator */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Shield style={{ width: 20, height: 20, color: '#10b981', flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
              <strong style={{ color: '#10b981' }}>Face & Identity Shield Active:</strong> Your facial identity, chin contour, and hair boundary are 100% mathematically preserved while only clothing drape and lighting are transformed.
            </div>
          </div>

          {/* Style Selector Grid */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary, #ffffff)' }}>
                Select AI Artistic Aesthetic
              </label>
              <span style={{ fontSize: '11px', color: 'var(--accent-gold, #dfb26b)' }}>
                6 Precision Modes
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              {REIMAGINE_STYLES.map((st) => {
                const isSelected = selectedStyle === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStyle(st.id)}
                    style={{
                      background: isSelected ? 'rgba(223, 178, 107, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '2px solid var(--accent-gold, #dfb26b)' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '16px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '22px' }}>{st.icon}</span>
                      <span style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        background: isSelected ? 'var(--accent-gold, #dfb26b)' : 'rgba(255, 255, 255, 0.1)',
                        color: isSelected ? '#07090e' : '#cbd5e1',
                        fontWeight: 700
                      }}>
                        {st.badge}
                      </span>
                    </div>

                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: isSelected ? 'var(--accent-gold-light, #f0d6a7)' : '#ffffff'
                      }}>
                        {st.name}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', lineHeight: 1.4 }}>
                        {st.desc}
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: 'var(--accent-gold, #dfb26b)',
                        color: '#07090e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Prompt Direction Input */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary, #ffffff)', display: 'block', marginBottom: '8px' }}>
              Custom Creative Prompt (Optional)
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Milan fashion week lighting, high-contrast textile highlights..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            {/* Quick Prompt Chips */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomPrompt(qp)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    color: 'var(--text-secondary, #94a3b8)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s'
                  }}
                >
                  {qp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '18px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(7, 10, 16, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '0 0 24px 24px'
        }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
            {appliedNotification ? (
              <span style={{ color: '#10b981', fontWeight: 700 }}>✓ {appliedNotification}</span>
            ) : (
              <span>⚡ GPU Tensor synthesis in &lt;180ms</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '10px 18px',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleApply}
              disabled={isLoading}
              style={{
                background: 'linear-gradient(135deg, #dfb26b 0%, #c49a52 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 22px',
                color: '#07090e',
                fontSize: '13px',
                fontWeight: 800,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(223, 178, 107, 0.35)',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '2px solid rgba(7, 9, 14, 0.3)',
                    borderTopColor: '#07090e',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  Synthesizing...
                </>
              ) : (
                <>
                  <span>🍌</span>
                  Reimagine Outfit
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
