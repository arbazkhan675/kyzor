import Link from "next/link";
import { FileText, Mail, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kyzor",
  description: "Terms of Service governing the use of Kyzor agency website and consultation requests.",
  alternates: {
    canonical: "https://www.kyzor.online/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-10">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="flex items-center gap-2 text-purple-700">
          <FileText className="h-6 w-6" />
          <span className="text-xs font-mono uppercase tracking-wider font-semibold">Legal Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Terms of Service</h1>
        <p className="text-xs font-mono text-slate-500">Last Updated: July 2026</p>
      </div>

      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">1. Informational Website Use</h2>
          <p>
            Welcome to Kyzor (https://www.kyzor.online). By accessing or browsing this website, you agree to comply with and be bound by these Terms of Service. This website is provided solely to present our custom software engineering capabilities, business automation services, interface demonstrations, and consultation scheduling mechanisms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">2. Separate Client Project Contracts</h2>
          <p>
            These website Terms of Service govern your informational use of this website only. Submitting a consultation form or requesting a project proposal does not create a binding development agreement or contractual relationship.
          </p>
          <p className="text-slate-600">
            All custom e-commerce applications, business automations, and engineering client engagements are governed exclusively by separate, formal Master Service Agreements (MSA), Statements of Work (SOW), or written client contracts signed by both parties prior to project commencement.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property Rights & System Demonstrations</h2>
          <p>
            All original content, branding, visual designs, brand artwork (`public/logo.png`), code architecture, and documentation published on this website are the exclusive intellectual property of Kyzor. Unauthorised reproduction, copying, or redistribution of our brand materials or site content without express written consent is prohibited.
          </p>
          <p className="text-slate-600">
            Interface demonstrations, workflow visualizations and system mockups displayed on this website illustrate Kyzor’s design and engineering capabilities. They should not be interpreted as client projects or measured client outcomes unless explicitly stated.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">4. Website Availability & Service Disclaimers</h2>
          <p>
            This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied. While we strive to maintain uninterrupted website availability and accurate technical information, we do not guarantee continuous, error-free site operation.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability & Contact</h2>
          <p>
            To the fullest extent permitted by applicable law, Kyzor shall not be liable for any indirect, incidental, or consequential damages resulting from your use or inability to use this website.
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-2 mt-4 shadow-sm">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <Mail className="h-4 w-4 text-purple-700" />
              Questions Regarding Terms
            </div>
            <p className="text-xs text-slate-600">
              If you have any questions regarding these Terms of Service, please contact us at:{" "}
              <a href="mailto:kyzorcommerce@gmail.com" className="text-purple-700 hover:underline font-semibold">
                kyzorcommerce@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
