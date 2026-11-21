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
      className="nitro-radial-bg relative flex min-h-svh w-full items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-[11.1vh] lg:pb-[5.1vh]"
    >
      <div className="nitro-container px-5 sm:px-10 lg:px-[3.33%]">
        <h2 className="sr-only">Since 2002 producing</h2>

        <div className="relative flex flex-col items-center gap-7 sm:gap-8 lg:block lg:h-[min(83.8vh,920px)]">
          {/* Left: Rounded 40px Monochrome Athlete Image (z-[5]: behind animated can z-[15]) */}
          <div className="relative w-full max-w-115 sm:max-w-125 lg:h-full lg:w-[49.33%] lg:max-w-221">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-5 max-h-[44svh] w-full overflow-hidden rounded-[28px] sm:max-h-[46svh] sm:rounded-[36px] lg:h-full lg:max-h-none lg:rounded-[40px]"
            >
              <Image
                src={heroSoccer}
                alt="Football athlete in action"
                className="h-full w-full object-cover object-top grayscale"
              />
            </motion.div>

            {/* Mobile/Tablet Horizontal Can Anchor (untransformed for exact GSAP measurement) */}
            <div
              ref={mobileCanAnchorRef}
              className="relative z-10 mx-auto -mt-12 aspect-896/340 w-[92%] sm:-mt-14 sm:w-[82%] lg:hidden"
            >
              {!hideStaticCan && <NitroCan alt="Nitro Green oversized horizontal can" />}
            </div>
          </div>

          {/* Desktop Oversized Horizontal Can Anchor (z-[10]: over photo z-[5], behind tagline z-[25]) */}
          <div className="pointer-events-none absolute inset-y-0 right-[8.48%] left-[8.48%] z-10 hidden items-center justify-center lg:flex">
            <div ref={desktopCanAnchorRef} className="relative aspect-896/340 w-full max-w-372 translate-y-[-2%]">
              {!hideStaticCan && (
                <>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-6%] bottom-[-18%] left-[4%] z-0 h-[38%]"
                    style={{
                      background:
                        "radial-gradient(ellipse 50% 48% at 50% 50%, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.62) 48%, rgba(0, 0, 0, 0) 100%)",
                    }}
                  />
                  <NitroCan alt="Nitro Green oversized horizontal can" className="z-10" />
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
            className="relative z-25 w-[68%] max-w-65 sm:max-w-75 lg:absolute lg:top-[7.9%] lg:right-[0.22%] lg:w-[33.15%] lg:max-w-148.5"
          >
            <Image
              src={since2002Producing}
              alt="Since 2002 producing"
              className="h-auto w-full object-contain"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
