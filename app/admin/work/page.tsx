import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteWorkItemAction } from "@/app/actions/admin";
import { Plus, Edit3, Trash2, ExternalLink } from "lucide-react";

export const revalidate = 0;

async function getAdminWorkItems() {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from("work_items").select("*").order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function AdminWorkPage() {
  const items = await getAdminWorkItems();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Case Study Portfolio</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage published custom e-commerce and automation case studies.</p>
        </div>
        <Link
          href="/admin/work/new"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:scale-[1.02] transition-transform"
        >
          <Plus className="h-4 w-4" />
          Create Case Study
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item: any) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                {item.is_demo ? (
                  <span className="text-[10px] font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                    Demo / Concept
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Client Production
                  </span>
                )}
              </div>

              <h2 className="text-base font-bold text-white leading-snug">{item.title}</h2>
              <p className="text-xs text-zinc-400 line-clamp-2">{item.summary}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
              <Link
                href={`/work/${item.slug}`}
                target="_blank"
                className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
              >
                View Public
                <ExternalLink className="h-3 w-3" />
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/work/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-zinc-800 text-zinc-200 px-3 py-1.5 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  Edit
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await deleteWorkItemAction(item.id);
                  }}
                >
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1.5 rounded-md hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
