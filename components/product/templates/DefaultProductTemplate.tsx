import React, { Suspense } from 'react';
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
}

export default function DefaultProductTemplate({ product, relatedProducts }: DefaultProductTemplateProps) {
  // Detect if product has rich media (videos, 3D models)
  const hasRichMedia = product.metafields?.richMedia || 
    (product.metafields?.mediaType && product.metafields.mediaType !== 'image');
  
  // Process rich media if available
  const richMedia = hasRichMedia ? processRichMedia(product) : null;

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
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-4 text-gray-500 font-medium">
                  {product.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            {richMedia ? (
              <div className="mb-4">
                <RichMediaRenderer media={richMedia} className="w-full aspect-video" />
              </div>
            ) : null}
            <ProductImageGallery
              images={product.images}
              productTitle={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>

              {/* Price and Availability */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline">
                  <p className="text-3xl tracking-tight text-gray-900">
                    ${product.price}
                  </p>
                  {product.compareAtPrice &&
                    product.compareAtPrice > product.price && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  {product.compareAtPrice &&
                    product.compareAtPrice > product.price && (
                      <span className="ml-3 text-sm font-medium text-green-600">
                        Save $
                        {(product.compareAtPrice - product.price).toFixed(
                          2
                        )}
                      </span>
                    )}
                </div>

                {/* Inventory Status */}
                <div className="flex items-center">
                  {product.available !== false ? (
                    <span className="flex items-center text-sm font-medium text-green-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      In Stock
                    </span>
                  ) : (
                    <span className="flex items-center text-sm font-medium text-red-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Out of Stock
                    </span>
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
