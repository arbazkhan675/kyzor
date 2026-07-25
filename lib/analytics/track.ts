"use client";

import { track } from "@vercel/analytics";

export type AllowedAnalyticsEvent =
  | "consultation_cta_click"
  | "consultation_form_start"
  | "consultation_submit_success"
  | "work_item_open"
  | "hero_tab_change";

export function trackEvent(
  eventName: AllowedAnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  try {
    // Ensure no PII (emails, names, phone numbers) is included in analytics properties
    const safeProperties: Record<string, string | number | boolean> = {};

    if (properties) {
      Object.entries(properties).forEach(([key, val]) => {
        // Exclude any keys containing PII patterns
        if (
          !key.toLowerCase().includes("email") &&
          !key.toLowerCase().includes("name") &&
          !key.toLowerCase().includes("phone") &&
          !key.toLowerCase().includes("message") &&
          !key.toLowerCase().includes("company")
        ) {
          safeProperties[key] = val;
        }
      });
    }

    track(eventName, safeProperties);
  } catch (err) {
    // Fail silently in development or when blocked
  }
}
