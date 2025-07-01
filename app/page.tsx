import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-background'>
      {/* Hero Section */}
      <section className='relative h-[90vh] flex items-center'>
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
        
        <div className='relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 text-white'>
          <div className='max-w-3xl lg:max-w-4xl'>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight tracking-wide uppercase'>
              CELEBRATE THE <br />
              <span className='text-secondary'>Tour de France</span> at MyBike
            </h1>
            <p className='text-xl lg:text-2xl mb-10 text-gray-100 max-w-3xl'>
              Watch the tour live from 5-27th July at any MyBike Fan Zones and stand a chance to win exciting prizes.
            </p>

            {/* CTA Button */}
            <Link
              href='/tour-de-france'
              className='inline-block bg-secondary hover:bg-opacity-90 text-white px-10 py-5 font-medium transition-colors uppercase tracking-wider text-lg'
            >
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories - Large Banner Style */}
      <section className='py-24'>
        <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16'>
          <h2 className='text-3xl lg:text-4xl font-bold text-center mb-16 uppercase tracking-wider'>
            New Arrivals
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10'>
            {/* Category 1 */}
            <div className='category-card group h-[400px] lg:h-[450px]'>
              <Image 
                src="/images/categories/road-bikes.jpg" 
                alt="Road Bikes" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority
              />
              <div className='category-card-content'>
                <h3 className='text-xl lg:text-2xl font-bold mb-3 uppercase tracking-wider'>Road Bikes</h3>
                <Link href="/collections/road-bikes" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Collection
                </Link>
              </div>
            </div>
            
            {/* Category 2 */}
            <div className='category-card group h-[400px] lg:h-[450px]'>
              <Image 
                src="/images/categories/mountain-bikes.jpg" 
                alt="Mountain Bikes" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className='category-card-content'>
                <h3 className='text-xl lg:text-2xl font-bold mb-3 uppercase tracking-wider'>Mountain Bikes</h3>
                <Link href="/collections/mountain-bikes" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Collection
                </Link>
              </div>
            </div>
            
            {/* Category 3 */}
            <div className='category-card group h-[400px] lg:h-[450px]'>
              <Image 
                src="/images/categories/clothing.jpg" 
                alt="Cycling Clothing" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className='category-card-content'>
                <h3 className='text-xl lg:text-2xl font-bold mb-3 uppercase tracking-wider'>Clothing</h3>
                <Link href="/collections/clothing" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Collection
                </Link>
              </div>
            </div>
            
            {/* Category 4 */}
            <div className='category-card group h-[400px] lg:h-[450px]'>
              <Image 
                src="/images/categories/accessories.jpg" 
                alt="Cycling Accessories" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className='category-card-content'>
                <h3 className='text-xl lg:text-2xl font-bold mb-3 uppercase tracking-wider'>Accessories</h3>
                <Link href="/collections/accessories" className='inline-block text-white hover:text-secondary transition-colors uppercase text-sm tracking-wider font-medium'>
                  Shop Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Sections */}
      <section className='py-24 bg-gray-50'>
        <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16'>
          <h2 className='text-3xl lg:text-4xl font-bold text-center mb-16 uppercase tracking-wider'>
            Featured Collections
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
            {/* Featured Section 1 */}
            <div className='relative h-[550px] lg:h-[650px] overflow-hidden group'>
              <Image 
                src="/images/featured/preloved.jpg" 
                alt="Preloved Bikes" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-12 lg:p-16'>
                <span className='text-secondary font-medium uppercase tracking-widest mb-3'>Premium Selection</span>
                <h3 className='text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wider'>PRELOVED BIKES</h3>
                <p className='text-white text-lg mb-8 max-w-lg'>Quality pre-owned bikes at exceptional prices, fully serviced and ready to ride</p>
                <Link href="/collections/preloved" className='inline-block bg-white text-primary hover:bg-secondary hover:text-white px-10 py-4 font-medium uppercase tracking-wider transition-colors'>
                  Explore Collection
                </Link>
              </div>
            </div>
            
            {/* Featured Section 2 */}
            <div className='relative h-[550px] lg:h-[650px] overflow-hidden group'>
              <Image 
                src="/images/featured/trainers.jpg" 
                alt="Indoor Trainers" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-12 lg:p-16'>
                <span className='text-secondary font-medium uppercase tracking-widest mb-3'>Train Indoors</span>
                <h3 className='text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wider'>INDOOR TRAINERS</h3>
                <p className='text-white text-lg mb-8 max-w-lg'>Train year-round with premium indoor cycling equipment for peak performance</p>
                <Link href="/collections/trainers" className='inline-block bg-white text-primary hover:bg-secondary hover:text-white px-10 py-4 font-medium uppercase tracking-wider transition-colors'>
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog/News Section */}
      <section className='py-24'>
        <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16'>
          <div className='flex flex-col md:flex-row justify-between items-center mb-16'>
            <h2 className='text-3xl lg:text-4xl font-bold uppercase tracking-wider mb-6 md:mb-0'>Latest Articles</h2>
            <Link href="/blog" className='text-primary hover:text-secondary transition-colors font-medium uppercase tracking-wider flex items-center group'>
              View all Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16'>
            {/* Blog Post 1 */}
            <div className='group'>
              <div className='aspect-w-16 aspect-h-10 bg-gray-100 mb-6 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-1.jpg" 
                  alt="Blog post" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className='text-sm text-gray-500 mb-3 uppercase tracking-wider'>May 15, 2023</div>
              <h3 className='text-xl lg:text-2xl font-bold mb-3 group-hover:text-secondary transition-colors'>
                <Link href="/blog/post-1">
                  The Ultimate Guide to Choosing Your First Road Bike
                </Link>
              </h3>
              <p className='text-gray-600 line-clamp-2 mb-4'>Learn everything you need to know about selecting the perfect road bike for your riding style and budget.</p>
              <Link href="/blog/post-1" className='text-primary hover:text-secondary transition-colors font-medium inline-flex items-center'>
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Blog Post 2 */}
            <div className='group'>
              <div className='aspect-w-16 aspect-h-10 bg-gray-100 mb-6 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-2.jpg" 
                  alt="Blog post" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className='text-sm text-gray-500 mb-3 uppercase tracking-wider'>June 2, 2023</div>
              <h3 className='text-xl lg:text-2xl font-bold mb-3 group-hover:text-secondary transition-colors'>
                <Link href="/blog/post-2">
                  Essential Maintenance Tips for Mountain Bikes
                </Link>
              </h3>
              <p className='text-gray-600 line-clamp-2 mb-4'>Keep your mountain bike in top condition with these professional maintenance tips from our expert mechanics.</p>
              <Link href="/blog/post-2" className='text-primary hover:text-secondary transition-colors font-medium inline-flex items-center'>
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Blog Post 3 */}
            <div className='group'>
              <div className='aspect-w-16 aspect-h-10 bg-gray-100 mb-6 relative overflow-hidden'>
                <Image 
                  src="/images/blog/blog-3.jpg" 
                  alt="Blog post" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className='text-sm text-gray-500 mb-3 uppercase tracking-wider'>June 18, 2023</div>
              <h3 className='text-xl lg:text-2xl font-bold mb-3 group-hover:text-secondary transition-colors'>
                <Link href="/blog/post-3">
                  Top 5 Cycling Routes in the UAE
                </Link>
              </h3>
              <p className='text-gray-600 line-clamp-2 mb-4'>Discover the most scenic and challenging cycling routes across the UAE, from urban paths to desert adventures.</p>
              <Link href="/blog/post-3" className='text-primary hover:text-secondary transition-colors font-medium inline-flex items-center'>
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
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
