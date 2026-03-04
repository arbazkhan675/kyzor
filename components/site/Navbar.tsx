import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-indigo-500/10 bg-indigo-950/30 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-11 w-11 transition-transform group-hover:scale-105">
            <Image
              src="/logo1.png"
              alt="KYZOR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm font-black tracking-[0.2em] uppercase">KYZOR</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            Intern Login
          </Link>
          <Button asChild size="sm" className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-[10px] font-bold uppercase tracking-widest px-5 h-9">
            <Link href="/book">Free Consultation</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}