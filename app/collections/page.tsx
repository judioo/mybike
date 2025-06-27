import { Metadata } from 'next';
import Link from 'next/link';
import { DataService } from '@/lib/data-service';

export const metadata: Metadata = {
  title: 'Shop All Categories | MyBike',
  description:
    'Browse our complete range of bicycles and cycling accessories. Find road bikes, mountain bikes, electric bikes, and more.',
};

export default async function CollectionsPage() {
  // Get collections using DataService
  const { collections } = await DataService.getCollections({
    sort: 'title',
  });

  // Get data source info for debugging
  const dataSourceInfo = DataService.getDataSourceInfo();

  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Data source indicator (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className='mb-4 p-2 bg-gray-100 rounded text-sm text-gray-600'>
            Data Source: {dataSourceInfo.dataSource}
          </div>
        )}

        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Shop All Categories
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Discover our complete range of bicycles and cycling gear. From
            professional racing bikes to comfortable city cruisers.
          </p>
        </div>

        {/* Collections Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className='group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200'
            >
              <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
                {/* Placeholder for collection image */}
                <div className='flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
                  <div className='text-6xl text-blue-400'>
                    {collection.handle === 'road-bikes' && '🚴'}
                    {collection.handle === 'mountain-bikes' && '🚵'}
                    {collection.handle === 'hybrid-bikes' && '🚲'}
                    {collection.handle === 'electric-bikes' && '⚡'}
                    {collection.handle === 'kids-bikes' && '🧒'}
                    {collection.handle === 'accessories' && '🛡️'}
                  </div>
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                  {collection.title}
                </h3>
                <p className='text-gray-600 text-sm mb-4'>
                  {collection.description}
                </p>
                <div className='flex items-center text-blue-600 font-medium'>
                  <span>Shop Now</span>
                  <svg
                    className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center bg-gray-50 rounded-lg p-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Need Help Choosing?
          </h2>
          <p className='text-gray-600 mb-6'>
            Our expert team is here to help you find the perfect bike for your
            needs.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors'
            >
              Contact Us
            </Link>
            <Link
              href='/services/bike-fitting'
              className='border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors'
            >
              Book Bike Fitting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
