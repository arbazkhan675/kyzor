import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Public Work Gallery & Visibility Rules Tests", () => {
  it("verifies /work query filters exclusively published work items", () => {
    const workPagePath = path.join(process.cwd(), "app/work/page.tsx");
    const content = fs.readFileSync(workPagePath, "utf-8");

    expect(content).toContain('.eq("published", true)');
  });

  it("verifies /work/[slug] returns notFound() for missing or unpublished draft items", () => {
    const slugPagePath = path.join(process.cwd(), "app/work/[slug]/page.tsx");
    const content = fs.readFileSync(slugPagePath, "utf-8");

    expect(content).toContain('.eq("published", true)');
    expect(content).toContain("notFound()");
  });

  it("verifies /work page includes category filters: All, E-commerce, Automations only", () => {
    const workPagePath = path.join(process.cwd(), "app/work/page.tsx");
    const content = fs.readFileSync(workPagePath, "utf-8");

    expect(content).toContain("All Work");
    expect(content).toContain("E-commerce");
    expect(content).toContain("Automations");
  });

  it("verifies dynamic sitemap fetches published work items", () => {
    const sitemapPath = path.join(process.cwd(), "app/sitemap.ts");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    expect(content).toContain('.eq("published", true)');
    expect(content).toContain("`${baseUrl}/work/${item.slug}`");
  });
});
