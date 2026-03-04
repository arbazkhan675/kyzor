"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) setAnnouncements(data);
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight uppercase bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Announcements
        </h1>
        <p className="text-sm text-muted-foreground font-medium">Stay updated with the latest news.</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground font-mono animate-pulse">Fetching news...</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map((a, idx) => (
            <Card
              key={a.id}
              className="rounded-3xl glass-card animate-in border-none"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between gap-4 pb-4 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/10">
                    <Megaphone className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base font-bold">{a.title}</CardTitle>
                </div>
                <Badge variant="secondary" className="rounded-full px-3 py-0.5 border-white/5 bg-white/5 text-[9px] uppercase tracking-widest font-black">
                  Announced: {a.expiry}
                </Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground/80 leading-relaxed pt-4">
                {a.message}
              </CardContent>
            </Card>
          ))}
          {announcements.length === 0 && (
            <p className="text-sm text-muted-foreground p-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
              No announcements today. Silence is golden!
            </p>
          )}
        </div>
      )}
    </div>
  );
}