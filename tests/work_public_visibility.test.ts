import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Public Work Gallery & Visibility Rules Tests", () => {
  it("verifies /work executes permanentRedirect to homepage /", () => {
    const workPagePath = path.join(process.cwd(), "app/work/page.tsx");
    const content = fs.readFileSync(workPagePath, "utf-8");

    expect(content).toContain('permanentRedirect("/")');
  });

  it("verifies /work/[slug] executes permanentRedirect to homepage /", () => {
    const slugPagePath = path.join(process.cwd(), "app/work/[slug]/page.tsx");
    const content = fs.readFileSync(slugPagePath, "utf-8");

    expect(content).toContain('permanentRedirect("/")');
  });

  it("verifies sitemap excludes /work route", () => {
    const sitemapPath = path.join(process.cwd(), "app/sitemap.ts");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    expect(content).not.toContain('`${baseUrl}/work`');
  });
});
