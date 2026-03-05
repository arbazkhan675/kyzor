"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export function SubmitWorkModal({
  taskId,
  taskTitle,
  internName,
  status,
  deadline,
}: {
  taskId: string;
  taskTitle: string;
  internName?: string;
  status: string;
  deadline?: string;
}) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const lockedByStatus = ["Submitted", "Approved", "Rejected"].includes(status);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let isOverdue = false;
  if (deadline && deadline !== "TBD") {
    const parsed = new Date(deadline);
    if (!Number.isNaN(parsed.getTime())) {
      parsed.setHours(0, 0, 0, 0);
      isOverdue = parsed < today;
    }
  }

  const isLocked = lockedByStatus || isOverdue;

  async function handleSubmit() {
    if (!file && !comment) return;

    setLoading(true);
    try {
      let uploadedUrl = "";

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${taskId}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("submissions")
          .getPublicUrl(fileName);

        uploadedUrl = publicUrl;
      }

      // 1. Insert into submissions table
      const { error: subError } = await supabase
        .from("submissions")
        .insert([{
          task_id: taskId,
          task_title: taskTitle,
          intern_name: internName || "Unknown Intern",
          content: comment,
          file_url: uploadedUrl,
          status: "Pending",
        }]);

      if (subError) {
        throw subError;
      }

      // 2. Update task status to 'Submitted'
      const { error: taskError } = await supabase
        .from("tasks")
        .update({ status: "Submitted" })
        .eq("id", taskId);

      if (taskError) {
        throw taskError;
      }

      setDone(true);
    } catch (error: any) {
      console.error("Submission failed:", error);
      const message =
        typeof error?.message === "string"
          ? error.message
          : typeof error === "string"
          ? error
          : "Unknown error";
      alert(`Failed to submit work. Details: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => !open && setDone(false)}>
      <DialogTrigger asChild>
        <Button
          className="rounded-xl px-6 font-bold uppercase tracking-widest text-[10px]"
          disabled={lockedByStatus}
        >
          {lockedByStatus
            ? "Reflect on Status"
            : isOverdue
            ? "Deadline Passed"
            : "Submit Work"}
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-3xl border-white/10 bg-background/95 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight uppercase">Submit Your Work</DialogTitle>
        </DialogHeader>

        {isOverdue && !lockedByStatus && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs text-red-300 font-medium">
            You can&apos;t submit this task now. The deadline has passed.
          </div>
        )}

        {done ? (
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center animate-in">
            <div className="text-4xl mb-4">🚀</div>
            <div className="text-lg font-bold">Mission Accomplished!</div>
            <div className="text-muted-foreground mt-2 text-sm">Your work for <span className="text-white font-medium">{taskTitle}</span> has been logged.</div>
          </div>
        ) : (
          <div className="grid gap-6 py-4">
            <div className="text-sm font-bold text-indigo-400 px-1 uppercase tracking-wider">{taskTitle}</div>

            <div className="grid gap-2 text-left">
              <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-1">Upload File</label>
              <div className="relative group">
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="rounded-2xl border-white/10 bg-white/[0.02] cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 transition-all h-12 pt-2.5"
                />
              </div>
              <p className="text-[9px] text-muted-foreground/60 ml-1 italic">PDF, ZIP, or Images preferred.</p>
            </div>

            <div className="grid gap-2 text-left">
              <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-1">Notes / Summary</label>
              <Textarea
                placeholder="Explain what you've completed..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded-2xl border-white/10 bg-white/[0.02] focus:ring-indigo-500/20 resize-none text-sm p-4"
              />
            </div>

            <Button
              className="rounded-2xl w-full h-12 font-black uppercase tracking-[0.2em] text-xs bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
              onClick={handleSubmit}
              disabled={loading || isOverdue || (!file && !comment)}
            >
              {loading ? "Uploading..." : "Sync Submission"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
