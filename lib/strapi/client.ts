import axios, { AxiosInstance, AxiosResponse } from 'axios';
import qs from 'qs';
import { strapiConfig, strapiEndpoints } from './config';

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  locale?: string;
  publicationState?: 'live' | 'preview';
}

class StrapiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: strapiConfig.apiURL,
      timeout: strapiConfig.timeout,
      headers: strapiConfig.headers,
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          encodeValuesOnly: true,
          arrayFormat: 'brackets',
        });
      },
    });

    // Add request interceptor for authentication
    this.client.interceptors.request.use((config) => {
      if (strapiConfig.apiToken) {
        config.headers.Authorization = `Bearer ${strapiConfig.apiToken}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error(
          'Strapi API Error:',
          error.response?.data || error.message
        );
        return Promise.reject(error);
      }
    );
  }

  async get<T>(
    endpoint: string,
    params?: StrapiQueryParams
  ): Promise<StrapiResponse<T>> {
    const response = await this.client.get(endpoint, { params });
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data: any,
    params?: StrapiQueryParams
  ): Promise<StrapiResponse<T>> {
    const response = await this.client.post(endpoint, { data }, { params });
    return response.data;
  }

  async put<T>(
    endpoint: string,
    data: any,
    params?: StrapiQueryParams
  ): Promise<StrapiResponse<T>> {
    const response = await this.client.put(endpoint, { data }, { params });
    return response.data;
  }

  async delete<T>(
    endpoint: string,
    params?: StrapiQueryParams
  ): Promise<StrapiResponse<T>> {
    const response = await this.client.delete(endpoint, { params });
    return response.data;
  }

  // Helper method to build populate queries for complex relationships
  buildPopulateQuery(
    fields: string[] | Record<string, any>
  ): Record<string, any> {
    if (Array.isArray(fields)) {
      return fields.reduce(
        (acc, field) => {
          acc[field] = true;
          return acc;
        },
        {} as Record<string, any>
      );
    }
    return fields;
  }

  // Helper method to build filter queries
  buildFilterQuery(filters: Record<string, any>): Record<string, any> {
    const filterQuery: Record<string, any> = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        filterQuery[key] = { $in: value };
      } else if (typeof value === 'object' && value !== null) {
        filterQuery[key] = value;
      } else {
        filterQuery[key] = { $eq: value };
      }
    });

    return filterQuery;
  }
}

// Create singleton instance
export const strapiClient = new StrapiClient();

// Export endpoints for easy access
export { strapiEndpoints };
