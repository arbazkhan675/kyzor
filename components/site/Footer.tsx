import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-violet-500/70 to-blue-500/70" />
          <div className="text-sm font-semibold">KYZOR</div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} KYZOR</span>
          <Link href="/login" className="hover:text-foreground">
            Intern Login
          </Link>
        </div>
      </div>
    </footer>
  );
}