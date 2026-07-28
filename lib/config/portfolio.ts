export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: "ecommerce" | "automation";
  categoryLabel: string;
  description: string;
  technologies: string[];
  videoUrl: string | null;
  expectedVideoPath: string;
  badge: "Kyzor Showcase";
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "nexus-bespoke-ecommerce",
    slug: "nexus-bespoke-ecommerce",
    title: "Nexus Bespoke E-commerce Storefront",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "A custom e-commerce interface demonstrating product search, variant selection, optimistic cart drawer state, and instant checkout flow.",
    technologies: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS"],
    videoUrl: "/video/1.mp4",
    expectedVideoPath: "/video/1.mp4",
    badge: "Kyzor Showcase",
  },
  {
    id: "aeroparts-hub-ecommerce",
    slug: "aeroparts-hub-ecommerce",
    title: "Aeroparts Hub B2B Ordering Interface",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "A custom B2B ordering interface demonstrating multi-tier product catalog search, inventory visibility, and a streamlined purchasing flow.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    videoUrl: null,
    expectedVideoPath: "/video/aeroparts-hub.mp4",
    badge: "Kyzor Showcase",
  },
  {
    id: "omni-channel-whatsapp-automation",
    slug: "omni-channel-whatsapp-automation",
    title: "Omnichannel WhatsApp Lead Qualification",
    category: "automation",
    categoryLabel: "Automation",
    description: "An automated webhook pipeline connecting custom lead capture forms, official WhatsApp Cloud API integration, and CRM database routing.",
    technologies: ["Node.js", "WhatsApp Cloud API", "Supabase", "Webhooks", "Zod"],
    videoUrl: null,
    expectedVideoPath: "/video/omni-channel-whatsapp.mp4",
    badge: "Kyzor Showcase",
  },
  {
    id: "voice-agent-document-processor",
    slug: "voice-agent-document-processor",
    title: "AI Document Processing Engine",
    category: "automation",
    categoryLabel: "Automation",
    description: "An automated document parsing pipeline paired with an interactive AI voice assistant for structured data extraction and verification.",
    technologies: ["Python", "AI Agents", "OpenAI Vision API", "Supabase Storage", "Webhooks"],
    videoUrl: null,
    expectedVideoPath: "/video/voice-agent-document-processor.mp4",
    badge: "Kyzor Showcase",
  },
];

export function getPortfolioProjects(category?: string): PortfolioProject[] {
  if (!category || category === "all") {
    return PORTFOLIO_PROJECTS;
  }
  return PORTFOLIO_PROJECTS.filter((p) => p.category === category);
}
