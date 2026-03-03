import Link from "next/link";
import { Bot, Workflow, Brain, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            AI Automation for Growing Businesses
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            We build chatbots, AI agents, and workflow automations that scale startups and agencies.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Button asChild className="rounded-xl">
              <Link href="/book">Book Free Consultation</Link>
            </Button>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Intern Login
            </Link>
          </div>
        </div>
      </section>

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