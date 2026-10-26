import { cn } from "cn";
import type { Metadata } from "next";

import { ThemeCustomizer } from "@/components/customizer/theme-customizer";
import { DesignSystemProvider } from "@/components/design-system-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DEFAULT_CONFIG,
  getDesignSystemClassName,
} from "@/lib/design-system/config";
import {
  buildRuntimeCss,
  DEFAULT_MODE,
  designSystemScript,
} from "@/lib/design-system/runtime";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recovery Platform",
  description: "Theme playground for the Recovery Platform dashboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={cn(
        fontVariables,
        getDesignSystemClassName(DEFAULT_CONFIG),
        DEFAULT_MODE === "dark" && "dark",
        "antialiased",
      )}
      suppressHydrationWarning
    >
      <head>
        <style
          id="design-system-defaults"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: generated from static theme data
          dangerouslySetInnerHTML={{ __html: buildRuntimeCss(DEFAULT_CONFIG) }}
        />
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: applies the saved theme before first paint
          dangerouslySetInnerHTML={{ __html: designSystemScript }}
        />
      </head>
      <body>
        <DesignSystemProvider>
          <TooltipProvider>
            {children}
            <ThemeCustomizer />
          </TooltipProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
