import React from 'react';
import { Product } from '@/types/product';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import Link from 'next/link';

interface PrelovedProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
}

export default function PrelovedProductTemplate({ product, relatedProducts }: PrelovedProductTemplateProps) {
  // Detect if product has rich media (videos, 3D models)
  const hasRichMedia = product.metafields?.richMedia || 
    (product.metafields?.mediaType && product.metafields.mediaType !== 'image');
  
  // Process rich media if available
  const richMedia = hasRichMedia ? processRichMedia(product) : null;
  
  // Extract preloved-specific details
  const prelovedDetails = extractPrelovedDetails(product);

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
                <Link href="/collections/preloved" className="ml-4 text-gray-400 hover:text-gray-500">
                  Preloved
                </Link>
              </div>
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

        {/* Preloved Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Preloved Item
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images and Media */}
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
            {/* Brand and Title */}
            <div>
              {product.vendor && (
                <div className="text-sm text-gray-500 mb-1">{product.vendor}</div>
              )}
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

            {/* Condition Rating */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Condition</h3>
              <div className="flex items-center mb-2">
                <div className="flex-1">
                  <div className="flex items-center">
                    {renderConditionStars(prelovedDetails.condition)}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {prelovedDetails.conditionText}
                    </span>
                  </div>
                </div>
              </div>
              {prelovedDetails.conditionNotes && (
                <p className="text-sm text-gray-600 mt-2">{prelovedDetails.conditionNotes}</p>
              )}
            </div>

            {/* Product History */}
            {prelovedDetails.history && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Product History
                </h3>
                <p className="text-sm text-gray-600">{prelovedDetails.history}</p>
              </div>
            )}

            {/* Product Description */}
            {product.description && (
              <div className="prose prose-sm text-gray-600 max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            )}

            {/* Variant Selector - For sizes */}
            {product.variants && product.variants.length > 1 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Select Size
                </h3>
                <VariantSelector
                  variants={product.variants}
                  selectedVariant={product.variants[0]}
                />
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton
              product={product}
              variant={product.variants?.[0]}
            />

            {/* Warranty Info */}
            {prelovedDetails.warranty && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Warranty Information
                </h3>
                <p className="text-sm text-gray-600">{prelovedDetails.warranty}</p>
              </div>
            )}

            {/* Return Policy */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Return Policy
              </h3>
              <p className="text-sm text-gray-600">
                All preloved items can be returned within 7 days if they don't meet the condition described. 
                Please see our <Link href="/pages/returns" className="text-blue-600 hover:text-blue-800">returns policy</Link> for more details.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
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
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = metafields.videoUrl.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : '';
      
      return {
        type: 'youtube' as const,
        src: metafields.videoUrl,
        id: videoId,
      };
    } else if (metafields.videoUrl.includes('vimeo.com')) {
      // Extract Vimeo video ID
      const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
      const match = metafields.videoUrl.match(regExp);
      const videoId = match ? match[3] : '';
      
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

// Helper function to extract preloved-specific details
function extractPrelovedDetails(product: Product) {
  const { metafields } = product;
  
  // Default condition is 3 out of 5 if not specified
  const condition = metafields?.condition ? parseInt(metafields.condition.toString()) : 3;
  
  // Map condition number to text description
  const conditionMap: Record<number, string> = {
    1: 'Poor - Significant wear and tear',
    2: 'Fair - Noticeable wear but functional',
    3: 'Good - Normal wear for age',
    4: 'Very Good - Light wear, well maintained',
    5: 'Excellent - Like new condition'
  };
  
  return {
    condition,
    conditionText: conditionMap[condition] || conditionMap[3],
    conditionNotes: metafields?.conditionNotes || metafields?.conditionDetails,
    history: metafields?.history || metafields?.productHistory,
    warranty: metafields?.warranty || metafields?.warrantyInfo || '30-day limited warranty on mechanical components',
    previousOwners: metafields?.previousOwners || '1',
    serviceHistory: metafields?.serviceHistory,
  };
}

// Helper function to render condition stars
function renderConditionStars(condition: number) {
  const stars = [];
  const maxStars = 5;
  
  for (let i = 1; i <= maxStars; i++) {
    if (i <= condition) {
      // Filled star
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  
  return <div className="flex">{stars}</div>;
}
