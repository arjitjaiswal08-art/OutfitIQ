import React, { useState } from 'react';
import {
  QrCode,
  ShoppingBag,
  Heart,
  X,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  CreditCard,
  Scan,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TryListCartModal({
  isOpen,
  onClose,
  initialTab = 'cart', // 'cart' | 'try_list' | 'qr_scan'
  tryList = [],
  cartItems = [],
  onRemoveFromCart,
  onRemoveFromTryList,
  onAddToCartFromTryList,
  onAddAllToCart,
  onTryItemFromList,
  onAddScannedItem
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [selectedTryIndex, setSelectedTryIndex] = useState(0);

  // Update activeTab when initialTab changes on modal open
  React.useEffect(() => {
    setActiveTab(initialTab);
    setIsSuccess(false);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  // Sample clothing tags for QR Scanner demo
  const sampleScanTags = [
    {
      id: 'scan-zara-01',
      code: 'TAG-ZARA-7921',
      brand: 'Zara',
      title: 'Textured Relaxed Overshirt',
      color: 'Sand Beige',
      size: 'Size M',
      price: '₹3,990',
      numericPrice: 3990,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'scan-nike-02',
      code: 'TAG-NIKE-4812',
      brand: 'Nike',
      title: 'Tech Fleece Windrunner Hoodie',
      color: 'Heather Grey',
      size: 'Size L',
      price: '₹7,995',
      numericPrice: 7995,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'scan-gucci-03',
      code: 'TAG-GUCCI-9901',
      brand: 'Gucci',
      title: 'GG Supreme Canvas Track Jacket',
      color: 'Monogram Brown',
      size: 'Size S',
      price: '₹1,45,000',
      numericPrice: 145000,
      image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Calculate cart pricing
  const subtotal = cartItems.reduce((acc, item) => {
    const raw = typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 3990
      : (item.price || 3990);
    return acc + raw;
  }, 0);

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  const handleSimulateScan = (tag) => {
    setIsScanning(true);
    setScannedResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult(tag);
    }, 1200);
  };

  const handleExecuteCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
    setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSuccess(true);
  };

  return (
    <div className="wl-modal-overlay" onClick={onClose}>
      <div className="wl-modal-box wl-ecom-journey-modal" onClick={e => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="wl-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="wl-cmd-icon-box" style={{ background: 'rgba(0, 242, 254, 0.1)', color: 'var(--accent-cyan)' }}>
              {activeTab === 'qr_scan' && <QrCode style={{ width: 18, height: 18 }} />}
              {activeTab === 'try_list' && <Heart style={{ width: 18, height: 18 }} />}
              {activeTab === 'cart' && <ShoppingBag style={{ width: 18, height: 18 }} />}
            </div>
            <div>
              <h3 className="wl-modal-title">
                {activeTab === 'qr_scan' && "In-Store QR & Garment Tag Scanner"}
                {activeTab === 'try_list' && `Fitting Room Try List (${tryList.length})`}
                {activeTab === 'cart' && (isSuccess ? "Order Confirmed!" : `Your Shopping Cart (${cartItems.length})`)}
              </h3>
              <p className="wl-modal-desc">
                {activeTab === 'qr_scan' && "Scan physical clothing barcode or QR tag to add directly into your fitting room"}
                {activeTab === 'try_list' && "Swipe and try on saved designer outfits on your personalized avatar"}
                {activeTab === 'cart' && (isSuccess ? "Thank you! Your virtual order has been dispatched." : "Review selected garments, sizes, and finalize your purchase")}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="wl-modal-close-btn">
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Modal Tab Switcher */}
        {!isSuccess && (
          <div className="wl-journey-nav-strip">
            <button
              onClick={() => setActiveTab('qr_scan')}
              className={`wl-journey-tab-btn ${activeTab === 'qr_scan' ? 'active' : ''}`}
            >
              <QrCode style={{ width: 14, height: 14 }} />
              <span>QR Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('try_list')}
              className={`wl-journey-tab-btn ${activeTab === 'try_list' ? 'active' : ''}`}
            >
              <Heart style={{ width: 14, height: 14 }} />
              <span>Try List ({tryList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('cart')}
              className={`wl-journey-tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            >
              <ShoppingBag style={{ width: 14, height: 14 }} />
              <span>Your Cart ({cartItems.length})</span>
            </button>
          </div>
        )}

        {/* Modal Tab Contents */}
        <div className="wl-journey-content-body">
          {/* ========================================================
              TAB 1: QR & BARCODE SCANNER (Matching Wireframe: Scan & QR)
              ======================================================== */}
          {activeTab === 'qr_scan' && (
            <div className="wl-qr-scanner-view">
              <div className="wl-qr-viewfinder-frame">
                <div className="wl-qr-laser-line" />
                <div className="wl-qr-reticle tl" />
                <div className="wl-qr-reticle tr" />
                <div className="wl-qr-reticle bl" />
                <div className="wl-qr-reticle br" />

                <div className="wl-qr-center-content">
                  <Scan style={{ width: 48, height: 48, color: 'var(--accent-cyan)', opacity: 0.8 }} />
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '12px' }}>
                    {isScanning ? "Decoding Garment RF Barcode..." : "Point Camera at In-Store Tag"}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Automatic fabric & sizing extraction
                  </span>
                </div>
              </div>

              {/* Sample Tag Quick Buttons */}
              <div style={{ margin: '18px 0 14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Tap Sample Tag to Test Live Scanner:
                </span>
                <div className="wl-qr-samples-strip">
                  {sampleScanTags.map(tag => (
                    <button
                      key={tag.id}
                      onClick={() => handleSimulateScan(tag)}
                      className="wl-qr-sample-chip"
                    >
                      <Scan style={{ width: 12, height: 12, color: 'var(--accent-cyan)' }} />
                      <span>{tag.brand} • {tag.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scanned Result Card */}
              {scannedResult && (
                <div className="wl-scanned-product-card">
                  <div className="wl-scanned-img-box">
                    <img src={scannedResult.image} alt={scannedResult.title} />
                  </div>
                  <div className="wl-scanned-meta">
                    <div className="wl-scanned-tag-badge">{scannedResult.code} • VERIFIED IN ATELIER</div>
                    <h4 className="wl-scanned-title">{scannedResult.title}</h4>
                    <div className="wl-scanned-specs">
                      <span>Brand: {scannedResult.brand}</span>
                      <span>Color: {scannedResult.color}</span>
                      <span>Size: {scannedResult.size}</span>
                    </div>
                    <div className="wl-scanned-price">{scannedResult.price}</div>

                    <div className="wl-scanned-actions">
                      <button
                        onClick={() => {
                          onAddToCartFromTryList?.(scannedResult);
                          confetti({ particleCount: 40 });
                        }}
                        className="wl-flow-btn wl-flow-btn-primary"
                        style={{ padding: '8px 14px' }}
                      >
                        <ShoppingBag style={{ width: 12, height: 12 }} />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => {
                          onAddScannedItem?.(scannedResult);
                          setActiveTab('try_list');
                        }}
                        className="wl-flow-btn wl-flow-btn-secondary"
                        style={{ padding: '8px 14px' }}
                      >
                        <Heart style={{ width: 12, height: 12 }} />
                        <span>Add to Try List</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 2: TRY LIST (Matching Wireframe: Try List)
              ======================================================== */}
          {activeTab === 'try_list' && (
            <div className="wl-trylist-view">
              <div className="wl-trylist-header-row">
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Swipe left or right to inspect your saved dressing room list
                </span>
                {tryList.length > 0 && (
                  <button
                    onClick={() => {
                      onAddAllToCart?.();
                      confetti({ particleCount: 60 });
                    }}
                    className="wl-trylist-addall-btn"
                  >
                    <ShoppingBag style={{ width: 13, height: 13 }} />
                    <span>Add All to Cart</span>
                  </button>
                )}
              </div>

              {tryList.length === 0 ? (
                <div className="wl-trylist-empty-state">
                  <Heart style={{ width: 42, height: 42, color: 'var(--text-muted)', opacity: 0.5, marginBottom: '12px' }} />
                  <h4>Your Try List is currently empty</h4>
                  <p>Browse the 29 Fashion Houses or scan an in-store garment to add to your fitting list.</p>
                  <button onClick={() => setActiveTab('qr_scan')} className="wl-flow-btn wl-flow-btn-primary" style={{ width: 'auto', marginTop: '12px' }}>
                    <QrCode style={{ width: 13, height: 13 }} />
                    <span>Scan In-Store Garment</span>
                  </button>
                </div>
              ) : (
                <div className="wl-trylist-carousel-grid">
                  {tryList.map((item, idx) => (
                    <div key={item.id || idx} className="wl-trylist-card">
                      <div className="wl-trylist-img-frame">
                        <img src={item.image || item.image_url || item.img} alt={item.title || item.name} />
                        <span className="wl-trylist-brand-tag">{item.brand || 'Designer'}</span>
                        <button
                          onClick={() => onRemoveFromTryList?.(item.id || idx)}
                          className="wl-trylist-del-btn"
                          title="Remove from Try List"
                        >
                          <Trash2 style={{ width: 12, height: 12 }} />
                        </button>
                      </div>

                      <div className="wl-trylist-card-body">
                        <h4 className="wl-trylist-item-title">{item.title || item.name}</h4>
                        <div className="wl-trylist-meta-row">
                          <span>{item.color || 'Standard'}</span>
                          <span>{item.size || 'Size M'}</span>
                        </div>
                        <div className="wl-trylist-price">{item.price || '₹3,990'}</div>

                        <div className="wl-trylist-card-actions">
                          <button
                            onClick={() => {
                              onTryItemFromList?.(item);
                              onClose();
                            }}
                            className="wl-trylist-btn-try"
                          >
                            <Sparkles style={{ width: 12, height: 12 }} />
                            <span>Try On</span>
                          </button>
                          <button
                            onClick={() => {
                              onAddToCartFromTryList?.(item);
                              confetti({ particleCount: 30 });
                            }}
                            className="wl-trylist-btn-cart"
                            title="Add to Cart"
                          >
                            <ShoppingBag style={{ width: 13, height: 13 }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              TAB 3: CART & CHECKOUT (Matching Wireframe: Cart & Success)
              ======================================================== */}
          {activeTab === 'cart' && !isSuccess && (
            <div className="wl-cart-view">
              {cartItems.length === 0 ? (
                <div className="wl-trylist-empty-state">
                  <ShoppingBag style={{ width: 42, height: 42, color: 'var(--text-muted)', opacity: 0.5, marginBottom: '12px' }} />
                  <h4>Your Cart is currently empty</h4>
                  <p>Pick items from the Virtual Fitting Room or Try List to purchase.</p>
                  <button onClick={() => setActiveTab('try_list')} className="wl-flow-btn wl-flow-btn-primary" style={{ width: 'auto', marginTop: '12px' }}>
                    <Heart style={{ width: 13, height: 13 }} />
                    <span>View Try List</span>
                  </button>
                </div>
              ) : (
                <div className="wl-cart-layout-grid">
                  {/* Left: Cart Items List */}
                  <div className="wl-cart-items-column">
                    <span className="wl-field-title">YOUR BAG ({cartItems.length} ITEMS)</span>
                    <div className="wl-cart-items-scroll">
                      {cartItems.map((item, idx) => (
                        <div key={item.id || idx} className="wl-cart-item-row">
                          <div className="wl-cart-thumb">
                            <img src={item.image || item.image_url || item.img} alt={item.title || item.name} />
                          </div>
                          <div className="wl-cart-item-info">
                            <div className="wl-cart-brand">{item.brand || 'Zara'}</div>
                            <h4 className="wl-cart-title">{item.title || item.name}</h4>
                            <div className="wl-cart-specs">
                              <span>Color: {item.color || 'White'}</span>
                              <span>Size: {item.size || 'Size M'}</span>
                            </div>
                            <button
                              onClick={() => onRemoveFromCart?.(idx)}
                              className="wl-cart-remove-link"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="wl-cart-item-price">
                            {item.price || '₹3,990'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Summary Box */}
                  <div className="wl-cart-summary-card">
                    <h4 className="wl-cart-summary-title">ORDER SUMMARY</h4>
                    <div className="wl-cart-sum-row">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="wl-cart-sum-row">
                      <span>Estimated Tax (5%)</span>
                      <span>₹{tax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="wl-cart-sum-row">
                      <span>Shipping (Express Courier)</span>
                      <span style={{ color: 'var(--accent-emerald)' }}>FREE</span>
                    </div>
                    <div className="wl-cart-sum-row total">
                      <span>Total Amount</span>
                      <span className="wl-cart-total-price">₹{total.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={handleExecuteCheckout}
                      className="wl-flow-btn wl-flow-btn-checkout"
                      style={{ padding: '14px', fontSize: '13px', marginTop: '16px' }}
                    >
                      <CreditCard style={{ width: 16, height: 16 }} />
                      <span>PROCEED TO PAYMENT</span>
                    </button>

                    <div className="wl-cart-trust-footer">
                      <ShieldCheck style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} />
                      <span>256-bit Encrypted Checkout • 30-Day Hassle-Free Returns</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              SUCCESS SCREEN (Matching Wireframe: Success)
              ======================================================== */}
          {activeTab === 'cart' && isSuccess && (
            <div className="wl-order-success-screen">
              <div className="wl-success-icon-ring">
                <CheckCircle2 style={{ width: 48, height: 48, color: 'var(--accent-emerald)' }} />
              </div>

              <h2 className="wl-success-main-title">Success!</h2>
              <p className="wl-success-sub">Your checkout is complete. Order confirmation sent to your email.</p>
              
              <div className="wl-success-order-box">
                <div className="wl-succ-row">
                  <span>ORDER NUMBER:</span>
                  <span className="wl-succ-bold">{orderId}</span>
                </div>
                <div className="wl-succ-row">
                  <span>TOTAL PAID:</span>
                  <span className="wl-succ-bold" style={{ color: 'var(--accent-emerald)' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="wl-succ-row">
                  <span>ESTIMATED DELIVERY:</span>
                  <span>2 Business Days (Express)</span>
                </div>
              </div>

              <div className="wl-success-actions-row">
                <button onClick={onClose} className="wl-flow-btn wl-flow-btn-primary" style={{ width: 'auto' }}>
                  <span>Continue Shopping</span>
                  <ArrowRight style={{ width: 14, height: 14 }} />
                </button>
              </div>

              <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-muted)' }}>
                Thank You! Visit Again.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
