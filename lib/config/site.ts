export const siteConfig = {
  name: "Kyzor",
  domain: "https://kyzor.online",
  description:
    "Kyzor is an India-based digital product and automation agency building complete custom e-commerce applications from scratch and autonomous business workflows (WhatsApp Cloud API, AI agents, voice assistants, CRM integrations).",
  contactEmail: "contact@kyzor.online",
  notificationEmail: "notifications@kyzor.online",
  // Official WhatsApp number for direct client consultation
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918864938636",
  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    country: "India",
    countryCode: "IN",
    timezone: "Asia/Kolkata (IST)",
  },
  keywords: [
    "custom e-commerce development India",
    "custom e-commerce application built from scratch",
    "business automation agency India",
    "WhatsApp Cloud API automation India",
    "AI workflow automation agency",
    "Next.js custom software development",
    "autonomous AI agents India",
    "Kyzor digital agency",
    "bespoke e-commerce software",
  ],
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
  ],
  cta: {
    label: "Book a Consultation",
    href: "/consultation",
  },
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
