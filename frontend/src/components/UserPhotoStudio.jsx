import React, { useRef, useState } from 'react';
import {
  Upload,
  User,
  Check,
  RefreshCw,
  Camera,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PRESET_MODELS = [
  {
    id: "model_female_regular",
    name: "Elena V.",
    gender: "female",
    body_type: "regular",
    desc: "Studio Neutral Stance",
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
    desc: "Athletic Build",
    image: "/models/marcus.jpg"
  },
  {
    id: "model_male_slim",
    name: "Julian R.",
    gender: "male",
    body_type: "slim",
    desc: "Slim Runway",
    image: "/models/julian.jpg"
  },
  {
    id: "model_male_regular",
    name: "David H.",
    gender: "male",
    body_type: "regular",
    desc: "Standard Posture",
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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
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
        onUserImageChange(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="wl-panel" style={{ padding: '22px', marginBottom: 0 }}>
      {/* Studio Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="wl-badge wl-badge-cyan" style={{ marginBottom: '6px' }}>
            <User style={{ width: 13, height: 13 }} /> USER PERSONA STUDIO
          </span>
          <h3 className="wl-section-title" style={{ fontSize: '18px' }}>
            Model Persona & Morphology
          </h3>
        </div>

        {userImage && (
          <button
            onClick={() => onUserImageChange(null)}
            className="wl-tool-btn"
            style={{ fontSize: '11px', padding: '4px 10px', color: 'var(--accent-gold-light)', borderColor: 'var(--border-gold)' }}
          >
            <RefreshCw style={{ width: 12, height: 12 }} /> Reset to Studio Model
          </button>
        )}
      </div>

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
          padding: '14px 18px',
          cursor: 'pointer',
          transition: 'var(--transition-smooth)'
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
            <img
              src={userImage}
              alt="Uploaded user portrait"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-gold)'
              }}
            />
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '13px', color: '#fff' }}>
                  Custom User Photo Active
                </span>
                <ShieldCheck style={{ width: 14, height: 14, color: '#10b981' }} />
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Facial identity locked • 33-point body keypoints estimated
              </div>
            </div>
            <span className="wl-badge wl-badge-gold" style={{ fontSize: '9px' }}>
              CUSTOM
            </span>
          </div>
        ) : (
          <>
            <div style={{
              width: '40px',
              height: '40px',
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
                Upload Your Own Full-Body Photo
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Drag & drop or browse • Auto pose estimation & identity preservation
              </div>
            </div>
          </>
        )}
      </div>

      {/* Preset Studio Models Grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <label className="wl-control-label" style={{ margin: 0 }}>
          Or Select Studio Model Persona
        </label>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          6 Studio Lighting Presets
        </span>
      </div>

      <div className="wl-model-presets-grid" style={{ marginBottom: '18px' }}>
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
