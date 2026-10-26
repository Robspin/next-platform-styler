import type { AppIconName } from "@/components/app-icon";

export type NavItem = {
  id: string;
  title: string;
  icon: AppIconName;
};

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", title: "Dashboard", icon: "dashboard" },
  { id: "investigations", title: "Investigations", icon: "investigations" },
  { id: "theft-cases", title: "Theft Cases", icon: "theftCases" },
  { id: "theft-analytics", title: "Theft Analytics", icon: "theftAnalytics" },
  { id: "heatmaps", title: "Heatmaps", icon: "heatmaps" },
  {
    id: "historical-waypoints",
    title: "Historical Waypoints",
    icon: "waypoints",
  },
  { id: "frame-check", title: "Frame Check", icon: "frameCheck" },
  { id: "intake", title: "Intake", icon: "intake" },
  {
    id: "recovery-operations",
    title: "Recovery Operations",
    icon: "recoveryOperations",
  },
  { id: "intelligence", title: "Intelligence", icon: "intelligence" },
  { id: "integrations", title: "Integrations", icon: "integrations" },
  { id: "reporting", title: "Reporting", icon: "reporting" },
  { id: "administration", title: "Administration", icon: "administration" },
];

export const CURRENT_USER = {
  firstName: "Niels",
  name: "Niels Penning",
  initials: "NP",
  role: "Manager",
  email: "niels.penning@example.com",
};

export const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Nieuwe match op marktplaats",
    description: "Framenummer WTU2938471 gevonden op een advertentie.",
    time: "5 min geleden",
  },
  {
    id: "n2",
    title: "Case #4821 bijgewerkt",
    description: "Status gewijzigd naar ‘Gevonden’.",
    time: "1 uur geleden",
  },
  {
    id: "n3",
    title: "Rapportage klaar",
    description: "Maandrapportage april staat klaar om te downloaden.",
    time: "Gisteren",
  },
];

export const PERIODS = [
  { value: "2026-05", label: "Mei 2026" },
  { value: "2026-04", label: "April 2026" },
  { value: "2026-03", label: "Maart 2026" },
  { value: "2026-02", label: "Februari 2026" },
  { value: "2026-01", label: "Januari 2026" },
  { value: "2025-12", label: "December 2025" },
];

export type Kpi = {
  id: string;
  label: string;
  value: number;
  change: number;
  progress: number;
  icon: AppIconName;
};

export const KPIS: Kpi[] = [
  {
    id: "consumers",
    label: "Consumenten",
    value: 4540,
    change: 11,
    progress: 68,
    icon: "consumers",
  },
  {
    id: "entities",
    label: "Entiteiten",
    value: 4784,
    change: 11,
    progress: 68,
    icon: "entities",
  },
  {
    id: "investigations",
    label: "Investigaties",
    value: 111,
    change: 9,
    progress: 64,
    icon: "investigationsTotal",
  },
];

export const INVESTIGATIONS_PER_WEEK = [
  14, 22, 9, 30, 12, 26, 18, 9, 40, 21, 34, 15, 28, 11, 31, 19, 9, 23, 35, 12,
  48, 27, 36, 19, 41, 20,
].map((count, index) => ({ week: `W${index + 1}`, count }));

export const THEFT_TREND = [
  { month: "Jun", thefts: 32 },
  { month: "Jul", thefts: 24 },
  { month: "Aug", thefts: 28 },
  { month: "Sep", thefts: 19 },
  { month: "Okt", thefts: 24 },
  { month: "Nov", thefts: 33 },
  { month: "Dec", thefts: 44 },
  { month: "Jan", thefts: 29 },
  { month: "Feb", thefts: 37 },
  { month: "Mrt", thefts: 43 },
  { month: "Apr", thefts: 27 },
  { month: "Mei", thefts: 30 },
  { month: "Jun", thefts: 41 },
  { month: "Jul", thefts: 34 },
];

export const CASE_STATUS = [
  { status: "new", label: "Nieuw", share: 23 },
  { status: "investigating", label: "In onderzoek", share: 45 },
  { status: "found", label: "Gevonden", share: 21 },
  { status: "closed", label: "Gesloten", share: 11 },
] as const;

export const TOTAL_CASES = 111;

export const WAYPOINTS = [
  { x: 6, y: 86 },
  { x: 22, y: 64 },
  { x: 36, y: 60 },
  { x: 52, y: 38 },
  { x: 66, y: 44 },
  { x: 80, y: 66 },
  { x: 96, y: 46 },
  { x: 112, y: 52 },
  { x: 128, y: 72 },
];

export const HOTSPOTS = [
  { x: 120, y: 48, radius: 34, intensity: 0.75 },
  { x: 232, y: 30, radius: 44, intensity: 1 },
  { x: 300, y: 70, radius: 22, intensity: 0.45 },
];

export const numberFormat = new Intl.NumberFormat("nl-NL");
