"use client";

import Image from "next/image";
import { motion } from "motion/react";
import canGreenHorizontal from "@/assets/can-green-horizontal.png";
import nitroWordmark from "@/assets/nitro-wordmark.png";
import { SocialIcons } from "./SocialIcons";

export function HeroSection() {
  return (
    <section
      id="home"
      className="nitro-radial-bg relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pb-16"
    >
      <div className="h-2 sm:h-4" aria-hidden="true" />

      {/* Centerpiece: Giant NiTRO Wordmark + Overlapping Horizontal Can */}
      <div className="relative mx-auto my-auto flex w-full max-w-[1920px] items-center justify-center px-4 sm:px-10 lg:px-14 xl:px-[88px] py-8">
        <h1 className="sr-only">NiTRO Energy Drink</h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1760px] select-none"
        >
          <Image
            src={nitroWordmark}
            alt="NiTRO"
            priority
            className="mx-auto w-full h-auto object-contain pointer-events-none"
            draggable={false}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -36, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[65%] sm:w-[56%] lg:w-[51.3%] max-w-[896px]"
          >
            {/* Cast shadow ellipse matching Figma Ellipse 1 */}
            <div
              className="absolute -bottom-[9%] left-[5%] right-[4%] h-[22%] rounded-full bg-black/85 blur-2xl"
              aria-hidden="true"
            />
            <Image
              src={canGreenHorizontal}
              alt="Nitro Green energy drink can"
              priority
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.85)]"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom 3-Zone Bar matching Energy Drink 001 */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-14 xl:px-[88px]"
      >
        <div className="flex flex-col items-center gap-7 text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-8 lg:text-left">
          <p className="max-w-[464px] text-[14px] sm:text-[16px] font-normal uppercase leading-[24px] text-white">
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
