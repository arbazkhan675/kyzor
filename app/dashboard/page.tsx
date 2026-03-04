"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function statusVariant(status: string) {
  if (status === "Approved") return "default";
  if (status === "Rejected") return "destructive";
  if (status === "Submitted") return "outline";
  return "secondary";
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: "Active Tasks", value: "0" },
    { label: "Pending", value: "0" },
    { label: "Approved", value: "0" },
    { label: "Materials", value: "0" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Fetch tasks
      const { data: taskData } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      // Fetch materials count
      const { count: materialCount } = await supabase
        .from("materials")
        .select("*", { count: 'exact', head: true });

      if (taskData) {
        setTasks(taskData);

        const active = taskData.length;
        const pending = taskData.filter(t => t.status === "Pending").length;
        const approved = taskData.filter(t => t.status === "Approved").length;

        setStats([
          { label: "Active Tasks", value: active.toString() },
          { label: "Pending", value: pending.toString() },
          { label: "Approved", value: approved.toString() },
          { label: "Materials", value: (materialCount || 0).toString() },
        ]);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="grid gap-6">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">
          Hey, Andleeb
        </h1>
        <p className="text-sm text-indigo-200/60 font-medium">Welcome back to your dashboard.</p>
      </div>

      <div className="mt-2">
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => (
          <Card
            key={s.label}
            className="rounded-3xl glass-card animate-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
              {loading ? "..." : s.value}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground px-1">Recent Tasks</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid gap-4">
            {tasks.slice(0, 3).map((t, idx) => (
              <Card
                key={t.id}
                className="rounded-3xl glass-card animate-in"
                style={{ animationDelay: `${(idx + 4) * 100}ms` }}
              >
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">{t.title}</CardTitle>
                  <Badge variant={statusVariant(t.status)} className="rounded-full text-[10px] px-2.5 py-0.5 border-white/10 uppercase tracking-tighter">
                    {t.status}
                  </Badge>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground pt-0">
                  <p className="line-clamp-2 leading-relaxed">{t.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/5 w-fit px-2 py-1 rounded-lg">
                    <span className="h-1 w-1 rounded-full bg-indigo-400 animate-pulse" />
                    Deadline: {t.deadline}
                  </div>
                </CardContent>
              </Card>
            ))}
            {tasks.length === 0 && (
              <p className="text-sm text-muted-foreground">No tasks generated yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}