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
}

/**
 * Floating GPU-composited stage (`z-15`) that animates the NiTRO GREEN can
 * along with its attached Figma `Ellipse 1` shadow (`can-hero-shadow.png`):
 * underneath the horizontal can in Hero & About, and rotating smoothly to the
 * right side of the vertical can (-90deg) upon landing in Shop.
 */
export function ScrollCanStage({ visible, canStageRef, floatWrapperRef, labelTrackRef }: ScrollCanStageProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 select-none", visible ? "opacity-100" : "opacity-0")}
    >
      <div
        ref={canStageRef}
        className="pointer-events-none absolute top-0 left-0 z-15 will-change-transform"
        style={{ opacity: 0 }}
      >
        <div ref={floatWrapperRef} className="relative h-full w-full will-change-transform">
          {/* Attached Figma Ellipse 1 shadow: travels & rotates -90deg with the can into Shop's right-side shadow */}
          <div className="pointer-events-none absolute bottom-[-27.4%] left-[-5.6%] z-0 w-[121.65%]">
            <Image
              src={canHeroShadow}
              alt=""
              priority
              className="h-auto w-full max-w-none select-none"
              draggable={false}
            />
          </div>

          <NitroCan labelTrackRef={labelTrackRef} priority className="z-10" />
        </div>
      </div>
    </div>
  );
}
