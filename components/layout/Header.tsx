'use client';

import Link from 'next/link';
import { useCartStore, useUIStore } from '@/lib/stores';
import { useState } from 'react';

const Header = () => {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);
  const openCart = useCartStore((state) => state.openCart);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
    { href: '/contact', label: 'CONTACT US' },
    { href: '/brands', label: 'BRANDS' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className='announcement-bar'>
        Enjoy free shipping across UAE on all orders over 500 AED—fast, reliable, and hassle-free! 🚚✨
      </div>
      
      <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
          {/* Logo/Brand */}
          <Link
            href='/'
            className='flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors'
            aria-label='MyBike Home'
          >
            <div className='h-10'>
              <span className='text-primary font-bold text-2xl tracking-tight'>MYBIKE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='hidden md:flex items-center space-x-8'
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
                  className='text-gray-900 hover:text-secondary font-medium transition-colors py-8 px-2 tracking-wide'
                >
                  {link.label}
                </Link>
                
                {/* Mega Menu */}
                {link.megaMenu && activeMenu === link.label && (
                  <div className='mega-menu'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-6 gap-8'>
                      <div className='col-span-4'>
                        <div className='grid grid-cols-3 gap-8'>
                          {link.categories?.map((category) => (
                            <div key={category.href}>
                              <Link 
                                href={category.href}
                                className='text-base font-medium text-gray-900 hover:text-secondary'
                              >
                                {category.title}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className='col-span-2 bg-gray-100 p-6 rounded'>
                        <h3 className='text-lg font-medium text-gray-900 mb-4'>Featured</h3>
                        <div className='aspect-w-16 aspect-h-9 bg-gray-300 mb-4 rounded'></div>
                        <p className='text-sm text-gray-600'>Discover our latest collection of premium bikes and accessories.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Actions */}
          <div className='flex items-center space-x-6'>
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
              aria-label={`Shopping cart (${cartItemCount} items)`}
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
              {cartItemCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-secondary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className='md:hidden p-2 text-gray-500 hover:text-blue-600 transition-colors'
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
          <div className='md:hidden border-t border-gray-200 py-4'>
            <nav
              className='flex flex-col space-y-4'
              aria-label='Mobile navigation'
            >
              {navigationLinks.map((link) => (
                <div key={link.href} className='flex flex-col'>
                  <Link
                    href={link.href}
                    className='px-3 py-2 text-gray-900 font-medium hover:text-secondary transition-colors'
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                  
                  {/* Mobile submenu categories */}
                  {link.megaMenu && (
                    <div className='pl-6 mt-2 space-y-2'>
                      {link.categories?.map((category) => (
                        <Link
                          key={category.href}
                          href={category.href}
                          className='block px-3 py-1 text-sm text-gray-700 hover:text-secondary'
                          onClick={closeMobileMenu}
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  
  );
};

export default Header;
