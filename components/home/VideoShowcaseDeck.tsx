"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play } from "lucide-react";

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

  // Play active centre video
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

  // Execute smooth shuffle transition
  const handleShuffle = useCallback(
    (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentIndex) return;

      setIsTransitioning(true);

      if (videoRef.current) {
        videoRef.current.pause();
      }

      const duration = isReducedMotion ? 50 : 700;

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

  // Centre video ends -> auto shuffle
  const handleVideoEnded = () => {
    handleNext();
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setAutoplayBlocked(false);
    }
  };

  // Compute inline transforms for precise positioning
  const getCardTransform = (position: "centre" | "left" | "right") => {
    switch (position) {
      case "centre":
        return {
          transform: "translateX(0) scale(1) rotate(0deg)",
          opacity: 1,
          zIndex: 30,
          filter: "brightness(1)",
        };
      case "left":
        return {
          transform: "translateX(-62%) scale(0.78) rotate(-6deg)",
          opacity: 0.6,
          zIndex: 15,
          filter: "brightness(0.7) blur(1px)",
        };
      case "right":
        return {
          transform: "translateX(62%) scale(0.78) rotate(6deg)",
          opacity: 0.6,
          zIndex: 15,
          filter: "brightness(0.7) blur(1px)",
        };
    }
  };

  return (
    <div
      ref={containerRef}
      aria-label="E-commerce Vertical Video Showcase Deck"
      className="relative w-full"
    >
      {/* Atmospheric glow behind the deck */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-br from-purple-500/20 via-indigo-400/15 to-blue-500/20 blur-3xl" />
      </div>

      {/* Deck Stage */}
      <div
        className="relative w-full flex items-center justify-center mx-auto"
        style={{ height: "clamp(380px, 50vw, 520px)", perspective: "1200px" }}
      >
        {ecommerceVideos.map((item, index) => {
          const diff = (index - currentIndex + ecommerceVideos.length) % ecommerceVideos.length;
          let position: "centre" | "right" | "left" = "centre";
          if (diff === 1) position = "right";
          if (diff === 2) position = "left";

          const isCentre = position === "centre";
          const styles = getCardTransform(position);

          return (
            <div
              key={item.id}
              onClick={!isCentre && !isTransitioning ? () => handleShuffle(index) : undefined}
              aria-hidden={!isCentre}
              style={{
                zIndex: styles.zIndex,
                transform: styles.transform,
                opacity: styles.opacity,
                filter: styles.filter,
                transition: isReducedMotion
                  ? "none"
                  : "transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 700ms ease, filter 700ms ease",
              }}
              className={`absolute rounded-[28px] overflow-hidden transform-gpu ${
                isCentre
                  ? "shadow-[0_20px_60px_-12px_rgba(124,58,237,0.35),0_8px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-white/20"
                  : "shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] cursor-pointer hover:opacity-70"
              }`}
              /* Responsive card sizing using clamp */
              /* Mobile: ~160px wide, Desktop: up to 220px wide */
            >
              {/* Phone frame shell */}
              <div
                className="relative bg-slate-950 overflow-hidden rounded-[28px]"
                style={{
                  width: "clamp(160px, 18vw, 220px)",
                  aspectRatio: "9 / 16",
                }}
              >
                {/* Subtle phone notch */}
                {isCentre && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-16 h-[5px] rounded-full bg-black/60 backdrop-blur-sm" />
                )}

                {/* Video content */}
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
                      className="w-full h-full object-cover block"
                    />

                    {/* Autoplay blocked overlay */}
                    {autoplayBlocked && (
                      <button
                        type="button"
                        onClick={handleManualPlay}
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center group focus:outline-none"
                        aria-label="Play video demonstration"
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/30 group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 ml-0.5 fill-white" />
                        </div>
                      </button>
                    )}

                    {/* Bottom gradient fade for polish */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <video
                    src={item.videoUrl}
                    playsInline
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover block"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle progress dots at the bottom */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {ecommerceVideos.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleShuffle(idx)}
            className={`rounded-full transition-all duration-500 min-h-[44px] flex items-center justify-center ${
              currentIndex === idx
                ? "w-8 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-sm shadow-purple-500/30"
                : "w-2 h-2 bg-slate-300/80 hover:bg-slate-400"
            }`}
            aria-label={`Go to video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
