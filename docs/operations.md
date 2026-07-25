# Kyzor System Operations Guide

This guide outlines procedures for database backups, API key rotations, dependency updates, and incident response for `kyzor.online`.

---

## 1. Database Backups & Restore

- **Automated Daily Backups**: Managed automatically by Supabase Point-in-Time Recovery (PITR) / daily database snapshots.
- **Manual Backups via Supabase CLI**:
  ```bash
  # Export database schema and contents
  npx supabase db dump --linked -f supabase/backups/backup_$(date +%Y%m%d).sql
  ```
- **Restoring Schema**:
  ```bash
  npx supabase db query --linked -f supabase/backups/backup_TARGET.sql
  ```

---

## 2. API Key Rotation Procedures

### Supabase Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`):
1. Open Supabase Dashboard → **Project Settings** → **API**.
2. Click **Generate New Secret Key** for `service_role`.
3. Update `SUPABASE_SERVICE_ROLE_KEY` in Vercel Environment Variables.
4. Redeploy Vercel production build.

### Resend API Key (`RESEND_API_KEY`):
1. Log in to Resend Dashboard → **API Keys** → **Create API Key**.
2. Update `RESEND_API_KEY` in Vercel Environment Variables.
3. Delete old key in Resend dashboard.

### Rate Limiting Salt (`RATE_LIMIT_SALT`):
- Change `RATE_LIMIT_SALT` in Vercel Environment Variables if IP hashing salt rotation is needed.

---

## 3. Dependency Updates Policy

- Run dependency security audit monthly:
  ```bash
  npm audit
  ```
- Run unit tests and typecheck before upgrading packages:
  ```bash
  npx tsc --noEmit
  npx vitest run
  ```

---

## 4. Incident Response Steps

### Incident 1: Form Submissions Failing
1. Check Vercel Function logs for Server Action errors in `app/actions/consultation.ts`.
2. Verify Supabase Database availability and `consultation_requests` table state.
3. Check Resend email dispatch status. Note: DB storage succeeds even if Resend email fails.

### Incident 2: Admin Access Blocked
1. Confirm Supabase Auth user status in Supabase Dashboard.
2. Ensure user ID exists in `public.admin_users`:
   ```sql
   SELECT * FROM public.admin_users WHERE id = 'USER_UUID';
   ```

### Incident 3: Production Rollback
1. Open Vercel Dashboard → Deployments.
2. Select previous stable build → Click **Promote to Production**.
