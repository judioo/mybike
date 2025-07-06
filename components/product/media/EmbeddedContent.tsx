import React from 'react';

interface EmbeddedContentProps {
  html: string;
  className?: string;
  alt?: string;
}

export default function EmbeddedContent({
  html,
  className = '',
  alt = 'Embedded content',
}: EmbeddedContentProps) {
  return (
    <div 
      className={`embedded-content ${className}`}
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
