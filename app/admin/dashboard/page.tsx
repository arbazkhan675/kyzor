"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, FileText, Bell } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState([
    { label: "Total Tasks", value: "0", icon: ClipboardList, color: "text-blue-400" },
    { label: "Total Materials", value: "0", icon: FileText, color: "text-indigo-400" },
    { label: "Active Announcements", value: "0", icon: Bell, color: "text-amber-400" },
    { label: "Total Interns", value: "5", icon: Users, color: "text-emerald-400" }, // Mocked as 5 for now
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);

      const { count: taskCount } = await supabase.from("tasks").select("*", { count: 'exact', head: true });
      const { count: bookingCount } = await supabase.from("bookings").select("*", { count: 'exact', head: true });
      const { count: materialCount } = await supabase.from("materials").select("*", { count: 'exact', head: true });
      const { count: announcementCount } = await supabase.from("announcements").select("*", { count: 'exact', head: true });

      setStats([
        { label: "Total Bookings", value: (bookingCount || 0).toString(), icon: ClipboardList, color: "text-indigo-400" },
        { label: "Active Tasks", value: (taskCount || 0).toString(), icon: Users, color: "text-blue-400" },
        { label: "Materials", value: (materialCount || 0).toString(), icon: FileText, color: "text-amber-400" },
        { label: "Announcements", value: (announcementCount || 0).toString(), icon: Bell, color: "text-emerald-400" },
      ]);
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Real-time system overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <Card
            key={s.label}
            className="rounded-3xl glass-card animate-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                {s.label}
              </CardTitle>
              <s.icon className={`h-4 w-4 ${s.color} opacity-70`} />
            </CardHeader>
            <CardContent className="text-3xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {loading ? "..." : s.value}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}