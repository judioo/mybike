import { Product } from '@/types/product';

/**
 * Generates Product schema markup for SEO following schema.org specifications
 */
export function generateProductSchema(product: Product): any {
  // Base URL for the site
  const baseUrl = 'https://mybike.ae'; // TODO: Make this configurable

  // Build the schema object
  const schema: any = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    url: `${baseUrl}/products/${product.handle}`,
  };

  // Add images
  if (product.images && product.images.length > 0) {
    schema.image = product.images.map((img) => img.src).filter(Boolean);
  }

  // Add SKU from first variant if available
  if (product.variants && product.variants.length > 0) {
    const firstVariant = product.variants[0];
    if (firstVariant.sku) {
      schema.sku = firstVariant.sku;
    }
  }

  // Add brand information
  if (product.vendor) {
    schema.brand = {
      '@type': 'Brand',
      name: product.vendor,
    };
  }

  // Add MPN (manufacturer part number) if available from metafields
  if (product.metafields?.mpn) {
    schema.mpn = product.metafields.mpn;
  }

  // Add GTIN if available from metafields
  if (product.metafields?.gtin) {
    schema.gtin = product.metafields.gtin;
  } else if (product.metafields?.gtin13) {
    schema.gtin13 = product.metafields.gtin13;
  } else if (product.metafields?.gtin12) {
    schema.gtin12 = product.metafields.gtin12;
  }

  // Add offers (pricing and availability)
  if (product.price) {
    schema.offers = {
      '@type': 'Offer',
      url: `${baseUrl}/products/${product.handle}`,
      priceCurrency: 'AED', // UAE Dirham
      price: parseFloat(product.price).toFixed(2),
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    };

    // Add sale price if available
    if (
      product.compareAtPrice &&
      parseFloat(product.compareAtPrice) > parseFloat(product.price)
    ) {
      schema.offers.priceValidUntil = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split('T')[0]; // 30 days from now
    }
  }

  // Add multiple offers if there are variants with different prices
  if (product.variants && product.variants.length > 1) {
    const variantOffers = product.variants
      .filter((variant) => variant.available !== false && variant.price)
      .map((variant) => ({
        '@type': 'Offer',
        url: `${baseUrl}/products/${product.handle}?variant=${variant.id}`,
        priceCurrency: 'AED',
        price: parseFloat(variant.price).toFixed(2),
        availability: variant.available
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        sku: variant.sku,
        name: variant.title,
      }));

    if (variantOffers.length > 1) {
      schema.offers = variantOffers;
    }
  }

  // Add category information
  if (product.productType) {
    schema.category = product.productType;
  }

  // Add aggregate rating if reviews are available (placeholder for future implementation)
  if (product.metafields?.averageRating && product.metafields?.reviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.metafields.averageRating,
      reviewCount: product.metafields.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  // Add additional product details from metafields
  if (product.metafields) {
    const additionalProperties: any[] = [];

    if (product.metafields.material) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Material',
        value: product.metafields.material,
      });
    }

    if (product.metafields.weight) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Weight',
        value: product.metafields.weight,
      });
    }

    if (product.metafields.speed) {
      additionalProperties.push({
        '@type': 'PropertyValue',
        name: 'Speed',
        value: `${product.metafields.speed} Speed`,
      });
    }

    if (additionalProperties.length > 0) {
      schema.additionalProperty = additionalProperties;
    }
  }

  // Add manufacturer/vendor as organization
  if (product.vendor) {
    schema.manufacturer = {
      '@type': 'Organization',
      name: product.vendor,
    };
  }

  return schema;
}

/**
 * Generates BreadcrumbList schema for product pages
 */
export function generateBreadcrumbSchema(product: Product): any {
  const baseUrl = 'https://mybike.ae';

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Products',
      item: `${baseUrl}/products`,
    },
  ];

  // Add collection breadcrumb if available
  if (product.collections && product.collections.length > 0) {
    // For simplicity, we'll use the first collection
    // In a real scenario, you might want to determine the primary collection
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 3,
      name: product.productType || 'Category',
      item: `${baseUrl}/collections/${product.collections[0]}`,
    });

    breadcrumbs.push({
      '@type': 'ListItem',
      position: 4,
      name: product.title,
      item: `${baseUrl}/products/${product.handle}`,
    });
  } else {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 3,
      name: product.title,
      item: `${baseUrl}/products/${product.handle}`,
    });
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs,
  };
}

/**
 * Component for rendering JSON-LD schema in the page
 */
export function SchemaMarkup({ schema }: { schema: any }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0),
      }}
      key='schema-jsonld'
    />
  );
}
