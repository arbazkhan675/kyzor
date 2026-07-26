"use client";

import { Sparkles, CheckCircle2 } from "lucide-react";

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
  return (
    <div className="group rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 space-y-5 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-md">
      {/* Video Container - Takes Natural Aspect Ratio of Video Without Cropping or Controls */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xs">
        <video
          src={videoUrl}
          playsInline
          autoPlay
          loop
          muted
          className="w-full h-auto block object-contain rounded-2xl"
        />

        {/* Top Badge Overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold border border-white/20 shadow-xs">
            <Sparkles className="h-3 w-3 text-purple-400 animate-pulse" />
            {badgeText}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="space-y-3 px-1">
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
  );
}
