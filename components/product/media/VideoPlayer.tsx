import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  autoplay = false,
  loop = false,
  muted = true,
  controls = true,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Handle IntersectionObserver for lazy loading
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && autoplay) {
            videoRef.current?.play().catch(() => {
              // Autoplay might be blocked by browser policy
              console.log('Video autoplay prevented by browser');
            });
          } else if (!entry.isIntersecting && autoplay) {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [autoplay]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline
        className="w-full h-full object-contain"
        preload="metadata"
      />
    </div>
  );
}
