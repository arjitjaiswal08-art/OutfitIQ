import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, Clock } from 'lucide-react';

const PIPELINE_STEPS = [
  { id: 1, name: "Human Pose Estimation", detail: "OpenPose / MediaPipe 33-point keypoints" },
  { id: 2, name: "Identity & Face Segmentation", detail: "Facial contour & identity lock" },
  { id: 3, name: "Deformable Cloth Mesh Warping", detail: "Thin Plate Spline landmark alignment" },
  { id: 4, name: "Crease & Shading Inpainting", detail: "Natural folds & ambient drop shadows" },
  { id: 5, name: "DRM Watermark Injection", detail: "Hardware canvas buffer rendering" }
];

export default function PipelineStatus({ isRunning }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setCurrentStep(PIPELINE_STEPS.length);
      return;
    }

    setCurrentStep(1);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < PIPELINE_STEPS.length) return prev + 1;
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="wl-panel" style={{ padding: '18px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu style={{ width: 16, height: 16, color: 'var(--accent-gold)' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#fff' }}>
            Neural Virtual Try-On Pipeline
          </span>
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {isRunning ? "Running active neural inference..." : "Inference pipeline ready"}
        </span>
      </div>

      <div className="wl-pipeline-grid">
        {PIPELINE_STEPS.map((step) => {
          const isDone = currentStep > step.id || (!isRunning && currentStep === PIPELINE_STEPS.length);
          const isCurrent = isRunning && currentStep === step.id;
          return (
            <div
              key={step.id}
              className={`wl-pipe-step-card ${isDone ? 'done' : isCurrent ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="wl-pipe-step-num">STEP 0{step.id}</span>
                {isDone ? (
                  <CheckCircle2 style={{ width: 14, height: 14, color: '#10b981' }} />
                ) : isCurrent ? (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-gold)', animation: 'pulse 1s infinite' }} />
                ) : (
                  <Clock style={{ width: 12, height: 12, color: 'var(--text-muted)' }} />
                )}
              </div>
              <div className="wl-pipe-step-title">{step.name}</div>
              <div className="wl-pipe-step-detail">{step.detail}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
