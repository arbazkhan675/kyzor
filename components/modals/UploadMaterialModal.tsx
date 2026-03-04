"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function UploadMaterialModal({ onAdd }: { onAdd: (title: string, url: string) => void }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function save() {
    if (!title.trim() || !file) return;

    setIsUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to the 'materials' bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      // Save the material record
      onAdd(title.trim(), publicUrl);

      // Reset state and close modal
      setTitle("");
      setFile(null);
      setOpen(false);
    } catch (error: any) {
      alert(`Error uploading file: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  function handleOpenChange(newOpen: boolean) {
    if (!isUploading) {
      setOpen(newOpen);
      if (!newOpen) {
        setTitle("");
        setFile(null);
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-xl">Upload Material</Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl border-white/10 bg-background">
        <DialogHeader>
          <DialogTitle>Add Training Material</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document Name (e.g., Onboarding Guide)"
            disabled={isUploading}
          />
          <div className="grid gap-2">
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={isUploading}
              className="file:border-0 file:bg-transparent file:text-sm file:font-semibold text-muted-foreground file:text-foreground cursor-pointer"
            />
            {file && (
              <p className="text-xs text-muted-foreground pl-1">Selected: {file.name}</p>
            )}
          </div>

          <Button
            className="rounded-xl mt-2 relative"
            onClick={save}
            disabled={!title.trim() || !file || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload and Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}