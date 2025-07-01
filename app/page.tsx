import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='bg-background'>
      {/* Hero Section - Cervelo Aspero-5 */}
      <section className='relative h-[54vh]'>
        <div className='absolute inset-0 z-0'>
          <Image 
            src="/images/Bike Racer Banner Image.png" 
            alt="Cervelo Aspero-5 gravel bike being raced on a challenging terrain" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        
        <div className='absolute top-0 left-0 h-full w-full z-10 flex flex-col justify-center'>
          <div className='pl-6 sm:pl-10 lg:pl-16 xl:pl-24 text-white'>
            <div className='tracking-widest uppercase text-lg md:text-xl font-medium mb-6'>MEET THE NEW</div>
            
            <h1 className='font-bold tracking-widest uppercase leading-none mb-10 text-5xl md:text-6xl lg:text-8xl'>
              CERVELO<br/>
              ASPERO-5
            </h1>
            
            <div className='w-full pr-6 sm:pr-10 lg:pr-16 xl:pr-24'>
              <p className='text-lg md:text-xl leading-relaxed mb-10'>
                Get ready to race with the most aerodynamic gravel bike ever.  
              </p>
            </div>

            <div>
              <Link
                href='/products/cervelo-aspero-5'
                className='inline-block bg-white text-black hover:bg-secondary hover:text-white px-8 py-4 uppercase tracking-wider font-medium transition-colors'
              >
                SHOP NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
      

      
      {/* New Arrivals Section */}

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
                src="https://images.pexels.com/photos/5465164/pexels-photo-5465164.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" 
                alt="Premium carbon road bike with aerodynamic design" 
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
                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" 
                alt="High-performance mountain bike on rugged trail terrain" 
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
                src="https://images.pexels.com/photos/5807541/pexels-photo-5807541.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1" 
                alt="Professional cycling jerseys and apparel for performance riding" 
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
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center" 
                alt="Essential cycling accessories including helmets, lights, and tools" 
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
                src="https://images.pexels.com/photos/2539400/pexels-photo-2539400.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1" 
                alt="Premium pre-owned road bike in excellent condition" 
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
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop&crop=center" 
                alt="High-tech indoor cycling trainer with smart connectivity features" 
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
                  src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop&crop=center" 
                  alt="Cyclist riding a road bike on a scenic mountain route" 
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
                  src="https://images.unsplash.com/photo-1544191696-15693072b5a3?w=600&h=400&fit=crop&crop=center" 
                  alt="Mountain bike maintenance and repair tools laid out on workbench" 
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
                  src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop&crop=center" 
                  alt="Scenic cycling route through UAE desert landscape at sunset" 
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
                alt="MyBike premium retail store interior showcasing high-end bicycles" 
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
