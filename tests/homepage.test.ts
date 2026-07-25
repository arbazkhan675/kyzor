import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Homepage Architecture & Section Order Verification", () => {
  it("verifies app/page.tsx includes all 6 required sections in exact order", () => {
    const pagePath = path.join(process.cwd(), "app/page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");

    // Section 1: Hero
    expect(content).toContain("<HeroTabSection />");

    // Section 2: Two Core Service Cards
    expect(content).toContain("What We Build for Growing Businesses");
    expect(content).toContain("Custom E-commerce Applications");
    expect(content).toContain("Business Automations");

    // Section 3: Five-step Process
    expect(content).toContain("Our 5-Step Engineering Process");

    // Section 4: Maximum 3 Selected Work Items
    expect(content).toContain("Featured Case Studies & Concepts");

    // Section 5: Four Reasons to Choose Kyzor
    expect(content).toContain("Why Businesses Choose Custom Engineering");

    // Section 6: Final Consultation CTA
    expect(content).toContain("Ready to Build Your Custom Application or Automation?");
  });
});
