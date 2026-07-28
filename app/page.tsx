import Link from "next/link";
import { ArrowRight, ShoppingBag, CheckCircle2, ShieldCheck, Zap, Database, Bot } from "lucide-react";
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
    { title: "Custom-Built Codebase Without Lock-in", description: "No required marketplace-plugin stack, rigid themes, or platform transaction cuts. Source-code terms defined clearly in your agreement.", icon: ShieldCheck },
    { title: "Fast, Responsive Navigation", description: "Engineered for rapid load times and responsive page navigation, supporting a faster customer experience and technical SEO.", icon: Zap },
    { title: "Direct Data Ownership", description: "Direct access to and control over your application data, customer records, and internal backend database schemas.", icon: Database },
    { title: "End-to-End Operational Automation", description: "Seamlessly connect WhatsApp Cloud API, email, AI agents, and internal CRMs into unified automated workflows.", icon: Bot },
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
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Fast load times & edge infrastructure
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> No required marketplace-plugin stack
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/?service=ecommerce#services"
                className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900 group-hover:translate-x-1 transition-all"
              >
                View E-commerce Demonstration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Business Automations */}
          <div className="group rounded-3xl border border-slate-200/90 bg-white/90 p-8 sm:p-10 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300 backdrop-blur-md">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 shadow-xs group-hover:scale-110 transition-transform">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Business Automations</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated operational workflows designed to reduce repetitive manual data entry. We integrate official WhatsApp APIs, document parsers, AI customer assistants, webhook routing, and internal backend databases.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-600 pt-2 font-mono">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Official WhatsApp Cloud API integration
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Automated lead qualification pipelines
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-purple-700 shrink-0" /> Custom AI document extraction engines
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/?service=automation#services"
                className="inline-flex items-center text-sm font-semibold text-purple-700 hover:text-purple-900 group-hover:translate-x-1 transition-all"
              >
                View Automations Demonstration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
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

      {/* 5. Final Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-10 sm:p-14 text-center space-y-6 shadow-2xl text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Build Your Custom Application or Automation?
            </h2>
            <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Request a free discovery call with our engineering team to map out your architecture and project timelines.
            </p>
            <div>
              <Link
                href="/consultation"
                className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Request a Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
