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
  }
  
  const ModelViewer: React.FC<ModelViewerProps>;
  export default ModelViewer;
}

declare module '*/YoutubeEmbed' {
  export interface YoutubeEmbedProps {
    videoId: string;
    className?: string;
  }
  
  const YoutubeEmbed: React.FC<YoutubeEmbedProps>;
  export default YoutubeEmbed;
}

declare module '*/VimeoEmbed' {
  export interface VimeoEmbedProps {
    videoId: string;
    className?: string;
  }
  
  const VimeoEmbed: React.FC<VimeoEmbedProps>;
  export default VimeoEmbed;
}
