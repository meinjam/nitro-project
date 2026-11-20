"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { NITRO_PRODUCTS } from "@/data/products";

export function ShopSection() {
  // Index 2 = Nitro Green (exact Figma default centerpiece)
  const [activeIndex, setActiveIndex] = useState(2);
  const activeProduct = NITRO_PRODUCTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? NITRO_PRODUCTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === NITRO_PRODUCTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="shop"
      className="nitro-radial-bg relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-14 xl:px-[120px]">
        {/* Desktop 5-Can Stepped Showcase matching Energy Drink 003 */}
        <div className="hidden lg:flex items-end justify-between gap-4 xl:gap-8">
          {NITRO_PRODUCTS.map((product, idx) => {
            const isActive = idx === activeIndex;
            const distance = Math.abs(idx - activeIndex);

            const canWidthClass = isActive
              ? "w-[220px] xl:w-[257px]"
              : distance === 1
                ? "w-[172px] xl:w-[198px]"
                : "w-[144px] xl:w-[168px]";

            return (
              <motion.div
                key={product.id}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                onClick={() => setActiveIndex(idx)}
                className={`group flex flex-1 flex-col items-center cursor-pointer ${
                  isActive ? "translate-y-[34px]" : "translate-y-0"
                }`}
              >
                {/* Can + Floor Ellipse */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.98,
                      y: isActive ? -4 : 0,
                    }}
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`relative z-10 ${canWidthClass}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-auto object-contain drop-shadow-[12px_16px_22px_rgba(0,0,0,0.85)]"
                      draggable={false}
                    />
                  </motion.div>

                  {isActive ? (
                    <div
                      className="-mt-4 h-[34px] xl:h-[40px] w-[228px] xl:w-[265px] rounded-full border border-[#3c3c3c] bg-[#828282]"
                      style={{
                        boxShadow: `0 0 28px 2px ${product.glowColor}`,
                      }}
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className={`-mt-3 rounded-full bg-[#212121] transition-colors duration-300 group-hover:bg-[#2c2c2c] ${
                        distance === 1
                          ? "h-[28px] xl:h-[33px] w-[184px] xl:w-[217px]"
                          : "h-[22px] xl:h-[26px] w-[144px] xl:w-[169px]"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Product Info: Sakana White Title + High intensity + Price */}
                <div className="mt-6 flex flex-col items-center text-center">
                  <h3 className="sr-only">{product.name}</h3>
                  <Image
                    src={product.titleImage}
                    alt={product.name}
                    className="h-[19px] xl:h-[21px] w-auto object-contain"
                    draggable={false}
                  />
                  <p className="mt-1.5 text-[16px] xl:text-[17px] font-normal leading-[25.5px] text-white/[0.58]">
                    {product.subtitle}
                  </p>
                  <p className="mt-0.5 text-[22px] xl:text-[24px] font-extrabold leading-[36px] text-white">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Responsive Carousel (< lg) */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="relative flex w-full max-w-[420px] items-center justify-center py-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous flavor"
              className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col items-center"
              >
                <div className="relative flex flex-col items-center">
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="relative z-10 w-[180px] sm:w-[220px] h-auto object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.85)]"
                  />
                  <div
                    className="-mt-3 h-[28px] sm:h-[34px] w-[190px] sm:w-[230px] rounded-full border border-[#3c3c3c] bg-[#828282]"
                    style={{
                      boxShadow: `0 0 24px 2px ${activeProduct.glowColor}`,
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-6 flex flex-col items-center text-center">
                  <h3 className="sr-only">{activeProduct.name}</h3>
                  <Image
                    src={activeProduct.titleImage}
                    alt={activeProduct.name}
                    className="h-[20px] sm:h-[22px] w-auto object-contain"
                  />
                  <p className="mt-1.5 text-[16px] text-white/[0.58]">
                    {activeProduct.subtitle}
                  </p>
                  <p className="mt-0.5 text-[24px] font-extrabold text-white">
                    {activeProduct.price}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next flavor"
              className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Minimal Dots Indicator */}
          <div className="mt-5 flex items-center gap-2.5">
            {NITRO_PRODUCTS.map((product, idx) => (
              <button
                key={product.id}
                type="button"
                aria-label={`Select ${product.name}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "w-7 bg-[#e0e600]"
                    : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
