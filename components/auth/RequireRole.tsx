"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type Role = "intern" | "admin" | null;

export function RequireRole({
  allow,
  children,
}: {
  allow: Exclude<Role, null>;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      // 1. Check if user is logged in
      if (!user) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      // 2. Sample Role Checking Logic
      // In a real app, this would be stored in the database ('profiles' table) or JWT user metadata.
      // For this sample, we check the email explicitly.
      const isSampleAdmin = user.email === "admin@kyzor.com";
      const role: Role = isSampleAdmin ? "admin" : "intern";

      // 3. Verify access
      if (role !== allow) {
        router.replace(role === "admin" ? "/admin/dashboard" : "/dashboard");
        return;
      }

      setOk(true);
    });
  }, [allow, pathname, router]);

  if (!ok) return null;
  return <>{children}</>;
}