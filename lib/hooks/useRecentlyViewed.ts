import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';

const STORAGE_KEY = 'mybike-recently-viewed';
const MAX_RECENT_ITEMS = 12; // Maximum number of recently viewed items to store

interface RecentlyViewedProduct {
  id: string | number;
  title: string;
  handle: string;
  price: string;
  images: Array<{ src: string; alt?: string; id?: string }>;
  vendor?: string;
  available: boolean;
  viewedAt: string; // ISO timestamp
}

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load recently viewed products from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as RecentlyViewedProduct[];
          // Sort by viewedAt timestamp (most recent first)
          const sorted = parsed.sort(
            (a, b) =>
              new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
          );
          setRecentlyViewed(sorted);
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  const saveToStorage = useCallback((items: RecentlyViewedProduct[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving recently viewed products:', error);
      }
    }
  }, []);

  // Add a product to recently viewed
  const addProduct = useCallback(
    (product: Product) => {
      setRecentlyViewed((prev) => {
        // Create the recently viewed item
        const recentItem: RecentlyViewedProduct = {
          id: product.id,
          title: product.title,
          handle: product.handle,
          price: product.price,
          images: product.images || [],
          vendor: product.vendor,
          available: product.available,
          viewedAt: new Date().toISOString(),
        };

        // Remove existing item with same ID if it exists
        const filtered = prev.filter((item) => item.id !== product.id);

        // Add new item to the beginning and limit to MAX_RECENT_ITEMS
        const updated = [recentItem, ...filtered].slice(0, MAX_RECENT_ITEMS);

        // Save to localStorage
        saveToStorage(updated);

        return updated;
      });
    },
    [saveToStorage]
  );

  // Remove a product from recently viewed
  const removeProduct = useCallback(
    (productId: string | number) => {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((item) => item.id !== productId);
        saveToStorage(filtered);
        return filtered;
      });
    },
    [saveToStorage]
  );

  // Clear all recently viewed products
  const clearAll = useCallback(() => {
    setRecentlyViewed([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Get recently viewed products excluding a specific product (useful for current product page)
  const getRecentlyViewedExcluding = useCallback(
    (excludeId: string | number) => {
      return recentlyViewed.filter((item) => item.id !== excludeId);
    },
    [recentlyViewed]
  );

  return {
    recentlyViewed,
    isLoading,
    addProduct,
    removeProduct,
    clearAll,
    getRecentlyViewedExcluding,
    isEmpty: recentlyViewed.length === 0,
    count: recentlyViewed.length,
  };
}
