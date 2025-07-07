import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import ProductStream from '@/components/product/ProductStream';
import ProductSkeleton from '@/components/product/ProductSkeleton';
import RecentlyViewedTracker from '@/components/product/RecentlyViewedTracker';
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  SchemaMarkup,
} from '@/lib/schema-utils';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

// Enable streaming for this page
export const runtime = 'edge';
export const dynamicParams = true;

// Enable incremental static regeneration with on-demand revalidation
export const revalidate = 3600; // Cache for 1 hour by default, but allow on-demand revalidation

// Generate metadata with caching
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

    // Generate structured metadata for better SEO
    const metaDescription = product.description
      ? `${product.description.replace(/<[^>]*>?/gm, '').substring(0, 155)}...`
      : `Shop ${product.title} at MyBike - Premium cycling equipment and accessories`;

    return {
      title: `${product.title} | MyBike`,
      description: metaDescription,
      openGraph: {
        title: product.title,
        description: metaDescription,
        images: product.images?.[0]?.src
          ? [{ 
              url: product.images[0].src,
              width: 1200,
              height: 630,
              alt: product.images[0].alt || `${product.title} - MyBike`
            }]
          : [],
        // Using a valid OpenGraph type
        type: 'website',
        siteName: 'MyBike',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: metaDescription,
        images: product.images?.[0]?.src ? [product.images[0].src] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | MyBike',
      description: 'Shop premium bikes and accessories at MyBike.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the parameters
  const { handle } = await params;

  try {
    // Get initial product data using DataService with caching
    const product = await DataService.getProductByHandle(handle);

    if (!product) {
      notFound();
    }

    // Generate schema markup for SEO
    const productSchema = generateProductSchema(product);
    const breadcrumbSchema = generateBreadcrumbSchema(product);

    // Pre-fetch related products in parallel
    let relatedProducts: any[] = [];
    try {
      if (product.collections && product.collections.length > 0) {
        const relatedProductsPromises = product.collections.map(async (collectionId: string | number) => {
          // Convert string IDs to numbers as DataService.getProductsByCollection expects a number
          const numericId = typeof collectionId === 'string' ? parseInt(collectionId, 10) : collectionId;
          const { products } = await DataService.getProductsByCollection(
            numericId,
            { pagination: { page: 1, pageSize: 8 } }
          );
          return products.filter((p: any) => p.id !== product.id);
        });

        const relatedProductsArrays = await Promise.all(relatedProductsPromises);
        relatedProducts = relatedProductsArrays.flat().slice(0, 4);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
      // Continue with empty related products
    }

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

            {/* Product Stream with Suspense - This component handles all product rendering with streaming */}
            <Suspense fallback={<ProductSkeleton />}>
              <ProductStream 
                productId={product.id} 
                initialProduct={product} 
                initialRelatedProducts={relatedProducts}
              />
            </Suspense>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}
