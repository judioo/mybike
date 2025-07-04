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

// Helper function to detect rich media in product data
export function detectRichMedia(product: Product) {
  const richMedia = [];
  
  // Check for 3D models in metafields
  if (product.metafields?.model_3d_url || product.metafields?.model_gltf_url) {
    richMedia.push({
      type: '3d',
      src: product.metafields.model_3d_url || product.metafields.model_gltf_url,
      alt: `${product.title} 3D Model`,
      poster: product.images?.[0]?.src,
      autoRotate: true,
      cameraControls: true,
      arEnabled: true
    });
  }
  
  // Check for Sketchfab models
  if (product.metafields?.sketchfab_id) {
    richMedia.push({
      type: 'sketchfab',
      id: product.metafields.sketchfab_id,
      alt: `${product.title} 3D Model`,
      autoRotate: true
    });
  }
  
  // Check for 360 panorama
  if (product.metafields?.panorama_url) {
    richMedia.push({
      type: 'panorama',
      src: product.metafields.panorama_url,
      alt: `${product.title} 360° View`
    });
  }
  
  // Check for YouTube videos
  if (product.metafields?.youtube_id) {
    richMedia.push({
      type: 'youtube',
      id: product.metafields.youtube_id,
      autoplay: false
    });
  }
  
  // Check for Vimeo videos
  if (product.metafields?.vimeo_id) {
    richMedia.push({
      type: 'vimeo',
      id: product.metafields.vimeo_id,
      autoplay: false
    });
  }
  
  // Check for product videos
  if (product.metafields?.video_url) {
    richMedia.push({
      type: 'video',
      src: product.metafields.video_url,
      poster: product.images?.[0]?.src,
      controls: true,
      autoplay: false,
      muted: true
    });
  }
  
  return richMedia;
}

export default function ProductTemplateManager({ product, relatedProducts }: ProductTemplateManagerProps) {
  // Determine which template to use based on product metadata
  const templateSuffix = product.metafields?.templateSuffix || '';
  const productType = (product.productType || '').toLowerCase();
  
  // Detect rich media content in the product
  const richMedia = detectRichMedia(product);
  
  // Choose template based on templateSuffix or fallback to productType
  const renderTemplate = () => {
    // Add richMedia to the props for all templates
    const templateProps = {
      product,
      relatedProducts,
      richMedia,
      templateSuffix
    };
    
    switch (templateSuffix) {
      case 'bike':
      case 'bicycle':
        return <BikeProductTemplate {...templateProps} />;
      
      case 'accessory':
      case 'accessories':
        return <AccessoryProductTemplate {...templateProps} />;
      
      case 'preloved':
      case 'used':
      case 'second-hand':
        return <PrelovedProductTemplate {...templateProps} />;
      
      case 'service':
      case 'repair':
      case 'maintenance':
        return <ServiceProductTemplate {...templateProps} />;
      
      default:
        // If no specific template suffix, try to determine from product type
        if (productType.includes('bike') || productType.includes('bicycle')) {
          return <BikeProductTemplate {...templateProps} />;
        } else if (productType.includes('accessory') || productType.includes('part')) {
          return <AccessoryProductTemplate {...templateProps} />;
        } else if (productType.includes('used') || productType.includes('preloved')) {
          return <PrelovedProductTemplate {...templateProps} />;
        } else if (productType.includes('service') || productType.includes('repair')) {
          return <ServiceProductTemplate {...templateProps} />;
        } else {
          // Default template as fallback
          return <DefaultProductTemplate {...templateProps} />;
        }
    }
  };

  return (
    <Suspense fallback={<DefaultProductTemplate.Skeleton />}>
      {renderTemplate()}
    </Suspense>
  );
}
