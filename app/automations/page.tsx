import Link from "next/link";
import { ArrowRight, Cpu, MessageSquare, Mail, Bot, PhoneCall, Workflow, FileText, Network, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Automations & AI Workflows",
  description:
    "Kyzor engineers custom business automations including WhatsApp workflows, email automation, AI chatbots, voice assistants, lead/CRM workflows, document processing, and operational integrations.",
};

const automationServices = [
  {
    title: "WhatsApp Workflows",
    icon: MessageSquare,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Automated customer inquiry handling, order updates, interactive button menus, and 24/7 lead qualification via official WhatsApp Cloud API.",
  },
  {
    title: "Email Automation",
    icon: Mail,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Event-triggered transactional email pipelines, drip sequences, behavioral follow-ups, and automated customer onboarding emails.",
  },
  {
    title: "AI Chatbots & Agents",
    icon: Bot,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Intelligent autonomous agents trained on your business knowledge base capable of resolving complex support tickets and handling multi-step actions.",
  },
  {
    title: "Voice Assistants",
    icon: PhoneCall,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "AI-driven conversational voice agents for incoming call handling, appointment scheduling, and automated outbound phone verification.",
  },
  {
    title: "Lead / CRM Workflows",
    icon: Workflow,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    description: "Automatic lead routing, score enrichment, multi-channel task assignment, and CRM synchronization with zero manual entry.",
  },
  {
    title: "Document Processing",
    icon: FileText,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    description: "Automated OCR extraction, PDF parsing, invoice processing, and structured data insertion directly into your database or accounting system.",
  },
  {
    title: "Custom Operational Integrations",
    icon: Network,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "Bespoke API bridges connecting internal tools, legacy software, inventory systems, and third-party SaaS applications seamlessly.",
  },
];

export default function AutomationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300">
          <Cpu className="h-3.5 w-3.5" />
          <span>Operational Efficiency & AI Systems</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Business Automations & <span className="text-gradient">AI Workflows.</span>
        </h1>
        <p className="text-lg text-zinc-300 leading-relaxed">
          Eliminate manual tasks and bottleneck delays. We design and build custom autonomous workflows, AI agents, and system integrations tailored to your business operations.
        </p>
        <div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Discuss Your Automation Requirements
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {automationServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-4 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl ${service.bgColor} border ${service.borderColor} flex items-center justify-center ${service.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{service.description}</p>
              </div>
              <div className="pt-2 text-xs font-medium text-zinc-500 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                <span>Custom Built & Integrated</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">How We Implement Automations</h2>
          <p className="text-sm text-zinc-400">
            Every automation pipeline is built for high reliability, error handling, and privacy compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <span className="text-xs font-mono text-purple-400">Step 01</span>
            <h4 className="text-base font-bold text-white">Workflow Audit</h4>
            <p className="text-xs text-zinc-500">We map out your current manual processes, identify bottlenecks, and define precise automation triggers.</p>
          </div>
          <div className="space-y-2 border-l-2 border-blue-500 pl-4">
            <span className="text-xs font-mono text-blue-400">Step 02</span>
            <h4 className="text-base font-bold text-white">Custom Architecture</h4>
            <p className="text-xs text-zinc-500">We build secure webhook pipelines, API bridges, and AI agent logic tailored specifically to your tools.</p>
          </div>
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <span className="text-xs font-mono text-purple-400">Step 03</span>
            <h4 className="text-base font-bold text-white">Deployment & Monitoring</h4>
            <p className="text-xs text-zinc-500">We deploy to production infrastructure with automated error logging, retries, and fallback notifications.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-6 pt-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Automate Your Business Operations?</h2>
        <div>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform"
          >
            Book a Technical Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
