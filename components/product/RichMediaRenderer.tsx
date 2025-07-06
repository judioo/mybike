/// <reference path="../../types/media-components.d.ts" />
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { MediaItem } from '@/types/media';

interface RichMediaProps {
  media: MediaItem;
  className?: string;
  templateSuffix?: string;
}

// Type definitions for dynamic imports
interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

interface ModelViewerProps {
  src: string;
  alt?: string;
  poster?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  environmentImage?: string;
  exposure?: number;
  arEnabled?: boolean;
  className?: string;
}

interface YoutubeEmbedProps {
  videoId: string;
  startAt?: number;
  autoplay?: boolean;
  className?: string;
}

interface VimeoEmbedProps {
  videoId: string;
  autoplay?: boolean;
  className?: string;
}

interface SketchfabEmbedProps {
  modelId: string;
  autoRotate?: boolean;
  className?: string;
}

interface PanoramaViewerProps {
  src: string;
  alt?: string;
  className?: string;
}

interface EmbeddedContentProps {
  html: string;
  alt?: string;
  className?: string;
}

// MediaPlaceholder component for loading states
function MediaPlaceholder({ type }: { type: string }) {
  const getPlaceholderText = () => {
    switch (type) {
      case 'video':
        return 'Loading video...';
      case '3d':
      case 'gltf':
        return 'Loading 3D model...';
      case 'youtube':
        return 'Loading YouTube video...';
      case 'vimeo':
        return 'Loading Vimeo video...';
      case 'sketchfab':
        return 'Loading 3D model from Sketchfab...';
      case 'panorama':
        return 'Loading 360° panorama...';
      case 'embedded':
        return 'Loading embedded content...';
      default:
        return 'Loading media...';
    }
  };

  return (
    <div className="bg-gray-100 animate-pulse flex items-center justify-center h-64">
      <p className="text-gray-500">{getPlaceholderText()}</p>
    </div>
  );
}

// Dynamically import media components with Next.js dynamic imports
const VideoPlayer = dynamic<VideoPlayerProps>(() => import('./media/VideoPlayer').then(mod => mod.default), {
  loading: () => <MediaPlaceholder type="video" />,
  ssr: false
});

const ModelViewer = dynamic<ModelViewerProps>(() => import('./media/ModelViewer').then(mod => mod.default), {
  loading: () => <MediaPlaceholder type="3d" />,
  ssr: false
});

const YoutubeEmbed = dynamic<YoutubeEmbedProps>(() => import('./media/YoutubeEmbed').then(mod => mod.default), {
  loading: () => <MediaPlaceholder type="youtube" />,
  ssr: false
});

const VimeoEmbed = dynamic<VimeoEmbedProps>(() => import('./media/VimeoEmbed').then(mod => mod.default), {
  loading: () => <MediaPlaceholder type="vimeo" />,
  ssr: false
});

const SketchfabEmbed = dynamic<SketchfabEmbedProps>(
  () => import('./media/SketchfabEmbed').then(mod => mod.default),
  {
    loading: () => <MediaPlaceholder type="sketchfab" />,
    ssr: false
  }
);

const PanoramaViewer = dynamic<PanoramaViewerProps>(
  () => import('./media/PanoramaViewer').then(mod => mod.default),
  {
    loading: () => <MediaPlaceholder type="panorama" />,
    ssr: false
  }
);

const EmbeddedContent = dynamic<EmbeddedContentProps>(
  () => import('./media/EmbeddedContent').then(mod => mod.default),
  {
    loading: () => <MediaPlaceholder type="embedded" />,
    ssr: false
  }
);

export default function RichMediaRenderer({ media, className = '', templateSuffix = '' }: RichMediaProps) {
  // Apply template-specific styling
  const getTemplateSpecificClass = () => {
    switch (templateSuffix) {
      case 'bike':
      case 'bicycle':
      case 'mountain-bike':
      case 'road-bike':
      case 'gravel-bike':
      case 'e-bike':
        return 'bike-template-media';
      case 'accessory':
      case 'component':
      case 'part':
      case 'parts':
        return 'accessory-template-media';
      case 'preloved':
      case 'used':
      case 'second-hand':
      case 'refurbished':
        return 'preloved-template-media';
      case 'service':
      case 'repair':
      case 'maintenance':
      case 'fitting':
        return 'service-template-media';
      default:
        return '';
    }
  };

  const combinedClassName = `${className} ${getTemplateSpecificClass()}`;
  const fallback = <MediaPlaceholder type={media.type} />;

  // Render the appropriate media type
  switch (media.type) {
    case 'image':
      return (
        <div className={`relative overflow-hidden ${combinedClassName}`}>
          <Image
            src={media.src || ''}
            alt={media.alt || 'Product media'}
            width={800}
            height={600}
            className="object-contain w-full h-full"
            priority={true}
          />
        </div>
      );

    case 'video':
      return (
        <Suspense fallback={fallback}>
          <VideoPlayer
            src={media.src || ''}
            poster={media.poster}
            autoplay={media.autoplay}
            loop={media.loop}
            muted={media.muted}
            controls={media.controls !== false}
            className={combinedClassName}
          />
        </Suspense>
      );

    case '3d':
    case 'gltf':
      return (
        <Suspense fallback={fallback}>
          <ModelViewer
            src={media.src || ''}
            alt={media.alt || 'Product 3D model'}
            poster={media.poster}
            autoRotate={media.autoRotate !== false}
            cameraControls={media.cameraControls !== false}
            environmentImage={media.environmentImage}
            exposure={media.exposure}
            arEnabled={media.arEnabled}
            className={combinedClassName}
          />
        </Suspense>
      );

    case 'sketchfab':
      return (
        <Suspense fallback={fallback}>
          <SketchfabEmbed
            modelId={media.id || ''}
            autoRotate={media.autoRotate}
            className={combinedClassName}
          />
        </Suspense>
      );

    case 'panorama':
      return (
        <Suspense fallback={fallback}>
          <PanoramaViewer
            src={media.src || ''}
            alt={media.alt || 'Product panorama view'}
            className={combinedClassName}
          />
        </Suspense>
      );

    case 'youtube':
      return (
        <Suspense fallback={fallback}>
          <YoutubeEmbed
            videoId={media.id || ''}
            startAt={media.startAt}
            autoplay={media.autoplay}
            className={combinedClassName}
          />
        </Suspense>
      );

    case 'vimeo':
      return (
        <Suspense fallback={fallback}>
          <VimeoEmbed
            videoId={media.id || ''}
            autoplay={media.autoplay}
            className={combinedClassName}
          />
        </Suspense>
      );

    case 'embedded':
      return (
        <Suspense fallback={fallback}>
          <EmbeddedContent
            html={media.html || ''}
            alt={media.alt}
            className={combinedClassName}
          />
        </Suspense>
      );

    default:
      return fallback;
  }
}
