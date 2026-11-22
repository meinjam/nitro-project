"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import nitroWordmark from "@/assets/nitro-wordmark.png";
import { usePreloaderProgress } from "@/hooks/use-preloader-progress";
import { cn } from "@/lib/utils";

const SHUTTER_EASE = [0.76, 0, 0.24, 1] as const;

export function NitroPreloader() {
  const { progress, isCharged, isVisible, reducedMotion } = usePreloaderProgress();

  const formattedProgress = String(progress).padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label={`Loading NiTRO Energy Drink, ${progress}%`}
          exit={{
            transition: { duration: reducedMotion ? 0.15 : 0.76 },
          }}
          className={cn("fixed inset-0 z-100 overflow-hidden select-none", isCharged && "pointer-events-none")}
        >
          {/* Top Shutter Curtain */}
          <motion.div
            aria-hidden="true"
            initial={{ y: "0%" }}
            exit={
              reducedMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    y: "-100%",
                    transition: { duration: 0.74, ease: SHUTTER_EASE },
                  }
            }
            className="absolute inset-x-0 top-0 h-1/2 border-b border-white/6 bg-black will-change-transform"
          />

          {/* Bottom Shutter Curtain */}
          <motion.div
            aria-hidden="true"
            initial={{ y: "0%" }}
            exit={
              reducedMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    y: "100%",
                    transition: { duration: 0.74, ease: SHUTTER_EASE },
                  }
            }
            className="absolute inset-x-0 bottom-0 h-1/2 border-t border-white/6 bg-black will-change-transform"
          />

          {/* Center Hairline Neon Seam (expands from center 0% -> 100% along shutter split) */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2 bg-white/8"
          >
            <div
              className="h-full w-full origin-center bg-nitro-yellow will-change-transform"
              style={{
                transform: `scaleX(${progress / 100})`,
                boxShadow: "0 0 12px rgba(224, 230, 0, 0.7)",
              }}
            />
          </motion.div>

          {/* Centerpiece: Kinetic NiTRO Wordmark Left-to-Right Fill Reveal */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0, transition: { duration: 0.15 } }
                : {
                    opacity: 0,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }
            }
            className="relative z-20 flex h-full w-full flex-col items-center justify-center px-8"
          >
            <div className="relative w-full max-w-65 sm:max-w-95 lg:max-w-115">
              {/* Subtle dim ghost wordmark */}
              <Image
                src={nitroWordmark}
                alt="NiTRO"
                priority
                className="h-auto w-full object-contain opacity-[0.14] brightness-150 grayscale"
                draggable={false}
              />

              {/* Bright neon NiTRO wordmark sweeping left -> right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  clipPath: `inset(0 ${100 - progress}% 0 0)`,
                }}
              >
                <Image src={nitroWordmark} alt="" priority className="h-auto w-full object-contain" draggable={false} />
              </div>
            </div>

            {/* Minimal tabular percentage counter */}
            <div className="mt-7 flex items-center gap-3 text-[12px] font-medium tracking-[0.28em] uppercase tabular-nums sm:text-[13px]">
              <span className="text-white/40">Loading</span>
              <span className="h-px w-6 bg-white/20" aria-hidden="true" />
              <span
                className={cn(
                  "font-semibold transition-colors duration-200",
                  isCharged ? "text-nitro-yellow" : "text-white/85"
                )}
              >
                {formattedProgress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
