"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { submitConsultationAction } from "@/app/actions/consultation";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Calendar,
  Globe,
  ArrowLeft,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { trackEvent } from "@/lib/analytics/track";
import { EditorialContainer, EditorialSection } from "@/components/ui/editorial";

export function ConsultationForm() {
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
        setSuccessResult("Thank you! Kyzor's founder and principal engineer will review your project details and respond within 1 business day.");
      }
    });
  };

  const discoveryPoints = [
    { text: "Free 20-minute call", icon: Clock },
    { text: "No obligation", icon: ShieldCheck },
    { text: "Response within one business day", icon: Calendar },
    { text: "India and global projects", icon: Globe },
  ];

  return (
    <EditorialSection className="py-10 md:py-16">
      <EditorialContainer>
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-purple-600 rounded-[12px] p-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* 2-Column Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-3">
              <span className="inline-block text-xs font-mono uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200/80 px-3 py-1 rounded-[12px] font-semibold">
                Free technical discovery
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Tell us what you need to build or automate.
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Share the requirement and Kyzor will respond within one business day to arrange a free 20-minute discovery call.
              </p>
            </div>

            {/* Simple Vertical Icon List */}
            <div className="space-y-3 pt-2">
              {discoveryPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800">
                    <div className="w-8 h-8 rounded-[12px] bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* WhatsApp CTA & Founder Direct Note */}
            <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/70 p-5 space-y-3">
              <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                Discuss your requirements directly with Kyzor’s founder and principal engineer.
              </p>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Kyzor%20Team,%20I'd%20like%20to%20request%20a%20free%20consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_clicked")}
                className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm transition-all min-h-[44px] w-full focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <MessageSquare className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: One White Elevated Surface */}
          <div className="lg:col-span-7">
            {successResult ? (
              <div className="rounded-[22px] border border-emerald-300 bg-emerald-50 p-8 sm:p-12 text-center space-y-6 animate-in fade-in duration-200 shadow-sm">
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
                    className="inline-flex items-center justify-center rounded-[12px] border border-slate-300 bg-white px-6 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900 shadow-sm min-h-[44px]"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-[22px] border border-slate-200 bg-white p-6 sm:p-10 shadow-lg">
                {serverError && (
                  <div className="mb-6 rounded-[12px] bg-red-50 border border-red-200 p-4 text-xs text-red-700 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-800">Submission Error</p>
                      <p>{serverError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-6" noValidate>
                  {/* Accessible Hidden Honeypot Field */}
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
                        className={`w-full rounded-[12px] bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
                        className={`w-full rounded-[12px] bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
                          fieldErrors.email ? "border-red-500" : "border-slate-200"
                        }`}
                      />
                      {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
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
                        className={`w-full rounded-[12px] bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
                        className={`w-full rounded-[12px] bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 font-mono min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
                        className="w-full rounded-[12px] bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
                      >
                        <option value="ecommerce">Custom E-commerce Application</option>
                        <option value="automation">Business Automations & AI Workflows</option>
                        <option value="both">Both E-commerce & Automations</option>
                        <option value="not_sure">Not Sure / Needs Engineering Advice</option>
                      </select>
                      {fieldErrors.project_type && <p className="text-xs text-red-600">{fieldErrors.project_type}</p>}
                    </div>

                    {/* Estimated Budget Range */}
                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Estimated Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-[12px] bg-slate-50 border border-slate-200 px-4 py-2.5 text-sm text-slate-900 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
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

                  {/* Accessible Radio Group for Communication Channel */}
                  <div className="space-y-2">
                    <label id="contact-preference-label" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Preferred Communication Channel
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="contact-preference-label"
                      className="grid grid-cols-3 gap-3"
                    >
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
                            role="radio"
                            aria-checked={isSelected}
                            tabIndex={isSelected ? 0 : -1}
                            onClick={() => setFormData({ ...formData, contact_preference: mode.value })}
                            className={`flex items-center justify-center gap-2 p-2.5 rounded-[12px] border text-xs font-semibold min-h-[44px] transition-all focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
                      className={`w-full rounded-[12px] bg-slate-50 border px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 ${
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
                      className="btn-gleam w-full inline-flex items-center justify-center rounded-[12px] bg-accent-gradient py-3.5 text-sm font-semibold text-white shadow-xl min-h-[44px] hover:scale-[1.01] transition-all disabled:opacity-50 disabled:hover:scale-100 focus-visible:ring-2 focus-visible:ring-purple-600"
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
        </div>
      </EditorialContainer>
    </EditorialSection>
  );
}
