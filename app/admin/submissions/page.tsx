"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "@/components/modals/FeedbackModal";
import { ExternalLink, CheckCircle, XCircle } from "lucide-react";

export default function AdminSubmissionsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    setLoading(true);
    const { data } = await supabase
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setRows(data);
    setLoading(false);
  }

  async function updateStatus(submissionId: string, taskId: string, status: "Approved" | "Rejected") {
    try {
      // 1. Update submission status
      await supabase
        .from("submissions")
        .update({ status })
        .eq("id", submissionId);

      // 2. Update task status
      await supabase
        .from("tasks")
        .update({ status })
        .eq("id", taskId);

      fetchSubmissions();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Submissions</h1>
        <p className="text-sm text-muted-foreground">Review and manage intern work submissions.</p>
      </div>

      <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur overflow-hidden py-0">
        <CardHeader className="py-3 px-6 border-b border-white/5 bg-white/[0.02]">
          <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
              Loading submissions...
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-white/[0.01]">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="py-4">Intern</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Submission Note</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                    <TableCell className="font-medium">{r.intern_name}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={r.task_title}>{r.task_title}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground text-sm" title={r.content}>
                      {r.content || "No comment provided"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"}
                        className="rounded-xl text-[10px]"
                      >
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {r.file_url ? (
                          <Button asChild variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 h-8">
                            <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                              <ExternalLink className="h-3 w-3" /> View
                            </a>
                          </Button>
                        ) : (
                          <Button disabled variant="ghost" size="sm" className="rounded-xl opacity-30 h-8">
                            No Link
                          </Button>
                        )}

                        {r.status === "Pending" && (
                          <>
                            <Button
                              size="sm"
                              className="rounded-xl h-8 gap-1.5"
                              onClick={() => updateStatus(r.id, r.task_id, "Approved")}
                            >
                              <CheckCircle className="h-3 w-3" /> Approve
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="rounded-xl h-8 gap-1.5"
                              onClick={() => updateStatus(r.id, r.task_id, "Rejected")}
                            >
                              <XCircle className="h-3 w-3" /> Reject
                            </Button>
                          </>
                        )}
                        {/* <FeedbackModal onSave={(text) => console.log("Feedback saved:", text)} /> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                      No submissions found yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}