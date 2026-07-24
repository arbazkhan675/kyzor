"use client";

import { useState } from "react";
import { submitConsultationAction } from "@/app/actions/consultation";
import { CheckCircle2, Loader2, Calendar, MessageSquare, Send } from "lucide-react";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project_type: "ecommerce" as "ecommerce" | "automation" | "both" | "other",
    budget: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitConsultationAction(formData);

    if (!result.success) {
      setError(result.error || "Failed to submit form.");
      setLoading(false);
    } else {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300">
          <Calendar className="h-3.5 w-3.5" />
          <span>Technical Discovery Session</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Book a <span className="text-gradient">Consultation.</span>
        </h1>
        <p className="text-base text-zinc-300 leading-relaxed">
          Tell us about your project requirements. Whether you need a custom e-commerce application built from scratch or business automations, our engineering team will get back to you within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Consultation Request Received</h2>
          <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. We have received your project details and will review your technical requirements promptly.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", email: "", company: "", project_type: "ecommerce", budget: "", message: "" });
              }}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 underline"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-xs font-medium text-red-400">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Your Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Email Address <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Optional"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Project Focus <span className="text-purple-400">*</span>
                </label>
                <select
                  value={formData.project_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      project_type: e.target.value as any,
                    })
                  }
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ecommerce">Custom E-commerce Application</option>
                  <option value="automation">Business Automations & AI Workflows</option>
                  <option value="both">Both E-commerce & Automations</option>
                  <option value="other">Other Custom Software Integration</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Estimated Investment Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select an estimated range (Optional)</option>
                <option value="$3,000 - $7,000">$3,000 - $7,000</option>
                <option value="$7,000 - $15,000">$7,000 - $15,000</option>
                <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                <option value="$30,000+">$30,000+</option>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Project Overview & Requirements <span className="text-purple-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your current bottleneck, desired features, integration endpoints, or target timeline..."
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-accent-gradient py-4 text-base font-semibold text-white shadow-xl shadow-purple-500/20 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Consultation Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
