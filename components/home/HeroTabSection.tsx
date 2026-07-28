"use client";

import { useState, useRef, useEffect, KeyboardEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ShoppingBag,
  Cpu,
  Sparkles,
  Database,
  Server,
  Zap,
  Shield,
  MessageSquare,
  Workflow,
  Layout,
  Package,
  CreditCard,
  Truck,
  Users,
  ShieldCheck,
  FileText,
  Repeat,
  UserPlus,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";
import { VideoShowcaseCard } from "@/components/ecommerce/VideoShowcaseCard";

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
      url.hash = "service-showcase";
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

  const ecommerceCapabilities = [
    { title: "Custom Storefront", description: "Bespoke, fast buyer interfaces tailored to your brand without dependence on a theme or plugin marketplace.", icon: Layout },
    { title: "Products & Inventory", description: "Flexible catalog schemas supporting product variants, stock tracking, and automated inventory sync.", icon: Package },
    { title: "Cart & Payments", description: "Direct payment gateway integrations with streamlined checkout flows optimized for speed.", icon: CreditCard },
    { title: "Orders & Delivery", description: "Fulfillment pipeline tracking order statuses and notifying customers.", icon: Truck },
    { title: "Customer Accounts", description: "Secure buyer portals for order history, saved addresses, and profile preferences.", icon: Users },
    { title: "Admin Dashboard", description: "Back-office management console for control over catalog, orders, and customer data.", icon: ShieldCheck },
  ];

  const automationWorkflows = [
    { title: "WhatsApp Lead Qualification", description: "Automated inquiry capture, qualification, and routing via official WhatsApp Cloud API.", icon: MessageSquare },
    { title: "AI Document Processing Engine", description: "Automated document parsing, OCR extraction, and interactive verification.", icon: FileText },
    { title: "Real-Time Inventory Sync", description: "Bi-directional stock level synchronization across storefronts and ERP backend databases.", icon: Repeat },
    { title: "CRM Lead Enrichment", description: "Instant webhook enrichment connecting customer inquiries directly into your internal database.", icon: UserPlus },
    { title: "Automated Invoicing & Billing", description: "Instant invoice generation, PDF delivery, and payment status Webhook tracking.", icon: CreditCard },
    { title: "Booking & Appointment Scheduling", description: "Automated calendar availability, client reminders, and confirmation workflows.", icon: Calendar },
  ];

  return (
    <section id="services" className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-purple-50/40 via-white to-slate-50/50">
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
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
              className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
        {activeTab === "ecommerce" ? (
          <div
            id="panel-ecommerce"
            role="tabpanel"
            aria-labelledby="tab-ecommerce"
            className="space-y-12 animate-fade-in-up"
          >
            {/* Header & Hero Text */}
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-xs font-mono text-purple-700 font-semibold uppercase tracking-wider shadow-xs animate-subtle-float">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                No commerce-platform transaction cuts
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Custom e-commerce systems for businesses that have outgrown templates.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We design and build complete online stores—including the storefront, administration, inventory, payments and order workflows—around how your business actually operates.
              </p>
              <div className="pt-2">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_clicked", { location: "hero_ecommerce" })}
                  className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Request a Free 20-Min Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Target Demonstration Scroll Showcase Container */}
            <div id="service-showcase" className="max-w-4xl mx-auto pt-4 scroll-mt-24">
              <VideoShowcaseCard
                videoUrl="/video/1.mp4"
                title="Custom Fashion Storefront Experience"
                description="A responsive storefront demonstration featuring product variants, cart interactions and a streamlined checkout experience."
                badgeText="Kyzor-built demonstration"
                tags={["React Server Components", "Edge Gateway", "No Required Plugin Stack", "Postgres Database"]}
              />
            </div>

            {/* Core E-commerce Capabilities Grid */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">System Capabilities</h2>
                <h3 className="text-2xl font-extrabold text-slate-900">Storefront & Administrative Back-Office</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {ecommerceCapabilities.map((cap) => {
                  const Icon = cap.icon;
                  return (
                    <div
                      key={cap.title}
                      className="group rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-purple-300 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{cap.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="panel-automations"
            role="tabpanel"
            aria-labelledby="tab-automations"
            className="space-y-12 animate-fade-in-up"
          >
            {/* Header & Hero Text */}
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-mono text-blue-700 font-semibold uppercase tracking-wider shadow-xs animate-subtle-float">
                <Cpu className="h-3.5 w-3.5 text-blue-600" />
                Autonomous Workflows & Integrations
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Automate the work slowing your business down.
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                We connect WhatsApp, leads, documents, CRM systems and internal operations into reliable automated workflows—with human review where important decisions require it.
              </p>
              <div className="pt-2">
                <Link
                  href="/consultation"
                  onClick={() => trackEvent("consultation_cta_clicked", { location: "hero_automations" })}
                  className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  Request a Free 20-Min Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Automation Demonstration Container */}
            <div id="service-showcase" className="max-w-4xl mx-auto pt-4 scroll-mt-24">
              <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 space-y-6 shadow-sm border-blue-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900 text-white text-[11px] font-mono font-semibold border border-blue-700">
                      <Sparkles className="h-3 w-3 text-blue-300" />
                      Kyzor-built workflow demonstration
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-semibold hidden sm:inline">
                    6-Step Automated Workflow Execution
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900">WhatsApp Lead Qualification & CRM Workflow</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Demonstration of instant customer inquiry intake, automated WhatsApp qualification, direct CRM record insertion, sales team notification, and human escalation guardrails.
                  </p>
                </div>

                {/* 6-Step Visual Workflow Process Card Flow */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">1</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Lead Form Submission</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">2</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">WhatsApp Response</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">3</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Qualification Questions</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">4</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">CRM/DB Insertion</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">5</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Sales Notification</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mx-auto text-xs font-bold font-mono">6</div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Human Escalation</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Official WhatsApp Cloud API", "Custom Webhooks", "Validation Guardrails", "Human Review Handoff"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-700" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Core Automation Workflows Grid */}
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-blue-700 font-semibold">Workflow Capabilities</h2>
                <h3 className="text-2xl font-extrabold text-slate-900">Custom Automation Pipelines & System Integrations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {automationWorkflows.map((flow) => {
                  const Icon = flow.icon;
                  return (
                    <div
                      key={flow.title}
                      className="group rounded-3xl border border-slate-200/90 bg-white p-6 space-y-3 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{flow.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{flow.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

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
                  <span className="text-[10px] font-mono text-slate-500 block">Fast Navigation</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Server className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Edge API Gateway</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Strict Data Validation</span>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-2 text-center group hover:border-purple-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Database className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">Postgres Database</span>
                  <span className="text-[10px] font-mono text-slate-500 block">Direct Application Control</span>
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
                  <span className="text-xs font-bold text-slate-900 block">Automated Logic Engine</span>
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
