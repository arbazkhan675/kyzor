"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Leaderboard", href: "/dashboard/leaderboard" },
  { label: "My Tasks", href: "/dashboard/tasks", key: "unreadTasks" },
  { label: "Training Materials", href: "/dashboard/materials", key: "unreadMaterials" },
  { label: "Announcements", href: "/dashboard/announcements", key: "unreadAnnouncements" },
  { label: "Support Chat", href: "/dashboard/chat", key: "unreadChat" },
];

export function InternSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({
    unreadTasks: 0,
    unreadMaterials: 0,
    unreadAnnouncements: 0,
    unreadChat: 0,
  });

  useEffect(() => {
    // Initial fetch of unread items
    async function checkAllUnread() {
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user?.email;

      const lastSeenAnn = localStorage.getItem("lastSeenAnnouncementTime") || new Date(0).toISOString();
      const lastSeenTask = localStorage.getItem("lastSeenTaskTime") || new Date(0).toISOString();
      const lastSeenMat = localStorage.getItem("lastSeenMaterialTime") || new Date(0).toISOString();
      const lastSeenChat = localStorage.getItem("lastSeenChatTime") || new Date(0).toISOString();

      const queries = [
        supabase.from("announcements").select("*", { count: "exact", head: true }).gt("created_at", lastSeenAnn),
        supabase.from("tasks").select("*", { count: "exact", head: true }).gt("created_at", lastSeenTask),
        supabase.from("materials").select("*", { count: "exact", head: true }).gt("created_at", lastSeenMat),
      ];

      if (userEmail) {
        queries.push(
          supabase
            .from("direct_messages")
            .select("*", { count: "exact", head: true })
            .eq("receiver_email", userEmail)
            .gt("created_at", lastSeenChat)
        );
      }

      const results = await Promise.all(queries);

      setUnreadCounts({
        unreadAnnouncements: results[0].count || 0,
        unreadTasks: results[1].count || 0,
        unreadMaterials: results[2].count || 0,
        unreadChat: results[3]?.count || 0,
      });
    }

    checkAllUnread();

    const setupSubscriptions = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const userEmail = user?.email;

      // Subscribe to multiple tables
      const configs = [
        { table: "announcements", stateKey: "unreadAnnouncements", path: "/dashboard/announcements" },
        { table: "tasks", stateKey: "unreadTasks", path: "/dashboard/tasks" },
        { table: "materials", stateKey: "unreadMaterials", path: "/dashboard/materials" },
      ];

      const channels = configs.map((cfg) => {
        return supabase
          .channel(`${cfg.table}_notifications`)
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: cfg.table },
            () => {
              if (pathname !== cfg.path) {
                setUnreadCounts((prev) => ({
                  ...prev,
                  [cfg.stateKey]: prev[cfg.stateKey] + 1,
                }));
              }
            }
          )
          .subscribe();
      });

      // Chat subscription
      if (userEmail) {
        const chatChannel = supabase
          .channel("chat_notifications")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "direct_messages",
              filter: `receiver_email=eq.${userEmail}`
            },
            () => {
              if (pathname !== "/dashboard/chat") {
                setUnreadCounts((prev) => ({
                  ...prev,
                  unreadChat: prev.unreadChat + 1,
                }));
              }
            }
          )
          .subscribe();
        channels.push(chatChannel);
      }

      return channels;
    };

    const channelsPromise = setupSubscriptions();

    return () => {
      channelsPromise.then(channels => {
        channels.forEach((channel) => supabase.removeChannel(channel));
      });
    };
  }, [pathname]);

  // Clear notifications when visiting pages
  useEffect(() => {
    if (pathname === "/dashboard/announcements") {
      setUnreadCounts((prev) => ({ ...prev, unreadAnnouncements: 0 }));
      localStorage.setItem("lastSeenAnnouncementTime", new Date().toISOString());
    } else if (pathname === "/dashboard/tasks") {
      setUnreadCounts((prev) => ({ ...prev, unreadTasks: 0 }));
      localStorage.setItem("lastSeenTaskTime", new Date().toISOString());
    } else if (pathname === "/dashboard/materials") {
      setUnreadCounts((prev) => ({ ...prev, unreadMaterials: 0 }));
      localStorage.setItem("lastSeenMaterialTime", new Date().toISOString());
    } else if (pathname === "/dashboard/chat") {
      setUnreadCounts((prev) => ({ ...prev, unreadChat: 0 }));
      localStorage.setItem("lastSeenChatTime", new Date().toISOString());
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
            {it.key && unreadCounts[it.key] > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white shadow-lg animate-in zoom-in-50 duration-300">
                {unreadCounts[it.key]}
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