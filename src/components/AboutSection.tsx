"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import canGreenHorizontal from "@/assets/can-green-horizontal.png";
import heroSoccer from "@/assets/hero-soccer.png";
import since2002Producing from "@/assets/since-2002-producing.png";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const canX = useTransform(scrollYProgress, [0, 0.5, 1], [-45, 0, 35]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="nitro-radial-bg relative flex min-h-[100svh] w-full items-center overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-14 xl:px-[64px]">
        <h2 className="sr-only">Since 2002 producing</h2>

        <div className="relative flex flex-col items-center gap-10 lg:block lg:h-[min(84vh,920px)]">
          {/* Left: Rounded 40px Monochrome Athlete Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 w-full max-w-[540px] lg:h-full lg:w-[49.3%] lg:max-w-[884px]"
          >
            <div className="h-full w-full overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px]">
              <Image
                src={heroSoccer}
                alt="Football athlete in action"
                className="h-full w-full object-cover grayscale"
              />
            </div>

            {/* Mobile/Tablet Horizontal Can overlapping lower edge of photo */}
            <div className="relative z-10 -mt-14 mx-auto w-[92%] sm:w-[82%] lg:hidden">
              <Image
                src={canGreenHorizontal}
                alt="Nitro Green oversized horizontal can"
                className="w-full h-auto object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.9)]"
              />
            </div>
          </motion.div>

          {/* Desktop Oversized Horizontal Can (z-10: over photo, behind tagline) */}
          <motion.div
            style={{ x: canX }}
            className="hidden lg:flex pointer-events-none absolute inset-y-0 left-[8%] right-[9%] z-10 items-center justify-center"
          >
            <div className="relative w-full max-w-[1488px]">
              <div
                className="absolute -bottom-[8%] left-[6%] right-[5%] h-[20%] rounded-full bg-black/85 blur-3xl"
                aria-hidden="true"
              />
              <Image
                src={canGreenHorizontal}
                alt="Nitro Green oversized horizontal can"
                className="relative w-full h-auto object-contain drop-shadow-[0_34px_46px_rgba(0,0,0,0.92)]"
              />
            </div>
          </motion.div>

          {/* Right: Exact Sakana Tagline "SiNCE 2002 PROD UCING" (z-20) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 w-[78%] max-w-[380px] lg:absolute lg:right-[1%] lg:top-1/2 lg:-translate-y-1/2 lg:w-[33%] lg:max-w-[594px]"
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
