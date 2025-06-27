import React from 'react';

interface YoutubeEmbedProps {
  videoId: string;
  className?: string;
  autoplay?: boolean;
  start?: number;
}

export default function YoutubeEmbed({
  videoId,
  className = '',
  autoplay = false,
  start,
}: YoutubeEmbedProps) {
  if (!videoId) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Invalid YouTube video ID</p>
      </div>
    );
  }

  // Build URL with parameters
  let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  
  if (autoplay) embedUrl += '&autoplay=1';
  if (start) embedUrl += `&start=${start}`;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
}
