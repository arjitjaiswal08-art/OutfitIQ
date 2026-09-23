import React, { useState } from 'react';
import {
  Smartphone,
  Upload,
  Sparkles,
  Heart,
  ShoppingBag,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Camera,
  Shirt,
  Layers,
  Sparkle,
  Sliders,
  Eye,
  RotateCw,
  Info,
  CheckCircle2,
  Save,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MobileAppExperience({
  brands = [],
  selectedBrand,
  selectedProduct,
  onSelectProduct,
  currentModelImage,
  userImage,
  onUploadUserPhoto,
  onSelectPreset,
  selectedPresetId,
  tryonResult,
  activeImage,
  isLoading = false,
  onRunTryOn,
  onAddToCart,
  onAddToTryList
}) {
  const [activeStep, setActiveStep] = useState(2); // Default to middle or user can toggle 1, 2, 3
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeOccasion, setActiveOccasion] = useState('Party Looks');
  const [isSaved, setIsSaved] = useState(false);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Model avatars for Step 1
  const mobileAvatars = [
    { id: 'avatar_1', name: 'Elena (Studio)', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', gender: 'female', body_type: 'regular' },
    { id: 'avatar_2', name: 'Sophia (Editorial Red)', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', gender: 'female', body_type: 'regular' },
    { id: 'avatar_3', name: 'Mia (Classic White)', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', gender: 'female', body_type: 'regular' },
    { id: 'avatar_4', name: 'Marcus (Athletic)', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80', gender: 'male', body_type: 'athletic' },
    { id: 'avatar_5', name: 'David (Minimalist)', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', gender: 'male', body_type: 'regular' },
    { id: 'avatar_6', name: 'Priya (Chic Dark)', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', gender: 'female', body_type: 'athletic' }
  ];

  // Mobile App Apparel Collection for Step 2
  const apparelItems = [
    {
      id: 'apparel-1',
      title: 'Structured Crimson Power Blazer',
      brand: 'Zara',
      price: '₹5,990',
      category: 'Blazers',
      filter: 'Party Looks',
      img: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'apparel-2',
      title: 'Midnight Velvet Evening Suit',
      brand: 'Gucci',
      price: '₹1,25,000',
      category: 'Party',
      filter: 'Date Night',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'apparel-3',
      title: 'Tailored Ivory High-Waist Trousers',
      brand: 'Burberry',
      price: '₹34,000',
      category: 'Pants',
      filter: 'Party Looks',
      img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'apparel-4',
      title: 'Silk Ribbed Corset Bodysuit',
      brand: 'Zara',
      price: '₹2,990',
      category: 'Tops',
      filter: 'Date Night',
      img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'apparel-5',
      title: 'Textured Relaxed Overshirt',
      brand: 'Zara',
      price: '₹3,990',
      category: 'Tops',
      filter: 'All',
      img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'apparel-6',
      title: 'Vintage Fit Denim Trucker',
      brand: "Levi's",
      price: '₹6,599',
      category: 'Outerwear',
      filter: 'Favorites',
      img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const categoryIcons = [
    { id: 'dress', label: 'Dresses' },
    { id: 'top', label: 'Tops' },
    { id: 'blazer', label: 'Blazers' },
    { id: 'pants', label: 'Pants' },
    { id: 'skirt', label: 'Skirts' }
  ];

  const filterTabs = ['All', 'Favorites', 'Party Looks', 'Date Night'];

  const filteredApparel = selectedFilter === 'All'
    ? apparelItems
    : apparelItems.filter(item => item.filter === selectedFilter || item.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  const currentDisplayApparel = selectedProduct || apparelItems[0];
  const renderedTryOnImg = activeImage || tryonResult?.primary_image || currentModelImage;

  const handleSaveLook = () => {
    confetti({ particleCount: 50, spread: 60 });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <section className="wl-mobile-showcase-section">
      {/* Section Header */}
      <div className="wl-mobile-section-header">
        <div className="wl-mobile-eyebrow">
          <Smartphone style={{ width: 14, height: 14, color: 'var(--accent-cyan)' }} />
          <span>NATIVE MOBILE EXPERIENCE SIMULATOR</span>
        </div>
        <h2 className="wl-mobile-main-title">Modern AI Try-On Mobile App</h2>
        <p className="wl-mobile-main-sub">
          Seamless 3-step customer journey: choose your personal avatar, swipe curated designer apparel, and experience high-fidelity neural draping in real time.
        </p>

        {/* Interactive Step Switcher Tabs */}
        <div className="wl-mobile-step-switch">
          <button
            onClick={() => setActiveStep(1)}
            className={`wl-mob-switch-pill ${activeStep === 1 ? 'active' : ''}`}
          >
            <span className="wl-mob-pill-num">1</span>
            <span>Upload Your Photo</span>
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`wl-mob-switch-pill ${activeStep === 2 ? 'active' : ''}`}
          >
            <span className="wl-mob-pill-num">2</span>
            <span>Choose Your Apparel</span>
          </button>
          <button
            onClick={() => setActiveStep(3)}
            className={`wl-mob-switch-pill ${activeStep === 3 ? 'active' : ''}`}
          >
            <span className="wl-mob-pill-num">3</span>
            <span>Visualize Your Outfits</span>
          </button>
        </div>
      </div>

      {/* Triple iPhone Devices Mockup Stage (Matching Reference Image 2) */}
      <div className="wl-phones-deck-container">
        {/* ========================================================
            PHONE 1: STEP 1 - UPLOAD YOUR PHOTO / CHOOSE AVATAR
            ======================================================== */}
        <div className={`wl-phone-wrapper ${activeStep === 1 ? 'focus-phone' : ''}`}>
          <div className="wl-phone-label-box">
            <span className="wl-phone-step-badge">1</span>
            <h3 className="wl-phone-step-title">Upload Your Photo</h3>
            <p className="wl-phone-step-desc">Upload a clear photo of yourself or select one of our models</p>
          </div>

          <div className="wl-iphone-mockup">
            {/* Dynamic Island & Status Bar */}
            <div className="wl-iphone-notch">
              <span className="wl-iphone-clock">9:41</span>
              <div className="wl-dynamic-island" />
              <div className="wl-iphone-icons">
                <span style={{ fontSize: '10px' }}>●●●</span>
                <span style={{ fontSize: '10px' }}>5G</span>
              </div>
            </div>

            {/* App Nav Header */}
            <div className="wl-iphone-app-header">
              <button className="wl-iphone-nav-icon"><ChevronLeft style={{ width: 16, height: 16 }} /></button>
              <span className="wl-iphone-screen-title">Choose avatar</span>
              <button
                onClick={() => setActiveStep(2)}
                className="wl-iphone-next-pill"
              >
                Next
              </button>
            </div>

            {/* Upload Custom Image Action */}
            <div className="wl-iphone-content-scroll">
              <label className="wl-iphone-upload-btn">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && onUploadUserPhoto) {
                      const reader = new FileReader();
                      reader.onload = (ev) => onUploadUserPhoto(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <Upload style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
                <span>Upload image</span>
              </label>

              {/* Grid of Avatars */}
              <div className="wl-iphone-avatar-grid">
                {mobileAvatars.map((avatar) => {
                  const isSelected = selectedPresetId === avatar.id || currentModelImage === avatar.img;
                  return (
                    <div
                      key={avatar.id}
                      onClick={() => {
                        onSelectPreset?.(avatar);
                        onRunTryOn?.({ userImage: avatar.img });
                      }}
                      className={`wl-iphone-avatar-card ${isSelected ? 'selected' : ''}`}
                    >
                      <img src={avatar.img} alt={avatar.name} className="wl-iphone-avatar-img" />
                      {isSelected && (
                        <div className="wl-avatar-check-badge">
                          <Check style={{ width: 10, height: 10, color: '#fff' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PHONE 2: STEP 2 - CHOOSE YOUR APPAREL
            ======================================================== */}
        <div className={`wl-phone-wrapper ${activeStep === 2 ? 'focus-phone' : ''}`}>
          <div className="wl-phone-label-box">
            <span className="wl-phone-step-badge">2</span>
            <h3 className="wl-phone-step-title">Choose Your Apparel</h3>
            <p className="wl-phone-step-desc">Upload your clothing items or explore our curated selection</p>
          </div>

          <div className="wl-iphone-mockup">
            {/* Dynamic Island & Status Bar */}
            <div className="wl-iphone-notch">
              <span className="wl-iphone-clock">9:41</span>
              <div className="wl-dynamic-island" />
              <div className="wl-iphone-icons">
                <span style={{ fontSize: '10px' }}>●●●</span>
                <span style={{ fontSize: '10px' }}>5G</span>
              </div>
            </div>

            {/* Model Preview Backdrop */}
            <div className="wl-iphone-stage-preview">
              <img
                src={renderedTryOnImg}
                alt="Selected Fit Backdrop"
                className="wl-iphone-stage-img"
              />
              <div className="wl-iphone-stage-overlay">
                <span className="wl-stage-brand-tag">{currentDisplayApparel.brand}</span>
              </div>
            </div>

            {/* Bottom Drawer Drawer UI */}
            <div className="wl-iphone-apparel-drawer">
              {/* Category Icons Row */}
              <div className="wl-iphone-cat-row">
                <button className="wl-cat-icon-chip active"><Shirt style={{ width: 13, height: 13 }} /></button>
                <button className="wl-cat-icon-chip"><Layers style={{ width: 13, height: 13 }} /></button>
                <button className="wl-cat-icon-chip"><Sparkle style={{ width: 13, height: 13 }} /></button>
                <button className="wl-cat-icon-chip"><Sliders style={{ width: 13, height: 13 }} /></button>
              </div>

              {/* Apparel Items Carousel */}
              <div className="wl-iphone-garments-scroll">
                <div className="wl-upload-garment-tile">
                  <Upload style={{ width: 16, height: 16, color: 'var(--text-muted)' }} />
                  <span>Upload</span>
                </div>

                {filteredApparel.map((item) => {
                  const isSelected = selectedProduct?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct?.(item);
                        onRunTryOn?.({ product: item });
                        setActiveStep(3);
                      }}
                      className={`wl-apparel-tile ${isSelected ? 'active' : ''}`}
                    >
                      <img src={item.img} alt={item.title} />
                      {isSelected && (
                        <div className="wl-apparel-active-aura">
                          <Sparkles style={{ width: 10, height: 10, color: 'var(--accent-gold)' }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Filter Pills */}
              <div className="wl-iphone-filter-pills">
                {filterTabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedFilter(tab)}
                    className={`wl-filter-pill ${selectedFilter === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PHONE 3: STEP 3 - VISUALIZE YOUR OUTFITS
            ======================================================== */}
        <div className={`wl-phone-wrapper ${activeStep === 3 ? 'focus-phone' : ''}`}>
          <div className="wl-phone-label-box">
            <span className="wl-phone-step-badge">3</span>
            <h3 className="wl-phone-step-title">Visualize Your Outfits</h3>
            <p className="wl-phone-step-desc">Instantly see how different outfits drape and fit on your body</p>
          </div>

          <div className="wl-iphone-mockup">
            {/* Dynamic Island & Status Bar */}
            <div className="wl-iphone-notch">
              <span className="wl-iphone-clock">9:41</span>
              <div className="wl-dynamic-island" />
              <div className="wl-iphone-icons">
                <span style={{ fontSize: '10px' }}>●●●</span>
                <span style={{ fontSize: '10px' }}>5G</span>
              </div>
            </div>

            {/* TryOn Screen Top Nav */}
            <div className="wl-iphone-app-header transparent">
              <button
                onClick={() => setActiveStep(2)}
                className="wl-iphone-nav-icon"
              >
                <ChevronLeft style={{ width: 16, height: 16 }} />
              </button>
              <span className="wl-iphone-screen-title">TryOn Result</span>
              <button
                onClick={handleSaveLook}
                className="wl-iphone-save-pill"
              >
                <Save style={{ width: 12, height: 12 }} />
                <span>{isSaved ? 'Saved!' : 'Save'}</span>
              </button>
            </div>

            {/* Full-Bleed High-Res Try-On Render */}
            <div className="wl-iphone-fullrender-container">
              <img
                src={showBeforeAfter ? currentModelImage : renderedTryOnImg}
                alt="Full Neural Try-On Result"
                className="wl-iphone-fullrender-img"
              />

              {/* Floating Action Tags */}
              <div className="wl-iphone-render-overlay-tags">
                <button className="wl-render-pill-tag">
                  <Info style={{ width: 11, height: 11 }} />
                  <span>Report result</span>
                </button>
                <button
                  onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                  className={`wl-render-pill-tag ${showBeforeAfter ? 'active' : ''}`}
                >
                  <Eye style={{ width: 11, height: 11 }} />
                  <span>{showBeforeAfter ? 'Viewing Before' : 'Compare Fit'}</span>
                </button>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="wl-iphone-floating-action-bar">
                <div className="wl-fab-meta">
                  <div className="wl-fab-title">{currentDisplayApparel.title || 'Crimson Power Blazer'}</div>
                  <div className="wl-fab-price">{currentDisplayApparel.price || '₹5,990'} • {currentDisplayApparel.brand || 'Zara'}</div>
                </div>

                <div className="wl-fab-btns-row">
                  <button
                    onClick={() => {
                      onAddToTryList?.(currentDisplayApparel);
                    }}
                    className="wl-fab-action-btn secondary"
                    title="Add to Try List"
                  >
                    <Heart style={{ width: 14, height: 14 }} />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart?.(currentDisplayApparel);
                      confetti({ particleCount: 60, spread: 60 });
                    }}
                    className="wl-fab-action-btn primary"
                  >
                    <ShoppingBag style={{ width: 14, height: 14 }} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
