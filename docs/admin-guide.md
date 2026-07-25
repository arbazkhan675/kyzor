# Kyzor Owner Admin Guide

This guide provides operational instructions for agency owners managing consultation requests and portfolio case studies inside the protected Kyzor Admin Portal (`/admin`).

---

## 1. Accessing the Admin Portal

- **URL**: `https://kyzor.online/admin/login` (or `http://localhost:3000/admin/login`)
- **Authentication**: Sign in using your registered Supabase Auth credentials.
- **Authorization**: Your user account ID (`UUID`) must exist in the `public.admin_users` table with `role = 'admin'`.

---

## 2. Managing Consultation Requests (`/admin/consultations`)

When visitors submit the **Book a Consultation** form on the public website, their submission is validated, rate-limited, stored in the database, and dispatched via email.

### Actions Available:
1. **Search & Filter**:
   - Filter leads by status: `New`, `Contacted`, or `Archived`.
   - Search by lead name, business email, or company.
2. **Review Lead Summary**:
   - View contact details, project focus, estimated budget range, and project overview.
   - Click the mailto link (`sarah@company.com`) to launch your email client directly.
3. **Update Lead Status**:
   - Click **Contacted** after initiating outreach.
   - Click **Archive** once the discovery process is completed or closed.

---

## 3. Managing Portfolio Case Studies (`/admin/work`)

The portfolio manager allows agency owners to publish new case studies or concept showcases to the public `/work` gallery.

### Creating a New Case Study (`/admin/work/new`):
1. **Title & Slug**: Enter a descriptive title (e.g. `Nexus Custom E-commerce Application`). The URL slug is auto-generated.
2. **Category**: Select `Custom E-commerce`, `Business Automations`, or `Integrated Platform`.
3. **Demo / Concept Label**:
   - **Mandatory**: Check *Mark as Demo / Concept Showcase* for non-client benchmark applications.
4. **Hero Image Upload**:
   - Select an image file.
   - Enter descriptive **Alt Text** (Required).
   - Click **Upload to work-media** to upload to the Supabase storage bucket.
5. **Challenge, Solution & Metrics**:
   - Enter operational challenge, bespoke solution text, and metric results (one metric per line).
6. **Publish Toggle**:
   - Keep *Published on Public Site* checked for live visibility, or uncheck to save as draft.

---

## 4. Draft Preview Feature

Unpublished draft case studies can be previewed directly at `https://kyzor.online/work/[slug]` when signed into an active admin session. Draft items return `404 Not Found` for public visitors.
