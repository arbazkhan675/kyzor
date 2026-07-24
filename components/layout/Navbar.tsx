"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not render public Navbar inside /admin or internal /style-preview
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/style-preview")) {
    return null;
  }

  const navItems = [
    { label: "E-commerce", href: "/ecommerce" },
    { label: "Automations", href: "/automations" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg">
            <Image
              src="/brand/logo.png"
              alt="Kyzor Logo"
              width={40}
              height={40}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200">
            Kyzor
          </span>
        </Link>

        {/* Desktop Navigation (No Dropdowns) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md px-2 py-1 ${
                  isActive ? "text-purple-400 font-semibold" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                pathname === item.href ? "text-purple-400 bg-zinc-900" : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-lg bg-accent-gradient px-5 py-3 text-base font-semibold text-white shadow-md"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
