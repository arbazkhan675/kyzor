"use client";

import { useEffect } from "react";

export function LightingEffect() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const targets = document.querySelectorAll(".lighting-hover, .glass-card");
            targets.forEach((target) => {
                const rect = (target as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                (target as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
                (target as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
}
