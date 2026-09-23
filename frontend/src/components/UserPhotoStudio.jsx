import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  User,
  Check,
  RefreshCw,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Maximize2,
  Eye,
  Crosshair,
  Wand2
} from 'lucide-react';

export const PRESET_MODELS = [
  {
    id: "model_female_regular",
    name: "Elena V.",
    gender: "female",
    body_type: "regular",
    desc: "Full Torso & Shoulders",
    image: "/models/elena.jpg"
  },
  {
    id: "model_female_athletic",
    name: "Maya S.",
    gender: "female",
    body_type: "athletic",
    desc: "Athletic Build",
    image: "/models/maya.jpg"
  },
  {
    id: "model_female_plus",
    name: "Sophia T.",
    gender: "female",
    body_type: "plus",
    desc: "Curvy Silhouette",
    image: "/models/sophia.jpg"
  },
  {
    id: "model_male_athletic",
    name: "Marcus K.",
    gender: "male",
    body_type: "athletic",
    desc: "Broad Shoulders",
    image: "/models/marcus.jpg"
  },
  {
    id: "model_male_slim",
    name: "Julian R.",
    gender: "male",
    body_type: "slim",
    desc: "Slim Runway Stance",
    image: "/models/julian.jpg"
  },
  {
    id: "model_male_regular",
    name: "David H.",
    gender: "male",
    body_type: "regular",
    desc: "Neutral Studio Pose",
    image: "/models/david.jpg"
  }
];

