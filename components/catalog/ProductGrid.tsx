import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice } from '@/lib/product-utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({
  products,
  className = '',
}: ProductGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.handle}`}
          className='group block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200'
        >
          {/* Product Image */}
          <div className='aspect-square bg-gray-100 relative overflow-hidden'>
            {product.images.length > 0 ? (
              <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
                {/* Placeholder for actual image */}
                <div className='text-4xl text-gray-400'>
                  {product.handle.includes('road') && '🚴'}
                  {product.handle.includes('mountain') && '🚵'}
                  {product.handle.includes('hybrid') && '🚲'}
                  {product.handle.includes('electric') && '⚡'}
                  {product.handle.includes('kids') && '🧒'}
                  {!product.handle.includes('road') &&
                    !product.handle.includes('mountain') &&
                    !product.handle.includes('hybrid') &&
                    !product.handle.includes('electric') &&
                    !product.handle.includes('kids') &&
                    '🚲'}
                </div>
              </div>
            ) : (
              <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                <div className='text-4xl text-gray-400'>📷</div>
              </div>
            )}

            {/* Sale Badge */}
            {product.compareAtPrice && (
              <div className='absolute top-2 left-2'>
                <span className='bg-red-500 text-white px-2 py-1 text-xs font-medium rounded'>
                  Sale
                </span>
              </div>
            )}

            {/* Availability Badge */}
            {!product.available && (
              <div className='absolute top-2 right-2'>
                <span className='bg-gray-800 text-white px-2 py-1 text-xs font-medium rounded'>
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className='p-4'>
            {/* Vendor */}
            <p className='text-xs text-gray-500 mb-1'>{product.vendor}</p>

            {/* Title */}
            <h3 className='text-sm font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2'>
              {product.title}
            </h3>

            {/* Price */}
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-lg font-bold text-gray-900'>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className='text-sm text-gray-500 line-through'>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Tags/Features */}
            {product.tags.length > 0 && (
              <div className='flex flex-wrap gap-1 mt-2'>
                {product.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize'
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 2 && (
                  <span className='px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full'>
                    +{product.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Rating (placeholder) */}
            <div className='flex items-center mt-2'>
              <div className='flex text-yellow-400 text-sm'>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className='text-xs text-gray-500 ml-1'>(4.5)</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
