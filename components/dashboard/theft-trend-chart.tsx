"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { THEFT_TREND } from "@/lib/dashboard-data";

const chartConfig = {
  thefts: { label: "Diefstallen", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function TheftTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-28 w-full">
      <LineChart
        accessibilityLayer
        data={THEFT_TREND}
        margin={{ top: 8, right: 6, bottom: 0, left: 6 }}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray="3 3"
          verticalCoordinatesGenerator={({ width }) =>
            [0.25, 0.5, 0.75].map((ratio) => width * ratio)
          }
        />
        <XAxis dataKey="month" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="thefts"
          type="natural"
          stroke="var(--color-thefts)"
          strokeWidth={2}
          dot={{ r: 3, fill: "var(--card)", strokeWidth: 2 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
