import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500/80 to-blue-500/80" />
          <span className="text-sm font-semibold tracking-wide">KYZOR</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Intern Login
          </Link>
          <Button asChild className="rounded-xl">
            <Link href="/book">Book Free Consultation</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}