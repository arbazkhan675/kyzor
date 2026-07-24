-- Supabase Seed File: seed.sql
-- Contains clearly labeled Demo/Concept work items only.

INSERT INTO public.work_items (slug, title, summary, category, is_demo, client_name, challenge, solution, results, technologies, published)
VALUES
(
    'nexus-bespoke-ecommerce',
    'Nexus Apparel - Custom E-commerce Application Benchmark',
    'High-performance custom e-commerce web application engineered from scratch with zero platform locks.',
    'ecommerce',
    true,
    'Concept Showcase',
    'Off-the-shelf template platforms caused checkout friction, slow page transitions, and limited customization for high-volume inventory drops.',
    'Engineered a bespoke Next.js & Supabase custom e-commerce architecture with optimistic cart state management and instant image optimization.',
    '["99/100 Lighthouse Performance Rating", "Sub-200ms page transitions across global edge nodes", "Zero monthly plugin overhead or platform transaction cuts"]'::jsonb,
    ARRAY['Next.js', 'React', 'Supabase Postgres', 'Tailwind CSS', 'TypeScript'],
    true
),
(
    'omni-channel-whatsapp-automation',
    'Omnichannel WhatsApp & Lead Qualification Workflow',
    'Autonomous lead qualification and instant WhatsApp customer response workflow operating 24/7.',
    'automation',
    true,
    'Concept Showcase',
    'High lead response latency led to lost inquiry conversions during non-business hours.',
    'Designed an automated webhook pipeline connecting custom lead forms, official WhatsApp Cloud API, and CRM database with intelligent routing.',
    '["Instant response time for 100% of incoming inquiries", "Automated lead qualification and routing", "Automated document collection and follow-ups"]'::jsonb,
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
    'Manual verification of onboarding documents created operational bottlenecks and data entry delays.',
    'Built an end-to-end automated document parsing engine paired with an interactive AI voice assistant for missing data resolution.',
    '["Streamlined automated document parsing", "Zero manual data re-entry errors", "Seamless operational integration with database"]'::jsonb,
    ARRAY['Python', 'AI Agents', 'OpenAI Vision API', 'Supabase Storage', 'Webhooks'],
    true
)
ON CONFLICT (slug) DO NOTHING;
