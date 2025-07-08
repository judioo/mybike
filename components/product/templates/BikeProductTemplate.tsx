import React, { useState } from 'react';
import { Product, ProductVariant } from '@/types/product';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import Link from 'next/link';
import { formatPrice } from '@/lib/product-utils';

interface BikeProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
}

export default function BikeProductTemplate({ product, relatedProducts }: BikeProductTemplateProps) {
  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  // Detect if product has rich media (videos, 3D models)
  const hasRichMedia = product.metafields?.richMedia || 
    (product.metafields?.mediaType && product.metafields.mediaType !== 'image');
  
  // Process rich media if available
  const richMedia = hasRichMedia ? processRichMedia(product) : null;
  
  // Extract bike-specific specifications
  const bikeSpecs = extractBikeSpecs(product);

  // Handle variant change
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
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
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link href="/collections/bikes" className="ml-4 text-gray-400 hover:text-gray-500">
                  Bikes
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

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images and Media */}
          <div>
            {richMedia ? (
              <div className="mb-4">
                <RichMediaRenderer media={richMedia} className="w-full aspect-video" />
              </div>
            ) : (
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[0]?.src || '/images/placeholder-product.svg'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
                  }}
                />
              </div>
            )}
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
                    {formatPrice(selectedVariant.price || product.price)}
                  </p>
                  {product.compareAtPrice &&
                    parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
                      <span className="ml-3 text-lg text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  {product.compareAtPrice &&
                    parseFloat(product.compareAtPrice) > parseFloat(product.price) && (
                      <span className="ml-3 text-sm font-medium text-green-600">
                        Save {formatPrice((parseFloat(product.compareAtPrice) - parseFloat(product.price)).toString())}
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

            {/* Bike Key Specs - Highlighted */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Bike Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {bikeSpecs.frame && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Frame</span>
                    <p className="text-sm text-gray-900">{bikeSpecs.frame}</p>
                  </div>
                )}
                {bikeSpecs.groupset && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Groupset</span>
                    <p className="text-sm text-gray-900">{bikeSpecs.groupset}</p>
                  </div>
                )}
                {bikeSpecs.wheelSize && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Wheel Size</span>
                    <p className="text-sm text-gray-900">{bikeSpecs.wheelSize}</p>
                  </div>
                )}
                {bikeSpecs.weight && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Weight</span>
                    <p className="text-sm text-gray-900">{bikeSpecs.weight}</p>
                  </div>
                )}
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

            {/* Variant Selector - For bike sizes */}
            {product.variants && product.variants.length > 1 && product.options && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Select Size
                </h3>
                <VariantSelector
                  variants={product.variants}
                  options={product.options}
                  selectedVariant={selectedVariant}
                  onVariantChange={handleVariantChange}
                />
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton
              product={product}
              variant={selectedVariant}
            />

            {/* Bike-specific features */}
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

            {/* Bike Sizing Guide */}
            {bikeSpecs.sizingGuide && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Sizing Guide
                </h3>
                <div className="prose prose-sm text-gray-600 max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: bikeSpecs.sizingGuide }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h2>
          <ProductSpecs
            product={product}
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

// Helper function to extract bike-specific specifications
function extractBikeSpecs(product: Product) {
  const { metafields } = product;
  
  return {
    frame: metafields?.frame || metafields?.frameType || metafields?.frameMaterial,
    groupset: metafields?.groupset || metafields?.drivetrain,
    wheelSize: metafields?.wheelSize,
    weight: metafields?.weight ? `${metafields.weight} kg` : null,
    sizingGuide: metafields?.sizingGuide || metafields?.sizeGuide,
  };
}
