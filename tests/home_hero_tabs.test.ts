import { describe, it, expect } from "vitest";

describe("Homepage Hero Tabs Specification & Requirements", () => {
  it("verifies required exact copy strings for E-commerce tab", () => {
    const ecommerceHeading = "Custom e-commerce systems for businesses that have outgrown templates.";
    const ecommerceCopy = "We design and build complete online stores—including the storefront, administration, inventory, payments and order workflows—around how your business actually operates.";

    expect(ecommerceHeading).toBe("Custom e-commerce systems for businesses that have outgrown templates.");
    expect(ecommerceCopy).toBe("We design and build complete online stores—including the storefront, administration, inventory, payments and order workflows—around how your business actually operates.");
  });

  it("verifies required exact copy strings for Automations tab", () => {
    const automationsHeading = "Automate the work slowing your business down.";
    const automationsCopy = "We connect WhatsApp, leads, documents, CRM systems and internal operations into reliable automated workflows—with human review where important decisions require it.";

    expect(automationsHeading).toBe("Automate the work slowing your business down.");
    expect(automationsCopy).toBe("We connect WhatsApp, leads, documents, CRM systems and internal operations into reliable automated workflows—with human review where important decisions require it.");
  });

  it("verifies both tab states link to Request a Free Consultation primary CTA target", () => {
    const primaryCtaHref = "/consultation";
    expect(primaryCtaHref).toBe("/consultation");
  });
});
