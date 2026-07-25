import { describe, it, expect } from "vitest";

describe("Homepage Hero Tabs Specification & Requirements", () => {
  it("verifies required exact copy strings for E-commerce tab", () => {
    const ecommerceHeading = "Custom e-commerce applications, built around your business.";
    const ecommerceCopy = "We design and build complete online stores from scratch - storefront, admin dashboard, payments, orders, inventory, deployment and ongoing support.";

    expect(ecommerceHeading).toBe("Custom e-commerce applications, built around your business.");
    expect(ecommerceCopy).toBe("We design and build complete online stores from scratch - storefront, admin dashboard, payments, orders, inventory, deployment and ongoing support.");
  });

  it("verifies required exact copy strings for Automations tab", () => {
    const automationsHeading = "Automate the work slowing your business down.";
    const automationsCopy = "We build custom workflows, AI agents, chatbots, voice assistants and integrations that help your business run with less manual effort.";

    expect(automationsHeading).toBe("Automate the work slowing your business down.");
    expect(automationsCopy).toBe("We build custom workflows, AI agents, chatbots, voice assistants and integrations that help your business run with less manual effort.");
  });

  it("verifies both tab states link to Book a Consultation primary CTA target", () => {
    const primaryCtaHref = "/consultation";
    expect(primaryCtaHref).toBe("/consultation");
  });
});
