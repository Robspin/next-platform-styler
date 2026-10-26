"use client";

import * as React from "react";
import type { PresetBase } from "shadcn/preset";

import { BASES, buildThemeCss, encodeConfig } from "@/lib/design-system/config";
import { useDesignSystem } from "@/lib/design-system/store";

import { CodeBlock, CustomizerDialog, Segmented } from "./primitives";

const PACKAGE_RUNNERS = {
  pnpm: "pnpm dlx",
  npm: "npx",
  yarn: "yarn dlx",
  bun: "bunx --bun",
} as const;

type PackageManager = keyof typeof PACKAGE_RUNNERS;

export function getShareUrl(code: string) {
  const url = new URL(window.location.href);
  url.hash = "";
  url.searchParams.set("preset", code);
  return url.toString();
}

export function CodeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <CustomizerDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Get code"
      description="Use the preset to set up a project with this exact theme, or copy the CSS variables into an existing globals.css."
    >
      <CodeDialogBody />
    </CustomizerDialog>
  );
}

function CodeDialogBody() {
  const { config } = useDesignSystem();
  const [base, setBase] = React.useState<PresetBase>("base");
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm");
  const code = encodeConfig(config);
  const runner = PACKAGE_RUNNERS[packageManager];

  return (
    <div className="grid gap-5">
      <section className="grid gap-2">
        <h3 className="font-medium">Preset</h3>
        <CodeBlock code={code} label="preset code" />
      </section>

      <section className="grid gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium">CLI</h3>
          <div className="flex flex-wrap gap-2">
            <Segmented
              label="Component library"
              value={base}
              onValueChange={setBase}
              options={BASES.map((option) => ({
                value: option.name,
                label: option.title,
              }))}
            />
            <Segmented
              label="Package manager"
              value={packageManager}
              onValueChange={setPackageManager}
              options={Object.keys(PACKAGE_RUNNERS).map((name) => ({
                value: name as PackageManager,
                label: name,
              }))}
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">New project</p>
        <CodeBlock
          code={`${runner} shadcn@latest init --preset ${code} --base ${base}`}
          label="init command"
        />
        <p className="text-xs text-muted-foreground">Existing shadcn project</p>
        <CodeBlock
          code={`${runner} shadcn@latest apply ${code}`}
          label="apply command"
        />
      </section>

      <section className="grid gap-2">
        <h3 className="font-medium">CSS variables</h3>
        <p className="text-xs text-muted-foreground">
          Colors and radius only. Fonts, icons and component styles come with
          the preset.
        </p>
        <CodeBlock code={buildThemeCss(config)} label="CSS" />
      </section>

      <section className="grid gap-2">
        <h3 className="font-medium">Share link</h3>
        <CodeBlock code={getShareUrl(code)} label="link" />
      </section>
    </div>
  );
}
