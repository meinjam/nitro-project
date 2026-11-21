"use client";

import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import canBaseHorizontal from "@/assets/can-base-horizontal.png";
import canCoverGreenWrap from "@/assets/can-cover-green-wrap.png";
import { cn } from "@/lib/utils";

/** Exact Figma `Cover` Y-offsets (% of can height) for the 3-repeat 432.07%-tall wrap texture. */
export const CAN_WRAP_OFFSETS = {
  hero: -27.57,
  about: -295.31,
  shop: -163.54,
} as const;

interface NitroCanProps {
  alt?: string;
  orientation?: "horizontal" | "vertical";
  /** Optional Figma `Pack 1` HUE solid fill color (e.g. `#ff8000`, `#ff0000`, `#00b2ff`, `#0004ff`). */
  hueColor?: string;
  /** Attach a ref to animate the single 3-repeat wrap track's `yPercent` with GSAP. */
  labelTrackRef?: RefObject<HTMLDivElement | null>;
  priority?: boolean;
  className?: string;
}

const CAN_MASK_STYLE: CSSProperties = {
  maskImage: `url(${canBaseHorizontal.src})`,
  WebkitMaskImage: `url(${canBaseHorizontal.src})`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/**
 * Single source of truth for the Figma layered NiTRO aluminum can composition:
 *  1. Metallic aluminum cylinder base with water droplets & silver top rim (`can-base-horizontal.png`)
 *  2. Masked `mix-blend-color-burn` single 3-repeat seamless wrap (`can-cover-green-wrap.png`, 432.07% height)
 *  3. Optional isolated `mix-blend-hue` solid tint matching Figma `Pack 1` flavor nodes
 */
export function NitroCan({
  alt = "",
  orientation = "horizontal",
  hueColor,
  labelTrackRef,
  priority = false,
  className = "",
}: NitroCanProps) {
  const staticOffset = orientation === "vertical" ? CAN_WRAP_OFFSETS.shop : CAN_WRAP_OFFSETS.hero;

  const canBody = (
    <div className="relative isolate h-full w-full">
      <Image
        src={canBaseHorizontal}
        alt={orientation === "horizontal" ? alt : ""}
        priority={priority}
        className="h-full w-full object-fill select-none"
        draggable={false}
      />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden mix-blend-color-burn" style={CAN_MASK_STYLE}>
        <div
          ref={labelTrackRef}
          className="relative isolate h-full w-[98.27%] will-change-transform"
          style={labelTrackRef ? undefined : { transform: `translate3d(0, ${staticOffset}%, 0)` }}
        >
          <Image
            src={canCoverGreenWrap}
            alt=""
            priority={priority}
            className="h-[432.07%] w-full max-w-none object-fill select-none"
            draggable={false}
          />
          {hueColor && (
            <div
              className="pointer-events-none absolute top-0 left-0 h-[432.07%] w-full mix-blend-hue"
              style={{ backgroundColor: hueColor }}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (orientation === "vertical") {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn("relative aspect-[340/896] w-full select-none", className)}
      >
        {/* Rotate native 896×340 composition -90° so it fills 340×896 upright */}
        <div className="absolute top-1/2 left-1/2 h-[37.9464%] w-[263.5294%] -translate-x-1/2 -translate-y-1/2 -rotate-90">
          {canBody}
        </div>
      </div>
    );
  }

  return <div className={cn("relative h-full w-full select-none", className)}>{canBody}</div>;
}
