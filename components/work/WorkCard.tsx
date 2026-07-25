import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import type { Database } from "@/lib/types/database.types";

type WorkItem = Database["public"]["Tables"]["work_items"]["Row"];

interface Props {
  item: WorkItem;
}

export function WorkCard({ item }: Props) {
  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-5 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-200">
      <div className="space-y-4">
        {/* Media Thumbnail or Fallback Header */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80 flex items-center justify-center">
          {item.hero_image_url ? (
            <Image
              src={item.hero_image_url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-zinc-500">Custom Engineering Architecture</span>
            </div>
          )}
        </div>

        {/* Category & Demo/Concept Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
            {item.category}
          </span>
          {item.is_demo ? (
            <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Demo / Concept
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded">
              Client Build
            </span>
          )}
        </div>

        {/* Title & Summary */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
            {item.summary}
          </p>
        </div>

        {/* Technologies Pills */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="text-[10px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800/80 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Link */}
      <div className="pt-2 border-t border-zinc-800/80">
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors"
        >
          View Project Case Study
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
