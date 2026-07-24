import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { Calendar, Briefcase, Plus, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export const revalidate = 0; // Dynamic server rendering for admin

async function getAdminOverviewData() {
  try {
    const supabase = createAdminClient();
    const [consultationsRes, workItemsRes] = await Promise.all([
      supabase.from("consultations").select("*").order("created_at", { ascending: false }),
      supabase.from("work_items").select("*").order("created_at", { ascending: false }),
    ]);

    const consultations = consultationsRes.data || [];
    const workItems = workItemsRes.data || [];

    const newConsultations = consultations.filter((c) => c.status === "new").length;

    return {
      consultations,
      workItems,
      newConsultations,
    };
  } catch {
    return { consultations: [], workItems: [], newConsultations: 0 };
  }
}

export default async function AdminDashboardPage() {
  const { consultations, workItems, newConsultations } = await getAdminOverviewData();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage consultation inquiries and portfolio content.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/work/new"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2 text-xs font-semibold text-white shadow-md hover:scale-[1.02] transition-transform"
          >
            <Plus className="h-4 w-4" />
            New Case Study
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
            <span>Total Consultations</span>
            <Calendar className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{consultations.length}</p>
          <p className="text-xs text-purple-400 flex items-center gap-1 font-mono">
            <Clock className="h-3 w-3" />
            {newConsultations} new pending review
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
            <span>Published Case Studies</span>
            <Briefcase className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{workItems.length}</p>
          <p className="text-xs text-zinc-500 font-mono">
            {workItems.filter((w) => w.is_demo).length} Demo/Concept showcases
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
            <span>System Status</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-emerald-400">Operational</p>
          <p className="text-xs text-zinc-500 font-mono">Database & RLS active</p>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Consultation Requests</h2>
          <Link
            href="/admin/consultations"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            View All ({consultations.length})
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {consultations.length === 0 ? (
          <p className="text-xs text-zinc-500 py-8 text-center">No consultation submissions recorded yet.</p>
        ) : (
          <div className="divide-y divide-zinc-800/80 overflow-x-auto">
            {consultations.slice(0, 5).map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{item.name}</span>
                    <span className="text-xs text-zinc-400">({item.email})</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Project: <span className="text-purple-300">{item.project_type}</span> | Budget: {item.budget || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded ${
                      item.status === "new"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                        : item.status === "contacted"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
