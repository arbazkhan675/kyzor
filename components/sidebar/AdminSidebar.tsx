"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "admin@kyzor.com";

const items = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Bookings", href: "/admin/bookings" },
  { label: "Tasks", href: "/admin/tasks" },
  { label: "Materials", href: "/admin/materials" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Leaderboard", href: "/admin/leaderboard" },
  { label: "Intern Chat", href: "/admin/chat", isChat: true },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadChat, setUnreadChat] = useState(0);

  useEffect(() => {
    async function checkUnreadChat() {
      const lastSeen = localStorage.getItem("lastSeenChatTimeAdmin") || new Date(0).toISOString();
      const { count, error } = await supabase
        .from("direct_messages")
        .select("*", { count: "exact", head: true })
        .eq("receiver_email", ADMIN_EMAIL)
        .gt("created_at", lastSeen);

      if (!error && count !== null) {
        setUnreadChat(count);
      }
    }

    checkUnreadChat();

    const channel = supabase
      .channel("admin_chat_notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "direct_messages",
          filter: `receiver_email=eq.${ADMIN_EMAIL}`
        },
        () => {
          if (pathname !== "/admin/chat") {
            setUnreadChat((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/admin/chat") {
      setUnreadChat(0);
      localStorage.setItem("lastSeenChatTimeAdmin", new Date().toISOString());
    }
  }, [pathname]);

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
              "flex items-center justify-between rounded-xl px-3 py-2 text-sm",
              active
                ? "bg-white/10 text-foreground"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground",
            ].join(" ")}
          >
            <span>{it.label}</span>
            {it.isChat && unreadChat > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-lg animate-in zoom-in-50 duration-300">
                {unreadChat}
              </span>
            )}
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