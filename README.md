# Kyzor Agency Website & Admin Portal

Production website for **Kyzor** (https://kyzor.online), an agency that builds complete custom e-commerce applications from scratch and creates end-to-end business automations.

---

## 🚀 Key Features & Architecture

- **Next.js 16 App Router & React 19**: Modern full-stack architecture with React Server Components (RSC) by default.
- **Strict Brand Design System**: Dark theme derived from official logo (`public/brand/logo.png`) with Violet (`#7C3AED`) and Electric Blue (`#2563EB`) accents. Loaded with `Geist` Sans and `Geist_Mono` fonts.
- **Fixed Public Routes**:
  - `/` - Home Page (Accessible hero tabs, 6 core sections)
  - `/ecommerce` - Custom E-commerce Application Service Page
  - `/automations` - Business Automations Service Page
  - `/work` & `/work/[slug]` - Portfolio Gallery & Dynamic Case Study Detail Page
  - `/about` - Agency Mission & 5-Step Process
  - `/consultation` - Interactive Booking Form (Zod + Supabase + Resend + Hashed-IP Rate Limiting)
  - `/privacy` & `/terms` - Legal Compliance Pages
- **Protected Admin Portal**:
  - `/admin/login` - Admin authentication
  - `/admin` - Live dashboard overview
  - `/admin/consultations` - Search, filter, and manage lead status
  - `/admin/work` - Full CRUD case study manager with `work-media` storage upload
- **Security & Privacy**:
  - Row Level Security (RLS) enabled on every database table.
  - Server-only modules (`import 'server-only'`) guarding service role keys.
  - Non-PII analytics tracking via `@vercel/analytics`.
  - Security headers (`X-Frame-Options`, `CSP`, `HSTS`).

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- Node.js 20.x or higher
- Git & npm

### 2. Installation
```bash
# Clone repository
git clone https://github.com/arbazkhan675/kyzor.git
cd kyzor

# Install dependencies
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create `.env.local` in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=https://hfquhgaertysebvdpojn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RATE_LIMIT_SALT=your_secure_salt_here
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Running Locally
```bash
# Start Next.js development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 🧪 Testing & Validation Commands

```bash
# Run TypeScript typecheck
npx tsc --noEmit

# Run Vitest unit & integration test matrix (53 tests)
npx vitest run

# Run production build
npm run build
```

---

## 📦 Database Migrations & Supabase CLI

Database structure and Row Level Security rules are stored in `supabase/migrations/`:
- `supabase/migrations/001_initial_schema.sql`
- `supabase/migrations/002_reproducible_foundation.sql`

To apply migrations locally or to linked project:
```bash
npx supabase db query --linked -f supabase/migrations/002_reproducible_foundation.sql
```

---

## 🚢 Deployment & Production Operations

Refer to detailed operational documentation:
- [docs/admin-guide.md](file:///c:/Users/hp/kyzor/docs/admin-guide.md) - Admin portal operations and lead management
- [docs/operations.md](file:///c:/Users/hp/kyzor/docs/operations.md) - Backups, key rotation, and incident response
- [docs/content-guide.md](file:///c:/Users/hp/kyzor/docs/content-guide.md) - Copy rules and Demo/Concept labeling guidelines
- [docs/product-decisions.md](file:///c:/Users/hp/kyzor/docs/product-decisions.md) - Master architecture specification
