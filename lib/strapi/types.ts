import {
  Product,
  Collection,
  ProductVariant,
  ProductOption,
} from '@/types/product';

// Strapi entity base structure
export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

// Strapi media/image structure
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

// Strapi Product Variant Component
export interface StrapiProductVariant extends StrapiEntity {
  sku: string;
  price: string;
  compareAtPrice?: string;
  weight?: number;
  weightUnit?: string;
  inventoryQuantity: number;
  availableForSale: boolean;
  barcode?: string;
  optionValues: string[];
  image?: StrapiMedia;
}

// Strapi Product Option Component
export interface StrapiProductOption extends StrapiEntity {
  name: string;
  position: number;
  values: string[];
}

// Strapi Collection
export interface StrapiCollection extends StrapiEntity {
  title: string;
  description?: string;
  handle: string;
  image?: StrapiMedia;
  products?: StrapiProduct[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

// Strapi Product
export interface StrapiProduct extends StrapiEntity {
  title: string;
  description?: string;
  handle: string;
  vendor?: string;
  productType?: string;
  tags: string[];
  price: string;
  compareAtPrice?: string;
  available: boolean;
  images?: StrapiMedia[];
  featuredImage?: StrapiMedia;
  variants?: StrapiProductVariant[];
  options?: StrapiProductOption[];
  collections?: StrapiCollection[];
  metafields?: Record<string, any>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  specifications?: {
    material?: string;
    color?: string;
    size?: string;
    weight?: string;
    brand?: string;
    model?: string;
    [key: string]: any;
  };
}

// Transform functions to convert Strapi data to our app types
export function transformStrapiProduct(strapiProduct: StrapiProduct): Product {
  return {
    id: strapiProduct.id,
    title: strapiProduct.title,
    description: strapiProduct.description || '',
    handle: strapiProduct.handle,
    vendor: strapiProduct.vendor || '',
    productType: strapiProduct.productType || '',
    tags: strapiProduct.tags || [],
    price: strapiProduct.price,
    compareAtPrice: strapiProduct.compareAtPrice,
    available: strapiProduct.available,
    images:
      strapiProduct.images?.map((img) => ({
        id: img.id.toString(),
        url: img.url,
        altText: img.alternativeText || img.name,
        width: img.width,
        height: img.height,
      })) || [],
    featuredImage: strapiProduct.featuredImage
      ? {
          id: strapiProduct.featuredImage.id.toString(),
          url: strapiProduct.featuredImage.url,
          altText:
            strapiProduct.featuredImage.alternativeText ||
            strapiProduct.featuredImage.name,
          width: strapiProduct.featuredImage.width,
          height: strapiProduct.featuredImage.height,
        }
      : undefined,
    variants:
      strapiProduct.variants?.map((variant) => ({
        id: variant.id.toString(),
        sku: variant.sku,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        available: variant.availableForSale,
        inventoryQuantity: variant.inventoryQuantity,
        weight: variant.weight,
        weightUnit: variant.weightUnit || 'kg',
        barcode: variant.barcode,
        optionValues: variant.optionValues,
        image: variant.image
          ? {
              id: variant.image.id.toString(),
              url: variant.image.url,
              altText: variant.image.alternativeText || variant.image.name,
              width: variant.image.width,
              height: variant.image.height,
            }
          : undefined,
      })) || [],
    options:
      strapiProduct.options?.map((option) => ({
        id: option.id.toString(),
        name: option.name,
        position: option.position,
        values: option.values,
      })) || [],
    collections: strapiProduct.collections?.map((col) => col.id) || [],
    metafields: strapiProduct.metafields || {},
    createdAt: strapiProduct.createdAt,
    updatedAt: strapiProduct.updatedAt,
  };
}

export function transformStrapiCollection(
  strapiCollection: StrapiCollection
): Collection {
  return {
    id: strapiCollection.id,
    title: strapiCollection.title,
    description: strapiCollection.description || '',
    handle: strapiCollection.handle,
    image: strapiCollection.image
      ? {
          id: strapiCollection.image.id.toString(),
          url: strapiCollection.image.url,
          altText:
            strapiCollection.image.alternativeText ||
            strapiCollection.image.name,
          width: strapiCollection.image.width,
          height: strapiCollection.image.height,
        }
      : undefined,
    productsCount: strapiCollection.products?.length || 0,
    createdAt: strapiCollection.createdAt,
    updatedAt: strapiCollection.updatedAt,
  };
}
