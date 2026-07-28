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
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics/track";
import { VideoShowcaseDeck } from "@/components/home/VideoShowcaseDeck";
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

  const ecommerceCapabilities = [
    { title: "Storefront Experience", description: "Bespoke, fast buyer interfaces tailored to your brand without dependence on a theme or plugin marketplace.", icon: Layout },
    { title: "Products & Inventory", description: "Flexible catalog schemas supporting product variants, stock tracking, and automated inventory sync.", icon: Package },
    { title: "Payments & Checkout", description: "Direct payment gateway integrations with streamlined checkout flows optimized for speed.", icon: CreditCard },
    { title: "Orders & Fulfilment", description: "Fulfillment pipeline tracking order statuses and notifying customers.", icon: Truck },
    { title: "Customer Accounts", description: "Secure buyer portals for order history, saved addresses, and profile preferences.", icon: Users },
    { title: "Administration & Reporting", description: "Back-office management console for full control over catalog, orders, and customer data.", icon: ShieldCheck },
  ];

  const automationCapabilities = [
    { title: "WhatsApp & Lead Qualification", description: "Automated inquiry capture, qualification, and routing via official WhatsApp Cloud API.", icon: MessageSquare },
    { title: "Document Processing", description: "Automated document parsing, OCR extraction, and interactive verification.", icon: FileText },
    { title: "CRM & Data Routing", description: "Instant webhook enrichment connecting customer inquiries directly into your internal database.", icon: UserPlus },
    { title: "Inventory & ERP Synchronisation", description: "Bi-directional stock level synchronization across storefronts and ERP backend databases.", icon: Repeat },
    { title: "Invoicing & Payment Status", description: "Instant invoice generation, PDF delivery, and payment status Webhook tracking.", icon: CreditCard },
    { title: "Booking & Reminders", description: "Automated calendar availability, client reminders, and confirmation workflows.", icon: Calendar },
  ];

  const currentCapabilities = activeTab === "ecommerce" ? ecommerceCapabilities : automationCapabilities;

  return (
    <section id="services" className="relative overflow-hidden py-16 md:py-20 lg:py-28 border-b border-slate-200/80 bg-gradient-to-b from-purple-50/40 via-white to-slate-50/30">
      {/* Ambient Radial Top Glow */}
      <div className="absolute inset-0 pointer-events-none ambient-glow-top" />

      {/* Decorative Floating Orbs for Visual Depth */}
      <div className="absolute top-16 right-[15%] w-[280px] h-[280px] rounded-full bg-gradient-to-br from-purple-400/8 to-indigo-400/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-blue-400/6 to-purple-300/5 blur-3xl pointer-events-none" />

      <EditorialContainer className="relative space-y-16">
        {/* Editorial Split Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Switcher, Copy, CTAs, Trust Line */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* 1. Premium Service Switcher */}
            <div className="flex justify-start">
              <div
                ref={tabListRef}
                role="tablist"
                aria-label="Core Agency Capabilities"
                className="inline-flex items-center rounded-full bg-slate-100/80 p-1 border border-slate-200/60 shadow-sm backdrop-blur-sm"
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
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 ${
                    activeTab === "ecommerce"
                      ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <ShoppingBag className={`h-4 w-4 transition-colors duration-300 ${
                    activeTab === "ecommerce" ? "text-purple-600" : "text-slate-400"
                  }`} />
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
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    activeTab === "automations"
                      ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-900/5"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Cpu className={`h-4 w-4 transition-colors duration-300 ${
                    activeTab === "automations" ? "text-blue-600" : "text-slate-400"
                  }`} />
                  Business Automations
                </button>
              </div>
            </div>

            {/* 2. Dynamic Eyebrow, H1 Headline & Description */}
            {activeTab === "ecommerce" ? (
              <div className="space-y-5 animate-fade-in-up" key="ecom-copy">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-[11px] font-mono text-purple-700 font-semibold uppercase tracking-widest">
                  <Sparkles className="h-3 w-3 text-purple-500" />
                  Custom Commerce Engineering
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                  Your business is unique.
                  <br />
                  <span className="bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Your store should be too.</span>
                </h1>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-lg">
                  We build complete e-commerce applications from scratch—storefront, admin panel, inventory, payments, and order workflows—engineered around how your business actually runs.
                </p>
              </div>
            ) : (
              <div className="space-y-5 animate-fade-in-up" key="auto-copy">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[11px] font-mono text-blue-700 font-semibold uppercase tracking-widest">
                  <Zap className="h-3 w-3 text-blue-500" />
                  Business Automation
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                  Stop doing manually
                  <br />
                  <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">what software can handle.</span>
                </h1>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-lg">
                  We connect WhatsApp, CRM, documents, and internal operations into reliable automated workflows—with human review built in where decisions require judgement.
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

          {/* Right Column: E-commerce Video Deck or Automation Visual Card */}
          <div className="lg:col-span-6 py-4 lg:py-8">
            <div id="panel-ecommerce" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
              {activeTab === "ecommerce" ? (
                <div className="animate-fade-in-up">
                  <VideoShowcaseDeck />
                </div>
              ) : (
                /* Premium Automation Pipeline Flow Visual */
                <div className="animate-fade-in-up relative">
                  {/* Atmospheric blue glow behind the card */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full bg-gradient-to-br from-blue-500/15 via-indigo-400/10 to-cyan-500/15 blur-3xl" />
                  </div>

                  <div className="relative rounded-[24px] bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-700/50 p-6 sm:p-8 space-y-6 shadow-[0_20px_60px_-12px_rgba(37,99,235,0.25),0_8px_24px_-8px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Subtle grid texture overlay */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    {/* Header bar */}
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <Workflow className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono text-blue-400 font-semibold uppercase tracking-wider block">Kyzor Automation</span>
                          <span className="text-xs text-slate-400 font-medium">Live workflow demonstration</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">ACTIVE</span>
                      </div>
                    </div>

                    {/* Pipeline flow — vertical connected steps */}
                    <div className="relative space-y-1">
                      {[
                        { step: 1, label: "Lead Form Submitted", detail: "Website form → webhook trigger", icon: Zap, color: "from-blue-500 to-blue-600", iconBg: "bg-blue-500/20", textColor: "text-blue-400" },
                        { step: 2, label: "WhatsApp Auto-Response", detail: "Instant confirmation sent via API", icon: MessageSquare, color: "from-emerald-500 to-emerald-600", iconBg: "bg-emerald-500/20", textColor: "text-emerald-400" },
                        { step: 3, label: "Qualification & Scoring", detail: "Budget, timeline, scope evaluated", icon: Shield, color: "from-purple-500 to-purple-600", iconBg: "bg-purple-500/20", textColor: "text-purple-400" },
                        { step: 4, label: "CRM Record Created", detail: "Contact + deal inserted in database", icon: Database, color: "from-indigo-500 to-indigo-600", iconBg: "bg-indigo-500/20", textColor: "text-indigo-400" },
                        { step: 5, label: "Team Notification", detail: "Slack + email alert to sales", icon: Zap, color: "from-amber-500 to-amber-600", iconBg: "bg-amber-500/20", textColor: "text-amber-400" },
                        { step: 6, label: "Human Review Gate", detail: "High-value leads escalated instantly", icon: Users, color: "from-rose-500 to-rose-600", iconBg: "bg-rose-500/20", textColor: "text-rose-400" },
                      ].map((item, i) => {
                        const StepIcon = item.icon;
                        return (
                          <div key={item.step} className="relative flex items-center gap-4 group">
                            {/* Vertical connector line */}
                            {i < 5 && (
                              <div className="absolute left-[19px] top-[40px] w-px h-[calc(100%)] bg-gradient-to-b from-slate-600 to-slate-700/50" />
                            )}

                            {/* Step node */}
                            <div className={`relative z-10 w-10 h-10 rounded-xl ${item.iconBg} border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <StepIcon className={`h-4 w-4 ${item.textColor}`} />
                            </div>

                            {/* Step content */}
                            <div className="flex-1 py-2.5 flex items-center justify-between rounded-xl px-3 bg-slate-800/40 border border-slate-700/30 group-hover:bg-slate-800/60 group-hover:border-slate-600/40 transition-all duration-300">
                              <div>
                                <span className="text-sm font-semibold text-slate-200 block leading-tight">{item.label}</span>
                                <span className="text-[11px] text-slate-500 font-mono">{item.detail}</span>
                              </div>
                              <span className={`text-[10px] font-mono font-bold ${item.textColor} bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700/60 hidden sm:inline`}>
                                STEP {item.step}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom tech stack tags */}
                    <div className="relative flex flex-wrap gap-2 pt-2 border-t border-slate-700/40">
                      {["WhatsApp Cloud API", "Webhooks", "Validation Guards", "Human Escalation"].map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-[10px] font-mono text-slate-400"
                        >
                          <CheckCircle2 className="h-3 w-3 text-blue-500" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 1. Capabilities Two-Column Editorial Layout */}
        <div id="service-capabilities" className="pt-12 border-t border-slate-200/80 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Eyebrow, H2, Short Explanation */}
            <div className="md:col-span-5 space-y-4">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-[12px] font-semibold">
                {activeTab === "ecommerce" ? "System Capabilities" : "Workflow Capabilities"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeTab === "ecommerce"
                  ? "Storefront & Back-Office Capabilities"
                  : "Automation & Integration Capabilities"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeTab === "ecommerce"
                  ? "Tailored software modules engineered specifically for your commercial catalog, customer workflows, and back-office management."
                  : "Reliable automated workflows designed to reduce repetitive tasks and route business operations automatically."}
              </p>
            </div>

            {/* Right Column: 6 Borderless Rows separated by thin horizontal lines */}
            <div className="md:col-span-7 divide-y divide-slate-200/80">
              {currentCapabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.title} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-[12px] bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 shrink-0 mt-0.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">{cap.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Collapsed Accessible Technical Architecture Disclosure */}
        <div className="pt-4 text-center">
          <details className="group inline-block text-left max-w-4xl w-full">
            <summary className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] border border-slate-200/90 bg-white text-xs font-mono font-semibold text-slate-700 hover:text-purple-700 hover:border-purple-300 shadow-xs transition-all mx-auto select-none min-h-[44px]">
              <span>View technical architecture</span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>

            <div className="mt-6 rounded-[22px] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-slate-500 ml-2 font-semibold">
                    {activeTab === "ecommerce" ? "kyzor-custom-engine-architecture.schema" : "kyzor-automation-pipeline.workflow"}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-[8px] border border-purple-200 font-bold uppercase">
                  Live Schema Architecture
                </span>
              </div>

              {activeTab === "ecommerce" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Custom Storefront</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Fast Navigation</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                      <Server className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Edge API Gateway</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Strict Data Validation</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                      <Database className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Postgres Database</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Direct Control</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                      <Shield className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Owner Admin Portal</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Orders & Inventory</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                      <Zap className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Webhook Trigger</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Form / Event Listener</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                      <Workflow className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Router & Transformation</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Automated Parsing</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">Automated Logic Engine</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Human Escalation Guard</span>
                  </div>

                  <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 space-y-2 text-center">
                    <div className="w-8 h-8 rounded-[8px] bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-900 block">WhatsApp / CRM Action</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Instant Dispatch</span>
                  </div>
                </div>
              )}
            </div>
          </details>
        </div>

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
