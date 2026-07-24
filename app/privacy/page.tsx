import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kyzor Privacy Policy regarding data processing and consultation inquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-8 text-zinc-300">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-zinc-500">Effective Date: July 2026 | Kyzor (https://kyzor.online)</p>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
        <p className="text-sm leading-relaxed">
          Kyzor collects information you provide directly to us when filling out our consultation booking form, including your name, email address, company name, project focus, estimated budget, and project description.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
        <p className="text-sm leading-relaxed">
          We use the information we collect solely to review your technical requirements, respond to your inquiries, schedule discovery sessions, and discuss custom software engineering proposals. We do not sell, rent, or trade your contact information to third parties.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Data Security & Storage</h2>
        <p className="text-sm leading-relaxed">
          Consultation submissions are stored securely in PostgreSQL databases with Row Level Security (RLS) enabled. Access is restricted exclusively to authorized Kyzor engineering personnel.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Contact Us</h2>
        <p className="text-sm leading-relaxed">
          If you have questions regarding this Privacy Policy, please contact us at <a href="mailto:contact@kyzor.online" className="text-purple-400 hover:underline">contact@kyzor.online</a>.
        </p>
      </section>
    </div>
  );
}
