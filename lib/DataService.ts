/**
 * DataService - Handles data fetching with proper caching for the MyBike application
 */

import { Product, Collection, Review } from '@/types/product';

// Cache TTL in seconds
const CACHE_TTL = {
  PRODUCTS: 60 * 5, // 5 minutes
  COLLECTIONS: 60 * 10, // 10 minutes
  REVIEWS: 60 * 2, // 2 minutes
};

// Revalidation tags for on-demand cache invalidation
export const REVALIDATION_TAGS = {
  PRODUCTS: 'products',
  COLLECTIONS: 'collections',
  REVIEWS: 'reviews',
};

/**
 * Fetch a product by its handle with proper caching
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    // Use Next.js fetch with caching options
    const response = await fetch(`${process.env.API_URL}/products/${handle}`, {
      next: {
        revalidate: CACHE_TTL.PRODUCTS,
        tags: [REVALIDATION_TAGS.PRODUCTS, `product:${handle}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();
    
    // Fetch reviews for the product
    const reviews = await getProductReviews(product.id);
    if (reviews) {
      product.reviews = reviews;
      product.reviewCount = reviews.length;
      product.reviewAverage = reviews.length > 0 
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
        : 0;
    }

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Fetch multiple products with proper caching
 */
export async function getProducts(limit = 12, page = 1, filters = {}): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      ...filters,
    });

    const response = await fetch(`${process.env.API_URL}/products?${queryParams}`, {
      next: {
        revalidate: CACHE_TTL.PRODUCTS,
        tags: [REVALIDATION_TAGS.PRODUCTS],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a collection by its handle with proper caching
 */
export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  try {
    const response = await fetch(`${process.env.API_URL}/collections/${handle}`, {
      next: {
        revalidate: CACHE_TTL.COLLECTIONS,
        tags: [REVALIDATION_TAGS.COLLECTIONS, `collection:${handle}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch collection: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

/**
 * Fetch reviews for a product with proper caching
 */
export async function getProductReviews(productId: string | number): Promise<Review[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/products/${productId}/reviews`, {
      next: {
        revalidate: CACHE_TTL.REVIEWS,
        tags: [REVALIDATION_TAGS.REVIEWS, `product:${productId}:reviews`],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

/**
 * Fetch related products based on product ID, tags, or collection
 */
export async function getRelatedProducts(
  productId: string | number,
  limit = 4,
  options = { useTags: true, useCollection: true }
): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      productId: productId.toString(),
      useTags: options.useTags.toString(),
      useCollection: options.useCollection.toString(),
    });

    const response = await fetch(`${process.env.API_URL}/products/related?${queryParams}`, {
      next: {
        revalidate: CACHE_TTL.PRODUCTS,
        tags: [REVALIDATION_TAGS.PRODUCTS, `product:${productId}:related`],
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

/**
 * Revalidate cache for specific tags
 */
export async function revalidateCache(tags: string[]): Promise<boolean> {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      throw new Error(`Failed to revalidate cache: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return false;
  }
}

export default {
  getProductByHandle,
  getProducts,
  getCollectionByHandle,
  getProductReviews,
  getRelatedProducts,
  revalidateCache,
};
