"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AboutSection } from "./AboutSection";
import { HeroSection } from "./HeroSection";
import { ScrollCanStage } from "./ScrollCanStage";
import { ShopSection } from "./ShopSection";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function pickVisibleElement(
  primary: HTMLElement | null,
  fallback: HTMLElement | null
): HTMLElement | null {
  for (const el of [primary, fallback]) {
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) return el;
  }
  return null;
}

export function NitroScrollExperience() {
  const [isAnimatedActive, setIsAnimatedActive] = useState(false);

  const mainRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const shopSectionRef = useRef<HTMLElement>(null);

  const heroCanAnchorRef = useRef<HTMLDivElement>(null);
  const aboutDesktopCanAnchorRef = useRef<HTMLDivElement>(null);
  const aboutMobileCanAnchorRef = useRef<HTMLDivElement>(null);
  const shopDesktopCenterAnchorRef = useRef<HTMLDivElement>(null);
  const shopMobileCenterAnchorRef = useRef<HTMLDivElement>(null);
  const shopDesktopPedestalRef = useRef<HTMLDivElement>(null);
  const shopMobilePedestalRef = useRef<HTMLDivElement>(null);

  const canStageRef = useRef<HTMLDivElement>(null);
  const floatWrapperRef = useRef<HTMLDivElement>(null);
  const labelTrackRef = useRef<HTMLDivElement>(null);
  const heroShadowRef = useRef<HTMLDivElement>(null);
  const aboutShadowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let tl: gsap.core.Timeline | null = null;
        let floatTween: gsap.core.Tween | null = null;
        let rafId = 0;
        let lastKey = "";

        const teardownTimeline = () => {
          if (floatTween) {
            floatTween.kill();
            floatTween = null;
          }
          if (tl) {
            tl.scrollTrigger?.kill();
            tl.kill();
            tl = null;
          }
        };

        const buildTimeline = (force = false) => {
          const mainEl = mainRef.current;
          const heroAnchor = heroCanAnchorRef.current;
          const aboutSection = aboutSectionRef.current;
          const shopSection = shopSectionRef.current;
          const aboutAnchor = pickVisibleElement(
            aboutDesktopCanAnchorRef.current,
            aboutMobileCanAnchorRef.current
          );
          const shopAnchor = pickVisibleElement(
            shopDesktopCenterAnchorRef.current,
            shopMobileCenterAnchorRef.current
          );
          const canEl = canStageRef.current;
          const floatEl = floatWrapperRef.current;
          const labelTrackEl = labelTrackRef.current;
          const heroShadowEl = heroShadowRef.current;
          const aboutShadowEl = aboutShadowRef.current;

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

          const measureRel = (el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            return {
              cx: r.left - mainRect.left + r.width / 2,
              cy: r.top - mainRect.top + r.height / 2,
              width: r.width,
              height: r.height,
            };
          };

          const heroBox = measureRel(heroAnchor);
          const aboutBox = measureRel(aboutAnchor);
          const shopBox = measureRel(shopAnchor);

          const aboutSecTop =
            aboutSection.getBoundingClientRect().top - mainRect.top;
          const shopSecTop =
            shopSection.getBoundingClientRect().top - mainRect.top;

          // Use largest horizontal width as base so scale <= 1 everywhere
          const baseW = Math.max(aboutBox.width, heroBox.width);
          const baseH = baseW * (340 / 896);

          const heroScale = heroBox.width / baseW;
          const aboutScale = aboutBox.width / baseW;
          // At -90deg rotation, visual height equals baseW * scale
          const shopScale = shopBox.height / baseW;

          const maxScroll = Math.max(
            2,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const endScroll = Math.max(2, Math.min(maxScroll, shopSecTop));
          const aboutRatio = Math.min(
            0.85,
            Math.max(0.15, aboutSecTop / endScroll)
          );
          const phase1Dur = aboutRatio;
          const phase2Dur = 1 - aboutRatio;

          // Position at exact Hero center before building scroll timeline
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
          gsap.set(labelTrackEl, { yPercent: 0, force3D: true });
          if (heroShadowEl) gsap.set(heroShadowEl, { opacity: 1 });
          if (aboutShadowEl) gsap.set(aboutShadowEl, { opacity: 0 });
          if (floatEl) gsap.set(floatEl, { y: 0 });

          // Subtle resting float only while at top of Hero
          if (floatEl) {
            floatTween = gsap.to(floatEl, {
              y: 5,
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }

          const pedestals = [
            shopDesktopPedestalRef.current,
            shopMobilePedestalRef.current,
          ].filter(Boolean) as HTMLElement[];

          if (pedestals.length > 0) {
            gsap.set(pedestals, { opacity: 0.45, scale: 0.92 });
          }

          // Master bidirectional scrubbed timeline: Hero -> About -> Shop
          tl = gsap.timeline({
            scrollTrigger: {
              trigger: mainEl,
              start: "top top",
              end: () => `+=${endScroll}`,
              scrub: 0.65,
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

          // === PHASE 1: Hero (#home) -> About (#about) ===
          // Smooth viewport-paced glide + horizontal scale-up (0°) behind About tagline
          tl.to(
            canEl,
            {
              x: aboutBox.cx,
              y: aboutBox.cy,
              ease: "none",
              duration: phase1Dur,
            },
            0
          );

          tl.to(
            canEl,
            {
              scale: aboutScale,
              rotation: 0,
              ease: "power1.inOut",
              duration: phase1Dur,
            },
            0
          );

          if (heroShadowEl) {
            tl.to(
              heroShadowEl,
              { opacity: 0, ease: "power1.out", duration: phase1Dur * 0.65 },
              0
            );
          }

          if (aboutShadowEl) {
            tl.to(
              aboutShadowEl,
              { opacity: 1, ease: "power1.inOut", duration: phase1Dur * 0.7 },
              phase1Dur * 0.3
            );
          }

          // === PHASE 2: About (#about) -> Shop (#shop) ===
          // Glide to middle Shop slot + shrink + rotate -90° upright + 360° 3D cylinder label spin
          tl.to(
            canEl,
            {
              x: shopBox.cx,
              y: shopBox.cy,
              ease: "none",
              duration: phase2Dur,
            },
            phase1Dur
          );

          tl.to(
            canEl,
            {
              scale: shopScale,
              rotation: -90,
              ease: "power1.inOut",
              duration: phase2Dur,
            },
            phase1Dur
          );

          tl.to(
            labelTrackEl,
            {
              yPercent: 115,
              ease: "power1.inOut",
              duration: phase2Dur,
            },
            phase1Dur
          );

          if (aboutShadowEl) {
            tl.to(
              aboutShadowEl,
              { opacity: 0, ease: "power1.out", duration: phase2Dur * 0.38 },
              phase1Dur
            );
          }

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
        if (mainRef.current) ro.observe(mainRef.current);
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
    { scope: mainRef }
  );

  return (
    <main ref={mainRef} className="relative overflow-x-clip">
      <HeroSection
        canAnchorRef={heroCanAnchorRef}
        hideStaticCan={isAnimatedActive}
      />
      <AboutSection
        sectionRef={aboutSectionRef}
        desktopCanAnchorRef={aboutDesktopCanAnchorRef}
        mobileCanAnchorRef={aboutMobileCanAnchorRef}
        hideStaticCan={isAnimatedActive}
      />
      <ShopSection
        sectionRef={shopSectionRef}
        desktopCenterCanRef={shopDesktopCenterAnchorRef}
        mobileCenterCanRef={shopMobileCenterAnchorRef}
        desktopPedestalRef={shopDesktopPedestalRef}
        mobilePedestalRef={shopMobilePedestalRef}
        hideStaticCan={isAnimatedActive}
      />
      <ScrollCanStage
        visible={isAnimatedActive}
        canStageRef={canStageRef}
        floatWrapperRef={floatWrapperRef}
        labelTrackRef={labelTrackRef}
        heroShadowRef={heroShadowRef}
        aboutShadowRef={aboutShadowRef}
      />
    </main>
  );
}
