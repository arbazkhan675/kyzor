"use client";

import { track } from "@vercel/analytics";

export type AllowedAnalyticsEvent =
  | "ecommerce_tab_selected"
  | "automation_tab_selected"
  | "consultation_cta_clicked"
  | "whatsapp_clicked"
  | "consultation_form_started"
  | "consultation_form_submitted"
  | "consultation_form_failed"
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
    const safeProperties: Record<string, string | number | boolean> = {};

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      if (utmSource) {
        safeProperties.utm_source = utmSource;
      }
      if (document.referrer) {
        safeProperties.referrer = document.referrer.slice(0, 100);
      }
    }

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
  } catch {
    // Fail silently in development or when blocked
  }
}
