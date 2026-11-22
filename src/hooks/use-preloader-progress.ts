"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import canBaseHorizontal from "@/assets/can-base-horizontal.png";
import canCoverGreenWrap from "@/assets/can-cover-green-wrap.png";
import canHeroShadow from "@/assets/can-hero-shadow.png";
import nitroWordmark from "@/assets/nitro-wordmark.png";

const CRITICAL_ASSETS = [canBaseHorizontal.src, canCoverGreenWrap.src, canHeroShadow.src, nitroWordmark.src];

const MIN_CHARGE_MS = 950;
const COMPLETE_HOLD_MS = 220;
const ASSET_TIMEOUT_MS = 2400;

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
    if (img.complete) resolve();
  });
}

export interface PreloaderState {
  progress: number;
  isCharged: boolean;
  isVisible: boolean;
  reducedMotion: boolean;
}

/**
 * Coordinates real Hero asset + font preloading with a snappy eased charge counter (0 -> 100),
 * holds briefly at 100% for the voltage flash, then signals the curtain exit and unlocks scroll.
 */
export function usePreloaderProgress(): PreloaderState {
  const prefersReduced = useReducedMotion() ?? false;
  const [progress, setProgress] = useState(0);
  const [isCharged, setIsCharged] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReduced) return;

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    let cancelled = false;
    let rafId = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let assetsReady = false;

    const preloadAll = Promise.all([
      ...CRITICAL_ASSETS.map(preloadImage),
      document.fonts?.ready.catch(() => undefined) ?? Promise.resolve(),
    ]);

    const timeoutGuard = new Promise<void>((resolve) => setTimeout(resolve, ASSET_TIMEOUT_MS));

    Promise.race([preloadAll, timeoutGuard]).then(() => {
      assetsReady = true;
    });

    const startTime = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;

      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / MIN_CHARGE_MS);
      const eased = 1 - Math.pow(1 - rawT, 3);

      // Hold smoothly at 94% until critical assets finish decoding
      const targetProgress = assetsReady ? Math.round(eased * 100) : Math.min(94, Math.round(eased * 94));

      setProgress(targetProgress);

      if (assetsReady && rawT >= 1) {
        setProgress(100);
        setIsCharged(true);
        holdTimer = setTimeout(() => {
          if (cancelled) return;
          document.documentElement.style.overflow = prevOverflow;
          setVisible(false);
        }, COMPLETE_HOLD_MS);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (holdTimer) clearTimeout(holdTimer);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [prefersReduced]);

  return {
    progress: prefersReduced ? 100 : progress,
    isCharged: prefersReduced ? true : isCharged,
    isVisible: !prefersReduced && visible,
    reducedMotion: prefersReduced,
  };
}
