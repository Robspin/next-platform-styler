import { useId } from "react";

import { HOTSPOTS, WAYPOINTS } from "@/lib/dashboard-data";

const STREETS = [
  "M0 18 L60 26 L118 14 L190 30 L260 12 L340 28 L400 20",
  "M0 64 L48 58 L96 72 L170 60 L236 76 L300 58 L400 70",
  "M0 102 L70 96 L140 108 L210 94 L280 110 L400 98",
  "M30 0 L42 40 L34 80 L46 120",
  "M104 0 L96 36 L112 70 L100 120",
  "M176 0 L186 44 L172 84 L182 120",
  "M252 0 L244 30 L260 66 L248 120",
  "M326 0 L336 42 L322 90 L332 120",
  "M0 40 L80 46 L150 38",
  "M210 44 L290 36 L400 46",
  "M60 120 L130 84 L210 70 L300 90 L380 120",
  "M120 0 L160 30 L230 22 L300 0",
];

function MapBackdrop() {
  return (
    <g className="stroke-muted-foreground/25" fill="none" strokeWidth={1.25}>
      {STREETS.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

export function HeatmapPreview() {
  const id = useId();

  return (
    <svg
      viewBox="0 0 400 120"
      role="img"
      aria-label="Heatmap met drie diefstal-hotspots"
      className="h-24 w-full overflow-hidden rounded-md bg-muted/50"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-heat`}>
          <stop offset="0%" stopColor="var(--chart-1)" />
          <stop offset="30%" stopColor="var(--chart-2)" />
          <stop offset="60%" stopColor="var(--chart-4)" stopOpacity={0.6} />
          <stop offset="100%" stopColor="var(--chart-5)" stopOpacity={0} />
        </radialGradient>
      </defs>
      <MapBackdrop />
      {HOTSPOTS.map((spot) => (
        <circle
          key={`${spot.x}-${spot.y}`}
          cx={spot.x}
          cy={spot.y}
          r={spot.radius}
          fill={`url(#${id}-heat)`}
          opacity={spot.intensity}
        />
      ))}
    </svg>
  );
}

export function WaypointsPreview() {
  const route = WAYPOINTS.map(
    (point, index) =>
      `${index === 0 ? "M" : "L"}${point.x * 2.9 + 8} ${point.y + 6}`,
  ).join(" ");

  return (
    <svg
      viewBox="0 0 400 120"
      role="img"
      aria-label={`Route met ${WAYPOINTS.length} waypoints`}
      className="h-24 w-full overflow-hidden rounded-md bg-muted/50"
      preserveAspectRatio="xMidYMid slice"
    >
      <MapBackdrop />
      <path
        d={route}
        fill="none"
        stroke="var(--chart-2)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {WAYPOINTS.map((point) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x * 2.9 + 8}
          cy={point.y + 6}
          r={4}
          fill="var(--card)"
          stroke="var(--chart-2)"
          strokeWidth={2.5}
        />
      ))}
    </svg>
  );
}
