export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Hero Section */}
      <section className='section-spacing'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl sm:text-6xl font-bold text-foreground mb-6'>
              Welcome to <span className='text-primary'>MyBike</span>
            </h1>
            <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Your premium destination for bicycles, parts, and cycling
              accessories. From road bikes to mountain bikes, find your perfect
              ride.
            </p>

            {/* CTA Buttons showcasing our button styles */}
            <div className='flex gap-4 items-center justify-center flex-col sm:flex-row'>
              <button className='bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-[--radius-button] font-medium transition-colors'>
                Shop Bikes
              </button>
              <button className='border border-border hover:bg-muted text-foreground px-8 py-3 rounded-[--radius-button] font-medium transition-colors'>
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className='bg-muted py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-center mb-12 text-foreground'>
            Design System Preview
          </h2>

          {/* Color Palette */}
          <div className='mb-12'>
            <h3 className='text-xl font-semibold mb-6 text-foreground'>
              Brand Colors
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='bg-primary p-6 rounded-[--radius-card] text-primary-foreground'>
                <div className='font-medium'>Primary</div>
                <div className='text-sm opacity-90'>Trust & Reliability</div>
              </div>
              <div className='bg-secondary p-6 rounded-[--radius-card] text-secondary-foreground'>
                <div className='font-medium'>Secondary</div>
                <div className='text-sm opacity-90'>Energy & Speed</div>
              </div>
              <div className='bg-accent p-6 rounded-[--radius-card] text-accent-foreground'>
                <div className='font-medium'>Accent</div>
                <div className='text-sm opacity-90'>Eco-Friendly</div>
              </div>
              <div className='bg-muted-foreground p-6 rounded-[--radius-card] text-background'>
                <div className='font-medium'>Neutral</div>
                <div className='text-sm opacity-90'>Balanced</div>
              </div>
            </div>
          </div>

          {/* Product Status Badges */}
          <div className='mb-12'>
            <h3 className='text-xl font-semibold mb-6 text-foreground'>
              Product Status
            </h3>
            <div className='flex gap-4 flex-wrap'>
              <span className='badge-new px-3 py-1 rounded-full text-sm font-medium'>
                New Arrival
              </span>
              <span className='badge-preloved px-3 py-1 rounded-full text-sm font-medium'>
                Preloved
              </span>
              <span className='badge-sale px-3 py-1 rounded-full text-sm font-medium'>
                On Sale
              </span>
            </div>
          </div>

          {/* Sample Product Cards */}
          <div className='mb-12'>
            <h3 className='text-xl font-semibold mb-6 text-foreground'>
              Product Grid Layout
            </h3>
            <div className='product-grid'>
              <div className='bg-card p-6 rounded-[--radius-card] border border-border card-hover'>
                <div className='bg-muted h-48 rounded-[--radius-md] mb-4 flex items-center justify-center text-muted-foreground'>
                  Product Image
                </div>
                <h4 className='font-semibold text-card-foreground mb-2'>
                  Mountain Bike Pro
                </h4>
                <p className='text-muted-foreground text-sm mb-3'>
                  Professional grade mountain bike for serious riders
                </p>
                <div className='flex items-center justify-between'>
                  <div className='flex gap-2 items-center'>
                    <span className='price-current text-lg'>AED 2,999</span>
                    <span className='price-original text-sm'>AED 3,499</span>
                  </div>
                  <span className='badge-sale px-2 py-1 rounded text-xs font-medium'>
                    Sale
                  </span>
                </div>
              </div>

              <div className='bg-card p-6 rounded-[--radius-card] border border-border card-hover'>
                <div className='bg-muted h-48 rounded-[--radius-md] mb-4 flex items-center justify-center text-muted-foreground'>
                  Product Image
                </div>
                <h4 className='font-semibold text-card-foreground mb-2'>
                  Road Bike Elite
                </h4>
                <p className='text-muted-foreground text-sm mb-3'>
                  High-performance road bike for competitive cycling
                </p>
                <div className='flex items-center justify-between'>
                  <span className='price-current text-lg'>AED 4,599</span>
                  <span className='badge-new px-2 py-1 rounded text-xs font-medium'>
                    New
                  </span>
                </div>
              </div>

              <div className='bg-card p-6 rounded-[--radius-card] border border-border card-hover'>
                <div className='bg-muted h-48 rounded-[--radius-md] mb-4 flex items-center justify-center text-muted-foreground'>
                  Product Image
                </div>
                <h4 className='font-semibold text-card-foreground mb-2'>
                  City Cruiser
                </h4>
                <p className='text-muted-foreground text-sm mb-3'>
                  Comfortable bike for city commuting and leisure rides
                </p>
                <div className='flex items-center justify-between'>
                  <span className='price-current text-lg'>AED 1,299</span>
                  <span className='badge-preloved px-2 py-1 rounded text-xs font-medium'>
                    Preloved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div>
            <h3 className='text-xl font-semibold mb-6 text-foreground'>
              Typography
            </h3>
            <div className='space-y-4'>
              <h1 className='text-4xl font-bold text-foreground'>
                Heading 1 - Hero Title
              </h1>
              <h2 className='text-3xl font-bold text-foreground'>
                Heading 2 - Section Title
              </h2>
              <h3 className='text-2xl font-semibold text-foreground'>
                Heading 3 - Subsection
              </h3>
              <h4 className='text-xl font-semibold text-foreground'>
                Heading 4 - Product Title
              </h4>
              <p className='text-base text-foreground'>
                Body text - Product descriptions and general content
              </p>
              <p className='text-sm text-muted-foreground'>
                Small text - Additional details and metadata
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-foreground text-background py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p>&copy; 2024 MyBike.ae - Your Premium Bicycle Destination</p>
        </div>
      </footer>
    </div>
  );
}
