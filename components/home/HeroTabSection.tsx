"use client";

import { useState, useRef, useEffect, KeyboardEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ShoppingBag,
  Cpu,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";
import { VideoShowcaseCard } from "@/components/ecommerce/VideoShowcaseCard";
import { EditorialContainer } from "@/components/ui/editorial";

function HeroTabContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"ecommerce" | "automations">("ecommerce");
  const tabListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam === "ecommerce") {
      setActiveTab("ecommerce");
    } else if (serviceParam === "automation" || serviceParam === "automations") {
      setActiveTab("automations");
    }
  }, [searchParams]);

  const switchTab = (tab: "ecommerce" | "automations") => {
    setActiveTab(tab);
    if (tab === "ecommerce") {
      trackEvent("ecommerce_tab_selected");
    } else {
      trackEvent("automation_tab_selected");
    }
    trackEvent("hero_tab_change", { tab });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("service", tab === "ecommerce" ? "ecommerce" : "automation");
      window.history.replaceState({}, "", url.toString());
    }
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
    <section id="services" className="relative overflow-hidden py-12 md:py-16 lg:py-20 border-b border-slate-200/80 bg-gradient-to-b from-purple-50/30 via-white to-slate-50/40">
      {/* Ambient Radial Top Glow */}
      <div className="absolute inset-0 pointer-events-none ambient-glow-top" />

      <EditorialContainer className="relative">
        {/* Editorial Split Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Switcher, Copy, CTAs, Trust Line */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* 1. Compact Service Switcher */}
            <div className="flex justify-start">
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Core Agency Capabilities"
                className="inline-flex items-center rounded-[16px] bg-white p-1 border border-slate-200/90 shadow-xs"
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
                  className={`inline-flex items-center gap-2 rounded-[12px] px-4 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                    activeTab === "ecommerce"
                      ? "bg-slate-900 text-white shadow-sm border border-slate-800"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <ShoppingBag className={`h-4 w-4 transition-transform ${activeTab === "ecommerce" ? "text-purple-400 scale-105" : "text-purple-600"}`} />
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
                  className={`inline-flex items-center gap-2 rounded-[12px] px-4 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                    activeTab === "automations"
                      ? "bg-slate-900 text-white shadow-sm border border-slate-800"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                  }`}
                >
                  <Cpu className={`h-4 w-4 transition-transform ${activeTab === "automations" ? "text-blue-400 scale-105" : "text-blue-600"}`} />
                  Business Automations
                </button>
              </div>
            </div>

            {/* 2. Dynamic Eyebrow, H1 Headline & Description */}
            {activeTab === "ecommerce" ? (
              <div className="space-y-4 animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                  Custom Commerce Engineering
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Custom e-commerce systems for businesses that have outgrown templates.
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  We design and build complete online stores—including the storefront, administration, inventory, payments and order workflows—around how your business actually operates.
                </p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold uppercase tracking-wider">
                  <Cpu className="h-3.5 w-3.5 text-blue-600" />
                  Business Automation
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Automate the work slowing your business down.
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  We connect WhatsApp, leads, documents, CRM systems and internal operations into reliable automated workflows—with human review where important decisions require it.
                </p>
              </div>
            )}

            {/* 3. Action CTAs (Primary Button + Secondary Anchor Link) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/consultation"
                onClick={() => trackEvent("consultation_cta_clicked", { location: activeTab === "ecommerce" ? "hero_ecommerce" : "hero_automations" })}
                className="btn-gleam inline-flex items-center justify-center rounded-[12px] bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-500/20 min-h-[44px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
              >
                Request a Free 20-Min Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <a
                href="#service-capabilities"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-purple-700 hover:text-purple-900 hover:bg-purple-50/60 rounded-[12px] min-h-[44px] transition-colors"
              >
                <span>{activeTab === "ecommerce" ? "Explore system capabilities" : "Explore workflow capabilities"}</span>
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            {/* 4. Small Trust Line */}
            <div className="pt-1 text-[11px] font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>Founder-led · Direct engineer communication · India and global projects</span>
            </div>
          </div>

          {/* Right Column: Dynamic Demonstration Component */}
          <div className="lg:col-span-6">
            <div id="panel-ecommerce" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
              {activeTab === "ecommerce" ? (
                <div className="animate-fade-in-up">
                  <VideoShowcaseCard
                    videoUrl="/video/1.mp4"
                    title="Custom Fashion Storefront Experience"
                    description="A responsive storefront demonstration featuring product variants, cart interactions and a streamlined checkout experience."
                    badgeText="Kyzor-built demonstration"
                    tags={["React Server Components", "Edge Gateway", "No Required Plugin Stack", "Postgres Database"]}
                  />
                </div>
              ) : (
                <div className="animate-fade-in-up rounded-[22px] border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-sm border-blue-100">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[12px] bg-blue-900 text-white text-[11px] font-mono font-semibold border border-blue-700">
                        <Sparkles className="h-3 w-3 text-blue-300" />
                        Kyzor-built workflow demonstration
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold hidden sm:inline">
                      6-Step Automated Execution
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900">WhatsApp Lead Qualification & CRM Workflow</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Demonstration of instant customer inquiry intake, automated WhatsApp qualification, direct CRM record insertion, sales team notification, and human escalation guardrails.
                    </p>
                  </div>

                  {/* 6-Step Visual Process Card Flow */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">1</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">Lead Form Submission</span>
                    </div>
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">2</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">WhatsApp Response</span>
                    </div>
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">3</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">Qualification Questions</span>
                    </div>
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">4</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">CRM/DB Insertion</span>
                    </div>
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">5</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">Sales Notification</span>
                    </div>
                    <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-2.5 space-y-1.5 text-center">
                      <div className="w-7 h-7 rounded-[8px] bg-red-100 text-red-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">6</div>
                      <span className="text-[11px] font-bold text-slate-900 block leading-tight">Human Escalation</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Official WhatsApp Cloud API", "Custom Webhooks", "Validation Guardrails", "Human Review Handoff"].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-700"
                      >
                        <CheckCircle2 className="h-3 w-3 text-blue-700" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lower Anchor Section ID for Capabilities Link */}
        <div id="service-capabilities" className="scroll-mt-24" />
      </EditorialContainer>
    </section>
  );
}

export function HeroTabSection() {
  return (
    <Suspense fallback={
      <section id="services" className="py-20 text-center text-slate-500">
        Loading service showcase...
      </section>
    }>
      <HeroTabContent />
    </Suspense>
  );
}
