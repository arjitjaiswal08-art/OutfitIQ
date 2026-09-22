import React, { useState } from 'react';
import {
  User,
  Shield,
  Building2,
  X,
  History,
  Check,
  Lock,
  Sparkles,
  Key
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  currentRole = 'user',
  onSelectRole,
  history = []
}) {
  const [activeTab, setActiveTab] = useState('roles'); // 'roles' | 'history'
  const [emailInput, setEmailInput] = useState('curator@wearlytics.com');

  if (!isOpen) return null;

  const roles = [
    {
      id: 'user',
      title: 'Shopper / Creator',
      desc: 'Browse 29 houses, try on clothes, upgrade to Pro ₹299/mo, and save favorite looks.',
      icon: User,
      color: 'var(--accent-gold)'
    },
    {
      id: 'brand_partner',
      title: 'Brand Partner (Zara / Nike)',
      desc: 'Manage garment SKU catalog, view try-on conversion metrics, and manage affiliate commissions.',
      icon: Building2,
      color: 'var(--accent-cyan)'
    },
    {
      id: 'admin',
      title: 'System Administrator',
      desc: 'Full access to GPU cluster telemetry, DRM watermark keys, and serverless inference logs.',
      icon: Shield,
      color: '#10b981'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 10, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 22, 36, 0.98) 0%, rgba(8, 12, 20, 0.99) 100%)',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-lg)',
        width: '680px',
        maxWidth: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="wl-badge wl-badge-gold">
              <Lock style={{ width: 13, height: 13 }} /> JWT AUTHENTICATION & ACCESS CONTROL
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Session ID: #USR-C9924A • Role-Based Permissions
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
            User Account & Workspace Roles
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('roles')}
            style={{
              flex: 1,
              background: activeTab === 'roles' ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'roles' ? '#07090e' : 'var(--text-secondary)',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Key style={{ width: 14, height: 14 }} />
            Active Role & Permissions
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              flex: 1,
              background: activeTab === 'history' ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.04)',
              color: activeTab === 'history' ? '#07090e' : 'var(--text-secondary)',
              border: 'none',
              padding: '8px 14px',
              borderRadius: 'var(--radius-xs)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <History style={{ width: 14, height: 14 }} />
            Try-On History ({history.length})
          </button>
        </div>

        {/* TAB 1: ROLES */}
        {activeTab === 'roles' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                Authenticated Account Email
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="wl-search-input"
                style={{ width: '100%', paddingLeft: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {roles.map((r) => {
                const isSelected = currentRole === r.id;
                const Icon = r.icon;
                return (
                  <div
                    key={r.id}
                    onClick={() => onSelectRole(r.id)}
                    style={{
                      background: isSelected ? 'rgba(223, 178, 107, 0.12)' : 'rgba(10, 14, 24, 0.65)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-gold)' : 'var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: r.color
                      }}>
                        <Icon style={{ width: 18, height: 18 }} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
                          {r.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {r.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="wl-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '13px' }}
            >
              <Check style={{ width: 16, height: 16 }} />
              Confirm & Return to Atelier
            </button>
          </div>
        )}

        {/* TAB 2: HISTORY */}
        {activeTab === 'history' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'rgba(10, 14, 24, 0.7)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.product}
                        style={{ width: '44px', height: '52px', objectFit: 'cover', borderRadius: 'var(--radius-xs)' }}
                      />
                    )}
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 800 }}>
                        {item.brand}
                      </span>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                        {item.product}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Size: {item.size} • Fit: {item.fit_style} • {item.timestamp}
                      </div>
                    </div>
                  </div>

                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--accent-gold-light)' }}>
                    {item.price}
                  </span>
                </div>
              ))}

              {history.length === 0 && (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                  No saved try-on history yet. Run a virtual try-on to save your looks!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
