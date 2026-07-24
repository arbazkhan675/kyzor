import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    "Kyzor builds custom e-commerce applications from scratch and creates end-to-end business automations, AI chatbots, voice assistants, and operational integrations.",
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
