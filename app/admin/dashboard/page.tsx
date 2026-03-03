import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminStats } from "@/lib/mockAdmin";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">System overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((s) => (
          <Card
            key={s.label}
            className="rounded-xl border-white/10 bg-white/5 backdrop-blur"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              {s.value}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}