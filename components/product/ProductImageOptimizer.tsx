'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

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
  image?: ProductImage;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'eager' | 'lazy';
}

/**
 * ProductImageOptimizer - Optimizes product images with responsive sizing and formats
 * 
 * Features:
 * - Automatic WebP/AVIF format conversion with quality optimization
 * - Responsive sizing based on viewport with proper sizes attribute
 * - Optimized loading with fetchPriority and loading strategies
 * - Enhanced placeholder blur for better UX during loading
 * - Proper caching with Next.js image optimization
 */
export default function ProductImageOptimizer({
  image,
  src,
  alt,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  priority = false,
  className = '',
  fill = false,
  quality = 85,
  width = 800,
  height = 800,
  fetchPriority = 'auto',
  loading,
}: ProductImageOptimizerProps) {
  const [isClient, setIsClient] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Use effect to check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Extract image properties - support both direct props and image object
  const imageSrc = imgError ? '/api/placeholder/800/800' : (src || (image?.src) || '/api/placeholder/800/800');
  const imageAlt = alt || (image?.alt) || 'Product image';
  // Use provided dimensions or defaults
  const imageWidth = width || 800;
  const imageHeight = height || 800;

  // Generate optimized placeholder
  const placeholder = 'blur';
  
  // Generate blurDataURL with improved SVG for better performance
  const blurDataURL = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3C/svg%3E`;

  // Determine loading strategy based on props
  const loadingStrategy = loading || (priority ? 'eager' : 'lazy');
  
  // Determine fetchPriority based on priority prop if not explicitly set
  const imgFetchPriority = priority ? 'high' : fetchPriority;

  // Handle image loading error
  const handleError = () => setImgError(true);

  // For server-side rendering or if there's an error, use the fallback
  if (!isClient || imgError) {
    return fill ? (
      <div className={`relative ${className}`}>
        <FallbackImage
          src={'/api/placeholder/800/800'}
          alt={imageAlt}
          className="object-cover w-full h-full"
          width={imageWidth}
          height={imageHeight}
        />
      </div>
    ) : (
      <FallbackImage
        src={'/api/placeholder/800/800'}
        alt={imageAlt}
        className={className}
        width={imageWidth}
        height={imageHeight}
      />
    );
  }

  return fill ? (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className="object-cover"
        loading={loadingStrategy}
        fetchPriority={imgFetchPriority}
        onError={handleError}
      />
    </div>
  ) : (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={imageWidth}
      height={imageHeight}
      sizes={sizes}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={className}
      loading={loadingStrategy}
      fetchPriority={imgFetchPriority}
      onError={handleError}
    />
  );
}
