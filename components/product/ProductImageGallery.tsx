'use client';

import { useState, useEffect } from 'react';
import ProductImageOptimizer from './ProductImageOptimizer';
import ImageGalleryWrapper from './ImageGalleryWrapper';
import Script from 'next/script';
import { useRouter } from 'next/navigation';

interface ProductImage {
  id?: string;
  src?: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  originalSrc?: string;
  transformedSrc?: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productTitle?: string;
  className?: string;
}

export default function ProductImageGallery({
  images,
  productTitle = 'Product',
  className = '',
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fallback placeholder image
  const placeholderImage = '/api/placeholder/600/600';

  // Process images for react-image-gallery format
  const galleryImages =
    images && images.length > 0
      ? images.map((image, index) => {
          const imageSrc =
            image.src ||
            image.url ||
            image.originalSrc ||
            image.transformedSrc ||
            placeholderImage;
          const imageAlt = image.alt || `${productTitle} - Image ${index + 1}`;

          return {
            original: imageSrc,
            thumbnail: imageSrc,
            originalAlt: imageAlt,
            thumbnailAlt: imageAlt,
            description: imageAlt,
          };
        })
      : [
          {
            original: placeholderImage,
            thumbnail: placeholderImage,
            originalAlt: `${productTitle} - Main Image`,
            thumbnailAlt: `${productTitle} - Main Image`,
            description: `${productTitle} - Main Image`,
          },
        ];

  // Fallback for server-side rendering or when react-image-gallery hasn't loaded
  if (!isClient) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Main Image */}
        <div className='aspect-square bg-gray-100 rounded-lg overflow-hidden relative'>
          <Image
            src={galleryImages[0].original}
            alt={galleryImages[0].originalAlt}
            fill
            className='object-cover'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </div>

        {/* Thumbnail Strip for Multiple Images */}
        {galleryImages.length > 1 && (
          <div className='grid grid-cols-4 gap-2'>
            {galleryImages.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className='aspect-square bg-gray-100 rounded-md overflow-hidden relative'
              >
                <Image
                  src={image.thumbnail}
                  alt={image.thumbnailAlt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 25vw, 10vw'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`product-image-gallery ${className}`}>
      {/* Add gallery styles via Script component to avoid TypeScript errors */}
      <Script id="gallery-styles" strategy="afterInteractive">
        {`
          (function() {
            const style = document.createElement('style');
            style.textContent = \`
              .product-image-gallery .image-gallery-thumbnail {
                border-radius: 0.375rem;
                border: 2px solid transparent;
                transition: all 0.2s ease;
              }
              .product-image-gallery .image-gallery-thumbnail.active {
                border-color: #2563eb;
              }
              .product-image-gallery .image-gallery-thumbnail:hover {
                border-color: #60a5fa;
              }
              .product-image-gallery .image-gallery-icon {
                color: white;
                filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
              }
              .product-image-gallery .image-gallery-icon:hover {
                color: #3b82f6;
              }
              .product-image-gallery .image-gallery-index {
                background: rgba(0, 0, 0, 0.6);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
              }
            \`;
            document.head.appendChild(style);
          })();
        `}
      </Script>

      {isClient ? (
        <ImageGalleryWrapper
          items={galleryImages}
          startIndex={currentIndex}
          onSlide={setCurrentIndex}
          showPlayButton={galleryImages.length > 1}
          showFullscreenButton={true}
          showNav={galleryImages.length > 1}
          showThumbnails={galleryImages.length > 1}
          thumbnailPosition='bottom'
          useBrowserFullscreen={true}
          lazyLoad={true}
          renderItem={(item: any) => (
            <div className='image-gallery-image-wrapper'>
              <ProductImageOptimizer
                image={{
                  src: item.original,
                  alt: item.originalAlt || '',
                }}
                width={600}
                height={600}
                priority={currentIndex === 0}
                className='image-gallery-image object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'
              />
            </div>
          )}
          renderThumbInner={(item: any) => (
            <div className='image-gallery-thumbnail-wrapper'>
              <ProductImageOptimizer
                image={{
                  src: item.thumbnail || item.original,
                  alt: item.thumbnailAlt || item.originalAlt || '',
                }}
                width={100}
                height={100}
                className='image-gallery-thumbnail-image object-cover'
                sizes='100px'
              />
            </div>
          )}
        />
      ) : (
        // Fallback for server-side rendering
        <div className="aspect-square bg-gray-100 rounded-lg">
          {images.length > 0 && images[0].src && (
            <img
              src={images[0].src}
              alt={images[0].alt || 'Product image'}
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
          )}
        </div>
      )}
    </div>
  );
}


