"use client";

import type { RefObject } from "react";
import Image from "next/image";
import canBaseHorizontal from "@/assets/can-base-horizontal.png";
import canCoverGreen from "@/assets/can-cover-green.png";
import canHeroShadow from "@/assets/can-hero-shadow.png";

interface ScrollCanStageProps {
  visible: boolean;
  canStageRef: RefObject<HTMLDivElement | null>;
  floatWrapperRef: RefObject<HTMLDivElement | null>;
  labelTrackRef: RefObject<HTMLDivElement | null>;
  heroShadowRef: RefObject<HTMLDivElement | null>;
  aboutShadowRef: RefObject<HTMLDivElement | null>;
}

export function ScrollCanStage({
  visible,
  canStageRef,
  floatWrapperRef,
  labelTrackRef,
  heroShadowRef,
  aboutShadowRef,
}: ScrollCanStageProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* GPU-composited GSAP pivot container (z-[15]: above Hero wordmark & About photo, behind About tagline z-[25]) */}
      <div
        ref={canStageRef}
        className="pointer-events-none absolute top-0 left-0 z-[15] will-change-transform"
        style={{ opacity: 0 }}
      >
        <div ref={floatWrapperRef} className="relative h-full w-full will-change-transform">
          {/* Hero floor shadow (fades out during Phase 1: Hero -> About) */}
          <div
            ref={heroShadowRef}
            className="pointer-events-none absolute -left-[5.6%] -bottom-[27.4%] z-0 w-[121.65%] will-change-transform"
          >
            <Image
              src={canHeroShadow}
              alt=""
              priority
              className="h-auto w-full max-w-none select-none"
              draggable={false}
            />
          </div>

          {/* About deep ground shadow: pure radial gradient (zero live blur filter for 60/120fps scroll) */}
          <div
            ref={aboutShadowRef}
            className="pointer-events-none absolute -bottom-[24%] -left-[4%] -right-[4%] z-0 h-[56%]"
            style={{
              background:
                "radial-gradient(ellipse 50% 48% at 50% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.62) 48%, rgba(0, 0, 0, 0) 100%)",
            }}
          />

          {/* Isolated 3D Can Cylinder: fixed metallic base + 360° wrapping label mask */}
          <div className="relative z-10 isolate h-full w-full">
            {/* Stationary Metallic Aluminum Cylinder with Water Droplets & Silver Top Rim */}
            <Image
              src={canBaseHorizontal}
              alt=""
              priority
              className="h-full w-full object-fill select-none"
              draggable={false}
            />

            {/* Masked Cylindrical Label Wrap (mix-blend-color-burn) */}
            <div
              className="absolute inset-0 overflow-hidden mix-blend-color-burn"
              style={{
                maskImage: `url(${canBaseHorizontal.src})`,
                WebkitMaskImage: `url(${canBaseHorizontal.src})`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            >
              {/* Seamless 2-tile vertical wrap track (yPercent 0 -> 115 = 1 full 360° cylinder roll) */}
              <div
                ref={labelTrackRef}
                className="relative h-full w-[98.27%] will-change-transform"
              >
                {/* Incoming wrapped label tile (rolls in from top/left during Phase 2) */}
                <div className="absolute left-0 -top-[115%] h-full w-full">
                  <Image
                    src={canCoverGreen}
                    alt=""
                    priority
                    className="h-full w-full max-w-none object-fill select-none"
                    draggable={false}
                  />
                </div>

                {/* Black back-of-can cylinder seam separating wrap copies */}
                <div className="absolute left-0 -top-[15.5%] h-[16.5%] w-full bg-black" />

                {/* Initial front-facing label tile */}
                <Image
                  src={canCoverGreen}
                  alt=""
                  priority
                  className="relative h-full w-full max-w-none object-fill select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
