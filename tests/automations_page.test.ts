import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Business Automations Page Specification & Copy Rules", () => {
  const pagePath = path.join(process.cwd(), "app/automations/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");

  it("verifies exact required hero copy strings", () => {
    expect(content).toContain("Custom automation for the way your business works.");
    expect(content).toContain("Tell us what your team repeatedly does. We design and build a reliable system that handles those steps automatically.");
  });

  it("verifies mandatory statement line exists", () => {
    expect(content).toContain("If a process follows repeatable steps, there is a good chance Kyzor can automate it.");
  });

  it("verifies all 4 category cards are present", () => {
    expect(content).toContain("Customer Communication");
    expect(content).toContain("Sales & Leads");
    expect(content).toContain("Business Operations");
    expect(content).toContain("AI Agents");
  });

  it("verifies 6 example workflow titles exist", () => {
    expect(content).toContain("New Lead Follow-up");
    expect(content).toContain("Customer Support");
    expect(content).toContain("Order Updates");
    expect(content).toContain("Appointment Booking");
    expect(content).toContain("Email Processing");
    expect(content).toContain("Business Reporting");
  });

  it("verifies human handoff awareness is stated", () => {
    const lower = content.toLowerCase();
    expect(lower).toContain("human");
    expect(lower).toContain("escalat");
  });
});
