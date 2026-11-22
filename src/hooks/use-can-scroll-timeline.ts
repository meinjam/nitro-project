"use client";

import { type RefObject, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CAN_WRAP_OFFSETS } from "@/components/can/nitro-can";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CAN_ASPECT_RATIO = 340 / 896;

export interface CanScrollRefs {
  mainRef: RefObject<HTMLElement | null>;
  aboutSectionRef: RefObject<HTMLElement | null>;
  shopSectionRef: RefObject<HTMLElement | null>;
  heroCanAnchorRef: RefObject<HTMLDivElement | null>;
  aboutDesktopCanAnchorRef: RefObject<HTMLDivElement | null>;
  aboutMobileCanAnchorRef: RefObject<HTMLDivElement | null>;
  shopDesktopCenterAnchorRef: RefObject<HTMLDivElement | null>;
  shopMobileCenterAnchorRef: RefObject<HTMLDivElement | null>;
  shopDesktopPedestalRef: RefObject<HTMLDivElement | null>;
  shopMobilePedestalRef: RefObject<HTMLDivElement | null>;
  canStageRef: RefObject<HTMLDivElement | null>;
  floatWrapperRef: RefObject<HTMLDivElement | null>;
  labelTrackRef: RefObject<HTMLDivElement | null>;
}

function pickVisibleElement(primary: HTMLElement | null, fallback: HTMLElement | null): HTMLElement | null {
  for (const el of [primary, fallback]) {
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return el;
  }
  return null;
}

function measureRelativeTo(el: HTMLElement, containerRect: DOMRect) {
  const r = el.getBoundingClientRect();
  return {
    cx: r.left - containerRect.left + r.width / 2,
    cy: r.top - containerRect.top + r.height / 2,
    width: r.width,
    height: r.height,
  };
}

/**
 * Orchestrates the bidirectional 2-phase GSAP ScrollTrigger timeline across Hero -> About -> Shop:
 *  - Measures untransformed layout anchors dynamically across all breakpoints via ResizeObserver.
 *  - Respects `prefers-reduced-motion` via `gsap.matchMedia()`, falling back cleanly to static cans.
 *  - Returns `isAnimatedActive` so sections hide their static can placeholders once GSAP mounts.
 */
