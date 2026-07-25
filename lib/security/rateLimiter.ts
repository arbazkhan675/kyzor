import "server-only";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export async function checkHashedIpRateLimit(
  ipAddress: string,
  action: string = "consultation_submit",
  maxRequests: number = 5,
  windowMinutes: number = 15
): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const salt = process.env.RATE_LIMIT_SALT || "kyzor_secure_salt_2026";
    const hashedIp = crypto
      .createHash("sha256")
      .update(`${ipAddress}:${salt}`)
      .digest("hex");

    const supabase = createAdminClient();
    const now = new Date();

    // Query active rate limit record for this hashed IP & action
    const { data: records } = await supabase
      .from("form_rate_limits")
      .select("*")
      .eq("ip_address", hashedIp)
      .eq("action", action)
      .gt("reset_at", now.toISOString())
      .limit(1);

    if (records && records.length > 0) {
      const existing = records[0];
      if (existing.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
      }

      // Increment count
      await supabase
        .from("form_rate_limits")
        .update({ count: existing.count + 1 })
        .eq("id", existing.id);

      return { allowed: true, remaining: maxRequests - (existing.count + 1) };
    }

    // Insert new rate limit record
    const resetAt = new Date(now.getTime() + windowMinutes * 60 * 1000).toISOString();
    await supabase.from("form_rate_limits").insert({
      ip_address: hashedIp,
      action: action,
      count: 1,
      reset_at: resetAt,
    });

    return { allowed: true, remaining: maxRequests - 1 };
  } catch (error) {
    // Fail-open gracefully if DB rate-limit query encounters error
    return { allowed: true, remaining: 1 };
  }
}
