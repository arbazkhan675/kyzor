import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Database, Bot, XCircle, MapPin, Instagram } from "lucide-react";
import { HeroTabSection } from "@/components/home/HeroTabSection";

export const revalidate = 60;

export default function HomePage() {
  const processSteps = [
    { number: "01", title: "Discovery & Strategy", description: "We analyze your business workflows, operational bottlenecks, and technology goals to define a precise engineering roadmap." },
    { number: "02", title: "Bespoke Architecture & Design", description: "We model custom database schemas, API contracts, and user flows designed specifically around your business operations." },
    { number: "03", title: "Custom Code Engineering", description: "We write complete applications and automations from scratch using modern, high-performance tech stacks." },
    { number: "04", title: "Testing & Deployment", description: "We validate system performance, security boundaries, and automated workflows before deploying to edge infrastructure." },
    { number: "05", title: "Support & Iteration", description: "We provide ongoing system maintenance, feature extensions, and performance monitoring as your business scales." },
  ];

  const reasons = [
    { title: "Custom-Built Codebase Without Lock-in", description: "No required marketplace-plugin stack, rigid themes, or platform transaction cuts. Source-code terms defined clearly in your project agreement.", icon: ShieldCheck },
    { title: "Fast, Responsive Navigation", description: "Engineered for rapid load times and responsive page navigation, supporting a faster customer experience and stronger technical SEO.", icon: Zap },
    { title: "Direct Data Ownership", description: "Direct access to and control over your application data, customer records, and internal backend database schemas.", icon: Database },
    { title: "End-to-End Operational Automation", description: "Seamlessly connect WhatsApp Cloud API, email, AI agents, and internal CRMs into unified automated workflows.", icon: Bot },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero with accessible E-commerce / Automations tabs & Architecture Visual */}
      <HeroTabSection />

      {/* 2. Who Kyzor Is For (Qualification Grid) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Project Fit</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Who Kyzor Is For
          </p>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            We operate as a focused engineering studio. Clear boundaries help ensure every engagement succeeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Good Fit */}
          <div className="rounded-3xl border border-purple-200/90 bg-gradient-to-b from-purple-50/40 via-white to-white p-8 sm:p-10 space-y-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-purple-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Kyzor is a good fit when:</h3>
                <p className="text-xs text-slate-500 font-mono">Custom engineering & bespoke operations</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
                <span>Your workflows cannot be handled cleanly by standard website templates.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
                <span>You need custom API integrations, administrative portals, or specialized database logic.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
                <span>Your team repeatedly transfers information manually between separate software systems.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
                <span>You want direct communication with the engineer designing and building your application.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Standard Platform Fit */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-10 space-y-6 shadow-xs">
            <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">A standard platform may be better when:</h3>
                <p className="text-xs text-slate-500 font-mono">Off-the-shelf templates</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>You only need a basic online store with standard catalog fields.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>You want a do-it-yourself website built within a few days without custom code.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Your operational requirements are already handled completely by an existing plug-and-play tool.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Five-Step Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">How We Work</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Our 5-Step Engineering Process
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {processSteps.map((step) => (
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
      </section>

      {/* 4. Four Reasons to Choose Kyzor */}
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

      {/* 5. Founder Trust Strip */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
              AK
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-base font-bold text-slate-900">Arbaz Khan</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                  Founder & Principal Engineer
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug pt-0.5">
                Work directly with the engineer designing and building your system - no account managers or middle layers.
              </p>
              <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center sm:justify-start gap-1 pt-1">
                <MapPin className="h-3 w-3 text-purple-600" />
                Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <a
              href="https://instagram.com/kyzorcommerce"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl"
            >
              <Instagram className="h-4 w-4 text-pink-600" />
              @kyzorcommerce
            </a>
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
              Request a free discovery call to discuss your requirements, possible architecture and next steps.
            </p>
            <div>
              <Link
                href="/consultation"
                className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Request a Free 20-Min Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
