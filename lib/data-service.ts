import { Product, Collection, Filter } from '@/types/product';
import {
  sortProducts,
  filterProducts,
  generateFilterTree,
  paginateProducts,
} from './product-utils';

// Mock data imports
import {
  MOCK_COLLECTIONS,
  MOCK_PRODUCTS,
  getCollectionById as getMockCollectionById,
  getProductsByCollection as getMockProductsByCollection,
} from './mock-data';

// Strapi imports (optional - only if Strapi is available)
let strapiAPI: any = null;
try {
  strapiAPI = require('./strapi').strapiAPI;
} catch (error) {
  console.log('Strapi not available, using mock data');
}

// Configuration
const USE_STRAPI = process.env.NEXT_PUBLIC_USE_STRAPI === 'true' && strapiAPI;

export class DataService {
  // Products
  static async getProducts(params?: {
    filters?: Record<string, any>;
    sort?: string;
    pagination?: { page?: number; pageSize?: number };
  }) {
    if (USE_STRAPI) {
      return await strapiAPI.products.getProducts({
        filters: params?.filters,
        sort: params?.sort ? [params.sort] : undefined,
        pagination: params?.pagination,
      });
    }

    // Use mock data
    let products = [...MOCK_PRODUCTS];

    // Apply filters if provided
    if (params?.filters) {
      products = filterProducts(products, params.filters, MOCK_COLLECTIONS);
    }

    // Apply sorting if provided
    if (params?.sort) {
      products = sortProducts(products, params.sort);
    }

    // Apply pagination if provided
    if (params?.pagination) {
      const { products: paginatedProducts, pagination } = paginateProducts(
        products,
        params.pagination.page || 1,
        params.pagination.pageSize || 12
      );
      return {
        products: paginatedProducts,
        pagination,
      };
    }

    return {
      products,
      pagination: {
        page: 1,
        pageSize: products.length,
        pageCount: 1,
        total: products.length,
      },
    };
  }

  static async getProduct(identifier: string | number) {
    if (USE_STRAPI) {
      if (typeof identifier === 'string') {
        return await strapiAPI.products.getProductByHandle(identifier);
      } else {
        return await strapiAPI.products.getProduct(identifier);
      }
    }

    // Use mock data
    if (typeof identifier === 'string') {
      const product = MOCK_PRODUCTS.find((p) => p.handle === identifier);
      if (!product) {
        throw new Error(`Product with handle '${identifier}' not found`);
      }
      return product;
    } else {
      const product = MOCK_PRODUCTS.find((p) => p.id === identifier);
      if (!product) {
        throw new Error(`Product with id '${identifier}' not found`);
      }
      return product;
    }
  }

  // Convenience method for getting product by handle
  static async getProductByHandle(handle: string) {
    return this.getProduct(handle);
  }

  static async getProductsByCollection(
    collectionId: number,
    params?: {
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }
  ) {
    if (USE_STRAPI) {
      return await strapiAPI.products.getProductsByCollection(collectionId, {
        filters: params?.filters,
        sort: params?.sort ? [params.sort] : undefined,
        pagination: params?.pagination,
      });
    }

    // Use mock data
    let products = getMockProductsByCollection(collectionId);

    // Apply filters if provided
    if (params?.filters) {
      products = filterProducts(products, params.filters, MOCK_COLLECTIONS);
    }

    // Apply sorting if provided
    if (params?.sort) {
      products = sortProducts(products, params.sort);
    }

    // Apply pagination if provided
    if (params?.pagination) {
      const { products: paginatedProducts, pagination } = paginateProducts(
        products,
        params.pagination.page || 1,
        params.pagination.pageSize || 12
      );
      return {
        products: paginatedProducts,
        pagination,
      };
    }

    return {
      products,
      pagination: {
        page: 1,
        pageSize: products.length,
        pageCount: 1,
        total: products.length,
      },
    };
  }

  static async searchProducts(
    query: string,
    params?: {
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }
  ) {
    if (USE_STRAPI) {
      return await strapiAPI.products.searchProducts(query, {
        filters: params?.filters,
        sort: params?.sort ? [params.sort] : undefined,
        pagination: params?.pagination,
      });
    }

    // Use mock data with simple search
    let products = MOCK_PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        ) ||
        product.vendor.toLowerCase().includes(query.toLowerCase())
    );

    // Apply filters if provided
    if (params?.filters) {
      products = filterProducts(products, params.filters, MOCK_COLLECTIONS);
    }

    // Apply sorting if provided
    if (params?.sort) {
      products = sortProducts(products, params.sort);
    }

    // Apply pagination if provided
    if (params?.pagination) {
      const { products: paginatedProducts, pagination } = paginateProducts(
        products,
        params.pagination.page || 1,
        params.pagination.pageSize || 12
      );
      return {
        products: paginatedProducts,
        pagination,
      };
    }

    return {
      products,
      pagination: {
        page: 1,
        pageSize: products.length,
        pageCount: 1,
        total: products.length,
      },
    };
  }

  // Collections
  static async getCollections(params?: {
    sort?: string;
    pagination?: { page?: number; pageSize?: number };
  }) {
    if (USE_STRAPI) {
      return await strapiAPI.collections.getCollections({
        sort: params?.sort ? [params.sort] : undefined,
        pagination: params?.pagination,
      });
    }

    // Use mock data
    let collections = [...MOCK_COLLECTIONS];

    // Apply sorting if provided
    if (params?.sort) {
      collections.sort((a, b) => {
        switch (params.sort) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'created_at':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return {
      collections,
      pagination: {
        page: 1,
        pageSize: collections.length,
        pageCount: 1,
        total: collections.length,
      },
    };
  }

  static async getCollection(identifier: string | number) {
    if (USE_STRAPI) {
      if (typeof identifier === 'string') {
        return await strapiAPI.collections.getCollectionByHandle(identifier);
      } else {
        return await strapiAPI.collections.getCollection(identifier);
      }
    }

    // Use mock data
    if (typeof identifier === 'string') {
      const collection = MOCK_COLLECTIONS.find((c) => c.handle === identifier);
      if (!collection) {
        throw new Error(`Collection with handle '${identifier}' not found`);
      }
      return collection;
    } else {
      return getMockCollectionById(identifier);
    }
  }

  // Convenience method for getting collection by handle
  static async getCollectionByHandle(handle: string) {
    return this.getCollection(handle);
  }

  // Filter tree generation
  static async generateFilterTree(
    products: Product[],
    collections?: Collection[]
  ): Promise<{ filters: Filter[] }> {
    // This works the same for both mock and Strapi data
    // since we transform Strapi data to our standard format
    return generateFilterTree(products, collections || MOCK_COLLECTIONS);
  }

  // Get data source info
  static getDataSourceInfo() {
    return {
      isUsingStrapi: USE_STRAPI,
      dataSource: USE_STRAPI ? 'Strapi CMS' : 'Mock Data',
    };
  }
}

// Export for convenience
export const dataService = DataService;
