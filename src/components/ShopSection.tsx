import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { NITRO_PRODUCTS, type NitroProduct } from "../data/products";

interface ShopSectionProps {
  onAddToCart: (product: NitroProduct) => void;
  onSelectSpecs: (product: NitroProduct) => void;
}

export function ShopSection({ onAddToCart, onSelectSpecs }: ShopSectionProps) {
  // Index 2 is Nitro Green — exact default centerpiece from Energy Drink 003
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
      className="nitro-radial-bg relative w-full overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 lg:px-14 xl:px-[88px]">
        {/* Desktop 5-Can Stepped Showcase (matches Energy Drink 003) */}
        <div className="hidden lg:flex items-end justify-between gap-4 xl:gap-8 pt-6 pb-8">
          {NITRO_PRODUCTS.map((product, idx) => {
            const isActive = idx === activeIndex;
            const distance = Math.abs(idx - activeIndex);

            // Visual sizing mirrors Figma: center ~256px, inner ~198px, outer ~168px
            const canWidthClass = isActive
              ? "w-[215px] xl:w-[256px]"
              : distance === 1
                ? "w-[168px] xl:w-[198px]"
                : "w-[142px] xl:w-[168px]";

            const liftClass = isActive ? "translate-y-4" : "translate-y-0";

            return (
              <motion.div
                key={product.id}
                layout
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className={`group flex flex-1 flex-col items-center cursor-pointer ${liftClass}`}
                onClick={() => setActiveIndex(idx)}
              >
                {/* Can + Pedestal Shadow */}
                <div className="relative flex flex-col items-center">
                  {/* Ambient radial aura behind active can */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-6 h-3/4 rounded-full blur-3xl transition-opacity duration-500"
                    style={{
                      background: product.glowColor,
                      opacity: isActive ? 0.32 : 0,
                    }}
                    aria-hidden="true"
                  />

                  <motion.img
                    src={product.image}
                    alt={product.name}
                    animate={{
                      scale: isActive ? 1.02 : 0.96,
                      y: isActive ? -6 : 0,
                    }}
                    whileHover={{ y: -10, scale: isActive ? 1.04 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`relative z-10 ${canWidthClass} h-auto object-contain drop-shadow-[12px_18px_24px_rgba(0,0,0,0.85)]`}
                    draggable={false}
                  />

                  {/* Pedestal Ring / Floor Shadow matching Ellipse 6..10 */}
                  {isActive ? (
                    <div
                      className="-mt-4 h-[34px] xl:h-[40px] w-[225px] xl:w-[265px] rounded-full border border-[#3c3c3c] bg-[#828282]/90 transition-all duration-300"
                      style={{
                        boxShadow: `0 0 26px 2px ${product.glowColor}`,
                      }}
                      aria-hidden="true"
                    />
                  ) : (
                    <div
                      className={`-mt-3 rounded-full bg-[#212121] transition-all duration-300 group-hover:bg-[#333333] ${
                        distance === 1
                          ? "h-[28px] xl:h-[32px] w-[180px] xl:w-[217px]"
                          : "h-[22px] xl:h-[26px] w-[142px] xl:w-[169px]"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Product Metadata */}
                <div className="mt-6 text-center">
                  <h3
                    className="font-display text-[21px] xl:text-[24px] leading-[36px] tracking-wide transition-colors duration-200"
                    style={{ color: isActive ? product.accentColor : "#ffffff" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[16px] xl:text-[17px] font-normal leading-[25.5px] text-white/58">
                    {product.subtitle}
                  </p>
                  <p className="mt-0.5 text-[22px] xl:text-[24px] font-extrabold leading-[36px] text-white">
                    {product.formattedPrice}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Interactive Carousel (< lg) */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="relative flex w-full max-w-[460px] items-center justify-center py-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous flavor"
              className="absolute left-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.28 }}
                className="flex flex-col items-center"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className="pointer-events-none absolute inset-x-4 bottom-6 h-3/4 rounded-full blur-3xl opacity-35"
                    style={{ background: activeProduct.glowColor }}
                    aria-hidden="true"
                  />
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="relative z-10 w-[170px] sm:w-[210px] h-auto object-contain drop-shadow-[0_20px_28px_rgba(0,0,0,0.85)]"
                  />
                  <div
                    className="-mt-3 h-[28px] sm:h-[34px] w-[185px] sm:w-[225px] rounded-full border border-[#3c3c3c] bg-[#828282]/90"
                    style={{
                      boxShadow: `0 0 24px 2px ${activeProduct.glowColor}`,
                    }}
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 text-center">
                  <h3
                    className="font-display text-[24px] sm:text-[26px] leading-[36px]"
                    style={{ color: activeProduct.accentColor }}
                  >
                    {activeProduct.name}
                  </h3>
                  <p className="text-[16px] text-white/58">{activeProduct.subtitle}</p>
                  <p className="mt-0.5 text-[24px] font-extrabold text-white">
                    {activeProduct.formattedPrice}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next flavor"
              className="absolute right-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Flavor Selector Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {NITRO_PRODUCTS.map((product, idx) => {
              const selected = idx === activeIndex;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`px-3.5 py-1.5 text-[13px] font-medium tracking-wide border transition-all cursor-pointer ${
                    selected
                      ? "border-[#e0e600] bg-[#e0e600] text-black"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/50"
                  }`}
                >
                  {product.shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Flavor Action Bar */}
        <motion.div
          key={activeProduct.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-10 flex max-w-[680px] flex-col items-center gap-5 border-t border-white/10 pt-8 text-center"
        >
          <p className="text-[15px] sm:text-[16px] text-white/75">
            <span
              className="font-semibold"
              style={{ color: activeProduct.accentColor }}
            >
              {activeProduct.flavor}
            </span>{" "}
            — {activeProduct.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onAddToCart(activeProduct)}
              className="inline-flex h-[44px] items-center justify-center gap-2.5 bg-[#e0e600] px-7 text-[16px] font-medium text-black transition-all duration-200 hover:bg-[#f2f736] active:scale-[0.98] cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart — {activeProduct.formattedPrice}
            </button>

            <button
              type="button"
              onClick={() => onSelectSpecs(activeProduct)}
              className="inline-flex h-[44px] items-center justify-center gap-2 border border-white/60 px-6 text-[16px] font-medium text-white transition-all duration-200 hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
            >
              <Info className="h-4 w-4" />
              Nutrition Specs
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
