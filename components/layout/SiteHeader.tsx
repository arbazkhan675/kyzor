"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Hide header inside /admin routes or style preview
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/style-preview")) {
    return null;
  }

  // 1. Scroll listener for sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Escape key handler & focus trap for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }

      // Simple focus trap within drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // 3. Auto-close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-zinc-800 bg-zinc-950/95 shadow-lg backdrop-blur-md"
          : "border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg p-1"
        >
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
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation (Flat List, No Dropdowns) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {siteConfig.navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md px-2 py-1 ${
                  isActive ? "text-purple-400 font-semibold" : "text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Single CTA Button */}
        <div className="hidden md:flex items-center">
          <Link
            href={siteConfig.cta.href}
            className="inline-flex items-center justify-center rounded-lg bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {siteConfig.cta.label}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 focus-visible:ring-2 focus-visible:ring-purple-400"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Accessible Mobile Drawer Overlay & Sheet */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-between bg-zinc-950/95 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="px-4 py-6 border-b border-zinc-800 flex items-center justify-between">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
              <Image src="/brand/logo.png" alt="Kyzor Logo" width={36} height={36} />
              <span className="text-lg font-bold text-white">{siteConfig.name}</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-md focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div ref={drawerRef} id="mobile-navigation-drawer" className="px-6 py-8 space-y-6 flex-1 overflow-y-auto">
            <nav className="space-y-4" aria-label="Mobile Navigation">
              {siteConfig.navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-xl font-bold py-2 border-b border-zinc-900 ${
                      isActive ? "text-purple-400" : "text-zinc-200 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4">
              <Link
                href={siteConfig.cta.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-lg bg-accent-gradient py-4 text-base font-semibold text-white shadow-lg"
              >
                {siteConfig.cta.label}
              </Link>
            </div>
          </div>

          <div className="p-6 border-t border-zinc-900 text-xs text-zinc-500 text-center">
            © {new Date().getFullYear()} Kyzor. Custom e-commerce applications built from scratch.
          </div>
        </div>
      )}
    </header>
  );
}
