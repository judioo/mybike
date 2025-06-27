'use client';

// This is a wrapper component for react-image-gallery to handle ESM import issues
import React from 'react';
// We'll import the CSS directly here
import 'react-image-gallery/styles/css/image-gallery.css';

// Define the props interface based on what we need from react-image-gallery
interface ImageGalleryProps {
  items: Array<{
    original: string;
    thumbnail?: string;
    originalAlt?: string;
    thumbnailAlt?: string;
    originalTitle?: string;
    thumbnailTitle?: string;
    originalClass?: string;
    thumbnailClass?: string;
  }>;
  showThumbnails?: boolean;
  showFullscreenButton?: boolean;
  showPlayButton?: boolean;
  showNav?: boolean;
  thumbnailPosition?: 'top' | 'bottom' | 'left' | 'right';
  useBrowserFullscreen?: boolean;
  lazyLoad?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onImageLoad?: (event: React.SyntheticEvent) => void;
  onSlide?: (currentIndex: number) => void;
  onPause?: (currentIndex: number) => void;
  onPlay?: (currentIndex: number) => void;
  onThumbnailClick?: (event: React.MouseEvent, index: number) => void;
  onThumbnailError?: (event: React.SyntheticEvent) => void;
  onImageError?: (event: React.SyntheticEvent) => void;
  onTouchMove?: (event: React.TouchEvent) => void;
  onTouchEnd?: (event: React.TouchEvent) => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  additionalClass?: string;
  slideInterval?: number;
  slideOnThumbnailOver?: boolean;
  startIndex?: number;
  swipeThreshold?: number;
  swipingTransitionDuration?: number;
  infinite?: boolean;
  disableThumbnailScroll?: boolean;
  disableKeyDown?: boolean;
  disableSwipe?: boolean;
  disableThumbnailSwipe?: boolean;
  renderCustomControls?: () => React.ReactNode;
  renderLeftNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
  renderRightNav?: (onClick: () => void, disabled: boolean) => React.ReactNode;
  renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => React.ReactNode;
  renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => React.ReactNode;
  renderItem?: (item: any) => React.ReactNode;
  renderThumbInner?: (item: any) => React.ReactNode;
  stopPropagation?: boolean;
  indexSeparator?: string;
  slideDuration?: number;
  swipingThumbnailTransitionDuration?: number;
  useTranslate3D?: boolean;
  isRTL?: boolean;
}

// Create a wrapper component that dynamically imports react-image-gallery
const ImageGalleryWrapper: React.FC<ImageGalleryProps> = (props) => {
  const [ImageGalleryComponent, setImageGalleryComponent] = React.useState<any>(null);

  React.useEffect(() => {
    // Import the library dynamically on the client side
    import('react-image-gallery').then((module) => {
      setImageGalleryComponent(() => module.default || module);
    });
  }, []);

  // Show a loading spinner while the component is loading
  if (!ImageGalleryComponent) {
    return (
      <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  // Render the actual gallery once loaded
  return <ImageGalleryComponent {...props} />;
};

export default ImageGalleryWrapper;
