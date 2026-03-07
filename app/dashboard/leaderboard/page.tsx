"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Badge = "elite" | "rising" | null;

interface Intern {
  id: string;
  name: string;
  avatar: string; // initials
  role: string;
  pts: number;
  badge: Badge;
}

export default function LeaderboardPage() {
  const [interns, setInterns] = useState<Intern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();

    // Set up real-time subscription
    const channel = supabase
      .channel("leaderboard_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leaderboard" },
        (payload) => {
          console.log("Leaderboard updated:", payload);
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchLeaderboard() {
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("pts", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching leaderboard:", error);
    } else if (data) {
      setInterns(data);
    }
    setLoading(false);
  }

  // Handle case where we have fewer than 3 interns
  const sortedInterns = [...interns];
  const podiumInterns = [
    sortedInterns[1] || null, // Rank 2
    sortedInterns[0] || null, // Rank 1
    sortedInterns[2] || null  // Rank 3
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050508] text-[#615FFF]">
        <div className="animate-pulse font-mono tracking-widest uppercase text-xs">Syncing Performance Data...</div>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <style>{`
        :root {
          --bg: #050508;
          --card-bg: #0f0f1a;
          --accent: #615FFF;
          --accent-glow: rgba(97, 95, 255, 0.4);
          --accent-border: rgba(97, 95, 255, 0.15);
          --rank-1: #615FFF;
          --rank-2: #8583ff;
          --rank-3: #a8a7ff;
          --grid-opacity: 0.03;
        }

        .leaderboard-container {
          background-color: var(--bg);
          min-height: 100vh;
          color: white;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          font-family: var(--font-syne), sans-serif;
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(var(--accent-border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--accent-border) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: var(--grid-opacity);
          pointer-events: none;
        }

        .ambient-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          filter: blur(80px);
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        }

        .header {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          z-index: 10;
        }

        .tagline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-space-mono), monospace;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }

        .title {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 3.5rem;
          text-transform: uppercase;
          margin: 0;
        }

        .title span {
          color: var(--accent);
          text-shadow: 0 0 30px var(--accent-glow);
        }

        /* Podium Section */
        .podium {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 5rem;
          position: relative;
          z-index: 10;
        }

        .podium-card {
          background: var(--card-bg);
          border: 1px solid var(--accent-border);
          border-bottom: none;
          width: 260px;
          padding: 2.5rem 1.5rem 3.5rem; /* Increased bottom padding */
          text-align: center;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          clip-path: polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%);
        }

        .podium-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 20px 40px rgba(97, 95, 255, 0.2);
        }

        .podium-card .rank-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          box-shadow: 0 5px 15px currentColor;
        }

        .rank-number {
          font-family: var(--font-space-mono), monospace;
          font-size: 4rem;
          font-weight: 800;
          opacity: 0.1;
          position: absolute;
          top: 1rem;
          right: 1.5rem;
        }

        .avatar {
          width: 80px;
          height: 80px;
          background: var(--bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
          border: 2px solid var(--accent);
          box-shadow: 0 0 20px var(--accent-glow);
        }

        .name {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          margin: 0 0 0.25rem;
          letter-spacing: -0.02em;
        }

        .role {
          font-family: var(--font-space-mono), monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }

        .points {
          font-family: var(--font-space-mono), monospace;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent);
        }

        .points span {
          font-size: 0.6rem;
          opacity: 0.5;
          margin-left: 0.25rem;
        }

        /* Rank specific heights and colors */
        .rank-2 { min-height: 340px; --rank-color: var(--rank-2); }
        .rank-1 { min-height: 420px; --rank-color: var(--rank-1); width: 300px; }
        .rank-3 { min-height: 310px; --rank-color: var(--rank-3); }

        /* Table Section */
        .table-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .row {
          display: grid;
          grid-template-columns: 80px 1fr 120px;
          align-items: center;
          background: rgba(15, 15, 26, 0.5);
          border: 1px solid var(--accent-border);
          margin-bottom: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.5s forwards;
        }

        @keyframes slideIn {
          to { opacity: 1; transform: translateX(0); }
        }

        .row:hover {
          background: rgba(97, 95, 255, 0.05);
          border-color: var(--accent);
          transform: scale(1.01) translateX(5px);
        }

        .row-rank {
          font-family: var(--font-space-mono), monospace;
          font-weight: 800;
          color: var(--accent);
          font-size: 1.1rem;
        }

        .row-intern {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .row-avatar {
          width: 44px;
          height: 44px;
          background: var(--card-bg);
          border: 1px solid var(--accent-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--accent);
        }

        .row-details {
          display: flex;
          flex-direction: column;
        }

        .row-name {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .row-role {
          font-family: var(--font-space-mono), monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          letter-spacing: 0.1em;
        }

        .badge {
          font-family: var(--font-space-mono), monospace;
          font-size: 0.55rem;
          font-weight: 800;
          padding: 0.15rem 0.5rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          border-radius: 2px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .row-points {
          font-family: var(--font-space-mono), monospace;
          font-weight: 800;
          text-align: right;
          font-size: 1.1rem;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .podium { flex-direction: column; align-items: center; gap: 1rem; }
          .podium-card { width: 100%; height: auto !important; }
          .rank-1 { order: -1; }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="ambient-orb" />

      <header className="header">
        <div className="tagline">
          <div className="pulse-dot" />
          Performance Rankings
        </div>
        <h1 className="title">Top <span>Performers</span></h1>
      </header>

      <section className="podium">
        {podiumInterns.map((intern, idx) => {
          if (!intern) return null;
          const rankLabel = idx === 0 ? 2 : idx === 1 ? 1 : 3;
          return (
            <div key={intern.id} className={`podium-card rank-${rankLabel}`}>
              <div className="rank-line" style={{ color: `var(--rank-${rankLabel})`, backgroundColor: `var(--rank-${rankLabel})` }} />
              <div className="rank-number">{rankLabel}</div>
              <div className="avatar" style={{ borderColor: `var(--rank-${rankLabel})` }}>
                {intern.avatar}
              </div>
              <h3 className="name">{intern.name}</h3>
              <p className="role">{intern.role}</p>
              <div className="points">
                {intern.pts.toLocaleString()}
                <span>PTS</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="table-container">
        {sortedInterns.map((intern, idx) => (
          <div
            key={intern.id}
            className="row"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="row-rank">
              #{idx + 1}
            </div>
            <div className="row-intern">
              <div className="row-avatar">{intern.avatar}</div>
              <div className="row-details">
                <div className="row-name">
                  {intern.name}
                  {intern.badge && (
                    <span className="badge">{intern.badge}</span>
                  )}
                </div>
                <div className="row-role">{intern.role}</div>
              </div>
            </div>
            <div className="row-points">
              {intern.pts.toLocaleString()}
            </div>
          </div>
        ))}

        {interns.length === 0 && (
          <div className="text-center py-20 opacity-30 font-mono tracking-widest text-xs uppercase">
            Awaiting performance data logs...
          </div>
        )}
      </section>
    </div>
  );
}
