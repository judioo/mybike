import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-6xl font-bold text-gray-900 mb-6'>
              Find Your Perfect <span className='text-blue-600'>Ride</span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Your premier destination for quality bicycles, expert services,
              and cycling accessories. From road bikes to mountain bikes, we
              help riders of all levels.
            </p>

            {/* CTA Buttons */}
            <div className='flex gap-4 items-center justify-center flex-col sm:flex-row'>
              <Link
                href='/collections'
                className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block'
              >
                Shop Bikes
              </Link>
              <Link
                href='/collections'
                className='border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors inline-block'
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-900'>
            Shop by Category
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Mountain Bikes */}
            <Link
              href='/collections/mountain-bikes'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                🚵‍♂️ Mountain Bikes
              </div>
              <h3 className='text-xl font-semibold mb-2'>Mountain Bikes</h3>
              <p className='text-gray-600 mb-4'>
                Conquer any trail with our premium mountain bikes
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>

            {/* Road Bikes */}
            <Link
              href='/collections/road-bikes'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                🚴‍♀️ Road Bikes
              </div>
              <h3 className='text-xl font-semibold mb-2'>Road Bikes</h3>
              <p className='text-gray-600 mb-4'>
                Speed and performance for the serious cyclist
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>

            {/* Hybrid Bikes */}
            <Link
              href='/collections/hybrid-bikes'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                🚲 Hybrid Bikes
              </div>
              <h3 className='text-xl font-semibold mb-2'>Hybrid Bikes</h3>
              <p className='text-gray-600 mb-4'>
                Versatile bikes perfect for city commuting and leisure rides
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>
          </div>

          {/* Additional Categories Row */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
            {/* Electric Bikes */}
            <Link
              href='/collections/electric-bikes'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                ⚡ Electric Bikes
              </div>
              <h3 className='text-xl font-semibold mb-2'>Electric Bikes</h3>
              <p className='text-gray-600 mb-4'>
                Electric bikes with advanced battery technology
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>

            {/* Kids Bikes */}
            <Link
              href='/collections/kids-bikes'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                👶 Kids Bikes
              </div>
              <h3 className='text-xl font-semibold mb-2'>Kids Bikes</h3>
              <p className='text-gray-600 mb-4'>
                Safe and fun bikes designed specifically for children
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>

            {/* Accessories */}
            <Link
              href='/collections/accessories'
              className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block group'
            >
              <div className='bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center text-gray-500 group-hover:bg-gray-300 transition-colors'>
                🛠️ Accessories
              </div>
              <h3 className='text-xl font-semibold mb-2'>Accessories</h3>
              <p className='text-gray-600 mb-4'>
                Essential cycling accessories and gear
              </p>
              <span className='text-blue-600 font-medium group-hover:text-blue-700'>
                Shop Now →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
