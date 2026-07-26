import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/lib/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Kyzor | Custom E-commerce Development & Business Automation Agency India",
    template: "%s | Kyzor",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Kyzor Agency" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kyzor | Custom E-commerce Development & Business Automations India",
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kyzor Agency Logo & Custom Engineering Positioning",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyzor | Custom E-commerce & Automations India",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verified Organization & ProfessionalService JSON-LD with India Location Metadata
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.domain}/#organization`,
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/brand/logo.png`,
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.countryCode,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.domain}/#service`,
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: `${siteConfig.domain}/brand/logo.png`,
        image: `${siteConfig.domain}/opengraph-image`,
        description: "India-based agency engineering custom e-commerce applications built from scratch and autonomous business workflows.",
        priceRange: "₹₹₹",
        email: siteConfig.contactEmail,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.countryCode,
        },
        areaServed: [
          {
            "@type": "Country",
            name: "India",
          },
          {
            "@type": "Country",
            name: "Global",
          },
        ],
        knowsAbout: [
          "Custom E-commerce Application Development",
          "WhatsApp Cloud API Automations",
          "Autonomous AI Agents",
          "Next.js Software Engineering",
          "Supabase Database Architecture",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen selection:bg-purple-100 selection:text-purple-900`}
      >
        {/* Skip to Content Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>

        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
