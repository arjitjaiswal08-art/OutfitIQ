import React, { useRef } from 'react';
import { Upload, User, Check, RefreshCw } from 'lucide-react';

const PRESET_MODELS = [
  {
    id: "model_female_regular",
    name: "Elena V.",
    gender: "female",
    body_type: "regular",
    desc: "Studio Neutral Stance",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "model_female_athletic",
    name: "Maya S.",
    gender: "female",
    body_type: "athletic",
    desc: "Athletic Build",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "model_female_plus",
    name: "Sophia T.",
    gender: "female",
    body_type: "plus",
    desc: "Curvy Silhouette",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "model_male_athletic",
    name: "Marcus K.",
    gender: "male",
    body_type: "athletic",
    desc: "Athletic Build",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "model_male_slim",
    name: "Julian R.",
    gender: "male",
    body_type: "slim",
    desc: "Slim Runway",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "model_male_regular",
    name: "David H.",
    gender: "male",
    body_type: "regular",
    desc: "Standard Posture",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80"
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

  return (
    <div className="wl-panel" style={{ padding: '20px', marginBottom: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <span className="wl-badge wl-badge-cyan" style={{ marginBottom: '6px' }}>
            <User style={{ width: 13, height: 13 }} /> USER PERSONA STUDIO
          </span>
          <h3 className="wl-section-title" style={{ fontSize: '17px' }}>
            Model Persona & Morphology
          </h3>
        </div>

        {userImage && (
          <button
            onClick={() => onUserImageChange(null)}
            className="wl-tool-btn"
            style={{ fontSize: '11px', padding: '4px 10px' }}
          >
            <RefreshCw style={{ width: 12, height: 12 }} /> Reset
          </button>
        )}
      </div>

      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="wl-upload-box"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <div style={{
          width: '38px',
          height: '38px',
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
            Upload Your Own Photo
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Instant pose estimation & facial structure preservation
          </div>
        </div>
      </div>

      {/* Preset Models Grid */}
      <div className="wl-control-label">Or Select Studio Model Preset</div>
      <div className="wl-model-presets-grid">
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
            >
              {isSelected && (
                <div className="wl-check-badge" style={{ top: 6, right: 6, width: 16, height: 16 }}>
                  <Check style={{ width: 9, height: 9, strokeWidth: 3 }} />
                </div>
              )}
              <img
                src={preset.image}
                alt={preset.name}
                className="wl-preset-avatar"
              />
              <span className="wl-preset-name">{preset.name}</span>
              <span className="wl-preset-type">{preset.body_type}</span>
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
              style={{ textTransform: 'capitalize' }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="wl-control-row">
        <label className="wl-control-label">Body Morphology</label>
        <div className="wl-segmented-group">
          {['slim', 'regular', 'athletic', 'plus'].map((bt) => (
            <button
              key={bt}
              type="button"
              onClick={() => onBodyTypeChange(bt)}
              className={`wl-segmented-btn ${bodyType === bt ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {bt}
            </button>
          ))}
        </div>
      </div>

      <div className="wl-control-row" style={{ marginBottom: 0 }}>
        <label className="wl-control-label">Pose Alignment</label>
        <div className="wl-segmented-group">
          {[
            { id: 'same_pose', label: 'Keep Exact Pose' },
            { id: 'auto_adjust', label: 'Auto-Align Drape' }
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPosePreferenceChange(p.id)}
              className={`wl-segmented-btn ${posePreference === p.id ? 'active-cyan' : ''}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
