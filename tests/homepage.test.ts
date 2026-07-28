import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Homepage Architecture & Section Order Verification", () => {
  it("verifies app/page.tsx includes required sections in exact order", () => {
    const pagePath = path.join(process.cwd(), "app/page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");

    // Section 1: Hero
    expect(content).toContain("<HeroTabSection />");

    // Section 2: Who Kyzor Is For Qualification Section
    expect(content).toContain("Who Kyzor Is For");
    expect(content).toContain("Kyzor is a good fit when:");
    expect(content).toContain("A standard platform may be better when:");

    // Section 3: Five-stage Connected Engineering Process
    expect(content).toContain("Connected Engineering Process");

    // Section 4: Three Principles of Custom Engineering
    expect(content).toContain("Three Principles of Custom Engineering");

    // Section 5: Founder Trust Strip
    expect(content).toContain("Arbaz Khan");
    expect(content).toContain("Founder & Principal Engineer");

    // Section 6: Final Consultation Dark Panel
    expect(content).toContain("Have a workflow or commerce requirement that standard tools cannot handle?");
    expect(content).toContain("Request a Free Consultation");
  });
});
