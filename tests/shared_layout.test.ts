import { describe, it, expect } from "vitest";
import { siteConfig } from "../lib/config/site";

describe("Shared Layout Configuration & Navigation Integrity", () => {
  it("verifies siteConfig contains valid Kyzor brand metadata", () => {
    expect(siteConfig.name).toBe("Kyzor");
    expect(siteConfig.domain).toBe("https://kyzor.online");
    expect(siteConfig.contactEmail).toContain("@kyzor.online");
  });

  it("verifies navigation items are flat without nested dropdown data structures", () => {
    expect(Array.isArray(siteConfig.navItems)).toBe(true);
    expect(siteConfig.navItems.length).toBe(2);

    siteConfig.navItems.forEach((item) => {
      expect(item).toHaveProperty("label");
      expect(item).toHaveProperty("href");
      // Must not contain children or sub-items (no dropdowns)
      expect((item as any).children).toBeUndefined();
      expect((item as any).dropdown).toBeUndefined();
    });
  });

  it("verifies single CTA button target", () => {
    expect(siteConfig.cta.label).toBe("Book a Consultation");
    expect(siteConfig.cta.href).toBe("/consultation");
  });

  it("verifies placeholder legal routes", () => {
    const hrefs = siteConfig.legalLinks.map((l) => l.href);
    expect(hrefs).toContain("/privacy");
    expect(hrefs).toContain("/terms");
  });
});
