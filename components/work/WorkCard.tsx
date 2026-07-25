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
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 space-y-5 flex flex-col justify-between shadow-sm hover:border-purple-300 transition-all duration-200">
      <div className="space-y-4">
        {/* Media Thumbnail or Fallback Header */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
          {item.hero_image_url ? (
            <Image
              src={item.hero_image_url}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Layers className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono text-slate-500">Custom Engineering Architecture</span>
            </div>
          )}
        </div>

        {/* Category & Demo/Concept Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
            {item.category}
          </span>
          {item.is_demo ? (
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Demo / Concept
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
              Client Build
            </span>
          )}
        </div>

        {/* Title & Summary */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {item.summary}
          </p>
        </div>

        {/* Technologies Pills */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Link */}
      <div className="pt-2 border-t border-slate-100">
        <Link
          href={`/work/${item.slug}`}
          className="inline-flex items-center text-xs font-semibold text-purple-700 group-hover:text-purple-900 transition-colors"
        >
          View Project Case Study
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
