"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  videoUrl?: string;
  title?: string;
  description?: string;
  badgeText?: string;
  tags?: string[];
}

export function VideoShowcaseCard({
  videoUrl = "/video/1.mp4",
  title = "Sub-Second Custom Storefront & Dynamic Interactions",
  description = "Experience how custom engineering delivers sub-200ms page transitions, instant product variant updates, and zero plugin lag.",
  badgeText = "Live System Interface Demo",
  tags = ["React Server Components", "Edge Gateway", "Zero Plugin Overhead"],
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="group rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-md">
        {/* Video Player Container */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-inner group">
          <video
            ref={videoRef}
            src={videoUrl}
            playsInline
            autoPlay
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
          />

          {/* Top Badge Overlay */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold border border-white/20 shadow-xs">
              <Sparkles className="h-3 w-3 text-purple-400 animate-pulse" />
              {badgeText}
            </span>
          </div>

          {/* Interactive Player Controls Overlay */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
            {/* Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 transition-colors border border-white/20"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-purple-400" />}
            </button>

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 transition-colors border border-white/20"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 text-purple-400" />}
            </button>

            {/* Fullscreen Preview Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-white hover:bg-slate-900 transition-colors border border-white/20"
              aria-label="Open full preview modal"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{description}</p>

          {/* Feature Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-700" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            {/* Modal Header Bar */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {title} - Full Interface Demo
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Expanded Video Container */}
            <div className="relative aspect-video w-full">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
