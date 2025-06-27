import React, { useEffect, useRef } from 'react';
import Script from 'next/script';

interface PanoramaViewerProps {
  src: string;
  className?: string;
  alt?: string;
}

export default function PanoramaViewer({
  src,
  className = '',
  alt = 'Panoramic view',
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerInitialized = useRef<boolean>(false);

  useEffect(() => {
    // Initialize Pannellum viewer once the script is loaded
    const initializeViewer = () => {
      if (!window.pannellum || !containerRef.current || viewerInitialized.current) {
        return;
      }

      try {
        window.pannellum.viewer(containerRef.current.id, {
          type: 'equirectangular',
          panorama: src,
          autoLoad: true,
          autoRotate: 2,
          compass: true,
          showControls: true,
          showFullscreenCtrl: true,
          showZoomCtrl: true,
          mouseZoom: true,
          hotSpotDebug: false,
        });
        
        viewerInitialized.current = true;
      } catch (error) {
        console.error('Error initializing panorama viewer:', error);
      }
    };

    // Check if Pannellum is already loaded
    if (window.pannellum && containerRef.current) {
      initializeViewer();
    } else {
      // Wait for the script to load
      window.addEventListener('pannellumLoaded', initializeViewer);
    }

    return () => {
      window.removeEventListener('pannellumLoaded', initializeViewer);
    };
  }, [src]);

  // Generate a unique ID for the container
  const containerId = `panorama-${Math.random().toString(36).substring(2, 11)}`;

  return (
    <>
      {/* Load Pannellum scripts and CSS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.dispatchEvent(new Event('pannellumLoaded'));
        }}
      />
      
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" 
      />
      
      <div 
        ref={containerRef} 
        id={containerId} 
        className={`panorama-viewer ${className}`}
        style={{ width: '100%', height: '480px' }}
        aria-label={alt}
      ></div>
    </>
  );
}

// Add type declaration for Pannellum API
declare global {
  interface Window {
    pannellum: {
      viewer: (id: string, config: any) => any;
    };
  }
}
