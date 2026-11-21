"use client";

import type { RefObject } from "react";
import Image from "next/image";
import canHeroShadow from "@/assets/can-hero-shadow.png";
import { cn } from "@/lib/utils";
import { NitroCan } from "./nitro-can";

interface ScrollCanStageProps {
  visible: boolean;
  canStageRef: RefObject<HTMLDivElement | null>;
  floatWrapperRef: RefObject<HTMLDivElement | null>;
  labelTrackRef: RefObject<HTMLDivElement | null>;
  heroShadowRef: RefObject<HTMLDivElement | null>;
  aboutShadowRef: RefObject<HTMLDivElement | null>;
}

/**
 * Floating GPU-composited stage (`z-15`) that animates the NiTRO GREEN can
 * across Hero -> About (behind tagline `z-25`) -> Shop center pedestal.
 */
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
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        ref={canStageRef}
        className="pointer-events-none absolute top-0 left-0 z-15 will-change-transform"
        style={{ opacity: 0 }}
      >
        <div ref={floatWrapperRef} className="relative h-full w-full will-change-transform">
          {/* Hero floor shadow (fades out during Phase 1: Hero -> About) */}
          <div
            ref={heroShadowRef}
            className="pointer-events-none absolute left-[-5.6%] bottom-[-27.4%] z-0 w-[121.65%] will-change-transform"
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
            className="pointer-events-none absolute bottom-[-24%] left-[-4%] right-[-4%] z-0 h-[56%]"
            style={{
              background:
                "radial-gradient(ellipse 50% 48% at 50% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.62) 48%, rgba(0, 0, 0, 0) 100%)",
            }}
          />

          <NitroCan
            labelMode="triple-wrap"
            labelTrackRef={labelTrackRef}
            priority
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
}
