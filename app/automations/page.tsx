import Link from "next/link";
import { ArrowRight, MessageSquare, TrendingUp, Cog, Bot, ArrowRightCircle, UserCheck, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Automations & AI Workflows | Kyzor",
  description:
    "Custom automation for the way your business works. Tell us what your team repeatedly does, and Kyzor builds a reliable system that handles those steps automatically.",
};

export default function AutomationsPage() {
  const categories = [
    {
      title: "Customer Communication",
      description: "Automate instant WhatsApp notifications, transactional emails, and multi-channel customer updates while maintaining personal touchpoints.",
      icon: MessageSquare,
    },
    {
      title: "Sales & Leads",
      description: "Capture, qualify, and route incoming leads instantly to your sales team with automated CRM updates and custom follow-up triggers.",
      icon: TrendingUp,
    },
    {
      title: "Business Operations",
      description: "Streamline repetitive document parsing, inventory sync, internal approvals, and cross-platform database synchronization.",
      icon: Cog,
    },
    {
      title: "AI Agents",
      description: "Deploy autonomous AI agents, chatbots, and voice assistants that answer complex inquiries and hand off sensitive decisions to human staff.",
      icon: Bot,
    },
  ];

  const workflows = [
    {
      title: "New Lead Follow-up",
      flow: ["Form Submission", "WhatsApp Alert", "CRM Intake", "Sales Notification"],
      note: "Automates initial 60-second response; routes high-value inquiries to human representatives.",
    },
    {
      title: "Customer Support",
      flow: ["Inquiry Received", "AI Sentiment Analysis", "Instant FAQ Answer", "Escalate if Complex"],
      note: "Answers routine queries automatically; escalates complex cases to human support staff.",
    },
    {
      title: "Order Updates",
      flow: ["Fulfillment Trigger", "Tracking Generation", "SMS / Email Dispatch", "Database Logged"],
      note: "Keeps buyers informed at every stage with zero manual status updates required.",
    },
    {
      title: "Appointment Booking",
      flow: ["Slot Selected", "Calendar Hold", "Confirmation Sent", "SMS Reminder"],
      note: "Eliminates double-booking and reduces no-shows with automated reminder sequences.",
    },
    {
      title: "Email Processing",
      flow: ["Inbox Monitoring", "Attachment OCR", "Data Extraction", "Database Insert"],
      note: "Parses invoices and contracts automatically with human verification on exceptions.",
    },
    {
      title: "Business Reporting",
      flow: ["Daily Schedule", "Cross-Platform Query", "Metric Aggregation", "Slack / Email Digest"],
      note: "Compiles operational metrics and executive summaries on a recurring schedule.",
    },
  ];

  const processSteps = [
    { number: "01", title: "Process Audit & Mapping", description: "We analyze your manual tasks and pinpoint repeatable steps ready for software automation." },
    { number: "02", title: "Workflow Architecture Design", description: "We map out trigger conditions, API webhooks, data transformation logic, and human handoff rules." },
    { number: "03", title: "Custom Integration Engineering", description: "We code reliable automation pipelines connecting your communications, databases, and AI models." },
    { number: "04", title: "Validation & Exception Testing", description: "We test edge cases, error fallbacks, and notification triggers to ensure zero data loss." },
    { number: "05", title: "Deployment & Monitoring", description: "We activate your automations and provide continuous monitoring and maintenance." },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block text-xs font-mono uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded">
            Operational Business Automations
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Custom automation for the way your business works.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tell us what your team repeatedly does. We design and build a reliable system that handles those steps automatically.
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

      {/* 2. Four Category Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-700">Automation Categories</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Key Operational Areas We Streamline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Six Example Workflow Cards (Short Arrow-Based Flows) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-blue-700">Example Workflows</h2>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            See How Custom Automation Pipelines Work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <div
              key={wf.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">{wf.title}</h3>

                {/* Arrow Flow Representation */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-700">
                  {wf.flow.map((step, idx) => (
                    <span key={step} className="inline-flex items-center gap-1.5">
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200 text-slate-800">
                        {step}
                      </span>
                      {idx < wf.flow.length - 1 && (
                        <ArrowRightCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600">
                <UserCheck className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{wf.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mandatory Statement Line Banner */}
      <section className="border-y border-slate-200 bg-slate-100/70 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-relaxed">
            “If a process follows repeatable steps, there is a good chance Kyzor can automate it.”
          </p>
          <p className="text-xs font-mono text-slate-600">
            We focus on practical, high-impact automations with built-in human verification for sensitive decisions.
          </p>
        </div>
      </section>

      {/* 5. Kyzor Process & Final CTA */}
      <section className="border-t border-slate-200 bg-slate-100/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-blue-700">Engineering Process</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              How We Build Your Business Automations
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.number} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-sm">
                <span className="text-2xl font-mono font-extrabold text-blue-700">{step.number}</span>
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
            Ready to Automate Your Repetitive Workflows?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Schedule a technical consultation to review your team’s manual processes and map out custom automation solutions.
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
