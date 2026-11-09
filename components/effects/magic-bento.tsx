"use client";

// Adapted from React Bits MagicBento (https://reactbits.dev), MIT + Commons Clause.

import { cn } from "cn";
import * as React from "react";

import { Card } from "@/components/ui/card";
import { observeTheme, readCssVariable } from "@/hooks/use-css-variable";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  rate: number;
};

type Rect = { left: number; top: number; width: number; height: number };

type CardState = {
  rect: Rect | null;
  canvas: HTMLCanvasElement | null;
  light: HTMLElement | null;
  border: HTMLElement | null;
  hot: number;
  rx: number;
  ry: number;
  tx: number;
  ty: number;
  vrx: number;
  vry: number;
  vtx: number;
  vty: number;
  press: number;
  vpress: number;
  stars: number;
  drawn: boolean;
  particles: Particle[] | null;
};

type Spring = ["rx" | "ry" | "tx" | "ty", "vrx" | "vry" | "vtx" | "vty"];

type BentoSettings = {
  enableBorderGlow: boolean;
  enableSpotlight: boolean;
  spotlightRadius: number;
  enableStars: boolean;
  particleCount: number;
  enableTilt: boolean;
  enableMagnetism: boolean;
  clickEffect: boolean;
  intro: boolean;
};

const STAGGER = 80;
const TILT = 6;
const MAGNET = 6;
const SPRINGS: Spring[] = [
  ["rx", "vrx"],
  ["ry", "vry"],
  ["tx", "vtx"],
  ["ty", "vty"],
];
const FALLOFF = [1, 0.973, 0.837, 0.593, 0.317, 0.104, 0.009];
const WAVE_WIDTH = 110;
const WAVE: [number, string][] = [
  [0, `${WAVE_WIDTH}px`],
  [0.1, "80px"],
  [0.32, "52px"],
  [0.68, "28px"],
  [0.94, "10px"],
  [1, "3px"],
];
const INTERACTIVE =
  "a, button, input, select, textarea, [role=combobox], [contenteditable]";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const tint = (alpha: string, weight: string, amount: number) =>
  `color-mix(in oklab, var(--mb-glow) calc(var(${alpha}) * var(${weight}, 0) * ${Math.round(amount * 1000) / 10}%), transparent)`;

const glowStops = (alpha: string, weight: string) =>
  `${FALLOFF.map((amount, index) => `${tint(alpha, weight, amount)} ${index * 15}%`).join(", ")}, transparent 100%`;

const SPOTLIGHT_STYLE: React.CSSProperties = {
  background: `radial-gradient(var(--mb-spot-size) circle at var(--mb-x, -999px) var(--mb-y, -999px), ${glowStops("--mb-spot-alpha", "--mb-hot")})`,
};

const BORDER_STYLE: React.CSSProperties = {
  background: [
    `radial-gradient(var(--mb-border-size) circle at var(--mb-x, -999px) var(--mb-y, -999px), ${glowStops("--mb-glow-alpha", "--mb-near")})`,
    `radial-gradient(circle at var(--mb-wx, -999px) var(--mb-wy, -999px), ${WAVE.map(
      ([amount, offset]) =>
        `${tint("--mb-glow-alpha", "--mb-wa", amount)} calc(var(--mb-wr, 0px) - ${offset})`,
    ).join(", ")}, transparent var(--mb-wr, 0px))`,
  ].join(", "),
  WebkitMask:
    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
};

const BentoLayers = React.createContext({
  enableSpotlight: true,
  enableStars: false,
});

function createState(): CardState {
  return {
    rect: null,
    canvas: null,
    light: null,
    border: null,
    hot: 0,
    rx: 0,
    ry: 0,
    tx: 0,
    ty: 0,
    vrx: 0,
    vry: 0,
    vtx: 0,
    vty: 0,
    press: 1,
    vpress: 0,
    stars: 0,
    drawn: false,
    particles: null,
  };
}

function distanceToRect(x: number, y: number, rect: Rect) {
  const dx = Math.max(rect.left - x, 0, x - (rect.left + rect.width));
  const dy = Math.max(rect.top - y, 0, y - (rect.top + rect.height));
  return Math.hypot(dx, dy);
}

