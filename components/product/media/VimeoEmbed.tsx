import React from 'react';

interface VimeoEmbedProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  title?: boolean;
  byline?: boolean;
  portrait?: boolean;
}

export default function VimeoEmbed({
  videoId,
  className = '',
  autoplay = false,
  loop = false,
  title = true,
  byline = true,
  portrait = true,
}: VimeoEmbedProps) {
  if (!videoId) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Invalid Vimeo video ID</p>
      </div>
    );
  }

  // Build URL with parameters
  let embedUrl = `https://player.vimeo.com/video/${videoId}?`;
  
  const params = [
    autoplay ? 'autoplay=1' : '',
    loop ? 'loop=1' : '',
    !title ? 'title=0' : '',
    !byline ? 'byline=0' : '',
    !portrait ? 'portrait=0' : '',
  ].filter(Boolean).join('&');
  
  embedUrl += params;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title="Vimeo video player"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
}
