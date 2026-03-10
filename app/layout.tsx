import type { Metadata } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/effects/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kyzor.online"),
  title: {
    default: "KYZOR — AI Automation Agency",
    template: "%s | KYZOR",
  },
  description: "Expert AI Automation Agency specialized in custom chatbots, intelligent agents, and automated n8n pipelines for modern businesses.",
  keywords: [
    "AI Automation",
    "Chatbots",
    "n8n",
    "Workflow Automation",
    "AI Agents",
    "Business Process Automation",
    "KYZOR"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KYZOR — AI Automation Agency",
    description: "Expert AI Automation Agency specialized in custom chatbots, intelligent agents, and automated n8n pipelines for modern businesses.",
    url: "https://www.kyzor.online",
    siteName: "KYZOR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KYZOR AI Automation Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KYZOR — AI Automation Agency",
    description: "Expert AI Automation Agency specialized in custom chatbots, intelligent agents, and automated n8n pipelines for modern businesses.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${spaceMono.variable} min-h-screen bg-background text-foreground relative overflow-x-hidden`}
        style={{ fontFamily: "var(--font-space-mono), monospace" }}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}