import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg">
              <Image src="/brand/logo.png" alt="Kyzor Logo" width={36} height={36} className="object-contain" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="space-y-1 text-xs text-zinc-500">
              <p className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                Operating Location: <span className="text-zinc-300">Ahmedabad, Gujarat, India</span>
              </p>
              <p>
                Official Website:{" "}
                <a href={siteConfig.domain} className="text-purple-400 hover:underline">
                  www.kyzor.online
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/kyzorcommerce"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kyzor Instagram"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:bg-zinc-800 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Capabilities</h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={siteConfig.cta.href} className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                  {siteConfig.cta.label}
                </Link>
              </li>
              {siteConfig.legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-zinc-500">
                Inquiries:{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-zinc-300 font-medium">
                  {siteConfig.contactEmail}
                </a>
                <span className="block text-[11px] text-emerald-400 pt-0.5 font-medium">Response within 1 business day</span>
              </li>
            </ul>
          </div>
        </div>

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
