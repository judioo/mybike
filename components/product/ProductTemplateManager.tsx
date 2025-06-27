import React, { Suspense } from 'react';
import { Product } from '@/types/product';
import dynamic from 'next/dynamic';

// Default product template
import DefaultProductTemplate from './templates/DefaultProductTemplate';

// Lazy-loaded specialized templates
const BikeProductTemplate = dynamic(() => import('./templates/BikeProductTemplate'), {
  loading: () => <DefaultProductTemplate.Skeleton />,
});

const AccessoryProductTemplate = dynamic(() => import('./templates/AccessoryProductTemplate'), {
  loading: () => <DefaultProductTemplate.Skeleton />,
});

const PrelovedProductTemplate = dynamic(() => import('./templates/PrelovedProductTemplate'), {
  loading: () => <DefaultProductTemplate.Skeleton />,
});

const ServiceProductTemplate = dynamic(() => import('./templates/ServiceProductTemplate'), {
  loading: () => <DefaultProductTemplate.Skeleton />,
});

interface ProductTemplateManagerProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductTemplateManager({ product, relatedProducts }: ProductTemplateManagerProps) {
  // Determine which template to use based on product metadata
  const templateSuffix = product.metafields?.templateSuffix || '';
  const productType = (product.productType || '').toLowerCase();
  
  // Choose template based on templateSuffix or fallback to productType
  const renderTemplate = () => {
    switch (templateSuffix) {
      case 'bike':
      case 'bicycle':
        return <BikeProductTemplate product={product} relatedProducts={relatedProducts} />;
      
      case 'accessory':
      case 'accessories':
        return <AccessoryProductTemplate product={product} relatedProducts={relatedProducts} />;
      
      case 'preloved':
      case 'used':
      case 'second-hand':
        return <PrelovedProductTemplate product={product} relatedProducts={relatedProducts} />;
      
      case 'service':
      case 'repair':
      case 'maintenance':
        return <ServiceProductTemplate product={product} relatedProducts={relatedProducts} />;
      
      default:
        // If no specific template suffix, try to determine from product type
        if (productType.includes('bike') || productType.includes('bicycle')) {
          return <BikeProductTemplate product={product} relatedProducts={relatedProducts} />;
        } else if (productType.includes('accessory') || productType.includes('part')) {
          return <AccessoryProductTemplate product={product} relatedProducts={relatedProducts} />;
        } else if (productType.includes('used') || productType.includes('preloved')) {
          return <PrelovedProductTemplate product={product} relatedProducts={relatedProducts} />;
        } else if (productType.includes('service') || productType.includes('repair')) {
          return <ServiceProductTemplate product={product} relatedProducts={relatedProducts} />;
        } else {
          // Default template as fallback
          return <DefaultProductTemplate product={product} relatedProducts={relatedProducts} />;
        }
    }
  };

  return (
    <Suspense fallback={<DefaultProductTemplate.Skeleton />}>
      {renderTemplate()}
    </Suspense>
  );
}
