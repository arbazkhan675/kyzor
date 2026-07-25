"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { workItemSchema, type WorkItemInput } from "@/lib/validations/work";

export async function loginAdminAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = await createServerSupabaseClient();
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
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/admin/login");
}

export async function updateConsultationStatusAction(
  id: string,
  status: "new" | "contacted" | "archived"
) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/consultations");
    revalidatePath("/admin");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to update status" };
  }
}

export async function createWorkItemAction(input: WorkItemInput) {
  const validation = workItemSchema.safeParse(input);
  if (!validation.success) {
    return { error: "Invalid work item payload" };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("work_items")
      .insert({
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        category: input.category,
        is_demo: input.is_demo,
        client_name: input.client_name || null,
        challenge: input.challenge,
        solution: input.solution,
        results: input.results || [],
        technologies: input.technologies || [],
        hero_image_url: input.hero_image_url || null,
        published: input.published,
      })
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/work");
    revalidatePath("/work");
    return { success: true, data };
  } catch (err: any) {
    return { error: err.message || "Failed to create case study" };
  }
}

export async function updateWorkItemAction(id: string, input: WorkItemInput) {
  const validation = workItemSchema.safeParse(input);
  if (!validation.success) {
    return { error: "Invalid work item payload" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("work_items")
      .update({
        title: input.title,
        slug: input.slug,
        summary: input.summary,
        category: input.category,
        is_demo: input.is_demo,
        client_name: input.client_name || null,
        challenge: input.challenge,
        solution: input.solution,
        results: input.results || [],
        technologies: input.technologies || [],
        hero_image_url: input.hero_image_url || null,
        published: input.published,
      })
      .eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/work");
    revalidatePath("/work");
    revalidatePath(`/work/${input.slug}`);
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to update case study" };
  }
}

export async function deleteWorkItemAction(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("work_items").delete().eq("id", id);

    if (error) {
      return { error: error.message };
    }

    revalidatePath("/admin/work");
    revalidatePath("/work");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to delete case study" };
  }
}

export async function uploadWorkImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  const altText = formData.get("altText") as string;
  const workItemId = formData.get("workItemId") as string;

  if (!file || !altText) {
    return { error: "Both image file and alt text are required." };
  }

  try {
    const supabase = createAdminClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `work/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("work-media")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from("work-media")
      .getPublicUrl(filePath);

    if (workItemId) {
      await supabase.from("work_images").insert({
        work_item_id: workItemId,
        storage_path: filePath,
        alt_text: altText,
      });
    }

    return { success: true, publicUrl: publicUrlData.publicUrl, filePath };
  } catch (err: any) {
    return { error: err.message || "Failed to upload image" };
  }
}
