'use client';

import { useState } from 'react';
import { SortOption } from '@/types/product';
import { useUrlParams } from '@/lib/hooks';

interface SortDropdownProps {
  sortOptions: SortOption[];
  className?: string;
}

export default function SortDropdown({
  sortOptions,
  className = '',
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { sort: currentSort, updateSort } = useUrlParams();

  const currentOption = sortOptions.find(
    (option) => option.key === currentSort
  );

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      >
        <span>Sort by: {currentOption?.label || 'Featured'}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className='absolute right-0 z-20 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg'>
            <div className='py-1'>
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    updateSort(option.key);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                    currentSort === option.key
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
