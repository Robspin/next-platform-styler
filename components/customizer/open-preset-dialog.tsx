"use client";

import * as React from "react";

import { decodeConfig, parsePresetInput } from "@/lib/design-system/config";
import { setConfig } from "@/lib/design-system/store";

import { CustomizerButton, CustomizerDialog } from "./primitives";

export function OpenPresetDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [error, setError] = React.useState<string | null>(null);
  const errorId = React.useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = String(new FormData(event.currentTarget).get("preset") ?? "");
    const code = parsePresetInput(input);
    const config = code && decodeConfig(code);

    if (!config) {
      setError("That doesn't look like a valid preset code.");
      return;
    }

    setConfig(config);
    setError(null);
    onOpenChange(false);
  }

  return (
    <CustomizerDialog
      open={open}
      onOpenChange={(next) => {
        setError(null);
        onOpenChange(next);
      }}
      title="Open preset"
      description="Paste a preset code, a --preset flag, a shadcn command or a share link."
    >
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="preset"
          aria-label="Preset"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          placeholder="b1YobvhKq"
          autoComplete="off"
          spellCheck={false}
          className="h-9 rounded-lg border bg-transparent px-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        />
        {error && (
          <p id={errorId} className="text-xs text-destructive">
            {error}
          </p>
        )}
        <CustomizerButton
          type="submit"
          variant="default"
          className="justify-self-end"
        >
          Open preset
        </CustomizerButton>
      </form>
    </CustomizerDialog>
  );
}
