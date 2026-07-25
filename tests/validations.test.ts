import { describe, it, expect } from "vitest";
import { consultationSchema } from "../lib/validations/consultation";
import { workItemSchema } from "../lib/validations/work";

describe("Consultation Schema Validation", () => {
  it("validates a correct consultation input", () => {
    const validData = {
      name: "Adnan Sherwani",
      email: "adnan@example.com",
      company: "Kyzor Inc",
      project_type: "ecommerce",
      budget: "$15,000 - $30,000",
      message: "We need a custom e-commerce application built from scratch with tailored database schemas.",
      consent: true as const,
    };

    const result = consultationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails on invalid email", () => {
    const invalidData = {
      name: "Adnan",
      email: "invalid-email",
      project_type: "ecommerce",
      message: "Testing invalid email input",
      consent: true,
    };

    const result = consultationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("fails on short message (< 30 chars)", () => {
    const invalidData = {
      name: "Adnan",
      email: "adnan@example.com",
      project_type: "automation",
      message: "Short",
      consent: true,
    };

    const result = consultationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe("Work Item Schema Validation", () => {
  it("validates a valid work item", () => {
    const validWork = {
      title: "Nexus Luxury E-commerce",
      slug: "nexus-luxury-ecommerce",
      summary: "Custom e-commerce application built from scratch.",
      category: "ecommerce",
      is_demo: true,
      challenge: "High checkout friction on standard platforms.",
      solution: "Engineered bespoke Next.js and Supabase backend.",
      results: ["Sub-200ms load times"],
      technologies: ["Next.js", "TypeScript", "Supabase"],
      published: true,
    };

    const result = workItemSchema.safeParse(validWork);
    expect(result.success).toBe(true);
  });
});
