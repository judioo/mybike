import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'fullwidth' | 'contained';
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout = ({
  children,
  className = '',
  variant = 'default',
  showHeader = true,
  showFooter = true,
}: LayoutProps) => {
  const getMainClasses = () => {
    const baseClasses = 'flex-1';

    switch (variant) {
      case 'fullwidth':
        return `${baseClasses} w-full`;
      case 'contained':
        return `${baseClasses} max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {showHeader && <Header />}

      <main className={`${getMainClasses()} ${className}`}>{children}</main>

      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