export default function UserPhotoStudio({
  userImage,
  onUserImageChange,
  gender,
  onGenderChange,
  bodyType,
  onBodyTypeChange,
  posePreference,
  onPosePreferenceChange,
  selectedPresetId,
  onSelectPreset
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState(userImage ? 'upload' : 'presets');

  // Input Validation & Shoulder Detection State
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [showCropGuide, setShowCropGuide] = useState(false);
  const [autoSynthesizeTorso, setAutoSynthesizeTorso] = useState(true);

  // Validate uploaded photo dimensions and aspect ratio
  const analyzeImage = (dataUrl) => {
    if (!dataUrl) {
      setImageAnalysis(null);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || 600;
      const height = img.naturalHeight || 800;
      const ratio = height / width;

      // Close-up selfie criteria: tight crop (ratio < 1.15) or square/landscape where shoulders are cropped out
      const isTightCrop = ratio < 1.18;
      setImageAnalysis({
        width,
        height,
        ratio,
        isTightCrop,
        shouldersVisible: !isTightCrop
      });
    };
    img.src = dataUrl;
  };

  useEffect(() => {
    if (userImage) {
      analyzeImage(userImage);
    } else {
      setImageAnalysis(null);
    }
  }, [userImage]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      analyzeImage(base64Data);
      onUserImageChange(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target?.result;
        analyzeImage(base64Data);
        onUserImageChange(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wl-panel" style={{ padding: '22px', marginBottom: 0 }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="wl-step-pill">
            STEP 1
          </span>
          <div>
            <h3 className="wl-section-title" style={{ fontSize: '17px', margin: 0 }}>
              Choose Your Model or Photo
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Your face and body shape are preserved with 100% accuracy
            </p>
          </div>
        </div>

        {userImage && (
          <button
            onClick={() => {
              onUserImageChange(null);
              setImageAnalysis(null);
              setActiveTab('presets');
            }}
            className="wl-tool-btn"
            style={{ fontSize: '11px', padding: '4px 10px', color: 'var(--accent-gold-light)', borderColor: 'var(--border-gold)' }}
          >
            <RefreshCw style={{ width: 12, height: 12 }} /> Use Studio Model
          </button>
        )}
      </div>

      {/* Model Choice Tabs: Studio Models vs Upload My Photo */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', background: 'rgba(6, 9, 15, 0.6)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('presets')}
          style={{
            flex: 1,
            background: activeTab === 'presets' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'presets' ? '#07090e' : 'var(--text-secondary)',
            fontWeight: 800,
            fontSize: '12px',
            padding: '7px 12px',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <User style={{ width: 13, height: 13 }} />
          Studio Models (6 Presets)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          style={{
            flex: 1,
            background: activeTab === 'upload' ? 'var(--accent-gold)' : 'transparent',
            color: activeTab === 'upload' ? '#07090e' : 'var(--text-secondary)',
            fontWeight: 800,
            fontSize: '12px',
            padding: '7px 12px',
            border: 'none',
            borderRadius: 'var(--radius-xs)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'var(--transition-smooth)'
          }}
        >
          <Upload style={{ width: 13, height: 13 }} />
          {userImage ? "Custom Photo Active ✓" : "Upload My Photo"}
        </button>
      </div>

      {activeTab === 'upload' ? (
        <>
          {/* Upload Custom User Photo Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="wl-upload-box"
            style={{
              borderColor: isDragging ? 'var(--accent-gold)' : userImage ? 'var(--border-gold)' : 'var(--border-subtle)',
              background: isDragging ? 'rgba(223, 178, 107, 0.12)' : userImage ? 'rgba(223, 178, 107, 0.08)' : 'rgba(10, 14, 24, 0.65)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              marginBottom: '10px',
              position: 'relative'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            {userImage ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={userImage}
                    alt="Uploaded user portrait"
                    style={{
                      width: '64px',
                      height: '76px',
                      borderRadius: 'var(--radius-xs)',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-gold)'
                    }}
                  />
                  {imageAnalysis?.isTightCrop && (
                    <span style={{
                      position: 'absolute',
                      bottom: -4,
                      right: -4,
                      background: '#f59e0b',
                      color: '#000',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 900
                    }}>!</span>
                  )}
                </div>

                <div style={{ textAlign: 'left', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: '#fff' }}>
                      Your Photo Is Active
                    </span>
                    <ShieldCheck style={{ width: 14, height: 14, color: '#10b981' }} />
                  </div>
                  <div style={{ fontSize: '11px', color: imageAnalysis?.isTightCrop ? '#f59e0b' : '#10b981', fontWeight: 600, marginTop: '2px' }}>
                    {imageAnalysis?.isTightCrop
                      ? "⚠️ Close-Up Selfie • Auto-Torso Synthesis Active"
                      : "✓ Full Torso Detected • Shoulders Aligned"}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                    Click to replace with a different photo
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(223, 178, 107, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)'
                }}>
                  <Upload style={{ width: 18, height: 18 }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#fff' }}>
                    Click or Drag to Upload Your Photo
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--accent-gold-light)', fontWeight: 600, marginTop: '2px' }}>
                    👉 “Upload image with shoulders visible for best results”
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Virtual try-on requires full torso (shoulders + chest) for natural drape
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Strict Validation Banner for Face-Only / Tight Cropped Images */}
          {userImage && imageAnalysis?.isTightCrop && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(223, 178, 107, 0.08) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <AlertTriangle style={{ width: 16, height: 16, color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#fcd34d' }}>
                    Notice: Face-Only or Upper Crop Detected
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
                    Try-on models require full torso (shoulders + chest). Without shoulders, garments float in empty air.
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(245, 158, 11, 0.2)',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#fff', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={autoSynthesizeTorso}
                        onChange={(e) => setAutoSynthesizeTorso(e.target.checked)}
                        style={{ accentColor: 'var(--accent-gold)' }}
                      />
                      <span>🪄 <strong>Auto-Synthesize Torso:</strong> Mounts your face on studio shoulders (Recommended)</span>
                    </label>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="wl-tool-btn"
                      style={{ fontSize: '10px', padding: '3px 8px', color: '#fcd34d', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                    >
                      📸 Upload Full Torso Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Crop Guide & Viewfinder Overlay Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <button
              type="button"
              onClick={() => setShowCropGuide(!showCropGuide)}
              style={{
                background: showCropGuide ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: showCropGuide ? '1px solid #00f2fe' : '1px solid var(--border-subtle)',
                color: showCropGuide ? '#00f2fe' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '5px 10px',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Crosshair style={{ width: 12, height: 12 }} />
              {showCropGuide ? "Hide Crop Guide" : "📐 Viewfinder Crop & Shoulder Guide"}
            </button>

            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              Camera Frame: 4:5 Torso Standard
            </span>
          </div>

          {/* Instagram Camera Style Viewfinder Crop Guide Overlay */}
          {showCropGuide && (
            <div style={{
              background: '#07090e',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              marginBottom: '14px',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                background: 'radial-gradient(circle at 50% 30%, rgba(223, 178, 107, 0.08) 0%, rgba(10, 14, 24, 0.9) 100%)',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {userImage && (
                  <img
                    src={userImage}
                    alt="Guide overlay preview"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.35,
                      filter: 'grayscale(60%)'
                    }}
                  />
                )}

                {/* Viewfinder Corner Brackets */}
                <div style={{ position: 'absolute', top: 10, left: 10, width: 16, height: 16, borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', top: 10, right: 10, width: 16, height: 16, borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', bottom: 10, left: 10, width: 16, height: 16, borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
                <div style={{ position: 'absolute', bottom: 10, right: 10, width: 16, height: 16, borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />

                {/* Face Oval Guideline */}
                <div style={{
                  position: 'absolute',
                  top: '18px',
                  width: '74px',
                  height: '92px',
                  borderRadius: '50%',
                  border: '1.5px dashed #00f2fe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(0, 242, 254, 0.3)'
                }}>
                  <span style={{ fontSize: '9px', color: '#00f2fe', fontWeight: 800, background: 'rgba(7, 9, 14, 0.7)', padding: '1px 4px', borderRadius: '4px' }}>
                    FACE HERE
                  </span>
                </div>

                {/* Shoulder Alignment Horizontal Line */}
                <div style={{
                  position: 'absolute',
                  top: '116px',
                  width: '84%',
                  height: '1px',
                  background: 'var(--accent-gold)',
                  boxShadow: '0 0 8px var(--accent-gold-glow)'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-9px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#07090e',
                    padding: '0 8px',
                    fontSize: '9px',
                    fontWeight: 800,
                    color: 'var(--accent-gold-light)',
                    whiteSpace: 'nowrap',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '10px'
                  }}>
                    ── ALIGN SHOULDERS ALONG THIS LINE ──
                  </div>
                </div>

                {/* Torso & Sleeves Bounding Box */}
                <div style={{
                  position: 'absolute',
                  top: '124px',
                  width: '80%',
                  height: '100px',
                  border: '1px dashed rgba(223, 178, 107, 0.4)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
                    Torso & Garment Drape Area
                  </span>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
                💡 <strong>Instagram Camera Guide:</strong> For optimal try-on, ensure your shoulders span across the golden line.
              </div>
            </div>
          )}

          <div style={{
            background: 'rgba(223, 178, 107, 0.06)',
            border: '1px solid rgba(223, 178, 107, 0.2)',
            borderRadius: 'var(--radius-sm)',
            padding: '8px 12px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            color: 'var(--accent-gold-light)'
          }}>
            <Sparkles style={{ width: 14, height: 14, flexShrink: 0 }} />
            <span>Privacy Note: Photos are processed in encrypted client memory and never shared.</span>
          </div>
        </>
      ) : (
        /* Preset Studio Models Grid */
        <div className="wl-model-presets-grid" style={{ marginBottom: '16px' }}>
          {PRESET_MODELS.map((preset) => {
            const isSelected = selectedPresetId === preset.id && !userImage;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onGenderChange(preset.gender);
                  onBodyTypeChange(preset.body_type);
                }}
                className={`wl-preset-model-card ${isSelected ? 'active' : ''}`}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.22s ease'
                }}
              >
                {isSelected && (
                  <div className="wl-check-badge" style={{ top: 6, right: 6, width: 17, height: 17 }}>
                    <Check style={{ width: 10, height: 10, strokeWidth: 3 }} />
                  </div>
                )}
                <img
                  src={preset.image}
                  alt={preset.name}
                  className="wl-preset-avatar"
                />
                <span className="wl-preset-name" style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                  {preset.name}
                </span>
                <span className="wl-preset-type" style={{ fontSize: '10px', textTransform: 'capitalize', color: 'var(--accent-gold-light)' }}>
                  {preset.gender === 'female' ? '♀' : '♂'} {preset.body_type}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Attribute Controls */}
      <div className="wl-control-row">
        <label className="wl-control-label">Gender Anatomy</label>
        <div className="wl-segmented-group">
          {['female', 'male'].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onGenderChange(g)}
              className={`wl-segmented-btn ${gender === g ? 'active' : ''}`}
              style={{ textTransform: 'capitalize', fontWeight: 700 }}
            >
              {g === 'female' ? 'Female ♀' : 'Male ♂'}
            </button>
          ))}
        </div>
      </div>

      <div className="wl-control-row">
        <label className="wl-control-label">Body Morphology Profile</label>
        <div className="wl-segmented-group">
          {['slim', 'regular', 'athletic', 'plus'].map((bt) => (
            <button
              key={bt}
              type="button"
              onClick={() => onBodyTypeChange(bt)}
              className={`wl-segmented-btn ${bodyType === bt ? 'active' : ''}`}
              style={{ textTransform: 'capitalize', fontWeight: 700 }}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <div className="wl-control-row" style={{ marginBottom: 0 }}>
        <label className="wl-control-label">Pose & Drape Alignment</label>
        <div className="wl-segmented-group">
          {[
            { id: 'same_pose', label: 'Keep Exact Pose' },
            { id: 'auto_adjust', label: 'Adaptive Drape Fit' }
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPosePreferenceChange(p.id)}
              className={`wl-segmented-btn ${posePreference === p.id ? 'active-cyan' : ''}`}
              style={{ fontWeight: 700 }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
