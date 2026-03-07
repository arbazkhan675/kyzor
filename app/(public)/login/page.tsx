"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col justify-center items-center gap-2 mb-8 transform transition-all duration-500 animate-in fade-in slide-in-from-top-4">
          <div className="relative h-16 w-16 mb-1">
            <Image
              src="/logo1.png"
              alt="KYZOR Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-[0.3em] uppercase opacity-90">KYZOR</span>
        </div>
        <Card className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="h-2" />

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

            <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold uppercase tracking-widest text-xs h-11" onClick={onLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}