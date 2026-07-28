"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Workflow,
  ShoppingBag,
  Cpu,
  MessageSquare,
  FileText,
  UserPlus,
  Repeat,
  CreditCard,
  Calendar,
} from "lucide-react";

export interface ShowcaseItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  videoUrl?: string;
  tags: string[];
  filename: string;
  fallbackIcon?: any;
}

const ecommerceShowcases: ShowcaseItem[] = [
  {
    id: "ecom-1",
    badge: "Kyzor-built demonstration",
    title: "Custom Fashion Storefront Experience",
    description: "Responsive storefront demonstration featuring product variants, cart interactions and streamlined checkout.",
    videoUrl: "/video/1.mp4",
    tags: ["React Server Components", "Edge Gateway", "Postgres Database"],
    filename: "fashion-storefront.mp4",
    fallbackIcon: ShoppingBag,
  },
  {
    id: "ecom-2",
    badge: "Kyzor-built demonstration",
    title: "Dynamic Product Variant & Inventory Manager",
    description: "Real-time stock reservation and variant selection without plugin latency or theme limitations.",
    videoUrl: "/video/showcase-2.mp4",
    tags: ["Real-time Inventory", "Bespoke Admin", "Zero Plugin Overhead"],
    filename: "inventory-manager.mp4",
    fallbackIcon: ShoppingBag,
  },
  {
    id: "ecom-3",
    badge: "Kyzor-built demonstration",
    title: "High-Speed Edge Payment & Checkout Gateway",
    description: "Streamlined checkout interface with direct payment gateway tokenization and instant order confirmation.",
    videoUrl: "/video/showcase-3.mp4",
    tags: ["Direct Tokenization", "Sub-Second Response", "Encrypted Gateway"],
    filename: "edge-checkout.mp4",
    fallbackIcon: CreditCard,
  },
];

const automationShowcases: ShowcaseItem[] = [
  {
    id: "auto-1",
    badge: "Kyzor-built workflow demonstration",
    title: "WhatsApp Lead Qualification & CRM Workflow",
    description: "Automated inquiry intake, instant WhatsApp qualification, CRM record insertion, and human review.",
    videoUrl: "/video/1.mp4",
    tags: ["Official WhatsApp API", "CRM Integration", "Human Escalation"],
    filename: "whatsapp-qualification.mp4",
    fallbackIcon: MessageSquare,
  },
  {
    id: "auto-2",
    badge: "Kyzor-built workflow demonstration",
    title: "Automated Document Parsing & OCR Pipeline",
    description: "Instant document ingestion, automated OCR data extraction, and verification workflow.",
    videoUrl: "/video/showcase-auto-2.mp4",
    tags: ["OCR Extraction", "Document Ingestion", "Webhook Routing"],
    filename: "document-pipeline.mp4",
    fallbackIcon: FileText,
  },
  {
    id: "auto-3",
    badge: "Kyzor-built workflow demonstration",
    title: "ERP & Inventory Synchronization Engine",
    description: "Bi-directional stock synchronization across backend ERP databases and online commerce storefronts.",
    videoUrl: "/video/showcase-auto-3.mp4",
    tags: ["Bi-Directional Sync", "Postgres Webhooks", "ERP Connector"],
    filename: "erp-sync-engine.mp4",
    fallbackIcon: Repeat,
  },
];

