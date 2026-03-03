import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tasks } from "@/lib/mockIntern";
import { SubmitWorkModal } from "@/components/modals/SubmitWorkModal";

function statusVariant(status: string) {
  if (status === "Approved") return "default";
  if (status === "Rejected") return "destructive";
  return "secondary";
}

export default function TasksPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">Submit work and track status.</p>
      </div>

      <div className="grid gap-3">
        {tasks.map((t) => (
          <Card key={t.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">{t.title}</CardTitle>
                <div className="mt-1 text-sm text-muted-foreground">{t.description}</div>
              </div>

              <Badge variant={statusVariant(t.status)} className="rounded-xl">
                {t.status}
              </Badge>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Deadline: {t.deadline}</div>
              <SubmitWorkModal taskTitle={t.title} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}