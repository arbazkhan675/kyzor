"use client";

import { useState } from "react";
import { initialBookings, BookingStatus } from "@/lib/mockAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function badgeVariant(status: BookingStatus) {
  if (status === "Closed") return "default";
  if (status === "Contacted") return "secondary";
  return "outline";
}

export default function AdminBookingsPage() {
  const [rows, setRows] = useState(initialBookings);

  function setStatus(id: string, status: BookingStatus) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Bookings</h1>
        <p className="text-sm text-muted-foreground">Manage consultation requests.</p>
      </div>

      <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.company}</TableCell>
                  <TableCell className="text-muted-foreground">{r.email}</TableCell>
                  <TableCell>
                    <Badge variant={badgeVariant(r.status)} className="rounded-xl">
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setStatus(r.id, "Contacted")}>
                          Mark Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatus(r.id, "Closed")}>
                          Mark Closed
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