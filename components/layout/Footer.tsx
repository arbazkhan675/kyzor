import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-[56px] py-12 lg:py-16">
        {/* Clean 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Kyzor Description & Location */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-[12px]">
              <Image src="/brand/logo.png" alt="Kyzor Logo" width={36} height={36} className="object-contain" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="space-y-1 text-xs text-zinc-500 font-mono">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                Operating Location: <span className="text-zinc-300 font-semibold">Ahmedabad, Gujarat, India</span>
              </p>
              <p>
                Official Domain:{" "}
                <a href={siteConfig.domain} className="text-purple-400 hover:underline">
                  www.kyzor.online
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Services & About Navigation */}
          <div className="space-y-3 md:pl-6">
            <h3 className="text-xs font-mono font-semibold text-white tracking-wider uppercase">Capabilities</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200 font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Consultation, Email, Instagram, Privacy & Terms */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold text-white tracking-wider uppercase">Connect & Legal</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href={siteConfig.cta.href} className="text-purple-400 hover:text-purple-300 font-bold transition-colors duration-200">
                  Request a Free Consultation
                </Link>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-zinc-200 transition-colors duration-200">
                  Email: <span className="font-medium text-zinc-300">{siteConfig.contactEmail}</span>
                </a>
                <span className="block text-[11px] text-emerald-400 font-mono">Response within 1 business day</span>
              </li>
              <li>
                <a
                  href="https://instagram.com/kyzorcommerce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-zinc-400 hover:text-pink-400 transition-colors duration-200"
                >
                  <Instagram className="h-4 w-4 text-pink-400" />
                  <span>Instagram: <span className="font-semibold text-zinc-300">@kyzorcommerce</span></span>
                </a>
              </li>
              {siteConfig.legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-zinc-300 transition-colors duration-200 text-zinc-500">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thin Copyright Separator */}
        <div className="mt-12 border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Kyzor. All rights reserved. Custom e-commerce applications built from scratch.</p>
          <div className="flex gap-6">
            {siteConfig.legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-zinc-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
