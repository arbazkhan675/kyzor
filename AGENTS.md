# Kyzor Engineering & Operations Guide (AGENTS.md)

This document contains permanent rules and operational instructions for developers and AI coding agents working on the Kyzor codebase (https://kyzor.online).

---

## 1. Permanent Engineering Principles

1. **Server Components First**: Use React Server Components (RSC) by default. Use Client Components (`"use client"`) only when state, hooks, or event listeners are required.
2. **Minimal Dependency Footprint**: Do NOT install Redux, Prisma, separate Express servers, heavy CMS frameworks, or redundant animation libraries.
3. **TypeScript Strictness**: Strict mode is enabled. No `any` types or unvalidated type assertions.
4. **Validation**: All user inputs and API payloads must be validated on the server using Zod schemas.

---

## 2. Content & Positioning Rules

1. **Terminology**: Use **"custom e-commerce application"** and **"built from scratch."**
2. **Prohibited Terms**: NEVER advertise or offer *Shopify Development*, *WooCommerce Development*, or *Headless Commerce*.
3. **No Fake Social Proof**: Do not invent clients, testimonials, awards, partnerships, or unverified statistics.
4. **Demo / Concept Labeling**: Non-client portfolio projects must be clearly labeled as **Demo** or **Concept**.

---

## 3. Database & Security Rules

1. **Supabase Migrations**: Store all database structure changes in `supabase/migrations/XXX_name.sql`.
2. **Row Level Security (RLS)**: RLS MUST be enabled on every public and internal database table.
3. **Secret Protection**: NEVER expose `SUPABASE_SERVICE_ROLE_KEY`, Resend API keys, or private environment variables to client-side code.
4. **Admin Route Authorization**: All `/admin` endpoints and pages must be protected by server-side session checks (`middleware.ts`) and database authorization.

---

## 4. Design & Accessibility Rules

1. **Logo Integrity**: Use the official logo asset at `public/logo.png`. Do not alter or redraw the brand artwork.
2. **Accent Palette**: Main accent derived from the logo gradient (`#7C3AED` to `#2563EB`).
3. **Clean Visuals**: Avoid generic AI glows, heavy glassmorphism, or long walls of text. Maintain clean typography, generous spacing, and subtle motion.
4. **Accessibility**: Semantic HTML5 tags, keyboard navigation focus indicators, and reduced-motion support.

---

## 5. Working Workflow for Agents

1. **Plan Before Modifying**: Inspect existing codebase and provide a concise implementation plan before editing files.
2. **Phase Execution**: Execute one phase at a time without expanding scope.
3. **Verification**: Run `npx tsc --noEmit`, `npx vitest run`, and `npm run build` after completing changes.
4. **Browser Verification**: Use browser verification tools for UI layout changes.
