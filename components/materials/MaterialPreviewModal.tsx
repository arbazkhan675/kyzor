"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface MaterialPreviewModalProps {
    url: string;
    title: string;
    trigger?: React.ReactNode;
}

export function MaterialPreviewModal({ url, title, trigger }: MaterialPreviewModalProps) {
    // if there's no URL, disable the preview link entirely
    if (!url) {
        if (trigger) {
            return <span className="opacity-50 cursor-not-allowed">{trigger}</span>;
        }
        return (
            <Button disabled variant="outline" size="sm" className="rounded-xl">
                <Eye className="h-3 w-3" /> Preview
            </Button>
        );
    }

    // build a link to the preview page
    const href = `/preview?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        title || ""
    )}`;

    if (trigger) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer">
                {trigger}
            </a>
        );
    }

    return (
        <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl border-white/10 bg-white/5"
        >
            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Eye className="h-3 w-3" /> Preview
            </a>
        </Button>
    );
}
