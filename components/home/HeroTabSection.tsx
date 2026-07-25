"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Cpu, Sparkles, Database, Server, Zap, Shield, MessageSquare, Workflow } from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";

export function HeroTabSection() {
  const [activeTab, setActiveTab] = useState<"ecommerce" | "automations">("ecommerce");
  const tabListRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: "ecommerce" | "automations") => {
    setActiveTab(tab);
    trackEvent("hero_tab_change", { tab });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentTab: "ecommerce" | "automations") => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const nextTab = currentTab === "ecommerce" ? "automations" : "ecommerce";
      switchTab(nextTab);
      const nextButton = tabListRef.current?.querySelector<HTMLButtonElement>(`button[data-tab="${nextTab}"]`);
      nextButton?.focus();
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-purple-50/40 via-white to-slate-50/50">
      {/* Ambient Top Radial Glow Background */}
      <div className="absolute inset-0 pointer-events-none ambient-glow-top" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Accessible Futuristic Tab Switcher */}
        <div className="flex justify-center">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Core Agency Capabilities"
            className="inline-flex items-center rounded-2xl bg-white/90 p-1.5 border border-slate-200/90 shadow-md backdrop-blur-md"
          >
            <button
              id="tab-ecommerce"
              role="tab"
              data-tab="ecommerce"
              aria-selected={activeTab === "ecommerce"}
              aria-controls="panel-ecommerce"
              tabIndex={activeTab === "ecommerce" ? 0 : -1}
              onClick={() => switchTab("ecommerce")}
              onKeyDown={(e) => handleKeyDown(e, "ecommerce")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                activeTab === "ecommerce"
                  ? "bg-slate-900 text-white shadow-md border border-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <ShoppingBag className={`h-4 w-4 transition-transform ${activeTab === "ecommerce" ? "text-purple-400 scale-110" : "text-purple-600"}`} />
              Custom E-commerce
            </button>

            <button
              id="tab-automations"
              role="tab"
              data-tab="automations"
              aria-selected={activeTab === "automations"}
              aria-controls="panel-automations"
              tabIndex={activeTab === "automations" ? 0 : -1}
              onClick={() => switchTab("automations")}
              onKeyDown={(e) => handleKeyDown(e, "automations")}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                activeTab === "automations"
                  ? "bg-slate-900 text-white shadow-md border border-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
              }`}
            >
              <Cpu className={`h-4 w-4 transition-transform ${activeTab === "automations" ? "text-blue-400 scale-110" : "text-blue-600"}`} />
              Business Automations
            </button>
          </div>
        </div>

        {/* Tab Panel Content */}
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {activeTab === "ecommerce" ? (
            <div
              id="panel-ecommerce"
              role="tabpanel"
              aria-labelledby="tab-ecommerce"
              className="space-y-6 animate-fade-in-up"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-mono text-purple-700 font-semibold uppercase tracking-wider shadow-xs animate-subtle-float">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                Zero Platform Overhead
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Custom e-commerce applications, built around your business.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We design and build complete online stores from scratch - storefront, admin dashboard, payments, orders, inventory, deployment and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_click", { location: "hero_ecommerce" })}
                  className="btn-gleam w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/ecommerce"
                  className="group w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 px-6 py-3.5 text-base font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Explore E-commerce
                  <ArrowRight className="ml-2 h-4 w-4 text-purple-600 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div
              id="panel-automations"
              role="tabpanel"
              aria-labelledby="tab-automations"
              className="space-y-6 animate-fade-in-up"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 font-semibold uppercase tracking-wider shadow-xs animate-subtle-float">
                <Cpu className="h-3.5 w-3.5 text-blue-600" />
                Autonomous Workflows & AI Agents
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Automate the work slowing your business down.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We build custom workflows, AI agents, chatbots, voice assistants and integrations that help your business run with less manual effort.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_click", { location: "hero_automations" })}
                  className="btn-gleam w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/automations"
                  className="group w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/90 px-6 py-3.5 text-base font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Explore Automations
                  <ArrowRight className="ml-2 h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Visual Engine Node Diagram Floating Preview */}
        <div className="pt-6 max-w-4xl mx-auto">
          <div className="rounded-3xl border border-slate-200/90 bg-white/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-slate-500 ml-2 font-semibold">
                  {activeTab === "ecommerce" ? "kyzor-custom-engine-architecture.schema" : "kyzor-automation-pipeline.workflow"}
                </span>
              </div>
              <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold uppercase">
                Live Schema Architecture
              </span>
            </div>

            {/* Architecture Node Flow Diagram */}
            {activeTab === "ecommerce" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Custom Storefront</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Sub-200ms Edge</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Server className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Edge API Gateway</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Strict Zod Validation</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Database className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Postgres RLS Database</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Full Data Ownership</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Owner Admin Portal</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Orders & Inventory</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Webhook Trigger</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Form / Event Listener</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Workflow className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Router & Transformation</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Automated Parsing</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">AI Agent Decision</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Human Escalation Guard</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-blue-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">WhatsApp / CRM Action</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Instant Dispatch</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
