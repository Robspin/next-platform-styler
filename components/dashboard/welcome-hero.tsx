"use client";

import { cn } from "cn";

import { PeriodSelect } from "@/components/dashboard/period-select";
import { ScrambleText } from "@/components/dashboard/scramble-text";
import { MagicBentoCard } from "@/components/effects/magic-bento";
import { Radar } from "@/components/effects/radar";
import { TextType } from "@/components/effects/text-type";
import { CardContent } from "@/components/ui/card";
import { useCssVariable } from "@/hooks/use-css-variable";
import { CURRENT_USER, NOTIFICATIONS } from "@/lib/dashboard-data";
import { useMode } from "@/lib/design-system/store";

const RADAR_CONTACTS = 7;

const ACTIVITY_FEED = NOTIFICATIONS.map((notification) => notification.title);

export function WelcomeHero({ className }: { className?: string }) {
  const primary = useCssVariable("--primary");
  const mode = useMode();

  return (
    <MagicBentoCard
      className={cn("@container/hero min-h-80 justify-center", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-35 @xl/hero:w-3/5 @xl/hero:opacity-100"
      >
        {primary && (
          <Radar
            color={primary}
            lightMode={mode === "light"}
            scale={0.9}
            fade={0.3}
            targets={RADAR_CONTACTS}
            clutter={0.3}
          />
        )}
      </div>

      <CardContent className="grid max-w-lg gap-4">
        <p className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-primary-text uppercase">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Operator online · {CURRENT_USER.name}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight @xl/hero:text-5xl">
          <ScrambleText text={`Welkom terug, ${CURRENT_USER.firstName}`} />
        </h1>
        <TextType
          as="p"
          text={ACTIVITY_FEED}
          prefix="> "
          cursorStyle="block"
          initialDelay={1200}
          typingSpeed={70}
          variableSpeed={{ min: 45, max: 120 }}
          deletingSpeed={25}
          pauseDuration={2600}
          className="min-h-5 font-mono text-sm text-primary-text"
        />
        <p className="text-sm text-muted-foreground">
          Hieronder vind je een overzicht van alle belangrijke inzichten en
          acties.
        </p>
        <div>
          <PeriodSelect />
        </div>
      </CardContent>

      <div
        aria-hidden
        className="pointer-events-none absolute right-4 bottom-3 hidden text-right font-mono text-[0.625rem] leading-relaxed tracking-[0.2em] text-muted-foreground uppercase @xl/hero:block"
      >
        <p>Sector NL-AMS · {RADAR_CONTACTS} signalen</p>
        <p>52.3676° N · 4.9041° E</p>
      </div>
    </MagicBentoCard>
  );
}
