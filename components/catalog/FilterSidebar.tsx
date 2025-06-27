'use client';

import React, { useState } from 'react';
import { Filter } from '@/types/product';
import { useUrlParams } from '@/lib/hooks';

interface FilterSidebarProps {
  filters: Filter[];
  className?: string;
}

interface FilterSectionProps {
  filter: Filter;
  appliedValues: string[];
  onFilterChange: (values: string[]) => void;
}

function FilterSection({
  filter,
  appliedValues,
  onFilterChange,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const { updatePriceRange } = useUrlParams();

  // For price range filters, parse current min/max values
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Parse price values from appliedValues for price filters
  React.useEffect(() => {
    if (filter.type === 'range' && filter.key === 'price') {
      const minValue = appliedValues.find((v) => v.startsWith('min:'));
      const maxValue = appliedValues.find((v) => v.startsWith('max:'));

      setMinPrice(minValue ? minValue.split(':')[1] : '');
      setMaxPrice(maxValue ? maxValue.split(':')[1] : '');
    }
  }, [appliedValues, filter.type, filter.key]);

  const displayOptions = showMore ? filter.options : filter.options.slice(0, 8);

  const handleOptionToggle = (value: string) => {
    const newValues = appliedValues.includes(value)
      ? appliedValues.filter((v) => v !== value)
      : [...appliedValues, value];
    onFilterChange(newValues);
  };

  const handlePriceRangeChange = () => {
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    updatePriceRange(min, max);
  };

  return (
    <div className='border-b border-gray-200 pb-6 mb-6'>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='flex items-center justify-between w-full text-left'
      >
        <h3 className='text-sm font-medium text-gray-900'>{filter.label}</h3>
        <svg
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isExpanded && (
        <div className='mt-4 space-y-3'>
          {filter.type === 'range' ? (
            /* Price Range Slider */
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-500 mb-1'>
                    Min
                  </label>
                  <input
                    type='number'
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onBlur={handlePriceRangeChange}
                    placeholder={filter.min?.toString()}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
                <div className='flex-1'>
                  <label className='block text-xs text-gray-500 mb-1'>
                    Max
                  </label>
                  <input
                    type='number'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onBlur={handlePriceRangeChange}
                    placeholder={filter.max?.toString()}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
              <button
                onClick={handlePriceRangeChange}
                className='w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors'
              >
                Apply Price Range
              </button>
            </div>
          ) : filter.type === 'color' ? (
            /* Color Swatches */
            <div className='grid grid-cols-4 gap-2'>
              {displayOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionToggle(option.value)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    appliedValues.includes(option.value)
                      ? 'border-gray-900'
                      : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor:
                      option.colorCode || option.value.toLowerCase(),
                  }}
                  title={option.label}
                />
              ))}
            </div>
          ) : (
            /* Checkbox List */
            <div className='space-y-2'>
              {displayOptions.map((option) => (
                <label key={option.value} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={appliedValues.includes(option.value)}
                    onChange={() => handleOptionToggle(option.value)}
                    className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <span className='ml-3 text-sm text-gray-700 flex-1'>
                    {option.label}
                  </span>
                  <span className='text-xs text-gray-500'>
                    ({option.count})
                  </span>
                </label>
              ))}

              {filter.options.length > 8 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className='text-sm text-blue-600 hover:text-blue-500 mt-2'
                >
                  {showMore
                    ? 'Show Less'
                    : `Show ${filter.options.length - 8} More`}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FilterSidebar({
  filters,
  className = '',
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const {
    filters: appliedFilters,
    updateFilter,
    clearAllFilters,
  } = useUrlParams();

  const activeFilterCount = Object.values(appliedFilters).flat().length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className='lg:hidden mb-4'>
        <button
          onClick={() => setIsMobileOpen(true)}
          className='flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z'
            />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className='ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1'>
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:block ${className}`}>
        <FilterContent
          filters={filters}
          appliedFilters={appliedFilters}
          updateFilter={updateFilter}
          activeFilterCount={activeFilterCount}
          clearAllFilters={clearAllFilters}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          <div
            className='fixed inset-0 bg-black bg-opacity-25'
            onClick={() => setIsMobileOpen(false)}
          />
          <div className='fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto'>
            <div className='p-4 border-b border-gray-200'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className='text-gray-400 hover:text-gray-500'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className='p-4'>
              <FilterContent
                filters={filters}
                appliedFilters={appliedFilters}
                updateFilter={updateFilter}
                activeFilterCount={activeFilterCount}
                clearAllFilters={clearAllFilters}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FilterContent({
  filters,
  appliedFilters,
  updateFilter,
  activeFilterCount,
  clearAllFilters,
}: {
  filters: Filter[];
  appliedFilters: Record<string, string[]>;
  updateFilter: (filterKey: string, values: string[]) => void;
  activeFilterCount: number;
  clearAllFilters: () => void;
}) {
  return (
    <div>
      {/* Filter Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className='text-sm text-blue-600 hover:text-blue-500'
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div>
        {filters.map((filter) => (
          <FilterSection
            key={filter.key}
            filter={filter}
            appliedValues={appliedFilters[filter.key] || []}
            onFilterChange={(values) => updateFilter(filter.key, values)}
          />
        ))}
      </div>
    </div>
  );
}
