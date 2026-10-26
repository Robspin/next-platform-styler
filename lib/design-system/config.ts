import {
  decodePreset,
  encodePreset,
  isPresetCode,
  type PresetBase,
  type PresetConfig,
} from "shadcn/preset";

import { THEMES, type Theme, type ThemeVars } from "./themes";

export type DesignSystemConfig = Required<PresetConfig>;

export type StyleName = DesignSystemConfig["style"];
export type IconLibraryName = DesignSystemConfig["iconLibrary"];
export type FontName = DesignSystemConfig["font"];
export type RadiusName = DesignSystemConfig["radius"];
export type MenuColorName = DesignSystemConfig["menuColor"];
export type MenuAccentName = DesignSystemConfig["menuAccent"];

export const DEFAULT_CONFIG: DesignSystemConfig = {
  style: "nova",
  baseColor: "mist",
  theme: "blue",
  chartColor: "blue",
  iconLibrary: "lucide",
  font: "geist",
  fontHeading: "inherit",
  radius: "default",
  menuAccent: "subtle",
  menuColor: "default",
};

export const STYLES: {
  name: StyleName;
  title: string;
  description: string;
  shape: string;
}[] = [
  {
    name: "vega",
    title: "Vega",
    description: "Clean, neutral, and familiar",
    shape:
      "M2.5 12C2.5 7.52 2.5 5.28 3.89 3.89 5.28 2.5 7.52 2.5 12 2.5s6.72 0 8.11 1.39C21.5 5.28 21.5 7.52 21.5 12s0 6.72-1.39 8.11C18.72 21.5 16.48 21.5 12 21.5s-6.72 0-8.11-1.39C2.5 18.72 2.5 16.48 2.5 12Z",
  },
  {
    name: "nova",
    title: "Nova",
    description: "Reduced padding and margins",
    shape:
      "M2 12c0-2.8 0-4.2.54-5.27a5 5 0 0 1 2.19-2.19C5.8 4 7.2 4 10 4h4c2.8 0 4.2 0 5.27.54a5 5 0 0 1 2.19 2.19C22 7.8 22 9.2 22 12s0 4.2-.54 5.27a5 5 0 0 1-2.19 2.19C18.2 20 16.8 20 14 20h-4c-2.8 0-4.2 0-5.27-.54a5 5 0 0 1-2.19-2.19C2 16.2 2 14.8 2 12Z",
  },
  {
    name: "maia",
    title: "Maia",
    description: "Rounded, with generous spacing",
    shape: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  },
  {
    name: "lyra",
    title: "Lyra",
    description: "Boxy and sharp. For mono fonts",
    shape:
      "M7.84 3.8C9.87 2.6 10.89 2 12 2s2.13.6 4.16 1.8l.68.41c2.03 1.2 3.05 1.8 3.6 2.79.56.99.56 2.19.56 4.59v.82c0 2.4 0 3.6-.56 4.59-.55.99-1.57 1.59-3.6 2.79l-.68.41C14.13 21.4 13.11 22 12 22s-2.13-.6-4.16-1.8l-.68-.41c-2.03-1.2-3.05-1.8-3.6-2.79C3 16.01 3 14.81 3 12.41v-.82c0-2.4 0-3.6.56-4.59.55-.99 1.57-1.59 3.6-2.79l.68-.41Z",
  },
  {
    name: "mira",
    title: "Mira",
    description: "Made for compact interfaces",
    shape:
      "M5.92 5.92c2.24-2.24 3.36-3.36 4.67-3.72a6.4 6.4 0 0 1 2.82 0c1.31.36 2.43 1.48 4.67 3.72s3.36 3.36 3.72 4.67a6.4 6.4 0 0 1 0 2.82c-.36 1.31-1.48 2.43-3.72 4.67s-3.36 3.36-4.67 3.72a6.4 6.4 0 0 1-2.82 0c-1.31-.36-2.43-1.48-4.67-3.72S2.56 14.72 2.2 13.41a6.4 6.4 0 0 1 0-2.82c.36-1.31 1.48-2.43 3.72-4.67Z",
  },
  {
    name: "luma",
    title: "Luma",
    description: "Fluid, luminous, and soft",
    shape: "M2 12a7 7 0 0 1 7-7h6a7 7 0 1 1 0 14H9a7 7 0 0 1-7-7Z",
  },
  {
    name: "sera",
    title: "Sera",
    description: "Editorial and typographic",
    shape: "M3 3h18v18H3Z",
  },
  {
    name: "rhea",
    title: "Rhea",
    description: "Like Luma but compact",
    shape: "M3 12a4 4 0 0 1 4-4h10a4 4 0 0 1 0 8H7a4 4 0 0 1-4-4Z",
  },
];

