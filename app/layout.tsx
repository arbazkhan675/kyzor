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
  metadataBase: new URL("https://www.kyzor.online"),
  title: {
    default: "Kyzor | Custom E-commerce Development & Business Automations",
    template: "%s",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Kyzor Agency" }],
  alternates: {
    canonical: "https://www.kyzor.online/",
  },
  openGraph: {
    title: "Kyzor | Custom E-commerce Development & Business Automations",
    description: siteConfig.description,
    url: "https://www.kyzor.online/",
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
    title: "Kyzor | Custom E-commerce & Automations",
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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.kyzor.online/#organization",
        name: siteConfig.name,
        url: "https://www.kyzor.online",
        logo: "https://www.kyzor.online/brand/logo.png",
        description: siteConfig.description,
        email: siteConfig.contactEmail,
        sameAs: [
          "https://instagram.com/kyzorcommerce",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.countryCode,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.kyzor.online/#service",
        name: siteConfig.name,
        url: "https://www.kyzor.online",
        logo: "https://www.kyzor.online/brand/logo.png",
        image: "https://www.kyzor.online/opengraph-image",
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
