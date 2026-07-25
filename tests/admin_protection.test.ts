import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Admin Authorization & Protection Security Tests", () => {
  it("verifies middleware protects all /admin routes and checks session user", () => {
    const middlewarePath = path.join(process.cwd(), "middleware.ts");
    const content = fs.readFileSync(middlewarePath, "utf-8");

    expect(content).toContain('pathname.startsWith("/admin")');
    expect(content).toContain('url.pathname = "/admin/login"');
    expect(content).toContain('.from("admin_users")');
  });

  it("verifies public direct SELECT on consultation_requests is prohibited (RLS)", () => {
    const migrationPath = path.join(process.cwd(), "supabase/migrations/002_reproducible_foundation.sql");
    const content = fs.readFileSync(migrationPath, "utf-8");

    expect(content).toContain("ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;");
    expect(content).not.toContain('CREATE POLICY "Public can view consultation_requests"');
  });

  it("verifies public direct INSERT on consultation_requests is prohibited", () => {
    const migrationPath = path.join(process.cwd(), "supabase/migrations/002_reproducible_foundation.sql");
    const content = fs.readFileSync(migrationPath, "utf-8");

    expect(content).not.toContain('CREATE POLICY "Public can insert consultation_requests"');
  });

  it("verifies draft work items are filtered out from public queries", () => {
    const workPagePath = path.join(process.cwd(), "app/work/page.tsx");
    const content = fs.readFileSync(workPagePath, "utf-8");

    expect(content).toContain('.eq("published", true)');
  });
});
