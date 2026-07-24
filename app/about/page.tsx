import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2, Cpu, Shield, Zap, Terminal } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kyzor | Engineering Custom E-commerce & Business Automations",
  description:
    "Learn about Kyzor's mission: engineering bespoke e-commerce applications from scratch and building autonomous business workflows with software clarity.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
          <Terminal className="h-3.5 w-3.5" />
          <span>Agency Philosophy & Engineering Standards</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Software Built for Performance, <span className="text-gradient">Not Platform Constraints.</span>
        </h1>
        <p className="text-lg text-zinc-300 leading-relaxed">
          Kyzor is a specialized product agency focused on two core disciplines: building custom e-commerce applications from scratch and engineering intelligent business automations.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Code2 className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Built From Scratch</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We write clean, bespoke code tailored specifically to your business logic without template bloated code.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Speed & Reliability</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            High-speed server rendering, edge delivery, and reliable automated error recovery.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Data Sovereignty</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Full control over database schemas, customer data, and security policies without lock-in.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Cpu className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Autonomous Workflows</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            WhatsApp API integrations, AI agents, document OCR, and CRM automations that run 24/7.
          </p>
        </div>
      </div>

      {/* Engineering Manifesto */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12 space-y-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Kyzor Logo" width={32} height={32} />
          <h2 className="text-2xl font-bold text-white">Our Engineering Approach</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-300 leading-relaxed">
          <p>
            Standard out-of-the-box e-commerce setups work well for initial simple storefronts, but rapidly become operational bottlenecks as businesses scale. Monthly app costs compound, site speeds slow down under heavy plugin layers, and customized inventory rules become impossible to implement.
          </p>
          <p>
            At Kyzor, we treat custom e-commerce as bespoke software engineering. We design custom frontend experiences, craft relational database schemas, and integrate autonomous backend workflows so your digital operations can scale smoothly without technical friction.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let’s Discuss Your Next Build</h2>
        <div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Book a Technical Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
