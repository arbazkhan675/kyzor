import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("About Page & Legal Trust Pages Specifications", () => {
  it("verifies exact opening statement and belief copy on About page", () => {
    const aboutPath = path.join(process.cwd(), "app/about/page.tsx");
    const content = fs.readFileSync(aboutPath, "utf-8");

    expect(content).toContain("Kyzor is a digital product and automation agency that builds complete custom systems from the ground up.");
    expect(content).toContain("Technology should adapt to the business - not force the business to adapt to a template.");
  });

  it("verifies About page includes 5 stages and 4 differentiators", () => {
    const aboutPath = path.join(process.cwd(), "app/about/page.tsx");
    const content = fs.readFileSync(aboutPath, "utf-8");

    // 5 Stages
    expect(content).toContain("Understand");
    expect(content).toContain("Design");
    expect(content).toContain("Build");
    expect(content).toContain("Deploy");
    expect(content).toContain("Support");

    // 4 Differentiators
    expect(content).toContain("Custom-Built");
    expect(content).toContain("Business-First");
    expect(content).toContain("Fully Deployed");
    expect(content).toContain("Supported After Launch");
  });

  it("verifies Privacy page includes required sections and contact method", () => {
    const privacyPath = path.join(process.cwd(), "app/privacy/page.tsx");
    const content = fs.readFileSync(privacyPath, "utf-8");

    expect(content).toContain("OWNER REVIEW REQUIRED");
    expect(content).toContain("Last Updated: July 2026");
    expect(content).toContain("Supabase");
    expect(content).toContain("Resend");
    expect(content).toContain("contact@kyzor.online");
  });

  it("verifies Terms page includes separate client project contracts clause", () => {
    const termsPath = path.join(process.cwd(), "app/terms/page.tsx");
    const content = fs.readFileSync(termsPath, "utf-8");

    expect(content).toContain("OWNER REVIEW REQUIRED");
    expect(content).toContain("Last Updated: July 2026");
    expect(content).toContain("Separate Client Project Contracts");
    expect(content).toContain("Master Service Agreements");
  });
});
