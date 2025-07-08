'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useUIStore } from '@/lib/stores';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);
  const openCart = useCartStore((state) => state.openCart);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Prevent hydration mismatch by only showing cart count after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMenuHover = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };
  
  const navigationLinks = [
    { 
      href: '/bikes', 
      label: 'SHOP', 
      megaMenu: true,
      categories: [
        { title: 'Road Bikes & Framesets', href: '/bikes/road' },
        { title: 'Mountain Bikes & Framesets', href: '/bikes/mountain' },
        { title: 'Gravel Bikes & Framesets', href: '/bikes/gravel' },
        { title: 'Triathlon & TT Bikes', href: '/bikes/triathlon' },
        { title: 'Kids & Junior Bikes', href: '/bikes/kids' },
        { title: 'E-Bikes Collection', href: '/bikes/electric' },
      ]
    },
    { 
      href: '/explore', 
      label: 'EXPLORE',
      megaMenu: true,
      categories: [
        { title: 'New Arrivals', href: '/explore/new-arrivals' },
        { title: 'Preloved Bikes', href: '/explore/preloved' },
        { title: 'Clothing', href: '/explore/clothing' },
        { title: 'Indoor Trainers', href: '/explore/trainers' },
        { title: 'Nutrition', href: '/explore/nutrition' },
      ]
    },
    { href: '/in-store', label: 'IN-STORE' },
    { href: '/brands', label: 'BRANDS' },
    { href: '/racing-team', label: 'RACING TEAM' },
    { href: '/performance-center', label: 'PERFORMANCE' },
    { href: '/rental-bikes', label: 'RENTALS' },
    { href: '/rewards', label: 'REWARDS' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className='announcement-bar'>
        <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-center md:justify-between'>
          <p className='text-sm md:text-base font-medium tracking-wide'>Enjoy free shipping across UAE on all orders over 500 AED—fast, reliable, and hassle-free! 🚚✨</p>
          <div className='hidden md:flex items-center space-x-6'>
            <Link href='/find-store' className='text-sm hover:underline'>Store Locator</Link>
            <Link href='/support' className='text-sm hover:underline'>Support</Link>
            <Link href='/contact' className='text-sm hover:underline'>Contact Us</Link>
            <Link href='/en' className='text-sm hover:underline flex items-center'>
              <span className='mr-1'>EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </Link>
          </div>
        </div>
      </div>
      
      <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16'>
          <div className='flex items-center justify-between h-24'>
          {/* Logo/Brand */}
          <Link
            href='/'
            className='flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors'
            aria-label='MyBike Home'
          >
            <div className='h-12'>
              <Image 
                src="/images/logo-black-new.svg" 
                alt="MyBike Logo - Premium cycling brand" 
                width={130} 
                height={44} 
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='hidden lg:flex items-center space-x-3 xl:space-x-5 2xl:space-x-8'
            aria-label='Main navigation'
          >
            {navigationLinks.map((link) => (
              <div 
                key={link.href}
                className='relative nav-item'
                onMouseEnter={() => link.megaMenu && handleMenuHover(link.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={link.href}
                  className='text-gray-900 hover:text-secondary font-medium transition-colors py-8 px-1 tracking-wider text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm uppercase'
                >
                  {link.label}
                </Link>
                
                {/* Mega Menu */}
                {link.megaMenu && activeMenu === link.label && (
                  <div className='mega-menu'>
                    <div className='max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-8'>
                      <div className='grid grid-cols-6 gap-12'>
                        <div className='col-span-4'>
                          <h3 className='text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider'>Categories</h3>
                          <div className='grid grid-cols-3 gap-x-12 gap-y-6'>
                            {link.categories?.map((category) => (
                              <div key={category.href} className='border-b border-gray-100 pb-2'>
                                <Link 
                                  href={category.href}
                                  className='text-base font-medium text-gray-900 hover:text-secondary transition-colors'
                                >
                                  {category.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='col-span-2'>
                          <h3 className='text-lg font-medium text-gray-900 mb-6 uppercase tracking-wider'>Featured</h3>
                          <div className='relative aspect-[16/10] bg-gray-100 mb-4 overflow-hidden'>
                            <Image 
                              src="/images/categories/road-bikes.jpg"
                              alt="Featured category"
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <p className='text-sm text-gray-600 mb-3'>Discover our latest collection of premium bikes and accessories.</p>
                          <Link 
                            href="/explore/new-arrivals"
                            className='text-secondary hover:underline text-sm font-medium'
                          >
                            Shop New Arrivals
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className='flex items-center space-x-8'>
            {/* Search Icon */}
            <button
              className='p-2 text-gray-900 hover:text-secondary transition-colors'
              aria-label='Search'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <Link
              href='/wishlist'
              className='p-2 text-gray-900 hover:text-secondary transition-colors'
              aria-label='Wishlist'
            >
              <svg 
                className='w-5 h-5' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
              >
                <path 
                  strokeLinecap='round' 
                  strokeLinejoin='round' 
                  strokeWidth={2} 
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
            </Link>

            {/* Account Icon */}
            <Link
              href='/account'
              className='p-2 text-gray-900 hover:text-secondary transition-colors'
              aria-label='Account'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
            </Link>

            {/* Cart Icon with Badge */}
            <button
              onClick={openCart}
              className='relative p-2 text-gray-900 hover:text-secondary transition-colors'
              aria-label={`Shopping cart (${isClient ? cartItemCount : 0} items)`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h12'
                />
              </svg>
              {/* Cart item count badge */}
              {isClient && cartItemCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className='lg:hidden p-2 text-gray-500 hover:text-blue-600 transition-colors'
              onClick={toggleMobileMenu}
              aria-label='Toggle mobile menu'
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 py-6 bg-white'>
            <nav
              className='flex flex-col space-y-5 px-6'
              aria-label='Mobile navigation'
            >
              {navigationLinks.map((link) => (
                <div key={link.href} className='flex flex-col'>
                  <Link
                    href={link.href}
                    className='py-2 text-gray-900 font-medium hover:text-secondary transition-colors uppercase tracking-wider text-sm'
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                  
                  {/* Mobile submenu categories */}
                  {link.megaMenu && (
                    <div className='pl-4 mt-3 space-y-3 border-l border-gray-100'>
                      {link.categories?.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className='block py-1 text-sm text-gray-700 hover:text-secondary transition-colors'
                          onClick={closeMobileMenu}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className='pt-4 mt-4 border-t border-gray-100'>
                <Link href='/find-store' className='block py-2 text-sm text-gray-700 hover:text-secondary'>
                  Store Locator
                </Link>
                <Link href='/support' className='block py-2 text-sm text-gray-700 hover:text-secondary'>
                  Support
                </Link>
                <Link href='/wishlist' className='block py-2 text-sm text-gray-700 hover:text-secondary'>
                  Wishlist
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  
  );
};

export default Header;
