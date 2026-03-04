import Link from "next/link";
import { Bot, Workflow, Brain, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; import { FuturisticBackground } from "@/components/FuturisticBackground";

const services = [
  { title: "AI Chatbots", desc: "Customer support and lead capture that runs 24/7.", icon: Bot },
  { title: "Workflow Automation (n8n)", desc: "Automate ops across tools without hiring more people.", icon: Workflow },
  { title: "AI Agents", desc: "Agents that research, summarize, and execute tasks.", icon: Brain },
  { title: "Custom AI Tools", desc: "Internal tools tailored to your team's workflow.", icon: Wrench },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <FuturisticBackground className="py-20 sm:py-24 border-b border-white/5">
        <section className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-2xl animate-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Now Global
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-white drop-shadow-2xl leading-[1.1]">
              AI Automation for <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Growing Businesses</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 sm:text-xl drop-shadow-md leading-relaxed font-medium">
              We build chatbots, AI agents, and workflow automations that scale startups and agencies with surgical precision.
            </p>

            <div className="mt-10 flex items-center gap-6 relative z-20 pointer-events-auto">
              <Button asChild size="lg" className="rounded-2xl shadow-2xl shadow-indigo-500/20 bg-indigo-500 hover:bg-indigo-600 font-bold px-8">
                <Link href="/book">Schedule a Sync</Link>
              </Button>
              <Link
                href="/login"
                className="text-sm font-bold text-white/50 hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-white/40"
              >
                Intern Access
              </Link>
            </div>
          </div>
        </section>
      </FuturisticBackground>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Services</h2>
          <p className="text-sm text-muted-foreground">
            Minimal, production-ready solutions — built fast and clean.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Card
              key={s.title}
              className="rounded-xl border-white/10 bg-white/5 backdrop-blur"
            >
              <CardHeader>
                <s.icon className="mb-2 h-8 w-8 text-violet-400" />
                <CardTitle className="text-base">{s.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {s.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <h3 className="text-2xl font-semibold">
            Ready to automate your operations?
          </h3>
          <div className="mt-6">
            <Button asChild className="rounded-xl">
              <Link href="/book">Request Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}