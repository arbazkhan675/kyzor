import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Style & Component Primitives Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StylePreviewPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="Kyzor Logo" width={40} height={40} className="object-contain" />
          <div>
            <h1 className="text-2xl font-bold text-white">Visual Design Primitives</h1>
            <p className="text-xs font-mono text-purple-400">Internal Style Showcase (Excluded from navigation)</p>
          </div>
        </div>
        <Link href="/" className="text-xs text-zinc-400 hover:text-white underline">
          Back to Home
        </Link>
      </div>

      {/* 1. Brand Logo & Color Palette */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          01. Brand & Palette Swatches
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 space-y-2">
            <div className="w-full h-10 rounded bg-[#09090b] border border-zinc-800"></div>
            <p className="text-xs font-bold text-white">Background</p>
            <p className="text-[10px] font-mono text-zinc-500">#09090B</p>
          </div>

          <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 space-y-2">
            <div className="w-full h-10 rounded bg-[#7c3aed]"></div>
            <p className="text-xs font-bold text-white">Primary (Violet)</p>
            <p className="text-[10px] font-mono text-zinc-500">#7C3AED</p>
          </div>

          <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 space-y-2">
            <div className="w-full h-10 rounded bg-[#2563eb]"></div>
            <p className="text-xs font-bold text-white">Secondary (Blue)</p>
            <p className="text-[10px] font-mono text-zinc-500">#2563EB</p>
          </div>

          <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 space-y-2">
            <div className="w-full h-10 rounded bg-[#10b981]"></div>
            <p className="text-xs font-bold text-white">Success (Emerald)</p>
            <p className="text-[10px] font-mono text-zinc-500">#10B981</p>
          </div>

          <div className="rounded-lg bg-zinc-950 p-4 border border-zinc-800 space-y-2">
            <div className="w-full h-10 rounded bg-[#ef4444]"></div>
            <p className="text-xs font-bold text-white">Destructive (Red)</p>
            <p className="text-[10px] font-mono text-zinc-500">#EF4444</p>
          </div>
        </div>
      </section>

      {/* 2. Typography */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          02. Typography Hierarchy (Geist Sans & Mono)
        </h2>
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <h1 className="text-4xl font-extrabold text-white">Heading 1: Custom E-commerce Applications</h1>
          <h2 className="text-2xl font-bold text-white">Heading 2: Business Automations & AI Workflows</h2>
          <h3 className="text-lg font-semibold text-white">Heading 3: Sub-Second Performance Architecture</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Body Text: Kyzor designs and builds bespoke e-commerce applications from scratch with zero platform locks, paired with intelligent WhatsApp, email, and document automations.
          </p>
          <p className="text-xs font-mono text-purple-400">
            Monospace Code: const client = createClient(); // Supabase Auth & DB
          </p>
        </div>
      </section>

      {/* 3. Buttons & Actions */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          03. Button Variants & Focus States
        </h2>
        <div className="flex flex-wrap gap-4 items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <button className="rounded-lg bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:scale-[1.02] focus:outline-none">
            Primary Accent CTA
          </button>

          <button className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white">
            Secondary Outline
          </button>

          <button className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-5 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/20">
            Success State
          </button>

          <button className="rounded-lg bg-red-500/10 border border-red-500/30 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20">
            Destructive Action
          </button>
        </div>
      </section>

      {/* 4. Badges & Indicators */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          04. Badges & Status Indicators
        </h2>
        <div className="flex flex-wrap gap-3 items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <span className="text-xs font-mono uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded">
            Ecommerce
          </span>
          <span className="text-xs font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 rounded">
            Demo / Concept
          </span>
          <span className="text-xs font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded">
            Client Production
          </span>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded">
            Next.js 16
          </span>
        </div>
      </section>

      {/* 5. Form Control Primitives */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          05. Form Controls & Input Primitives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Text Input Field
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Morgan"
              defaultValue="Sample Input Content"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Select Dropdown
            </label>
            <select className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none">
              <option>Custom E-commerce Application</option>
              <option>Business Automations & AI</option>
            </select>
          </div>
        </div>
      </section>

      {/* 6. Card Container */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-white uppercase tracking-wider text-xs text-zinc-400">
          06. Restrained Card Container
        </h2>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-xl font-bold text-white">Clean Visual Surface</h3>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Restrained card layout using subtle borders and generous padding without distracting glow or glassmorphism effects.
          </p>
        </div>
      </section>
    </div>
  );
}
