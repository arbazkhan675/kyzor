"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save, Trophy } from "lucide-react";

interface Intern {
    id?: string;
    name: string;
    avatar: string;
    role: string;
    pts: number;
    badge: "elite" | "rising" | null;
}

export default function AdminLeaderboardPage() {
    const [interns, setInterns] = useState<Intern[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState<Intern>({
        name: "",
        avatar: "",
        role: "Cyber Intern",
        pts: 0,
        badge: null,
    });

    useEffect(() => {
        fetchLeaderboard();

        // Subtle real-time subscription for admin list too
        const channel = supabase
            .channel("admin_leaderboard_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "leaderboard" },
                () => fetchLeaderboard()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    async function fetchLeaderboard() {
        setLoading(true);
        const { data } = await supabase
            .from("leaderboard")
            .select("*")
            .order("pts", { ascending: false });

        if (data) setInterns(data);
        setLoading(false);
    }

    async function handleAdd() {
        if (!newItem.name || !newItem.avatar) {
            alert("Name and Initials are required.");
            return;
        }

        const { error } = await supabase.from("leaderboard").insert([newItem]);

        if (error) {
            alert("Error adding intern: " + error.message);
        } else {
            setIsAdding(false);
            setNewItem({ name: "", avatar: "", role: "Cyber Intern", pts: 0, badge: null });
            fetchLeaderboard();
        }
    }

    async function handleUpdate(id: string, updates: Partial<Intern>) {
        const { error } = await supabase.from("leaderboard").update(updates).eq("id", id);
        if (error) {
            alert("Update failed: " + error.message);
        } else {
            fetchLeaderboard();
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("leaderboard").delete().eq("id", id);
        if (error) {
            alert("Delete failed: " + error.message);
        } else {
            fetchLeaderboard();
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-3 text-indigo-400">
                        <Trophy className="h-6 w-6" />
                        Leaderboard Management
                    </h1>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1 font-medium">Rank and reward top performers</p>
                </div>
                <Button
                    onClick={() => setIsAdding(true)}
                    className="rounded-xl bg-indigo-500 hover:bg-indigo-600 gap-2 font-bold uppercase tracking-widest text-xs h-11 px-6 shadow-lg shadow-indigo-500/20"
                >
                    <Plus className="h-4 w-4" /> Add Performer
                </Button>
            </div>

            <div className="grid gap-6">
                {isAdding && (
                    <Card className="p-6 border-indigo-500/30 bg-indigo-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                                <Input
                                    placeholder="e.g. Andleeb Zoha"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="rounded-xl border-white/10 bg-white/5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Initials (Avatar)</label>
                                <Input
                                    placeholder="e.g. AZ"
                                    maxLength={2}
                                    value={newItem.avatar}
                                    onChange={(e) => setNewItem({ ...newItem, avatar: e.target.value.toUpperCase() })}
                                    className="rounded-xl border-white/10 bg-white/5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Points</label>
                                <Input
                                    type="number"
                                    value={newItem.pts}
                                    onChange={(e) => setNewItem({ ...newItem, pts: parseInt(e.target.value) || 0 })}
                                    className="rounded-xl border-white/10 bg-white/5"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Badge</label>
                                <select
                                    className="w-full text-sm h-10 rounded-xl border border-white/10 bg-white/5 px-3 uppercase tracking-widest font-bold"
                                    value={newItem.badge || ""}
                                    onChange={(e) => setNewItem({ ...newItem, badge: (e.target.value as any) || null })}
                                >
                                    <option value="">No Badge</option>
                                    <option value="elite">Elite</option>
                                    <option value="rising">Rising</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleAdd} className="flex-1 rounded-xl bg-indigo-500 font-bold uppercase tracking-widest text-[10px]">Create Entry</Button>
                                <Button variant="ghost" onClick={() => setIsAdding(false)} className="rounded-xl border border-white/10 text-[10px] uppercase font-bold tracking-widest">Cancel</Button>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="space-y-3">
                    {interns.map((intern, idx) => (
                        <Card key={intern.id} className="p-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all">
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
                                <div className="flex items-center gap-4 col-span-2">
                                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-indigo-400">
                                        {intern.avatar}
                                    </div>
                                    <div>
                                        <Input
                                            defaultValue={intern.name}
                                            onBlur={(e) => handleUpdate(intern.id!, { name: e.target.value })}
                                            className="h-8 border-transparent bg-transparent focus:bg-white/5 font-bold p-0 text-sm"
                                        />
                                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{intern.role}</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest opacity-30">Ranking</label>
                                    <div className="text-sm font-mono font-bold text-indigo-400/50">#{idx + 1}</div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest opacity-30">Points</label>
                                    <Input
                                        type="number"
                                        defaultValue={intern.pts}
                                        onBlur={(e) => handleUpdate(intern.id!, { pts: parseInt(e.target.value) || 0 })}
                                        className="h-8 border-white/5 bg-white/5 font-mono font-bold text-indigo-400"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[9px] font-black uppercase tracking-widest opacity-30">Badge</label>
                                    <select
                                        className="h-8 rounded-lg border-white/5 bg-white/5 px-2 text-[10px] uppercase font-bold tracking-widest"
                                        defaultValue={intern.badge || ""}
                                        onChange={(e) => handleUpdate(intern.id!, { badge: (e.target.value as any) || null })}
                                    >
                                        <option value="">None</option>
                                        <option value="elite">Elite</option>
                                        <option value="rising">Rising</option>
                                    </select>
                                </div>

                                <div className="flex justify-end pr-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(intern.id!)}
                                        className="h-9 w-9 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {interns.length === 0 && !loading && (
                        <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-5" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">No performance records initialized</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
