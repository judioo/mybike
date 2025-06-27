// Export main API functions
export { strapiAPI, ProductsAPI, CollectionsAPI } from './api';

// Export client and configuration
export { strapiClient, strapiEndpoints } from './client';
export { strapiConfig } from './config';

// Export types and interfaces
export type {
  StrapiEntity,
  StrapiMedia,
  StrapiImageFormat,
  StrapiProduct,
  StrapiCollection,
  StrapiProductVariant,
  StrapiProductOption,
} from './types';

export type { StrapiResponse, StrapiError, StrapiQueryParams } from './client';

// Export transform functions
export { transformStrapiProduct, transformStrapiCollection } from './types';
