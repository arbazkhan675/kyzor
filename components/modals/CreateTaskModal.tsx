"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { interns } from "@/lib/mockAdmin";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateTaskModal({
  onCreate,
}: {
  onCreate: (t: { title: string; description: string; intern: string; deadline: string }) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [intern, setIntern] = useState("");
  const [deadline, setDeadline] = useState("");

  function save() {
    if (!title.trim()) return;
    onCreate({
      title: title.trim(),
      description: description.trim(),
      intern: intern.trim() || "Unassigned",
      deadline: deadline.trim() || "TBD",
    });
    setTitle("");
    setDescription("");
    setIntern("");
    setDeadline("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Create Task</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description"
            rows={3}
          />
          <Select value={intern} onValueChange={setIntern}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Assign to Intern" />
            </SelectTrigger>
            <SelectContent>
              {interns.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline (e.g., Mar 10)"
          />

          <Button className="rounded-xl" onClick={save}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}