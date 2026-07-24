"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkItemAction, updateWorkItemAction } from "@/app/actions/admin";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  initialData?: any;
  isEdit?: boolean;
}

export function WorkItemForm({ initialData, isEdit }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    summary: initialData?.summary || "",
    category: initialData?.category || "ecommerce",
    is_demo: initialData?.is_demo ?? false,
    client_name: initialData?.client_name || "",
    challenge: initialData?.challenge || "",
    solution: initialData?.solution || "",
    resultsText: initialData?.results ? initialData.results.join("\n") : "",
    technologiesText: initialData?.technologies ? initialData.technologies.join(", ") : "",
    hero_image_url: initialData?.hero_image_url || "",
    published: initialData?.published ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      summary: formData.summary,
      category: formData.category as "ecommerce" | "automation" | "integrated",
      is_demo: formData.is_demo,
      client_name: formData.client_name || undefined,
      challenge: formData.challenge,
      solution: formData.solution,
      results: formData.resultsText.split("\n").filter((line: string) => line.trim().length > 0),
      technologies: formData.technologiesText.split(",").map((t: string) => t.trim()).filter((t: string) => t.length > 0),
      hero_image_url: formData.hero_image_url || undefined,
      published: formData.published,
    };

    let result;
    if (isEdit && initialData?.id) {
      result = await updateWorkItemAction(initialData.id, payload);
    } else {
      result = await createWorkItemAction(payload);
    }

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/admin/work");
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Case Studies List
        </Link>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEdit ? "Edit Case Study" : "Create New Case Study"}
        </h2>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 text-xs font-medium text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const autoSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                  setFormData({ ...formData, title, slug: isEdit ? formData.slug : autoSlug });
                }}
                placeholder="e.g. Nexus Custom E-commerce Application"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="nexus-custom-ecommerce"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ecommerce">Custom E-commerce</option>
                <option value="automation">Business Automations</option>
                <option value="integrated">Integrated Platform</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Client / Label Name
              </label>
              <input
                type="text"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                placeholder="e.g. Concept Showcase"
                className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_demo}
                onChange={(e) => setFormData({ ...formData, is_demo: e.target.checked })}
                className="rounded border-zinc-800 bg-zinc-950 text-purple-600 focus:ring-purple-500 h-4 w-4"
              />
              Mark as Demo / Concept Showcase (Mandatory for non-client work)
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="rounded border-zinc-800 bg-zinc-950 text-purple-600 focus:ring-purple-500 h-4 w-4"
              />
              Published on Public Site
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Summary *
            </label>
            <textarea
              required
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="High-level overview of what was built..."
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Operational Challenge *
            </label>
            <textarea
              required
              rows={3}
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              placeholder="Describe the initial bottleneck..."
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Kyzor Custom Solution *
            </label>
            <textarea
              required
              rows={3}
              value={formData.solution}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="Describe the bespoke architecture built..."
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Results & Metrics (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.resultsText}
              onChange={(e) => setFormData({ ...formData, resultsText: e.target.value })}
              placeholder="Sub-200ms page transitions across global edge nodes&#10;Zero monthly plugin overhead"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
              Technologies (Comma separated)
            </label>
            <input
              type="text"
              value={formData.technologiesText}
              onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
              placeholder="Next.js, Supabase Postgres, Tailwind CSS, TypeScript"
              className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-accent-gradient py-3 text-sm font-semibold text-white shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Case Study...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? "Update Case Study" : "Create Case Study"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
