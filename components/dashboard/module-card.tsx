import { cn } from "cn";
import type * as React from "react";

import { AppIcon, type AppIconName } from "@/components/app-icon";
import { ScrambleText } from "@/components/dashboard/scramble-text";
import { MagicBentoCard } from "@/components/effects/magic-bento";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ModuleCard({
  id,
  icon,
  title,
  description,
  linkLabel,
  linkIcon = "chevronRight",
  className,
  children,
}: {
  id: string;
  icon: AppIconName;
  title: string;
  description: string;
  linkLabel: string;
  linkIcon?: AppIconName;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <MagicBentoCard id={id} className={cn("scroll-mt-20", className)}>
      <CardHeader className="grid-cols-[auto_1fr] gap-x-3">
        <AppIcon
          name={icon}
          className="row-span-2 mt-0.5 size-6 text-primary-text dark:drop-shadow-[0_0_10px_color-mix(in_oklab,var(--primary)_70%,transparent)]"
        />
        <CardTitle className="tracking-wide uppercase">
          <h2>
            <ScrambleText text={title} />
          </h2>
        </CardTitle>
        <CardDescription className="col-start-2">{description}</CardDescription>
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      <CardContent className="mt-auto">
        <a
          href={`#${id}`}
          className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary-text underline-offset-4 hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none [&_svg]:size-4"
        >
          {linkLabel}
          <AppIcon name={linkIcon} />
        </a>
      </CardContent>
    </MagicBentoCard>
  );
}
