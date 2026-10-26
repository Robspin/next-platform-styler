"use client";

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type * as React from "react";

import * as hugeicons from "@/components/icons/hugeicons";
import * as lucide from "@/components/icons/lucide";
import * as phosphor from "@/components/icons/phosphor";
import * as remixicon from "@/components/icons/remixicon";
import * as tabler from "@/components/icons/tabler";
import type { IconLibraryName } from "@/lib/design-system/config";
import { useEffectiveConfig } from "@/lib/design-system/store";

type SvgIcon = React.ComponentType<React.ComponentProps<"svg">>;

const COMPONENT_LIBRARIES = {
  lucide: lucide as Record<string, unknown> as Record<string, SvgIcon>,
  tabler: tabler as Record<string, unknown> as Record<string, SvgIcon>,
  phosphor: phosphor as Record<string, unknown> as Record<string, SvgIcon>,
  remixicon: remixicon as Record<string, unknown> as Record<string, SvgIcon>,
};

const HUGEICONS = hugeicons as Record<string, IconSvgElement>;

export function IconPlaceholder({
  lucide,
  tabler,
  hugeicons,
  phosphor,
  remixicon,
  library,
  ...props
}: Record<IconLibraryName, string> &
  React.ComponentProps<"svg"> & { library?: IconLibraryName }) {
  const config = useEffectiveConfig();
  const iconLibrary = library ?? config.iconLibrary;
  const names = { lucide, tabler, hugeicons, phosphor, remixicon };
  const name = names[iconLibrary];

  if (iconLibrary === "hugeicons") {
    const icon = HUGEICONS[name];
    const { strokeWidth = 2, ...rest } = props;
    return icon ? (
      <HugeiconsIcon
        icon={icon}
        strokeWidth={Number(strokeWidth)}
        aria-hidden
        {...rest}
      />
    ) : null;
  }

  const Icon = COMPONENT_LIBRARIES[iconLibrary][name];
  return Icon ? <Icon aria-hidden {...props} /> : null;
}
