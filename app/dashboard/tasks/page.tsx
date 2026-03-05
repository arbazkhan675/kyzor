"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SubmitWorkModal } from "@/components/modals/SubmitWorkModal";

function statusVariant(status: string) {
  if (status === "Approved") return "default";
  if (status === "Rejected") return "destructive";
  if (status === "Submitted") return "outline";
  return "secondary";
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    }
    getUser();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setTasks(data);
    setLoading(false);
  }

  function getTaskScore(t: any): number | null {
    const rawDeadline = t.deadline as string | undefined;

    let isOverdue = false;
    if (rawDeadline && rawDeadline !== "TBD") {
      const parsed = new Date(rawDeadline);
      if (!Number.isNaN(parsed.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        parsed.setHours(0, 0, 0, 0);
        isOverdue = parsed < today;
      }
    }

    const existingScore = typeof t.score === "number" ? t.score : null;
    if (existingScore !== null) return existingScore;

    if (isOverdue && t.status === "Pending") return 0;

    return null;
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">Submit work and track status.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-mono animate-pulse">Loading tasks...</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((t, idx) => {
            const score = getTaskScore(t);

            return (
              <Card
                key={t.id}
                className="rounded-3xl glass-card animate-in border-none overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex-1">
                    <CardTitle className="text-base font-bold tracking-tight uppercase">
                      {t.title}
                    </CardTitle>
                    <div className="mt-2 text-sm text-muted-foreground/80 leading-relaxed">
                      {t.description}
                    </div>
                  </div>

                  <Badge variant={statusVariant(t.status)} className="rounded-full px-3 py-1 border-white/10 uppercase tracking-widest text-[9px] font-black">
                    {t.status}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 pt-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 group">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                          Due: {t.deadline}
                        </div>
                      </div>
                      {score !== null && (
                        <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">
                          Score: {score}/100
                        </div>
                      )}
                    </div>
                    <SubmitWorkModal
                      taskId={t.id}
                      taskTitle={t.title}
                      internName={userEmail?.split('@')[0].replace('.', ' ') || "Intern"}
                      status={t.status}
                      deadline={t.deadline}
                      onSuccess={fetchTasks}
                    />
                  </div>
                  {t.status === "Rejected" && t.reject_reason && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">
                      <span className="font-bold uppercase tracking-widest text-[9px] text-red-300 block mb-1">Rejection Feedback</span>
                      {t.reject_reason}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {tasks.length === 0 && (
            <p className="text-sm text-muted-foreground p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              No tasks assigned yet. Enjoy the quiet!
            </p>
          )}
        </div>
      )}
    </div>
  );
}