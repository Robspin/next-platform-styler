import {
  buildThemeCss,
  type DesignSystemConfig,
  getDesignSystemClassName,
  getFontFamily,
} from "./config";

export const APPLIED_STORAGE_KEY = "design-system:applied";
export const MODE_STORAGE_KEY = "mode";

export type Mode = "light" | "dark";

export const DEFAULT_MODE: Mode = "dark";

export type AppliedDesignSystem = {
  className: string;
  css: string;
};

export function buildRuntimeCss(config: DesignSystemConfig) {
  const fontHeading =
    config.fontHeading === "inherit"
      ? "var(--font-sans)"
      : getFontFamily(config.fontHeading);

  return `:root {\n  --font-sans: ${getFontFamily(config.font)};\n  --font-heading: ${fontHeading};\n}\n\n${buildThemeCss(config)}`;
}

export function getAppliedDesignSystem(
  config: DesignSystemConfig,
): AppliedDesignSystem {
  return {
    className: getDesignSystemClassName(config),
    css: buildRuntimeCss(config),
  };
}

// Serialized into the pre-paint inline script, so it must stay self-contained.
export function applyDesignSystem(applied: AppliedDesignSystem) {
  const root = document.documentElement;
  for (const name of Array.from(root.classList)) {
    if (name.startsWith("style-") || name.startsWith("base-color-")) {
      root.classList.remove(name);
    }
  }
  for (const name of applied.className.split(" ")) {
    root.classList.add(name);
  }

  let style = document.getElementById("design-system-theme");
  if (!style) {
    style = document.createElement("style");
    style.id = "design-system-theme";
    document.head.appendChild(style);
  }
  style.textContent = applied.css;
}

export function applyMode(mode: Mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export const designSystemScript = `(function(){try{var m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)});if(m==="light"||m==="dark")document.documentElement.classList.toggle("dark",m==="dark");var a=localStorage.getItem(${JSON.stringify(APPLIED_STORAGE_KEY)});if(a)(${applyDesignSystem.toString()})(JSON.parse(a))}catch(e){}})()`;

export function withoutTransitions(update: () => void) {
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(style);
  update();
  void document.body.offsetHeight;
  requestAnimationFrame(() => style.remove());
}
