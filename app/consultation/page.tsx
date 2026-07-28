"use client";

import { useState, useTransition, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitConsultationAction } from "@/app/actions/consultation";
import { Loader2, CheckCircle2, AlertCircle, Calendar, ShieldCheck, ArrowLeft, MessageSquare, PhoneCall, Clock, Globe } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { trackEvent } from "@/lib/analytics/track";

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project_type: "ecommerce",
    budget: "Not sure yet",
    contact_preference: "whatsapp",
    message: "",
    consent: false,
    honeypot: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    if (searchParams) {
      setFormData((prev) => ({
        ...prev,
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
      }));
    }
  }, [searchParams]);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<string | null>(null);

  const handleFormFocus = () => {
    trackEvent("consultation_form_started");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setServerError(null);

    if (!formData.consent) {
      setFieldErrors({ consent: "You must consent to be contacted regarding your consultation request." });
      trackEvent("consultation_form_failed", { error: "consent_missing" });
      return;
    }

    startTransition(async () => {
      const enrichedMessage = `[Preferred Contact: ${formData.contact_preference.toUpperCase()}]\n\n${formData.message}`;

      const res = await submitConsultationAction({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        project_type: formData.project_type as any,
        budget: formData.budget || undefined,
        message: enrichedMessage,
        consent: formData.consent as true,
        honeypot: formData.honeypot || undefined,
        utm_source: formData.utm_source || undefined,
        utm_medium: formData.utm_medium || undefined,
        utm_campaign: formData.utm_campaign || undefined,
      });

      if (res.error) {
        setServerError(res.error);
        trackEvent("consultation_form_failed", { error: res.error });
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors);
        }
      } else if (res.success) {
        trackEvent("consultation_form_submitted");
        setSuccessResult("Thank you! Our engineering team will review your project details and respond within 1 business day.");
      }
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full font-semibold">
            <Calendar className="h-3.5 w-3.5" />
            Discovery Request
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Response within 1 business day
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Request a Free Consultation
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Discuss your custom e-commerce application or business automation requirements directly with our senior product engineers.
        </p>

        {/* Discovery Call Guarantee Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center space-y-1 shadow-xs">
            <Clock className="h-4 w-4 text-purple-700 mx-auto" />
            <span className="text-[11px] font-bold text-slate-900 block">Free 20-Min Call</span>
            <span className="text-[10px] text-slate-500 block">Technical Discovery</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center space-y-1 shadow-xs">
            <ShieldCheck className="h-4 w-4 text-purple-700 mx-auto" />
            <span className="text-[11px] font-bold text-slate-900 block">No Obligation</span>
            <span className="text-[10px] text-slate-500 block">Clear Scope Review</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center space-y-1 shadow-xs">
            <Calendar className="h-4 w-4 text-purple-700 mx-auto" />
            <span className="text-[11px] font-bold text-slate-900 block">1 Business Day</span>
            <span className="text-[10px] text-slate-500 block">Guaranteed Response</span>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center space-y-1 shadow-xs">
            <Globe className="h-4 w-4 text-purple-700 mx-auto" />
            <span className="text-[11px] font-bold text-slate-900 block">India & Global</span>
            <span className="text-[10px] text-slate-500 block">Projects Welcome</span>
          </div>
        </div>
      </div>

      {/* Instant WhatsApp Connect Helper Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-emerald-900">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900">Prefer Instant Communication?</h3>
            <p className="text-xs text-emerald-800 leading-snug">Connect directly with our engineering lead on WhatsApp for quick project inquiries.</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Kyzor%20Team,%20I'd%20like%20to%20request%20a%20free%20consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_clicked")}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 shadow-sm transition-all shrink-0"
        >
          <MessageSquare className="h-4 w-4" />
          Chat on WhatsApp
        </a>
      </div>

      {/* Success View */}
      {successResult ? (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center space-y-6 animate-in fade-in duration-200 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Request Submitted Successfully!</h2>
            <p className="text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">{successResult}</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setSuccessResult(null);
                setFormData((prev) => ({ ...prev, message: "", consent: false }));
              }}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        /* Consultation Form */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg">
          {serverError && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Submission Error</p>
                <p>{serverError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-6" noValidate>
            {/* Hidden Honeypot Field for Bot Protection */}
            <div className="hidden sr-only" aria-hidden="true">
              <label htmlFor="website_hp">Do not fill this out</label>
              <input
                id="website_hp"
                name="honeypot"
                type="text"
                tabIndex={-1}
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full rounded-lg bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    fieldErrors.name ? "border-red-500" : "border-slate-200"
                  }`}
                />
                {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Business Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="aarav@company.in"
                  className={`w-full rounded-lg bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    fieldErrors.email ? "border-red-500" : "border-slate-200"
                  }`}
                />
                {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Company / Business Name */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Company / Business Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Nexus Tech India Pvt Ltd"
                  className={`w-full rounded-lg bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    fieldErrors.company ? "border-red-500" : "border-slate-200"
                  }`}
                />
                {fieldErrors.company && <p className="text-xs text-red-600">{fieldErrors.company}</p>}
              </div>

              {/* Phone / WhatsApp */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-lg bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    fieldErrors.phone ? "border-red-500" : "border-slate-200"
                  }`}
                />
                {fieldErrors.phone && <p className="text-xs text-red-600">{fieldErrors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Project Focus */}
              <div className="space-y-2">
                <label htmlFor="project_type" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Primary Project Focus *
                </label>
                <select
                  id="project_type"
                  name="project_type"
                  required
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="ecommerce">Custom E-commerce Application</option>
                  <option value="automation">Business Automations & AI Workflows</option>
                  <option value="both">Both E-commerce & Automations</option>
                  <option value="not_sure">Not Sure / Needs Engineering Advice</option>
                </select>
                {fieldErrors.project_type && <p className="text-xs text-red-600">{fieldErrors.project_type}</p>}
              </div>

              {/* Budget Range Selector */}
              <div className="space-y-2">
                <label htmlFor="budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Estimated Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full rounded-lg bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="Under ₹50,000 / $600">Under ₹50,000 / $600</option>
                  <option value="₹50,000 - ₹1,50,000 / $600 - $1,800">₹50,000 - ₹1,50,000 / $600 - $1,800</option>
                  <option value="₹1,50,000 - ₹5,00,000 / $1,800 - $6,000">₹1,50,000 - ₹5,00,000 / $1,800 - $6,000</option>
                  <option value="₹5,00,000+ / $6,000+">₹5,00,000+ / $6,000+</option>
                </select>
                {fieldErrors.budget && <p className="text-xs text-red-600">{fieldErrors.budget}</p>}
              </div>
            </div>

            {/* Preferred Communication Channel */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Preferred Communication Channel
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                  { value: "email", label: "Email", icon: Calendar },
                  { value: "phone", label: "Phone Call", icon: PhoneCall },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = formData.contact_preference === mode.value;
                  return (
                    <button
                      key={mode.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, contact_preference: mode.value })}
                      className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? "bg-purple-50 border-purple-600 text-purple-700 shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Summary */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Project Summary & Requirements (30-3000 chars) *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your operational bottleneck, custom e-commerce goals, or automation workflow requirements..."
                className={`w-full rounded-lg bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                  fieldErrors.message ? "border-red-500" : "border-slate-200"
                }`}
              />
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>Min 30 characters</span>
                <span>{formData.message.length} / 3000</span>
              </div>
              {fieldErrors.message && <p className="text-xs text-red-600">{fieldErrors.message}</p>}
            </div>

            {/* Consent Checkbox */}
            <div className="space-y-2 pt-2">
              <label htmlFor="consent" className="flex items-start gap-3 text-xs text-slate-700 cursor-pointer">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 bg-slate-50 text-purple-700 focus:ring-purple-600 h-4 w-4 shrink-0"
                />
                <span className="leading-relaxed">
                  I consent to Kyzor storing my submission details and contacting me regarding this free consultation request. *
                </span>
              </label>
              {fieldErrors.consent && <p className="text-xs text-red-600">{fieldErrors.consent}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="btn-gleam w-full inline-flex items-center justify-center rounded-xl bg-accent-gradient py-3.5 text-sm font-semibold text-white shadow-xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Request Free Consultation
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

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs font-mono">Loading consultation form...</div>}>
      <ConsultationFormContent />
    </Suspense>
  );
}