const BASE_COLOR_NAMES = [
  "neutral",
  "stone",
  "zinc",
  "mauve",
  "olive",
  "mist",
  "taupe",
] as const;

export const BASE_COLORS = THEMES.filter((theme) =>
  (BASE_COLOR_NAMES as readonly string[]).includes(theme.name),
);

export { THEMES };

export function isBaseColor(name: string) {
  return (BASE_COLOR_NAMES as readonly string[]).includes(name);
}

export function getThemesForBaseColor(baseColor: string) {
  return THEMES.filter(
    (theme) => theme.name === baseColor || !isBaseColor(theme.name),
  );
}

export function getTheme(name: string): Theme | undefined {
  return THEMES.find((theme) => theme.name === name);
}

export type FontOption = {
  name: FontName;
  title: string;
  type: "sans" | "mono" | "serif";
};

export const FONTS: FontOption[] = [
  { name: "geist", title: "Geist", type: "sans" },
  { name: "inter", title: "Inter", type: "sans" },
  { name: "noto-sans", title: "Noto Sans", type: "sans" },
  { name: "nunito-sans", title: "Nunito Sans", type: "sans" },
  { name: "figtree", title: "Figtree", type: "sans" },
  { name: "roboto", title: "Roboto", type: "sans" },
  { name: "raleway", title: "Raleway", type: "sans" },
  { name: "dm-sans", title: "DM Sans", type: "sans" },
  { name: "public-sans", title: "Public Sans", type: "sans" },
  { name: "outfit", title: "Outfit", type: "sans" },
  { name: "oxanium", title: "Oxanium", type: "sans" },
  { name: "manrope", title: "Manrope", type: "sans" },
  { name: "space-grotesk", title: "Space Grotesk", type: "sans" },
  { name: "montserrat", title: "Montserrat", type: "sans" },
  { name: "ibm-plex-sans", title: "IBM Plex Sans", type: "sans" },
  { name: "source-sans-3", title: "Source Sans 3", type: "sans" },
  { name: "instrument-sans", title: "Instrument Sans", type: "sans" },
  { name: "geist-mono", title: "Geist Mono", type: "mono" },
  { name: "jetbrains-mono", title: "JetBrains Mono", type: "mono" },
  { name: "noto-serif", title: "Noto Serif", type: "serif" },
  { name: "roboto-slab", title: "Roboto Slab", type: "serif" },
  { name: "merriweather", title: "Merriweather", type: "serif" },
  { name: "lora", title: "Lora", type: "serif" },
  { name: "playfair-display", title: "Playfair Display", type: "serif" },
  { name: "eb-garamond", title: "EB Garamond", type: "serif" },
  { name: "instrument-serif", title: "Instrument Serif", type: "serif" },
];

const GENERIC_FAMILY = {
  sans: "sans-serif",
  mono: "monospace",
  serif: "serif",
} as const;

export function getFontFamily(name: FontName) {
  const font = FONTS.find((option) => option.name === name) ?? FONTS[0];
  return `var(--font-${font.name}), ${GENERIC_FAMILY[font.type]}`;
}

export const ICON_LIBRARIES: { name: IconLibraryName; title: string }[] = [
  { name: "lucide", title: "Lucide" },
  { name: "tabler", title: "Tabler Icons" },
  { name: "hugeicons", title: "HugeIcons" },
  { name: "phosphor", title: "Phosphor Icons" },
  { name: "remixicon", title: "Remix Icon" },
];

export const RADII: { name: RadiusName; title: string; value?: string }[] = [
  { name: "default", title: "Default" },
  { name: "none", title: "None", value: "0" },
  { name: "small", title: "Small", value: "0.45rem" },
  { name: "medium", title: "Medium", value: "0.625rem" },
  { name: "large", title: "Large", value: "0.875rem" },
];

