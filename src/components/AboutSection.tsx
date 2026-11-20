import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import canGreenHorizontal from "../assets/can-green-horizontal.png";
import heroSoccer from "../assets/hero-soccer.png";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const canX = useTransform(scrollYProgress, [0, 0.5, 1], [-55, 0, 45]);
  const canRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 2]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="nitro-radial-bg relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-[88px]">
        {/* Desktop & Tablet Composition (matches Energy Drink 002) */}
        <div className="relative flex flex-col items-center gap-10 lg:block lg:min-h-[680px] xl:min-h-[820px] 2xl:min-h-[920px]">
          {/* Left: Rounded Monochrome Athlete Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 w-full max-w-[540px] lg:w-[50.6%] lg:max-w-[884px]"
          >
            <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-white/10 bg-neutral-950 shadow-[0_30px_80px_rgba(0,0,0,0.85)]">
              <img
                src={heroSoccer}
                alt="Athlete in motion energized by Nitro"
                className="w-full h-auto object-cover grayscale contrast-110"
                loading="lazy"
              />
            </div>

            {/* Mobile/Tablet Horizontal Can overlapping lower edge of photo */}
            <div className="relative z-10 -mt-14 mx-auto w-[92%] sm:w-[82%] lg:hidden">
              <img
                src={canGreenHorizontal}
                alt="Nitro Green oversized horizontal can"
                className="w-full h-auto object-contain drop-shadow-[0_24px_32px_rgba(0,0,0,0.9)]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Desktop Oversized Overlapping Horizontal Can (between photo & headline) */}
          <motion.div
            style={{ x: canX, rotate: canRotate }}
            className="hidden lg:flex pointer-events-none absolute inset-y-0 left-[12%] right-[14%] z-10 items-center justify-center"
          >
            <div className="relative w-full max-w-[1260px] xl:max-w-[1440px]">
              <div
                className="absolute -bottom-[8%] left-[8%] right-[6%] h-[20%] rounded-full bg-black/85 blur-3xl"
                aria-hidden="true"
              />
              <img
                src={canGreenHorizontal}
                alt="Nitro Green oversized horizontal can"
                className="relative w-full h-auto object-contain drop-shadow-[0_36px_48px_rgba(0,0,0,0.92)]"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right: Giant Stacked Yellow Tagline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 text-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:text-left lg:w-[40%] xl:w-[37%] lg:max-w-[600px]"
          >
            <h2 className="font-display uppercase text-[#e0e600] leading-[0.92] tracking-[-0.03em] text-[clamp(3.1rem,13vw,5.4rem)] lg:text-[clamp(5.2rem,8.8vw,10.8rem)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.75)]">
              <span className="block">SINCE</span>
              <span className="block">2002</span>
              <span className="block lg:hidden">PRODUCING</span>
              <span className="hidden lg:block">PROD</span>
              <span className="hidden lg:block">UCING</span>
            </h2>
            <p className="mt-5 max-w-[440px] mx-auto lg:mx-0 text-[15px] sm:text-[16px] leading-[24px] text-white/70">
              Over two decades crafting high-voltage hydration for athletes,
              creators, and night-shift innovators around the globe.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
