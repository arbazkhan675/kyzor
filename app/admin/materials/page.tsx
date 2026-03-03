"use client";

import { useState } from "react";
import { initialMaterials } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadMaterialModal } from "@/components/modals/UploadMaterialModal";

export default function AdminMaterialsPage() {
  const [rows, setRows] = useState(initialMaterials);

  function add(title: string) {
    setRows((prev) => [{ id: `m_${Date.now()}`, title }, ...prev]);
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

      <div className="grid gap-3">
        {rows.map((m) => (
          <Card key={m.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}