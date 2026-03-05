"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, AlertCircle } from "lucide-react";
import { MaterialPreviewModal } from "@/components/materials/MaterialPreviewModal";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      const { data } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setMaterials(data);
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Training Materials
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Resources to help you grow.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-mono animate-pulse">Fetching resources...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          {materials.map((m, idx) => (
            <Card
              key={m.id}
              className="rounded-3xl glass-card animate-in flex flex-col border-none"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <CardHeader className="pb-3 flex flex-row items-start gap-4 space-y-0">
                <div className="p-3 rounded-2xl bg-white/[0.03] text-indigo-400 shrink-0 border border-white/5 shadow-inner">
                  <FileText className="h-5 w-5" />
                </div>
                <CardTitle className="text-sm font-bold leading-tight pt-1">
                  {m.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-3 pt-0">
                <div className="flex gap-2">
                  <MaterialPreviewModal
                    url={m.url || "#"}
                    title={m.title}
                    trigger={
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="w-full rounded-xl gap-2 text-[10px] uppercase tracking-widest font-black h-9 bg-white/5 hover:bg-white/10 border-white/5 transition-all"
                      >
                        <span><Eye className="h-3.5 w-3.5" /> Preview</span>
                      </Button>
                    }
                  />

                  {m.url ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl gap-2 text-[10px] uppercase tracking-widest font-black h-9 border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <a href={m.url} download>
                        <Download className="h-3.5 w-3.5" /> Get
                      </a>
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-xl gap-2 text-[10px] uppercase tracking-widest font-black h-9 opacity-20 border-white/5"
                    >
                      <AlertCircle className="h-3.5 w-3.5" /> Empty
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {materials.length === 0 && (
            <p className="text-sm text-muted-foreground p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02] col-span-full">
              No materials uploaded yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}