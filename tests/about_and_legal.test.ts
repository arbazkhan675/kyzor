import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("About Page & Legal Trust Pages Specifications", () => {
  it("verifies founder identity and core belief copy on About page", () => {
    const aboutPath = path.join(process.cwd(), "app/about/page.tsx");
    const content = fs.readFileSync(aboutPath, "utf-8");

    expect(content).toContain("Arbaz Khan");
    expect(content).toContain("Founder & Principal Engineer");
    expect(content).toContain("Ahmedabad, Gujarat, India");
  });

  it("verifies About page includes 3 working stages and 4 operating principles", () => {
    const aboutPath = path.join(process.cwd(), "app/about/page.tsx");
    const content = fs.readFileSync(aboutPath, "utf-8");

    // 3 Working Stages
    expect(content).toContain("Understand the operation");
    expect(content).toContain("Design and build the system");
    expect(content).toContain("Launch, support and improve");

    // 4 Operating Principles
    expect(content).toContain("Business-first");
    expect(content).toContain("Custom-built");
    expect(content).toContain("Direct communication");
    expect(content).toContain("Supported after launch");
  });

  it("verifies Privacy page includes required sections and contact method", () => {
    const privacyPath = path.join(process.cwd(), "app/privacy/page.tsx");
    const content = fs.readFileSync(privacyPath, "utf-8");

    expect(content).toContain("Last Updated: July 2026");
    expect(content).toContain("Supabase");
    expect(content).toContain("Resend");
    expect(content).toContain("kyzorcommerce@gmail.com");
  });

  it("verifies Terms page includes separate client project contracts clause", () => {
    const termsPath = path.join(process.cwd(), "app/terms/page.tsx");
    const content = fs.readFileSync(termsPath, "utf-8");

    expect(content).toContain("Last Updated: July 2026");
    expect(content).toContain("Separate Client Project Contracts");
    expect(content).toContain("Master Service Agreements");
  });
});
