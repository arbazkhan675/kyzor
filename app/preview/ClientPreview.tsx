"use client";

import React, { useState, useEffect } from "react";
import { Eye, Loader2 } from "lucide-react";
import { LiveProvider, LiveError, LivePreview } from "react-live";

interface ClientPreviewProps {
    url?: string;
    title?: string;
}

export default function ClientPreview({ url = "", title = "" }: ClientPreviewProps) {
    const [code, setCode] = useState<string>("");
    const [markdown, setMarkdown] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const lcUrl = url.toLowerCase();
    const ext = lcUrl.split("?")[0].split("#")[0].split(".").pop() || "";

    const titleLc = title.toLowerCase();
    const isJsx = ext === "jsx" || ext === "tsx" || titleLc.endsWith(".jsx") || titleLc.endsWith(".tsx");
    const isPdf = ext === "pdf";
    const isImage = ["png", "jpg", "jpeg", "gif", "webp"].includes(ext);
    const isMarkdown = ["md", "txt", "json", "csv", "mdx"].includes(ext);

    useEffect(() => {
        if (!url) return;

        // reset state when switching files
        setError(null);
        setLoading(false);
        setCode("");
        setMarkdown("");

        if (isJsx && !code) {
            fetchCode();
        }

        if (isMarkdown && !markdown) {
            fetchMarkdown();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    async function fetchCode() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch file content");

            const text = await response.text();

            const defaultExportName =
                text.match(/export\s+default\s+(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)/)?.[1] ??
                text.match(/export\s+default\s+class\s+([A-Za-z_$][A-Za-z0-9_$]*)/)?.[1] ??
                // `export default Foo;` (identifier)
                text.match(/export\s+default\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*;?/)?.[1] ??
                null;

            // Strip imports/exports – react-live will run this in an isolated scope
            let cleanCode = text
                .replace(/import\s+.*?from\s+['"](.*?)['"]\s*;?/g, "")
                .replace(/import\s+.*?;?/g, "")
                .replace(/export\s+default\s+/g, "")
                .replace(/export\s+/g, "")
                .trim();

            // Try to detect a component name and add a render() call for react-live (noInline mode)
            if (!cleanCode.includes("render(")) {
                const declarationRegex =
                    /(?:const|function|class|async\s+function)\s+([A-Za-z_$][A-Za-z0-9_$]*)/g;

                const declaredNames: string[] = [];
                for (const match of cleanCode.matchAll(declarationRegex)) {
                    if (match[1]) declaredNames.push(match[1]);
                }

                const candidateName = defaultExportName ?? declaredNames.at(-1) ?? null;
                const trimmed = cleanCode.trim();

                if (candidateName) {
                    if (/^[A-Z]/.test(candidateName)) {
                        cleanCode += `\n\nrender(<${candidateName} />);`;
                    } else {
                        cleanCode += `\n\nrender(React.createElement(${candidateName}));`;
                    }
                } else if (
                    trimmed.startsWith("<") ||
                    (trimmed.startsWith("(") && trimmed.slice(1).trimStart().startsWith("<"))
                ) {
                    // Raw JSX expression
                    cleanCode = `render(${trimmed.startsWith("<") ? `(${trimmed})` : trimmed});`;
                } else if (/^\(?[\s\S]*?\)?\s*=>/.test(trimmed)) {
                    // Arrow function export
                    cleanCode = `const Component = ${trimmed.replace(/;\s*$/, "")};\nrender(React.createElement(Component));`;
                }
            }

            setCode(cleanCode);
        } catch (err: any) {
            console.error("Error fetching code:", err);
            setError(`Failed to load preview: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function fetchMarkdown() {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch markdown");
            const text = await response.text();
            setMarkdown(text);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to load preview.");
        } finally {
            setLoading(false);
        }
    }

    // render section
    if (!url) {
        return <p className="p-6">No URL provided for preview.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-background text-white">
            <header className="p-4 border-b border-white/10">
                <h1 className="text-lg font-bold">Preview: {title || url}</h1>
            </header>
            <div className="flex-1 relative">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                    </div>
                )}
                {error && (
                    <div className="p-6 text-center">
                        <div className="text-red-400 mb-2">
                            <p className="font-semibold">Preview Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}
                {!loading && !error && (
                    <div className="w-full h-full">
                        {isJsx ? (
                            <>
                                {code ? (
                                    <LiveProvider
                                        code={code}
                                        enableTypeScript={true}
                                        noInline={true}
                                        scope={{ React, useState, useEffect }}
                                    >
                                        <div className="p-4 overflow-auto">
                                            <LivePreview />
                                        </div>
                                        <LiveError className="p-4 text-red-400 font-mono text-xs bg-red-950/20" />
                                    </LiveProvider>
                                ) : (
                                    <div className="p-6 text-center text-gray-400">
                                        <p>Processing JSX file...</p>
                                    </div>
                                )}
                            </>
                        ) : isPdf ? (
                            <div className="w-full h-full flex flex-col">
                                <embed
                                    src={url}
                                    type="application/pdf"
                                    className="w-full flex-1"
                                    style={{ minHeight: "600px" }}
                                />
                                {!url.includes("blob") && (
                                    <div className="p-4 text-sm text-gray-400 border-t border-white/10">
                                        <p>
                                            <a
                                                href={url}
                                                download
                                                className="text-blue-400 hover:text-blue-300 underline"
                                            >
                                                Download PDF
                                            </a>
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : isImage ? (
                            <div className="w-full h-full flex items-center justify-center p-4">
                                <img src={url} alt={title} className="max-w-full max-h-full object-contain" />
                            </div>
                        ) : isMarkdown ? (
                            <pre className="p-4 whitespace-pre-wrap overflow-auto text-sm">{markdown}</pre>
                        ) : (
                            <iframe
                                src={url}
                                className="w-full flex-1"
                                style={{ minHeight: "600px" }}
                                title={title || "Preview"}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
