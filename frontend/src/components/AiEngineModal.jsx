import React from 'react';
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
  CheckCircle2
} from 'lucide-react';

export default function AiEngineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const pipelineStages = [
    {
      step: 1,
      name: "Human Pose & Keypoint Estimation",
      model: "MediaPipe Holistic / OpenPose (33 Keypoints)",
      purpose: "Detects shoulders, elbows, wrists, collarbone coordinates, and torso tilt.",
      latency: "45ms"
    },
    {
      step: 2,
      name: "Human Body Segmentation",
      model: "U2Net / Detectron2 DensePose",
      purpose: "Isolates limbs and torso while strictly locking facial identity and original hair.",
      latency: "78ms"
    },
    {
      step: 3,
      name: "Garment Boundary & Chroma-Matting",
      model: "BiSeNet V2 + High-Res Alpha Matting",
      purpose: "Separates garment fabric from background and strips out white polygon edges.",
      latency: "62ms"
    },
    {
      step: 4,
      name: "Deformable Cloth Mesh Warping",
      model: "HR-VITON / IDM-VTON (Thin-Plate Splines)",
      purpose: "Warps fabric to body contours based on size (S-XXL) and drape tension.",
      latency: "190ms"
    },
    {
      step: 5,
      name: "Crease Inpainting & Diffusion Realism",
      model: "Stable Diffusion XL + ControlNet (Canny / OpenPose)",
      purpose: "Synthesizes realistic shadows, light bounce, and textile draping folds.",
      latency: "420ms"
    },
    {
      step: 6,
      name: "Hardware DRM Buffer Rendering",
      model: "Encrypted HTML5 Canvas 2D Stream",
      purpose: "Draws directly to client buffer with dynamic watermarks and devtools traps.",
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
        width: '820px',
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
              Neural Draping Pipeline • Enterprise Cloud Topology • DRM Security
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: '#fff' }}>
            The Wearlytics Neural Try-On Architecture
          </h2>
        </div>

        {/* 1. 6-Stage Neural Pipeline Diagram */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
            6-Stage Neural Inference Pipeline (~807ms Total Latency)
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
                  Model: {stage.model}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                  {stage.purpose}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Cloud Infrastructure Setup */}
        <div style={{
          background: 'rgba(8, 12, 20, 0.85)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Server style={{ width: 15, height: 15, color: 'var(--accent-cyan)' }} />
            Enterprise Cloud Infrastructure Stack
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>API Gateway</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>FastAPI + Vercel Edge</div>
              <div style={{ fontSize: '10px', color: 'var(--accent-gold-light)', marginTop: '2px' }}>Rate limiting + JWT Auth</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>GPU Inference Cluster</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>NVIDIA A100 80GB</div>
              <div style={{ fontSize: '10px', color: '#10b981', marginTop: '2px' }}>RunPod / AWS EC2 g5.xlarge</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Relational Database</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>PostgreSQL</div>
              <div style={{ fontSize: '10px', color: 'var(--accent-cyan)', marginTop: '2px' }}>Neon / Supabase Serverless</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Memory Cache</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>Redis 7.2</div>
              <div style={{ fontSize: '10px', color: 'var(--accent-gold-light)', marginTop: '2px' }}>Upstash Sub-ms Quota</div>
            </div>
          </div>
        </div>

        {/* 3. Image Protection System Details */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(223, 178, 107, 0.08) 0%, rgba(10, 14, 24, 0.9) 100%)',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Lock style={{ width: 15, height: 15, color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>
              Multi-Layered Image Protection System
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 style={{ width: 13, height: 13, color: '#10b981' }} />
              <span>HTML5 Canvas protected buffer (No static img URLs)</span>
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
