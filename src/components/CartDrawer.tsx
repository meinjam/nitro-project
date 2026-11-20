import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { NITRO_PRODUCTS, type NitroProduct } from "../data/products";

export interface CartItem {
  product: NitroProduct;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  orderPlaced: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onAddProduct: (product: NitroProduct) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  items,
  orderPlaced,
  onClose,
  onUpdateQty,
  onAddProduct,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            aria-label="Shopping Bag"
            className="fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-[440px] flex-col border-l border-white/15 bg-[#0a0a0a] text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#e0e600]" />
                <h2 className="font-display text-[20px] tracking-wide text-white">
                  YOUR NITRO PACK
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close bag"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {orderPlaced ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <CheckCircle2 className="h-14 w-14 text-[#e0e600]" />
                  <h3 className="mt-4 font-display text-[24px] text-white">
                    ORDER CONFIRMED
                  </h3>
                  <p className="mt-2 max-w-[300px] text-[15px] text-white/65">
                    Your high-intensity Nitro pack is being prepared for
                    dispatch. Stay charged!
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 h-[44px] bg-[#e0e600] px-8 text-[15px] font-medium text-black hover:bg-[#f2f736] cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <p className="text-[16px] text-white/65">
                    Your bag is currently empty. Pick a flavor below to start:
                  </p>
                  <div className="mt-6 grid w-full grid-cols-1 gap-3">
                    {NITRO_PRODUCTS.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => onAddProduct(product)}
                        className="flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-[#e0e600] cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-6 object-contain"
                          />
                          <div>
                            <p className="font-display text-[15px] text-white">
                              {product.name}
                            </p>
                            <p className="text-[12px] text-white/50">
                              {product.flavor}
                            </p>
                          </div>
                        </div>
                        <span className="text-[14px] font-bold text-[#e0e600]">
                          + {product.formattedPrice}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 border border-white/10 bg-white/[0.03] p-4"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-10 shrink-0 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-[17px] text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-[13px] text-white/55">
                          {product.subtitle} &middot; {product.volume}
                        </p>
                        <p className="mt-1 text-[16px] font-bold text-[#e0e600]">
                          {(product.price * quantity).toFixed(2)} $
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <div className="flex items-center border border-white/20">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, -1)}
                            aria-label="Decrease quantity"
                            className="flex h-7 w-7 items-center justify-center hover:bg-white/10 cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-[13px] font-semibold">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(product.id, 1)}
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center hover:bg-white/10 cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && !orderPlaced && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4 bg-black">
                <div className="flex items-center justify-between text-[16px]">
                  <span className="text-white/70">Subtotal</span>
                  <span className="text-[22px] font-extrabold text-white">
                    {subtotal.toFixed(2)} $
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onCheckout}
                  className="h-[46px] w-full bg-[#e0e600] text-[16px] font-semibold text-black transition-colors hover:bg-[#f2f736] cursor-pointer"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
