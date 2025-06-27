'use client';

import Link from 'next/link';
import { useCartStore, useUIStore } from '@/lib/stores';

const Header = () => {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);
  const openCart = useCartStore((state) => state.openCart);

  const navigationLinks = [
    { href: '/bikes', label: 'Bikes' },
    { href: '/accessories', label: 'Accessories' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <Link
            href='/'
            className='flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
            aria-label='MyBike Home'
          >
            <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>MB</span>
            </div>
            <span>MyBike</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className='hidden md:flex items-center space-x-8'
            aria-label='Main navigation'
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-gray-700 hover:text-blue-600 font-medium transition-colors'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className='flex items-center space-x-4'>
            {/* Search Icon */}
            <button
              className='p-2 text-gray-500 hover:text-blue-600 transition-colors'
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
              className='p-2 text-gray-500 hover:text-blue-600 transition-colors'
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
              className='relative p-2 text-gray-500 hover:text-blue-600 transition-colors'
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
                <span className='absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
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
          <div className='md:hidden border-t border-gray-200 py-2'>
            <nav
              className='flex flex-col space-y-2'
              aria-label='Mobile navigation'
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors'
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
