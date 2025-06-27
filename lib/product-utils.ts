import {
  Product,
  ProductCatalogResponse,
  CatalogQuery,
  Filter,
  FilterTree,
  SortOption,
  Collection,
} from '@/types/product';

// Sorting utilities
export const SORT_OPTIONS: SortOption[] = [
  { key: 'manual', label: 'Featured', direction: 'asc' },
  { key: 'price-asc', label: 'Price: Low to High', direction: 'asc' },
  { key: 'price-desc', label: 'Price: High to Low', direction: 'desc' },
  { key: 'title-asc', label: 'Name: A to Z', direction: 'asc' },
  { key: 'title-desc', label: 'Name: Z to A', direction: 'desc' },
  { key: 'created-desc', label: 'Newest First', direction: 'desc' },
  { key: 'best-selling', label: 'Best Selling', direction: 'desc' },
];

// Sort products based on sort key
export function sortProducts(products: Product[], sortKey: string): Product[] {
  const sortedProducts = [...products];

  switch (sortKey) {
    case 'price-asc':
      return sortedProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    case 'price-desc':
      return sortedProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    case 'title-asc':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    case 'created-desc':
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    case 'manual':
    default:
      return sortedProducts; // Maintain original order for manual/featured
  }
}

// Filter products based on applied filters
export function filterProducts(
  products: Product[],
  appliedFilters: Record<string, string[]>,
  collections?: Collection[]
): Product[] {
  let filteredProducts = [...products];

  // Apply each filter
  Object.entries(appliedFilters).forEach(([filterKey, filterValues]) => {
    if (filterValues.length === 0) return;

    switch (filterKey) {
      case 'collection':
        filteredProducts = filteredProducts.filter((product) =>
          filterValues.some(
            (value) =>
              product.collections.includes(parseInt(value)) ||
              product.collections.includes(value)
          )
        );
        break;

      case 'price':
        filteredProducts = filteredProducts.filter((product) => {
          const price = parseFloat(product.price);

          // Extract min and max values from filter values
          let minPrice = 0;
          let maxPrice = Infinity;

          filterValues.forEach((value) => {
            if (value.startsWith('min:')) {
              minPrice = parseFloat(value.split(':')[1]);
            } else if (value.startsWith('max:')) {
              maxPrice = parseFloat(value.split(':')[1]);
            } else if (value.includes('-')) {
              // Legacy range format support
              const [min, max] = value.split('-').map((v) => parseFloat(v));
              if (!isNaN(min)) minPrice = min;
              if (!isNaN(max)) maxPrice = max;
            }
          });

          return price >= minPrice && price <= maxPrice;
        });
        break;

      case 'availability':
        if (filterValues.includes('available')) {
          filteredProducts = filteredProducts.filter(
            (product) => product.available
          );
        }
        break;

      case 'tags':
        filteredProducts = filteredProducts.filter((product) =>
          filterValues.some((tag) => product.tags.includes(tag))
        );
        break;

      case 'color':
      case 'size':
      case 'material':
      case 'brand':
        // Filter by variant options or metafields
        filteredProducts = filteredProducts.filter((product) => {
          // Check variant options
          const hasVariantMatch = product.variants.some((variant) =>
            variant.optionValues.some((optionValue) =>
              filterValues.includes(optionValue)
            )
          );

          // Check metafields
          const hasMetafieldMatch =
            product.metafields &&
            filterValues.includes(product.metafields[filterKey]);

          // Check tags for fallback
          const hasTagMatch = filterValues.some((value) =>
            product.tags.some((tag) =>
              tag.toLowerCase().includes(value.toLowerCase())
            )
          );

          return hasVariantMatch || hasMetafieldMatch || hasTagMatch;
        });
        break;
    }
  });

  return filteredProducts;
}

