"use client";

import { AppIcon } from "@/components/app-icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setMode, useMode } from "@/lib/design-system/store";

export function ModeToggle() {
  const mode = useMode();
  const label =
    mode === "dark"
      ? "Schakel naar lichte modus"
      : "Schakel naar donkere modus";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          />
        }
      >
        <AppIcon name={mode === "dark" ? "moon" : "sun"} />
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}
