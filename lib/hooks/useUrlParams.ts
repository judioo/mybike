'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export interface UrlFilters {
  [key: string]: string[];
}

export function useUrlParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const getFiltersFromUrl = useCallback((): UrlFilters => {
    const filters: UrlFilters = {};

    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'sort') {
        const existingValues = filters[key] || [];
        if (!existingValues.includes(value)) {
          existingValues.push(value);
        }
        filters[key] = existingValues;
      }
    });

    return filters;
  }, [searchParams]);

  // Get current page
  const getCurrentPage = useCallback((): number => {
    return parseInt(searchParams.get('page') || '1');
  }, [searchParams]);

  // Get current sort
  const getCurrentSort = useCallback((): string => {
    return searchParams.get('sort') || 'manual';
  }, [searchParams]);

  // Update URL with new parameters
  const updateUrl = useCallback(
    (updates: {
      filters?: UrlFilters;
      sort?: string;
      page?: number;
      resetPage?: boolean;
    }) => {
      const params = new URLSearchParams();

      // Handle filters
      const filters = updates.filters || getFiltersFromUrl();
      Object.entries(filters).forEach(([key, values]) => {
        values.forEach((value) => {
          if (value && value.trim() !== '') {
            params.append(key, value);
          }
        });
      });

      // Handle sort
      const sort = updates.sort || getCurrentSort();
      if (sort && sort !== 'manual') {
        params.set('sort', sort);
      }

      // Handle page
      let page = updates.page || getCurrentPage();
      if (updates.resetPage) {
        page = 1;
      }
      if (page > 1) {
        params.set('page', page.toString());
      }

      // Navigate to new URL
      const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
      router.push(newUrl);
    },
    [router, pathname, getFiltersFromUrl, getCurrentPage, getCurrentSort]
  );

  // Update a specific filter
  const updateFilter = useCallback(
    (filterKey: string, values: string[]) => {
      const currentFilters = getFiltersFromUrl();

      if (values.length === 0) {
        // Remove filter if no values
        delete currentFilters[filterKey];
      } else {
        currentFilters[filterKey] = values;
      }

      updateUrl({
        filters: currentFilters,
        resetPage: true,
      });
    },
    [getFiltersFromUrl, updateUrl]
  );

  // Update sort
  const updateSort = useCallback(
    (sort: string) => {
      updateUrl({
        sort,
        resetPage: true,
      });
    },
    [updateUrl]
  );

  // Update page
  const updatePage = useCallback(
    (page: number) => {
      updateUrl({ page });
    },
    [updateUrl]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    updateUrl({
      filters: {},
      resetPage: true,
    });
  }, [updateUrl]);

  // Update price range filter
  const updatePriceRange = useCallback(
    (min?: number, max?: number) => {
      const currentFilters = getFiltersFromUrl();

      if (min !== undefined || max !== undefined) {
        const priceRange = [];
        if (min !== undefined && min > 0) {
          priceRange.push(`min:${min}`);
        }
        if (max !== undefined && max > 0) {
          priceRange.push(`max:${max}`);
        }

        if (priceRange.length > 0) {
          currentFilters.price = priceRange;
        } else {
          delete currentFilters.price;
        }
      } else {
        delete currentFilters.price;
      }

      updateUrl({
        filters: currentFilters,
        resetPage: true,
      });
    },
    [getFiltersFromUrl, updateUrl]
  );

  return {
    // Current state
    filters: getFiltersFromUrl(),
    sort: getCurrentSort(),
    page: getCurrentPage(),

    // Update functions
    updateFilter,
    updateSort,
    updatePage,
    updatePriceRange,
    clearAllFilters,
  };
}
