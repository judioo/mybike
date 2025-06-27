'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ProductImage } from '@/types/product';

// Dynamically import Next.js Image component to avoid SSR issues
const NextImage = dynamic(() => import('next/image'), { ssr: false });

// Fallback image component for SSR
const FallbackImage = ({ src, alt, className, width, height, ...props }: any) => (
  <img 
    src={src || '/api/placeholder/800/800'} 
    alt={alt || 'Product image'} 
    className={className} 
    width={width} 
    height={height}
    {...props}
  />
);

interface ProductImageOptimizerProps {
  image: ProductImage;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  quality?: number;
  alt?: string;
  width?: number;
  height?: number;
}

/**
 * ProductImageOptimizer - Optimizes product images with responsive sizing and formats
 * 
 * Features:
 * - Automatic WebP/AVIF format conversion
 * - Responsive sizing based on viewport
 * - Lazy loading with priority option for LCP images
 * - Placeholder blur for better UX during loading
 */
export default function ProductImageOptimizer({
  image,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  priority = false,
  className = '',
  fill = false,
  quality = 85,
  alt,
  width = 800,
  height = 800,
}: ProductImageOptimizerProps) {
  // Extract image properties
  const src = image.src;
  const imageAlt = alt || image.alt || 'Product image';
  
  // Track if we're on the client side
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Generate placeholder
  const placeholder = 'blur';
  
  // Generate blurDataURL if not provided
  const blurDataURL = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  // Use the appropriate image component based on client/server rendering
  const ImageComponent = isClient ? NextImage : FallbackImage;

  return fill ? (
    <div className={`relative ${className}`}>
      <ImageComponent
        src={src}
        alt={imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  ) : (
    <ImageComponent
      src={src}
      alt={imageAlt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
