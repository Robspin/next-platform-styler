"use client";

import { Bar, BarChart, CartesianGrid } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { INVESTIGATIONS_PER_WEEK } from "@/lib/dashboard-data";

const chartConfig = {
  count: { label: "Investigaties", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function InvestigationsChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-28 w-full">
      <BarChart
        accessibilityLayer
        data={INVESTIGATIONS_PER_WEEK}
        margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
        barCategoryGap="30%"
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideIndicator />}
        />
        <Bar dataKey="count" fill="var(--color-count)" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}
