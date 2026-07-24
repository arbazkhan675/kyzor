# Kyzor Product Decisions & Master Specification

## 1. Product Overview & Identity
- **Agency Name**: Kyzor
- **Domain**: https://kyzor.online
- **Core Value Proposition**: 
  - Builds complete custom e-commerce applications from scratch.
  - Creates business automations (WhatsApp workflows, email automation, AI chatbots, AI agents, voice assistants, lead/CRM workflows, document processing, custom operational integrations).
- **Out of Scope (Explicit Prohibitions)**:
  - Do NOT build an e-commerce store for Kyzor itself.
  - Do NOT build an automation marketplace, SaaS website generator, client portal, or payment checkout for Kyzor.

## 2. Navigation & Route Specifications

### Fixed Public Navigation Bar
- **Structure**: `Logo | E-commerce | Automations | Work | About | Book a Consultation`
- **Rule**: Strict single-level navigation. No dropdown menus permitted.

### Public Routes
1. `/` - Home Page (Hero, Core Engineering Pillars, Featured Work, Process, CTA)
2. `/ecommerce` - Custom E-commerce Applications Page (Focus on bespoke code, zero platform fees, sub-second speed)
3. `/automations` - Business Automations Page (WhatsApp, Email, AI Agents, Voice, Lead/CRM, Document Processing)
4. `/work` - Portfolio / Case Studies Gallery (Clear Demo/Concept vs Client distinctions)
5. `/work/[slug]` - In-depth Case Study Detail Page
6. `/about` - Agency Mission & Engineering Philosophy
7. `/consultation` - Interactive Consultation Booking Form (Server Action + Zod + Supabase + Resend)
8. `/privacy` - Privacy Policy
9. `/terms` - Terms of Service

### Admin Routes (Protected)
1. `/admin/login` - Admin Authentication Page
2. `/admin` - Dashboard Overview & Analytics
3. `/admin/consultations` - Manage & Review Booking Submissions
4. `/admin/work` - Manage Portfolio / Case Studies
5. `/admin/work/new` - Create Case Study
6. `/admin/work/[id]` - Edit Case Study

## 3. Technology Stack & Infrastructure
- **Framework**: Next.js 16 App Router & React 19
- **Language**: TypeScript Strict Mode
- **Styling**: Tailwind CSS 4 & Selected Shadcn/UI primitives
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth & Storage
- **Transactional Email**: Resend
- **Validation**: Zod Validation Schemas
- **Testing**: Vitest, React Testing Library, Playwright
- **Deployment**: Vercel Platform

## 4. Design Principles & Brand Guidelines
- **Logo Asset**: Uses existing `public/logo.png` (1024x1024 px, 1:1 aspect ratio).
- **Derived Palette**:
  - Primary Accent: Deep Purple / Violet (`#7C3AED`)
  - Secondary Accent: Electric Blue (`#2563EB`)
  - Neutral Dark: Dark Zinc (`#09090B`)
- **Aesthetic**: Concise, scannable pages with generous spacing, strong typography, restrained cards, and subtle motion.
- **Prohibitions**: Avoid generic AI gradients, excessive glow effects, glassmorphism, decorative clutter, and long walls of text.

## 5. Content & Messaging Rules
- Always use **"custom e-commerce application"** and **"built from scratch."**
- **Strict Prohibition**: Never advertise Shopify Development, WooCommerce Development, or Headless Commerce.
- **Factuality**: Do not invent clients, testimonials, awards, partnerships, or fake numerical outcomes.
- Mark all non-client demonstration work explicitly as **Demo** or **Concept**.

## 6. Engineering & Security Rules
- Server Components by default; Client Components only when user interaction requires them.
- No Redux, Prisma, separate Express server, or bloated dependencies.
- Store database schema changes in Supabase SQL migrations.
- Enable RLS (Row Level Security) on every exposed table.
- Validate consultation form inputs server-side using Zod and a server-only database client.
- Protect all `/admin` routes with real session authorization (`middleware.ts`).
