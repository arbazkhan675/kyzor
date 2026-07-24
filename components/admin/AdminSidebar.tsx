"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Briefcase, LogOut, Globe } from "lucide-react";
import { logoutAdminAction } from "@/app/actions/admin";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Consultations", href: "/admin/consultations", icon: Calendar },
    { label: "Case Studies", href: "/admin/work", icon: Briefcase },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between min-h-screen shrink-0">
      <div className="space-y-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <Image src="/logo.png" alt="Kyzor Admin" width={32} height={32} />
          <div>
            <span className="font-bold text-white text-base block leading-none">Kyzor</span>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Admin Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Links & Signout */}
      <div className="space-y-4 pt-6 border-t border-zinc-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <Globe className="h-3.5 w-3.5" />
          View Live Website
        </Link>

        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
