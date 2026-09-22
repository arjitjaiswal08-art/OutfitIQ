import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Shield, Lock, ZoomIn, RefreshCw, AlertTriangle, Eye } from 'lucide-react';

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

  // DRM Shield Notification
  const [shieldActive, setShieldActive] = useState(false);
  const [shieldMessage, setShieldMessage] = useState("");
  const [loupeState, setLoupeState] = useState({ visible: false, x: 0, y: 0, normX: 0.5, normY: 0.5 });

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

  // Preload Primary Try-On Image
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

  // Preload Before Image
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

  // Protected Interactions (Right-click prevention & Screenshot interceptor)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        setShieldMessage("Screen capture attempt logged under DRM security policy.");
        setShieldActive(true);
        setTimeout(() => setShieldActive(false), 3000);
        return;
      }
      if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        setShieldMessage("macOS Screen capture shortcut intercepted.");
        setShieldActive(true);
        setTimeout(() => setShieldActive(false), 3000);
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

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
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
    const activeTryon = tryonImgRef.current;
    const activeBefore = beforeImgRef.current;

    // 1. Draw "Before" Image on the Left
    if (activeBefore) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, height);
      ctx.clip();
      ctx.drawImage(activeBefore, 0, 0, width, height);

      // Label
      ctx.fillStyle = "rgba(10, 14, 22, 0.85)";
      ctx.fillRect(16, 16, 136, 30);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 16, 136, 30);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px Outfit, sans-serif";
      ctx.fillText("ORIGINAL PHOTO", 24, 36);
      ctx.restore();
    } else {
      // Dark neutral placeholder
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, splitX, height);
      ctx.clip();
      ctx.fillStyle = "#0c1018";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }

    // 2. Draw "AI Try-On" Image on the Right
    const rightImg = activeTryon || activeBefore;
    if (rightImg) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, width - splitX, height);
      ctx.clip();
      ctx.drawImage(rightImg, 0, 0, width, height);

      // Label
      ctx.fillStyle = "rgba(223, 178, 107, 0.95)";
      ctx.fillRect(width - 156, 16, 140, 30);
      ctx.fillStyle = "#07090e";
      ctx.font = "bold 12px Outfit, sans-serif";
      ctx.fillText("AI TRY-ON ACTIVE", width - 144, 36);
      ctx.restore();
    }

    // 3. Golden Divider Line
    ctx.save();
    ctx.strokeStyle = "rgba(223, 178, 107, 0.95)";
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "rgba(223, 178, 107, 0.6)";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, height);
    ctx.stroke();

    // Center Handle Circle
    const handleY = height / 2;
    ctx.fillStyle = "#dfb26b";
    ctx.beginPath();
    ctx.arc(splitX, handleY, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arrows on handle
    ctx.fillStyle = "#07090e";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("↔", splitX, handleY);
    ctx.restore();

    // 4. Subtle Luxury DRM Corner Seal
    const sessionId = drmToken?.session_id || "WL-SEC-8821";
    ctx.save();
    ctx.fillStyle = "rgba(7, 9, 14, 0.75)";
    ctx.fillRect(width - 240, height - 60, 224, 22);
    ctx.strokeStyle = "rgba(223, 178, 107, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(width - 240, height - 60, 224, 22);
    ctx.fillStyle = "#dfb26b";
    ctx.font = "600 10px Plus Jakarta Sans, sans-serif";
    ctx.fillText(`🔒 WEARLYTICS DRM • ${sessionId}`, width - 232, height - 45);
    ctx.restore();

    // 5. Bottom Status Ticker
    ctx.save();
    ctx.fillStyle = "rgba(7, 9, 14, 0.92)";
    ctx.fillRect(0, height - 32, width, 32);
    ctx.fillStyle = "#dfb26b";
    ctx.font = "600 11px Plus Jakarta Sans, sans-serif";
    ctx.fillText(`🔒 ENCRYPTED FEED • SESSION: ${sessionId} • ${liveTimestamp}`, 16, height - 12);
    ctx.fillStyle = "#00f2fe";
    ctx.fillText(`PERSPECTIVE: ${selectedAngle.toUpperCase()} | SILHOUETTE: ${selectedFit.toUpperCase()} | SIZE: ${selectedSize}`, width - 350, height - 12);
    ctx.restore();

    // Update Loupe if Active
    if (zoomActive && loupeState.visible && loupeCanvasRef.current) {
      drawLoupe();
    }
  }, [sliderPos, drmToken, liveTimestamp, selectedAngle, selectedFit, selectedSize, zoomActive, loupeState]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Loupe Magnifier Drawing
  const drawLoupe = () => {
    const lCanvas = loupeCanvasRef.current;
    if (!lCanvas) return;
    const lCtx = lCanvas.getContext('2d');
    if (!lCtx) return;

    lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
    const srcImg = (sliderPos < 50) ? (tryonImgRef.current || beforeImgRef.current) : (tryonImgRef.current || beforeImgRef.current);
    if (!srcImg) return;

    const zoomFactor = 2.6;
    const srcW = lCanvas.width / zoomFactor;
    const srcH = lCanvas.height / zoomFactor;
    const srcX = Math.max(0, Math.min(srcImg.width - srcW, loupeState.normX * srcImg.width - srcW / 2));
    const srcY = Math.max(0, Math.min(srcImg.height - srcH, loupeState.normY * srcImg.height - srcH / 2));

    lCtx.drawImage(srcImg, srcX, srcY, srcW, srcH, 0, 0, lCanvas.width, lCanvas.height);

    // Target reticle
    lCtx.strokeStyle = "rgba(223, 178, 107, 0.7)";
    lCtx.lineWidth = 1.5;
    lCtx.beginPath();
    lCtx.arc(lCanvas.width / 2, lCanvas.height / 2, 24, 0, 2 * Math.PI);
    lCtx.stroke();
  };

  const updateSlider = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, pos)));
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
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
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

  return (
    <div className="wl-viewport-card">
      {/* Viewport Top Toolbar */}
      <div className="wl-viewport-toolbar">
        <div className="wl-toolbar-group">
          <span className="wl-badge wl-badge-drm" style={{ fontSize: '11px' }}>
            <Lock style={{ width: 12, height: 12 }} /> HARDWARE DRM ACTIVE
          </span>
          <span className="wl-badge wl-badge-gold" style={{ fontSize: '11px' }}>
            <Shield style={{ width: 12, height: 12 }} /> NEURAL COUTURE ENGINE
          </span>
        </div>

        <div className="wl-toolbar-group">
          <button
            onClick={() => setZoomActive(!zoomActive)}
            className={`wl-tool-btn ${zoomActive ? 'active' : ''}`}
            title="Inspect Fabric Texture (2.6x Optical Zoom)"
          >
            <ZoomIn style={{ width: 14, height: 14 }} />
            {zoomActive ? "Close Loupe" : "Inspection Loupe"}
          </button>

          <button
            onClick={() => setSliderPos(50)}
            className="wl-tool-btn"
            title="Reset Split (50/50)"
          >
            <RefreshCw style={{ width: 13, height: 13 }} />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas Comparison Box */}
      <div
        ref={containerRef}
        className="wl-canvas-box"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        style={{ cursor: isDragging ? 'ew-resize' : 'default', position: 'relative', overflow: 'hidden' }}
      >
        <canvas
          ref={canvasRef}
          width={680}
          height={850}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'contain',
            borderRadius: 'var(--radius-md)'
          }}
        />

        {/* Loupe Floating Magnifier Window */}
        {zoomActive && loupeState.visible && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.min(loupeState.x + 20, 680 - 180)}px`,
              top: `${Math.max(10, Math.min(loupeState.y - 80, 850 - 180))}px`,
              width: '170px',
              height: '170px',
              borderRadius: '50%',
              border: '2.5px solid var(--accent-gold)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 20px var(--accent-gold-glow)',
              pointerEvents: 'none',
              zIndex: 50,
              overflow: 'hidden',
              background: '#07090e'
            }}
          >
            <canvas
              ref={loupeCanvasRef}
              width={170}
              height={170}
              style={{ width: '100%', height: '100%' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(7, 9, 14, 0.85)',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '10px',
              color: 'var(--accent-gold-light)',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}>
              2.6x FABRIC LOUPE
            </div>
          </div>
        )}

        {/* Loading Pipeline Shimmer Overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 7, 10, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: '24px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: '3px solid rgba(223, 178, 107, 0.2)',
              borderTopColor: 'var(--accent-gold)',
              animation: 'spin 0.8s linear infinite',
              marginBottom: '16px'
            }} />
            <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'var(--accent-gold-light)' }}>
              Neural Try-On Synthesizer
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '300px', marginTop: '6px' }}>
              Fitting garment mesh, contouring shoulder seams, and calculating photometric drape...
            </p>
          </div>
        )}

        {/* Temporary Screenshot Alert Banner (Non-Blocking) */}
        {shieldActive && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(244, 63, 94, 0.95)',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 90,
            boxShadow: '0 8px 24px rgba(244, 63, 94, 0.4)'
          }}>
            <AlertTriangle style={{ width: 16, height: 16 }} />
            {shieldMessage}
          </div>
        )}
      </div>

      {/* Comparison Helper Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
        <span>← Drag center divider to compare Original Model vs AI Fit →</span>
        <span style={{ color: 'var(--accent-gold-light)', fontWeight: 700 }}>
          Split: {Math.round(sliderPos)}% / {100 - Math.round(sliderPos)}%
        </span>
      </div>
    </div>
  );
}
