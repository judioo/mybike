'use client';

// This is a wrapper component for react-image-gallery to handle ESM import issues
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define a fallback loading component
const GalleryLoading = () => (
  <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Use dynamic import with noSSR to avoid ESM issues
const DynamicReactImageGallery = dynamic(
  () => import('react-image-gallery').then((mod) => {
    // Return the default export
    return mod.default;
  }),
  { ssr: false, loading: () => <GalleryLoading /> }
);

// Use a simple type for the gallery props to avoid TypeScript errors
type ImageGalleryProps = {
  items: Array<{
    original: string;
    thumbnail?: string;
    originalAlt?: string;
    thumbnailAlt?: string;
    description?: string;
    [key: string]: any;
  }>;
  [key: string]: any;
};

// Create a wrapper component that uses the dynamically imported react-image-gallery
const ImageGalleryWrapper = (props: ImageGalleryProps) => {
  // Memoize props to prevent unnecessary re-renders
  const memoizedProps = React.useMemo(() => props, [JSON.stringify(props)]);
  
  // Add custom gallery styles on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        .image-gallery-thumbnail {
          border-radius: 0.375rem;
          border: 2px solid transparent;
          transition: all 0.2s ease;
        }
        .image-gallery-thumbnail.active {
          border-color: #2563eb;
        }
        .image-gallery-thumbnail:hover {
          border-color: #60a5fa;
        }
        .image-gallery-icon {
          color: white;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }
        .image-gallery-icon:hover {
          color: #3b82f6;
        }
        .image-gallery-index {
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
      `;
      document.head.appendChild(style);

      // Also try to load the original CSS as a fallback
      try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/react-image-gallery/1.3.0/image-gallery.min.css';
        document.head.appendChild(link);
      } catch (error) {
        console.error('Failed to load image gallery styles from CDN:', error);
      }
    }
  }, []);

  // Return the dynamic component with props
  return <DynamicReactImageGallery {...memoizedProps} />;
};

export default ImageGalleryWrapper;
