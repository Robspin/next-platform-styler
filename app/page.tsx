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
import { PeriodSelect } from "@/components/dashboard/period-select";
import { TheftTrendChart } from "@/components/dashboard/theft-trend-chart";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { CURRENT_USER, KPIS } from "@/lib/dashboard-data";

export default function DashboardPage() {
  return (
    <SidebarProvider
      className="flex-col"
      style={{ "--header-height": "4rem" } as React.CSSProperties}
    >
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="mx-auto grid w-full max-w-7xl gap-4 p-4 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="grid gap-1">
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                  Welkom terug, {CURRENT_USER.firstName}{" "}
                  <span role="img" aria-label="zwaaiende hand">
                    👋
                  </span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Hieronder vind je een overzicht van alle belangrijke inzichten
                  en acties.
                </p>
              </div>
              <PeriodSelect />
            </div>

            <section
              aria-label="Kerncijfers"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {KPIS.map((kpi) => (
                <KpiCard key={kpi.id} kpi={kpi} />
              ))}
            </section>

            <section
              aria-label="Modules"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <ModuleCard
                id="investigations"
                icon="investigations"
                title="Investigations"
                description="Onderzoek en bekijk alle lopende en afgeronde investigaties."
                linkLabel="Bekijk alle"
              >
                <InvestigationsChart />
              </ModuleCard>
              <ModuleCard
                id="theft-analytics"
                icon="theftAnalytics"
                title="Theft Analytics"
                description="Analyseer diefstaltrends, successen en prestaties op detailniveau."
                linkLabel="Bekijk analytics"
              >
                <TheftTrendChart />
              </ModuleCard>
              <ModuleCard
                id="theft-cases"
                icon="theftCases"
                title="Theft Cases"
                description="Beheer diefstalcases, verzekering en status overzicht."
                linkLabel="Bekijk cases"
              >
                <CaseStatusChart />
              </ModuleCard>
              <ModuleCard
                id="heatmaps"
                icon="heatmaps"
                title="Heatmaps"
                description="Bekijk diefstallocaties op de kaart en identificeer hotspots."
                linkLabel="Open heatmap"
              >
                <HeatmapPreview />
              </ModuleCard>
              <ModuleCard
                id="historical-waypoints"
                icon="waypoints"
                title="Historical Waypoints"
                description="Bekijk historische bewegingen en routegegevens voor een case."
                linkLabel="Bekijk waypoints"
              >
                <WaypointsPreview />
              </ModuleCard>
              <ModuleCard
                id="frame-check"
                icon="frameCheck"
                title="Frame Check"
                description="Controleer framenummers en check op registraties in externe databases."
                linkLabel="Bekijk resultaten"
              >
                <FrameCheckForm />
              </ModuleCard>
              <ModuleCard
                id="intake"
                icon="intake"
                title="Intake"
                description="Registreer nieuwe cases en voer intake gegevens in via verschillende bronnen."
                linkLabel="Nieuwe intake"
              />
              <ModuleCard
                id="recovery-operations"
                icon="recoveryOperations"
                title="Recovery Operations"
                description="Beheer recovery teams, opdrachten en opsporingsactiviteiten."
                linkLabel="Open operaties"
              />
              <ModuleCard
                id="intelligence"
                icon="intelligence"
                title="Intelligence"
                description="Scrape externe bronnen en monitor online marktplaatsen voor relevante data."
                linkLabel="Open intelligence"
                linkIcon="externalLink"
              />
              <ModuleCard
                id="integrations"
                icon="integrations"
                title="Integrations"
                description="Beheer koppelingen met hardware providers, partners en data bronnen."
                linkLabel="Bekijken"
              />
              <ModuleCard
                id="reporting"
                icon="reporting"
                title="Reporting"
                description="Genereer rapportages en exporteer inzichten voor verzekeraars en partners."
                linkLabel="Open rapportages"
              />
              <ModuleCard
                id="administration"
                icon="administration"
                title="Administration"
                description="Beheer gebruikers, rollen, rechten en instellingen van het platform."
                linkLabel="Open administratie"
              />
            </section>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
