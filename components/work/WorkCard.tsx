import { Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { WorkVideoPlayer } from "./WorkVideoPlayer";
import type { PortfolioProject } from "@/lib/config/portfolio";

interface Props {
  project: PortfolioProject;
}

export function WorkCard({ project }: Props) {
  return (
    <article className="group rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 cursor-default">
      <div className="space-y-4">
        {/* Media Frame: Video Player or Polished Static Placeholder */}
        {project.videoUrl ? (
          <WorkVideoPlayer
            src={project.videoUrl}
            title={project.title}
            badgeText={project.badge}
          />
        ) : (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-xs flex flex-col items-center justify-center p-6 text-center space-y-2">
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/90 backdrop-blur-md text-white text-[10px] font-mono font-semibold border border-white/20 shadow-xs">
                <Sparkles className="h-3 w-3 text-purple-400" />
                {project.badge}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-300 shadow-xs">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-xs font-mono text-slate-300 font-medium">
              System Interface Demonstration
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 font-semibold">
            {project.categoryLabel}
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            Kyzor Built
          </span>
        </div>

        {/* Title & Factual Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technology Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-700 bg-slate-50 border border-slate-200/90 px-2.5 py-0.5 rounded-md"
              >
                <CheckCircle2 className="h-3 w-3 text-purple-600" />
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
