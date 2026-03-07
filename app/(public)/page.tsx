"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GlitchText } from "@/components/effects/GlitchText";

export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "8rem",
          paddingBottom: "8rem",
          overflow: "hidden",
        }}
      >
        {/* Floating orbs */}
        <div className="orb" style={{ width: "600px", height: "600px", background: "#615FFF", top: "-100px", left: "-200px", animationDelay: "0s" }} />
        <div className="orb" style={{ width: "450px", height: "450px", background: "#3d3bcc", bottom: "-80px", right: "-150px", animationDelay: "3s" }} />
        <div className="orb" style={{ width: "300px", height: "300px", background: "#615FFF", top: "50%", right: "20%", animationDelay: "6s" }} />

        {/* Scanline */}
        <div className="scanline" />

        {/* Hero content */}
        <div className="section-inner" style={{ position: "relative", zIndex: 2, width: "100%" }}>

          {/* Tag line */}
          <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", animationDelay: "0.1s" }}>
            <div style={{ width: "40px", height: "1px", background: "#615FFF" }} />
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#615FFF", display: "inline-block", boxShadow: "0 0 8px #615FFF", animation: "pulseDot 1.5s ease-in-out infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#615FFF", fontWeight: 700 }}>
              Now Global — Accepting Clients
            </span>
          </div>

          {/* Headline */}
          <h1
            className="fade-up"
            style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(3.5rem, 8vw, 7.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "2rem", animationDelay: "0.2s" }}
          >
            <span style={{ display: "block" }}>
              <GlitchText text="Automate" />
            </span>
            <span style={{ display: "block", color: "transparent", WebkitTextStroke: "1px rgba(97,95,255,0.6)" }}>The Future</span>
            <span style={{ display: "block", color: "#615FFF", textShadow: "0 0 60px rgba(97,95,255,0.4)" }}>Now.</span>
          </h1>

          {/* Subheading */}
          <p className="fade-up" style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "500px", marginBottom: "2.5rem", animationDelay: "0.35s" }}>
            We build chatbots, AI agents, and workflow automations that scale startups and agencies with surgical precision.{" "}
            <span className="blink-cursor" style={{ color: "#615FFF" }}>_</span>
          </p>

          {/* CTA Buttons */}
          <div className="fade-up hero-btns" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", animationDelay: "0.5s" }}>
            <Link
              href="/book"
              className="btn-angular"
              style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#050508", backgroundColor: "#615FFF", padding: "0.9rem 2rem", textDecoration: "none", display: "inline-block", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 24px rgba(97,95,255,0.45)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              Schedule a Sync
            </Link>
            <Link
              href="/login"
              className="btn-angular"
              style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "var(--text)", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.15)", padding: "0.9rem 2rem", textDecoration: "none", display: "inline-block", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#615FFF"; el.style.color = "#615FFF"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.color = "var(--text)"; }}
            >
              Intern Access
            </Link>
          </div>

          {/* Stats row */}
          <div className="fade-up stats-row" style={{ marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(97,95,255,0.15)", display: "flex", gap: "3rem", flexWrap: "wrap", animationDelay: "0.65s" }}>
            {[
              { value: "24/7", label: "Uptime Guarantee" },
              { value: "~14d", label: "Avg. Delivery" },
              { value: "4+", label: "Core Services" },
              { value: "0→∞", label: "Scales With You" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "2rem", color: "#615FFF", textShadow: "0 0 20px rgba(97,95,255,0.35)", lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.4rem" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <div style={{ background: "#615FFF", overflow: "hidden", padding: "0.8rem 0", position: "relative", zIndex: 2 }}>
        <div className="ticker-track">
          {[1, 2].map((i) => (
            <span key={i} style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, color: "#050508", whiteSpace: "nowrap", paddingRight: "4rem" }}>
              AI Chatbots ✦ Workflow Automation ✦ n8n Pipelines ✦ AI Agents ✦ Custom AI Tools ✦ Lead Capture ✦ Ops Automation ✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ───────────────────────────────────────── */}
      <section style={{ padding: "8rem 1.5rem", position: "relative", zIndex: 2 }}>
        <div className="section-inner">
          <ScrollReveal>
            <div style={{ marginBottom: "4rem" }}>
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#615FFF", marginBottom: "1rem" }}>— Services</p>
              <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", lineHeight: 1.1 }}>What We Build</h2>
            </div>
          </ScrollReveal>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: "rgba(97,95,255,0.18)" }}>
            {[
              { n: "01", title: "AI Chatbots", desc: "Customer support and lead capture bots that run 24/7. Trained on your data, deployed across your channels — never miss a lead again." },
              { n: "02", title: "Workflow Automation (n8n)", desc: "Automate your entire ops stack across tools without hiring more people. We build reliable n8n pipelines that scale with your business." },
              { n: "03", title: "AI Agents", desc: "Autonomous agents that research, summarize, and execute multi-step tasks end to end. Let AI handle the repetitive cognitive work so your team can focus." },
              { n: "04", title: "Custom AI Tools", desc: "Internal tools built around your exact workflow — no bloat, no compromises. Purpose-built and production-ready from day one." },
            ].map((s, i) => (
              <ScrollReveal key={s.n} delay={i * 100}>
                <div
                  style={{
                    background: "linear-gradient(145deg, rgba(20,18,40,1) 0%, rgba(12,11,22,1) 100%)",
                    padding: "3rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    height: "100%",
                    borderTop: "1px solid rgba(97,95,255,0.0)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(145deg, rgba(30,26,60,1) 0%, rgba(18,16,35,1) 100%)";
                    el.style.borderTop = "1px solid rgba(97,95,255,0.5)";
                    const bar = el.querySelector(".accent-bar") as HTMLElement;
                    if (bar) bar.style.height = "100%";
                    const title = el.querySelector(".service-title") as HTMLElement;
                    if (title) title.style.color = "#615FFF";
                    const arrow = el.querySelector(".arrow") as HTMLElement;
                    if (arrow) { arrow.style.transform = "translate(4px, -4px)"; arrow.style.color = "#615FFF"; }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "linear-gradient(145deg, rgba(20,18,40,1) 0%, rgba(12,11,22,1) 100%)";
                    el.style.borderTop = "1px solid rgba(97,95,255,0.0)";
                    const bar = el.querySelector(".accent-bar") as HTMLElement;
                    if (bar) bar.style.height = "0";
                    const title = el.querySelector(".service-title") as HTMLElement;
                    if (title) title.style.color = "#e8eaf0";
                    const arrow = el.querySelector(".arrow") as HTMLElement;
                    if (arrow) { arrow.style.transform = "translate(0, 0)"; arrow.style.color = "rgba(97,95,255,0.5)"; }
                  }}
                >
                  {/* Left accent bar on hover */}
                  <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, width: "3px", height: "0", background: "linear-gradient(to bottom, #615FFF, #3d3bcc)", boxShadow: "0 0 12px rgba(97,95,255,0.6)", transition: "height 0.35s ease" }} />

                  {/* Top-left corner shine */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "120px", height: "120px", background: "radial-gradient(circle at top left, rgba(97,95,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                  {/* Number badge */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: "32px", height: "32px",
                    border: "1px solid rgba(97,95,255,0.45)",
                    borderRadius: "6px",
                    background: "rgba(97,95,255,0.1)",
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#615FFF",
                    letterSpacing: "0.05em",
                    marginBottom: "1.5rem",
                  }}>{s.n}</div>

                  {/* Title */}
                  <div className="service-title" style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.35rem",
                    color: "#e8eaf0",
                    marginBottom: "1rem",
                    transition: "color 0.2s ease",
                    letterSpacing: "-0.01em",
                  }}>{s.title}</div>

                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.82rem",
                    color: "rgba(232, 234, 240, 0.95)", // Much brighter, almost full text color
                    lineHeight: 1.8,
                  }}>{s.desc}</p>

                  {/* Arrow */}
                  <div className="arrow" style={{
                    position: "absolute",
                    bottom: "1.5rem", right: "1.75rem",
                    fontSize: "1.1rem",
                    color: "rgba(97,95,255,0.5)",
                    transition: "all 0.2s ease",
                  }}>↗</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section style={{ padding: "8rem 1.5rem", position: "relative", zIndex: 2, background: "var(--surface)" }}>
        <div className="section-inner">
          <ScrollReveal>
            <div style={{ marginBottom: "5rem" }}>
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#615FFF", marginBottom: "1rem" }}>— Process</p>
              <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)", lineHeight: 1.1 }}>How It Works</h2>
            </div>
          </ScrollReveal>

          <div className="how-it-works-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", position: "relative" }}>
            <div className="process-line" style={{ position: "absolute", top: "22px", left: "22px", right: "calc(25% - 22px)", height: "1px", background: "linear-gradient(to right, #615FFF, #3d3bcc, #615FFF)", opacity: 0.35, zIndex: 0, pointerEvents: "none" }} />

            {[
              { n: "01", title: "Discovery Call", desc: "We map your ops, identify automation opportunities, and define scope in a focused 30-minute call." },
              { n: "02", title: "Architecture", desc: "We design a lean, production-ready solution tailored to your existing stack and growth goals." },
              { n: "03", title: "Build + Test", desc: "Fast, clean build cycles with full QA. You receive milestone updates throughout the process." },
              { n: "04", title: "Launch + Support", desc: "We handle deployment and stay on post-launch for support, monitoring, and iteration." },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 120}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{ width: "44px", height: "44px", border: "1px solid #615FFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", marginBottom: "1.5rem", transition: "all 0.25s ease", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "#615FFF", fontWeight: 700 }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 0 18px rgba(97,95,255,0.45)"; el.style.background = "rgba(97,95,255,0.12)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "none"; el.style.background = "var(--bg)"; }}
                  >
                    {step.n}
                  </div>
                  <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "0.75rem" }}>{step.title}</div>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.8 }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section >

      {/* ── CTA (Section 14) ────────────────────────────────── */}
      < section style={{ padding: "8rem 1.5rem", position: "relative", zIndex: 2, textAlign: "center", overflow: "hidden" }}>
        {/* Radial glow */}
        < div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(97,95,255,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        < div className="section-inner" style={{ position: "relative", zIndex: 1 }}>
          <ScrollReveal>
            <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--text)", marginBottom: "1.2rem", lineHeight: 1.1 }}>
              Ready to{" "}
              <span style={{ color: "#615FFF", textShadow: "0 0 40px rgba(97,95,255,0.35)" }}>automate?</span>
            </h2>
            <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.9rem", color: "var(--muted)", marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
              Book a free call. We&apos;ll map your ops and identify exactly where AI can save you time and money.
            </p>
            <Link
              href="/book"
              className="btn-angular"
              style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#050508", backgroundColor: "#615FFF", padding: "1rem 2.5rem", textDecoration: "none", display: "inline-block", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 30px rgba(97,95,255,0.5)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              Book Free Consultation
            </Link>
          </ScrollReveal>
        </div >
      </section >

      {/* ─── RESPONSIVE STYLES (Section 13) ─────────────────── */}
      <style>{`
        /* Section inner max-width centering */
        .section-inner {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Responsive: tablet */
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .how-it-works-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-row {
            gap: 1.5rem !important;
          }
          .process-line {
            display: none !important;
          }
        }

        /* Responsive: mobile */
        @media (max-width: 600px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-btns {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .stats-row {
            gap: 1.2rem !important;
          }
          /* reduce hero font on tiny screens */
          h1 {
            line-height: 1 !important;
          }
        }

        /* All transitions 0.2–0.3s ease */
        a, button { transition: all 0.2s ease; }

        /* No border-radius on buttons (angular everywhere) */
        button { border-radius: 0 !important; }
      `}</style >
    </div >
  );
}