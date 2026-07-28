import Link from "next/link";
import { MessageSquare, ArrowRight, Calendar } from "lucide-react";
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

    // 3. Recent consultation list
    const { data: recentConsultations } = await supabase
      .from("consultation_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return {
      newConsultationsCount: newConsultationsCount || 0,
      monthConsultationsCount: monthConsultationsCount || 0,
      recentConsultations: recentConsultations || [],
    };
  } catch {
    return {
      newConsultationsCount: 0,
      monthConsultationsCount: 0,
      recentConsultations: [],
    };
  }
}

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  const statCards = [
    { label: "New Consultation Requests", value: metrics.newConsultationsCount, icon: MessageSquare, href: "/admin/consultations?status=new" },
    { label: "Consultations This Month", value: metrics.monthConsultationsCount, icon: Calendar, href: "/admin/consultations" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Owner Overview Dashboard</h1>
        <p className="text-xs text-slate-500">Live consultation metrics and customer request status.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-sm hover:border-purple-300 transition-colors"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-medium uppercase tracking-wider">{card.label}</span>
                <Icon className="h-4 w-4 text-purple-700" />
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{card.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Consultation Requests */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Consultation Requests</h2>
          <Link
            href="/admin/consultations"
            className="inline-flex items-center text-xs font-semibold text-purple-700 hover:text-purple-900"
          >
            View All Requests
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>

        {metrics.recentConsultations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-mono">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Focus</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {metrics.recentConsultations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      <a href={`mailto:${item.email}`} className="hover:text-purple-700">
                        {item.email}
                      </a>
                    </td>
                    <td className="py-3 px-4 capitalize font-mono text-purple-700 font-semibold">{item.project_type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          item.status === "new"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : item.status === "contacted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-500">No consultation requests recorded yet.</div>
        )}
      </div>
    </div>
  );
}
