"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export function SubmitWorkModal({ taskTitle }: { taskTitle: string }) {
  const [done, setDone] = useState(false);

  return (
    <Dialog onOpenChange={(open) => !open && setDone(false)}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Submit Work</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Submit Work</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
            Submitted ✅ — <span className="text-muted-foreground">{taskTitle}</span>
          </div>
        ) : (
          <div className="grid gap-3">
            <div className="text-sm text-muted-foreground">{taskTitle}</div>

            <div className="grid gap-2">
              <label className="text-sm">Upload PDF (UI only)</label>
              <Input type="file" accept="application/pdf" />
            </div>

            <div className="grid gap-2">
              <label className="text-sm">Comment</label>
              <Textarea placeholder="Add a short note..." rows={4} />
            </div>

            <Button className="rounded-xl" onClick={() => setDone(true)}>
              Submit
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}