"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import heroSoccer from "@/assets/hero-soccer.png";
import since2002Producing from "@/assets/since-2002-producing.png";
import { NitroCan } from "./can/nitro-can";

interface AboutSectionProps {
  sectionRef?: RefObject<HTMLElement | null>;
  desktopCanAnchorRef?: RefObject<HTMLDivElement | null>;
  mobileCanAnchorRef?: RefObject<HTMLDivElement | null>;
  hideStaticCan?: boolean;
}

export function AboutSection({
  sectionRef,
  desktopCanAnchorRef,
  mobileCanAnchorRef,
  hideStaticCan = false,
}: AboutSectionProps) {
  return (
    <section
      id="about"
      ref={sectionRef}
      className="nitro-radial-bg relative flex min-h-[100svh] w-full items-center overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-14 xl:px-[64px]">
        <h2 className="sr-only">Since 2002 producing</h2>

        <div className="relative flex flex-col items-center gap-10 lg:block lg:h-[min(84vh,920px)]">
          {/* Left: Rounded 40px Monochrome Athlete Image (z-[5]: behind animated can z-[15]) */}
          <div className="relative w-full max-w-[540px] lg:h-full lg:w-[49.3%] lg:max-w-[884px]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[5] h-full w-full overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px]"
            >
              <Image
                src={heroSoccer}
                alt="Football athlete in action"
                className="h-full w-full object-cover grayscale"
              />
            </motion.div>

            {/* Mobile/Tablet Horizontal Can Anchor (untransformed for exact GSAP measurement) */}
            <div
              ref={mobileCanAnchorRef}
              className="relative z-[10] -mt-14 mx-auto aspect-[896/340] w-[92%] sm:w-[82%] lg:hidden"
            >
              {!hideStaticCan && (
                <NitroCan alt="Nitro Green oversized horizontal can" />
              )}
            </div>
          </div>

          {/* Desktop Oversized Horizontal Can Anchor (z-[10]: over photo z-[5], behind tagline z-[25]) */}
          <div className="hidden lg:flex pointer-events-none absolute inset-y-0 left-[8%] right-[9%] z-[10] items-center justify-center">
            <div
              ref={desktopCanAnchorRef}
              className="relative aspect-[896/340] w-full max-w-[1488px]"
            >
              {!hideStaticCan && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[24%] -left-[4%] -right-[4%] z-0 h-[56%]"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 48% at 50% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.62) 48%, rgba(0, 0, 0, 0) 100%)",
                    }}
                  />
                  <NitroCan
                    alt="Nitro Green oversized horizontal can"
                    className="z-10"
                  />
                </>
              )}
            </div>
          </div>

          {/* Right: Tagline "SiNCE 2002 PROD UCING" (z-[25]: IN FRONT OF animated can z-[15]) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[25] w-[78%] max-w-[380px] lg:absolute lg:right-[1%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[33%] lg:max-w-[594px]"
          >
            <Image
              src={since2002Producing}
              alt="Since 2002 producing"
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
