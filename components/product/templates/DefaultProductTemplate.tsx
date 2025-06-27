import React, { Suspense, useState } from 'react';
import { Product } from '@/types/product';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { detectRichMedia } from '@/components/product/ProductTemplateManager';
import { MediaItem } from '@/types/media';

// Lazy load review components to reduce initial bundle size
const ReviewSection = dynamic(
  () => import('@/components/product/reviews/ReviewSection'),
  { 
    loading: () => <div className="animate-pulse bg-gray-100 h-64 w-full rounded-lg"></div>,
    ssr: false
  }
);

interface DefaultProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
  richMedia?: any[];
  templateSuffix?: string;
}

export default function DefaultProductTemplate({ 
  product, 
  relatedProducts, 
  richMedia: propRichMedia, 
  templateSuffix = ''
}: DefaultProductTemplateProps) {
  // Use provided rich media or detect it if not provided
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const richMedia = propRichMedia || detectRichMedia(product);
  const hasRichMedia = richMedia && richMedia.length > 0;

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
                  href={`/collections/${product.collections?.[0]?.handle || 'all'}`}
                  className="ml-4 text-gray-400 hover:text-gray-500"
                >
                  {product.collections?.[0]?.title || 'Products'}
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
            
            {/* Rich media (if available) */}
            {hasRichMedia && (
              <div className={`mt-6 w-full bg-gray-50 rounded-lg p-4 ${templateSuffix ? `media-${templateSuffix}` : ''}`}>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Media</h3>
                <div className="aspect-w-16 aspect-h-9">
                  {richMedia.length > 0 && (
                    <RichMediaRenderer 
                      media={richMedia[activeMediaIndex]} 
                      templateSuffix={templateSuffix}
                    />
                  )}
                </div>
              </div>
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
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selector */}
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
            <Suspense fallback={<div className="mt-16 border-t border-gray-200 pt-8 animate-pulse bg-gray-100 h-64 w-full rounded-lg"></div>}>
              {product.reviews && product.reviews.length > 0 && (
                <ReviewSection 
                  reviews={product.reviews} 
                  productId={product.id.toString()}
                  productTitle={product.title}
                  initialLimit={5} 
                />
              )}
            </Suspense>

            {/* Product Specifications */}
            <ProductSpecs
              metafields={product.metafields}
              product={{
                vendor: product.vendor,
                productType: product.productType,
                weight: product.weight,
                tags: product.tags,
                handle: product.handle,
                createdAt: product.createdAt,
              }}
            />
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-16">
          <RecentlyViewedProducts
            currentProductId={product.id}
            maxItems={6}
          />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        )}
      </div>
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
