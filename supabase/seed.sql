-- Supabase Seed File: seed.sql
-- Contains Kyzor Showcase work items only with non-client factual interface descriptions.

INSERT INTO public.work_items (slug, title, summary, category, is_demo, client_name, challenge, solution, results, technologies, published)
VALUES
(
    'nexus-bespoke-ecommerce',
    'Nexus Bespoke E-commerce Storefront',
    'A custom e-commerce interface demonstrating product search, variant selection, optimistic cart drawer state, and instant checkout flow.',
    'ecommerce',
    true,
    'Kyzor Showcase',
    'Demonstrates custom storefront user interface engineering.',
    'Engineered with Next.js, React Server Components, and Supabase Postgres.',
    '[]'::jsonb,
    ARRAY['Next.js', 'React', 'Supabase Postgres', 'Tailwind CSS', 'TypeScript'],
    true
),
(
    'aeroparts-hub-ecommerce',
    'Aeroparts Hub B2B Ordering Interface',
    'A custom B2B ordering interface demonstrating multi-tier product catalog search, inventory visibility, and a streamlined purchasing flow.',
    'ecommerce',
    true,
    'Kyzor Showcase',
    'Demonstrates custom B2B e-commerce interface and catalog search.',
    'Engineered with Next.js and PostgreSQL database architecture.',
    '[]'::jsonb,
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    true
),
(
    'omni-channel-whatsapp-automation',
    'Omnichannel WhatsApp Lead Qualification',
    'An automated webhook pipeline connecting custom lead capture forms, official WhatsApp Cloud API integration, and CRM database routing.',
    'automation',
    true,
    'Kyzor Showcase',
    'Demonstrates automated customer inquiry routing and webhook processing.',
    'Designed with Node.js, WhatsApp Cloud API, and webhook handlers.',
    '[]'::jsonb,
    ARRAY['Node.js', 'WhatsApp Cloud API', 'Supabase', 'Custom Webhooks', 'Zod'],
    true
),
(
    'voice-agent-document-processor',
    'AI Document Processing Engine',
    'An automated document parsing pipeline paired with an interactive AI voice assistant for structured data extraction and verification.',
    'automation',
    true,
    'Kyzor Showcase',
    'Demonstrates document parsing and interactive AI voice agent workflows.',
    'Built with Python, OpenAI Vision API, and automated database webhooks.',
    '[]'::jsonb,
    ARRAY['Python', 'AI Agents', 'OpenAI Vision API', 'Supabase Storage', 'Webhooks'],
    true
)
ON CONFLICT (slug) DO NOTHING;
