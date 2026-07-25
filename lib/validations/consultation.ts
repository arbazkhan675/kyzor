import { z } from "zod";

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  email: z.string().email("Please enter a valid business email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number cannot exceed 20 characters")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .max(120, "Company name cannot exceed 120 characters")
    .optional()
    .or(z.literal("")),
  project_type: z.enum(["ecommerce", "automation", "both", "not_sure", "other"], {
    message: "Please select a valid project focus area",
  }),
  budget: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .min(30, "Please describe your project summary in at least 30 characters")
    .max(3000, "Project summary cannot exceed 3000 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to be contacted regarding your consultation request" }),
  }),
  honeypot: z.string().max(0, "Bot submission detected").optional().or(z.literal("")),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
