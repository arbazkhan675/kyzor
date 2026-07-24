-- Kyzor Agency Database Migration 001_initial_schema.sql

-- 1. Consultations Table
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    project_type TEXT NOT NULL CHECK (project_type IN ('ecommerce', 'automation', 'both', 'other')),
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Work Items / Case Studies Table
CREATE TABLE IF NOT EXISTS public.work_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('ecommerce', 'automation', 'integrated')),
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

-- 3. Enable RLS
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_items ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for Consultations
DROP POLICY IF EXISTS "Public can submit consultation" ON public.consultations;
CREATE POLICY "Public can submit consultation"
    ON public.consultations
    FOR INSERT
    TO public
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admins can view consultations" ON public.consultations;
CREATE POLICY "Authenticated admins can view consultations"
    ON public.consultations
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated admins can update consultations" ON public.consultations;
CREATE POLICY "Authenticated admins can update consultations"
    ON public.consultations
    FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated admins can delete consultations" ON public.consultations;
CREATE POLICY "Authenticated admins can delete consultations"
    ON public.consultations
    FOR DELETE
    TO authenticated
    USING (true);

-- 5. RLS Policies for Work Items
DROP POLICY IF EXISTS "Public can view published work items" ON public.work_items;
CREATE POLICY "Public can view published work items"
    ON public.work_items
    FOR SELECT
    TO public
    USING (published = true);

DROP POLICY IF EXISTS "Authenticated admins can view all work items" ON public.work_items;
CREATE POLICY "Authenticated admins can view all work items"
    ON public.work_items
    FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated admins can insert work items" ON public.work_items;
CREATE POLICY "Authenticated admins can insert work items"
    ON public.work_items
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated admins can update work items" ON public.work_items;
CREATE POLICY "Authenticated admins can update work items"
    ON public.work_items
    FOR UPDATE
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Authenticated admins can delete work items" ON public.work_items;
CREATE POLICY "Authenticated admins can delete work items"
    ON public.work_items
    FOR DELETE
    TO authenticated
    USING (true);

-- 6. Initial Seed Data for Case Studies (Clearly marked as Concept/Demo as per rules)
INSERT INTO public.work_items (slug, title, summary, category, is_demo, client_name, challenge, solution, results, technologies, published)
VALUES
(
    'nexus-bespoke-ecommerce',
    'Nexus Luxury Apparel - Custom E-commerce Application',
    'High-performance custom e-commerce application built from scratch with zero platform constraints and sub-second page loads.',
    'ecommerce',
    true,
    'Concept Showcase',
    'Off-the-shelf platforms caused checkout friction, slow page transitions, and limited customization for high-volume flash drops.',
    'Engineered a bespoke Next.js & Supabase custom e-commerce architecture with optimistic cart management and instant headless image optimization.',
    '["99/100 Lighthouse Performance Rating", "Sub-200ms page transitions across global edge nodes", "Zero monthly plugin overhead or platform transaction cuts"]'::jsonb,
    ARRAY['Next.js', 'React', 'Supabase Postgres', 'Tailwind CSS', 'TypeScript'],
    true
),
(
    'omni-channel-whatsapp-automation',
    'Omnichannel WhatsApp & Lead CRM Workflow',
    'Autonomous lead qualification and instant WhatsApp support workflow operating 24/7 with zero human delay.',
    'automation',
    true,
    'Concept Showcase',
    'High lead response latency led to lost high-value inquiry conversions during non-business hours.',
    'Designed an automated webhook pipeline connecting custom lead forms, WhatsApp Cloud API, and CRM database with intelligent fallback routing.',
    '["Instant < 3-second response time for 100% of incoming inquiries", "42% increase in qualified meeting bookings", "Automated document collection and follow-ups"]'::jsonb,
    ARRAY['Node.js', 'WhatsApp Cloud API', 'Supabase', 'Custom Webhooks', 'Zod'],
    true
),
(
    'voice-agent-document-processor',
    'AI Document Processing & Voice Assistant Pipeline',
    'Automated document intake, OCR extraction, and AI voice confirmation system for operational compliance.',
    'automation',
    true,
    'Concept Showcase',
    'Manual verification of client onboarding documents created operational bottlenecks and compliance errors.',
    'Built an end-to-end automated document parsing engine paired with an interactive AI voice assistant for missing data resolution.',
    '["95% reduction in manual document review time", "Zero data entry error rate", "Seamless operational integration with existing database"]'::jsonb,
    ARRAY['Python', 'AI Agents', 'OpenAI Vision API', 'Supabase Storage', 'Webhooks'],
    true
)
ON CONFLICT (slug) DO NOTHING;
