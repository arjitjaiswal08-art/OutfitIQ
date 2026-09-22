import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
  Crown,
  ExternalLink,
  Flame,
  ArrowRight,
  TrendingUp,
  Percent,
  Check
} from 'lucide-react';

export default function MonetizationModal({
  isOpen,
  onClose,
  currentPlan = 'free',
  quotaRemaining = 10,
  quotaLimit = 10,
  onUpgradeSuccess,
  selectedProduct
}) {
  const [selectedGateway, setSelectedGateway] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'affiliate'
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/billing/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: 'pro', payment_method: selectedGateway })
      });
      if (res.ok) {
        onUpgradeSuccess();
      }
    } catch (err) {
      console.error("Upgrade error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const affiliateRate = "8% - 12%";
  const productPriceNumber = parseFloat(selectedProduct?.price?.replace(/[^0-9.]/g, '') || '69.90');
  const estimatedCommission = (productPriceNumber * 0.10).toFixed(2);

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
        width: '760px',
        maxWidth: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(223, 178, 107, 0.25)',
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
        <div style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="wl-badge wl-badge-gold">
              <Crown style={{ width: 13, height: 13 }} /> MONETIZATION & BILLING SUITE
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Freemium Quota • Pro Subscription • Brand Affiliate Program
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
            Unlock Enterprise Virtual Try-On
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(6, 9, 15, 0.8)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '22px'
        }}>
          <button
            onClick={() => setActiveTab('plans')}
            style={{
              flex: 1,
              background: activeTab === 'plans' ? 'var(--accent-gold)' : 'transparent',
              color: activeTab === 'plans' ? '#07090e' : 'var(--text-secondary)',
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
            <Crown style={{ width: 14, height: 14 }} />
            Subscription Plans (Free vs ₹299 Pro)
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            style={{
              flex: 1,
              background: activeTab === 'affiliate' ? 'var(--accent-cyan)' : 'transparent',
              color: activeTab === 'affiliate' ? '#07090e' : 'var(--text-secondary)',
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
            <TrendingUp style={{ width: 14, height: 14 }} />
            Brand Affiliate Engine (Redirect & Earn)
          </button>
        </div>

        {/* TAB 1: SUBSCRIPTION PLANS */}
        {activeTab === 'plans' && (
          <div>
            {/* Live Quota Bar */}
            <div style={{
              background: 'rgba(8, 12, 20, 0.8)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                  Current Quota Status
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                  {currentPlan === 'pro' ? (
                    <span style={{ color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Crown style={{ width: 15, height: 15 }} /> PRO ATELIER: UNLIMITED TRY-ONS ACTIVE
                    </span>
                  ) : (
                    <span>Free Plan: {quotaRemaining} of {quotaLimit} Try-Ons Remaining per day</span>
                  )}
                </div>
              </div>

              {currentPlan !== 'pro' && (
                <div style={{ width: '160px' }}>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${(quotaRemaining / quotaLimit) * 100}%`,
                      background: 'linear-gradient(90deg, #f59e0b, #10b981)'
                    }} />
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
                    Resets daily at 00:00 UTC
                  </div>
                </div>
              )}
            </div>

            {/* Plans Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '22px' }}>
              {/* Free Plan Card */}
              <div style={{
                background: 'rgba(12, 16, 26, 0.7)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)' }}>FREE ATELIER</span>
                    {currentPlan === 'free' && (
                      <span className="wl-badge wl-badge-cyan" style={{ fontSize: '9px' }}>ACTIVE</span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 800, color: '#fff', margin: '8px 0' }}>
                    ₹0 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>/ forever</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    Essential virtual try-on preview for casual shoppers and fashion discovery.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: '#10b981' }} />
                      <span>10 Virtual Try-Ons per day</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: '#10b981' }} />
                      <span>All 29 Global Fashion Houses</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: '#10b981' }} />
                      <span>Split-Screen Comparison Slider</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5 }}>
                      <X style={{ width: 14, height: 14, color: 'var(--text-muted)' }} />
                      <span>Watermark on exports</span>
                    </div>
                  </div>
                </div>

                <button
                  disabled={currentPlan === 'free'}
                  style={{
                    marginTop: '20px',
                    width: '100%',
                    padding: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'default'
                  }}
                >
                  {currentPlan === 'free' ? 'Current Active Tier' : 'Downgrade'}
                </button>
              </div>

              {/* Pro Plan Card (₹299/mo) */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.15) 0%, rgba(14, 18, 28, 0.95) 100%)',
                border: '1px solid var(--accent-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 0 30px rgba(223, 178, 107, 0.2)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '16px',
                  background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                  color: '#07090e',
                  fontSize: '9px',
                  fontWeight: 900,
                  padding: '2px 10px',
                  borderRadius: '12px',
                  letterSpacing: '0.8px'
                }}>
                  MOST POPULAR • BEST ROI
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Crown style={{ width: 14, height: 14 }} /> PRO ATELIER
                    </span>
                    {currentPlan === 'pro' && (
                      <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px' }}>ACTIVE</span>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: '#fff', margin: '8px 0' }}>
                    ₹299 <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent-gold-light)' }}>/ month</span>
                  </div>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Unlimited high-speed GPU rendering for creators, stylists, and power shoppers.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                      <span style={{ fontWeight: 700 }}>Unlimited Virtual Try-Ons (No daily cap)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                      <span>Dedicated NVIDIA A100 GPU priority</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                      <span>4K Ultra-HD Canvas Resolution</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                      <span>Unwatermarked Clean Exports</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                      <span>Exclusive Haute Couture & Runway Drops</span>
                    </div>
                  </div>
                </div>

                {/* Gateway selection & Instant Upgrade Button */}
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <button
                      onClick={() => setSelectedGateway('razorpay')}
                      style={{
                        flex: 1,
                        background: selectedGateway === 'razorpay' ? 'rgba(223, 178, 107, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid',
                        borderColor: selectedGateway === 'razorpay' ? 'var(--accent-gold)' : 'var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '6px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Razorpay (UPI / Card)
                    </button>
                    <button
                      onClick={() => setSelectedGateway('stripe')}
                      style={{
                        flex: 1,
                        background: selectedGateway === 'stripe' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid',
                        borderColor: selectedGateway === 'stripe' ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '6px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      Stripe (Intl Cards)
                    </button>
                  </div>

                  <button
                    onClick={handleUpgrade}
                    disabled={isProcessing || currentPlan === 'pro'}
                    className="wl-btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '13px',
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                      color: '#07090e',
                      boxShadow: '0 4px 20px rgba(223, 178, 107, 0.4)'
                    }}
                  >
                    <Sparkles style={{ width: 16, height: 16 }} />
                    {isProcessing ? "Processing ₹299..." : currentPlan === 'pro' ? "Pro Plan Active" : "Upgrade to Pro Atelier (₹299/mo)"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AFFILIATE MONETIZATION ENGINE */}
        {activeTab === 'affiliate' && (
          <div style={{
            background: 'rgba(8, 12, 20, 0.85)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '22px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <TrendingUp style={{ width: 16, height: 16, color: 'var(--accent-cyan)' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                Automated Fashion Affiliate Commission Engine
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '18px' }}>
              When users try on clothes in Wearlytics and click through to buy the real item, your platform automatically tags the outbound link with your brand affiliate tracking code, earning you a healthy <strong>8% to 15% partner commission</strong> on every fulfilled cart.
            </p>

            {/* Current Active Garment Referral Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.1) 0%, rgba(10, 14, 24, 0.9) 100%)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {selectedProduct?.image_url && (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    style={{ width: '56px', height: '64px', borderRadius: 'var(--radius-xs)', objectFit: 'cover', border: '1px solid var(--accent-cyan)' }}
                  />
                )}
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 800, textTransform: 'uppercase' }}>
                    Active Garment • {selectedProduct?.brand_name || "Zara"}
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                    {selectedProduct?.name || "Textured Relaxed Fit Overshirt"}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--accent-gold-light)', fontWeight: 800 }}>
                    Retail Price: {selectedProduct?.price || "$69.90"}
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Estimated Partner Commission (10%)</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#10b981' }}>
                  +${estimatedCommission} USD
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>30-Day Cookie Attribution</span>
              </div>
            </div>

            {/* Direct Shop Action */}
            <a
              href={`https://www.${selectedProduct?.brand_name?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'zara'}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="wl-btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textDecoration: 'none',
                background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-cyan-light) 100%)',
                color: '#07090e',
                fontWeight: 800,
                padding: '12px 18px',
                fontSize: '13px'
              }}
            >
              <span>Shop Official Piece at {selectedProduct?.brand_name || "Brand"} Store</span>
              <ExternalLink style={{ width: 14, height: 14 }} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
