// Media types for rich media components

export interface MediaItem {
  type: '3d' | 'image' | 'video' | 'gltf' | 'youtube' | 'vimeo' | 'sketchfab' | 'panorama' | 'embedded';
  src?: string;
  id?: string;
  alt?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  autoRotate?: boolean;
  cameraControls?: boolean;
  environmentImage?: string;
  exposure?: number;
  arEnabled?: boolean;
  startAt?: number;
  html?: string; // For embedded HTML content
  modelId?: string; // For Sketchfab
}
