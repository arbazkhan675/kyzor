import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Security Architecture & Policy Intent Tests", () => {
  it("ensures service-role client admin module is strictly server-only", () => {
    const adminClientPath = path.join(process.cwd(), "lib/supabase/admin.ts");
    const content = fs.readFileSync(adminClientPath, "utf-8");
    expect(content).toContain('import "server-only"');
  });

  it("verifies RLS migration file enables RLS on all tables and restricts consultation_requests direct public insert", () => {
    const migrationPath = path.join(process.cwd(), "supabase/migrations/002_reproducible_foundation.sql");
    const migrationContent = fs.readFileSync(migrationPath, "utf-8");

    // All tables must enable RLS
    expect(migrationContent).toContain("ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;");
    expect(migrationContent).toContain("ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;");
    expect(migrationContent).toContain("ALTER TABLE public.work_items ENABLE ROW LEVEL SECURITY;");
    expect(migrationContent).toContain("ALTER TABLE public.work_images ENABLE ROW LEVEL SECURITY;");
    expect(migrationContent).toContain("ALTER TABLE public.form_rate_limits ENABLE ROW LEVEL SECURITY;");

    // Must include public.is_admin() SECURITY DEFINER helper
    expect(migrationContent).toContain("CREATE OR REPLACE FUNCTION public.is_admin()");
    expect(migrationContent).toContain("SECURITY DEFINER");
    expect(migrationContent).toContain("SET search_path = public, auth");

    // Ensures NO public direct INSERT policy exists for consultation_requests
    expect(migrationContent).not.toContain('CREATE POLICY "Public can insert consultation_requests"');
  });
});
