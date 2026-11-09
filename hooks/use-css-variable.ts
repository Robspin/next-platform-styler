import * as React from "react";

// Theme tokens change when the customizer rewrites <style> tags in <head> or toggles classes on <html>.
export function observeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });
  observer.observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  return () => observer.disconnect();
}

export function readCssVariable(name: string, element?: Element) {
  return getComputedStyle(element ?? document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export function useCssVariable(name: string) {
  return React.useSyncExternalStore(
    observeTheme,
    () => readCssVariable(name),
    () => "",
  );
}
