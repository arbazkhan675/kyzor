import Link from "next/link";
import { ArrowRight, ShoppingBag, Cpu, CheckCircle2, ShieldCheck, Zap, Database, Bot, Sparkles } from "lucide-react";
import { HeroTabSection } from "@/components/home/HeroTabSection";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 60;

async function getFeaturedWorkItems() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("work_items")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(3);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredWork = await getFeaturedWorkItems();

  const processSteps = [
    { number: "01", title: "Discovery & Strategy", description: "We analyze your business workflows, operational bottlenecks, and technology goals to define a precise engineering roadmap." },
    { number: "02", title: "Bespoke Architecture & Design", description: "We model custom database schemas, API contracts, and user flows designed specifically around your business operations." },
    { number: "03", title: "Custom Code Engineering", description: "We write complete applications and automations from scratch using modern, high-performance tech stacks." },
    { number: "04", title: "Testing & Deployment", description: "We validate system performance, security boundaries, and automated workflows before deploying to global edge infrastructure." },
    { number: "05", title: "Support & Iteration", description: "We provide ongoing system maintenance, feature extensions, and performance monitoring as your business scales." },
  ];

  const reasons = [
    { title: "100% Custom Code & Zero Platform Locks", description: "No subscription platform fees, rigid themes, or third-party plugin dependencies. You own 100% of your source code.", icon: ShieldCheck },
    { title: "Sub-Second Speed & Edge Performance", description: "Engineered for maximum speed and sub-200ms page transitions globally, improving conversions and search rankings.", icon: Zap },
    { title: "Full Data Sovereignty", description: "Your customer records, analytics, and automation workflows stay completely under your ownership and direct database control.", icon: Database },
    { title: "End-to-End Operational Automation", description: "Seamlessly connect WhatsApp, email, AI agents, and internal CRMs into unified automated workflows.", icon: Bot },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero with accessible E-commerce / Automations tabs & Architecture Visual */}
      <HeroTabSection />

      {/* 2. Two Core Service Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Core Services</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            What We Build for Growing Businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Custom E-commerce */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white/90 p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300 backdrop-blur-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 shadow-xs group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Custom E-commerce Applications</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bespoke online stores built completely from scratch. We engineer tailored storefronts, administrative management portals, inventory synchronization, order fulfillment engines, and custom payment integrations.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Tailored database architecture & schemas
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Sub-second load times & edge hosting
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Zero monthly platform plugin fees
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/ecommerce"
                className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
              >
                Learn about Custom E-commerce
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Card 2: Business Automations */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white/90 p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 backdrop-blur-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-700 shadow-xs group-hover:scale-110 transition-transform">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Business Automations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Eliminate repetitive operational tasks with custom software automation. We build WhatsApp Cloud API workflows, AI chatbots, autonomous voice assistants, document OCR extractors, and CRM lead integrations.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0" /> WhatsApp & Email auto-responses
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0" /> Autonomous AI agents & voice pipelines
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-700 shrink-0" /> Custom CRM & operational webhooks
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/automations"
                className="inline-flex items-center text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
              >
                Learn about Business Automations
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Five-Step Process with Desktop Flow Connectors */}
      <section className="border-y border-slate-200/80 bg-gradient-to-b from-slate-100/70 via-slate-50 to-slate-100/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Methodology</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Our 5-Step Engineering Process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {processSteps.map((step, idx) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-slate-200/90 bg-white p-6 space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-mono font-extrabold text-purple-700 group-hover:scale-105 inline-block transition-transform">{step.number}</span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Maximum Three Selected Work Items */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Selected Work</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Featured Case Studies & Concepts
            </p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900"
          >
            View All Work
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {featuredWork.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWork.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                      {item.category}
                    </span>
                    {item.is_demo && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Demo / Concept
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{item.summary}</p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/work/${item.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-purple-700 hover:text-purple-900"
                  >
                    Read Case Study
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Graceful non-embarrassing fallback state for zero work items */
          <div className="rounded-3xl border border-slate-200/90 bg-white p-10 text-center space-y-3 shadow-xs">
            <Sparkles className="mx-auto h-8 w-8 text-purple-600 opacity-80" />
            <h3 className="text-lg font-semibold text-slate-900">Custom Engineering Portfolio</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Our initial client builds and benchmark concepts are currently being compiled. Explore our technical capabilities or book a consultation.
            </p>
          </div>
        )}
      </section>

      {/* 5. Four Reasons to Choose Kyzor */}
      <section className="border-t border-slate-200/80 bg-slate-100/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Why Kyzor</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Why Businesses Choose Custom Engineering
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="group rounded-3xl border border-slate-200/90 bg-white p-6 space-y-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{reason.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Final Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-10 sm:p-14 text-center space-y-6 shadow-2xl text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Build Your Custom Application or Automation?
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Schedule a direct technical consultation with our engineering team to map out your architecture and project timelines.
            </p>
            <div>
              <Link
                href="/consultation"
                className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
