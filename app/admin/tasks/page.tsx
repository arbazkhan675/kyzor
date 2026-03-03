"use client";

import { useState } from "react";
import { initialAdminTasks, TaskStatus } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreateTaskModal } from "@/components/modals/CreateTaskModal";

function badgeVariant(status: TaskStatus) {
    if (status === "Approved") return "default" as const;
    if (status === "Rejected") return "destructive" as const;
    if (status === "Submitted") return "outline" as const;
    return "secondary" as const;
}

export default function AdminTasksPage() {
    const [rows, setRows] = useState(initialAdminTasks);

    function onCreate(t: { title: string; description: string; intern: string; deadline: string }) {
        setRows((prev) => [
            {
                id: `t_${Date.now()}`,
                title: t.title,
                description: t.description,
                intern: t.intern,
                deadline: t.deadline,
                status: "Pending" as TaskStatus,
            },
            ...prev,
        ]);
    }

    function setStatus(id: string, status: TaskStatus) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    }

    function remove(id: string) {
        setRows((prev) => prev.filter((r) => r.id !== id));
    }

    return (
        <div className="grid gap-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Tasks</h1>
                    <p className="text-sm text-muted-foreground">Create and manage intern tasks.</p>
                </div>
                <CreateTaskModal onCreate={onCreate} />
            </div>

            <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
                <CardHeader>
                    <CardTitle className="text-base">All Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Assigned To</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rows.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell className="font-medium">{r.title}</TableCell>
                                    <TableCell className="text-muted-foreground max-w-[200px] truncate" title={r.description}>
                                        {r.description}
                                    </TableCell>
                                    <TableCell>{r.intern}</TableCell>
                                    <TableCell className="text-muted-foreground">{r.deadline}</TableCell>
                                    <TableCell>
                                        <Badge variant={badgeVariant(r.status)} className="rounded-xl">
                                            {r.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                                                    Actions
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => alert("Edit Task modal would open here")}>
                                                    Edit Task
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => alert("Viewing full submission...")}>
                                                    View Submission
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatus(r.id, "Approved")}>
                                                    Mark Approved
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatus(r.id, "Rejected")}>
                                                    Mark Rejected
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400" onClick={() => remove(r.id)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
