'use client';

import { useRecentlyViewed } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import ProductGridSection from './ProductGridSection';
import { Product } from '@/types/product';

interface RecentlyViewedProductsProps {
  currentProductId?: string | number;
  className?: string;
  showTitle?: boolean;
  maxItems?: number;
}

// Skeleton loader component
function Skeleton() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square bg-gray-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RecentlyViewedProducts({
  currentProductId,
  className = '',
  showTitle = true,
  maxItems = 8,
}: RecentlyViewedProductsProps) {
  const { getRecentlyViewedExcluding, isLoading, isEmpty } =
    useRecentlyViewed();

  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted to avoid hydration issues with localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR or while loading
  if (!isMounted || isLoading) {
    return showTitle ? <Skeleton /> : null;
  }

  // Get products excluding current product if specified
  const products = currentProductId
    ? getRecentlyViewedExcluding(currentProductId)
    : [];

  // Don't render if no products to show
  if (isEmpty || products.length === 0) {
    return null;
  }

  // Limit the number of products to display
  const displayProducts = products.slice(0, maxItems);

  // Convert RecentlyViewedProduct to Product type
  const productItems: Product[] = displayProducts.map(item => ({
    ...item,
    description: '',
    variants: [],
    options: [],
    tags: [],
    collections: [],
    // Add any other required fields from Product type
  }));

  return (
    <ProductGridSection
      products={productItems}
      title={showTitle ? 'Recently Viewed' : ''}
      description="Products you've viewed recently"
      viewAllText={`View all recently viewed (${products.length})`}
      limit={maxItems}
      showViewAll={products.length > maxItems}
      className={className}
    />
  );
}
