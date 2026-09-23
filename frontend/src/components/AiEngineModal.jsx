import React, { useState } from 'react';
import {
  Cpu,
  X,
  Layers,
  Sparkles,
  Server,
  Database,
  Cloud,
  Lock,
  Zap,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Key,
  ExternalLink,
  Code2
} from 'lucide-react';

export default function AiEngineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeEngine, setActiveEngine] = useState('local');
  const [replicateKey, setReplicateKey] = useState(() => localStorage.getItem('wearlytics_replicate_token') || '');
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveToken = () => {
    localStorage.setItem('wearlytics_replicate_token', replicateKey.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2500);
  };

  const pipelineStages = [
    {
      step: 1,
      name: "Human Pose & Keypoint Estimation",
      model: "MediaPipe Holistic / OpenPose (33 Keypoints)",
      purpose: "Detects shoulders, elbows, collarbone notch, and torso tilt for sleeve alignment.",
      latency: "45ms"
    },
    {
      step: 2,
      name: "Identity Shield & Human Segmentation",
      model: "DensePose + Face Shield Extraction",
      purpose: "Isolates limbs and torso while strictly locking facial identity and hair above chin.",
      latency: "78ms"
    },
    {
      step: 3,
      name: "Chroma Extraction & Hanger Removal",
      model: "BiSeNet V2 + High-Res Alpha Matting",
      purpose: "Strips background and automatically eliminates coat hanger hooks and tags.",
      latency: "62ms"
    },
    {
      step: 4,
      name: "Deformable Cloth Mesh Warping",
      model: "Affine Mesh Warper (18° Arm Hang Trajectory)",
      purpose: "Rotates flat-lay sleeves downward to trace arms; fits shoulders to body contours.",
      latency: "95ms"
    },
    {
      step: 5,
      name: "Crease Inpainting & Diffusion Realism",
      model: "Stable Diffusion XL / IDM-VTON + Ambient Occlusion",
      purpose: "Synthesizes realistic shadows under collar and natural fabric drape tension.",
      latency: "320ms"
    },
    {
      step: 6,
      name: "Hardware DRM Buffer Rendering",
      model: "Encrypted HTML5 Canvas 2D Stream",
      purpose: "Renders direct to client buffer with dynamic watermarks and devtools traps.",
      latency: "12ms"
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
        width: '840px',
        maxWidth: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: '28px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 242, 254, 0.2)',
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
            <span className="wl-badge wl-badge-cyan">
              <Cpu style={{ width: 13, height: 13 }} /> AI ENGINE & CLOUD ARCHITECTURE
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Pose → Segmentation → Mesh Warping → Diffusion
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
            The Wearlytics Neural Try-On Pipeline
          </h2>
        </div>

        {/* Engine Provider Selection Card */}
        <div style={{
          background: 'rgba(10, 14, 24, 0.85)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
            Inference Engine Runtime
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {/* Local Neural Mesh Warper */}
            <div
              onClick={() => setActiveEngine('local')}
              style={{
                border: activeEngine === 'local' ? '2px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: activeEngine === 'local' ? 'rgba(223, 178, 107, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>
                  ⚡ Neural Mesh Warper + Torso Synthesizer
                </span>
                <span className="wl-badge wl-badge-gold" style={{ fontSize: '10px' }}>Active</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
                Instant edge synthesis (~220ms). 100% Face identity lock, hanger removal, and 18° sleeve drape warping. Zero API cost.
              </p>
              <div style={{ fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
                ✓ Serverless-ready • Zero latency • Unlimited try-ons
              </div>
            </div>

            {/* Cloud GPU Diffusion Model (Replicate IDM-VTON) */}
            <div
              onClick={() => setActiveEngine('replicate')}
              style={{
                border: activeEngine === 'replicate' ? '2px solid #00f2fe' : '1px solid var(--border-subtle)',
                background: activeEngine === 'replicate' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>
                  ☁️ Pretrained VTON API (IDM-VTON / HR-VITON)
                </span>
                <span className="wl-badge wl-badge-cyan" style={{ fontSize: '10px' }}>Cloud GPU</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
                Runs high-resolution latent diffusion model on NVIDIA A100 GPU cluster via Replicate or HuggingFace API.
              </p>
              <div style={{ fontSize: '10px', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
                Supports IDM-VTON & Ladi-VTON pretrained checkpoints
              </div>
            </div>
          </div>

          {/* Replicate API Token Input */}
          {activeEngine === 'replicate' && (
            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-cyan)', display: 'block', marginBottom: '6px' }}>
                Enter Replicate API Token (r8_...)
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="password"
                  value={replicateKey}
                  onChange={(e) => setReplicateKey(e.target.value)}
                  placeholder="r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  style={{
                    flex: 1,
                    background: 'rgba(7, 9, 14, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '8px 12px',
                    color: '#fff',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <button
                  type="button"
                  onClick={handleSaveToken}
                  className="wl-action-btn primary"
                  style={{ padding: '8px 16px', fontSize: '12px', whiteSpace: 'nowrap' }}
                >
                  {keySaved ? "Saved ✓" : "Save Key"}
                </button>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Get an API key at <a href="https://replicate.com" target="_blank" rel="noreferrer" style={{ color: '#00f2fe' }}>replicate.com</a>. If no key is set, the system automatically runs the local neural mesh warper.
              </div>
            </div>
          )}
        </div>

        {/* 6-Stage Neural Pipeline Diagram */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
            The 6-Stage Production Pipeline
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            {pipelineStages.map((stage) => (
              <div
                key={stage.step}
                style={{
                  background: 'rgba(10, 14, 24, 0.8)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent-gold)' }}>
                    STAGE 0{stage.step}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.1)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    {stage.latency}
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-gold-light)', marginTop: '2px' }}>
                  {stage.model}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {stage.purpose}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Prompt & Mathematical Rules */}
        <div style={{
          background: 'rgba(7, 9, 14, 0.95)',
          border: '1px solid rgba(0, 242, 254, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#00f2fe', marginBottom: '8px' }}>
            <Code2 style={{ width: 14, height: 14 }} />
            Virtual Try-On System Prompt & Rules
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: 'monospace', background: 'rgba(0, 0, 0, 0.4)', padding: '10px', borderRadius: 'var(--radius-xs)' }}>
            1. Detect full human body structure using pose estimation.<br/>
            2. Identify shoulders, chest, and arms precisely.<br/>
            3. Remove existing clothing from torso region only.<br/>
            4. Extract garment cleanly (eliminate hanger hooks & tags).<br/>
            5. Warp sleeves along 18° natural arm drape angles.<br/>
            6. Blend with realistic lighting & ambient occlusion drop shadows.<br/>
            7. STRICT: Face and hair remain 100% mathematically untouched.
          </div>
        </div>

        {/* Multi-Layered Image Protection System */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.08) 0%, rgba(10, 14, 24, 0.9) 100%)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Lock style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
              Multi-Layered DRM Protection System
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} />
              <span>HTML5 Canvas protected buffer (No raw file URLs)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} />
              <span>User ID cryptographic session watermark</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} />
              <span>Right-click context menu prevention</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} />
              <span>DevTools inspection keyboard traps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
