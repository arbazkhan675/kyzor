"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SidebarShell({
  sidebar,
  topbarTitle,
  children,
}: {
  sidebar: React.ReactNode;
  topbarTitle: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kyzor_sidebar_collapsed");
    setCollapsed(saved === "1");
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("kyzor_sidebar_collapsed", next ? "1" : "0");
  }

  return (
    <div className="min-h-screen">
      {/* Mobile topbar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur lg:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="text-sm font-semibold">{topbarTitle}</div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-white/10 bg-background">
              {sidebar}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[auto_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div
            className={[
              "rounded-2xl border border-white/10 bg-white/5 backdrop-blur",
              collapsed ? "w-20" : "w-64",
              "transition-[width] duration-200",
            ].join(" ")}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <div className="text-sm font-semibold">{collapsed ? "K" : "KYZOR"}</div>
              <Button
                variant="ghost"
                className="rounded-xl"
                onClick={toggle}
                title="Collapse"
              >
                {collapsed ? "→" : "←"}
              </Button>
            </div>
            <div className="px-2 pb-3">{sidebar}</div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}