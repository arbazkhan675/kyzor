import { Suspense } from "react";
import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";

export const metadata: Metadata = {
  title: "Request a Free Consultation | Kyzor",
  description: "Request a free 20-minute discovery call with Kyzor to discuss a custom e-commerce application or business automation project. Response within one business day.",
  alternates: {
    canonical: "https://www.kyzor.online/consultation",
  },
  openGraph: {
    title: "Request a Free Consultation | Kyzor",
    description: "Request a free 20-minute discovery call with Kyzor to discuss a custom e-commerce application or business automation project. Response within one business day.",
    url: "https://www.kyzor.online/consultation",
  },
};

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 text-xs font-mono">Loading consultation page...</div>}>
      <ConsultationForm />
    </Suspense>
  );
}
