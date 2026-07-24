import { z } from "zod";

export const workItemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  category: z.enum(["ecommerce", "automation", "integrated"]),
  is_demo: z.boolean().default(false),
  client_name: z.string().optional(),
  challenge: z.string().min(10, "Challenge description required"),
  solution: z.string().min(10, "Solution description required"),
  results: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  hero_image_url: z.string().url("Invalid image URL").optional().or(z.literal("")),
  published: z.boolean().default(true),
});

export type WorkItemInput = z.infer<typeof workItemSchema>;