// Generate filter tree from products
export function generateFilterTree(
  products: Product[],
  collections?: Collection[]
): FilterTree {
  const filters: Filter[] = [];

  // Collection filter
  if (collections && collections.length > 0) {
    const collectionCounts = new Map<string, number>();
    products.forEach((product) => {
      product.collections.forEach((collectionId) => {
        const id = collectionId.toString();
        collectionCounts.set(id, (collectionCounts.get(id) || 0) + 1);
      });
    });

    filters.push({
      type: 'collection',
      label: 'Category',
      key: 'collection',
      multiSelect: true,
      options: collections
        .filter((collection) => collectionCounts.has(collection.id.toString()))
        .map((collection) => ({
          value: collection.id.toString(),
          label: collection.title,
          count: collectionCounts.get(collection.id.toString()) || 0,
          id: collection.id,
        }))
        .sort((a, b) => b.count - a.count),
    });
  }

  // Price range filter
  const prices = products
    .map((p) => parseFloat(p.price))
    .filter((p) => !isNaN(p));
  if (prices.length > 0) {
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRanges = generatePriceRanges(minPrice, maxPrice);

    filters.push({
      type: 'range',
      label: 'Price Range (AED)',
      key: 'price',
      multiSelect: false,
      min: minPrice,
      max: maxPrice,
      options: priceRanges.map((range) => ({
        value: `${range.min}-${range.max}`,
        label: range.label,
        count: products.filter((p) => {
          const price = parseFloat(p.price);
          return price >= range.min && price <= range.max;
        }).length,
        min: range.min,
        max: range.max,
      })),
    });
  }

  // Availability filter
  const availableCount = products.filter((p) => p.available).length;
  const unavailableCount = products.length - availableCount;

  if (availableCount > 0 || unavailableCount > 0) {
    filters.push({
      type: 'availability',
      label: 'Availability',
      key: 'availability',
      multiSelect: false,
      options: [
        { value: 'available', label: 'In Stock', count: availableCount },
        {
          value: 'unavailable',
          label: 'Out of Stock',
          count: unavailableCount,
        },
      ].filter((option) => option.count > 0),
    });
  }

  // Color filter (from variant options)
  const colorCounts = new Map<string, number>();
  products.forEach((product) => {
    const colorOption = product.options.find(
      (opt) =>
        opt.name.toLowerCase() === 'color' ||
        opt.name.toLowerCase() === 'colour'
    );
    if (colorOption) {
      colorOption.values.forEach((color) => {
        colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      });
    }
  });

  if (colorCounts.size > 0) {
    filters.push({
      type: 'color',
      label: 'Color',
      key: 'color',
      multiSelect: true,
      options: Array.from(colorCounts.entries())
        .map(([color, count]) => ({ value: color, label: color, count }))
        .sort((a, b) => b.count - a.count),
    });
  }

  // Size filter (from variant options)
  const sizeCounts = new Map<string, number>();
  products.forEach((product) => {
    const sizeOption = product.options.find(
      (opt) => opt.name.toLowerCase() === 'size'
    );
    if (sizeOption) {
      sizeOption.values.forEach((size) => {
        sizeCounts.set(size, (sizeCounts.get(size) || 0) + 1);
      });
    }
  });

  if (sizeCounts.size > 0) {
    filters.push({
      type: 'size',
      label: 'Size',
      key: 'size',
      multiSelect: true,
      options: Array.from(sizeCounts.entries())
        .map(([size, count]) => ({ value: size, label: size, count }))
        .sort((a, b) => b.count - a.count),
    });
  }

  // Brand filter (from vendor or metafields)
  const brandCounts = new Map<string, number>();
  products.forEach((product) => {
    const brand = product.vendor || product.metafields?.brand;
    if (brand) {
      brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
    }
  });

  if (brandCounts.size > 0) {
    filters.push({
      type: 'brand',
      label: 'Brand',
      key: 'brand',
      multiSelect: true,
      options: Array.from(brandCounts.entries())
        .map(([brand, count]) => ({ value: brand, label: brand, count }))
        .sort((a, b) => b.count - a.count),
    });
  }

  // Material filter (from metafields or tags)
  const materialCounts = new Map<string, number>();
  products.forEach((product) => {
    const material = product.metafields?.material;
    if (material) {
      materialCounts.set(material, (materialCounts.get(material) || 0) + 1);
    }

    // Also check tags for materials
    product.tags.forEach((tag) => {
      const materialTags = ['carbon', 'aluminum', 'steel', 'titanium', 'alloy'];
      if (materialTags.some((mat) => tag.toLowerCase().includes(mat))) {
        materialCounts.set(tag, (materialCounts.get(tag) || 0) + 1);
      }
    });
  });

  if (materialCounts.size > 0) {
    filters.push({
      type: 'material',
      label: 'Material',
      key: 'material',
      multiSelect: true,
      options: Array.from(materialCounts.entries())
        .map(([material, count]) => ({
          value: material,
          label: material,
          count,
        }))
        .sort((a, b) => b.count - a.count),
    });
  }

  return { filters };
}

// Generate price ranges for filtering
function generatePriceRanges(minPrice: number, maxPrice: number) {
  const ranges = [];
  const step = Math.ceil((maxPrice - minPrice) / 6); // 6 ranges

  for (let i = 0; i < 6; i++) {
    const min = minPrice + i * step;
    const max = i === 5 ? maxPrice : minPrice + (i + 1) * step;

    ranges.push({
      min,
      max,
      label:
        i === 5
          ? `AED ${min.toLocaleString()}+`
          : `AED ${min.toLocaleString()} - ${max.toLocaleString()}`,
    });
  }

  return ranges;
}

// Paginate products
export function paginateProducts(
  products: Product[],
  page: number = 1,
  limit: number = 30
) {
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    products: products.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

// Format price for display
export function formatPrice(
  price: string | number,
  currency: string = 'AED'
): string {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${currency} ${numPrice.toLocaleString('en-AE', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

// Check if product matches search query
export function matchesSearchQuery(product: Product, query: string): boolean {
  if (!query.trim()) return true;

  const searchTerms = query.toLowerCase().split(' ');
  const searchableText = [
    product.title,
    product.description,
    product.vendor || '',
    product.productType || '',
    ...product.tags,
    ...product.variants.map((v) => v.title),
  ]
    .join(' ')
    .toLowerCase();

  return searchTerms.every((term) => searchableText.includes(term));
}
