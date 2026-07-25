import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kyzor.online"),
  title: {
    default: "Kyzor | Custom E-commerce Applications & Business Automations",
    template: "%s | Kyzor",
  },
  description:
    "Kyzor builds complete custom e-commerce applications from scratch and creates business automations including WhatsApp workflows, email automation, AI chatbots, voice assistants, and operational integrations.",
  keywords: [
    "custom e-commerce application",
    "built from scratch",
    "business automation",
    "WhatsApp workflows",
    "AI agents",
    "voice assistants",
    "custom software agency",
    "Kyzor",
  ],
  authors: [{ name: "Kyzor Agency" }],
  openGraph: {
    title: "Kyzor | Custom E-commerce Applications & Business Automations",
    description:
      "Bespoke e-commerce software built from scratch and high-impact operational automations.",
    url: "https://kyzor.online",
    siteName: "Kyzor",
    images: [
      {
        url: "/brand/logo.png",
        width: 1024,
        height: 1024,
        alt: "Kyzor Agency Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyzor | Custom E-commerce & Automations",
    description: "Bespoke e-commerce software built from scratch and high-impact business automations.",
    images: ["/brand/logo.png"],
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
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen selection:bg-purple-500/30 selection:text-purple-200`}
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
      </body>
    </html>
  );
}
