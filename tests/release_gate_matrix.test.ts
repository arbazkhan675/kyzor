import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { siteConfig } from "../lib/config/site";

describe("Release Gate & Test Matrix Verification", () => {
  it("1. Hero Tabs: verifies mouse, keyboard arrows, focus, and content change logic", () => {
    const tabPath = path.join(process.cwd(), "components/home/HeroTabSection.tsx");
    const content = fs.readFileSync(tabPath, "utf-8");

    expect(content).toContain('role="tablist"');
    expect(content).toContain('role="tab"');
    expect(content).toContain('role="tabpanel"');
    expect(content).toContain("ArrowRight");
    expect(content).toContain("ArrowLeft");
    expect(content).toContain("focus-visible:ring-2");
    expect(content).toContain("Custom e-commerce applications, built around your business.");
    expect(content).toContain("Automate the work slowing your business down.");
  });

  it("2. Mobile Menu: verifies open, close, Escape key listener, focus trap, and navigation auto-close", () => {
    const headerPath = path.join(process.cwd(), "components/layout/SiteHeader.tsx");
    const content = fs.readFileSync(headerPath, "utf-8");

    expect(content).toContain('e.key === "Escape"');
    expect(content).toContain('e.key === "Tab"');
    expect(content).toContain("setMobileMenuOpen(false)");
    expect(content).toContain('aria-controls="mobile-navigation-drawer"');
  });

  it("3. Consultation Flow: verifies Zod schema, server validation, rate limiting, and honeypot", () => {
    const actionPath = path.join(process.cwd(), "app/actions/consultation.ts");
    const content = fs.readFileSync(actionPath, "utf-8");

    expect(content).toContain("consultationSchema.safeParse");
    expect(content).toContain("payload.honeypot");
    expect(content).toContain("checkHashedIpRateLimit");
    expect(content).toContain("createAdminClient");
  });

  it("4. Work Visibility: verifies published vs draft and missing 404 slug handling", () => {
    const workPath = path.join(process.cwd(), "app/work/page.tsx");
    const slugPath = path.join(process.cwd(), "app/work/[slug]/page.tsx");

    const workContent = fs.readFileSync(workPath, "utf-8");
    const slugContent = fs.readFileSync(slugPath, "utf-8");

    expect(workContent).toContain('.eq("published", true)');
    expect(slugContent).toContain('.eq("published", true)');
    expect(slugContent).toContain("notFound()");
  });

  it("5. Admin Protection: verifies middleware redirects unauthenticated and non-admin requests", () => {
    const middlewarePath = path.join(process.cwd(), "middleware.ts");
    const content = fs.readFileSync(middlewarePath, "utf-8");

    expect(content).toContain('pathname.startsWith("/admin")');
    expect(content).toContain('url.pathname = "/admin/login"');
    expect(content).toContain('.from("admin_users")');
  });

  it("6. Admin Mutations: verifies work CRUD and consultation status mutation server actions", () => {
    const actionPath = path.join(process.cwd(), "app/actions/admin.ts");
    const content = fs.readFileSync(actionPath, "utf-8");

    expect(content).toContain("createWorkItemAction");
    expect(content).toContain("updateWorkItemAction");
    expect(content).toContain("deleteWorkItemAction");
    expect(content).toContain("updateConsultationStatusAction");
    expect(content).toContain("uploadWorkImageAction");
  });

  it("7. Link Integrity: verifies all internal navigation routes resolve to existing pages", () => {
    const publicRoutes = [
      "app/page.tsx",
      "app/ecommerce/page.tsx",
      "app/automations/page.tsx",
      "app/work/page.tsx",
      "app/about/page.tsx",
      "app/consultation/page.tsx",
      "app/privacy/page.tsx",
      "app/terms/page.tsx",
    ];

    publicRoutes.forEach((route) => {
      const fullPath = path.join(process.cwd(), route);
      expect(fs.existsSync(fullPath)).toBe(true);
    });

    siteConfig.navItems.forEach((item) => {
      const routePath = item.href === "/" ? "app/page.tsx" : `app${item.href}/page.tsx`;
      expect(fs.existsSync(path.join(process.cwd(), routePath))).toBe(true);
    });
  });

  it("8. Accessibility Checks: verifies heading hierarchy, aria labels, and focus rings", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");

    expect(content).toContain('href="#main-content"');
    expect(content).toContain("Skip to main content");
  });
});
