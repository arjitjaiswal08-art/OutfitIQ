import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Shield, Lock, ZoomIn, RefreshCw, AlertTriangle } from 'lucide-react';

export default function DrmProtectedCanvas({
  primaryImage,
  beforeImage,
  drmToken,
  isLoading,
  zoomActive,
  setZoomActive,
  onResetZoom,
  selectedAngle = "front",
  selectedFit = "regular",
  selectedSize = "M"
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const loupeCanvasRef = useRef(null);

  // Before / After slider split percentage (0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // DRM & Anti-screenshot Shield State
  const [isCaptureBlocked, setIsCaptureBlocked] = useState(false);
  const [captureReason, setCaptureReason] = useState("");
  const [loupeState, setLoupeState] = useState({ visible: false, x: 0, y: 0, normX: 0, normY: 0 });

  // Time-stamped live session watermark
  const [liveTimestamp, setLiveTimestamp] = useState(new Date().toLocaleTimeString());

  // Cached Image elements
  const tryonImgRef = useRef(null);
  const beforeImgRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTimestamp(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Preload Images
  useEffect(() => {
    if (primaryImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = primaryImage;
      img.onload = () => {
        tryonImgRef.current = img;
        drawCanvas();
      };
    }
  }, [primaryImage]);

  useEffect(() => {
    if (beforeImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = beforeImage;
      img.onload = () => {
        beforeImgRef.current = img;
        drawCanvas();
      };
    }
  }, [beforeImage]);

  // Anti-Screenshot & Screen Capture Trap
  useEffect(() => {
    const triggerShield = (reason) => {
      setIsCaptureBlocked(true);
      setCaptureReason(reason);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerShield("Window/App focus lost. Screen capture guard triggered.");
      }
    };

    const handleBlur = () => {
      triggerShield("Application window blurred. Anti-capture shield active.");
    };

    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        triggerShield("PrintScreen capture attempt intercepted.");
        return;
      }
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        triggerShield("macOS screenshot shortcut (Cmd+Shift+3/4/5) blocked.");
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        triggerShield("Screen clipping shortcut intercepted.");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'J')) {
        e.preventDefault();
        triggerShield("Developer Tools inspection blocked.");
        return;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Main Canvas Drawing Routine
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const splitX = (sliderPos / 100) * width;

    // 1. Draw "Before" image on left
    if (beforeImgRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, height);
      ctx.clip();
      ctx.drawImage(beforeImgRef.current, 0, 0, width, height);
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(16, 16, 140, 32);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px Outfit, sans-serif";
      ctx.fillText("ORIGINAL PHOTO", 24, 37);
      ctx.restore();
    }

    // 2. Draw "Virtual Try-On" image on right
    if (tryonImgRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, width - splitX, height);
      ctx.clip();
      ctx.drawImage(tryonImgRef.current, 0, 0, width, height);

      ctx.fillStyle = "rgba(223, 178, 107, 0.95)";
      ctx.fillRect(width - 170, 16, 154, 32);
      ctx.fillStyle = "#07090e";
      ctx.font = "bold 13px Outfit, sans-serif";
      ctx.fillText("AI TRY-ON ACTIVE", width - 156, 37);
      ctx.restore();
    }

    // 3. Dynamic DRM Security Watermark Matrix
    const sessionId = drmToken?.session_id || "WL-SEC-8821";
    ctx.save();
    ctx.font = "bold 12px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.rotate(-18 * Math.PI / 180);
    for (let y = -200; y < height + 400; y += 130) {
      for (let x = -200; x < width + 300; x += 320) {
        ctx.fillText(`PREVIEW ONLY • DRM PROTECTED • ${sessionId}`, x, y);
      }
    }
    ctx.restore();

    // 4. Bottom Stream Bar
    ctx.fillStyle = "rgba(7, 9, 14, 0.92)";
    ctx.fillRect(0, height - 32, width, 32);
    ctx.fillStyle = "#dfb26b";
    ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
    ctx.fillText(`🔒 WEARLYTICS DRM ENCRYPTED FEED • SESSION: ${sessionId} • ${liveTimestamp}`, 16, height - 12);
    ctx.fillStyle = "#00f2fe";
    ctx.fillText(`PERSPECTIVE: ${selectedAngle.toUpperCase()} | SILHOUETTE: ${selectedFit.toUpperCase()} | SIZE: ${selectedSize}`, width - 360, height - 12);

    // Update Loupe if active
    if (zoomActive && loupeState.visible && loupeCanvasRef.current) {
      drawLoupe();
    }
  }, [sliderPos, drmToken, liveTimestamp, selectedAngle, selectedFit, selectedSize, zoomActive, loupeState]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Loupe Zoom Drawing
  const drawLoupe = () => {
    const lCanvas = loupeCanvasRef.current;
    if (!lCanvas) return;
    const lCtx = lCanvas.getContext('2d');
    if (!lCtx) return;

    lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
    const srcImg = (sliderPos < 50) ? tryonImgRef.current : (tryonImgRef.current || beforeImgRef.current);
    if (!srcImg) return;

    const zoomFactor = 2.5;
    const srcW = lCanvas.width / zoomFactor;
    const srcH = lCanvas.height / zoomFactor;
    const srcX = Math.max(0, Math.min(srcImg.width - srcW, loupeState.normX * srcImg.width - srcW / 2));
    const srcY = Math.max(0, Math.min(srcImg.height - srcH, loupeState.normY * srcImg.height - srcH / 2));

    lCtx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, lCanvas.width, lCanvas.height);

    lCtx.strokeStyle = "rgba(223, 178, 107, 0.5)";
    lCtx.lineWidth = 1.5;
    lCtx.beginPath();
    lCtx.arc(lCanvas.width / 2, lCanvas.height / 2, 22, 0, 2 * Math.PI);
    lCtx.stroke();
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    updateSlider(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updateSlider(e);
    }
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = Math.max(0, Math.min(1, x / rect.width));
      const normY = Math.max(0, Math.min(1, y / rect.height));

      setLoupeState({
        visible: true,
        x,
        y,
        normX,
        normY
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
    setLoupeState(prev => ({ ...prev, visible: false }));
  };

  const updateSlider = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const offsetX = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPos(percent);
  };

  return (
    <div className="wl-viewport-card">
      {/* Top Toolbar */}
      <div className="wl-viewport-toolbar">
        <div className="wl-toolbar-group">
          <span className="wl-badge wl-badge-drm">
            <Lock style={{ width: 13, height: 13 }} /> HARDWARE DRM ACTIVE
          </span>
          <span className="wl-badge wl-badge-gold">
            <Shield style={{ width: 13, height: 13 }} /> SCREEN SHIELD ENGAGED
          </span>
        </div>

        <div className="wl-toolbar-group">
          <button
            onClick={() => setZoomActive(!zoomActive)}
            className={`wl-tool-btn ${zoomActive ? 'active' : ''}`}
            title="Inspect fabric weave and stitching"
          >
            <ZoomIn style={{ width: 14, height: 14, color: 'var(--accent-gold)' }} />
            {zoomActive ? "Loupe Active (2.5x)" : "Inspection Loupe"}
          </button>
          <button
            onClick={() => setSliderPos(50)}
            className="wl-tool-btn"
            title="Reset to 50/50 comparison"
          >
            <RefreshCw style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>

      {/* Main Viewport Box */}
      <div
        ref={containerRef}
        className="wl-canvas-box"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* HTML5 Protected Canvas */}
        <canvas
          ref={canvasRef}
          width={768}
          height={1024}
          className="wl-render-canvas"
        />

        {/* Dynamic Watermark Drift Overlay */}
        <div className="wl-watermark-drift">
          <div className="wl-watermark-item">
            PREVIEW ONLY • WEARLYTICS DRM • {drmToken?.session_id || "WL-001"} • {liveTimestamp}
          </div>
          <div className="wl-watermark-item">
            CONFIDENTIAL AI TRY-ON PREVIEW • UNAUTHORIZED CAPTURE PROHIBITED
          </div>
          <div className="wl-watermark-item">
            WEARLYTICS SECURE STREAM • ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Draggable Divider Line */}
        <div
          className="wl-divider-line"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="wl-divider-grip">
            ↔
          </div>
        </div>

        {/* Inspection Loupe */}
        {zoomActive && loupeState.visible && (
          <div
            className="wl-zoom-loupe"
            style={{
              left: `${loupeState.x - 80}px`,
              top: `${loupeState.y - 80}px`,
            }}
          >
            <canvas
              ref={loupeCanvasRef}
              width={160}
              height={160}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}

        {/* Loading Pipeline Hologram Overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 7, 10, 0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '3px solid rgba(223, 178, 107, 0.2)',
              borderTopColor: 'var(--accent-gold)',
              animation: 'spin 1s linear infinite',
              marginBottom: '18px'
            }} />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: 'var(--accent-gold-light)' }}>
              Neural Try-On Synthesizer
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '300px', marginTop: '6px' }}>
              Fitting garment mesh, aligning pose keypoints, and synthesizing photorealistic drapery...
            </p>
          </div>
        )}

        {/* DRM SCREEN CAPTURE BLOCKED SHIELD */}
        {isCaptureBlocked && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 7, 10, 0.96)',
            backdropFilter: 'blur(28px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '32px',
            textAlign: 'center',
            border: '2px dashed rgba(244, 63, 94, 0.5)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid #f43f5e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f43f5e',
              marginBottom: '16px'
            }}>
              <AlertTriangle style={{ width: 32, height: 32 }} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#fff' }}>
              SCREEN CAPTURE BLOCKED
            </h3>
            <p style={{ fontSize: '13px', color: '#fda4af', maxWidth: '420px', margin: '8px 0 16px 0', fontFamily: 'monospace' }}>
              {captureReason}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '360px', marginBottom: '24px' }}>
              Wearlytics strictly protects designer apparel assets against screen scraping and unauthorized capture.
            </p>
            <button
              onClick={() => setIsCaptureBlocked(false)}
              className="wl-btn-extract"
              style={{ fontSize: '13px', padding: '10px 24px' }}
            >
              Resume Secure Session
            </button>
          </div>
        )}
      </div>

      {/* Comparison Helper Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px' }}>
        <span>← Drag center divider to compare Original vs AI Fit →</span>
        <span style={{ color: 'var(--accent-gold-light)', fontWeight: 700 }}>Split: {Math.round(sliderPos)}% / {100 - Math.round(sliderPos)}%</span>
      </div>
    </div>
  );
}
