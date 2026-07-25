import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

async function getWorkItem(slug: string) {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("work_items")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  if (!item) {
    return {
      title: "Case Study Not Found | Kyzor",
    };
  }

  return {
    title: `${item.title} | Kyzor Case Study`,
    description: item.summary,
    openGraph: {
      title: `${item.title} | Kyzor Case Study`,
      description: item.summary,
      url: `https://kyzor.online/work/${item.slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  // Return 404 for missing or unpublished/draft slugs
  if (!item || !item.published) {
    notFound();
  }

  const resultsList: string[] = Array.isArray(item.results)
    ? (item.results as string[])
    : [];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Navigation Link */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio Gallery
        </Link>
      </div>

      {/* Hero Section */}
      <div className="space-y-6 border-b border-slate-200 pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded border border-purple-200">
            {item.category}
          </span>
          {item.is_demo ? (
            <span className="text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 px-3 py-1 rounded inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Demo / Concept Project
            </span>
          ) : (
            <span className="text-xs font-semibold text-emerald-700 border border-emerald-200 bg-emerald-50 px-3 py-1 rounded inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Client Production Build
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {item.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{item.summary}</p>

        {/* Technologies Pills */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {item.technologies.map((tech: string) => (
              <span key={tech} className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-md font-mono">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Requirement / Challenge & Solution Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">The Operational Challenge</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{item.challenge}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Kyzor Custom Solution</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{item.solution}</p>
        </div>
      </div>

      {/* Outcomes & Benchmark Results */}
      {resultsList.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-100/70 p-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Architectural Outcomes & Metrics</h2>
          <ul className="grid grid-cols-1 gap-3 text-sm text-slate-800">
            {resultsList.map((res: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-purple-700 shrink-0 mt-0.5" />
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Final Consultation CTA */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center space-y-4 shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900">Need a Similar Custom System Built for Your Business?</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          We engineer tailored custom e-commerce applications and business automations completely from scratch.
        </p>
        <div className="pt-2">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-lg"
          >
            Book a Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
