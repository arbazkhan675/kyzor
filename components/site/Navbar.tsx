"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        backgroundColor: "rgba(15, 12, 30, 0.75)",
        borderBottom: "1px solid rgba(97, 95, 255, 0.2)",
        boxShadow: "0 1px 30px rgba(97, 95, 255, 0.08), 0 0 0 1px rgba(97,95,255,0.04)",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "72rem",
          padding: "0 1.5rem",
          height: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo1.png"
              alt="KYZOR Logo"
              style={{ height: "3.5rem", width: "auto", objectFit: "contain" }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              letterSpacing: "0.25em",
              color: "#ffffff",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            KYZOR
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            href="/login"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#615FFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            Login
          </Link>

          {/* CTA Button */}
          <Link
            href="/book"
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#615FFF",
              border: "1px solid #615FFF",
              background: "transparent",
              padding: "0.55rem 1.4rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(97,95,255,0.12)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(97,95,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}