"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const businessTypes = [
  "Startup",
  "Agency",
  "E-commerce",
  "SaaS",
  "Consulting",
  "Other",
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit() {
    if (!name.trim() || !email.trim()) {
      alert("Please enter at least your name and email.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("bookings").insert([
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
        business_type: businessType,
        message: message.trim(),
      },
    ]);

    setLoading(false);
    if (error) {
      alert("Error submitting request: " + error.message);
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-xl">
          <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CardTitle className="text-2xl">✅</CardTitle>
              </div>
              <CardTitle className="text-2xl font-bold">Request received</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground pb-8">
              We'll review your requirement and contact you shortly.
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-xl">
        <Card className="rounded-2xl border-white/10 bg-white/5 backdrop-blur p-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">Book a Free Consultation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1.5 px-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" className="rounded-xl border-white/10 bg-white/5" />
            </div>
            <div className="grid gap-1.5 px-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Email Address</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@company.com" type="email" className="rounded-xl border-white/10 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5 px-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className="rounded-xl border-white/10 bg-white/5" />
              </div>
              <div className="grid gap-1.5 px-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Company</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Stark Ind." className="rounded-xl border-white/10 bg-white/5" />
              </div>
            </div>

            <div className="grid gap-1.5 px-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Business Type</label>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger className="rounded-xl border-white/10 bg-white/5 h-10">
                  <SelectValue placeholder="What describes you best?" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-white/10 bg-zinc-950">
                  {businessTypes.map((bt) => (
                    <SelectItem key={bt} value={bt.toLowerCase()} className="rounded-lg">
                      {bt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5 px-1">
              <label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Project Details</label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Briefly describe what you're looking for..." rows={4} className="rounded-xl border-white/10 bg-white/5 resize-none" />
            </div>

            <Button className="mt-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold uppercase tracking-widest text-xs h-12 shadow-lg shadow-indigo-500/20" onClick={onSubmit} disabled={loading}>
              {loading ? "Transmitting..." : "Request Consultation"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
