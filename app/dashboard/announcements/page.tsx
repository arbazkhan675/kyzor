import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { announcements } from "@/lib/mockIntern";

export default function AnnouncementsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Announcements</h1>
        <p className="text-sm text-muted-foreground">Important updates.</p>
      </div>

      <div className="grid gap-3">
        {announcements.map((a) => (
          <Card key={a.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <CardTitle className="text-base">{a.title}</CardTitle>
              <Badge variant="secondary" className="rounded-xl">
                Expires: {a.expiry}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {a.message}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}