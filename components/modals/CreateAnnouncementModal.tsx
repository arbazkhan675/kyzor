"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateAnnouncementModal({
  onAdd,
}: {
  onAdd: (a: { title: string; message: string; expiry: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [expiry, setExpiry] = useState("");

  function save() {
    if (!title.trim() || !message.trim()) return;
    onAdd({
      title: title.trim(),
      message: message.trim(),
      expiry: expiry.trim() || "TBD",
    });
    setTitle("");
    setMessage("");
    setExpiry("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Create Announcement</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement Title"
            className="rounded-xl border-white/10 bg-white/5"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="What's the news?"
            className="rounded-xl border-white/10 bg-white/5 resize-none"
          />
          <div className="grid gap-1.5 px-1">
            <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Announce Date</label>
            <Input
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              type="date"
              className="rounded-xl border-white/10 bg-white/5 [color-scheme:dark]"
            />
          </div>

          <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold uppercase tracking-widest text-xs h-11" onClick={save}>
            Post Announcement
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}