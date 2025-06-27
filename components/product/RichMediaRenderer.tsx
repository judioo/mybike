/// <reference path="../../types/media-components.d.ts" />
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Define types for media components
type VideoPlayerProps = {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
};

type ModelViewerProps = {
  src: string;
  alt?: string;
  className?: string;
  poster?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
};

type YoutubeEmbedProps = {
  videoId: string;
  className?: string;
};

type VimeoEmbedProps = {
  videoId: string;
  className?: string;
};

interface RichMediaProps {
  media: {
    type: 'image' | 'video' | '3d' | 'youtube' | 'vimeo';
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    id?: string;
  };
  className?: string;
}

// Dynamically import media components with Next.js dynamic imports
const VideoPlayer = dynamic<VideoPlayerProps>(() => import('./media/VideoPlayer').then(mod => mod.default), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>,
  ssr: false
});

const ModelViewer = dynamic<ModelViewerProps>(() => import('./media/ModelViewer').then(mod => mod.default), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>,
  ssr: false
});

const YoutubeEmbed = dynamic<YoutubeEmbedProps>(() => import('./media/YoutubeEmbed').then(mod => mod.default), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>,
  ssr: false
});

const VimeoEmbed = dynamic<VimeoEmbedProps>(() => import('./media/VimeoEmbed').then(mod => mod.default), {
  loading: () => <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>,
  ssr: false
});

export default function RichMediaRenderer({ media, className = '' }: RichMediaProps) {
  // Fallback component for Suspense
  const fallback = (
    <div className={`bg-gray-100 animate-pulse ${className}`} style={{ aspectRatio: '16/9' }}>
      <div className="flex items-center justify-center h-full">
        <svg className="w-10 h-10 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.75v1.5M17.127 6.873l-1.061 1.061M19.25 12h-1.5M17.127 17.127l-1.061-1.061M12 17.75v1.5M7.934 16.066l-1.061 1.061M6.25 12h-1.5M7.934 7.934L6.873 6.873" />
        </svg>
      </div>
    </div>
  );

  // Render the appropriate media type
  switch (media.type) {
    case 'image':
      return (
        <div className={`relative overflow-hidden ${className}`}>
          <Image
            src={media.src}
            alt={media.alt || 'Product media'}
            width={media.width || 800}
            height={media.height || 600}
            className="object-contain w-full h-full"
            priority={true}
          />
        </div>
      );

    case 'video':
      return (
        <Suspense fallback={fallback}>
          <VideoPlayer
            src={media.src}
            poster={media.poster}
            autoplay={media.autoplay}
            loop={media.loop}
            muted={media.muted}
            controls={media.controls !== false}
            className={className}
          />
        </Suspense>
      );

    case '3d':
      return (
        <Suspense fallback={fallback}>
          <ModelViewer
            src={media.src}
            alt={media.alt || 'Product 3D model'}
            className={className}
          />
        </Suspense>
      );

    case 'youtube':
      return (
        <Suspense fallback={fallback}>
          <YoutubeEmbed
            videoId={media.id || ''}
            className={className}
          />
        </Suspense>
      );

    case 'vimeo':
      return (
        <Suspense fallback={fallback}>
          <VimeoEmbed
            videoId={media.id || ''}
            className={className}
          />
        </Suspense>
      );

    default:
      return (
        <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
          <p className="text-gray-500">Unsupported media type</p>
        </div>
      );
  }
}
