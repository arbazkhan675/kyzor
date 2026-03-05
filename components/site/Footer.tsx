"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(97, 95, 255, 0.12)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "0.3em",
            color: "#615FFF",
            textTransform: "uppercase",
          }}
        >
          KYZOR
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.72rem",
            color: "var(--muted)",
          }}
        >
          <span>© 2026 KYZOR — All systems operational</span>
          <Link
            href="/login"
            style={{
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#615FFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            Intern Login
          </Link>
        </div>
      </div>
    </footer>
  );
}