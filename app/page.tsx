import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Cpu, CheckCircle2, ShieldCheck, Zap, Bot, MessageSquare, FileText, PhoneCall, Workflow } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 60; // Revalidate every minute

async function getFeaturedWork() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("work_items")
      .select("*")
      .eq("published", true)
      .limit(3);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredWork = await getFeaturedWork();

  return (
    <div className="space-y-24 py-12 lg:py-20">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <span>Engineering Custom Digital Assets</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Custom E-commerce Applications{" "}
              <span className="text-gradient">Built From Scratch.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Kyzor designs and builds high-performance custom e-commerce applications with zero platform constraints, paired with intelligent business automations for growing companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-500/25 transition-all hover:scale-[1.02] hover:shadow-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 px-7 py-3.5 text-base font-semibold text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Explore Concept Work
              </Link>
            </div>

            {/* Core Values */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-zinc-800/80 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span>100% Bespoke Code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                <span>Zero Platform Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
                <span>Full Data Sovereignty</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="Kyzor" width={32} height={32} />
                  <span className="font-bold text-white">Kyzor Architecture</span>
                </div>
                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">Active</span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <ShoppingBag className="h-3.5 w-3.5 text-purple-400" />
                      Custom E-commerce Engine
                    </span>
                    <span className="text-emerald-400 font-mono">Bespoke</span>
                  </div>
                  <p className="text-xs text-zinc-500">Tailored checkout flow, sub-second latency, custom database schemas.</p>
                </div>

                <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Workflow className="h-3.5 w-3.5 text-blue-400" />
                      Autonomous Workflows
                    </span>
                    <span className="text-purple-400 font-mono">Real-time</span>
                  </div>
                  <p className="text-xs text-zinc-500">WhatsApp integrations, lead qualification, automated document processing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Core Expertise</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Two Specialized Pillars of Modern Engineering
          </p>
          <p className="text-base text-zinc-400">
            We build dedicated, scalable web software without reliance on rigid template builders or restrictive vendor platforms.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-6 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Custom E-commerce Applications</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Full-stack e-commerce web applications designed and built from scratch. Unconstrained layout design, specialized inventory management, bespoke checkout logic, and complete database control.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-400 pt-2">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-400" />
                  <span>Custom application code & DB architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-400" />
                  <span>High-speed SSR and static page rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-400" />
                  <span>Integrated custom admin dashboards</span>
                </li>
              </ul>
            </div>
            <Link
              href="/ecommerce"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors pt-4"
            >
              Learn more about Custom E-commerce
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-6 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">Business Automations & AI</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                End-to-end automation pipelines that remove manual operational drag. From automated WhatsApp messaging and AI conversational agents to document processing and custom CRM workflows.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5 text-blue-400" /> WhatsApp Workflows</span>
                <span className="flex items-center gap-1.5"><Bot className="h-3.5 w-3.5 text-blue-400" /> AI Chatbots & Agents</span>
                <span className="flex items-center gap-1.5"><PhoneCall className="h-3.5 w-3.5 text-blue-400" /> Voice Assistants</span>
                <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5 text-blue-400" /> Document Processing</span>
              </div>
            </div>
            <Link
              href="/automations"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-4"
            >
              Explore Business Automations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Portfolio</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight mt-1">Featured Case Studies</p>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            View all projects
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredWork.map((item: any) => (
            <div key={item.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                    {item.category}
                  </span>
                  {item.is_demo && (
                    <span className="text-[10px] font-semibold tracking-wider text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                      Demo / Concept
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">{item.summary}</p>
              </div>

              <Link
                href={`/work/${item.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-purple-400 transition-colors pt-2"
              >
                Read Case Study
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Your Custom Software Solution?
          </h2>
          <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Schedule a technical consultation to discuss your custom e-commerce application requirements or business automation needs.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform"
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
