import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Case Studies",
  description:
    "Explore Kyzor's portfolio of custom e-commerce applications built from scratch and automated operational workflows.",
};

export const revalidate = 60;

async function getWorkItems() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("work_items")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const items = await getWorkItems();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
          <Layers className="h-3.5 w-3.5" />
          <span>Proven Engineering Architecture</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Work & <span className="text-gradient">Case Studies.</span>
        </h1>
        <p className="text-lg text-zinc-300 leading-relaxed">
          A collection of custom e-commerce application builds and high-impact business automation systems. Non-client engineering benchmarks are explicitly marked as Demo or Concept.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-6 flex flex-col justify-between hover:border-purple-500/40 transition-colors"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                  {item.category}
                </span>
                {item.is_demo ? (
                  <span className="text-[10px] font-semibold tracking-wider text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                    Demo / Concept
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold tracking-wider text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Client Production
                  </span>
                )}
              </div>

              <h2 className="text-xl font-bold text-white leading-snug">{item.title}</h2>
              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">{item.summary}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.technologies?.map((tech: string) => (
                  <span key={tech} className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/work/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors pt-4 border-t border-zinc-800/80"
            >
              View Detailed Case Study
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
