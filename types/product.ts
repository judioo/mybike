// Product catalog types based on BoostCommerce API analysis

// Review types
export interface Review {
  id: string;
  productId: string;
  rating: number;
  title?: string;
  content: string;
  date: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    email?: string;
  };
  verified?: boolean;
  helpful?: number;
  images?: string[];
  response?: {
    content: string;
    date: string;
    author: string;
  };
}

export interface ProductImage {
  src: string;
  alt?: string;
  id?: string;
}

export interface ProductVariant {
  id: string | number;
  title: string;
  sku?: string;
  price: string;
  compareAtPrice?: string;
  available: boolean;
  optionValues: string[];
  weight?: number;
  grams?: number;
  inventory?: {
    quantity: number;
    policy: 'deny' | 'continue';
  };
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string | number;
  title: string;
  handle: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  price: string;
  compareAtPrice?: string;
  available: boolean;
  options: ProductOption[];
  tags: string[];
  collections: (string | number)[];
  metafields?: Record<string, any>;
  vendor?: string;
  productType?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  reviews?: Review[];
  reviewCount?: number;
  reviewAverage?: number;
  templateSuffix?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Collection {
  id: string | number;
  title: string;
  handle: string;
  description?: string;
  image?: ProductImage;
  published?: boolean;
  sortOrder?: string;
  templateSuffix?: string;
  updatedAt?: string;
}

// Filter system types
export interface FilterOption {
  value: string;
  label?: string;
  count?: number;
  min?: number;
  max?: number;
  id?: string | number;
}

export interface Filter {
  type:
    | 'collection'
    | 'price'
    | 'color'
    | 'size'
    | 'material'
    | 'brand'
    | 'availability'
    | 'tags'
    | 'custom';
  label: string;
  key: string;
  options: FilterOption[];
  multiSelect?: boolean;
  rangeFilter?: boolean;
}

export interface FilterTree {
  filters: Filter[];
  appliedFilters?: Record<string, string[]>;
}

// API Response types
export interface ProductCatalogResponse {
  products: Product[];
  collections?: Collection[];
  filterTree?: FilterTree;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  sorting: {
    currentSort: string;
    availableSorts: SortOption[];
  };
}

export interface SortOption {
  key: string;
  label: string;
  direction?: 'asc' | 'desc';
}

// Query parameters for API requests
export interface CatalogQuery {
  page?: number;
  limit?: number;
  sort?: string;
  collectionScope?: string | number;
  productAvailable?: boolean;
  variantAvailable?: boolean;
  buildFilterTree?: boolean;
  locale?: string;
  filters?: Record<string, string[]>;
  search?: string;
}

// Currency and pricing
export interface Price {
  amount: string;
  currencyCode: 'AED' | 'USD' | 'EUR';
}

export interface ProductPricing {
  price: Price;
  compareAtPrice?: Price;
  priceRange?: {
    min: Price;
    max: Price;
  };
}

// Availability status
export interface AvailabilityStatus {
  available: boolean;
  inventoryQuantity?: number;
  inventoryPolicy?: 'deny' | 'continue';
  inventoryManagement?: 'shopify' | 'not_managed';
}

// For frontend state management
export interface CatalogState {
  products: Product[];
  collections: Collection[];
  filters: Filter[];
  appliedFilters: Record<string, string[]>;
  currentSort: string;
  currentPage: number;
  totalProducts: number;
  isLoading: boolean;
  error?: string;
}

// Search and filter contexts
export interface SearchContext {
  query?: string;
  collection?: string;
  filters: Record<string, string[]>;
  sort: string;
  page: number;
  limit: number;
}
