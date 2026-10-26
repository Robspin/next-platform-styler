import {
  BASE_COLORS,
  type DesignSystemConfig,
  FONTS,
  getThemesForBaseColor,
  ICON_LIBRARIES,
  isBaseColor,
  isRadiusAllowed,
  MENU_ACCENTS,
  MENU_COLORS,
  normalizeConfig,
  RADII,
  STYLES,
} from "./config";

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function chance(probability: number) {
  return Math.random() < probability;
}

export function randomConfig(): DesignSystemConfig {
  const style = pick(STYLES).name;
  const baseColor = pick(BASE_COLORS).name as DesignSystemConfig["baseColor"];
  const colorThemes = getThemesForBaseColor(baseColor).filter(
    (theme) => !isBaseColor(theme.name),
  );
  const theme = (
    chance(0.8) ? pick(colorThemes).name : baseColor
  ) as DesignSystemConfig["theme"];
  const font = pick(FONTS).name;

  return normalizeConfig({
    style,
    baseColor,
    theme,
    chartColor: chance(0.6) ? theme : (pick(colorThemes).name as typeof theme),
    iconLibrary: pick(ICON_LIBRARIES).name,
    font,
    fontHeading: chance(0.6) ? "inherit" : pick(FONTS).name,
    radius: pick(RADII.filter((radius) => isRadiusAllowed(style, radius.name)))
      .name,
    menuAccent: pick(MENU_ACCENTS).name,
    menuColor: chance(0.6) ? "default" : pick(MENU_COLORS).name,
  });
}
