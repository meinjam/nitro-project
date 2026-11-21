"use client";

import type { CSSProperties, RefObject } from "react";
import Image from "next/image";
import canBaseHorizontal from "@/assets/can-base-horizontal.png";
import canCoverGreen from "@/assets/can-cover-green.png";
import { cn } from "@/lib/utils";

interface NitroCanProps {
  alt?: string;
  orientation?: "horizontal" | "vertical";
  /** Optional Figma `Pack 1` HUE solid fill color (e.g. `#ff8000`, `#ff0000`, `#00b2ff`, `#0004ff`). */
  hueColor?: string;
  /** `triple-wrap` mounts the 3-repeat 133%-pitch vertical track for 360° cylindrical scroll spins. */
  labelMode?: "single" | "triple-wrap";
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
 *  2. Masked `mix-blend-color-burn` label wrap (`can-cover-green.png`) covering 98.27% width
 *  3. Optional isolated `mix-blend-hue` solid tint matching Figma `Pack 1` flavor nodes
 */
export function NitroCan({
  alt = "",
  orientation = "horizontal",
  hueColor,
  labelMode = "single",
  labelTrackRef,
  priority = false,
  className = "",
}: NitroCanProps) {
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
        {labelMode === "triple-wrap" ? (
          <div ref={labelTrackRef} className="relative h-full w-[98.27%] will-change-transform">
            {/* Tile 1 (0%..100%): Hero resting label */}
            <Image
              src={canCoverGreen}
              alt=""
              priority={priority}
              className="relative h-full w-full max-w-none object-fill select-none"
              draggable={false}
            />
            {/* Black back-of-can seam 1 */}
            <div className="absolute top-[99.5%] left-0 h-[34%] w-full bg-black" />
            {/* Tile 2 (133%..233%): Mid-Hero spin & Shop resting label */}
            <div className="absolute top-[133%] left-0 h-full w-full">
              <Image
                src={canCoverGreen}
                alt=""
                priority={priority}
                className="h-full w-full max-w-none object-fill select-none"
                draggable={false}
              />
            </div>
            {/* Black back-of-can seam 2 */}
            <div className="absolute top-[232.5%] left-0 h-[34%] w-full bg-black" />
            {/* Tile 3 (266%..366%): About resting label */}
            <div className="absolute top-[266%] left-0 h-full w-full">
              <Image
                src={canCoverGreen}
                alt=""
                priority={priority}
                className="h-full w-full max-w-none object-fill select-none"
                draggable={false}
              />
            </div>
          </div>
        ) : (
          <div className="relative isolate h-full w-[98.27%]">
            <Image
              src={canCoverGreen}
              alt=""
              priority={priority}
              className="h-full w-full max-w-none object-fill select-none"
              draggable={false}
            />
            {hueColor && (
              <div
                className="pointer-events-none absolute inset-0 mix-blend-hue"
                style={{ backgroundColor: hueColor }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (orientation === "vertical") {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        className={cn("relative aspect-340/896 w-full select-none", className)}
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
