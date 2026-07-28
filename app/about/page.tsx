import Link from "next/link";
import { ArrowRight, MapPin, Instagram, Mail } from "lucide-react";
import type { Metadata } from "next";
import { EditorialContainer, EditorialSection, SectionIntro } from "@/components/ui/editorial";

export const metadata: Metadata = {
  title: "About Kyzor | Founder-Led Custom Software Studio",
  description: "Learn about Kyzor, a founder-led software engineering studio based in Ahmedabad, Gujarat, India, specializing in custom e-commerce applications and business automations.",
  alternates: {
    canonical: "https://www.kyzor.online/about",
  },
};

export default function AboutPage() {
  const workingStages = [
    {
      number: "01",
      title: "Understand the operation",
      description: "We analyze your exact commercial workflows, manual bottlenecks, and system requirements before proposing software architecture.",
    },
    {
      number: "02",
      title: "Design and build the system",
      description: "We write clean, high-performance code and custom schemas tailored specifically around how your business operates.",
    },
    {
      number: "03",
      title: "Launch, support and improve",
      description: "We validate, deploy, and maintain your application with direct engineer support and ongoing performance enhancements.",
    },
  ];

  const operatingPrinciples = [
    {
      title: "Business-first",
      description: "Every engineering decision is guided by your actual operational goals, commercial efficiency, and business outcomes rather than tech stack trends.",
    },
    {
      title: "Custom-built",
      description: "We engineer software from scratch without rigid template constraints, unnecessary marketplace plugins, or commercial platform cut overhead.",
    },
    {
      title: "Direct communication",
      description: "You work directly with Kyzor's founder and principal engineer who designs and writes your codebase—eliminating middle layers and miscommunication.",
    },
    {
      title: "Supported after launch",
      description: "We provide dedicated post-launch support, database monitoring, and ongoing system maintenance to keep your software running reliably.",
    },
  ];

  return (
    <div className="space-y-0 pb-16">
      {/* 1. Hero: Compact Two-Column Editorial Hero */}
      <EditorialSection className="border-b border-slate-200/80 bg-gradient-to-b from-purple-50/20 via-white to-slate-50/30 py-12 md:py-16 lg:py-20">
        <EditorialContainer>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Eyebrow, H1, Description */}
            <div className="md:col-span-7 space-y-4 text-left">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-[12px] font-semibold">
                Founder-led software studio
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Custom software, designed around how your business actually works.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Kyzor builds custom e-commerce applications and business automations for operations that cannot be handled cleanly by standard templates.
              </p>
            </div>

            {/* Right Column: Founder Badge */}
            <div className="md:col-span-5">
              <div className="rounded-[22px] border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                    AK
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Arbaz Khan</h2>
                    <p className="text-xs font-mono text-purple-700 font-semibold">Founder & Principal Engineer</p>
                    <p className="text-[11px] font-mono text-slate-500 flex items-center gap-1 pt-1">
                      <MapPin className="h-3 w-3 text-purple-600" />
                      Ahmedabad, Gujarat, India
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                  <a
                    href="https://instagram.com/kyzorcommerce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-pink-600 transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-pink-600" />
                    @kyzorcommerce
                  </a>
                  <a href="mailto:kyzorcommerce@gmail.com" className="inline-flex items-center gap-1.5 hover:text-purple-700 transition-colors">
                    <Mail className="h-4 w-4 text-purple-600" />
                    kyzorcommerce@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 2. Founder Story: Borderless Two-Column Section */}
      <EditorialSection className="bg-white">
        <EditorialContainer className="space-y-8">
          <SectionIntro
            eyebrow="Our Story"
            title="Engineered for Businesses Outgrowing Templates"
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="space-y-4">
              <p>
                Kyzor was founded to solve a common operational problem: growing businesses forcing their unique commerce workflows into rigid off-the-shelf templates and marketplace plugins that were never designed for their business model.
              </p>
              <p>
                We specialize exclusively in custom e-commerce applications, back-office administrative portals, and automated WhatsApp and CRM data pipelines built around how your organization actually operates.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                As a founder-led software studio based in Ahmedabad, Gujarat, India, Kyzor offers direct collaboration with the principal engineer designing and building your codebase. When specialized domain expertise is required for complex integrations, Kyzor collaborates directly with specialist engineers.
              </p>
              <p className="text-sm text-slate-600 font-medium">
                This direct engineering model ensures technical accountability, transparent pricing, and software tailored cleanly to your operational needs.
              </p>
            </div>
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 3. Working Model: Simple 3-Stage Sequence */}
      <EditorialSection className="border-y border-slate-200/80 bg-slate-50/50">
        <EditorialContainer className="space-y-12">
          <SectionIntro
            eyebrow="Working Model"
            title="How We Execute Projects"
            description="A simple 3-stage sequence focused on understanding requirements, engineering clean code, and maintaining long-term stability."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workingStages.map((stage) => (
              <div key={stage.number} className="border-t-2 border-purple-600 pt-4 space-y-2">
                <span className="text-xs font-mono font-bold text-purple-700 block">{stage.number}</span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{stage.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stage.description}</p>
              </div>
            ))}
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 4. Operating Principles: 4 Text Blocks with Top Borders */}
      <EditorialSection className="bg-white">
        <EditorialContainer className="space-y-12">
          <SectionIntro
            eyebrow="Principles"
            title="Our Operating Principles"
            description="Core engineering commitments that guide every project engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {operatingPrinciples.map((principle) => (
              <div key={principle.title} className="border-t border-slate-200/80 pt-6 space-y-2">
                <h3 className="text-base font-bold text-slate-900">{principle.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 5. CTA: Simple CTA Band */}
      <EditorialSection className="pt-0">
        <EditorialContainer>
          <div className="rounded-[22px] border border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-12 text-center space-y-6 text-white shadow-xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-snug">
              Discuss your requirements directly with Kyzor’s founder and principal engineer.
            </h2>
            <div>
              <Link
                href="/consultation"
                className="btn-gleam inline-flex items-center justify-center rounded-[12px] bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg min-h-[44px] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Request a Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </EditorialContainer>
      </EditorialSection>
    </div>
  );
}
