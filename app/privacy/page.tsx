/*
  OWNER REVIEW REQUIRED:
  Please have qualified legal counsel review this Privacy Policy text prior to commercial operations.
*/

import Link from "next/link";
import { ShieldCheck, Mail, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kyzor",
  description: "Privacy Policy and data processing terms for Kyzor agency website and consultation bookings.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-10">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="border-b border-zinc-800 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-purple-400">
          <ShieldCheck className="h-6 w-6" />
          <span className="text-xs font-mono uppercase tracking-wider">Legal Notice</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs font-mono text-zinc-400">Last Updated: July 2026</p>
      </div>

      <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
          <p>
            When you interact with Kyzor (https://kyzor.online) or submit a booking request through our consultation form, we collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
            <li><strong className="text-zinc-200">Contact Details:</strong> Your full name, business email address, and company name.</li>
            <li><strong className="text-zinc-200">Project Requirements:</strong> Selected project type (custom e-commerce application, business automation, or integrated system), estimated budget range, and detailed project overview message.</li>
            <li><strong className="text-zinc-200">Technical Metadata:</strong> IP address and submission timestamp for security logging and rate-limiting enforcement.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
          <p>
            We process collected consultation data strictly for business operational purposes:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
            <li>Evaluating your technical project requirements and determining engineering scope.</li>
            <li>Contacting you to schedule and conduct consultation sessions.</li>
            <li>Responding to direct inquiries submitted via email or contact forms.</li>
            <li>Preventing automated spam submissions and maintaining website infrastructure security.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Data Processors & Infrastructure</h2>
          <p>
            Your information is handled securely using trusted enterprise cloud service providers operating under strict confidentiality and security standards:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-zinc-400">
            <li><strong className="text-zinc-200">Database & Authentication:</strong> Supabase (PostgreSQL database with Row Level Security enabled).</li>
            <li><strong className="text-zinc-200">Transactional Email:</strong> Resend API for notification dispatching.</li>
            <li><strong className="text-zinc-200">Hosting Infrastructure:</strong> Vercel edge deployment network.</li>
          </ul>
          <p>We do not sell, rent, trade, or publicly disclose your personal information to third-party advertisers or brokers.</p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Data Retention</h2>
          <p>
            Consultation submissions are retained in our secure database for as long as necessary to evaluate project proposals, maintain client records, or fulfill ongoing legal and accounting requirements. Outdated or inactive inquiry records are periodically archived or permanently deleted.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Your Rights & Contact Information</h2>
          <p>
            You have the right to request access to the personal data we hold about you, request corrections, or ask for the erasure of your consultation record.
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-2 mt-4">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Mail className="h-4 w-4 text-purple-400" />
              Privacy Inquiries Contact Method
            </div>
            <p className="text-xs text-zinc-400">
              For any privacy-related requests or data inquiries, please email us directly at:{" "}
              <a href="mailto:contact@kyzor.online" className="text-purple-400 hover:underline">
                contact@kyzor.online
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
