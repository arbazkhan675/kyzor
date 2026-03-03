"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UploadMaterialModal({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  function save() {
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Upload Material</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          <Input type="file" />
          <Button className="rounded-xl" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}