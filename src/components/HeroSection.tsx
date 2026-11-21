"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import canBaseHorizontal from "@/assets/can-base-horizontal.png";
import canCoverGreen from "@/assets/can-cover-green.png";
import canHeroShadow from "@/assets/can-hero-shadow.png";
import nitroWordmark from "@/assets/nitro-wordmark.png";
import { SocialIcons } from "./SocialIcons";

interface HeroSectionProps {
  canAnchorRef?: RefObject<HTMLDivElement | null>;
  hideStaticCan?: boolean;
}

export function HeroSection({
  canAnchorRef,
  hideStaticCan = false,
}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="nitro-radial-bg relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pb-16"
    >
      <div className="h-2 sm:h-4" aria-hidden="true" />

      {/* Centerpiece: Giant NiTRO Wordmark + Figma Layered Can Anchor (1:40) */}
      <div className="relative mx-auto my-auto flex w-full max-w-[1920px] items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-[88px] py-8">
        <h1 className="sr-only">NiTRO Energy Drink</h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[5] w-full max-w-[1760px] select-none"
        >
          <Image
            src={nitroWordmark}
            alt="NiTRO"
            priority
            className="mx-auto w-full h-auto object-contain pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Untransformed layout anchor for pixel-accurate GSAP ScrollTrigger measurements */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            ref={canAnchorRef}
            className="relative aspect-[896/340] w-[65%] sm:w-[56%] lg:w-[51.3%] max-w-[896px]"
          >
            {/* Static / reduced-motion fallback can (hidden once ScrollCanStage takes over) */}
            <motion.div
              initial={{ opacity: 0, x: -36, scale: 0.94 }}
              animate={{ opacity: hideStaticCan ? 0 : 1, x: 0, scale: 1 }}
              transition={{
                duration: hideStaticCan ? 0 : 0.85,
                delay: hideStaticCan ? 0 : 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`h-full w-full ${hideStaticCan ? "invisible" : ""}`}
            >
              <motion.div
                animate={hideStaticCan ? undefined : { y: [-4, 4, -4] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                {/* Child 1 (1:41): Ellipse 1 Shadow */}
                <Image
                  src={canHeroShadow}
                  alt=""
                  aria-hidden="true"
                  priority
                  className="pointer-events-none absolute -left-[5.6%] -bottom-[27.4%] z-0 w-[121.65%] max-w-none h-auto select-none"
                  draggable={false}
                />

                {/* Isolated Can Body Composition (1:42 + 1:43 Mask Group) */}
                <div className="relative z-10 isolate h-full w-full">
                  {/* Child 2 (1:42): Metallic Aluminum Can Base with Water Droplets */}
                  <Image
                    src={canBaseHorizontal}
                    alt="Nitro Green energy drink can"
                    priority
                    className="h-full w-full object-fill select-none"
                    draggable={false}
                  />

                  {/* Child 3 (1:43): Mask group (1:44 Can silhouette + 1:45 Cover wrap) */}
                  <div
                    aria-hidden="true"
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
                    <Image
                      src={canCoverGreen}
                      alt=""
                      priority
                      className="h-full w-[98.27%] max-w-none object-fill select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom 3-Zone Bar matching Energy Drink 001 (z-[10]: clickable at rest, passes behind growing can during scroll) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="relative z-[10] mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-14 xl:px-[88px]"
      >
        <div className="flex flex-col items-center gap-7 text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-8 lg:text-left">
          <p className="max-w-[495px] text-[14px] sm:text-[15px] xl:text-[16px] font-normal uppercase leading-[24px] text-white">
            Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-[33px]">
            <a
              href="#shop"
              className="inline-flex h-[44px] w-[142px] sm:w-[153px] items-center justify-center bg-white text-[16px] font-medium leading-[24px] text-black transition-colors duration-200 hover:bg-[#e0e600]"
            >
              Buy Now
            </a>
            <a
              href="#about"
              className="inline-flex h-[44px] w-[142px] sm:w-[159px] items-center justify-center border border-white text-[16px] font-medium leading-[24px] text-white transition-colors duration-200 hover:border-[#e0e600] hover:text-[#e0e600]"
            >
              More info
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <SocialIcons />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
