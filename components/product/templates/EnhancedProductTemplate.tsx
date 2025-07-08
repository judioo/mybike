'use client';

import React, { useState } from 'react';
import { Product, ProductVariant } from '@/types/product';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RichMediaRenderer from '@/components/product/RichMediaRenderer';
import { MediaItem } from '@/types/media';
import Link from 'next/link';
import { formatPrice } from '@/lib/product-utils';

interface EnhancedProductTemplateProps {
  product: Product;
  relatedProducts: Product[];
  richMedia?: MediaItem[];
  templateSuffix?: string;
}

// Skeleton component for loading state
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-200 rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

export default function EnhancedProductTemplate({ 
  product, 
  relatedProducts,
  richMedia: providedRichMedia,
  templateSuffix
}: EnhancedProductTemplateProps) {
  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);

  // Detect if product has rich media (videos, 3D models)
  const hasRichMedia = (providedRichMedia && providedRichMedia.length > 0) || 
    product.metafields?.richMedia || 
    (product.metafields?.mediaType && product.metafields.mediaType !== 'image');
  
  // Use provided rich media or empty array
  const richMedia = providedRichMedia || [];

  // Handle variant change
  const handleVariantChange = (variant: ProductVariant) => {
    console.log('Selected variant:', variant);
    setSelectedVariant(variant);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {hasRichMedia && richMedia.length > 0 ? (
              <div>
                {richMedia.map((item, index) => (
                  <RichMediaRenderer key={`media-${index}`} media={item} />
                ))}
              </div>
            ) : (
              <>
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={(() => {
                      // Find the image that matches the selected variant's color
                      if (product.images && product.images.length > 0) {
                        // Get the color from the selected variant
                        const selectedColor = selectedVariant.optionValues?.[0]; // Assuming first option is color
                        
                        // Find the image index based on color
                        const colorIndex: Record<string, number> = {
                          'Red': 0,
                          'Blue': 1,
                          'Black': 2
                        };
                        
                        const index = selectedColor ? colorIndex[selectedColor] || 0 : 0;
                        
                        // Return the corresponding image or default to first image
                        return product.images[index]?.src || product.images[0].src;
                      }
                      return '/images/placeholder-product.svg';
                    })()}
                    alt={selectedVariant.title || product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for missing images
                      (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
                    }}
                  />
                </div>
                
                {/* Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images && product.images.map((image, index) => (
                    <button
                      key={image.id || `image-${index}`}
                      className={`w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 ${
                        // Highlight the selected image
                        product.images[index]?.src === (() => {
                          // Get the color from the selected variant
                          const selectedColor = selectedVariant.optionValues?.[0]; // Assuming first option is color
                          
                          // Find the image index based on color
                          const colorIndex: Record<string, number> = {
                            'Red': 0,
                            'Blue': 1,
                            'Black': 2
                          };
                          
                          const idx = selectedColor ? colorIndex[selectedColor] || 0 : 0;
                          
                          // Return the corresponding image or default to first image
                          return product.images[idx]?.src || product.images[0].src;
                        })() ? 'ring-2 ring-blue-500' : ''
                      }`}
                      onClick={() => {
                        // When clicking a thumbnail, find a variant with the corresponding color
                        const colors = ['Red', 'Blue', 'Black'];
                        const selectedColor = colors[index];
                        
                        if (selectedColor) {
                          // Find a variant with this color
                          const variantsWithColor = product.variants.filter(
                            v => v.optionValues?.[0] === selectedColor
                          );
                          
                          // Prefer available variants
                          const availableVariant = variantsWithColor.find(v => v.available);
                          const variant = availableVariant || variantsWithColor[0];
                          
                          if (variant) {
                            setSelectedVariant(variant);
                          }
                        }
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || `Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback for missing images
                          (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              <p className="text-lg text-gray-500">{product.vendor}</p>
            </div>

            {/* Price */}
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(selectedVariant.price || product.price || '0')}
              </p>
              {(selectedVariant.compareAtPrice || product.compareAtPrice) && (
                <p className="ml-4 text-lg text-gray-500 line-through">
                  {formatPrice(selectedVariant.compareAtPrice || product.compareAtPrice || '0')}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && product.options && (
              <div>
                <VariantSelector
                  variants={product.variants}
                  options={product.options}
                  selectedVariant={selectedVariant}
                  onVariantChange={handleVariantChange}
                />
              </div>
            )}

            {/* Add to Cart */}
            <div>
              <AddToCartButton product={product} variant={selectedVariant} />
            </div>

            {/* Product Specifications */}
            <ProductSpecs product={product} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You may also like</h2>
            <RelatedProducts products={relatedProducts} />
          </div>
        )}

        {/* Recently Viewed Products */}
        <div className="mt-16">
          <RecentlyViewedProducts currentProductId={product.id} />
        </div>
      </div>
    </div>
  );
}

// Attach Skeleton component for loading state
EnhancedProductTemplate.Skeleton = Skeleton;
