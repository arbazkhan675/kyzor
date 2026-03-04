"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BookingStatus } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function badgeVariant(status: string) {
  if (status === "Closed") return "default";
  if (status === "Contacted") return "secondary";
  return "outline";
}

export default function AdminBookingsPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setRows(data);
    setLoading(false);
  }

  async function setStatus(id: string, status: string) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) fetchBookings();
  }

  async function remove(id: string) {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (!error) fetchBookings();
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage consultation requests.</p>
      </div>

      <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base text-indigo-300 font-bold uppercase tracking-widest text-xs">All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="py-12 text-center text-sm text-muted-foreground animate-pulse">Synchronizing requests...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-xs uppercase font-black">Name</TableHead>
                  <TableHead className="text-xs uppercase font-black">Company</TableHead>
                  <TableHead className="text-xs uppercase font-black">Email</TableHead>
                  <TableHead className="text-xs uppercase font-black">Status</TableHead>
                  <TableHead className="text-xs uppercase font-black">Date</TableHead>
                  <TableHead className="text-right text-xs uppercase font-black">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} className="border-white/5 hover:bg-white/[0.02]">
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell className="text-muted-foreground">{r.company || "N/A"}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-[10px]">{r.email}</TableCell>
                    <TableCell>
                      <Badge variant={badgeVariant(r.status)} className="rounded-xl text-[10px] h-5">
                        {r.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-[10px]">
                      {new Date(r.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 text-[10px] h-8 px-3">
                            Handle
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl border-white/10 bg-zinc-950">
                          <DropdownMenuItem className="text-xs font-bold" onClick={() => setStatus(r.id, "Contacted")}>
                            Mark Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold" onClick={() => setStatus(r.id, "Closed")}>
                            Mark Closed
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 text-xs font-bold" onClick={() => remove(r.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-20 text-center text-sm text-muted-foreground">
                      No consultation requests yet.
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
