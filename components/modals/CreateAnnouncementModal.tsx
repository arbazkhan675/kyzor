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
            placeholder="Title"
          />
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Message"
          />
          <Input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            type="date"
            placeholder="Expiry Date"
          />

          <Button className="rounded-xl" onClick={save}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}