export function useCanScrollTimeline(refs: CanScrollRefs): boolean {
  const [isAnimatedActive, setIsAnimatedActive] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let tl: gsap.core.Timeline | null = null;
        let floatTween: gsap.core.Tween | null = null;
        let rafId = 0;
        let lastKey = "";

        const teardownTimeline = () => {
          floatTween?.kill();
          floatTween = null;
          if (tl) {
            tl.scrollTrigger?.kill();
            tl.kill();
            tl = null;
          }
        };

        const buildTimeline = (force = false) => {
          const mainEl = refs.mainRef.current;
          const heroAnchor = refs.heroCanAnchorRef.current;
          const aboutSection = refs.aboutSectionRef.current;
          const shopSection = refs.shopSectionRef.current;
          const aboutAnchor = pickVisibleElement(
            refs.aboutDesktopCanAnchorRef.current,
            refs.aboutMobileCanAnchorRef.current
          );
          const shopAnchor = pickVisibleElement(
            refs.shopDesktopCenterAnchorRef.current,
            refs.shopMobileCenterAnchorRef.current
          );
          const canEl = refs.canStageRef.current;
          const floatEl = refs.floatWrapperRef.current;
          const labelTrackEl = refs.labelTrackRef.current;

          if (
            !mainEl ||
            !heroAnchor ||
            !aboutSection ||
            !shopSection ||
            !aboutAnchor ||
            !shopAnchor ||
            !canEl ||
            !labelTrackEl
          ) {
            return;
          }

          const mainRect = mainEl.getBoundingClientRect();
          const dimKey = `${Math.round(mainRect.width)}x${Math.round(
            mainRect.height
          )}-${window.innerWidth}x${window.innerHeight}`;

          if (!force && dimKey === lastKey && tl) return;
          lastKey = dimKey;

          teardownTimeline();

          const heroBox = measureRelativeTo(heroAnchor, mainRect);
          const aboutBox = measureRelativeTo(aboutAnchor, mainRect);
          const shopBox = measureRelativeTo(shopAnchor, mainRect);

          const aboutSecTop = aboutSection.getBoundingClientRect().top - mainRect.top;
          const shopSecTop = shopSection.getBoundingClientRect().top - mainRect.top;

          // Base size matches largest visual span across Hero, About, and upright Shop so scale <= 1 everywhere
          const baseW = Math.max(aboutBox.width, heroBox.width, shopBox.height);
          const baseH = baseW * CAN_ASPECT_RATIO;

          const heroScale = heroBox.width / baseW;
          const aboutScale = aboutBox.width / baseW;
          // At -90deg rotation, visual height equals baseW * scale
          const shopScale = shopBox.height / baseW;

          const maxScroll = Math.max(2, document.documentElement.scrollHeight - window.innerHeight);
          const endScroll = Math.max(2, Math.min(maxScroll, shopSecTop));
          const aboutRatio = Math.min(0.85, Math.max(0.15, aboutSecTop / endScroll));
          const phase1Dur = aboutRatio;
          const phase2Dur = 1 - aboutRatio;

          gsap.set(canEl, {
            width: baseW,
            height: baseH,
            xPercent: -50,
            yPercent: -50,
            x: heroBox.cx,
            y: heroBox.cy,
            scale: heroScale,
            rotation: 0,
            autoAlpha: 1,
            force3D: true,
          });
          gsap.set(labelTrackEl, { yPercent: CAN_WRAP_OFFSETS.hero, force3D: true });
          if (floatEl) gsap.set(floatEl, { y: 0 });

          // Subtle resting float only while near the top of Hero
          if (floatEl) {
            floatTween = gsap.to(floatEl, {
              y: 5,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }

          const pedestals = [refs.shopDesktopPedestalRef.current, refs.shopMobilePedestalRef.current].filter(
            Boolean
          ) as HTMLElement[];

          if (pedestals.length > 0) {
            gsap.set(pedestals, { opacity: 0.45, scale: 0.92 });
          }

          // scrub: true locks 1:1 with Lenis's smooth inertia (zero double-smoothing lag)
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainEl,
              start: "top top",
              end: () => `+=${endScroll}`,
              scrub: true,
              onUpdate: (self) => {
                if (!floatTween || !floatEl) return;
                if (self.progress > 0.015) {
                  if (!floatTween.paused()) {
                    floatTween.pause();
                    gsap.to(floatEl, {
                      y: 0,
                      duration: 0.25,
                      overwrite: "auto",
                    });
                  }
                } else if (floatTween.paused()) {
                  floatTween.resume();
                }
              },
            },
          });

          // Phase 1: Hero (#home) -> About (#about)
          // Horizontal scale-up (0°) + 2× 360° masked cylindrical label spin
          tl.to(canEl, { x: aboutBox.cx, y: aboutBox.cy, ease: "none", duration: phase1Dur }, 0);
          tl.to(canEl, { scale: aboutScale, rotation: 0, ease: "power1.inOut", duration: phase1Dur }, 0);
          tl.to(labelTrackEl, { yPercent: CAN_WRAP_OFFSETS.about, ease: "power1.inOut", duration: phase1Dur }, 0);

          // Phase 2: About (#about) -> Shop (#shop)
          // Shrink + rotate -90° upright + 1× 360° masked cylindrical label spin onto middle pedestal
          tl.to(canEl, { x: shopBox.cx, y: shopBox.cy, ease: "none", duration: phase2Dur }, phase1Dur);
          tl.to(canEl, { scale: shopScale, rotation: -90, ease: "power1.inOut", duration: phase2Dur }, phase1Dur);
          tl.to(
            labelTrackEl,
            { yPercent: CAN_WRAP_OFFSETS.shop, ease: "power1.inOut", duration: phase2Dur },
            phase1Dur
          );

          if (pedestals.length > 0) {
            tl.to(
              pedestals,
              {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                duration: phase2Dur * 0.35,
              },
              phase1Dur + phase2Dur * 0.65
            );
          }

          ScrollTrigger.refresh();
        };

        setIsAnimatedActive(true);
        buildTimeline(true);

        const scheduleRebuild = () => {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => buildTimeline(false));
        };

        const ro = new ResizeObserver(scheduleRebuild);
        if (refs.mainRef.current) ro.observe(refs.mainRef.current);
        window.addEventListener("resize", scheduleRebuild, { passive: true });
        window.addEventListener("load", scheduleRebuild, { once: true });

        return () => {
          cancelAnimationFrame(rafId);
          ro.disconnect();
          window.removeEventListener("resize", scheduleRebuild);
          window.removeEventListener("load", scheduleRebuild);
          teardownTimeline();
          setIsAnimatedActive(false);
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: refs.mainRef }
  );

  return isAnimatedActive;
}
