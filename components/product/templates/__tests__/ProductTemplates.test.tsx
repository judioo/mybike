import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import DefaultProductTemplate from '../DefaultProductTemplate';
import BikeProductTemplate from '../BikeProductTemplate';
import PrelovedProductTemplate from '../PrelovedProductTemplate';
import AccessoryProductTemplate from '../AccessoryProductTemplate';
import ServiceProductTemplate from '../ServiceProductTemplate';
import EnhancedProductTemplate from '../EnhancedProductTemplate';
import ProductTemplateManager from '../../ProductTemplateManager';
import type { Product, ProductVariant } from '@/types/product';

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFunc: () => any) => {
    return importFunc();
  },
}));

// Mock components that might be used in the templates
vi.mock('@/components/product/ProductImageGallery', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image-gallery">Image Gallery</div>,
}));

vi.mock('../EnhancedProductTemplate', () => ({
  __esModule: true,
  default: ({ product }: { product: Product }) => (
    <div data-testid="mock-enhanced-template">
      <h1>{product.title}</h1>
      <p>{product.vendor}</p>
    </div>
  ),
}));

vi.mock('@/components/product/VariantSelector', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-variant-selector">Variant Selector</div>,
}));

vi.mock('@/components/product/AddToCartButton', () => ({
  __esModule: true,
  default: ({ buttonText }: { buttonText?: string }) => (
    <button data-testid="mock-add-to-cart">{buttonText || 'Add to Cart'}</button>
  ),
}));

vi.mock('@/components/product/ProductSpecs', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-product-specs">Product Specs</div>,
}));

vi.mock('@/components/product/RecentlyViewedProducts', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-recently-viewed">Recently Viewed</div>,
}));

vi.mock('@/components/product/RelatedProducts', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-related-products">Related Products</div>,
}));

vi.mock('@/components/product/RichMediaRenderer', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-rich-media">Rich Media</div>,
}));

// Mock product data
const mockProduct: Product = {
  id: '1',
  handle: 'test-product',
  title: 'Test Product',
  description: 'This is a test product',
  price: '99.99',
  compareAtPrice: '129.99',
  available: true,
  images: [
    { src: '/images/test-image-1.jpg', alt: 'Test Image 1' },
    { src: '/images/test-image-2.jpg', alt: 'Test Image 2' },
  ],
  variants: [
    {
      id: 'v1',
      title: 'Default Variant',
      price: '99.99',
      available: true,
      sku: 'TEST-SKU-1',
      optionValues: ['Default'],
      inventory: { quantity: 10, policy: 'continue' },
    },
  ],
  metafields: {},
  vendor: 'Test Vendor',
  productType: 'Test Type',
  tags: ['test', 'product'],
  options: [{ name: 'Default', values: ['Default'] }],
  collections: [123],
};

const mockRelatedProducts: Product[] = [
  {
    id: '2',
    handle: 'related-product-1',
    title: 'Related Product 1',
    description: 'Related product description',
    price: '79.99',
    compareAtPrice: '89.99',
    images: [{ src: '/images/related-1.jpg', alt: 'Related Product 1' }],
    available: true,
    variants: [
      {
        id: 'v2',
        title: 'Default Variant',
        price: '79.99',
        available: true,
        sku: 'REL-SKU-1',
        optionValues: ['Default'],
        inventory: { quantity: 5, policy: 'continue' },
      },
    ],
    options: [{ name: 'Default', values: ['Default'] }],
    collections: [123],
    metafields: {},
    vendor: 'Test Vendor',
    productType: 'Test Type',
    tags: ['related'],
  },
  {
    id: '3',
    handle: 'related-product-2',
    title: 'Related Product 2',
    description: 'Related product description',
    price: '89.99',
    compareAtPrice: '99.99',
    images: [{ src: '/images/related-2.jpg', alt: 'Related Product 2' }],
    available: true,
    variants: [
      {
        id: 'v3',
        title: 'Default Variant',
        price: '89.99',
        available: true,
        sku: 'REL-SKU-2',
        optionValues: ['Default'],
        inventory: { quantity: 8, policy: 'continue' },
      },
    ],
    options: [{ name: 'Default', values: ['Default'] }],
    collections: [123],
    metafields: {},
    vendor: 'Test Vendor',
    productType: 'Test Type',
    tags: ['related'],
  },
];

