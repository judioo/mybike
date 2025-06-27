'use client';

import { useState } from 'react';
import { ProductVariant } from '@/types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  onVariantChange?: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>(
    selectedVariant || variants[0]
  );

  const handleVariantChange = (variant: ProductVariant) => {
    setCurrentVariant(variant);
    onVariantChange?.(variant);
  };

  // Group variants by option name (e.g., Size, Color)
  const groupedOptions = variants.reduce(
    (groups, variant) => {
      variant.options?.forEach((option, index) => {
        const optionName =
          variant.option_names?.[index] || `Option ${index + 1}`;
        if (!groups[optionName]) {
          groups[optionName] = new Set();
        }
        groups[optionName].add(option);
      });
      return groups;
    },
    {} as Record<string, Set<string>>
  );

  // If only one variant or no options to select
  if (variants.length <= 1 || Object.keys(groupedOptions).length === 0) {
    return null;
  }

  return (
    <div className='space-y-6'>
      {Object.entries(groupedOptions).map(([optionName, optionValues]) => (
        <div key={optionName}>
          <h3 className='text-sm font-medium text-gray-900 mb-3'>
            {optionName}
            {currentVariant && (
              <span className='ml-2 text-gray-500'>
                (
                {Array.from(optionValues).find((value) =>
                  currentVariant.options?.includes(value)
                )}
                )
              </span>
            )}
          </h3>

          <div className='flex flex-wrap gap-2'>
            {Array.from(optionValues).map((optionValue) => {
              // Find variant that matches this option value
              const matchingVariant = variants.find((variant) =>
                variant.options?.includes(optionValue)
              );

              if (!matchingVariant) return null;

              const isSelected = currentVariant?.id === matchingVariant.id;
              const isAvailable =
                matchingVariant.available !== false &&
                (matchingVariant.inventory_quantity === undefined ||
                  matchingVariant.inventory_quantity > 0);

              return (
                <button
                  key={optionValue}
                  onClick={() => handleVariantChange(matchingVariant)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 text-sm font-medium border rounded-md transition-colors
                    ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : isAvailable
                          ? 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }
                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                  `}
                >
                  {optionValue}
                  {!isAvailable && (
                    <span className='ml-1 text-xs'>(Out of Stock)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Current variant info */}
      {currentVariant && (
        <div className='pt-4 border-t border-gray-200'>
          <div className='flex justify-between items-center text-sm'>
            <span className='text-gray-600'>Selected:</span>
            <span className='font-medium text-gray-900'>
              {currentVariant.title}
            </span>
          </div>

          {currentVariant.price && (
            <div className='flex justify-between items-center text-sm mt-1'>
              <span className='text-gray-600'>Price:</span>
              <span className='font-medium text-gray-900'>
                ${currentVariant.price}
                {currentVariant.compare_at_price &&
                  currentVariant.compare_at_price > currentVariant.price && (
                    <span className='ml-2 text-gray-500 line-through'>
                      ${currentVariant.compare_at_price}
                    </span>
                  )}
              </span>
            </div>
          )}

          {currentVariant.inventory_quantity !== undefined && (
            <div className='flex justify-between items-center text-sm mt-1'>
              <span className='text-gray-600'>In Stock:</span>
              <span
                className={`font-medium ${
                  currentVariant.inventory_quantity > 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {currentVariant.inventory_quantity > 0
                  ? `${currentVariant.inventory_quantity} available`
                  : 'Out of stock'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
