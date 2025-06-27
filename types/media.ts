// Media types for rich media components

export interface MediaItem {
  type: 'image' | 'video' | '3d' | 'gltf' | 'youtube' | 'vimeo' | 'sketchfab' | 'panorama';
  src?: string;
  id?: string;
  alt?: string;
  width?: number;
  height?: number;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
  startAt?: number;
  autoRotate?: boolean;
  cameraControls?: boolean;
  environmentImage?: string;
  exposure?: number;
  arEnabled?: boolean;
  modelId?: string; // For Sketchfab
}
