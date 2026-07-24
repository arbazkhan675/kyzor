"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { workItemSchema, WorkItemInput } from "@/lib/validations/work";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. Admin Authentication
export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAdminAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/admin");
  redirect("/admin/login");
}

// 2. Consultation Management Actions
export async function updateConsultationStatusAction(id: string, status: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized access" };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("consultations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteConsultationAction(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized access" };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.from("consultations").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
  return { success: true };
}

// 3. Work Item / Case Study Management Actions
export async function createWorkItemAction(data: WorkItemInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized access" };
  }

  const validated = workItemSchema.parse(data);
  const adminClient = createAdminClient();

  const { error } = await adminClient.from("work_items").insert([
    {
      ...validated,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/work");
  revalidatePath("/admin/work");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateWorkItemAction(id: string, data: WorkItemInput) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized access" };
  }

  const validated = workItemSchema.parse(data);
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("work_items")
    .update({
      ...validated,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/work");
  revalidatePath(`/work/${validated.slug}`);
  revalidatePath("/admin/work");
  revalidatePath(`/admin/work/${id}`);
  return { success: true };
}

export async function deleteWorkItemAction(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized access" };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.from("work_items").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/work");
  revalidatePath("/admin/work");
  return { success: true };
}
