import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { NitroProduct } from "../data/products";

interface SpecsModalProps {
  product: NitroProduct | null;
  onClose: () => void;
  onAddToCart: (product: NitroProduct) => void;
}

export function SpecsModal({ product, onClose, onAddToCart }: SpecsModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} nutrition specifications`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto relative w-full max-w-[540px] border border-white/15 bg-[#0c0c0c] p-6 sm:p-8 text-white shadow-2xl">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close specifications"
                className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative flex shrink-0 items-center justify-center py-2">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-35"
                    style={{ background: product.glowColor }}
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative h-56 w-auto object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span
                    className="text-[12px] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: product.accentColor }}
                  >
                    {product.flavor}
                  </span>
                  <h3 className="mt-1 font-display text-[28px] leading-tight text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[22px] text-white/70">
                    {product.description}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-3 text-center">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/45">
                        Caffeine
                      </p>
                      <p className="mt-0.5 text-[15px] font-bold text-white">
                        {product.caffeine}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/45">
                        Energy
                      </p>
                      <p className="mt-0.5 text-[15px] font-bold text-white">
                        {product.calories}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/45">
                        Volume
                      </p>
                      <p className="mt-0.5 text-[15px] font-bold text-white">
                        {product.volume}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-[24px] font-extrabold text-white">
                      {product.formattedPrice}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onAddToCart(product);
                        onClose();
                      }}
                      className="h-[42px] bg-[#e0e600] px-6 text-[15px] font-medium text-black hover:bg-[#f2f736] cursor-pointer"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
