import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { href: '/bikes', label: 'Bikes' },
        { href: '/accessories', label: 'Accessories' },
        { href: '/parts', label: 'Parts' },
        { href: '/sale', label: 'Sale' },
      ],
    },
    {
      title: 'Services',
      links: [
        { href: '/services/bike-fitting', label: 'Bike Fitting' },
        { href: '/services/repair', label: 'Repair Service' },
        { href: '/services/rental', label: 'Bike Rental' },
        { href: '/services/maintenance', label: 'Maintenance' },
      ],
    },
    {
      title: 'Support',
      links: [
        { href: '/contact', label: 'Contact Us' },
        { href: '/faq', label: 'FAQ' },
        { href: '/returns', label: 'Returns & Exchanges' },
        { href: '/warranty', label: 'Warranty' },
        { href: '/size-guide', label: 'Size Guide' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/blog', label: 'Blog' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press' },
        { href: '/sustainability', label: 'Sustainability' },
      ],
    },
  ];

  const socialLinks = [
    {
      href: 'https://facebook.com/mybike',
      label: 'Facebook',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      href: 'https://instagram.com/mybike',
      label: 'Instagram',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.824 3.72 13.673 3.72 12.376c0-1.297.478-2.448 1.406-3.323.928-.875 2.079-1.353 3.323-1.353 1.297 0 2.448.478 3.323 1.353.875.875 1.353 2.026 1.353 3.323 0 1.297-.478 2.448-1.353 3.315-.875.928-2.026 1.297-3.323 1.297z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
    {
      href: 'https://twitter.com/mybike',
      label: 'Twitter',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      href: 'https://youtube.com/mybike',
      label: 'YouTube',
      icon: (
        <svg
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 24 24'
          aria-hidden='true'
        >
          <path
            fillRule='evenodd'
            d='M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z'
            clipRule='evenodd'
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>MB</span>
              </div>
              <span className='text-xl font-bold'>MyBike</span>
            </Link>
            <p className='text-gray-400 mb-6 max-w-md'>
              Your premier destination for quality bicycles, expert services,
              and cycling accessories. Helping riders of all levels find their
              perfect ride since 2010.
            </p>

            {/* Contact Info */}
            <div className='space-y-2 text-sm text-gray-400'>
              <p>📍 123 Cycling Street, Bike City, BC 12345</p>
              <p>📞 +1 (555) 123-BIKE</p>
              <p>✉️ hello@mybike.com</p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className='text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-400 hover:text-white transition-colors text-sm'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
            <div className='mb-4 lg:mb-0'>
              <h3 className='text-lg font-semibold mb-2'>Stay in the Loop</h3>
              <p className='text-gray-400 text-sm'>
                Get the latest cycling news, product updates, and exclusive
                offers.
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-2 max-w-md'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              />
              <button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors'>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className='border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between'>
          <div className='flex items-center space-x-6 mb-4 sm:mb-0'>
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                className='text-gray-400 hover:text-white transition-colors'
                aria-label={social.label}
                target='_blank'
                rel='noopener noreferrer'
              >
                {social.icon}
              </Link>
            ))}
          </div>
          <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400'>
            <span>&copy; {currentYear} MyBike. All rights reserved.</span>
            <div className='flex space-x-4'>
              <Link
                href='/privacy'
                className='hover:text-white transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='hover:text-white transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
