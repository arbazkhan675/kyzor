import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Discoverability, Analytics & Security Headers Specification Tests", () => {
  it("verifies RootLayout includes metadataBase https://www.kyzor.online and Organization JSON-LD", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");

    expect(content).toContain('metadataBase: new URL("https://www.kyzor.online")');
    expect(content).toContain('"@type": "Organization"');
    expect(content).toContain("<Analytics />");
    expect(content).toContain("<SpeedInsights />");
  });

  it("verifies trackEvent strictly filters out PII keys", () => {
    const trackPath = path.join(process.cwd(), "lib/analytics/track.ts");
    const content = fs.readFileSync(trackPath, "utf-8");

    expect(content).toContain('"email"');
    expect(content).toContain('"name"');
    expect(content).toContain('"phone"');
    expect(content).toContain('"message"');
    expect(content).toContain('"company"');
  });

  it("verifies security headers are configured in next.config.ts", () => {
    const configPath = path.join(process.cwd(), "next.config.ts");
    const content = fs.readFileSync(configPath, "utf-8");

    expect(content).toContain("X-Frame-Options");
    expect(content).toContain("DENY");
    expect(content).toContain("X-Content-Type-Options");
    expect(content).toContain("Strict-Transport-Security");
  });

  it("verifies robots.txt disallows /admin/", () => {
    const robotsPath = path.join(process.cwd(), "app/robots.ts");
    const content = fs.readFileSync(robotsPath, "utf-8");

    expect(content).toContain('disallow: ["/admin/", "/api/"]');
  });
});
