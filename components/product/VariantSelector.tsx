'use client';

import { useState, useEffect } from 'react';
import { ProductVariant, ProductOption } from '@/types/product';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  options: ProductOption[];
  onVariantChange?: (variant: ProductVariant) => void;
  showInventoryCount?: boolean;
  showPricing?: boolean;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  options,
  onVariantChange,
  showInventoryCount = true,
  showPricing = true,
}: VariantSelectorProps) {
  const [currentVariant, setCurrentVariant] = useState<ProductVariant>(
    selectedVariant || variants[0]
  );

  // When selectedVariant changes externally, update our internal state
  useEffect(() => {
    if (selectedVariant && selectedVariant.id !== currentVariant.id) {
      setCurrentVariant(selectedVariant);
    }
  }, [selectedVariant, currentVariant.id]);

  const handleVariantChange = (variant: ProductVariant) => {
    setCurrentVariant(variant);
    onVariantChange?.(variant);
  };

  // If only one variant or no options to select
  if (variants.length <= 1 || !options || options.length === 0) {
    return null;
  }
  
  // Find which option value is selected for each option
  const selectedOptionValues: Record<string, string> = {};
  if (options) {
    options.forEach(option => {
      const optionValue = currentVariant.optionValues[options.indexOf(option)];
      if (optionValue) {
        selectedOptionValues[option.name] = optionValue;
      }
    });
  }

  // Find variants that match a specific option value for a specific option name
  const getVariantsForOptionValue = (optionName: string, optionValue: string): ProductVariant[] => {
    if (!options) return [];
    const optionIndex = options.findIndex(opt => opt.name === optionName);
    if (optionIndex === -1) return [];
    
    return variants.filter(variant => {
      return variant.optionValues[optionIndex] === optionValue;
    });
  };

  // Check if an option value is available based on currently selected options
  const isOptionValueAvailable = (optionName: string, optionValue: string): boolean => {
    // For the current option, we need to check if there's any variant that:
    // 1. Matches this option value for this option
    // 2. Matches all other currently selected options for other options
    // 3. Is available
    
    const matchingVariants = variants.filter(variant => {
      if (!options) return false;
      const optionIndex = options.findIndex(opt => opt.name === optionName);
      if (variant.optionValues[optionIndex] !== optionValue) return false;
      
      // Check that this variant matches all other selected options
      return options.every((option, idx) => {
        if (option.name === optionName) return true; // Skip the current option
        const selectedValue = selectedOptionValues[option.name];
        return !selectedValue || variant.optionValues[idx] === selectedValue;
      });
    });
    
    return matchingVariants.some(v => v.available);
  };

  // Get the best matching variant for a new option selection
  const getBestVariantForOptionValue = (optionName: string, optionValue: string): ProductVariant | undefined => {
    if (!options) return undefined;
    const optionIndex = options.findIndex(opt => opt.name === optionName);
    if (optionIndex === -1) return undefined;
    
    // Create a new selected values map with the new selection
    const newSelectedValues = {...selectedOptionValues, [optionName]: optionValue};
    
    // Find variants that match all selected values
    const matchingVariants = variants.filter(variant => {
      if (!options) return false;
      return options.every((option, idx) => {
        const selectedValue = newSelectedValues[option.name];
        return !selectedValue || variant.optionValues[idx] === selectedValue;
      });
    });
    
    // First try to find an available variant
    const availableVariant = matchingVariants.find(v => v.available);
    if (availableVariant) return availableVariant;
    
    // If none available, return the first matching variant
    return matchingVariants[0];
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Option selectors */}
      {options?.map((option) => (
        <div key={option.name} className="mb-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            {option.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((optionValue) => {
              const isSelected = selectedOptionValues[option.name] === optionValue;
              const isAvailable = isOptionValueAvailable(option.name, optionValue);
              
              return (
                <button
                  key={optionValue}
                  onClick={() => {
                    const newVariant = getBestVariantForOptionValue(option.name, optionValue);
                    if (newVariant) handleVariantChange(newVariant);
                  }}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 text-sm font-medium border rounded-md transition-colors
                    ${isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : isAvailable
                        ? 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                    }
                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                  `}
                  aria-label={`Select ${option.name}: ${optionValue}`}
                >
                  {optionValue}
                  {!isAvailable && (
                    <span className="ml-1 text-xs">(Out of Stock)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Current variant info */}
      {currentVariant && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Selected:</span>
            <span className="font-medium text-gray-900">
              {currentVariant.title}
            </span>
          </div>

          {showPricing && currentVariant.price && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium text-gray-900">
                ${currentVariant.price}
                {currentVariant.compareAtPrice && 
                 parseFloat(currentVariant.compareAtPrice) > parseFloat(currentVariant.price) && (
                  <span className="ml-2 text-gray-500 line-through">
                    ${currentVariant.compareAtPrice}
                  </span>
                )}
              </span>
            </div>
          )}

          {showInventoryCount && currentVariant.inventory && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">In Stock:</span>
              <span
                className={`font-medium ${
                  currentVariant.available
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {currentVariant.available
                  ? currentVariant.inventory.quantity > 0
                    ? `${currentVariant.inventory.quantity} available`
                    : 'Available'
                  : 'Out of stock'}
              </span>
            </div>
          )}
          
          {currentVariant.sku && (
            <div className="flex justify-between items-center text-sm mt-1">
              <span className="text-gray-600">SKU:</span>
              <span className="font-medium text-gray-900">
                {currentVariant.sku}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
