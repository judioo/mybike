'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ProductVariant, Product, ProductOption } from '@/types/product';
import { DataService } from '@/lib/data-service';

// Dynamically import the VariantSelector with no SSR to avoid hydration issues
const VariantSelector = dynamic(
  () => import('@/components/product/VariantSelector'),
  { ssr: false }
);

// Define custom types for our mock data structure
interface MockCollection {
  id: string;
  handle: string;
  title: string;
}

interface MockImage {
  id: string;
  src: string;
  alt: string;
}

// Define the type for our mock product data
interface MockProductData {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  type: string;
  price: string;
  compareAtPrice: string | null;
  available: boolean;
  tags: string[];
  images: MockImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  collections: MockCollection[];
}

export default function TestVariantSelectorPage() {
  const [mockProductData, setMockProductData] = useState<MockProductData | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load the product data from the DataService on the client side only
  useEffect(() => {
    const loadProductData = async () => {
      try {
        // Get a mountain bike product from the DataService
        // We're using the mountain-trail-explorer handle which should be in the mountain-bikes collection
        const product = await DataService.getProduct('mountain-trail-explorer');
        
        setMockProductData(product as unknown as MockProductData);
        setSelectedVariant(product.variants[0] as ProductVariant);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading product data:', error);
        setIsLoading(false);
      }
    };
    
    loadProductData();
  }, []);

  const handleVariantChange = (variant: ProductVariant) => {
    console.log('Selected variant:', variant);
    setSelectedVariant(variant);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!mockProductData || !selectedVariant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
          Error loading product data. Please try refreshing the page.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{mockProductData.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={(() => {
                // Find the image that matches the selected variant's color
                if (mockProductData.images && mockProductData.images.length > 0) {
                  // Get the color from the selected variant
                  const selectedColor = selectedVariant.optionValues[0]; // Assuming first option is color
                  
                  // Find the image index based on color
                  const colorIndex = {
                    'Red': 0,
                    'Blue': 1,
                    'Black': 2
                  }[selectedColor] || 0;
                  
                  // Return the corresponding image or default to first image
                  return mockProductData.images[colorIndex]?.src || mockProductData.images[0].src;
                }
                return '/images/placeholder-product.svg';
              })()}
              alt={selectedVariant.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback for missing images
                (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
              }}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {mockProductData.images && mockProductData.images.map((image, index) => (
              <button
                key={image.id || `image-${index}`}
                className={`w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 ${
                  // Highlight the selected image
                  mockProductData.images[index]?.src === (() => {
                    const selectedColor = selectedVariant.optionValues[0];
                    const colorIndex = { 'Red': 0, 'Blue': 1, 'Black': 2 }[selectedColor] || 0;
                    return mockProductData.images[colorIndex]?.src;
                  })() ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  // Find variants with the color that corresponds to this image
                  const colors = ['Red', 'Blue', 'Black'];
                  const color = colors[index];
                  
                  if (color) {
                    // Find the first variant with this color
                    const variant = mockProductData.variants.find(v => 
                      v.optionValues[0] === color && v.available
                    ) || mockProductData.variants.find(v => v.optionValues[0] === color);
                    
                    if (variant) {
                      setSelectedVariant(variant);
                    }
                  }
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Product image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for missing images
                    (e.target as HTMLImageElement).src = '/images/placeholder-product.svg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info and Variant Selector */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{mockProductData.title}</h1>
            <p className="text-gray-600 mt-2">{mockProductData.description}</p>
          </div>
          
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">${selectedVariant.price}</span>
            {selectedVariant.compareAtPrice && (
              <span className="ml-2 text-gray-500 line-through">
                ${selectedVariant.compareAtPrice}
              </span>
            )}
          </div>
          
          {/* Variant Selector */}
          <VariantSelector
            variants={mockProductData.variants}
            options={mockProductData.options}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            showInventoryCount={true}
            showPricing={true}
          />
          
          {/* Add to Cart Button */}
          <button
            className={`w-full py-3 px-6 text-white font-medium rounded-md ${
              selectedVariant.available
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!selectedVariant.available}
          >
            {selectedVariant.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          {/* Additional Product Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Vendor:</span>
              <span>{mockProductData.vendor}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">Type:</span>
              <span>{mockProductData.type}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-600">SKU:</span>
              <span>{selectedVariant.sku}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
