"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateAnnouncementModal } from "@/components/modals/CreateAnnouncementModal";

export default function AdminAnnouncementsPage() {
    const [rows, setRows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function fetchAnnouncements() {
        setLoading(true);
        const { data, error } = await supabase
            .from("announcements")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setRows(data);
        setLoading(false);
    }

    async function onAdd(a: { title: string; message: string; expiry: string }) {
        const { error } = await supabase
            .from("announcements")
            .insert([{ title: a.title, message: a.message, expiry: a.expiry }]);

        if (!error) fetchAnnouncements();
    }

    async function remove(id: string) {
        const { error } = await supabase
            .from("announcements")
            .delete()
            .eq("id", id);

        if (!error) fetchAnnouncements();
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

            {loading ? (
                <p className="text-sm text-muted-foreground">Loading announcements...</p>
            ) : (
                <div className="grid gap-3">
                    {rows.map((a) => (
                        <Card key={a.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
                            <CardHeader className="flex flex-row items-start justify-between gap-4">
                                <CardTitle className="text-base">{a.title}</CardTitle>
                                <Badge variant="secondary" className="rounded-xl">
                                    Announced: {a.expiry}
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
                    {rows.length === 0 && (
                        <p className="text-sm text-muted-foreground">No announcements found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
