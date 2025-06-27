/// <reference path="../../../types/model-viewer.d.ts" />
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

interface ModelViewerProps {
  src: string;
  alt?: string;
  className?: string;
  poster?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
}

export default function ModelViewer({
  src,
  alt = 'Product 3D model',
  className = '',
  poster,
  autoRotate = true,
  cameraControls = true,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Load model-viewer web component
  useEffect(() => {
    // Check if model-viewer is already defined
    if (customElements.get('model-viewer') === undefined) {
      // Import model-viewer dynamically
      import('@google/model-viewer').catch(err => {
        console.error('Error loading model-viewer:', err);
      });
    }
  }, []);

  return (
    <>
      {/* Load model-viewer script */}
      <Script 
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="lazyOnload"
      />
      
      <div ref={containerRef} className={`w-full ${className}`}>
        <model-viewer
          src={src}
          alt={alt}
          poster={poster}
          auto-rotate={autoRotate}
          camera-controls={cameraControls}
          shadow-intensity="1"
          exposure="0.5"
          ar
          ar-modes="webxr scene-viewer quick-look"
          style={{ width: '100%', height: '100%', minHeight: '400px' }}
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          <button slot="ar-button" className="ar-button">
            View in your space
          </button>
        </model-viewer>
      </div>
    </>
  );
}
