import React from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductMetadataProps {
  product: Product;
}

export default function ProductMetadata({ product }: ProductMetadataProps) {
  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format collection names for display
  const formatCollections = () => {
    if (!product.collections || product.collections.length === 0) {
      return 'None';
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {product.collections.map((collection, index) => (
          <Link 
            href={`/collections/${typeof collection === 'string' ? collection : collection.toString()}`}
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {typeof collection === 'string' ? collection : `Collection ${collection}`}
          </Link>
        ))}
      </div>
    );
  };

  // Format tags for display
  const formatTags = () => {
    if (!product.tags || product.tags.length === 0) {
      return 'None';
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag, index) => (
          <span 
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">General</h4>
          <dl className="space-y-3">
            {product.vendor && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.vendor}</dd>
              </div>
            )}
            {product.productType && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Product Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.productType}</dd>
              </div>
            )}
            {product.sku && (
              <div>
                <dt className="text-sm font-medium text-gray-500">SKU</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.sku}</dd>
              </div>
            )}
            {product.barcode && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Barcode</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.barcode}</dd>
              </div>
            )}
          </dl>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">Details</h4>
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">Collections</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatCollections()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Tags</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatTags()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Published</dt>
              <dd className="mt-1 text-sm text-gray-900">{formatDate(product.createdAt)}</dd>
            </div>
            {product.updatedAt && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900">{formatDate(product.updatedAt)}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      
      {/* Product availability section */}
      {product.availableForSale !== undefined && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">Availability</h4>
          <div className="flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 ${product.availableForSale ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-900">
              {product.availableForSale ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton loading state
ProductMetadata.Skeleton = function ProductMetadataSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
      <div className="h-6 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-1"></div>
                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse mr-2"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
