import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Kyzor Terms of Service for agency software development services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-8 text-zinc-300">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-zinc-500">Effective Date: July 2026 | Kyzor (https://kyzor.online)</p>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Scope of Services</h2>
        <p className="text-sm leading-relaxed">
          Kyzor provides bespoke software development services, specifically custom e-commerce applications built from scratch and business automation workflows (including WhatsApp integrations, AI agents, document processing, and CRM pipelines).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. Intellectual Property & Code Ownership</h2>
        <p className="text-sm leading-relaxed">
          Upon final project delivery and settlement of agreed service fees, all client-specific custom source code, application architectures, and assets created under a formal statement of work belong to the client.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Portfolio & Concept Projects</h2>
        <p className="text-sm leading-relaxed">
          Demonstration assets and concept benchmarks published on our website (https://kyzor.online) marked as Demo or Concept represent architectural capabilities engineered by Kyzor to showcase technical capabilities.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Contact Information</h2>
        <p className="text-sm leading-relaxed">
          For legal or service inquiries, reach out to <a href="mailto:contact@kyzor.online" className="text-purple-400 hover:underline">contact@kyzor.online</a>.
        </p>
      </section>
    </div>
  );
}
