"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FuturisticBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

export function FuturisticBackground({ className, children }: FuturisticBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                if (!canvas) throw new Error("Canvas is null");
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 100
                    }, 255, ${Math.random() * 0.5 + 0.1})`;
            }

            update() {
                if (!canvas) return;
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;

                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;

                // Interactive subtle pull
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    this.x -= dx * 0.01;
                    this.y -= dy * 0.01;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            if (!canvas) return;
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, "rgba(20, 10, 40, 0.2)"); // Deep purple base
            gradient.addColorStop(0.5, "rgba(40, 20, 80, 0.1)");
            gradient.addColorStop(1, "rgba(10, 10, 30, 0.3)"); // Darkened corner
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("relative w-full overflow-hidden", className)}>
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black/40 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 z-0 rounded-full blur-[100px] w-[50vw] h-[50vh] bg-indigo-600/10 top-[-20%] left-[-10%] animate-pulse mix-blend-screen duration-10000 pointer-events-none"></div>
            <div className="absolute inset-0 z-0 rounded-full blur-[120px] w-[40vw] h-[40vh] bg-purple-600/10 bottom-[-10%] right-[-20%] animate-pulse mix-blend-screen duration-[15000ms] delay-500 pointer-events-none"></div>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ width: "100%", height: "100%" }}
            />
            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
}
