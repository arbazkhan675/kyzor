"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Cpu } from "lucide-react";
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
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Accessible Tab Switcher */}
        <div className="flex justify-center">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="Core Agency Capabilities"
            className="inline-flex items-center rounded-xl bg-slate-100 p-1.5 border border-slate-200 shadow-inner"
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
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                activeTab === "ecommerce"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShoppingBag className="h-4 w-4 text-purple-600" />
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
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
                activeTab === "automations"
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Cpu className="h-4 w-4 text-blue-600" />
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
              className="space-y-6 animate-in fade-in duration-200"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Custom e-commerce applications, built around your business.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We design and build complete online stores from scratch - storefront, admin dashboard, payments, orders, inventory, deployment and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_click", { location: "hero_ecommerce" })}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-accent-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/ecommerce"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Explore E-commerce
                  <ArrowRight className="ml-2 h-4 w-4 text-purple-600" />
                </Link>
              </div>
            </div>
          ) : (
            <div
              id="panel-automations"
              role="tabpanel"
              aria-labelledby="tab-automations"
              className="space-y-6 animate-in fade-in duration-200"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Automate the work slowing your business down.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We build custom workflows, AI agents, chatbots, voice assistants and integrations that help your business run with less manual effort.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_click", { location: "hero_automations" })}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-accent-gradient px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/automations"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Explore Automations
                  <ArrowRight className="ml-2 h-4 w-4 text-blue-600" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
