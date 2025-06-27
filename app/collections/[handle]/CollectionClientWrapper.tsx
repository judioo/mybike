'use client';

import { Product, Collection, Filter } from '@/types/product';
import { SORT_OPTIONS } from '@/lib/product-utils';
import ProductGrid from '@/components/catalog/ProductGrid';
import FilterSidebar from '@/components/catalog/FilterSidebar';
import SortDropdown from '@/components/catalog/SortDropdown';
import Pagination from '@/components/catalog/Pagination';

interface PaginationMetadata {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface CollectionClientWrapperProps {
  collection: Collection;
  paginatedProducts: Product[];
  pagination: PaginationMetadata;
  filterTree: { filters: Filter[] };
  appliedFilters: Record<string, string[]>;
  currentSort: string;
}

export default function CollectionClientWrapper({
  collection,
  paginatedProducts,
  pagination,
  filterTree,
  appliedFilters,
  currentSort,
}: CollectionClientWrapperProps) {
  // Calculate result range for display
  const startResult = (pagination.page - 1) * pagination.pageSize + 1;
  const endResult = Math.min(
    pagination.page * pagination.pageSize,
    pagination.total
  );

  return (
    <>
      {/* Results and Sort */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
        <p className='text-sm text-gray-500 mb-4 sm:mb-0'>
          Showing {startResult}-{endResult} of {pagination.total} products
        </p>
        <SortDropdown sortOptions={SORT_OPTIONS} />
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Filter Sidebar */}
        <div className='lg:w-64 flex-shrink-0'>
          <FilterSidebar filters={filterTree.filters} />
        </div>

        {/* Main Content */}
        <div className='flex-1'>
          {paginatedProducts.length > 0 ? (
            <>
              <ProductGrid products={paginatedProducts} />

              {/* Pagination */}
              {pagination.pageCount > 1 && (
                <div className='mt-12'>
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pageCount}
                    baseUrl={`/collections/${collection.handle}`}
                    searchParams={
                      new URLSearchParams(
                        Object.entries(appliedFilters)
                          .flatMap(([key, values]) =>
                            values.map((value) => [key, value])
                          )
                          .concat(
                            currentSort !== 'manual'
                              ? [['sort', currentSort]]
                              : []
                          )
                      )
                    }
                  />
                </div>
              )}
            </>
          ) : (
            <div className='text-center py-12'>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>
                No products found
              </h3>
              <p className='text-gray-500'>
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
