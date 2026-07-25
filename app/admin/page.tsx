import Link from "next/link";
import { MessageSquare, FolderKanban, ArrowRight, Eye, Calendar, Clock } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

export const revalidate = 0;

async function getDashboardMetrics() {
  try {
    const supabase = createAdminClient();

    // 1. New consultations count
    const { count: newConsultationsCount } = await supabase
      .from("consultation_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "new");

    // 2. Consultations this month count
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const { count: monthConsultationsCount } = await supabase
      .from("consultation_requests")
      .select("*", { count: "exact", head: true })
      .gte("created_at", firstDayOfMonth.toISOString());

    // 3. Published work count
    const { count: publishedWorkCount } = await supabase
      .from("work_items")
      .select("*", { count: "exact", head: true })
      .eq("published", true);

    // 4. Draft work count
    const { count: draftWorkCount } = await supabase
      .from("work_items")
      .select("*", { count: "exact", head: true })
      .eq("published", false);

    // 5. Recent consultation list
    const { data: recentConsultations } = await supabase
      .from("consultation_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      newConsultationsCount: newConsultationsCount || 0,
      monthConsultationsCount: monthConsultationsCount || 0,
      publishedWorkCount: publishedWorkCount || 0,
      draftWorkCount: draftWorkCount || 0,
      recentConsultations: recentConsultations || [],
    };
  } catch {
    return {
      newConsultationsCount: 0,
      monthConsultationsCount: 0,
      publishedWorkCount: 0,
      draftWorkCount: 0,
      recentConsultations: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const statCards = [
    { label: "New Consultation Requests", value: metrics.newConsultationsCount, icon: MessageSquare, href: "/admin/consultations?status=new" },
    { label: "Consultations This Month", value: metrics.monthConsultationsCount, icon: Calendar, href: "/admin/consultations" },
    { label: "Published Case Studies", value: metrics.publishedWorkCount, icon: Eye, href: "/admin/work" },
    { label: "Draft / Concept Items", value: metrics.draftWorkCount, icon: FolderKanban, href: "/admin/work" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Owner Overview Dashboard</h1>
        <p className="text-xs text-zinc-400">Live consultation metrics and portfolio state.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-3 hover:border-purple-500/50 transition-colors"
            >
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium uppercase tracking-wider">{card.label}</span>
                <Icon className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-3xl font-extrabold text-white">{card.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Consultation Requests */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Recent Consultation Requests</h2>
          <Link
            href="/admin/consultations"
            className="inline-flex items-center text-xs font-semibold text-purple-400 hover:text-purple-300"
          >
            View All Requests
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>

        {metrics.recentConsultations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-800 text-zinc-400 uppercase font-mono">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Focus</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                {metrics.recentConsultations.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{item.name}</td>
                    <td className="py-3 px-4 font-mono text-zinc-400">
                      <a href={`mailto:${item.email}`} className="hover:text-purple-400">
                        {item.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 capitalize font-mono text-purple-400">{item.project_type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          item.status === "new"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : item.status === "contacted"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-zinc-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-zinc-500">No consultation requests recorded yet.</div>
        )}
      </div>
    </div>
  );
}
