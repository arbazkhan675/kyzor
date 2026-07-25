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
      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Something went wrong</h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          An unexpected error occurred while rendering this page.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-xs font-semibold text-white hover:bg-purple-500"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 px-6 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
