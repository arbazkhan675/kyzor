"use client";

import { useState } from "react";
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

  if (submitted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-xl">
          <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader>
              <CardTitle>Request received ✅</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
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
        <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle>Book a Free Consultation</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder="Full Name" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Phone" />
            <Input placeholder="Company Name" />

            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((bt) => (
                  <SelectItem key={bt} value={bt.toLowerCase()}>
                    {bt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea placeholder="Describe Your Requirement" rows={5} />

            <Button className="mt-2 rounded-xl" onClick={() => setSubmitted(true)}>
              Request Consultation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}