import { motion } from "motion/react";
import canGreenHorizontal from "../assets/can-green-horizontal.png";
import nitroWordmark from "../assets/nitro-wordmark.png";
import { SocialIcons } from "./SocialIcons";

interface HeroSectionProps {
  onBuyNow: () => void;
}

export function HeroSection({ onBuyNow }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="nitro-radial-bg relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pb-16"
    >
      {/* Top spacer to keep wordmark optically balanced beneath fixed header */}
      <div className="h-2 sm:h-4" aria-hidden="true" />

      {/* Centerpiece: Giant NITRO Wordmark + Floating Horizontal Can */}
      <div className="relative mx-auto my-auto flex w-full max-w-[1920px] items-center justify-center px-3 sm:px-8 lg:px-14 xl:px-[88px] py-8 sm:py-12">
        <h1 className="sr-only">NITRO — High Intensity Energy Drink</h1>

        {/* Giant NITRO Gradient Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1745px] select-none"
        >
          <img
            src={nitroWordmark}
            alt="NITRO"
            className="mx-auto w-full h-auto object-contain pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Overlapping Horizontal Can */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-[65%] sm:w-[58%] lg:w-[51%] max-w-[896px]"
          >
            {/* Soft contact shadow cast onto the giant letters */}
            <div
              className="absolute -bottom-[10%] left-[6%] right-[4%] h-[22%] rounded-full bg-black/80 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={canGreenHorizontal}
              alt="Nitro Green horizontal energy drink can"
              className="relative z-10 w-full h-auto object-contain drop-shadow-[0_24px_34px_rgba(0,0,0,0.85)]"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom 3-Column Row matching Figma Frame 001 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-[88px]"
      >
        <div className="flex flex-col items-center gap-7 text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-8 lg:text-left">
          {/* Subtext */}
          <p className="max-w-[464px] text-[15px] sm:text-[16px] font-normal leading-[24px] text-white/90">
            Fuel your peak performance with zero-sugar, high-intensity energy
            engineered for relentless focus and unstoppable drive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-[33px]">
            <button
              type="button"
              onClick={onBuyNow}
              className="inline-flex h-[44px] w-[142px] sm:w-[153px] items-center justify-center bg-white text-[16px] font-medium leading-[24px] text-black transition-all duration-200 hover:bg-[#e0e600] active:scale-[0.98] cursor-pointer"
            >
              Buy Now
            </button>
            <a
              href="#about"
              className="inline-flex h-[44px] w-[142px] sm:w-[159px] items-center justify-center border border-white text-[16px] font-medium leading-[24px] text-white transition-all duration-200 hover:border-[#e0e600] hover:text-[#e0e600]"
            >
              More info
            </a>
          </div>

          {/* Social Media Circles */}
          <div className="flex justify-center lg:justify-end">
            <SocialIcons />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
