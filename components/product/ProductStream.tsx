'use client';

import React, { Suspense } from 'react';
import { Product } from '@/types/product';
import ProductTemplateManager from './ProductTemplateManager';
import ProductSkeleton from './ProductSkeleton';

interface ProductStreamProps {
  productId: string | number;
  initialProduct?: Product;
  initialRelatedProducts?: Product[];
  getRelatedProducts?: () => Promise<Product[]>;
}

/**
 * ProductStream - Component for streaming product data with Suspense
 * 
 * This component optimizes the product detail page loading experience by:
 * 1. Showing initial data immediately if available
 * 2. Using Suspense boundaries for progressive loading
 * 3. Supporting streaming SSR for improved TTFB
 * 4. Supporting custom related products fetching function
 */
export default function ProductStream({
  productId,
  initialProduct,
  initialRelatedProducts = [],
  getRelatedProducts
}: ProductStreamProps) {
  // If we have initial data, render immediately
  if (initialProduct) {
    // If we have a custom getRelatedProducts function, use it
    if (getRelatedProducts) {
      return (
        <Suspense fallback={<ProductSkeleton />}>
          <ProductTemplateManager 
            product={initialProduct} 
            relatedProducts={initialRelatedProducts}
            getRelatedProducts={getRelatedProducts}
          />
        </Suspense>
      );
    }
    
    // Otherwise use the initial related products
    return (
      <Suspense fallback={<ProductSkeleton />}>
        <ProductTemplateManager 
          product={initialProduct} 
          relatedProducts={initialRelatedProducts} 
        />
      </Suspense>
    );
  }
  
  // Otherwise, use dynamic import with Suspense for streaming
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDataLoader 
        productId={productId} 
        getRelatedProducts={getRelatedProducts} 
      />
    </Suspense>
  );
}

// Lazy-loaded component that fetches product data
const ProductDataLoader = React.lazy(async () => {
  // This import is intentionally dynamic to enable streaming
  const { getProductById, getRelatedProducts: fetchRelatedProducts } = await import('@/lib/cache');
  
  return {
    default: ({ 
      productId, 
      getRelatedProducts 
    }: { 
      productId: string | number;
      getRelatedProducts?: () => Promise<Product[]>;
    }) => {
      // Fetch product data
      const product = React.use(getProductById(productId));
      
      if (!product) {
        return <div className="text-center py-12">Product not found</div>;
      }
      
      // Fetch related products using custom function if provided, otherwise use default
      const relatedProducts = React.use(
        getRelatedProducts
          ? getRelatedProducts()
          : fetchRelatedProducts(productId, 8)
      );
      
      return (
        <ProductTemplateManager 
          product={product} 
          relatedProducts={relatedProducts || []} 
        />
      );
    }
  };
});

// Skeleton component for loading state
ProductStream.Skeleton = ProductSkeleton;
