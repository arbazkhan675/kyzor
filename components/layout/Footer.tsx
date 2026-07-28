import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg">
              <Image src="/brand/logo.png" alt="Kyzor Logo" width={36} height={36} className="object-contain" />
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors duration-200">Kyzor</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Kyzor builds custom e-commerce applications from scratch and creates end-to-end business automations, AI agents, and operational integrations.
            </p>
            <p className="text-xs text-zinc-500">
              Official Website: <a href="https://kyzor.online" className="text-purple-400 hover:underline">kyzor.online</a>
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Capabilities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ecommerce" className="hover:text-white transition-colors duration-200">
                  Custom E-commerce
                </Link>
              </li>
              <li>
                <Link href="/automations" className="hover:text-white transition-colors duration-200">
                  Business Automations
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About Kyzor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/consultation" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                  Book a Consultation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li className="pt-2 text-xs text-zinc-500">
                Inquiries: <a href="mailto:contact@kyzor.online" className="hover:text-zinc-300">contact@kyzor.online</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Kyzor. All rights reserved. Custom e-commerce applications built from scratch.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-400">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
