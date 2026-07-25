"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Kyzor Application Error]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-700 flex items-center justify-center mx-auto">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Something went wrong</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          An unexpected error occurred while rendering this page.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-lg bg-purple-700 px-6 py-3 text-xs font-semibold text-white hover:bg-purple-800 shadow-md"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-white border border-slate-200 px-6 py-3 text-xs font-semibold text-slate-800 hover:bg-slate-50 shadow-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
