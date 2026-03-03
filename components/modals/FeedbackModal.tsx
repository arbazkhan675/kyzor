"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function FeedbackModal({ onSave }: { onSave: (text: string) => void }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  function save() {
    onSave(text);
    setText("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
          Add Feedback
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder="Write feedback..." />
          <Button className="rounded-xl" onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}