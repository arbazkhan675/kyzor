# Kyzor Content & Copywriting Standards

This document establishes permanent terminology rules, content restrictions, and visual asset guidelines for `kyzor.online`.

---

## 1. Core Terminology Rules

1. **Primary Positioning Terms**:
   - Always use **"custom e-commerce application"** and **"built from scratch."**
   - Emphasize bespoke code, sub-second performance, data sovereignty, zero platform transaction fees, and tailored database schemas.

2. **Strictly Prohibited Terms**:
   - **NEVER** use or advertise *Shopify Development*, *WooCommerce Development*, *Headless Commerce*, or *Pre-built Templates*.
   - Never offer platform migrations or theme customization services.

---

## 2. Factuality & Portfolio Labeling Rules

1. **No Fake Social Proof**:
   - Never invent client names, logo walls, fake quotes, awards, or numerical metrics not backed by real data.
2. **Demo / Concept Labeling**:
   - All internal benchmark projects and non-client showcases **MUST** be explicitly flagged with the **Demo / Concept** badge in both the database (`is_demo = true`) and UI card components.

---

## 3. Brand & Visual Asset Guidelines

1. **Logo Integrity**:
   - Use official brand logo at `public/brand/logo.png` (`1024x1024 px`, `1:1` aspect ratio).
   - Render using Next.js `Image` component with `object-contain` to prevent distortion or stretching.
2. **Color Accents**:
   - Primary Accent: Deep Violet (`#7C3AED`)
   - Secondary Accent: Electric Blue (`#2563EB`)
   - Background Neutral: Dark Zinc (`#09090B`)
3. **Typography**:
   - Use `Geist` Sans for headers and body copy.
   - Use `Geist_Mono` for code snippets, metric tags, and technical indicators.
