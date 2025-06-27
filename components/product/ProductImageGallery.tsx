'use client';

import { useState, useEffect } from 'react';
import ProductImageOptimizer from './ProductImageOptimizer';
import ImageGalleryWrapper from './ImageGalleryWrapper';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import Next.js Image component to avoid SSR issues
const NextImage = dynamic(() => import('next/image'), {
  ssr: false,
});

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
  images?: ProductImage[];
  productTitle?: string;
  className?: string;
  product?: any; // Allow passing a full product object
}

export default function ProductImageGallery({
  images,
  productTitle = 'Product',
  className = '',
  product,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // If product is provided, use its images and title
  const title = product?.title || productTitle;

  // Use effect to check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const placeholderImage = '/api/placeholder/600/600';

  // Process images for react-image-gallery format
  const galleryImages = (product?.images?.length ?? 0) > 0 || (images?.length ?? 0) > 0
    ? (product?.images || images || []).map((image: ProductImage, index: number) => {
        const imageSrc = image.src || image.url || image.originalSrc || image.transformedSrc || placeholderImage;
        const imageAlt = image.alt || `${title} - Image ${index + 1}`;

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
          originalAlt: title,
          thumbnailAlt: title,
          description: title,
        },
      ];

  if (!isClient) {
    // Server-side rendering or initial client render
    return (
      <div className={`product-gallery-placeholder ${className}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
          <div className="animate-pulse bg-gray-200 w-full h-full"></div>
        </div>
        {/* Thumbnail Strip for Multiple Images */}
        {galleryImages.length > 1 && (
          <div className='grid grid-cols-4 gap-2'>
            {galleryImages.map((image: { thumbnail: string; thumbnailAlt?: string }, index: number) => (
              <div
                key={index}
                className={`aspect-square bg-gray-100 rounded overflow-hidden cursor-pointer ${index === currentIndex ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image.thumbnail}
                  alt={image.thumbnailAlt || ''}
                  className='object-cover w-full h-full'
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`product-gallery ${className}`}>
      <Script
        id="image-gallery-styles"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            .image-gallery-thumbnail { width: 100px; }
            .image-gallery-thumbnail-image { max-height: 80px; object-fit: contain; }
            .image-gallery-slide img { max-height: 500px; object-fit: contain; }
            .product-gallery .image-gallery-thumbnail.active { border-color: #2563eb; }
            .product-gallery .image-gallery-thumbnail:hover { border-color: #60a5fa; }
            .product-gallery .image-gallery-icon { color: white; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)); }
            .product-gallery .image-gallery-icon:hover { color: #3b82f6; }
            .product-gallery .image-gallery-index { background: rgba(0, 0, 0, 0.6); color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.875rem; }
          `,
        }}
      />
      </Script>

      {isClient ? (
        <ImageGalleryWrapper
          items={galleryImages}
          startIndex={currentIndex}
          onSlide={(index: number) => setCurrentIndex(index)}
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
                src={item.original}
                alt={item.originalAlt || ''}
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
                src={item.thumbnail || item.original}
                alt={item.thumbnailAlt || item.originalAlt || ''}
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
          {(product?.images?.length ?? 0) > 0 ? (
            <img
              src={product.images[0].src || ''}
              alt={product.images[0].alt || title}
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
          ) : (images?.length ?? 0) > 0 && images[0].src ? (
            <img
              src={images[0].src}
              alt={images[0].alt || title}
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
          ) : null}
        </div>
      )}
    </div>
  );
}


