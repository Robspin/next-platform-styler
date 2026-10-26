import { AppIcon } from "@/components/app-icon";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Kpi, numberFormat } from "@/lib/dashboard-data";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <Card>
      <CardContent className="grid gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {kpi.label}
            </h2>
            <p className="font-heading text-3xl font-semibold tabular-nums">
              {numberFormat.format(kpi.value)}
            </p>
          </div>
          <AppIcon name={kpi.icon} className="size-6 text-muted-foreground" />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-0.5 font-medium text-primary-text">
            <AppIcon name="trendUp" className="size-3.5" />
            {kpi.change}%
          </span>
          vs. vorige maand
        </p>
        <Progress
          value={kpi.progress}
          aria-label={`${kpi.label}: ${kpi.progress}% van het maanddoel`}
        />
      </CardContent>
    </Card>
  );
}
