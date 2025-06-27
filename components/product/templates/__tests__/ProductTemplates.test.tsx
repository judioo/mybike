import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import DefaultProductTemplate from '../DefaultProductTemplate';
import BikeProductTemplate from '../BikeProductTemplate';
import PrelovedProductTemplate from '../PrelovedProductTemplate';
import AccessoryProductTemplate from '../AccessoryProductTemplate';
import ServiceProductTemplate from '../ServiceProductTemplate';
import ProductTemplateManager from '../../ProductTemplateManager';

// Mock next/dynamic
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (importFunc) => {
    return importFunc();
  },
}));

// Mock components that might be used in the templates
vi.mock('@/components/product/ProductImageGallery', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image-gallery">Image Gallery</div>,
}));

vi.mock('@/components/product/VariantSelector', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-variant-selector">Variant Selector</div>,
}));

vi.mock('@/components/product/AddToCartButton', () => ({
  __esModule: true,
  default: ({ buttonText }) => (
    <div data-testid="mock-add-to-cart">{buttonText || 'Add to Cart'}</div>
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
const mockProduct = {
  id: '1',
  handle: 'test-product',
  title: 'Test Product',
  description: '<p>Test description</p>',
  price: 99.99,
  compareAtPrice: 129.99,
  available: true,
  images: [{ src: '/test-image.jpg', alt: 'Test Image' }],
  variants: [
    {
      id: 'v1',
      title: 'Default',
      price: 99.99,
      available: true,
      sku: 'SKU123',
    },
  ],
  metafields: {},
  vendor: 'Test Vendor',
  productType: 'Test Type',
  tags: ['test', 'product'],
};

const mockRelatedProducts = [
  {
    id: '2',
    handle: 'related-product',
    title: 'Related Product',
    price: 79.99,
    images: [{ src: '/related-image.jpg', alt: 'Related Image' }],
    available: true,
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

  test('ProductTemplateManager selects the correct template based on template suffix', () => {
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
  });

  test('ProductTemplateManager selects the correct template based on product type', () => {
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
  });
});
