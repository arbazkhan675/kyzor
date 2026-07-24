import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { WorkItemForm } from "@/components/admin/WorkItemForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function getWorkItemById(id: string) {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("work_items").select("*").eq("id", id).single();
    return data;
  } catch {
    return null;
  }
}

export default async function EditWorkItemPage({ params }: Props) {
  const { id } = await params;
  const item = await getWorkItemById(id);

  if (!item) {
    notFound();
  }

  return <WorkItemForm initialData={item} isEdit={true} />;
}