export const MENU_COLORS: { name: MenuColorName; title: string }[] = [
  { name: "default", title: "Default" },
  { name: "inverted", title: "Inverted" },
  { name: "default-translucent", title: "Default Translucent" },
  { name: "inverted-translucent", title: "Inverted Translucent" },
];

export const MENU_ACCENTS: { name: MenuAccentName; title: string }[] = [
  { name: "subtle", title: "Subtle" },
  { name: "bold", title: "Bold" },
];

export const BASES: { name: PresetBase; title: string }[] = [
  { name: "base", title: "Base UI" },
  { name: "radix", title: "Radix UI" },
  { name: "aria", title: "React Aria" },
];

export function isRadiusLocked(style: StyleName) {
  return style === "lyra" || style === "sera";
}

export function isRadiusAllowed(style: StyleName, radius: RadiusName) {
  if (isRadiusLocked(style)) return radius === "none";
  return !(style === "rhea" && radius === "large");
}

export function normalizeConfig(
  config: DesignSystemConfig,
): DesignSystemConfig {
  const baseColor = isBaseColor(config.baseColor)
    ? config.baseColor
    : DEFAULT_CONFIG.baseColor;
  const availableThemes = getThemesForBaseColor(baseColor);
  const fallbackTheme = availableThemes[0].name as DesignSystemConfig["theme"];
  const isAvailable = (name: string) =>
    availableThemes.some((theme) => theme.name === name);

  let radius = config.radius;
  if (isRadiusLocked(config.style)) radius = "none";
  else if (!isRadiusAllowed(config.style, radius)) radius = "default";

  return {
    ...config,
    baseColor,
    theme: isAvailable(config.theme) ? config.theme : fallbackTheme,
    chartColor: isAvailable(config.chartColor)
      ? config.chartColor
      : fallbackTheme,
    fontHeading:
      config.fontHeading === config.font ? "inherit" : config.fontHeading,
    radius,
  };
}

export function buildThemeVars(config: DesignSystemConfig) {
  const baseColor = getTheme(config.baseColor) ?? BASE_COLORS[0];
  const theme = getTheme(config.theme) ?? baseColor;
  const chart = getTheme(config.chartColor) ?? theme;

  const light: ThemeVars = {
    ...baseColor.cssVars.light,
    ...theme.cssVars.light,
  };
  const dark: ThemeVars = { ...baseColor.cssVars.dark, ...theme.cssVars.dark };

  for (let i = 1; i <= 5; i++) {
    const key = `chart-${i}`;
    if (chart.cssVars.light[key]) light[key] = chart.cssVars.light[key];
    if (chart.cssVars.dark[key]) dark[key] = chart.cssVars.dark[key];
  }

  if (config.menuAccent === "bold") {
    light.accent = light.primary;
    light["accent-foreground"] = light["primary-foreground"];
    dark.accent = dark.primary;
    dark["accent-foreground"] = dark["primary-foreground"];
  }

  const radius = RADII.find((option) => option.name === config.radius);
  if (radius?.value) light.radius = radius.value;

  return { light, dark };
}

function toCssRule(selector: string, vars: ThemeVars) {
  const declarations = Object.entries(vars)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n");
  return `${selector} {\n${declarations}\n}`;
}

export function buildThemeCss(config: DesignSystemConfig) {
  const { light, dark } = buildThemeVars(config);
  return `${toCssRule(":root", light)}\n\n${toCssRule(".dark", dark)}\n`;
}

export function getDesignSystemClassName(config: DesignSystemConfig) {
  return `style-${config.style} base-color-${config.baseColor}`;
}

export function encodeConfig(config: DesignSystemConfig) {
  return encodePreset(config);
}

export function decodeConfig(code: string): DesignSystemConfig | null {
  const decoded = decodePreset(code);
  if (!decoded) return null;
  return normalizeConfig({
    ...DEFAULT_CONFIG,
    ...decoded,
    chartColor: decoded.chartColor ?? decoded.theme,
  });
}

const PRESET_IN_TEXT = /(?:--preset[\s=]+|[?&]preset=)([0-9A-Za-z]+)/;

export function parsePresetInput(value: string) {
  const input = value.trim();
  const code = input.match(PRESET_IN_TEXT)?.[1] ?? input;
  return isPresetCode(code) && decodeConfig(code) ? code : null;
}

export function isSameConfig(a: DesignSystemConfig, b: DesignSystemConfig) {
  return encodeConfig(a) === encodeConfig(b);
}
