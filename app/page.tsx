import type * as React from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { CaseStatusChart } from "@/components/dashboard/case-status-chart";
import { FrameCheckForm } from "@/components/dashboard/frame-check-form";
import { InvestigationsChart } from "@/components/dashboard/investigations-chart";
import { KpiCard } from "@/components/dashboard/kpi-card";
import {
  HeatmapPreview,
  WaypointsPreview,
} from "@/components/dashboard/map-previews";
import { ModuleCard } from "@/components/dashboard/module-card";
import { TheftTrendChart } from "@/components/dashboard/theft-trend-chart";
import { WelcomeHero } from "@/components/dashboard/welcome-hero";
import { MagicBento } from "@/components/effects/magic-bento";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { KPIS } from "@/lib/dashboard-data";

const WIDE = "@2xl:col-span-3 @5xl:col-span-6";
const NARROW = "@2xl:col-span-3";

const BACKDROP_STYLE: React.CSSProperties = {
  backgroundImage: [
    "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent)",
    "linear-gradient(to right, var(--border) 1px, transparent 1px)",
    "linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize: "100% 100%, 48px 48px, 48px 48px",
  maskImage:
    "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent)",
};

export default function DashboardPage() {
  return (
    <SidebarProvider
      className="flex-col"
      style={{ "--header-height": "4rem" } as React.CSSProperties}
    >
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset className="isolate">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem]"
            style={BACKDROP_STYLE}
          />
          <div className="@container mx-auto w-full max-w-7xl p-4 md:p-6">
            <MagicBento className="grid grid-flow-row-dense gap-4 @2xl:grid-cols-6 @5xl:grid-cols-12">
              <WelcomeHero className="@2xl:col-span-6 @5xl:col-span-9 @5xl:row-span-3" />

              {KPIS.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  kpi={kpi}
                  className="@2xl:col-span-2 @5xl:col-span-3"
                />
              ))}

              <ModuleCard
                id="investigations"
                icon="investigations"
                title="Investigations"
                description="Onderzoek en bekijk alle lopende en afgeronde investigaties."
                linkLabel="Bekijk alle"
                className={WIDE}
              >
                <InvestigationsChart />
              </ModuleCard>
              <ModuleCard
                id="theft-analytics"
                icon="theftAnalytics"
                title="Theft Analytics"
                description="Analyseer diefstaltrends, successen en prestaties op detailniveau."
                linkLabel="Bekijk analytics"
                className={WIDE}
              >
                <TheftTrendChart />
              </ModuleCard>
              <ModuleCard
                id="theft-cases"
                icon="theftCases"
                title="Theft Cases"
                description="Beheer diefstalcases, verzekering en status overzicht."
                linkLabel="Bekijk cases"
                className={WIDE}
              >
                <CaseStatusChart />
              </ModuleCard>
              <ModuleCard
                id="heatmaps"
                icon="heatmaps"
                title="Heatmaps"
                description="Bekijk diefstallocaties op de kaart en identificeer hotspots."
                linkLabel="Open heatmap"
                className={NARROW}
              >
                <HeatmapPreview />
              </ModuleCard>
              <ModuleCard
                id="historical-waypoints"
                icon="waypoints"
                title="Historical Waypoints"
                description="Bekijk historische bewegingen en routegegevens voor een case."
                linkLabel="Bekijk waypoints"
                className={NARROW}
              >
                <WaypointsPreview />
              </ModuleCard>
              <ModuleCard
                id="frame-check"
                icon="frameCheck"
                title="Frame Check"
                description="Controleer framenummers en check op registraties in externe databases."
                linkLabel="Bekijk resultaten"
                className={WIDE}
              >
                <FrameCheckForm />
              </ModuleCard>
              <ModuleCard
                id="intake"
                icon="intake"
                title="Intake"
                description="Registreer nieuwe cases en voer intake gegevens in via verschillende bronnen."
                linkLabel="Nieuwe intake"
                className={NARROW}
              />
              <ModuleCard
                id="recovery-operations"
                icon="recoveryOperations"
                title="Recovery Operations"
                description="Beheer recovery teams, opdrachten en opsporingsactiviteiten."
                linkLabel="Open operaties"
                className={NARROW}
              />
              <ModuleCard
                id="intelligence"
                icon="intelligence"
                title="Intelligence"
                description="Scrape externe bronnen en monitor online marktplaatsen voor relevante data."
                linkLabel="Open intelligence"
                linkIcon="externalLink"
                className={NARROW}
              />
              <ModuleCard
                id="integrations"
                icon="integrations"
                title="Integrations"
                description="Beheer koppelingen met hardware providers, partners en data bronnen."
                linkLabel="Bekijken"
                className={NARROW}
              />
              <ModuleCard
                id="reporting"
                icon="reporting"
                title="Reporting"
                description="Genereer rapportages en exporteer inzichten voor verzekeraars en partners."
                linkLabel="Open rapportages"
                className={NARROW}
              />
              <ModuleCard
                id="administration"
                icon="administration"
                title="Administration"
                description="Beheer gebruikers, rollen, rechten en instellingen van het platform."
                linkLabel="Open administratie"
                className={NARROW}
              />
            </MagicBento>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
