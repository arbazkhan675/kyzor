"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAdminAction } from "@/app/actions/admin";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdminAction(formData);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <Image src="/logo.png" alt="Kyzor Admin" width={48} height={48} className="mx-auto object-contain" />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Kyzor Admin Portal</h1>
          <p className="text-xs text-slate-500">Authorized Agency Access Only</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="admin@kyzor.online"
                className="w-full rounded-lg bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-lg bg-accent-gradient py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.01] transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
