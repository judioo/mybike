import React from 'react';
import { Product } from '@/types/product';
import ProductGrid from '@/components/catalog/ProductGrid';
import Link from 'next/link';

interface ProductGridSectionProps {
  products: Product[];
  title: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  limit?: number;
  showViewAll?: boolean;
  templateSuffix?: string;
}

const ProductGridSection = ({
  products,
  title,
  description,
  viewAllLink,
  viewAllText = 'View All',
  className = '',
  limit = 4,
  showViewAll = true,
  templateSuffix = '',
}: ProductGridSectionProps) => {
  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  // Limit products to display
  const displayProducts = products.slice(0, limit);
  
  // Determine if we need to show the view all link
  const shouldShowViewAll = showViewAll && viewAllLink && products.length > limit;

  // Get background class based on template suffix
  const getBgClass = () => {
    if (templateSuffix.includes('mountain')) return 'bg-gradient-to-r from-green-50 to-green-100';
    if (templateSuffix.includes('road')) return 'bg-gradient-to-r from-blue-50 to-blue-100';
    if (templateSuffix.includes('electric')) return 'bg-gradient-to-r from-yellow-50 to-yellow-100';
    if (templateSuffix.includes('kids')) return 'bg-gradient-to-r from-pink-50 to-pink-100';
    if (templateSuffix.includes('clothing')) return 'bg-gradient-to-r from-purple-50 to-purple-100';
    return 'bg-white';
  };

  return (
    <section className={`py-12 ${getBgClass()} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            {description && (
              <p className="mt-2 text-gray-600 max-w-2xl">{description}</p>
            )}
          </div>
          
          {shouldShowViewAll && (
            <Link 
              href={viewAllLink} 
              className="mt-4 md:mt-0 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {viewAllText}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </Link>
          )}
        </div>
        
        <ProductGrid products={displayProducts} />
      </div>
    </section>
  );
};

// Add a skeleton loader component
ProductGridSection.Skeleton = function Skeleton() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGridSection;
