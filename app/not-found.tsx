import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center space-y-6">
      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto">
        <FileQuestion className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">404 - Page Not Found</h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The page or case study you are looking for does not exist or has been moved.
        </p>
      </div>
      <div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 px-6 py-3 text-xs font-semibold text-white hover:bg-zinc-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Kyzor Homepage
        </Link>
      </div>
    </div>
  );
}
