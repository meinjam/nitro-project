import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-black/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] sm:h-[88px] w-full max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-[88px]">
        {/* Brand Logo */}
        <a
          href="#home"
          className="font-display text-[24px] sm:text-[26px] leading-none tracking-[-0.03em] text-[#e0e600] transition-opacity hover:opacity-85"
        >
          NiTRO
        </a>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-12 xl:gap-24 2xl:gap-32"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[16px] font-normal leading-[24px] text-white transition-colors duration-200 hover:text-[#e0e600]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag (${cartCount} items)`}
            className="relative inline-flex h-[40px] w-[40px] sm:h-[44px] sm:w-[44px] items-center justify-center border border-white/20 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e0e600] px-1 text-[11px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="hidden sm:inline-flex h-[44px] w-[153px] items-center justify-center bg-[#e0e600] text-[16px] font-medium leading-[24px] text-black transition-all duration-200 hover:bg-[#f2f736] active:scale-[0.98] cursor-pointer"
          >
            Buy Now
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden h-[40px] w-[40px] items-center justify-center border border-white/20 text-white transition-colors hover:border-[#e0e600] hover:text-[#e0e600] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/10 bg-black/95 lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-1 px-5 py-6 sm:px-8"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="py-3 text-[18px] font-normal text-white/90 transition-colors hover:text-[#e0e600] border-b border-white/5 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenCart();
                }}
                className="mt-4 flex h-[46px] w-full items-center justify-center bg-[#e0e600] text-[16px] font-medium text-black cursor-pointer"
              >
                Buy Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
