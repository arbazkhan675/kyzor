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
      className="my-4 py-4 px-2 sm:px-6 max-w-full overflow-hidden"
    >
      {/* 3 Vertical Mobile-Style Video Cards Deck Stage with Generous Margins */}
      <div className="relative w-full max-w-[520px] h-[390px] sm:h-[450px] flex items-center justify-center mx-auto overflow-hidden">
        {ecommerceVideos.map((item, index) => {
          const diff = (index - currentIndex + ecommerceVideos.length) % ecommerceVideos.length;
          let position: "centre" | "right" | "left" = "centre";
          if (diff === 1) position = "right";
          if (diff === 2) position = "left";

          const isCentre = position === "centre";
          const isRight = position === "right";
          const isLeft = position === "left";

          let transformStyle = "";
          let zIndex = 10;

          if (isCentre) {
            transformStyle = "translate3d(0, 0, 0) scale(1) rotate(0deg) opacity-100 shadow-2xl border-slate-700/90";
            zIndex = 30;
          } else if (isRight) {
            transformStyle = "translate3d(90px, 0, 0) sm:translate-3d(120px, 0, 0) scale-[0.83] rotate(3.5deg) opacity-80 shadow-lg border-slate-800 hover:opacity-95 cursor-pointer";
            zIndex = 15;
          } else if (isLeft) {
            transformStyle = "translate3d(-90px, 0, 0) sm:translate-3d(-120px, 0, 0) scale-[0.83] rotate(-3.5deg) opacity-80 shadow-lg border-slate-800 hover:opacity-95 cursor-pointer";
            zIndex = 15;
          }

          return (
            <div
              key={item.id}
              onClick={!isCentre && !isTransitioning ? () => handleShuffle(index) : undefined}
              aria-hidden={!isCentre}
              style={{ zIndex }}
              className={`absolute w-[195px] sm:w-[235px] aspect-[9/16] rounded-[32px] border-2 bg-slate-950 overflow-hidden transition-all duration-700 ease-out transform-gpu flex items-center justify-center ${transformStyle}`}
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
                      className="w-full h-full object-cover block rounded-[30px]"
                    />

                    {/* Autoplay blocked manual play button overlay */}
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
                    className="w-full h-full object-cover block opacity-80 rounded-[30px]"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
