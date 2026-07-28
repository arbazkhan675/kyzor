"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface Props {
  src: string;
  title: string;
  badgeText?: string;
}

export function WorkVideoPlayer({ src, title, badgeText = "Kyzor Showcase" }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldAutoPlay(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setShouldAutoPlay(!e.matches);
      if (e.matches && videoRef.current) {
        videoRef.current.pause();
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Pause video when outside the viewport cleanly
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting && !mediaQuery.matches) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay restrictions or interruptions
            });
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xs"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={shouldAutoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${title} video demonstration`}
        className="w-full h-full object-contain block rounded-2xl"
      />

      {/* Top Badge Overlay */}
      {badgeText && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-semibold border border-white/20 shadow-xs">
            <Sparkles className="h-3 w-3 text-purple-400" />
            {badgeText}
          </span>
        </div>
      )}
    </div>
  );
}
