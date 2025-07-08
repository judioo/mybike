import React, { Suspense } from 'react';
import { Product } from '@/types/product';
import { MediaItem } from '@/types/media';
import dynamic from 'next/dynamic';

// Default product template
import EnhancedProductTemplate from './templates/EnhancedProductTemplate';

// Lazy-loaded specialized templates
const BikeProductTemplate = dynamic(() => import('./templates/BikeProductTemplate'), {
  loading: () => <EnhancedProductTemplate.Skeleton />,
});

const AccessoryProductTemplate = dynamic(() => import('./templates/AccessoryProductTemplate'), {
  loading: () => <EnhancedProductTemplate.Skeleton />,
});

const PrelovedProductTemplate = dynamic(() => import('./templates/PrelovedProductTemplate'), {
  loading: () => <EnhancedProductTemplate.Skeleton />,
});

const ServiceProductTemplate = dynamic(() => import('./templates/ServiceProductTemplate'), {
  loading: () => <EnhancedProductTemplate.Skeleton />,
});

// Legacy template (no longer used as default)
const DefaultProductTemplate = dynamic(() => import('./templates/DefaultProductTemplate'), {
  loading: () => <EnhancedProductTemplate.Skeleton />,
});

interface ProductTemplateManagerProps {
  product: Product;
  relatedProducts: Product[];
  getRelatedProducts?: () => Promise<Product[]>;
}

// Helper function to detect rich media in product data
export function detectRichMedia(product: Product): MediaItem[] {
  const richMedia: MediaItem[] = [];
  
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
  
  // Check for embedded HTML media content
  if (product.metafields?.embedded_media_html) {
    richMedia.push({
      type: 'embedded',
      html: product.metafields.embedded_media_html,
      alt: `${product.title} embedded content`
    });
  }
  
  return richMedia;
}

export default function ProductTemplateManager({ product, relatedProducts }: ProductTemplateManagerProps) {
  // Determine which template to use based on product metadata
  // First check product.templateSuffix (from API), then check metafields.templateSuffix (custom field)
  const templateSuffix = product.templateSuffix || product.metafields?.templateSuffix || '';
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
    
    // Use EnhancedProductTemplate for all products to ensure consistent variant selector experience
    // This provides the improved variant selection and image switching functionality from test-variant-selector
    return <EnhancedProductTemplate {...templateProps} />;
    
    // Legacy template selection logic (commented out)
    /*
    switch (templateSuffix) {
      case 'bike':
      case 'bicycle':
      case 'mountain-bike':
      case 'road-bike':
      case 'gravel-bike':
      case 'e-bike':
        return <BikeProductTemplate {...templateProps} />;
      
      case 'accessory':
      case 'accessories':
      case 'component':
      case 'part':
      case 'parts':
        return <AccessoryProductTemplate {...templateProps} />;
      
      case 'preloved':
      case 'used':
      case 'second-hand':
      case 'refurbished':
        return <PrelovedProductTemplate {...templateProps} />;
      
      case 'service':
      case 'repair':
      case 'maintenance':
      case 'fitting':
      case 'workshop':
        return <ServiceProductTemplate {...templateProps} />;
      
      default:
        // If no specific template suffix, try to determine from product type
        if (productType.includes('bike') || productType.includes('bicycle')) {
          return <BikeProductTemplate {...templateProps} />;
        } else if (
          productType.includes('accessory') || 
          productType.includes('part') ||
          productType.includes('component')
        ) {
          return <AccessoryProductTemplate {...templateProps} />;
        } else if (
          productType.includes('used') || 
          productType.includes('preloved') ||
          productType.includes('second-hand') ||
          productType.includes('refurbished')
        ) {
          return <PrelovedProductTemplate {...templateProps} />;
        } else if (
          productType.includes('service') || 
          productType.includes('repair') ||
          productType.includes('maintenance') ||
          productType.includes('fitting')
        ) {
          return <ServiceProductTemplate {...templateProps} />;
        } else {
          // Check product tags as a last resort
          const tags = product.tags || [];
          if (tags.some(tag => ['bike', 'bicycle'].includes(tag.toLowerCase()))) {
            return <BikeProductTemplate {...templateProps} />;
          } else if (tags.some(tag => ['accessory', 'part', 'component'].includes(tag.toLowerCase()))) {
            return <AccessoryProductTemplate {...templateProps} />;
          } else if (tags.some(tag => ['used', 'preloved', 'second-hand'].includes(tag.toLowerCase()))) {
            return <PrelovedProductTemplate {...templateProps} />;
          } else if (tags.some(tag => ['service', 'repair', 'maintenance'].includes(tag.toLowerCase()))) {
            return <ServiceProductTemplate {...templateProps} />;
          }
          
          // Enhanced template as fallback
          return <EnhancedProductTemplate {...templateProps} />;
        }
    */
  };

  return (
    <Suspense fallback={<EnhancedProductTemplate.Skeleton />}>
      {renderTemplate()}
    </Suspense>
  );
}
