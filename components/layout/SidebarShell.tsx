import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SidebarShell({
  sidebar,
  topbarTitle,
  children,
}: {
  sidebar: React.ReactNode;
  topbarTitle: string;
  children: React.ReactNode;
}) {

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

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[auto_1fr] animate-in">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block sticky top-6 self-start">
          <div className="w-64 rounded-2xl glass transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
              <div className="relative h-7 w-7">
                <Image
                  src="/logo1.png"
                  alt="KYZOR"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-base font-bold tracking-wider bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                KYZOR
              </div>
            </div>
            <div className="px-2 py-3">{sidebar}</div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}