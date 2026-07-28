import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Database, XCircle, MapPin, Instagram, UserCheck } from "lucide-react";
import { HeroTabSection } from "@/components/home/HeroTabSection";
import { EditorialContainer, EditorialSection, SectionIntro } from "@/components/ui/editorial";

export const revalidate = 60;

export default function HomePage() {
  const processSteps = [
    { number: "01", title: "Discovery & Strategy", description: "We analyze your business workflows, operational bottlenecks, and technology goals to define a precise engineering roadmap." },
    { number: "02", title: "Architecture & Design", description: "We model custom database schemas, API contracts, and user flows designed specifically around your business operations." },
    { number: "03", title: "Custom Engineering", description: "We write complete applications and automations from scratch using modern, high-performance tech stacks." },
    { number: "04", title: "Testing & Deployment", description: "We validate system performance, security boundaries, and automated workflows before deploying to edge infrastructure." },
    { number: "05", title: "Support & Iteration", description: "We provide ongoing system maintenance, feature extensions, and performance monitoring as your business scales." },
  ];

  const whyKyzorColumns = [
    {
      title: "Direct Engineer Communication",
      description: "Work directly with Kyzor's founder and principal engineer who architects and builds your code—no account managers or middle layers.",
      icon: UserCheck,
    },
    {
      title: "Built Around Your Operations",
      description: "Software engineered around how your business actually operates, rather than forcing your workflows into pre-set platform templates.",
      icon: Zap,
    },
    {
      title: "Clear Ownership & Support",
      description: "Source-code terms defined clearly in your project agreement with ongoing technical maintenance and post-launch support.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-0 pb-16">
      {/* 1. Hero with accessible E-commerce / Automations split layout & borderless capabilities */}
      <HeroTabSection />

      {/* 2. Surface 1: Project Fit (Single Lightly Tinted Two-Column Band) */}
      <EditorialSection>
        <EditorialContainer>
          <div className="rounded-[22px] border border-slate-200/80 bg-slate-100/70 p-8 sm:p-12 space-y-8 shadow-xs">
            <div className="text-center space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-widest text-purple-700 font-semibold">Project Qualification</h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Who Kyzor Is For
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left: Good Fit */}
              <div className="space-y-4 border-b border-slate-300/70 pb-8 md:border-b-0 md:pb-0 md:border-r md:border-slate-300/70 md:pr-8 lg:pr-12">
                <div className="flex items-center gap-2.5 text-purple-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <h3 className="text-lg font-bold text-slate-900">Kyzor is a good fit when:</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                    <span>Your workflows cannot be handled cleanly by standard templates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                    <span>You need custom integrations, administrative tools or database logic.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                    <span>Your team repeatedly transfers information between systems.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2 shrink-0" />
                    <span>You want direct communication with the engineer building your application.</span>
                  </li>
                </ul>
              </div>

              {/* Right: Standard Platform Fit */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 text-slate-600">
                  <XCircle className="h-5 w-5 shrink-0 text-slate-400" />
                  <h3 className="text-lg font-bold text-slate-900">A standard platform may be better when:</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>You only need a basic online store.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>You want a do-it-yourself website within a few days.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                    <span>Your requirements are already handled by an existing plug-and-play tool.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 3. Process Section: Connected Timeline */}
      <EditorialSection className="bg-white border-y border-slate-200/80">
        <EditorialContainer className="space-y-12">
          <SectionIntro
            eyebrow="Our Method"
            title="Connected Engineering Process"
            description="A clear 5-stage timeline from initial architecture modeling to production launch and post-deployment support."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {processSteps.map((step, idx) => (
              <div key={step.number} className="space-y-3 relative border-t-2 border-purple-600 pt-4">
                <span className="text-xs font-mono font-bold text-purple-700 block">{step.number}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 4. Why Kyzor: Three Borderless Editorial Columns */}
      <EditorialSection>
        <EditorialContainer className="space-y-12">
          <SectionIntro
            eyebrow="Why Kyzor"
            title="Three Principles of Custom Engineering"
            description="Direct technical engagement without commercial friction or rigid platform lock-in."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
            {whyKyzorColumns.map((col, idx) => {
              const Icon = col.icon;
              return (
                <div key={col.title} className={`space-y-3 ${idx > 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
                  <div className="w-9 h-9 rounded-[12px] bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{col.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{col.description}</p>
                </div>
              );
            })}
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 5. Surface 2: Restrained Founder Strip */}
      <EditorialSection className="pt-0">
        <EditorialContainer>
          <div className="rounded-[22px] border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                AK
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-base font-bold text-slate-900">Arbaz Khan</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-[12px] border border-purple-200 font-semibold">
                    Founder & Principal Engineer
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  Kyzor is a founder-led software studio. Arbaz leads system design and software delivery directly, collaborating with specialist engineers when additional domain expertise is required.
                </p>
                <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center sm:justify-start gap-1 pt-1">
                  <MapPin className="h-3 w-3 text-purple-600" />
                  Ahmedabad, Gujarat
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-[12px] border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 min-h-[44px] transition-colors"
              >
                About Kyzor
              </Link>
              <a
                href="https://instagram.com/kyzorcommerce"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-purple-700 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-[12px] min-h-[44px] transition-colors"
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                @kyzorcommerce
              </a>
            </div>
          </div>
        </EditorialContainer>
      </EditorialSection>

      {/* 6. Surface 3: Final Dark CTA Panel */}
      <EditorialSection className="pt-0">
        <EditorialContainer>
          <div className="rounded-[22px] border border-slate-800 bg-slate-900 p-10 sm:p-14 text-center space-y-6 shadow-2xl text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
              Have a workflow or commerce requirement that standard tools cannot handle?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Request a free 20-minute discovery call to discuss the requirement, possible architecture and practical next steps.
            </p>
            <div>
              <Link
                href="/consultation"
                className="btn-gleam inline-flex items-center justify-center rounded-[12px] bg-accent-gradient px-8 py-4 text-sm font-semibold text-white shadow-xl min-h-[44px] hover:scale-[1.02] active:scale-[0.98] transition-all"
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
