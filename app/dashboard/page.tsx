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
  const [scoreData, setScoreData] = useState({ earned: 0, possible: 0 });

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

        let earned = 0;
        let possible = 0;
        taskData.forEach(t => {
          if (typeof t.score === 'number') {
            earned += t.score;
            possible += 100;
          }
        });
        setScoreData({ earned, possible });
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

      <div className="mt-2 mb-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
        <Card className="rounded-3xl glass-card border-none overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent" />
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-1">Total Score Meter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{loading ? "-" : scoreData.earned}</span>
                  <span className="text-sm font-medium text-muted-foreground">/ {loading ? "-" : scoreData.possible || 100} PTS</span>
                </div>
              </div>
              <div className="flex-1 w-full md:max-w-[50%]">
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${scoreData.possible > 0 ? Math.round((scoreData.earned / scoreData.possible) * 100) : 0}%` }}
                  />
                </div>
                <div className="text-right mt-2 text-[10px] uppercase font-bold tracking-widest text-indigo-300">
                  {loading ? "..." : (scoreData.possible > 0 ? Math.round((scoreData.earned / scoreData.possible) * 100) : 0)}% Completion
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest bg-indigo-500/5 w-fit px-2 py-1 rounded-lg">
                      <span className="h-1 w-1 rounded-full bg-indigo-400 animate-pulse" />
                      Deadline: {t.deadline}
                    </div>
                    {typeof t.score === 'number' && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 w-fit px-2 py-1 rounded-lg">
                        Score: {t.score}/100
                      </div>
                    )}
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