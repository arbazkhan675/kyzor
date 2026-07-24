import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  project_type: z.enum(["ecommerce", "automation", "both", "other"], {
    message: "Please select a valid project type",
  }),
  budget: z.string().optional(),
  message: z.string().min(10, "Please describe your project in at least 10 characters"),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
