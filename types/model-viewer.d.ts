// Type definitions for @google/model-viewer
// Project: https://github.com/google/model-viewer

import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes;
    }
  }
}

interface ModelViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  poster?: string;
  loading?: 'auto' | 'lazy' | 'eager';
  reveal?: 'auto' | 'interaction' | 'manual';
  'camera-controls'?: boolean;
  'auto-rotate'?: boolean;
  'ar'?: boolean;
  'ar-modes'?: string;
  'ar-scale'?: 'auto' | 'fixed';
  'ar-placement'?: 'floor' | 'wall';
  'ios-src'?: string;
  'shadow-intensity'?: string | number;
  'environment-image'?: string;
  exposure?: string | number;
  'camera-orbit'?: string;
  'camera-target'?: string;
  'field-of-view'?: string;
  'max-camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-field-of-view'?: string;
  'min-field-of-view'?: string;
  bounds?: string;
  'skybox-image'?: string;
  'animation-name'?: string;
  'animation-crossfade-duration'?: string | number;
  'interaction-prompt'?: 'auto' | 'when-focused' | 'none';
  'interaction-prompt-style'?: 'basic' | 'wiggle';
  'interaction-prompt-threshold'?: string | number;
  'touch-action'?: string;
  'disable-zoom'?: boolean;
  'disable-pan'?: boolean;
  'disable-tap'?: boolean;
  'orbit-sensitivity'?: string | number;
  'interpolation-decay'?: string | number;
  'ar-status'?: string;
  'ar-tracking'?: string;
  'ios-src'?: string;
  'quick-look-browsers'?: string;
  'min-height'?: string;
  'min-width'?: string;
  'max-height'?: string;
  'max-width'?: string;
  'autoplay'?: boolean;
  style?: React.CSSProperties;
}

declare module '@google/model-viewer' {
  export class ModelViewerElement extends HTMLElement {
    static get observedAttributes(): string[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
  }
}
