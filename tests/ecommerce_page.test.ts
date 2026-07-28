import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Custom E-commerce Route Redirection Rules", () => {
  it("verifies /ecommerce executes permanentRedirect to /?service=ecommerce", () => {
    const pagePath = path.join(process.cwd(), "app/ecommerce/page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");

    expect(content).toContain('permanentRedirect("/?service=ecommerce")');
  });
});
