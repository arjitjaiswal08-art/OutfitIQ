import React, { useState, useEffect } from 'react';
import {
  User,
  Ruler,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  Check,
  X,
  ShieldCheck,
  Sparkles,
  Sliders
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function UserProfileModal({
  isOpen,
  onClose,
  onSaveProfile
}) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('wearlytics_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: 'Elena Rostova',
      email: 'elena.rostova@couture.ai',
      phone: '+1 (555) 382-9104',
      address: '742 Evergreen Terrace, Milan / NYC',
      height: 175,
      chest: 88,
      waist: 68,
      hips: 92,
      fitPreference: 'regular',
      cardNumber: '•••• •••• •••• 4242',
      cardExpiry: '12/28',
      cardCvv: '•••'
    };
  });

  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('wearlytics_user_profile', JSON.stringify(profile));
    onSaveProfile?.(profile);
    confetti({ particleCount: 50, spread: 60 });
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="wl-modal-overlay" onClick={onClose}>
      <div className="wl-modal-box wl-profile-measure-modal" onClick={e => e.stopPropagation()}>
        <div className="wl-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="wl-cmd-icon-box" style={{ background: 'rgba(223, 178, 107, 0.12)', color: 'var(--accent-gold)' }}>
              <User style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h3 className="wl-modal-title">Atelier Profile & Body Measurements</h3>
              <p className="wl-modal-desc">Configure personal dimensions and delivery profile for precision neural draping</p>
            </div>
          </div>
          <button onClick={onClose} className="wl-modal-close-btn">
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="wl-profile-form-body">
          {/* Section 1: Personal Information */}
          <div className="wl-profile-sec-box">
            <div className="wl-sec-title-row">
              <span className="wl-sec-title">PERSONAL INFORMATION</span>
              <span className="wl-sec-sub">Encrypted Customer ID</span>
            </div>

            <div className="wl-form-grid-2">
              <div className="wl-form-field">
                <label className="wl-field-label">Full Name</label>
                <div className="wl-input-icon-wrap">
                  <User style={{ width: 14, height: 14 }} />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className="wl-form-input"
                    required
                  />
                </div>
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Email Address</label>
                <div className="wl-input-icon-wrap">
                  <Mail style={{ width: 14, height: 14 }} />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className="wl-form-input"
                    required
                  />
                </div>
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Phone Number</label>
                <div className="wl-input-icon-wrap">
                  <Phone style={{ width: 14, height: 14 }} />
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className="wl-form-input"
                  />
                </div>
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Delivery Address</label>
                <div className="wl-input-icon-wrap">
                  <MapPin style={{ width: 14, height: 14 }} />
                  <input
                    type="text"
                    value={profile.address}
                    onChange={e => setProfile({ ...profile, address: e.target.value })}
                    className="wl-form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Precision Body Measurements */}
          <div className="wl-profile-sec-box">
            <div className="wl-sec-title-row">
              <span className="wl-sec-title">BODY MEASUREMENTS (3D MESH CALIBRATION)</span>
              <span className="wl-sec-sub" style={{ color: 'var(--accent-cyan)' }}>Auto-guided draping</span>
            </div>

            <div className="wl-form-grid-4">
              <div className="wl-form-field">
                <label className="wl-field-label">Height (cm)</label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={e => setProfile({ ...profile, height: Number(e.target.value) })}
                  className="wl-form-input"
                />
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Chest (cm)</label>
                <input
                  type="number"
                  value={profile.chest}
                  onChange={e => setProfile({ ...profile, chest: Number(e.target.value) })}
                  className="wl-form-input"
                />
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Waist (cm)</label>
                <input
                  type="number"
                  value={profile.waist}
                  onChange={e => setProfile({ ...profile, waist: Number(e.target.value) })}
                  className="wl-form-input"
                />
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">Hips (cm)</label>
                <input
                  type="number"
                  value={profile.hips}
                  onChange={e => setProfile({ ...profile, hips: Number(e.target.value) })}
                  className="wl-form-input"
                />
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <label className="wl-field-label">Preferred Draping Tension</label>
              <div className="wl-fit-pills-row">
                {['snug', 'regular', 'relaxed', 'oversized'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setProfile({ ...profile, fitPreference: style })}
                    className={`wl-fit-pill-opt ${profile.fitPreference === style ? 'active' : ''}`}
                  >
                    {style.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Payment Information */}
          <div className="wl-profile-sec-box">
            <div className="wl-sec-title-row">
              <span className="wl-sec-title">PAYMENT INFORMATION</span>
              <span className="wl-sec-sub">PCI-DSS Level 1 Encrypted</span>
            </div>

            <div className="wl-form-grid-3">
              <div className="wl-form-field" style={{ gridColumn: 'span 2' }}>
                <label className="wl-field-label">Credit Card Number</label>
                <div className="wl-input-icon-wrap">
                  <CreditCard style={{ width: 14, height: 14 }} />
                  <input
                    type="text"
                    value={profile.cardNumber}
                    onChange={e => setProfile({ ...profile, cardNumber: e.target.value })}
                    className="wl-form-input"
                  />
                </div>
              </div>

              <div className="wl-form-field">
                <label className="wl-field-label">MM / YY</label>
                <input
                  type="text"
                  value={profile.cardExpiry}
                  onChange={e => setProfile({ ...profile, cardExpiry: e.target.value })}
                  className="wl-form-input"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} className="wl-tool-btn" style={{ padding: '10px 18px' }}>
              Cancel
            </button>
            <button
              type="submit"
              className="wl-flow-btn wl-flow-btn-primary"
              style={{ width: 'auto', padding: '10px 24px' }}
            >
              {isSavedToast ? (
                <>
                  <Check style={{ width: 14, height: 14 }} />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles style={{ width: 14, height: 14 }} />
                  <span>Save Atelier Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
