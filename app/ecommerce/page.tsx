import Link from "next/link";
import { ArrowRight, ShoppingBag, Zap, Database, ShieldCheck, Layers, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom E-commerce Applications Built From Scratch",
  description:
    "Kyzor builds high-performance custom e-commerce applications from scratch with zero platform constraints, tailored database schemas, and sub-second page performance.",
};

export default function EcommercePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Bespoke E-commerce Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Custom E-commerce Applications <span className="text-gradient">Built From Scratch.</span>
        </h1>
        <p className="text-lg text-zinc-300 leading-relaxed">
          We engineer fully tailored, high-converting custom e-commerce web applications without relying on template builders or restrictive third-party store platforms.
        </p>
        <div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Start Your Custom E-commerce Build
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Layers className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Unconstrained UI & Checkout</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Every step of the browsing, filtering, cart, and checkout experience is crafted specifically to your brand’s workflow and conversion goals.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Sub-Second Performance</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Built on modern Next.js server rendering and global edge caching for instantaneous page loads, higher search rankings, and zero lag.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Database className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white">Bespoke Database Schema</h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Custom relational database architecture built on PostgreSQL. Own 100% of your customer data, transaction records, and inventory relationships.
          </p>
        </div>
      </div>

      {/* Why Built From Scratch Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why a Custom E-commerce Application?</h2>
          <p className="text-sm text-zinc-400">
            Standard template stores force businesses into rigid plugin ecosystems, transaction markups, and generic checkout layouts. Kyzor builds software engineered around your precise operational requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <ShieldCheck className="h-4 w-4" />
              Zero Platform Fees
            </div>
            <p className="text-xs text-zinc-500">No mandatory monthly app subscriptions or percentage revenue cuts on transactions.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Server className="h-4 w-4" />
              Complete Ownership
            </div>
            <p className="text-xs text-zinc-500">Your code, your database, and your infrastructure hosted under your cloud environment.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Zap className="h-4 w-4" />
              Edge Speed
            </div>
            <p className="text-xs text-zinc-500">Optimized image delivery, instant cart state, and low-latency API endpoints.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Layers className="h-4 w-4" />
              Tailored Integrations
            </div>
            <p className="text-xs text-zinc-500">Direct integration with your ERP, warehouse fulfillment, or custom CRM systems.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 pt-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Upgrade to a Custom E-commerce Application?</h2>
        <div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Schedule a Technical Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
