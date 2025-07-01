import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='relative h-[80vh] flex items-center'>
        <div className='absolute inset-0 z-0'>
          <Image 
            src="/images/hero/hero-bg.jpg" 
            alt="Premium road bike" 
            fill 
            style={{objectFit: 'cover'}} 
            priority
          />
          <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        </div>
        
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white'>
          <div className='max-w-2xl'>
            <h1 className='text-5xl sm:text-7xl font-bold mb-6 leading-tight'>
              CELEBRATE THE <br />
              <span className='text-secondary'>Tour de France</span> at MyBike
            </h1>
            <p className='text-xl mb-8 text-gray-100'>
              Watch the tour live from 5-27th July at any MyBike Fan Zones and stand a chance to win exciting prizes.
            </p>

            {/* CTA Button */}
            <Link
              href='/tour-de-france'
              className='inline-block bg-secondary hover:bg-opacity-90 text-white px-8 py-4 font-medium transition-colors uppercase tracking-wider'
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories - Large Banner Style */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-16 uppercase tracking-wide'>
            New Arrivals
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Category 1 */}
            <div className='category-card'>
              <Image 
                src="/images/categories/road-bikes.jpg" 
                alt="Road Bikes" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='category-card-content'>
                <h3 className='text-xl font-bold mb-2'>Road Bikes</h3>
                <Link href="/collections/road-bikes" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 2 */}
            <div className='category-card'>
              <Image 
                src="/images/categories/mountain-bikes.jpg" 
                alt="Mountain Bikes" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='category-card-content'>
                <h3 className='text-xl font-bold mb-2'>Mountain Bikes</h3>
                <Link href="/collections/mountain-bikes" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 3 */}
            <div className='category-card'>
              <Image 
                src="/images/categories/clothing.jpg" 
                alt="Cycling Clothing" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='category-card-content'>
                <h3 className='text-xl font-bold mb-2'>Clothing</h3>
                <Link href="/collections/clothing" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Category 4 */}
            <div className='category-card'>
              <Image 
                src="/images/categories/accessories.jpg" 
                alt="Cycling Accessories" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='category-card-content'>
                <h3 className='text-xl font-bold mb-2'>Accessories</h3>
                <Link href="/collections/accessories" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Sections */}
      <section className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Featured Section 1 */}
            <div className='relative h-[500px] overflow-hidden'>
              <Image 
                src="/images/featured/preloved.jpg" 
                alt="Preloved Bikes" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-10'>
                <h3 className='text-3xl font-bold text-white mb-4'>PRELOVED BIKES</h3>
                <p className='text-white mb-6'>Quality pre-owned bikes at exceptional prices</p>
                <Link href="/collections/preloved" className='inline-block bg-white text-primary px-8 py-3 font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors'>
                  Shop Now
                </Link>
              </div>
            </div>
            
            {/* Featured Section 2 */}
            <div className='relative h-[500px] overflow-hidden'>
              <Image 
                src="/images/featured/trainers.jpg" 
                alt="Indoor Trainers" 
                fill 
                style={{objectFit: 'cover'}} 
              />
              <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-10'>
                <h3 className='text-3xl font-bold text-white mb-4'>INDOOR TRAINERS</h3>
                <p className='text-white mb-6'>Train year-round with premium indoor cycling equipment</p>
                <Link href="/collections/trainers" className='inline-block bg-white text-primary px-8 py-3 font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors'>
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog/News Section */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-12'>
            <h2 className='text-3xl font-bold uppercase tracking-wide'>Read Our Blogs</h2>
            <Link href="/blog" className='text-primary hover:text-secondary transition-colors font-medium'>
              View all Blogs
            </Link>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Blog Post 1 */}
            <div>
              <div className='aspect-w-16 aspect-h-9 bg-gray-200 mb-4 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-1.jpg" 
                  alt="Tour de France Preview" 
                  fill 
                  style={{objectFit: 'cover'}} 
                />
              </div>
              <div className='text-sm text-gray-500 mb-2'>EventsJun 30, 2025</div>
              <h3 className='text-xl font-bold mb-2 hover:text-secondary transition-colors'>
                <Link href="/blog/tour-de-france-preview">Tour de France Preview</Link>
              </h3>
            </div>
            
            {/* Blog Post 2 */}
            <div>
              <div className='aspect-w-16 aspect-h-9 bg-gray-200 mb-4 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-2.jpg" 
                  alt="Maurten: Fuel Like a Pro" 
                  fill 
                  style={{objectFit: 'cover'}} 
                />
              </div>
              <div className='text-sm text-gray-500 mb-2'>NutritionJun 24, 2025</div>
              <h3 className='text-xl font-bold mb-2 hover:text-secondary transition-colors'>
                <Link href="/blog/maurten-fuel-like-a-pro">Maurten: Fuel Like a Pro</Link>
              </h3>
            </div>
            
            {/* Blog Post 3 */}
            <div>
              <div className='aspect-w-16 aspect-h-9 bg-gray-200 mb-4 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-3.jpg" 
                  alt="Colnago Y1RS" 
                  fill 
                  style={{objectFit: 'cover'}} 
                />
              </div>
              <div className='text-sm text-gray-500 mb-2'>Jun 19, 2025</div>
              <h3 className='text-xl font-bold mb-2 hover:text-secondary transition-colors'>
                <Link href="/blog/colnago-y1rs">Colnago Y1RS</Link>
              </h3>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brand Story Section */}
      <section className='py-20 bg-gray-900 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold mb-6 uppercase tracking-wide'>MYBIKE</h2>
              <p className='text-gray-300 mb-6 text-lg leading-relaxed'>
                With three decades of experience in the cycling industry, with 22 years in the UAE, 
                we're dedicated to ensuring our riders feel supported and share in the excitement 
                and passion we have for cycling.
              </p>
              <div className='flex space-x-4'>
                <Link href="/about" className='inline-block bg-secondary hover:bg-opacity-90 text-white px-6 py-3 font-medium uppercase tracking-wider transition-colors'>
                  About Us
                </Link>
                <Link href="/contact" className='inline-block border border-white hover:bg-white hover:text-gray-900 text-white px-6 py-3 font-medium uppercase tracking-wider transition-colors'>
                  Contact Us
                </Link>
              </div>
            </div>
            <div className='relative h-[400px]'>
              <Image 
                src="/images/store-interior.jpg" 
                alt="MyBike Store" 
                fill 
                style={{objectFit: 'cover'}} 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className='py-16 bg-gray-100'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-2xl font-bold mb-6 uppercase tracking-wide'>Newsletter</h2>
          <p className='text-gray-600 mb-8'>Subscribe to receive the latest news!</p>
          <div className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Your email'
              className='flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent'
            />
            <button className='px-6 py-3 bg-primary hover:bg-gray-800 text-white font-medium uppercase tracking-wider transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
