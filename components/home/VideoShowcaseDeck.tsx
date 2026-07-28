"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface VideoItem {
  id: string;
  videoUrl: string;
}

const ecommerceVideos: VideoItem[] = [
  { id: "v1", videoUrl: "/video/1.mp4" },
  { id: "v2", videoUrl: "/video/2.mp4" },
  { id: "v3", videoUrl: "/video/3.mp4" },
];

export function VideoShowcaseDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reduced motion detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Handle playing only the active centre video
  const playActiveVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAutoplayBlocked(false);
        })
        .catch(() => {
          setAutoplayBlocked(true);
        });
    }
  }, []);

  useEffect(() => {
    if (!isTransitioning) {
      playActiveVideo();
    }
  }, [currentIndex, isTransitioning, playActiveVideo]);

  // IntersectionObserver & Visibility API listener
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playActiveVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playActiveVideo();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observer && containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [playActiveVideo]);

  // Execute smooth shuffle transition between Left, Centre, and Right positions
  const handleShuffle = useCallback(
    (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentIndex) return;

      setIsTransitioning(true);

      if (videoRef.current) {
        videoRef.current.pause();
      }

      const duration = isReducedMotion ? 50 : 650;

      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setIsTransitioning(false);
      }, duration);
    },
    [currentIndex, isTransitioning, isReducedMotion]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % ecommerceVideos.length;
    handleShuffle(nextIdx);
  }, [currentIndex, handleShuffle]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + ecommerceVideos.length) % ecommerceVideos.length;
    handleShuffle(prevIdx);
  }, [currentIndex, handleShuffle]);

  // Centre video ends -> auto shuffle to next video
  const handleVideoEnded = () => {
    handleNext();
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setAutoplayBlocked(false);
    }
  };

  return (
    <div
      ref={containerRef}
      aria-label="E-commerce Vertical Video Showcase Deck"
      className="space-y-4 max-w-full overflow-hidden"
    >
      {/* 3 Vertical Mobile-Style Video Cards Deck Stage */}
      <div className="relative w-full max-w-[500px] h-[380px] sm:h-[440px] flex items-center justify-center mx-auto overflow-hidden">
        {ecommerceVideos.map((item, index) => {
          // Compute relative card position: 0 = Centre (Front), 1 = Right (Side), 2 = Left (Side)
          const diff = (index - currentIndex + ecommerceVideos.length) % ecommerceVideos.length;
          let position: "centre" | "right" | "left" = "centre";
          if (diff === 1) position = "right";
          if (diff === 2) position = "left";

          const isCentre = position === "centre";
          const isRight = position === "right";
          const isLeft = position === "left";

          // Dynamic 3D transform for Left, Centre, and Right cards
          let transformStyle = "";
          let zIndex = 10;

          if (isCentre) {
            transformStyle = "translate3d(0, 0, 0) scale(1) rotate(0deg) opacity-100 shadow-2xl border-slate-700";
            zIndex = 30;
          } else if (isRight) {
            transformStyle = "translate3d(85px, 0, 0) sm:translate-3d(115px, 0, 0) scale-[0.82] rotate(4deg) opacity-75 shadow-lg border-slate-800 hover:opacity-90 cursor-pointer";
            zIndex = 15;
          } else if (isLeft) {
            transformStyle = "translate3d(-85px, 0, 0) sm:translate-3d(-115px, 0, 0) scale-[0.82] rotate(-4deg) opacity-75 shadow-lg border-slate-800 hover:opacity-90 cursor-pointer";
            zIndex = 15;
          }

          return (
            <div
              key={item.id}
              onClick={!isCentre && !isTransitioning ? () => handleShuffle(index) : undefined}
              aria-hidden={!isCentre}
              style={{ zIndex }}
              className={`absolute w-[190px] sm:w-[230px] aspect-[9/16] rounded-[28px] border-2 bg-slate-950 overflow-hidden transition-all duration-700 ease-out transform-gpu flex items-center justify-center ${transformStyle}`}
            >
              {/* Vertical Mobile Video Viewport */}
              <div className="relative w-full h-full bg-slate-950 flex items-center justify-center overflow-hidden">
                {isCentre ? (
                  <>
                    <video
                      ref={videoRef}
                      src={item.videoUrl}
                      playsInline
                      muted
                      autoPlay
                      preload="metadata"
                      onEnded={handleVideoEnded}
                      className="w-full h-full object-cover block rounded-[26px]"
                    />

                    {/* Manual Play Overlay if Browser Autoplay Blocked */}
                    {autoplayBlocked && (
                      <button
                        type="button"
                        onClick={handleManualPlay}
                        className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center group focus:outline-none"
                        aria-label="Play video demonstration"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 ml-0.5 fill-white" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <video
                    src={item.videoUrl}
                    playsInline
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover block opacity-80 rounded-[26px]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Restrained Manual Controls Below Deck */}
      <div className="flex items-center justify-between max-w-[480px] mx-auto pt-1 px-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-[12px] border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-xs min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-50"
            aria-label="Previous video"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-[12px] border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-xs min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-50"
            aria-label="Next video"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 3 Progress Indicators */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Video deck position">
          {ecommerceVideos.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              onClick={() => handleShuffle(idx)}
              className={`rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center ${
                currentIndex === idx
                  ? "w-7 h-2.5 bg-purple-700"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>

        <span className="text-[11px] font-mono text-slate-500 font-semibold">
          Auto-shuffles on end
        </span>
      </div>
    </div>
  );
}
