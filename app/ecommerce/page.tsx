import Link from "next/link";
import { ArrowRight, Layout, Package, CreditCard, Truck, Users, ShieldCheck, CheckCircle2, Repeat, Store, Building2, Sliders, Award, MapPin, BarChart3, Layers } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom E-commerce Applications | Kyzor",
  description:
    "A complete commerce application - designed, built and deployed for your business. Storefront, admin dashboard, payments, orders, inventory and deployment.",
};

export default function EcommercePage() {
  const capabilities = [
    {
      title: "Custom Storefront",
      description: "We build bespoke, ultra-fast buyer interfaces tailored to your brand without relying on generic themes or plugins.",
      icon: Layout,
    },
    {
      title: "Products & Inventory",
      description: "We engineer flexible catalog schemas supporting complex product variants, real-time stock levels, and automated inventory sync.",
      icon: Package,
    },
    {
      title: "Cart & Payments",
      description: "We integrate direct payment gateways with secure, frictionless checkouts engineered for maximum conversion rates.",
      icon: CreditCard,
    },
    {
      title: "Orders & Delivery",
      description: "We build automated fulfillment pipelines that track order statuses, generate shipping labels, and notify customers instantly.",
      icon: Truck,
    },
    {
      title: "Customer Accounts",
      description: "We create secure buyer portals for managing order history, saved addresses, reordering, and personal profile preferences.",
      icon: Users,
    },
    {
      title: "Admin Dashboard",
      description: "We deliver a comprehensive back-office management console for controlling products, orders, customers, and business settings.",
      icon: ShieldCheck,
    },
  ];

  const deliverables = [
    "Custom Design",
    "Frontend Storefront",
    "Backend Architecture",
    "Database System",
    "Admin Dashboard",
    "Domain Deployment",
    "Ongoing Maintenance",
  ];

  const optionalGrid = [
    { name: "Subscriptions & Recurring Billing", icon: Repeat },
    { name: "Multi-Vendor Marketplace", icon: Store },
    { name: "Wholesale & B2B Pricing", icon: Building2 },
    { name: "Product Customisation Engines", icon: Sliders },
    { name: "Loyalty & Rewards Programs", icon: Award },
    { name: "Multiple Location Inventory", icon: MapPin },
    { name: "Advanced Business Reports", icon: BarChart3 },
    { name: "Custom API & ERP Integrations", icon: Layers },
  ];

  const processSteps = [
    { number: "01", title: "Discovery & System Planning", description: "We analyze your catalog structure, operational workflows, and payment requirements." },
    { number: "02", title: "Bespoke UI & Database Design", description: "We design custom user interfaces and model scalable database schemas for your application." },
    { number: "03", title: "Full-Stack Custom Development", description: "We code your storefront, administrative back-office, and payment integrations from scratch." },
    { number: "04", title: "Testing & Security Audit", description: "We thoroughly test order flows, payment security, and data integrity before launch." },
    { number: "05", title: "Domain Launch & Support", description: "We deploy your custom application to your domain and provide ongoing maintenance." },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded">
            Custom E-commerce Engineering
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            A complete commerce application - designed, built and deployed for your business.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From product browsing and checkout to inventory, orders and administration, Kyzor builds the full system from scratch and launches it on your domain.
          </p>
          <div className="pt-4">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] transition-all focus-visible:ring-2 focus-visible:ring-purple-600"
            >
              Book a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Six Capability Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-purple-700">Core System Capabilities</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Everything Your E-commerce Application Requires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:border-purple-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{cap.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Compact Deliverables Strip */}
      <section className="border-y border-slate-200 bg-slate-100/70 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-600">Complete Deliverables</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {deliverables.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-purple-700" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Optional Functionality Icon Grid (Max 8 Items) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-purple-700">Optional Capabilities</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Tailored Functionality Built to Order
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {optionalGrid.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.name}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 text-center flex flex-col items-center justify-center shadow-sm hover:border-purple-300 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-800 leading-snug">{opt.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Five-Step Process & Final CTA */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-700">Process</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              How We Build Your Application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
                <span className="text-2xl font-mono font-extrabold text-purple-700">{step.number}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 sm:p-14 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready for a Custom E-commerce Application?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Talk with our engineers to discuss your catalog requirements, custom features, and project scope.
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
