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
              {/* Exact Figma 3-repeat seamless vertical wrap track (pitch = 133%: 100% label + 33% black cylinder back)
                  Hero = 0% (Tile 1) -> About = -266% (Tile 3, 2× 360° spins) -> Shop = -133% (Tile 2, 1× 360° spin) */}
              <div
                ref={labelTrackRef}
                className="relative h-full w-[98.27%] will-change-transform"
              >
                {/* Tile 1 (0% to 100%): Hero resting label */}
                <Image
                  src={canCoverGreen}
                  alt=""
                  priority
                  className="relative h-full w-full max-w-none object-fill select-none"
                  draggable={false}
                />

                {/* Black back-of-can seam 1 (99.5% to 133.5%) */}
                <div className="absolute left-0 top-[99.5%] h-[34%] w-full bg-black" />

                {/* Tile 2 (133% to 233%): Mid-Hero spin & Shop resting label */}
                <div className="absolute left-0 top-[133%] h-full w-full">
                  <Image
                    src={canCoverGreen}
                    alt=""
                    priority
                    className="h-full w-full max-w-none object-fill select-none"
                    draggable={false}
                  />
                </div>

                {/* Black back-of-can seam 2 (232.5% to 266.5%) */}
                <div className="absolute left-0 top-[232.5%] h-[34%] w-full bg-black" />

                {/* Tile 3 (266% to 366%): About resting label */}
                <div className="absolute left-0 top-[266%] h-full w-full">
                  <Image
                    src={canCoverGreen}
                    alt=""
                    priority
                    className="h-full w-full max-w-none object-fill select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
