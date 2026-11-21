"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import nitroLogo from "@/assets/nitro-logo.png";
import { NAV_LINKS } from "@/data/navigation";
import { useNavbarScrollState } from "@/hooks/use-navbar-scroll-state";

export function Navbar() {
  const { scrolled, visible, show } = useNavbarScrollState();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isShown = visible || mobileOpen;

  return (
    <motion.header
      initial={false}
      animate={isShown ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }}
      transition={
        isShown
          ? { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }
      onFocus={show}
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-white/[0.06] bg-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      } ${isShown ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1920px] items-center justify-between px-5 sm:px-10 lg:px-14 xl:px-[88px] transition-[height] duration-300 ${
          scrolled ? "h-[64px] sm:h-[76px]" : "h-[76px] sm:h-[108px]"
        }`}
      >
        <a href="#home" aria-label="NiTRO Home" className="shrink-0">
          <Image
            src={nitroLogo}
            alt="NiTRO"
            priority
            className="h-[18px] sm:h-[22px] w-auto object-contain"
          />
        </a>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center justify-between w-full max-w-[848px] mx-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[16px] font-normal leading-[24px] text-white transition-colors duration-200 hover:text-[#e0e600]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#shop"
            className="hidden sm:inline-flex h-[44px] w-[153px] items-center justify-center bg-[#e0e600] text-[16px] font-medium leading-[24px] text-black transition-opacity duration-200 hover:opacity-90"
          >
            Buy Now
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden h-[40px] w-[40px] items-center justify-center border border-white/25 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/10 bg-black/95 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 py-5 sm:px-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-3 text-[17px] text-white transition-colors hover:text-[#e0e600] last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#shop"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex h-[44px] w-full items-center justify-center bg-[#e0e600] text-[16px] font-medium text-black"
              >
                Buy Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
