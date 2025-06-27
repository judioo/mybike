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
  environmentImage?: string;
  exposure?: number;
  arEnabled?: boolean;
}

export default function ModelViewer({
  src,
  alt = 'Product 3D model',
  className = '',
  poster,
  autoRotate = true,
  cameraControls = true,
  environmentImage = 'neutral',
  exposure = 0.5,
  arEnabled = true,
}: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelViewerVersion = '3.3.0'; // Using a specific version for stability

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

  // Handle file extension to determine model type
  const fileExtension = src.split('.').pop()?.toLowerCase();
  const isGLTF = fileExtension === 'gltf' || fileExtension === 'glb';
  const isUSDZ = fileExtension === 'usdz';

  return (
    <>
      {/* Load model-viewer script */}
      <Script 
        src={`https://unpkg.com/@google/model-viewer@${modelViewerVersion}/dist/model-viewer.min.js`}
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
          exposure={exposure}
          environment-image={environmentImage}
          ar={arEnabled}
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          ar-placement="floor"
          ios-src={isUSDZ ? src : undefined}
          style={{ width: '100%', height: '100%', minHeight: '400px' }}
        >
          <div className="progress-bar hide" slot="progress-bar">
            <div className="update-bar"></div>
          </div>
          {arEnabled && (
            <button slot="ar-button" className="ar-button bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
              View in your space
            </button>
          )}
          
          {/* Add hotspots for product features */}
          <button
            className="hotspot"
            slot="hotspot-1"
            data-position="0 1.5 0"
            data-normal="0 1 0"
            data-visibility-attribute="visible"
          >
            <div className="hotspot-annotation bg-white p-2 rounded-lg shadow-lg">
              Product feature 1
            </div>
          </button>
          
          {/* Add orbit camera controls */}
          <div className="controls absolute bottom-4 right-4 flex space-x-2">
            <button 
              className="orbit-control bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              onClick={() => {
                const modelViewer = containerRef.current?.querySelector('model-viewer');
                if (modelViewer) {
                  // @ts-ignore - model-viewer API
                  modelViewer.cameraOrbit = '0deg 75deg 2m';
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </button>
          </div>
        </model-viewer>
      </div>
    </>
  );
}
