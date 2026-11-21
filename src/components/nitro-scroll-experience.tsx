"use client";

import { useRef } from "react";
import { useCanScrollTimeline } from "@/hooks/use-can-scroll-timeline";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { AboutSection } from "./about-section";
import { HeroSection } from "./hero-section";
import { ShopSection } from "./shop-section";
import { ScrollCanStage } from "./can/scroll-can-stage";

/**
 * Coordinates Lenis smooth scroll, section layout anchors, and the 3D ScrollCanStage
 * across Hero -> About -> Shop.
 */
export function NitroScrollExperience() {
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

  useSmoothScroll();

  const isAnimatedActive = useCanScrollTimeline({
    mainRef,
    aboutSectionRef,
    shopSectionRef,
    heroCanAnchorRef,
    aboutDesktopCanAnchorRef,
    aboutMobileCanAnchorRef,
    shopDesktopCenterAnchorRef,
    shopMobileCenterAnchorRef,
    shopDesktopPedestalRef,
    shopMobilePedestalRef,
    canStageRef,
    floatWrapperRef,
    labelTrackRef,
    heroShadowRef,
    aboutShadowRef,
  });

  return (
    <main ref={mainRef} className="relative overflow-x-clip">
      <HeroSection canAnchorRef={heroCanAnchorRef} hideStaticCan={isAnimatedActive} />
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
