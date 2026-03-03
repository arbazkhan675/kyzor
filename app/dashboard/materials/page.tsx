import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { materials } from "@/lib/mockIntern";

export default function MaterialsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-xl font-semibold">Training Materials</h1>
        <p className="text-sm text-muted-foreground">Resources for onboarding.</p>
      </div>

      <div className="grid gap-3">
        {materials.map((m) => (
          <Card key={m.id} className="rounded-xl border-white/10 bg-white/5 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5">
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}