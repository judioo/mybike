export const strapiConfig = {
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api',
  apiToken: process.env.STRAPI_API_TOKEN || '',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const strapiEndpoints = {
  products: '/products',
  collections: '/collections',
  categories: '/categories',
  auth: '/auth/local',
} as const;
