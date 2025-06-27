import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';
import CollectionClientWrapper from './CollectionClientWrapper';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{
    page?: string;
    sort?: string;
    [key: string]: string | string[] | undefined;
  }>;
}

// Generate static params for all collections
export async function generateStaticParams() {
  const { collections } = await DataService.getCollections();
  return collections.map((collection) => ({
    handle: collection.handle,
  }));
}

// Generate metadata
export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  try {
    const { handle } = await params;
    const collection = await DataService.getCollectionByHandle(handle);

    if (!collection) {
      return {
        title: 'Collection Not Found | MyBike',
        description: 'The requested collection could not be found.',
      };
    }

    return {
      title: `${collection.title} | MyBike`,
      description:
        collection.description || `Shop our ${collection.title} collection`,
    };
  } catch (error) {
    return {
      title: 'Collection | MyBike',
      description: 'Shop our bicycle collections',
    };
  }
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  // Await the parameters
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;

  // Extract URL parameters with defaults
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  const sort = resolvedSearchParams.sort || 'manual';

  // Build filters from searchParams
  const appliedFilters: Record<string, string | string[]> = {};
  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (key !== 'page' && key !== 'sort' && value) {
      appliedFilters[key] = value;
    }
  });

  try {
    // Get collection info
    const collection = await DataService.getCollectionByHandle(handle);

    if (!collection) {
      notFound();
    }

    // Get paginated products using DataService with server-side pagination
    const { products: paginatedProducts, pagination } =
      await DataService.getProductsByCollection(collection.id, {
        page,
        pageSize: 12,
        sort,
        filters: appliedFilters,
      });

    // Get filter tree for the collection (use all products to build accurate filter tree)
    const { products: allCollectionProducts } =
      await DataService.getProductsByCollection(collection.id, {
        page: 1,
        pageSize: 1000, // Get all products to build filter tree
        sort: 'manual',
      });

    // Generate filter tree from all collection products
    const filterTree = await DataService.generateFilterTree(
      allCollectionProducts,
      [collection]
    );

    return (
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
                  <Link
                    href='/collections'
                    className='ml-4 text-gray-400 hover:text-gray-500'
                  >
                    Collections
                  </Link>
                </div>
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
                    {collection.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {collection.title}
            </h1>
            {collection.description && (
              <p className='mt-4 text-lg text-gray-600 max-w-3xl'>
                {collection.description}
              </p>
            )}
          </div>

          {/* Collection Client Wrapper with server-side data */}
          <CollectionClientWrapper
            collection={collection}
            paginatedProducts={paginatedProducts}
            pagination={pagination}
            filterTree={filterTree}
            appliedFilters={appliedFilters}
            currentSort={sort}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading collection:', error);
    notFound();
  }
}
