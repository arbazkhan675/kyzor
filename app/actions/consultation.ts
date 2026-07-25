"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { consultationSchema, type ConsultationInput } from "@/lib/validations/consultation";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkHashedIpRateLimit } from "@/lib/security/rateLimiter";
import { siteConfig } from "@/lib/config/site";

export async function submitConsultationAction(data: ConsultationInput) {
  // 1. Authoritative Server Validation
  const validation = consultationSchema.safeParse(data);
  if (!validation.success) {
    const formattedErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      if (issue.path.length > 0) {
        formattedErrors[issue.path[0].toString()] = issue.message;
      }
    });
    return {
      error: "Please correct the errors in the form before submitting.",
      fieldErrors: formattedErrors,
    };
  }

  const payload = validation.data;

  // 2. Reject Honeypot Submissions (Bot Protection)
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    // Return silent success to discourage bot retries
    return { success: true, message: "Consultation request received." };
  }

  // 3. Extract Client IP & Check Hashed-IP Rate Limiting
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const ipAddress = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

  const rateCheck = await checkHashedIpRateLimit(ipAddress, "consultation_submit", 5, 15);
  if (!rateCheck.allowed) {
    return {
      error: "Too many consultation requests submitted from this network. Please try again in 15 minutes.",
    };
  }

  // 4. Insert Lead into Supabase via Server-Only Admin Client
  try {
    const supabase = createAdminClient();
    
    // Map project_type value to database enum
    const projectTypeEnum = payload.project_type === "not_sure" ? "other" : payload.project_type;

    const { data: inserted, error: dbError } = await supabase
      .from("consultation_requests")
      .insert({
        name: payload.name,
        email: payload.email,
        company: payload.company || null,
        project_type: projectTypeEnum as any,
        budget: payload.budget || null,
        message: payload.message,
        status: "new",
        ip_address: null, // Raw IP is NOT stored in DB table for privacy
      })
      .select("id")
      .single();

    if (dbError || !inserted) {
      console.error("[Consultation Error] Database insertion failed:", dbError);
      return { error: "Failed to store your consultation request. Please try again or contact us directly." };
    }

    const correlationId = inserted.id;

    // 5. Send Plain, Readable Resend Notification Email
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const recipientEmail = siteConfig.notificationEmail || siteConfig.contactEmail;

        await resend.emails.send({
          from: "Kyzor Consultation <notifications@kyzor.online>",
          to: [recipientEmail],
          subject: `[New Consultation Request] ${payload.name} (${payload.project_type})`,
          text: `
NEW CONSULTATION REQUEST SUBMITTED ON KYZOR.ONLINE
---------------------------------------------------
Correlation ID: ${correlationId}

Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || "N/A"}
Phone/WhatsApp: ${payload.phone || "N/A"}
Project Type: ${payload.project_type}
Budget Range: ${payload.budget || "N/A"}

Project Summary:
${payload.message}

UTM Attribution:
Source: ${payload.utm_source || "Direct"}
Medium: ${payload.utm_medium || "N/A"}
Campaign: ${payload.utm_campaign || "N/A"}
---------------------------------------------------
          `.trim(),
        });
      } catch (emailError) {
        // 6. Graceful Email Fallback: Keep stored lead in DB and log correlation ID
        console.warn(`[Consultation Correlation ID: ${correlationId}] Email notification dispatch failed, lead preserved in Supabase DB:`, emailError);
      }
    } else {
      console.log(`[Consultation Correlation ID: ${correlationId}] RESEND_API_KEY not configured. Lead stored in DB.`);
    }

    return {
      success: true,
      correlationId,
      message: "Thank you! Your consultation request has been received. Our senior product engineers will review your requirements and reach out within 24 hours.",
    };
  } catch (err: any) {
    console.error("[Consultation Error] Unexpected error during submission:", err);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
