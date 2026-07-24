-- Migration: 002_reproducible_foundation.sql
-- Goal: Comprehensive Supabase database foundation with strict RLS, security-definer helper, and storage configuration

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE public.project_type_enum AS ENUM ('ecommerce', 'automation', 'both', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.consultation_status_enum AS ENUM ('new', 'contacted', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.work_category_enum AS ENUM ('ecommerce', 'automation', 'integrated');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Tables
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type public.project_type_enum NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status public.consultation_status_enum NOT NULL DEFAULT 'new',
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.work_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category public.work_category_enum NOT NULL,
    is_demo BOOLEAN NOT NULL DEFAULT false,
    client_name TEXT,
    challenge TEXT NOT NULL,
    solution TEXT NOT NULL,
    results JSONB NOT NULL DEFAULT '[]'::jsonb,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    hero_image_url TEXT,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.work_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_item_id UUID NOT NULL REFERENCES public.work_items(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    alt_text TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.form_rate_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT NOT NULL,
    action TEXT NOT NULL,
    count INT NOT NULL DEFAULT 1,
    reset_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Trigger Function & Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_consultation_requests_updated_at ON public.consultation_requests;
CREATE TRIGGER set_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_work_items_updated_at ON public.work_items;
CREATE TRIGGER set_work_items_updated_at
BEFORE UPDATE ON public.work_items
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4. Required Indexes
CREATE INDEX IF NOT EXISTS idx_work_items_slug ON public.work_items(slug);
CREATE INDEX IF NOT EXISTS idx_work_items_published ON public.work_items(published);
CREATE INDEX IF NOT EXISTS idx_work_items_created_at ON public.work_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_created_at ON public.consultation_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_work_images_work_item_id ON public.work_images(work_item_id);
CREATE INDEX IF NOT EXISTS idx_form_rate_limits_ip_action ON public.form_rate_limits(ip_address, action);

-- 5. Security-Definer Function public.is_admin()
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_users
        WHERE id = auth.uid()
    );
END;
$$;

-- 6. Enable Row Level Security on Every Table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_rate_limits ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for admin_users
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
CREATE POLICY "Admins can view admin_users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 8. RLS Policies for work_items
DROP POLICY IF EXISTS "Public can view published work items" ON public.work_items;
CREATE POLICY "Public can view published work items"
    ON public.work_items
    FOR SELECT
    TO public
    USING (published = true);

DROP POLICY IF EXISTS "Admins manage work_items" ON public.work_items;
CREATE POLICY "Admins manage work_items"
    ON public.work_items
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 9. RLS Policies for work_images
DROP POLICY IF EXISTS "Public can view images for published work items" ON public.work_images;
CREATE POLICY "Public can view images for published work items"
    ON public.work_images
    FOR SELECT
    TO public
    USING (
        EXISTS (
            SELECT 1 FROM public.work_items w
            WHERE w.id = work_item_id AND w.published = true
        )
    );

DROP POLICY IF EXISTS "Admins manage work_images" ON public.work_images;
CREATE POLICY "Admins manage work_images"
    ON public.work_images
    FOR ALL
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- 10. RLS Policies for consultation_requests
-- Note: NO public direct INSERT policy. Insertion happens server-side via service role client.
DROP POLICY IF EXISTS "Admins read consultation_requests" ON public.consultation_requests;
CREATE POLICY "Admins read consultation_requests"
    ON public.consultation_requests
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

DROP POLICY IF EXISTS "Admins update consultation_requests" ON public.consultation_requests;
CREATE POLICY "Admins update consultation_requests"
    ON public.consultation_requests
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins delete consultation_requests" ON public.consultation_requests;
CREATE POLICY "Admins delete consultation_requests"
    ON public.consultation_requests
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- 11. Storage Setup for work-media Bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('work-media', 'work-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read for work-media" ON storage.objects;
CREATE POLICY "Public read for work-media"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'work-media');

DROP POLICY IF EXISTS "Admins manage work-media objects" ON storage.objects;
CREATE POLICY "Admins manage work-media objects"
    ON storage.objects FOR ALL
    TO authenticated
    USING (bucket_id = 'work-media' AND public.is_admin())
    WITH CHECK (bucket_id = 'work-media' AND public.is_admin());
