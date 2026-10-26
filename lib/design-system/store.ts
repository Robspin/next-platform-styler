import { useMemo, useSyncExternalStore } from "react";

import {
  DEFAULT_CONFIG,
  type DesignSystemConfig,
  decodeConfig,
  encodeConfig,
  normalizeConfig,
} from "./config";
import { DEFAULT_MODE, MODE_STORAGE_KEY, type Mode } from "./runtime";

const PRESET_STORAGE_KEY = "design-system:preset";
const HISTORY_LIMIT = 50;

export type DesignSystemState = {
  config: DesignSystemConfig;
  preview: Partial<DesignSystemConfig> | null;
  past: DesignSystemConfig[];
  future: DesignSystemConfig[];
};

const SERVER_STATE: DesignSystemState = {
  config: DEFAULT_CONFIG,
  preview: null,
  past: [],
  future: [],
};

let state: DesignSystemState | null = null;
const listeners = new Set<() => void>();

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function getUrlPreset() {
  return new URLSearchParams(window.location.search).get("preset");
}

function readInitialConfig() {
  const urlPreset = getUrlPreset();
  const storedPreset = readStorage(PRESET_STORAGE_KEY);
  return (
    (urlPreset && decodeConfig(urlPreset)) ||
    (storedPreset && decodeConfig(storedPreset)) ||
    DEFAULT_CONFIG
  );
}

function getState() {
  state ??= { ...SERVER_STATE, config: readInitialConfig() };
  return state;
}

function setState(next: DesignSystemState) {
  state = next;
  writeStorage(PRESET_STORAGE_KEY, encodeConfig(next.config));
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setConfig(update: Partial<DesignSystemConfig>) {
  const current = getState();
  const config = normalizeConfig({ ...current.config, ...update });
  if (encodeConfig(config) === encodeConfig(current.config)) {
    if (current.preview) setState({ ...current, preview: null });
    return;
  }
  setState({
    config,
    preview: null,
    past: [...current.past, current.config].slice(-HISTORY_LIMIT),
    future: [],
  });
}

export function setPreview(preview: Partial<DesignSystemConfig> | null) {
  const current = getState();
  if (!preview && !current.preview) return;
  setState({ ...current, preview });
}

export function undo() {
  const current = getState();
  const previous = current.past.at(-1);
  if (!previous) return;
  setState({
    config: previous,
    preview: null,
    past: current.past.slice(0, -1),
    future: [current.config, ...current.future],
  });
}

export function redo() {
  const current = getState();
  const [next, ...future] = current.future;
  if (!next) return;
  setState({
    config: next,
    preview: null,
    past: [...current.past, current.config],
    future,
  });
}

export function useDesignSystem() {
  return useSyncExternalStore(subscribe, getState, () => SERVER_STATE);
}

export function useEffectiveConfig() {
  const { config, preview } = useDesignSystem();
  return useMemo(
    () => (preview ? normalizeConfig({ ...config, ...preview }) : config),
    [config, preview],
  );
}

let mode: Mode | null = null;
const modeListeners = new Set<() => void>();

function getMode() {
  if (mode) return mode;
  const stored = readStorage(MODE_STORAGE_KEY);
  mode = stored === "light" || stored === "dark" ? stored : DEFAULT_MODE;
  return mode;
}

function subscribeMode(listener: () => void) {
  modeListeners.add(listener);
  return () => modeListeners.delete(listener);
}

export function setMode(next: Mode) {
  mode = next;
  writeStorage(MODE_STORAGE_KEY, next);
  for (const listener of modeListeners) listener();
}

export function useMode() {
  return useSyncExternalStore(subscribeMode, getMode, () => DEFAULT_MODE);
}
