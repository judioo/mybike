'use server';

import { unstable_cache } from 'next/cache';
import { Product } from '@/types/product';

/**
 * Cache configuration for product data
 */
const PRODUCT_CACHE_CONFIG = {
  revalidate: 3600, // Cache for 1 hour
  tags: ['products']
};

/**
 * Cache configuration for collection data
 */
const COLLECTION_CACHE_CONFIG = {
  revalidate: 7200, // Cache for 2 hours
  tags: ['collections']
};

/**
 * Cached function to fetch a single product by ID
 */
export const getProductById = unstable_cache(
  async (productId: string | number): Promise<Product | null> => {
    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  ['product-by-id'],
  PRODUCT_CACHE_CONFIG
);

/**
 * Cached function to fetch related products
 */
export const getRelatedProducts = unstable_cache(
  async (productId: string | number, limit: number = 8): Promise<Product[]> => {
    try {
      const response = await fetch(`/api/products/${productId}/related?limit=${limit}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  },
  ['related-products'],
  PRODUCT_CACHE_CONFIG
);

/**
 * Cached function to fetch products by collection
 */
export const getProductsByCollection = unstable_cache(
  async (collectionId: string | number, limit: number = 12): Promise<Product[]> => {
    try {
      const response = await fetch(`/api/collections/${collectionId}/products?limit=${limit}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Error fetching collection products:', error);
      return [];
    }
  },
  ['products-by-collection'],
  COLLECTION_CACHE_CONFIG
);

/**
 * Invalidate product cache
 */
export async function invalidateProductCache(productId?: string | number) {
  if (productId) {
    // Invalidate specific product
    await fetch(`/api/revalidate?tag=product-${productId}`);
  } else {
    // Invalidate all products
    await fetch('/api/revalidate?tag=products');
  }
}

/**
 * Invalidate collection cache
 */
export async function invalidateCollectionCache(collectionId?: string | number) {
  if (collectionId) {
    // Invalidate specific collection
    await fetch(`/api/revalidate?tag=collection-${collectionId}`);
  } else {
    // Invalidate all collections
    await fetch('/api/revalidate?tag=collections');
  }
}
