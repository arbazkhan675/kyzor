"use client";

import { useState } from "react";
import { initialSubmissions } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "@/components/modals/FeedbackModal";

type Status = "Pending" | "Approved" | "Rejected";

export default function AdminSubmissionsPage() {
  const [rows, setRows] = useState(
    initialSubmissions.map((s) => ({ ...s, status: s.status as Status, feedback: "" }))
  );

  function setStatus(id: string, status: Status) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function setFeedback(id: string, feedback: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, feedback } : r)));
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Submissions</h1>
        <p className="text-sm text-muted-foreground">Review intern submissions.</p>
      </div>

      <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.intern}</TableCell>
                  <TableCell>{r.task}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"} className="rounded-xl">
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                        View PDF
                      </Button>
                      <Button className="rounded-xl" onClick={() => setStatus(r.id, "Approved")}>
                        Approve
                      </Button>
                      <Button variant="destructive" className="rounded-xl" onClick={() => setStatus(r.id, "Rejected")}>
                        Reject
                      </Button>
                      <FeedbackModal onSave={(text) => setFeedback(r.id, text)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}