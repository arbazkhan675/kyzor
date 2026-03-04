import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src="/logo1.png"
              alt="KYZOR"
              fill
              className="object-contain"
            />
          </div>
          <div className="text-base font-semibold">KYZOR</div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>© 2024 KYZOR</span>
          <Link href="/login" className="hover:text-foreground">
            Intern Login
          </Link>
        </div>
      </div>
    </footer>
  );
}