describe('Product Templates', () => {
  test('DefaultProductTemplate renders correctly', () => {
    render(
      <DefaultProductTemplate
        product={mockProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Test Vendor')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-to-cart')).toBeInTheDocument();
  });

  test('BikeProductTemplate renders correctly', () => {
    const bikeProduct = {
      ...mockProduct,
      productType: 'Bike',
      metafields: {
        frameSize: 'Medium',
        frameMaterial: 'Carbon',
        wheelSize: '29"',
      },
    };
    
    render(
      <BikeProductTemplate
        product={bikeProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-to-cart')).toBeInTheDocument();
  });

  test('PrelovedProductTemplate renders correctly', () => {
    const prelovedProduct = {
      ...mockProduct,
      productType: 'Preloved Bike',
      metafields: {
        condition: '4',
        conditionDescription: 'Excellent condition with minor wear',
        history: 'One previous owner, well maintained',
      },
    };
    
    render(
      <PrelovedProductTemplate
        product={prelovedProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-to-cart')).toBeInTheDocument();
  });

  test('AccessoryProductTemplate renders correctly', () => {
    const accessoryProduct = {
      ...mockProduct,
      productType: 'Accessory',
      metafields: {
        compatibility: 'Compatible with all bike models',
        features: ['Waterproof', 'Lightweight', 'Easy installation'],
      },
    };
    
    render(
      <AccessoryProductTemplate
        product={accessoryProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-to-cart')).toBeInTheDocument();
  });

  test('ServiceProductTemplate renders correctly', () => {
    const serviceProduct = {
      ...mockProduct,
      productType: 'Service',
      metafields: {
        duration: '1 hour',
        serviceIncludes: ['Full bike inspection', 'Brake adjustment', 'Gear tuning'],
      },
    };
    
    render(
      <ServiceProductTemplate
        product={serviceProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Service Package')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-to-cart')).toBeInTheDocument();
  });

  test('EnhancedProductTemplate renders correctly', () => {
    // Create a product with color variants for testing
    const enhancedProduct: Product = {
      ...mockProduct,
      options: [
        { name: 'Color', values: ['Red', 'Blue', 'Black'] },
        { name: 'Size', values: ['S', 'M', 'L'] }
      ],
      variants: [
        {
          id: 'v1',
          title: 'Red / S',
          price: '99.99',
          available: true,
          sku: 'TEST-RED-S',
          optionValues: ['Red', 'S'],
          inventory: { quantity: 5, policy: 'continue' },
        },
        {
          id: 'v2',
          title: 'Blue / M',
          price: '109.99',
          available: true,
          sku: 'TEST-BLUE-M',
          optionValues: ['Blue', 'M'],
          inventory: { quantity: 3, policy: 'continue' },
        },
        {
          id: 'v3',
          title: 'Black / L',
          price: '119.99',
          available: true,
          sku: 'TEST-BLACK-L',
          optionValues: ['Black', 'L'],
          inventory: { quantity: 7, policy: 'continue' },
        },
      ],
      // Add images for each color
      images: [
        { src: '/images/red-bike.jpg', alt: 'Red Bike' },
        { src: '/images/blue-bike.jpg', alt: 'Blue Bike' },
        { src: '/images/black-bike.jpg', alt: 'Black Bike' },
      ],
    };
    
    // Mock the EnhancedProductTemplate to test its functionality
    vi.mock('../EnhancedProductTemplate', () => {
      const actual = vi.importActual('../EnhancedProductTemplate');
      return {
        __esModule: true,
        default: actual,
      };
    });
    
    const { default: ActualEnhancedTemplate } = require('../EnhancedProductTemplate');
    
    render(
      <ActualEnhancedTemplate
        product={enhancedProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    // Test that the product title is rendered
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test that the price is displayed
    expect(screen.getByText(/99\.99/)).toBeInTheDocument();
    
    // Test that variant options are displayed
    expect(screen.getByText(/Color/)).toBeInTheDocument();
    expect(screen.getByText(/Size/)).toBeInTheDocument();
    
    // Reset mocks
    vi.resetModules();
    vi.resetAllMocks();
  });

  test('ProductTemplateManager uses EnhancedProductTemplate for all products regardless of template suffix', () => {
    // Test with bike template suffix
    const bikeProduct = {
      ...mockProduct,
      metafields: { templateSuffix: 'bike' },
    };
    
    const { rerender } = render(
      <ProductTemplateManager
        product={bikeProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with accessory template suffix
    const accessoryProduct = {
      ...mockProduct,
      metafields: { templateSuffix: 'accessory' },
    };
    
    rerender(
      <ProductTemplateManager
        product={accessoryProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with preloved template suffix
    const prelovedProduct = {
      ...mockProduct,
      metafields: { templateSuffix: 'preloved' },
    };
    
    rerender(
      <ProductTemplateManager
        product={prelovedProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with service template suffix
    const serviceProduct = {
      ...mockProduct,
      metafields: { templateSuffix: 'service' },
    };
    
    rerender(
      <ProductTemplateManager
        product={serviceProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Verify that the EnhancedProductTemplate is being used for all products
    // by checking for elements that are unique to the EnhancedProductTemplate
    expect(screen.queryByTestId('mock-image-gallery')).not.toBeInTheDocument();
  });

  test('ProductTemplateManager uses EnhancedProductTemplate for all products regardless of product type', () => {
    // Test with bike product type
    const bikeProduct = {
      ...mockProduct,
      productType: 'Mountain Bike',
    };
    
    const { rerender } = render(
      <ProductTemplateManager
        product={bikeProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with accessory product type
    const accessoryProduct = {
      ...mockProduct,
      productType: 'Bike Accessory',
    };
    
    rerender(
      <ProductTemplateManager
        product={accessoryProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with preloved product type
    const prelovedProduct = {
      ...mockProduct,
      productType: 'Preloved Bike',
    };
    
    rerender(
      <ProductTemplateManager
        product={prelovedProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Test with service product type
    const serviceProduct = {
      ...mockProduct,
      productType: 'Bike Service',
    };
    
    rerender(
      <ProductTemplateManager
        product={serviceProduct}
        relatedProducts={mockRelatedProducts}
      />
    );
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Verify that the EnhancedProductTemplate is being used for all products
    // by checking for elements that are unique to the EnhancedProductTemplate
    expect(screen.queryByTestId('mock-image-gallery')).not.toBeInTheDocument();
  });
});