export function VideoShowcaseDeck({ activeTab }: { activeTab: "ecommerce" | "automations" }) {
  const showcases = activeTab === "ecommerce" ? ecommerceShowcases : automationShowcases;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shufflingOutIndex, setShufflingOutIndex] = useState<number | null>(null);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reset deck on service tab switch
  useEffect(() => {
    setCurrentIndex(0);
    setIsTransitioning(false);
    setShufflingOutIndex(null);
    setAutoplayBlocked(false);
  }, [activeTab]);

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

  // Handle active video playback & autoplay resilience
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

  // IntersectionObserver & Visibility API to pause when offscreen / tab hidden
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

  // Execute Shuffle Transition
  const handleShuffle = useCallback(
    (targetIndex: number) => {
      if (isTransitioning || targetIndex === currentIndex) return;

      setIsTransitioning(true);
      setShufflingOutIndex(currentIndex);

      if (videoRef.current) {
        videoRef.current.pause();
      }

      const duration = isReducedMotion ? 50 : 650;

      setTimeout(() => {
        setCurrentIndex(targetIndex);
        setShufflingOutIndex(null);
        setIsTransitioning(false);
      }, duration);
    },
    [currentIndex, isTransitioning, isReducedMotion]
  );

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % showcases.length;
    handleShuffle(nextIdx);
  }, [currentIndex, showcases.length, handleShuffle]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + showcases.length) % showcases.length;
    handleShuffle(prevIdx);
  }, [currentIndex, showcases.length, handleShuffle]);

  // Video ended callback -> automatically shuffle to next card
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
      aria-label={`${activeTab === "ecommerce" ? "E-commerce" : "Automation"} Video Showcase Deck`}
      className="space-y-4 max-w-full overflow-hidden"
    >
      {/* Outer Card Deck Stage with Offset Space */}
      <div className="relative w-full max-w-[540px] preferred-deck-width aspect-[16/10] pr-6 pb-6 sm:pr-7 sm:pb-7 mx-auto lg:mx-0">
        
        {/* Render 3 Overlapping Showcase Cards */}
        {showcases.map((item, index) => {
          // Calculate relative position (0: Front, 1: Middle, 2: Back)
          let position = (index - currentIndex + showcases.length) % showcases.length;
          const isFront = position === 0;
          const isMiddle = position === 1;
          const isShufflingOut = shufflingOutIndex === index;

          // Card Transformation Classes
          let cardStyle = "";
          let zIndex = 10;

          if (isShufflingOut) {
            cardStyle = "translate-x-[-36px] translate-y-[-20px] scale-[0.88] -rotate-3 opacity-0 z-40";
            zIndex = 40;
          } else if (position === 0) {
            cardStyle = "translate-x-0 translate-y-0 scale-100 rotate-0 opacity-100 z-30 shadow-xl border-slate-300";
            zIndex = 30;
          } else if (position === 1) {
            cardStyle = "translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 scale-[0.965] rotate-[0.6deg] opacity-95 z-20 shadow-md border-slate-200 hover:scale-[0.975] cursor-pointer";
            zIndex = 20;
          } else {
            cardStyle = "translate-x-6 translate-y-6 sm:translate-x-7 sm:translate-y-7 scale-[0.93] -rotate-[0.8deg] opacity-85 z-10 shadow-xs border-slate-200";
            zIndex = 10;
          }

          const hasVideoError = videoError[item.id];
          const Icon = item.fallbackIcon || Workflow;

          return (
            <div
              key={item.id}
              onClick={isMiddle && !isTransitioning ? handleNext : undefined}
              aria-hidden={!isFront}
              style={{ zIndex }}
              className={`absolute inset-0 right-6 bottom-6 sm:right-7 sm:bottom-7 rounded-[18px] border bg-white overflow-hidden flex flex-col justify-between transition-all duration-600 ease-out transform-gpu ${cardStyle}`}
            >
              {/* Browser Window Control Bar */}
              <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                  <span className="text-[10px] font-mono text-slate-400 ml-2 font-semibold truncate max-w-[140px] sm:max-w-[180px]">
                    kyzor://{item.filename}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800 font-bold uppercase truncate">
                  {item.badge}
                </span>
              </div>

              {/* Media Viewport Container */}
              <div className="relative w-full flex-1 bg-slate-950 text-white overflow-hidden flex items-center justify-center">
                {isFront && item.videoUrl && !hasVideoError ? (
                  <>
                    <video
                      ref={videoRef}
                      src={item.videoUrl}
                      playsInline
                      muted
                      preload="metadata"
                      onEnded={handleVideoEnded}
                      onError={() => setVideoError((prev) => ({ ...prev, [item.id]: true }))}
                      className="w-full h-full object-contain block"
                    />

                    {/* Manual Play Overlay if Browser Autoplay Blocked */}
                    {autoplayBlocked && (
                      <button
                        type="button"
                        onClick={handleManualPlay}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center group focus:outline-none"
                        aria-label="Play video demonstration"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-5 w-5 ml-0.5 fill-white" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  /* High-Quality Visual Showcase Fallback */
                  <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-[8px] bg-purple-900/60 border border-purple-700 flex items-center justify-center text-purple-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-mono text-purple-300 font-semibold">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        Live System
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-1">
                      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Gateway</span>
                        <span className="text-xs font-bold text-white block">Edge API</span>
                      </div>
                      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Database</span>
                        <span className="text-xs font-bold text-white block">Postgres</span>
                      </div>
                      <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 text-center space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Speed</span>
                        <span className="text-xs font-bold text-emerald-400 block">&lt;200ms</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1">
                      <span>Kyzor Bespoke Codebase</span>
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="p-3 sm:p-3.5 bg-white border-t border-slate-100 space-y-1.5 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{item.title}</h3>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {index + 1} / {showcases.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1 leading-snug">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded border border-slate-200/60"
                    >
                      <CheckCircle2 className="h-3 w-3 text-purple-700" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restrained Manual Controls Below Deck */}
      <div className="flex items-center justify-between max-w-[540px] mx-auto pt-1 px-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-[12px] border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-xs min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-50"
            aria-label="Previous showcase"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={isTransitioning}
            className="w-9 h-9 rounded-[12px] border border-slate-200 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 shadow-xs min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-purple-600 disabled:opacity-50"
            aria-label="Next showcase"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 3 Progress Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Showcase position">
          {showcases.map((item, idx) => (
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
              aria-label={`Go to showcase ${idx + 1}: ${item.title}`}
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
