import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Database, HeartHandshake, MapPin, Instagram, Linkedin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kyzor | Custom Engineering Studio",
  description:
    "Kyzor is a founder-led software studio based in Ahmedabad, India, building custom e-commerce applications from scratch and automated business workflows.",
  alternates: {
    canonical: "https://www.kyzor.online/about",
  },
};

export default function AboutPage() {
  const processStages = [
    { name: "Understand", description: "We analyze your business operations, workflows, catalog requirements, and technical goals." },
    { name: "Design", description: "We architect custom database schemas, API contracts, and user-centric interfaces." },
    { name: "Build", description: "We write clean, high-performance code from scratch without rigid template or platform lock-in." },
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
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded font-semibold">
            Software Studio Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Kyzor is a software studio that builds custom e-commerce applications and business automations.
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-purple-700 max-w-3xl mx-auto leading-snug pt-2">
            “Technology should adapt to the business - not force the business to adapt to a template.”
          </p>
        </div>
      </section>

      {/* 2. Founder Identity Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-3xl shrink-0 shadow-md">
              AK
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200 font-semibold">
                  Founder & Principal Engineer
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-1">Arbaz Khan</h2>
                <p className="text-xs font-mono text-slate-500 flex items-center justify-center md:justify-start gap-1 pt-1">
                  <MapPin className="h-3.5 w-3.5 text-purple-600" />
                  Ahmedabad, Gujarat, India
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Kyzor is a founder-led software studio operated by Arbaz Khan, collaborating with specialist engineers when a project requires additional domain expertise. Founded in Ahmedabad, India, Kyzor was established with a clear mission: to build custom software applications and automations that fit exact business operations without forcing clients into rigid platform templates or recurring plugin fees. With experience across full-stack Next.js development, PostgreSQL architecture, and API integration, Arbaz leads system design and software delivery directly.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href="https://instagram.com/kyzorcommerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl"
                >
                  <Instagram className="h-4 w-4 text-pink-600" />
                  @kyzorcommerce
                </a>
                <a
                  href="https://linkedin.com/company/kyzor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Five Process Stages */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-purple-700 font-semibold">Our Method</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Five Stages of Engineering Delivery
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {processStages.map((stage, idx) => (
            <div key={stage.name} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
              <span className="text-2xl font-mono font-extrabold text-purple-700">0{idx + 1}</span>
              <h3 className="text-lg font-bold text-slate-900">{stage.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{stage.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Four Core Differentiators */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-purple-700 font-semibold">Why Work With Us</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Four Kyzor Engineering Standards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 sm:p-14 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Build Your Custom Software Solution?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Request a free discovery call with our engineering team to review your technical goals and project scope.
          </p>
          <div>
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-4 text-base font-semibold text-white shadow-xl hover:scale-[1.02] transition-all"
            >
              Request a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
