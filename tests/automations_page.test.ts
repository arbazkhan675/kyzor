import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Business Automations Route Redirection Rules", () => {
  it("verifies /automations executes permanentRedirect to homepage /", () => {
    const pagePath = path.join(process.cwd(), "app/automations/page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");

    expect(content).toContain('permanentRedirect("/")');
  });
});
