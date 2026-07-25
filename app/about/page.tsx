import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Database, HeartHandshake, CheckCircle2, UserCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kyzor | Engineering Custom E-commerce & Business Automations",
  description:
    "Kyzor is a digital product and automation agency that builds complete custom systems from the ground up. Technology should adapt to the business - not force the business to adapt to a template.",
};

export default function AboutPage() {
  const processStages = [
    { name: "Understand", description: "We analyze your business operations, workflows, catalog requirements, and technical goals." },
    { name: "Design", description: "We architect custom database schemas, API contracts, and user-centric interfaces." },
    { name: "Build", description: "We write clean, high-performance code from scratch with zero template or platform dependencies." },
    { name: "Deploy", description: "We configure edge hosting, production databases, SSL certificates, and launch to your domain." },
    { name: "Support", description: "We provide ongoing maintenance, feature enhancements, and system monitoring post-launch." },
  ];

  const differentiators = [
    { title: "Custom-Built", description: "Every line of code is written specifically for your application. No rigid templates, bloatware, or platform locks.", icon: ShieldCheck },
    { title: "Business-First", description: "Software engineered around your existing operational processes rather than forcing your business into pre-set workflows.", icon: HeartHandshake },
    { title: "Fully Deployed", description: "Complete end-to-end launch on your custom domain with production-ready security and performance.", icon: Database },
    { title: "Supported After Launch", description: "We remain your dedicated engineering partner for long-term maintenance, updates, and scaling.", icon: Zap },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero & Opening Statement */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-800/60 bg-zinc-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
            Agency Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Kyzor is a digital product and automation agency that builds complete custom systems from the ground up.
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-purple-400 max-w-3xl mx-auto leading-snug pt-2">
            “Technology should adapt to the business - not force the business to adapt to a template.”
          </p>
        </div>
      </section>

      {/* 2. The One-Team Approach */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">The One-Team Idea-to-Deployment Approach</h2>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            At Kyzor, we eliminate the friction of coordinating separate design studios, freelance contractors, and external deployment engineers. A single dedicated product engineering team handles your project from initial concept definition to final domain launch and ongoing maintenance.
          </p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            This unified structure ensures total accountability, rapid iteration cycles, and a deeply cohesive technical architecture tailored specifically to your business goals.
          </p>
        </div>
      </section>

      {/* 3. Five Process Stages */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400">Our Method</h2>
          <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Five Stages of Engineering Delivery
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {processStages.map((stage, idx) => (
            <div key={stage.name} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 space-y-3">
              <span className="text-2xl font-mono font-extrabold text-purple-400">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-white">{stage.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Four Core Differentiators */}
      <section className="border-t border-zinc-800/80 bg-zinc-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-400">Why Work With Us</h2>
            <p className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Four Kyzor Engineering Standards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Team Section Note */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-8 space-y-3">
          <UserCheck className="mx-auto h-8 w-8 text-purple-400 opacity-80" />
          <h3 className="text-lg font-bold text-white">Direct Engineer Communication</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            You work directly with senior product engineers who architect and write your code - no account managers or middle layers.
          </p>
        </div>
      </section>

      {/* Final Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-10 sm:p-14 text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Your Custom Software Solution?
          </h2>
          <p className="text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Book a direct consultation with our engineering team to review your technical goals and project scope.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] transition-all"
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
