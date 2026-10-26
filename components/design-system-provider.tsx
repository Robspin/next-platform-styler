"use client";

import * as React from "react";

import type { MenuColorName } from "@/lib/design-system/config";
import {
  APPLIED_STORAGE_KEY,
  applyDesignSystem,
  applyMode,
  getAppliedDesignSystem,
  withoutTransitions,
} from "@/lib/design-system/runtime";
import {
  getUrlPreset,
  useDesignSystem,
  useEffectiveConfig,
  useMode,
} from "@/lib/design-system/store";

const subscribeNothing = () => () => {};

function useHydrated() {
  return React.useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

export function DesignSystemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useHydrated();
  const { config } = useDesignSystem();
  const effectiveConfig = useEffectiveConfig();
  const mode = useMode();

  // Skipped during hydration so the server defaults never overwrite what the inline script applied.
  React.useLayoutEffect(() => {
    if (!hydrated) return;
    withoutTransitions(() =>
      applyDesignSystem(getAppliedDesignSystem(effectiveConfig)),
    );
  }, [hydrated, effectiveConfig]);

  React.useLayoutEffect(() => {
    if (!hydrated) return;
    withoutTransitions(() => applyMode(mode));
  }, [hydrated, mode]);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        APPLIED_STORAGE_KEY,
        JSON.stringify(getAppliedDesignSystem(config)),
      );
    } catch {}
  }, [hydrated, config]);

  React.useEffect(() => {
    if (!getUrlPreset()) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("preset");
    window.history.replaceState(null, "", url);
  }, []);

  useMenuColor(effectiveConfig.menuColor);

  return children;
}

// Menus portal outside the page tree, so inversion and translucency are toggled on the popups themselves.
function useMenuColor(menuColor: MenuColorName) {
  React.useLayoutEffect(() => {
    const inverted = menuColor.startsWith("inverted");
    const translucent = menuColor.endsWith("translucent");

    const update = () => {
      for (const element of document.querySelectorAll<HTMLElement>(
        ".cn-menu-target, [data-menu-translucent]",
      )) {
        if (element.classList.contains("cn-menu-target")) {
          element.classList.toggle("dark", inverted);
        }
        if (translucent) {
          element.classList.add("cn-menu-translucent");
          element.removeAttribute("data-menu-translucent");
        } else if (element.classList.contains("cn-menu-translucent")) {
          element.classList.remove("cn-menu-translucent");
          element.setAttribute("data-menu-translucent", "");
        }
      }
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [menuColor]);
}
