"use server";

import { consultationSchema, ConsultationInput } from "@/lib/validations/consultation";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

export async function submitConsultationAction(data: ConsultationInput) {
  try {
    // 1. Server-side Zod validation
    const validated = consultationSchema.parse(data);

    // 2. Server-only database client insertion
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("consultations").insert([
      {
        name: validated.name,
        email: validated.email,
        company: validated.company || null,
        project_type: validated.project_type,
        budget: validated.budget || null,
        message: validated.message,
        status: "new",
      },
    ]);

    if (dbError) {
      console.error("Consultation DB Insertion Error:", dbError);
      return { success: false, error: "Failed to submit consultation. Please try again." };
    }

    // 3. Optional Resend Transactional Email Notification
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const notificationEmail = process.env.NOTIFICATION_EMAIL || "contact@kyzor.online";
        
        await resend.emails.send({
          from: "Kyzor Consultations <notifications@kyzor.online>",
          to: [notificationEmail],
          subject: `New Consultation Request: ${validated.name} (${validated.project_type})`,
          html: `
            <h2>New Consultation Request Received</h2>
            <p><strong>Name:</strong> ${validated.name}</p>
            <p><strong>Email:</strong> ${validated.email}</p>
            <p><strong>Company:</strong> ${validated.company || "N/A"}</p>
            <p><strong>Project Type:</strong> ${validated.project_type}</p>
            <p><strong>Budget:</strong> ${validated.budget || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #7c3aed;">
              ${validated.message}
            </blockquote>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email notification failed silently:", emailErr);
      }
    }

    return { success: true };
  } catch (err: any) {
    if (err.name === "ZodError") {
      const firstIssue = err.issues?.[0]?.message || "Invalid input data";
      return { success: false, error: firstIssue };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}
