"use client";

import { cn } from "cn";
import {
  CodeIcon,
  FolderOpenIcon,
  Link2Icon,
  MoonIcon,
  PaletteIcon,
  Redo2Icon,
  RotateCcwIcon,
  ShuffleIcon,
  SunIcon,
  Undo2Icon,
  XIcon,
} from "lucide-react";
import * as React from "react";

import { DEFAULT_CONFIG, encodeConfig } from "@/lib/design-system/config";
import { randomConfig } from "@/lib/design-system/random";
import {
  redo,
  setConfig,
  setMode,
  undo,
  useDesignSystem,
  useMode,
} from "@/lib/design-system/store";

import { CodeDialog, getShareUrl } from "./code-dialog";
import { DesignSystemPickers } from "./design-system-pickers";
import { OpenPresetDialog } from "./open-preset-dialog";
import { CustomizerButton, Hint, useCopy } from "./primitives";

export function ThemeCustomizer() {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z")
        return;
      event.preventDefault();
      if (event.shiftKey) redo();
      else undo();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="customizer">
      {open && <CustomizerPanel id={panelId} onClose={() => setOpen(false)} />}
      <Hint label={open ? "Close customizer" : "Customize theme"} side="left">
        <button
          type="button"
          aria-label={open ? "Close theme customizer" : "Open theme customizer"}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          onClick={() => setOpen((value) => !value)}
          className="fixed right-4 bottom-4 z-60 flex size-12 items-center justify-center rounded-full border bg-background text-foreground shadow-xl transition-transform outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95"
        >
          {open ? (
            <XIcon className="size-5" />
          ) : (
            <PaletteIcon className="size-5" />
          )}
        </button>
      </Hint>
    </div>
  );
}

function CustomizerPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const { config, past, future } = useDesignSystem();
  const mode = useMode();
  const [dialog, setDialog] = React.useState<"code" | "open" | null>(null);
  const presetCode = encodeConfig(config);
  const preset = useCopy();
  const link = useCopy();

  return (
    <section
      id={id}
      aria-label="Theme customizer"
      className={cn(
        "fixed inset-x-2 bottom-20 z-60 flex max-h-[min(36rem,calc(100svh-6rem))] flex-col rounded-2xl border bg-background/90 shadow-2xl backdrop-blur-xl",
        "sm:inset-x-auto sm:top-4 sm:right-4 sm:max-h-none sm:w-72",
        "animate-in duration-150 fade-in-0 slide-in-from-bottom-2",
      )}
    >
      <header className="flex items-center gap-1 border-b py-2 pr-2 pl-4">
        <h2 className="mr-auto font-semibold">Customize</h2>
        <Hint label="Undo (⌘Z)">
          <CustomizerButton
            variant="ghost"
            size="icon-sm"
            aria-label="Undo"
            disabled={past.length === 0}
            onClick={undo}
          >
            <Undo2Icon />
          </CustomizerButton>
        </Hint>
        <Hint label="Redo (⇧⌘Z)">
          <CustomizerButton
            variant="ghost"
            size="icon-sm"
            aria-label="Redo"
            disabled={future.length === 0}
            onClick={redo}
          >
            <Redo2Icon />
          </CustomizerButton>
        </Hint>
        <Hint label={mode === "dark" ? "Light mode" : "Dark mode"}>
          <CustomizerButton
            variant="ghost"
            size="icon-sm"
            aria-label={
              mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? <SunIcon /> : <MoonIcon />}
          </CustomizerButton>
        </Hint>
        <Hint label="Close">
          <CustomizerButton
            variant="ghost"
            size="icon-sm"
            aria-label="Close customizer"
            onClick={onClose}
          >
            <XIcon />
          </CustomizerButton>
        </Hint>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5">
        <DesignSystemPickers />
      </div>

      <footer className="grid gap-2 border-t p-3">
        <Hint label={preset.copied ? "Copied" : "Copy preset flag"}>
          <CustomizerButton
            className="w-full justify-start font-mono text-xs"
            onClick={() => preset.copy(`--preset ${presetCode}`)}
          >
            <span className="truncate">
              {preset.copied ? "Copied!" : `--preset ${presetCode}`}
            </span>
          </CustomizerButton>
        </Hint>
        <CustomizerButton
          variant="default"
          className="w-full"
          onClick={() => setDialog("code")}
        >
          <CodeIcon />
          Get code
        </CustomizerButton>
        <div className="grid grid-cols-4 gap-2">
          <Hint label="Open preset">
            <CustomizerButton
              aria-label="Open preset"
              onClick={() => setDialog("open")}
            >
              <FolderOpenIcon />
            </CustomizerButton>
          </Hint>
          <Hint label={link.copied ? "Link copied" : "Copy share link"}>
            <CustomizerButton
              aria-label="Copy share link"
              onClick={() => link.copy(getShareUrl(presetCode))}
            >
              <Link2Icon />
            </CustomizerButton>
          </Hint>
          <Hint label="Randomize">
            <CustomizerButton
              aria-label="Randomize"
              onClick={() => setConfig(randomConfig())}
            >
              <ShuffleIcon />
            </CustomizerButton>
          </Hint>
          <Hint label="Reset to default">
            <CustomizerButton
              aria-label="Reset to default"
              onClick={() => setConfig(DEFAULT_CONFIG)}
            >
              <RotateCcwIcon />
            </CustomizerButton>
          </Hint>
        </div>
      </footer>

      <CodeDialog
        open={dialog === "code"}
        onOpenChange={(next) => setDialog(next ? "code" : null)}
      />
      <OpenPresetDialog
        open={dialog === "open"}
        onOpenChange={(next) => setDialog(next ? "open" : null)}
      />
    </section>
  );
}
