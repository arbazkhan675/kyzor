import Link from "next/link";
import { ArrowRight, Sparkles, FolderKanban } from "lucide-react";
import { WorkCard } from "@/components/work/WorkCard";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Metadata } from "next";
import type { Database } from "@/lib/types/database.types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Engineering Work & Case Studies | Kyzor",
  description:
    "Explore Kyzor portfolio of custom e-commerce applications built from scratch and business automation case studies with verified benchmark metrics.",
  keywords: [
    "custom e-commerce portfolio India",
    "business automation case studies",
    "Kyzor engineering portfolio",
    "software concept benchmark builds",
  ],
};

type WorkItem = Database["public"]["Tables"]["work_items"]["Row"];

interface Props {
  searchParams: Promise<{ category?: string }>;
}

async function getPublishedWorkItems(selectedCategory?: string): Promise<WorkItem[]> {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("work_items")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (selectedCategory && selectedCategory !== "all") {
      query = query.eq("category", selectedCategory as any);
    }

    const { data } = await query;
    return data || [];
  } catch {
    return [];
  }
}

export default async function WorkPage({ searchParams }: Props) {
  const { category = "all" } = await searchParams;
  const workItems = await getPublishedWorkItems(category);

  const filters = [
    { label: "All Work", value: "all", href: "/work" },
    { label: "E-commerce", value: "ecommerce", href: "/work?category=ecommerce" },
    { label: "Automations", value: "automation", href: "/work?category=automation" },
  ];

  return (
    <div className="space-y-12 lg:space-y-16 pb-16">
      {/* Header Banner */}
      <section className="relative pt-12 pb-12 md:pt-16 md:pb-16 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded">
            Engineering Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Work & Concept Applications
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Real custom software solutions and benchmark applications built from scratch. Non-client projects are explicitly flagged as Demo or Concept.
          </p>
        </div>
      </section>

      {/* Category Filter Controls */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="inline-flex items-center rounded-xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner">
          {filters.map((f) => {
            const isActive = category === f.value;
            return (
              <Link
                key={f.value}
                href={f.href}
                className={`rounded-lg px-5 py-2 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                  isActive
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Work Items Gallery */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {workItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workItems.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          /* Meaningful Empty State */
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
            <FolderKanban className="mx-auto h-10 w-10 text-purple-700 opacity-75" />
            <h2 className="text-xl font-bold text-slate-900">No Case Studies Found</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              There are currently no published case studies under this category filter. Check back soon or request a custom consultation.
            </p>
            <div className="pt-2">
              <Link
                href="/work"
                className="inline-flex items-center text-xs font-semibold text-purple-700 hover:text-purple-900"
              >
                View All Categories
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Consultation Banner CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-center space-y-4 text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Bespoke Software Project in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Discuss your technical requirements directly with our senior product engineers.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
