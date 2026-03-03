"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Tasks", href: "/dashboard/tasks" },
  { label: "Training Materials", href: "/dashboard/materials" },
  { label: "Announcements", href: "/dashboard/announcements" },
];

export function InternSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="grid gap-1">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={[
              "rounded-xl px-3 py-2 text-sm",
              active
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            ].join(" ")}
          >
            {it.label}
          </Link>
        );
      })}

      <div className="mt-2 px-2">
        <Button
          variant="outline"
          className="w-full rounded-xl border-white/10 bg-white/5"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}