import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Custom E-commerce Application Page Specification & Copy Rules", () => {
  const pagePath = path.join(process.cwd(), "app/ecommerce/page.tsx");
  const content = fs.readFileSync(pagePath, "utf-8");

  it("verifies exact required hero copy strings", () => {
    expect(content).toContain("A complete commerce application - designed, built and deployed for your business.");
    expect(content).toContain("From product browsing and checkout to inventory, orders and administration, Kyzor builds the full system from scratch and launches it on your domain.");
  });

  it("verifies strict content prohibitions (no prohibited terms present)", () => {
    const lower = content.toLowerCase();
    expect(lower).not.toContain("shopify");
    expect(lower).not.toContain("woocommerce");
    expect(lower).not.toContain("headless commerce");
    expect(lower).not.toContain("templates");
    expect(lower).not.toContain("platform migration");
  });

  it("verifies all 6 capability card titles are present", () => {
    expect(content).toContain("Custom Storefront");
    expect(content).toContain("Products & Inventory");
    expect(content).toContain("Cart & Payments");
    expect(content).toContain("Orders & Delivery");
    expect(content).toContain("Customer Accounts");
    expect(content).toContain("Admin Dashboard");
  });

  it("verifies compact deliverables strip items exist", () => {
    expect(content).toContain("Custom Design");
    expect(content).toContain("Frontend Storefront");
    expect(content).toContain("Backend Architecture");
    expect(content).toContain("Database System");
    expect(content).toContain("Admin Dashboard");
    expect(content).toContain("Domain Deployment");
    expect(content).toContain("Ongoing Maintenance");
  });

  it("verifies optional functionality grid items count is maximum 8", () => {
    expect(content).toContain("Subscriptions & Recurring Billing");
    expect(content).toContain("Multi-Vendor Marketplace");
    expect(content).toContain("Wholesale & B2B Pricing");
    expect(content).toContain("Product Customisation Engines");
    expect(content).toContain("Loyalty & Rewards Programs");
    expect(content).toContain("Multiple Location Inventory");
    expect(content).toContain("Advanced Business Reports");
    expect(content).toContain("Custom API & ERP Integrations");
  });
});
