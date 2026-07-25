import { createAdminClient } from "@/lib/supabase/admin";
import { ConsultationManager } from "@/components/admin/ConsultationManager";

export const revalidate = 0;

async function getConsultations() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("consultation_requests")
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Consultation Requests</h1>
        <p className="text-xs text-zinc-400">Review discovery requests, search leads, and update contact status.</p>
      </div>

      <ConsultationManager initialItems={consultations} />
    </div>
  );
}
