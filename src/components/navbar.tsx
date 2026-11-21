"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import nitroLogo from "@/assets/nitro-logo.png";
import { NAV_LINKS } from "@/data/navigation";
import { useNavbarScrollState } from "@/hooks/use-navbar-scroll-state";
import { cn } from "@/lib/utils";

const TOGGLE_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function Navbar() {
  const { scrolled, visible, show } = useNavbarScrollState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isShown = visible || mobileOpen;

  return (
    <motion.header
      initial={false}
      animate={isShown ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={isShown ? { duration: 0.38, ease: [0.22, 1, 0.36, 1] } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      onFocus={show}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 will-change-transform",
        scrolled || mobileOpen
          ? "border-b border-white/6 bg-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
        isShown ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        className={cn(
          "nitro-container flex items-center justify-between px-5 transition-[height] duration-300 sm:px-10 lg:px-14 xl:px-22",
          scrolled ? "h-16 sm:h-19" : "h-19 sm:h-27"
        )}
      >
        <a href="#home" aria-label="NiTRO Home" className="shrink-0">
          <Image src={nitroLogo} alt="NiTRO" priority className="h-4.5 w-auto object-contain sm:h-5.5" />
        </a>

        <nav aria-label="Primary" className="mx-8 hidden w-full max-w-212 items-center justify-between lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] leading-6 font-normal text-white transition-colors duration-200 hover:text-nitro-yellow"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#shop"
            className="hidden h-11 w-38.25 items-center justify-center bg-nitro-yellow text-[16px] leading-6 font-medium text-black transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
          >
            Buy Now
          </a>

          {/* Morphing Hamburger <-> Cross Toggle Button */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className={cn(
              "inline-flex h-10 w-10 cursor-pointer items-center justify-center border transition-colors duration-200 lg:hidden",
              mobileOpen
                ? "border-nitro-yellow text-nitro-yellow"
                : "border-white/25 text-white hover:border-nitro-yellow hover:text-nitro-yellow"
            )}
          >
            <span className="relative h-3.5 w-4.5" aria-hidden="true">
              <motion.span
                initial={false}
                animate={mobileOpen ? { y: 6.125, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={TOGGLE_TRANSITION}
                className="absolute top-0 left-0 h-[1.75px] w-full origin-center rounded-full bg-current"
              />
              <motion.span
                initial={false}
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={TOGGLE_TRANSITION}
                className="absolute top-[6.125px] left-0 h-[1.75px] w-full origin-center rounded-full bg-current"
              />
              <motion.span
                initial={false}
                animate={mobileOpen ? { y: -6.125, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={TOGGLE_TRANSITION}
                className="absolute bottom-0 left-0 h-[1.75px] w-full origin-center rounded-full bg-current"
              />
            </span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black/95 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 py-5 sm:px-10">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{
                    duration: 0.22,
                    delay: idx * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-3 text-[17px] text-white transition-colors last:border-b-0 hover:text-nitro-yellow"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#shop"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{
                  duration: 0.22,
                  delay: NAV_LINKS.length * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex h-11 w-full items-center justify-center bg-nitro-yellow text-[16px] font-medium text-black"
              >
                Buy Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
