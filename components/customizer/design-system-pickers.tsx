"use client";

import { AppIcon } from "@/components/app-icon";
import {
  BASE_COLORS,
  type DesignSystemConfig,
  FONTS,
  type FontOption,
  getFontFamily,
  getThemesForBaseColor,
  ICON_LIBRARIES,
  type IconLibraryName,
  isBaseColor,
  isRadiusAllowed,
  isRadiusLocked,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
} from "@/lib/design-system/config";
import {
  setConfig,
  setPreview,
  useDesignSystem,
} from "@/lib/design-system/store";
import type { Theme } from "@/lib/design-system/themes";

import { Picker, type PickerGroup } from "./picker";

function previewFor<K extends keyof DesignSystemConfig>(key: K) {
  return (value: DesignSystemConfig[K] | null) =>
    setPreview(value === null ? null : { [key]: value });
}

function StyleShape({ shape }: { shape: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d={shape} />
    </svg>
  );
}

function Swatch({ color }: { color?: string }) {
  return (
    <span
      className="size-4 rounded-full ring-1 ring-foreground/15"
      style={{ backgroundColor: color }}
    />
  );
}

function themeSwatchColor(theme: Theme) {
  return isBaseColor(theme.name)
    ? theme.cssVars.dark["muted-foreground"]
    : theme.cssVars.light.primary;
}

function FontSample({ font }: { font: FontOption["name"] }) {
  return (
    <span className="text-sm" style={{ fontFamily: getFontFamily(font) }}>
      Aa
    </span>
  );
}

function IconSample({ library }: { library: IconLibraryName }) {
  return (
    <span className="flex gap-1 [&_svg]:size-3.5">
      <AppIcon name="investigations" library={library} />
      <AppIcon name="bell" library={library} />
      <AppIcon name="administration" library={library} />
    </span>
  );
}

function themeGroups(themes: Theme[], swatch: (theme: Theme) => string) {
  const toOption = (theme: Theme) => ({
    value: theme.name as DesignSystemConfig["theme"],
    label: theme.title,
    preview: <Swatch color={swatch(theme)} />,
  });
  return [
    { options: themes.filter((t) => isBaseColor(t.name)).map(toOption) },
    {
      label: "Colors",
      options: themes.filter((t) => !isBaseColor(t.name)).map(toOption),
    },
  ];
}

function fontGroups(fonts: FontOption[]) {
  const labels = { sans: "Sans Serif", mono: "Monospace", serif: "Serif" };
  return (["sans", "mono", "serif"] as const).map((type) => ({
    label: labels[type],
    options: fonts
      .filter((font) => font.type === type)
      .map((font) => ({
        value: font.name,
        label: font.title,
        preview: <FontSample font={font.name} />,
      })),
  }));
}

function Divider() {
  return <hr className="-mx-1.5 my-1.5" />;
}

export function DesignSystemPickers() {
  const { config } = useDesignSystem();
  const themes = getThemesForBaseColor(config.baseColor);
  const style = STYLES.find((option) => option.name === config.style);
  const theme = themes.find((option) => option.name === config.theme);
  const chartTheme = themes.find((option) => option.name === config.chartColor);
  const baseColor = BASE_COLORS.find(
    (option) => option.name === config.baseColor,
  );
  const headingGroups: PickerGroup<DesignSystemConfig["fontHeading"]>[] = [
    { options: [{ value: "inherit", label: "Inherit from font" }] },
    ...fontGroups(FONTS),
  ];

  return (
    <div className="grid gap-0.5">
      <Picker
        label="Style"
        value={config.style}
        preview={style && <StyleShape shape={style.shape} />}
        groups={[
          {
            options: STYLES.map((option) => ({
              value: option.name,
              label: option.title,
              description: option.description,
              preview: <StyleShape shape={option.shape} />,
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ style: value })}
        onPreview={previewFor("style")}
      />
      <Divider />
      <Picker
        label="Base Color"
        value={config.baseColor}
        preview={baseColor && <Swatch color={themeSwatchColor(baseColor)} />}
        groups={[
          {
            options: BASE_COLORS.map((option) => ({
              value: option.name as DesignSystemConfig["baseColor"],
              label: option.title,
              preview: <Swatch color={themeSwatchColor(option)} />,
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ baseColor: value })}
        onPreview={previewFor("baseColor")}
      />
      <Picker
        label="Theme"
        value={config.theme}
        preview={theme && <Swatch color={themeSwatchColor(theme)} />}
        groups={themeGroups(themes, themeSwatchColor)}
        onValueChange={(value) => setConfig({ theme: value })}
        onPreview={previewFor("theme")}
      />
      <Picker
        label="Chart Color"
        value={config.chartColor}
        preview={
          chartTheme && <Swatch color={chartTheme.cssVars.light["chart-3"]} />
        }
        groups={themeGroups(
          themes,
          (option) => option.cssVars.light["chart-3"],
        )}
        onValueChange={(value) => setConfig({ chartColor: value })}
        onPreview={previewFor("chartColor")}
      />
      <Divider />
      <Picker
        label="Heading"
        value={config.fontHeading}
        preview={
          config.fontHeading !== "inherit" && (
            <FontSample font={config.fontHeading} />
          )
        }
        groups={headingGroups}
        onValueChange={(value) => setConfig({ fontHeading: value })}
        onPreview={previewFor("fontHeading")}
      />
      <Picker
        label="Font"
        value={config.font}
        preview={<FontSample font={config.font} />}
        groups={fontGroups(FONTS)}
        onValueChange={(value) => setConfig({ font: value })}
        onPreview={previewFor("font")}
      />
      <Divider />
      <Picker
        label="Icon Library"
        value={config.iconLibrary}
        preview={<IconSample library={config.iconLibrary} />}
        groups={[
          {
            options: ICON_LIBRARIES.map((option) => ({
              value: option.name,
              label: option.title,
              preview: <IconSample library={option.name} />,
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ iconLibrary: value })}
        onPreview={previewFor("iconLibrary")}
      />
      <Picker
        label="Radius"
        value={config.radius}
        disabled={isRadiusLocked(config.style)}
        groups={[
          {
            options: RADII.map((option) => ({
              value: option.name,
              label: option.title,
              description: option.value ?? "Theme default",
              disabled: !isRadiusAllowed(config.style, option.name),
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ radius: value })}
        onPreview={previewFor("radius")}
      />
      <Divider />
      <Picker
        label="Menu"
        value={config.menuColor}
        groups={[
          {
            options: MENU_COLORS.map((option) => ({
              value: option.name,
              label: option.title,
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ menuColor: value })}
        onPreview={previewFor("menuColor")}
      />
      <Picker
        label="Menu Accent"
        value={config.menuAccent}
        groups={[
          {
            options: MENU_ACCENTS.map((option) => ({
              value: option.name,
              label: option.title,
            })),
          },
        ]}
        onValueChange={(value) => setConfig({ menuAccent: value })}
        onPreview={previewFor("menuAccent")}
      />
    </div>
  );
}
