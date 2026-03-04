"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateTaskModal } from "@/components/modals/CreateTaskModal";

function badgeVariant(status: string) {
    if (status === "Approved") return "default" as const;
    if (status === "Rejected") return "destructive" as const;
    if (status === "Submitted") return "outline" as const;
    return "secondary" as const;
}

export default function AdminTasksPage() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        setLoading(true);
        const { data } = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setRows(data);
        setLoading(false);
    }

    async function onCreate(t: { title: string; description: string; intern: string; deadline: string }) {
        const { error } = await supabase
            .from("tasks")
            .insert([{
                title: t.title,
                description: t.description,
                intern_name: t.intern,
                deadline: t.deadline,
                status: "Pending"
            }]);

        if (!error) fetchTasks();
    }

    async function setStatus(id: string, status: string) {
        const { error } = await supabase
            .from("tasks")
            .update({ status })
            .eq("id", id);

        if (!error) fetchTasks();
    }

    async function remove(id: string) {
        const { error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", id);

        if (!error) fetchTasks();
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

            <Card className="rounded-3xl glass-card border-none animate-in delay-100 overflow-hidden py-0">
                <CardHeader className="py-3 px-6 border-b border-white/5 bg-white/[0.01]">
                    <CardTitle className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black">All Tasks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-white/[0.02]">
                            <TableRow className="border-white/5 hover:bg-transparent">
                                <TableHead className="text-[10px] uppercase tracking-widest font-bold">Title</TableHead>
                                <TableHead className="text-[10px] uppercase tracking-widest font-bold">Description</TableHead>
                                <TableHead className="text-[10px] uppercase tracking-widest font-bold">Assigned To</TableHead>
                                <TableHead className="text-[10px] uppercase tracking-widest font-bold">Deadline</TableHead>
                                <TableHead className="text-[10px] uppercase tracking-widest font-bold">Status</TableHead>
                                <TableHead className="text-right text-[10px] uppercase tracking-widest font-bold">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {rows.map((r) => (
                                <TableRow key={r.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <TableCell className="font-bold text-sm text-indigo-100">{r.title}</TableCell>
                                    <TableCell className="text-muted-foreground max-w-[200px] truncate text-xs" title={r.description}>
                                        {r.description}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                                                {r.intern_name?.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium">{r.intern_name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs font-mono">{r.deadline}</TableCell>
                                    <TableCell>
                                        <Badge variant={badgeVariant(r.status)} className="rounded-full text-[9px] px-2 py-0 border-white/10 uppercase font-black">
                                            {r.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 h-8 text-[10px] uppercase tracking-widest font-bold">
                                                    Manage
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-white/10 bg-background/95 backdrop-blur-xl">
                                                <DropdownMenuItem onClick={() => alert("Edit Task modal would open here")}>
                                                    Edit Task
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => router.push("/admin/submissions")}>
                                                    View Submission
                                                </DropdownMenuItem>
                                                <div className="h-px bg-white/5 my-1" />
                                                <DropdownMenuItem onClick={() => setStatus(r.id, "Approved")} className="text-emerald-400">
                                                    Mark Approved
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setStatus(r.id, "Rejected")} className="text-red-400">
                                                    Mark Rejected
                                                </DropdownMenuItem>
                                                <div className="h-px bg-white/5 my-1" />
                                                <DropdownMenuItem className="text-red-500 font-bold" onClick={() => remove(r.id)}>
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
        </div >
    );
}
