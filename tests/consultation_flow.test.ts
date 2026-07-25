import { describe, it, expect } from "vitest";
import { consultationSchema } from "../lib/validations/consultation";

describe("Book a Consultation Validation & Security Flow", () => {
  it("accepts a valid consultation payload matching all constraints", () => {
    const validData = {
      name: "Marcus Vance",
      email: "marcus@apexenterprises.com",
      company: "Apex Enterprises",
      phone: "+1 555 234 5678",
      project_type: "ecommerce",
      budget: "$25,000 - $50,000",
      message: "We need a complete custom e-commerce application built from scratch with custom database schemas and inventory sync.",
      consent: true as const,
      honeypot: "",
    };

    const result = consultationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when name is shorter than 2 chars or longer than 80 chars", () => {
    const shortName = {
      name: "A",
      email: "test@example.com",
      project_type: "ecommerce",
      message: "Valid long message describing project requirements...",
      consent: true,
    };
    expect(consultationSchema.safeParse(shortName).success).toBe(false);

    const longName = {
      name: "A".repeat(81),
      email: "test@example.com",
      project_type: "ecommerce",
      message: "Valid long message describing project requirements...",
      consent: true,
    };
    expect(consultationSchema.safeParse(longName).success).toBe(false);
  });

  it("fails when project summary is shorter than 30 chars", () => {
    const shortMessage = {
      name: "Marcus Vance",
      email: "marcus@example.com",
      project_type: "automation",
      message: "Too short message",
      consent: true,
    };

    const result = consultationSchema.safeParse(shortMessage);
    expect(result.success).toBe(false);
  });

  it("fails when consent is false or un-checked", () => {
    const noConsent = {
      name: "Marcus Vance",
      email: "marcus@example.com",
      project_type: "automation",
      message: "Valid long message describing project requirements...",
      consent: false,
    };

    const result = consultationSchema.safeParse(noConsent);
    expect(result.success).toBe(false);
  });

  it("detects and fails when honeypot field is filled", () => {
    const botData = {
      name: "Spam Bot",
      email: "bot@spam.com",
      project_type: "ecommerce",
      message: "Spam message containing promotional links...",
      consent: true,
      honeypot: "http://spam-link.com",
    };

    const result = consultationSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });
});
