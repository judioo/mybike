import React, { Suspense, useState } from 'react';
import { Product, Review } from '@/types/product';
import { MediaItem } from '@/types/media';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import VariantSelector from '@/components/product/VariantSelector';
import ProductMetadata from '@/components/product/ProductMetadata';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '../RecentlyViewedProducts';
import ProductGridSection from '../ProductGridSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { detectRichMedia } from '@/components/product/ProductTemplateManager';

// Import ReviewSection component directly for type access
import ReviewSectionComponent from '@/components/product/reviews/ReviewSection';

// Define ReviewSection component
const ReviewSection = dynamic(
  () => import('@/components/product/reviews/ReviewSection'),
  {
    loading: () => <div className="animate-pulse bg-gray-100 h-64 w-full rounded-lg"></div>,
    ssr: false
  }
);

// Define Metafield interface to match ProductSpecs expectations
interface Metafield {
  id: string;
  key: string;
  value: string;
  type: string;
  namespace?: string;
}

interface DefaultProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
  richMedia?: MediaItem[];
  templateSuffix?: string;
}

export default function DefaultProductTemplate({ 
  product, 
  relatedProducts,
  richMedia = [],
  templateSuffix = ''
}: DefaultProductTemplateProps) {
  // Use provided rich media or detect it if not provided
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const mediaItems = richMedia.length > 0 ? richMedia : detectRichMedia(product);
  
  // Check if we have any rich media to display
  const hasRichMedia = mediaItems.length > 0;

  // Handler for changing active media item
  const handleMediaChange = (index: number) => {
    setActiveMediaIndex(index);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <Link 
                  href={`/collections/all`}
                  className="ml-4 text-gray-400 hover:text-gray-500"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-gray-500 font-medium" aria-current="page">
                  {product.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <ProductImageGallery product={product} />
            
            {/* Rich Media (if available) */}
            {hasRichMedia && (
              <div className="mb-6">
                <RichMediaRenderer 
                  media={mediaItems[activeMediaIndex]} 
                  className="w-full rounded-lg overflow-hidden" 
                  templateSuffix={templateSuffix}
                />
                
                {/* Media Navigation (if multiple rich media items) */}
                {mediaItems.length > 1 && (
                  <div className="flex mt-4 space-x-2 overflow-x-auto">
                    {mediaItems.map((item, index) => (
                      <button
                        key={index}
                        className={`w-16 h-16 rounded-md border-2 flex-shrink-0 ${index === activeMediaIndex ? 'border-blue-500' : 'border-gray-200'}`}
                        onClick={() => handleMediaChange(index)}
                        aria-label={`View media ${index + 1}`}
                      >
                        {/* Media Type Icon */}
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          {item.type === 'video' && (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {(item.type === '3d' || item.type === 'gltf') && (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                            </svg>
                          )}
                          {item.type === 'panorama' && (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Description */}
          {product.description && (
            <div className="prose prose-sm text-gray-600 max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Product Features/Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
              <div className="flex flex-wrap">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.variants && product.variants.length > 1 && (
            <VariantSelector
              variants={product.variants}
              selectedVariant={product.variants[0]}
            />
          )}

          {/* Add to Cart */}
          <AddToCartButton
            product={product}
            variant={product.variants?.[0]}
          />

          {/* Product Description */}
          <div className="mt-10">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <div className="mt-4 prose prose-sm text-gray-500" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>

          {/* Customer Reviews */}
          <Suspense fallback={
            <div className="mt-16 border-t border-gray-200 pt-8">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 bg-gray-100 h-64 rounded-lg animate-pulse"></div>
                <div className="lg:col-span-3 bg-gray-100 h-64 rounded-lg animate-pulse"></div>
              </div>
            </div>
          }>
            <ReviewSection 
              reviews={product.reviews || []} 
              product={product}
              initialLimit={5}
              templateSuffix={templateSuffix}
            />
          </Suspense>
          
          {/* Product Metadata */}
          <Suspense fallback={
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <ProductMetadata product={product} />
          </Suspense>

          {/* Product Specifications */}
          <ProductSpecs
            metafields={product.metafields as unknown as Metafield[] | undefined}
            product={{
              vendor: product.vendor,
              productType: product.productType,
              weight: product.variants?.[0]?.weight || product.variants?.[0]?.grams || undefined,
              tags: product.tags,
              handle: product.handle as string,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt
            }}
          />
        </div>
      </div>

      {/* Recently Viewed Products */}
      <Suspense fallback={<ProductGridSection.Skeleton />}>
        <div className="mt-16">
          <RecentlyViewedProducts
            currentProductId={product.id}
            maxItems={6}
          />
        </div>
      </Suspense>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Suspense fallback={<ProductGridSection.Skeleton />}>
          <div className="mt-16">
            <RelatedProducts 
              products={relatedProducts} 
              templateSuffix={templateSuffix}
              viewAllLink={product.productType ? 
                `/collections/${product.productType.toLowerCase().replace(/\s+/g, '-')}` : 
                undefined
              }
              showViewAll={!!product.productType}
            />
          </div>
        </Suspense>
      )}
    </div>
  );
}

// Helper function to process rich media from product metadata
function processRichMedia(product: Product) {
  const { metafields } = product;
  
  if (!metafields) return null;
  
  // Handle video
  if (metafields.videoUrl) {
    if (metafields.videoUrl.includes('youtube.com') || metafields.videoUrl.includes('youtu.be')) {
      // Extract YouTube video ID
      const videoId = extractYoutubeId(metafields.videoUrl);
      return {
        type: 'youtube' as const,
        src: metafields.videoUrl,
        id: videoId,
      };
    } else if (metafields.videoUrl.includes('vimeo.com')) {
      // Extract Vimeo video ID
      const videoId = extractVimeoId(metafields.videoUrl);
      return {
        type: 'vimeo' as const,
        src: metafields.videoUrl,
        id: videoId,
      };
    } else {
      // Regular video
      return {
        type: 'video' as const,
        src: metafields.videoUrl,
        poster: metafields.videoPoster || product.images?.[0]?.src,
        autoplay: metafields.videoAutoplay === 'true',
        loop: metafields.videoLoop === 'true',
        muted: true,
        controls: true,
      };
    }
  }
  
  // Handle 3D model
  if (metafields.modelUrl) {
    return {
      type: '3d' as const,
      src: metafields.modelUrl,
      poster: metafields.modelPoster || product.images?.[0]?.src,
    };
  }
  
  return null;
}

// Helper function to extract YouTube video ID
function extractYoutubeId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

// Helper function to extract Vimeo video ID
function extractVimeoId(url: string): string {
  const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  return match ? match[3] : '';
}

// Skeleton component for loading state
DefaultProductTemplate.Skeleton = function DefaultProductTemplateSkeleton() {
  return (
    <div className="min-h-screen py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="flex mb-8">
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
          <div className="mx-2 w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-40 h-4 bg-gray-200 rounded"></div>
        </div>

        {/* Product Details skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images skeleton */}
          <div className="bg-gray-200 rounded-lg aspect-square"></div>

          {/* Product Info skeleton */}
          <div className="space-y-6">
            <div>
              <div className="w-3/4 h-8 bg-gray-200 rounded mb-4"></div>
              <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full h-10 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Products skeleton */}
        <div className="mt-16">
          <div className="w-1/3 h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg aspect-square"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
