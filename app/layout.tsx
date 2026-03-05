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
  title: "KYZOR — AI Automation Agency",
  description: "AI Automation Agency — chatbots, agents, and workflow automations.",
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