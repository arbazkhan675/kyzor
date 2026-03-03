"use client";

import { useState } from "react";
import { initialAnnouncements } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateAnnouncementModal } from "@/components/modals/CreateAnnouncementModal";

export default function AdminAnnouncementsPage() {
    const [rows, setRows] = useState(initialAnnouncements);

    function onAdd(a: { title: string; message: string; expiry: string }) {
        setRows((prev) => [
            { id: `a_${Date.now()}`, title: a.title, message: a.message, expiry: a.expiry },
            ...prev,
        ]);
    }

    function remove(id: string) {
        setRows((prev) => prev.filter((r) => r.id !== id));
    }

    return (
        <div className="grid gap-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold">Announcements</h1>
                    <p className="text-sm text-muted-foreground">Create and manage announcements for interns.</p>
                </div>
                <CreateAnnouncementModal onAdd={onAdd} />
            </div>

            <div className="grid gap-3">
                {rows.map((a) => (
                    <Card key={a.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
                        <CardHeader className="flex flex-row items-start justify-between gap-4">
                            <CardTitle className="text-base">{a.title}</CardTitle>
                            <Badge variant="secondary" className="rounded-xl">
                                Expires: {a.expiry}
                            </Badge>
                        </CardHeader>
                        <CardContent className="flex items-end justify-between gap-4">
                            <p className="text-sm text-muted-foreground">{a.message}</p>
                            <Button
                                variant="outline"
                                className="shrink-0 rounded-xl border-white/10 bg-white/5 text-red-400 hover:text-red-300"
                                onClick={() => remove(a.id)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
