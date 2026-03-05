"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadMaterialModal } from "@/components/modals/UploadMaterialModal";
import { ExternalLink, Trash2 } from "lucide-react";
import { MaterialPreviewModal } from "@/components/materials/MaterialPreviewModal";

export default function AdminMaterialsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  async function fetchMaterials() {
    setLoading(true);
    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setRows(data);
    setLoading(false);
  }

  async function add(title: string, url: string) {
    const { error } = await supabase
      .from("materials")
      .insert([{ title, url }]);

    if (!error) fetchMaterials();
  }

  async function remove(id: string) {
    const { error } = await supabase
      .from("materials")
      .delete()
      .eq("id", id);

    if (!error) fetchMaterials();
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Materials</h1>
          <p className="text-sm text-muted-foreground">Upload and manage training files.</p>
        </div>
        <UploadMaterialModal onAdd={add} />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading materials...</p>
      ) : (
        <div className="grid gap-3">
          {rows.map((m) => (
            <Card key={m.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base truncate pr-4">{m.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 shrink-0"
                  onClick={() => remove(m.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex gap-2">
                <MaterialPreviewModal
                  url={m.url}
                  title={m.title}
                  trigger={
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-white/10 bg-white/5 flex items-center gap-2"
                    >
                      <span><ExternalLink className="h-4 w-4" /> Preview</span>
                    </Button>
                  }
                />
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-white/10 bg-white/5"
                >
                  <a href={m.url} download className="flex items-center gap-2">
                    Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
          {rows.length === 0 && (
            <p className="text-sm text-muted-foreground">No materials found.</p>
          )}
        </div>
      )}
    </div>
  );
}