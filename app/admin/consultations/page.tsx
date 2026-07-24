import { createAdminClient } from "@/lib/supabase/admin";
import { updateConsultationStatusAction, deleteConsultationAction } from "@/app/actions/admin";
import { Calendar, Trash2, CheckCircle, Archive, Mail, Building } from "lucide-react";

export const revalidate = 0;

async function getConsultations() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function AdminConsultationsPage() {
  const consultations = await getConsultations();

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white">Consultation Requests</h1>
        <p className="text-xs text-zinc-400 mt-1">Review inquiries submitted via the public consultation form.</p>
      </div>

      {consultations.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-12 text-center text-zinc-500">
          No consultation requests have been submitted yet.
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((item: any) => (
            <div
              key={item.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-white">{item.name}</h2>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                        item.status === "new"
                          ? "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                          : item.status === "contacted"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-zinc-500" />
                      <a href={`mailto:${item.email}`} className="text-purple-400 hover:underline">
                        {item.email}
                      </a>
                    </span>
                    {item.company && (
                      <span className="flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-zinc-500" />
                        {item.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-2">
                  {item.status !== "contacted" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateConsultationStatusAction(item.id, "contacted");
                      }}
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-md hover:bg-blue-500/20 transition-colors"
                      >
                        <CheckCircle className="h-3.5 w-3.5" />
                        Mark Contacted
                      </button>
                    </form>
                  )}

                  {item.status !== "archived" && (
                    <form
                      action={async () => {
                        "use server";
                        await updateConsultationStatusAction(item.id, "archived");
                      }}
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-zinc-800 text-zinc-400 px-3 py-1.5 rounded-md hover:bg-zinc-700 transition-colors"
                      >
                        <Archive className="h-3.5 w-3.5" />
                        Archive
                      </button>
                    </form>
                  )}

                  <form
                    action={async () => {
                      "use server";
                      await deleteConsultationAction(item.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-md hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Details & Message */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="text-zinc-500 block">Project Focus:</span>
                  <span className="text-zinc-200 font-semibold uppercase">{item.project_type}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Estimated Investment:</span>
                  <span className="text-zinc-200 font-semibold">{item.budget || "Not specified"}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Overview</span>
                <p className="text-xs text-zinc-300 bg-zinc-950 p-4 rounded-lg border border-zinc-800/80 whitespace-pre-line leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
