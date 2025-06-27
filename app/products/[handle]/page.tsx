import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import VariantSelector from '@/components/product/VariantSelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ProductSpecs from '@/components/product/ProductSpecs';
import RecentlyViewedProducts from '@/components/product/RecentlyViewedProducts';
import RelatedProducts from '@/components/product/RelatedProducts';
import RecentlyViewedTracker from '@/components/product/RecentlyViewedTracker';
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  SchemaMarkup,
} from '@/lib/schema-utils';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const { products } = await DataService.getProducts();
  return products.map((product) => ({
    handle: product.handle,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const { handle } = await params;
    const product = await DataService.getProductByHandle(handle);

    if (!product) {
      return {
        title: 'Product Not Found | MyBike',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: `${product.title} | MyBike`,
      description: product.description || `Shop ${product.title} at MyBike`,
      openGraph: {
        title: product.title,
        description: product.description || `Shop ${product.title} at MyBike`,
        images: product.images?.[0]?.src
          ? [
              {
                url: product.images[0].src,
                alt: product.images[0].alt || product.title,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product | MyBike',
      description: 'Shop our bicycle products',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the parameters
  const { handle } = await params;

  try {
    // Get product using DataService
    const product = await DataService.getProductByHandle(handle);

    if (!product) {
      notFound();
    }

    // Get related products from the same collections
    const relatedProductsPromises =
      product.collections?.map(async (collectionId) => {
        const { products } = await DataService.getProductsByCollection(
          collectionId.toString(),
          { page: 1, pageSize: 8 }
        );
        return products.filter((p) => p.id !== product.id);
      }) || [];

    const relatedProductsArrays = await Promise.all(relatedProductsPromises);
    const relatedProducts = relatedProductsArrays.flat().slice(0, 4);

    // Generate schema markup for SEO
    const productSchema = generateProductSchema(product);
    const breadcrumbSchema = generateBreadcrumbSchema(product);

    return (
      <>
        {/* JSON-LD Schema Markup for SEO */}
        <SchemaMarkup schema={productSchema} />
        <SchemaMarkup schema={breadcrumbSchema} />

        {/* Track this product view for recently viewed */}
        <RecentlyViewedTracker product={product} />

        <div className='min-h-screen py-8'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Breadcrumb */}
            <nav className='flex mb-8' aria-label='Breadcrumb'>
              <ol className='flex items-center space-x-4'>
                <li>
                  <Link href='/' className='text-gray-400 hover:text-gray-500'>
                    Home
                  </Link>
                </li>
                <li>
                  <div className='flex items-center'>
                    <svg
                      className='flex-shrink-0 h-5 w-5 text-gray-300'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <span className='ml-4 text-gray-500 font-medium'>
                      {product.title}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* Product Details */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
              {/* Product Images */}
              <div>
                <ProductImageGallery
                  images={product.images}
                  productTitle={product.title}
                />
              </div>

              {/* Product Info */}
              <div className='space-y-6'>
                <div>
                  <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                    {product.title}
                  </h1>

                  {/* Price and Availability */}
                  <div className='mt-4 flex items-center justify-between'>
                    <div className='flex items-baseline'>
                      <p className='text-3xl tracking-tight text-gray-900'>
                        ${product.price}
                      </p>
                      {product.compareAtPrice &&
                        product.compareAtPrice > product.price && (
                          <span className='ml-3 text-lg text-gray-500 line-through'>
                            ${product.compareAtPrice}
                          </span>
                        )}
                      {product.compareAtPrice &&
                        product.compareAtPrice > product.price && (
                          <span className='ml-3 text-sm font-medium text-green-600'>
                            Save $
                            {(product.compareAtPrice - product.price).toFixed(
                              2
                            )}
                          </span>
                        )}
                    </div>

                    {/* Inventory Status */}
                    <div className='flex items-center'>
                      {product.available !== false ? (
                        <span className='flex items-center text-sm font-medium text-green-600'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                          In Stock
                        </span>
                      ) : (
                        <span className='flex items-center text-sm font-medium text-red-600'>
                          <svg
                            className='w-4 h-4 mr-1'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path
                              fillRule='evenodd'
                              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            />
                          </svg>
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Description */}
                {product.description && (
                  <div className='prose prose-sm text-gray-600 max-w-none'>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {/* Product Features/Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h3 className='text-sm font-medium text-gray-900 mb-2'>
                      Features
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Variant Selector */}
                {product.variants && product.variants.length > 1 && (
                  <VariantSelector
                    variants={product.variants}
                    selectedVariant={product.variants[0]}
                  />
                )}

                {/* Add to Cart */}
                <AddToCartButton
                  product={product}
                  variant={product.variants?.[0]}
                />

                {/* Product Specifications */}
                <ProductSpecs
                  metafields={product.metafields}
                  product={{
                    vendor: product.vendor,
                    productType: product.productType,
                    weight: product.weight,
                    tags: product.tags,
                    handle: product.handle,
                    createdAt: product.createdAt,
                  }}
                />
              </div>
            </div>

            {/* Recently Viewed Products */}
            <div className='mt-16'>
              <RecentlyViewedProducts
                currentProductId={product.id}
                maxItems={6}
              />
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className='mt-16'>
                <RelatedProducts products={relatedProducts} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
