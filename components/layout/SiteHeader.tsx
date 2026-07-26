"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";
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

  // 2. Escape key handler & body scroll lock for mobile side drawer
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
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "border-b border-slate-200/90 bg-white/85 shadow-sm backdrop-blur-xl"
            : "border-b border-slate-200/60 bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-purple-600 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100/80 p-1 shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/brand/logo.png"
                alt="Kyzor Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors duration-200">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {siteConfig.navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-purple-700 focus-visible:ring-2 focus-visible:ring-purple-600 rounded-md px-2 py-1 ${
                    isActive ? "text-purple-700 font-semibold" : "text-slate-600"
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
              className="btn-gleam inline-flex items-center justify-center rounded-xl bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-600"
            >
              {siteConfig.cta.label}
              <ArrowUpRight className="ml-1.5 h-4 w-4 opacity-80" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 focus-visible:ring-2 focus-visible:ring-purple-600"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label="Open side navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Accessible Mobile Side Drawer (Sliding from Right) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Side Drawer Panel */}
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            className="relative z-50 w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Image src="/brand/logo.png" alt="Kyzor Logo" width={32} height={32} />
                <span className="text-base font-bold text-slate-900">{siteConfig.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 focus-visible:ring-2 focus-visible:ring-purple-600"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Items */}
            <div className="px-6 py-6 space-y-2 flex-1 overflow-y-auto">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold block mb-3 px-2">
                Navigation
              </span>
              <nav className="space-y-1" aria-label="Mobile Side Navigation">
                {siteConfig.navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold transition-colors ${
                        isActive
                          ? "bg-purple-50 text-purple-700 border border-purple-200/80"
                          : "text-slate-700 hover:bg-slate-100/70 hover:text-slate-900"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`h-4 w-4 ${isActive ? "text-purple-700" : "text-slate-400"}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <Link
                  href={siteConfig.cta.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-gleam flex items-center justify-center gap-2 w-full rounded-xl bg-accent-gradient py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
                >
                  {siteConfig.cta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-slate-200/80 bg-slate-50/50 text-[11px] text-slate-500 text-center font-mono">
              © {new Date().getFullYear()} Kyzor. Custom e-commerce applications built from scratch.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
