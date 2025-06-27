'use client';

import { useRecentlyViewed } from '@/lib/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RecentlyViewedProductsProps {
  currentProductId?: string | number;
  className?: string;
  showTitle?: boolean;
  maxItems?: number;
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
    return showTitle ? (
      <div className={`animate-pulse ${className}`}>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          Recently Viewed
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='aspect-square bg-gray-200 rounded-lg'
            ></div>
          ))}
        </div>
      </div>
    ) : null;
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

  return (
    <div className={className}>
      {showTitle && (
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>
          Recently Viewed
        </h2>
      )}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {displayProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className='group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
          >
            <div className='aspect-square overflow-hidden rounded-t-lg bg-gray-100'>
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt || product.title}
                  width={300}
                  height={300}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <svg
                    className='w-12 h-12 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className='p-3'>
              <h3 className='text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors'>
                {product.title}
              </h3>

              <div className='mt-2 flex items-center justify-between'>
                <p className='text-sm font-bold text-gray-900'>
                  ${product.price}
                </p>

                {!product.available && (
                  <span className='text-xs text-red-600 font-medium'>
                    Out of Stock
                  </span>
                )}
              </div>

              {product.vendor && (
                <p className='text-xs text-gray-500 mt-1'>{product.vendor}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Show more link if there are more products */}
      {products.length > maxItems && (
        <div className='mt-6 text-center'>
          <button
            type='button'
            className='text-blue-600 hover:text-blue-700 font-medium text-sm'
            onClick={() => {
              // This could open a modal or navigate to a dedicated page
              console.log('Show more recently viewed products');
            }}
          >
            View all recently viewed ({products.length})
          </button>
        </div>
      )}
    </div>
  );
}
