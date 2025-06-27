'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/lib/hooks';
import { Product } from '@/types/product';

interface RecentlyViewedTrackerProps {
  product: Product;
}

export default function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    // Add product to recently viewed when component mounts
    if (product) {
      addProduct(product);
    }
  }, [product, addProduct]);

  // This component doesn't render anything visible
  return null;
} 