import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { internStats, tasks } from "@/lib/mockIntern";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your work.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {internStats.map((s) => (
          <Card key={s.label} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{s.value}</CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4">
        <h2 className="text-sm font-semibold text-muted-foreground">Recent Tasks</h2>
        <div className="grid gap-3">
          {tasks.slice(0, 3).map((t) => (
            <Card key={t.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t.description}
                <div className="mt-2 text-xs">Deadline: {t.deadline}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}