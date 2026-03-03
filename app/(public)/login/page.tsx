"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onLogin() {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const { error, data: { user } } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error || !user) {
      alert("Login failed: " + (error?.message || "Check your credentials."));
      return;
    }

    // Role inference matched exactly with RequireRole auth guard behavior
    const role = user.email === "admin@kyzor.com" ? "admin" : "intern";
    router.push(role === "admin" ? "/admin/dashboard" : "/dashboard");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-md">
        <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Supabase handles role based on Email, toggle disabled */}
            <div className="text-sm text-muted-foreground text-center">
              Sample Admin: <strong>admin@kyzor.com</strong><br />
              Sample Intern: <strong>intern@kyzor.com</strong>
            </div>

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="rounded-xl" onClick={onLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login via Supabase"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}