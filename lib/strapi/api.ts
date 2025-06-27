import { strapiClient, strapiEndpoints, StrapiQueryParams } from './client';
import {
  StrapiProduct,
  StrapiCollection,
  transformStrapiProduct,
  transformStrapiCollection,
} from './types';
import { Product, Collection } from '@/types/product';

// Products API
export class ProductsAPI {
  // Get all products with optional filtering and pagination
  static async getProducts(params?: {
    filters?: Record<string, any>;
    sort?: string | string[];
    pagination?: { page?: number; pageSize?: number };
    populate?: string[] | Record<string, any>;
  }) {
    const queryParams: StrapiQueryParams = {};

    if (params?.filters) {
      queryParams.filters = strapiClient.buildFilterQuery(params.filters);
    }

    if (params?.sort) {
      queryParams.sort = params.sort;
    }

    if (params?.pagination) {
      queryParams.pagination = params.pagination;
    }

    // Default populate for products
    queryParams.populate = params?.populate || {
      images: true,
      featuredImage: true,
      variants: {
        populate: ['image'],
      },
      options: true,
      collections: {
        populate: ['image'],
      },
    };

    const response = await strapiClient.get<StrapiProduct[]>(
      strapiEndpoints.products,
      queryParams
    );

    return {
      products: response.data.map(transformStrapiProduct),
      pagination: response.meta?.pagination,
    };
  }

  // Get a single product by ID
  static async getProduct(
    id: number,
    populate?: string[] | Record<string, any>
  ) {
    const queryParams: StrapiQueryParams = {
      populate: populate || {
        images: true,
        featuredImage: true,
        variants: {
          populate: ['image'],
        },
        options: true,
        collections: {
          populate: ['image'],
        },
      },
    };

    const response = await strapiClient.get<StrapiProduct>(
      `${strapiEndpoints.products}/${id}`,
      queryParams
    );

    return transformStrapiProduct(response.data);
  }

  // Get a product by handle/slug
  static async getProductByHandle(
    handle: string,
    populate?: string[] | Record<string, any>
  ) {
    const queryParams: StrapiQueryParams = {
      filters: { handle: { $eq: handle } },
      populate: populate || {
        images: true,
        featuredImage: true,
        variants: {
          populate: ['image'],
        },
        options: true,
        collections: {
          populate: ['image'],
        },
      },
    };

    const response = await strapiClient.get<StrapiProduct[]>(
      strapiEndpoints.products,
      queryParams
    );

    if (response.data.length === 0) {
      throw new Error(`Product with handle '${handle}' not found`);
    }

    return transformStrapiProduct(response.data[0]);
  }

  // Get products by collection
  static async getProductsByCollection(
    collectionId: number,
    params?: {
      filters?: Record<string, any>;
      sort?: string | string[];
      pagination?: { page?: number; pageSize?: number };
    }
  ) {
    const queryParams: StrapiQueryParams = {
      filters: {
        collections: { $in: [collectionId] },
        ...params?.filters,
      },
      populate: {
        images: true,
        featuredImage: true,
        variants: {
          populate: ['image'],
        },
        options: true,
        collections: {
          populate: ['image'],
        },
      },
    };

    if (params?.sort) {
      queryParams.sort = params.sort;
    }

    if (params?.pagination) {
      queryParams.pagination = params.pagination;
    }

    const response = await strapiClient.get<StrapiProduct[]>(
      strapiEndpoints.products,
      queryParams
    );

    return {
      products: response.data.map(transformStrapiProduct),
      pagination: response.meta?.pagination,
    };
  }

  // Search products
  static async searchProducts(
    query: string,
    params?: {
      filters?: Record<string, any>;
      sort?: string | string[];
      pagination?: { page?: number; pageSize?: number };
    }
  ) {
    const queryParams: StrapiQueryParams = {
      filters: {
        $or: [
          { title: { $containsi: query } },
          { description: { $containsi: query } },
          { tags: { $containsi: query } },
          { vendor: { $containsi: query } },
          { productType: { $containsi: query } },
        ],
        ...params?.filters,
      },
      populate: {
        images: true,
        featuredImage: true,
        variants: {
          populate: ['image'],
        },
        options: true,
        collections: {
          populate: ['image'],
        },
      },
    };

    if (params?.sort) {
      queryParams.sort = params.sort;
    }

    if (params?.pagination) {
      queryParams.pagination = params.pagination;
    }

    const response = await strapiClient.get<StrapiProduct[]>(
      strapiEndpoints.products,
      queryParams
    );

    return {
      products: response.data.map(transformStrapiProduct),
      pagination: response.meta?.pagination,
    };
  }
}

// Collections API
export class CollectionsAPI {
  // Get all collections
  static async getCollections(params?: {
    filters?: Record<string, any>;
    sort?: string | string[];
    pagination?: { page?: number; pageSize?: number };
    populate?: string[] | Record<string, any>;
  }) {
    const queryParams: StrapiQueryParams = {};

    if (params?.filters) {
      queryParams.filters = strapiClient.buildFilterQuery(params.filters);
    }

    if (params?.sort) {
      queryParams.sort = params.sort;
    }

    if (params?.pagination) {
      queryParams.pagination = params.pagination;
    }

    queryParams.populate = params?.populate || {
      image: true,
      products: {
        populate: ['featuredImage'],
      },
    };

    const response = await strapiClient.get<StrapiCollection[]>(
      strapiEndpoints.collections,
      queryParams
    );

    return {
      collections: response.data.map(transformStrapiCollection),
      pagination: response.meta?.pagination,
    };
  }

  // Get a single collection by ID
  static async getCollection(
    id: number,
    populate?: string[] | Record<string, any>
  ) {
    const queryParams: StrapiQueryParams = {
      populate: populate || {
        image: true,
        products: {
          populate: ['featuredImage', 'images'],
        },
      },
    };

    const response = await strapiClient.get<StrapiCollection>(
      `${strapiEndpoints.collections}/${id}`,
      queryParams
    );

    return transformStrapiCollection(response.data);
  }

  // Get a collection by handle/slug
  static async getCollectionByHandle(
    handle: string,
    populate?: string[] | Record<string, any>
  ) {
    const queryParams: StrapiQueryParams = {
      filters: { handle: { $eq: handle } },
      populate: populate || {
        image: true,
        products: {
          populate: ['featuredImage', 'images'],
        },
      },
    };

    const response = await strapiClient.get<StrapiCollection[]>(
      strapiEndpoints.collections,
      queryParams
    );

    if (response.data.length === 0) {
      throw new Error(`Collection with handle '${handle}' not found`);
    }

    return transformStrapiCollection(response.data[0]);
  }
}

// Utility functions for common operations
export const strapiAPI = {
  products: ProductsAPI,
  collections: CollectionsAPI,

  // Helper to build complex filter queries
  buildAdvancedFilters: (filters: Record<string, any>) => {
    return strapiClient.buildFilterQuery(filters);
  },

  // Helper to build populate queries
  buildPopulateQuery: (fields: string[] | Record<string, any>) => {
    return strapiClient.buildPopulateQuery(fields);
  },
};
