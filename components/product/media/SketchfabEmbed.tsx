import React, { useEffect } from 'react';
import Script from 'next/script';

interface SketchfabEmbedProps {
  modelId: string;
  className?: string;
  autoRotate?: boolean;
}

export default function SketchfabEmbed({
  modelId,
  className = '',
  autoRotate = true,
}: SketchfabEmbedProps) {
  const containerId = `sketchfab-${modelId}`;

  useEffect(() => {
    // Initialize Sketchfab viewer once the script is loaded
    const initializeViewer = () => {
      if (!window.Sketchfab) {
        console.error('Sketchfab API not loaded');
        return;
      }

      const client = new window.Sketchfab(version);
      client.init(modelId, {
        autostart: 1,
        autospin: autoRotate ? 1 : 0,
        ui_infos: 0,
        ui_controls: 1,
        ui_stop: 0,
        success: (api: any) => {
          api.start();
          api.addEventListener('viewerready', () => {
            console.log('Sketchfab viewer ready');
          });
        },
        error: () => {
          console.error('Sketchfab viewer error');
        }
      });
    };

    // Check if Sketchfab API is already loaded
    if (window.Sketchfab) {
      initializeViewer();
    } else {
      // Wait for the script to load
      window.addEventListener('sketchfabApiLoaded', initializeViewer);
    }

    return () => {
      window.removeEventListener('sketchfabApiLoaded', initializeViewer);
    };
  }, [modelId, autoRotate]);

  return (
    <>
      <Script
        src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.dispatchEvent(new Event('sketchfabApiLoaded'));
        }}
      />
      <div className={`sketchfab-embed-wrapper ${className}`}>
        <iframe
          id={containerId}
          title={`Sketchfab Model ${modelId}`}
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          allowFullScreen={true}
          width="100%"
          height="480"
          src={`https://sketchfab.com/models/${modelId}/embed?autostart=1&autospin=${autoRotate ? 1 : 0}&ui_infos=0&ui_controls=1&ui_stop=0`}
        ></iframe>
      </div>
    </>
  );
}

// Add type declaration for Sketchfab API
declare global {
  interface Window {
    Sketchfab: any;
  }
}

// Sketchfab API version
const version = '1.12.1';
