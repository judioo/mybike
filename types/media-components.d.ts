// Type declarations for media components

declare module '*/VideoPlayer' {
  export interface VideoPlayerProps {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
  }
  
  const VideoPlayer: React.FC<VideoPlayerProps>;
  export default VideoPlayer;
}

declare module '*/ModelViewer' {
  export interface ModelViewerProps {
    src: string;
    alt?: string;
    className?: string;
    poster?: string;
    autoRotate?: boolean;
    cameraControls?: boolean;
    environmentImage?: string;
    exposure?: number;
    arEnabled?: boolean;
  }
  
  const ModelViewer: React.FC<ModelViewerProps>;
  export default ModelViewer;
}

declare module '*/YoutubeEmbed' {
  export interface YoutubeEmbedProps {
    videoId: string;
    className?: string;
    startAt?: number;
    autoplay?: boolean;
  }
  
  const YoutubeEmbed: React.FC<YoutubeEmbedProps>;
  export default YoutubeEmbed;
}

declare module '*/VimeoEmbed' {
  export interface VimeoEmbedProps {
    videoId: string;
    className?: string;
    autoplay?: boolean;
  }
  
  const VimeoEmbed: React.FC<VimeoEmbedProps>;
  export default VimeoEmbed;
}

declare module '*/SketchfabEmbed' {
  export interface SketchfabEmbedProps {
    modelId: string;
    className?: string;
    autoRotate?: boolean;
  }
  
  const SketchfabEmbed: React.FC<SketchfabEmbedProps>;
  export default SketchfabEmbed;
}

declare module '*/PanoramaViewer' {
  export interface PanoramaViewerProps {
    src: string;
    className?: string;
    alt?: string;
  }
  
  const PanoramaViewer: React.FC<PanoramaViewerProps>;
  export default PanoramaViewer;
}