function farthestCorner(x: number, y: number, rect: Rect) {
  const dx = Math.max(
    Math.abs(x - rect.left),
    Math.abs(x - rect.left - rect.width),
  );
  const dy = Math.max(
    Math.abs(y - rect.top),
    Math.abs(y - rect.top - rect.height),
  );
  return Math.hypot(dx, dy);
}

function offsetWithin(element: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: Element | null = element;
  while (node instanceof HTMLElement && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return { x, y };
}

function findCards(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>("[data-bento-card]"));
}

export type MagicBentoProps = React.ComponentProps<"div"> &
  Partial<BentoSettings>;

export function MagicBento({
  enableBorderGlow = true,
  enableSpotlight = true,
  spotlightRadius = 300,
  enableStars = true,
  particleCount = 24,
  enableTilt = false,
  enableMagnetism = false,
  clickEffect = true,
  intro = true,
  className,
  style,
  children,
  ...props
}: MagicBentoProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const radius = Math.max(40, spotlightRadius);
  const settings: BentoSettings = {
    enableBorderGlow,
    enableSpotlight,
    spotlightRadius: radius,
    enableStars,
    particleCount: clamp(Math.round(particleCount), 0, 120),
    enableTilt,
    enableMagnetism,
    clickEffect,
    intro,
  };
  const settingsRef = React.useRef(settings);
  React.useLayoutEffect(() => {
    settingsRef.current = settings;
  });

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const playIntro = motion && settingsRef.current.intro;
    if (!playIntro) delete root.dataset.intro;

    const pointer = {
      x: -1e5,
      y: -1e5,
      inside: false,
      down: null as HTMLElement | null,
    };
    const light = { x: -1e5, y: -1e5, near: 0, ready: false };
    const wave = { x: 0, y: 0, t: -1, duration: 1.1, reach: 800 };
    const states = new Map<HTMLElement, CardState>();
    let cards: HTMLElement[] = [];
    let bounds: DOMRect | null = null;
    let dirty = true;
    let raf = 0;
    let last = 0;
    let visible = true;
    let entered = !playIntro;
    let introTimer = 0;
    let glowColor = readCssVariable("--mb-glow", root);

    const stateFor = (card: HTMLElement) => {
      let state = states.get(card);
      if (!state) {
        state = createState();
        states.set(card, state);
      }
      return state;
    };

    const written = new WeakMap<HTMLElement, Record<string, string>>();
    const write = (
      element: HTMLElement | null,
      name: string,
      value: string,
    ) => {
      if (!element) return;
      let cache = written.get(element);
      if (!cache) {
        cache = {};
        written.set(element, cache);
      }
      if (cache[name] === value) return;
      cache[name] = value;
      element.style.setProperty(name, value);
    };

    // Layout offsets ignore the intro and tilt transforms, which would otherwise skew the light.
    const measure = () => {
      dirty = false;
      const rootRect = root.getBoundingClientRect();
      bounds = rootRect;
      cards = findCards(root);
      for (const card of cards) {
        const state = stateFor(card);
        const offset = offsetWithin(card, root);
        state.rect = {
          left: rootRect.left + offset.x,
          top: rootRect.top + offset.y,
          width: card.offsetWidth,
          height: card.offsetHeight,
        };
        state.canvas = card.querySelector<HTMLCanvasElement>(
          ":scope > canvas[data-bento-stars]",
        );
        state.light = card.querySelector<HTMLElement>(
          ":scope > [data-bento-light]",
        );
        state.border = card.querySelector<HTMLElement>(
          ":scope > [data-bento-border]",
        );
      }
    };

    const seed = (state: CardState, rect: Rect) => {
      const count = settingsRef.current.particleCount;
      if (state.particles && state.particles.length === count) {
        return state.particles;
      }
      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 6,
        vy: -4 - Math.random() * 10,
        size: 0.6 + Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        rate: 1.2 + Math.random() * 2.4,
      }));
      return state.particles;
    };

    const drawStars = (
      state: CardState,
      lx: number,
      ly: number,
      dt: number,
      now: number,
    ) => {
      const { canvas, rect } = state;
      if (!canvas || !rect) return;
      // Idle canvases drop their backing store so only the hovered card holds GPU memory.
      if (state.stars < 0.004) {
        canvas.width = 0;
        canvas.height = 0;
        return;
      }
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * ratio));
      const height = Math.max(1, Math.round(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, width, height);
      const reach = settingsRef.current.spotlightRadius * 0.75;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = glowColor;
      for (const particle of seed(state, rect)) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        if (particle.y < -4) {
          particle.y = rect.height + 4;
          particle.x = Math.random() * rect.width;
        }
        if (particle.x < -4) particle.x = rect.width + 4;
        if (particle.x > rect.width + 4) particle.x = -4;
        const distance = Math.hypot(particle.x - lx, particle.y - ly) / reach;
        if (distance >= 1) continue;
        const falloff = 1 - distance * distance * (3 - 2 * distance);
        const twinkle =
          0.55 + 0.45 * Math.sin(now * 0.001 * particle.rate + particle.phase);
        const alpha = state.stars * falloff * twinkle;
        if (alpha < 0.01) continue;
        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const startWave = (x: number, y: number, duration: number) => {
      if (!motion || !bounds) return;
      wave.x = x;
      wave.y = y;
      wave.t = 0;
      wave.duration = duration;
      wave.reach =
        Math.max(
          Math.hypot(x - bounds.left, y - bounds.top),
          Math.hypot(x - bounds.right, y - bounds.top),
          Math.hypot(x - bounds.left, y - bounds.bottom),
          Math.hypot(x - bounds.right, y - bounds.bottom),
        ) + 140;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (dirty) measure();
      const s = settingsRef.current;
      let busy = false;

      const margin = s.spotlightRadius * 0.5;
      const near =
        pointer.inside &&
        bounds &&
        pointer.x > bounds.left - margin &&
        pointer.x < bounds.right + margin &&
        pointer.y > bounds.top - margin &&
        pointer.y < bounds.bottom + margin
          ? 1
          : 0;
      if (!light.ready && near) {
        light.x = pointer.x;
        light.y = pointer.y;
        light.ready = true;
      }
      const follow = 1 - Math.exp(-dt / 0.05);
      light.x += (pointer.x - light.x) * follow;
      light.y += (pointer.y - light.y) * follow;
      const fade = 1 - Math.exp(-dt / (near > light.near ? 0.12 : 0.4));
      light.near += (near - light.near) * fade;
      if (Math.abs(near - light.near) < 0.002) light.near = near;
      else busy = true;
      if (Math.abs(pointer.x - light.x) + Math.abs(pointer.y - light.y) > 0.3) {
        busy = true;
      }

      let waveRadius = 0;
      let waveAlpha = 0;
      if (wave.t >= 0) {
        wave.t += dt;
        const progress = Math.min(1, wave.t / wave.duration);
        waveRadius = wave.reach * (1 - (1 - progress) ** 2.2);
        waveAlpha = (1 - progress) ** 1.3;
        if (progress >= 1) {
          wave.t = -1;
          waveAlpha = 0;
        } else busy = true;
      }

      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      const borderReach = s.spotlightRadius * 0.75;

      for (const card of cards) {
        const state = stateFor(card);
        const rect = state.rect;
        if (!rect) continue;
        const lx = light.x - rect.left;
        const ly = light.y - rect.top;
        const px = pointer.x - rect.left;
        const py = pointer.y - rect.top;
        const revealed = !playIntro || card.dataset.state === "in";
        const inside =
          pointer.inside &&
          revealed &&
          px >= 0 &&
          py >= 0 &&
          px <= rect.width &&
          py <= rect.height;

        const hotTarget = inside && s.enableSpotlight ? 1 : 0;
        state.hot +=
          (hotTarget - state.hot) *
          (1 - Math.exp(-dt / (hotTarget > state.hot ? 0.14 : 0.32)));
        if (Math.abs(hotTarget - state.hot) < 0.002) state.hot = hotTarget;
        else busy = true;

        const u = clamp(px / Math.max(1, rect.width), 0, 1) - 0.5;
        const v = clamp(py / Math.max(1, rect.height), 0, 1) - 0.5;
        const tilt = inside && s.enableTilt && motion;
        const magnet = inside && s.enableMagnetism && motion;
        const targets = [
          tilt ? -v * 2 * TILT : 0,
          tilt ? u * 2 * TILT : 0,
          magnet ? u * 2 * MAGNET : 0,
          magnet ? v * 2 * MAGNET : 0,
        ];
        SPRINGS.forEach(([key, velocity], k) => {
          for (let step = 0; step < steps; step++) {
            state[velocity] +=
              (170 * (targets[k] - state[key]) - 20 * state[velocity]) * h;
            state[key] += state[velocity] * h;
          }
          if (
            Math.abs(targets[k] - state[key]) < 0.002 &&
            Math.abs(state[velocity]) < 0.01
          ) {
            state[key] = targets[k];
            state[velocity] = 0;
          } else busy = true;
        });

        const pressTarget =
          pointer.down === card && s.clickEffect && motion ? 0.985 : 1;
        for (let step = 0; step < steps; step++) {
          state.vpress +=
            (420 * (pressTarget - state.press) - 28 * state.vpress) * h;
          state.press += state.vpress * h;
        }
        if (
          Math.abs(pressTarget - state.press) < 0.0002 &&
          Math.abs(state.vpress) < 0.001
        ) {
          state.press = pressTarget;
          state.vpress = 0;
        } else busy = true;

        const moved =
          state.rx !== 0 ||
          state.ry !== 0 ||
          state.tx !== 0 ||
          state.ty !== 0 ||
          state.press !== 1;

        // Written to the layers, not the card, so the card's content is never restyled; out-of-reach cards are skipped.
        const lit =
          state.hot > 0 ||
          (s.enableBorderGlow &&
            light.near > 0 &&
            distanceToRect(light.x, light.y, rect) < borderReach);
        if (lit) {
          const x = `${lx.toFixed(1)}px`;
          const y = `${ly.toFixed(1)}px`;
          write(state.light, "--mb-x", x);
          write(state.light, "--mb-y", y);
          write(state.border, "--mb-x", x);
          write(state.border, "--mb-y", y);
        }
        write(state.light, "--mb-hot", state.hot.toFixed(3));
        write(
          state.border,
          "--mb-near",
          (lit && s.enableBorderGlow ? light.near : 0).toFixed(3),
        );

        const waved =
          waveAlpha > 0 &&
          waveRadius > distanceToRect(wave.x, wave.y, rect) &&
          waveRadius - WAVE_WIDTH < farthestCorner(wave.x, wave.y, rect);
        if (waved) {
          write(
            state.border,
            "--mb-wx",
            `${(wave.x - rect.left).toFixed(1)}px`,
          );
          write(state.border, "--mb-wy", `${(wave.y - rect.top).toFixed(1)}px`);
          write(state.border, "--mb-wr", `${waveRadius.toFixed(1)}px`);
        }
        write(state.border, "--mb-wa", (waved ? waveAlpha : 0).toFixed(3));

        write(
          card,
          "transform",
          moved
            ? `perspective(900px) translate3d(${state.tx.toFixed(2)}px, ${state.ty.toFixed(2)}px, 0) rotateX(${state.rx.toFixed(3)}deg) rotateY(${state.ry.toFixed(3)}deg) scale(${state.press.toFixed(4)})`
            : "",
        );

        if (s.enableStars && state.canvas) {
          const starTarget = inside && motion ? 1 : 0;
          state.stars +=
            (starTarget - state.stars) *
            (1 - Math.exp(-dt / (starTarget ? 0.3 : 0.5)));
          if (state.stars < 0.004 && !starTarget) state.stars = 0;
          if (state.stars > 0 || starTarget) {
            drawStars(state, lx, ly, dt, now);
            state.drawn = true;
            busy = true;
          } else if (state.drawn) {
            drawStars(state, lx, ly, dt, now);
            state.drawn = false;
          }
        }
      }

      if (busy && visible) raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const cardAt = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      const card = target.closest<HTMLElement>("[data-bento-card]");
      return card && root.contains(card) ? card : null;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      wake();
    };

    const onPointerOut = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      pointer.inside = false;
      pointer.down = null;
      wake();
    };

    // Pressing a form control should not squish the card it lives in.
    const onPointerDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.inside = true;
      const target = event.target instanceof Element ? event.target : null;
      pointer.down = target?.closest(INTERACTIVE) ? null : cardAt(target);
      wake();
    };

    const release = () => {
      if (!pointer.down) return;
      pointer.down = null;
      wake();
    };

    const onClick = (event: MouseEvent) => {
      const card = cardAt(event.target);
      if (!card || !settingsRef.current.clickEffect) return;
      if (dirty) measure();
      if (event.detail === 0) {
        const rect = card.getBoundingClientRect();
        startWave(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.1);
      } else {
        startWave(event.clientX, event.clientY, 1.1);
      }
      wake();
    };

    const invalidate = () => {
      dirty = true;
      wake();
    };

    const resizeObserver = new ResizeObserver(invalidate);
    resizeObserver.observe(root);
    for (const card of findCards(root)) resizeObserver.observe(card);

    const reveal = playIntro
      ? new IntersectionObserver(
          (entries, observer) => {
            let order = 0;
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const card = entry.target as HTMLElement;
              observer.unobserve(card);
              card.style.setProperty("--mb-delay", `${order++ * STAGGER}ms`);
              card.dataset.state = "in";
            }
            if (!order) return;
            if (!entered) {
              entered = true;
              introTimer = window.setTimeout(() => {
                if (dirty) measure();
                if (bounds) startWave(bounds.left, bounds.top, 1.7);
                wake();
              }, 260);
            }
            wake();
          },
          { threshold: 0.15 },
        )
      : null;
    for (const card of findCards(root)) {
      if (reveal) reveal.observe(card);
      else card.dataset.state = "in";
    }

    const visibility = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      if (visible) invalidate();
    });
    visibility.observe(root);

    const stopObservingTheme = observeTheme(() => {
      glowColor = readCssVariable("--mb-glow", root);
    });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", release, { passive: true });
    window.addEventListener("scroll", invalidate, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", invalidate, { passive: true });
    document.addEventListener("pointerout", onPointerOut);
    root.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(introTimer);
      reveal?.disconnect();
      visibility.disconnect();
      resizeObserver.disconnect();
      stopObservingTheme();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("scroll", invalidate, { capture: true });
      window.removeEventListener("resize", invalidate);
      document.removeEventListener("pointerout", onPointerOut);
      root.removeEventListener("click", onClick);
    };
  }, []);

  const layers = React.useMemo(
    () => ({ enableSpotlight, enableStars }),
    [enableSpotlight, enableStars],
  );

  return (
    <BentoLayers value={layers}>
      <div
        ref={rootRef}
        data-intro={intro ? "" : undefined}
        className={cn(
          "magic-bento relative [--mb-glow-alpha:0.5] [--mb-glow:var(--primary)] [--mb-spot-alpha:0.06] dark:[--mb-glow-alpha:0.85] dark:[--mb-spot-alpha:0.1]",
          className,
        )}
        style={
          {
            "--mb-spot-size": `${radius}px`,
            "--mb-border-size": `${Math.round(radius * 0.75)}px`,
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </BentoLayers>
  );
}

export function MagicBentoCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  const { enableSpotlight, enableStars } = React.use(BentoLayers);

  return (
    <Card
      data-bento-card=""
      className={cn("relative isolate", className)}
      {...props}
    >
      {enableSpotlight && (
        <span
          aria-hidden
          data-bento-light=""
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit]"
          style={SPOTLIGHT_STYLE}
        />
      )}
      {enableStars && (
        <canvas
          aria-hidden
          data-bento-stars=""
          className="pointer-events-none absolute inset-0 -z-10 block size-full"
        />
      )}
      {children}
      <span
        aria-hidden
        data-bento-border=""
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] p-px"
        style={BORDER_STYLE}
      />
    </Card>
  );
}
