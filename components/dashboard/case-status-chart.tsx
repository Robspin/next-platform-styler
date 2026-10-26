"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CASE_STATUS, TOTAL_CASES } from "@/lib/dashboard-data";

const chartConfig = {
  share: { label: "Aandeel" },
  new: { label: "Nieuw", color: "var(--chart-1)" },
  investigating: { label: "In onderzoek", color: "var(--chart-2)" },
  found: { label: "Gevonden", color: "var(--chart-3)" },
  closed: { label: "Gesloten", color: "var(--chart-4)" },
} satisfies ChartConfig;

const data = CASE_STATUS.map((item) => ({
  ...item,
  fill: `var(--color-${item.status})`,
}));

export function CaseStatusChart() {
  return (
    <div className="flex items-center gap-6">
      <ChartContainer
        config={chartConfig}
        className="aspect-square h-28 shrink-0"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent nameKey="status" hideLabel />}
          />
          <Pie
            data={data}
            dataKey="share"
            nameKey="status"
            innerRadius="68%"
            outerRadius="100%"
            strokeWidth={2}
            stroke="var(--card)"
            startAngle={90}
            endAngle={-270}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null;
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground font-heading text-2xl font-semibold"
                    >
                      {TOTAL_CASES}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy ?? 0) + 18}
                      className="fill-muted-foreground text-xs"
                    >
                      Totaal
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <ul className="grid flex-1 gap-2 text-sm">
        {CASE_STATUS.map((item) => (
          <li key={item.status} className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: chartConfig[item.status].color }}
            />
            <span className="text-muted-foreground">{item.label}</span>
            <span className="ml-auto font-medium tabular-nums">
              {item.share}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
