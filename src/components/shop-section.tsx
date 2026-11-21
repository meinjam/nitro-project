"use client";

import type { RefObject } from "react";
import { CENTER_PRODUCT_INDEX, NITRO_PRODUCTS } from "@/data/products";
import { ShopProductCard } from "./shop/shop-product-card";

interface ShopSectionProps {
  sectionRef?: RefObject<HTMLElement | null>;
  desktopCenterCanRef?: RefObject<HTMLDivElement | null>;
  mobileCenterCanRef?: RefObject<HTMLDivElement | null>;
  desktopPedestalRef?: RefObject<HTMLDivElement | null>;
  mobilePedestalRef?: RefObject<HTMLDivElement | null>;
  hideStaticCan?: boolean;
}

const CENTER_PRODUCT = NITRO_PRODUCTS[CENTER_PRODUCT_INDEX];
const FLANKING_PRODUCTS = NITRO_PRODUCTS.filter(
  (_, idx) => idx !== CENTER_PRODUCT_INDEX
);

export function ShopSection({
  sectionRef,
  desktopCenterCanRef,
  mobileCenterCanRef,
  desktopPedestalRef,
  mobilePedestalRef,
  hideStaticCan = false,
}: ShopSectionProps) {
  return (
    <section
      id="shop"
      ref={sectionRef}
      className="nitro-radial-bg relative flex min-h-svh w-full items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="nitro-container px-5 sm:px-8 md:px-12 lg:px-16 xl:px-30">
        {/* Desktop & Tablet 5-Can Stepped Showcase (exact Figma Energy Drink 003) */}
        <div className="hidden md:grid grid-cols-[8.73fr_10.31fr_13.36fr_10.31fr_8.73fr] items-end gap-x-[4vw] lg:gap-x-[5.5vw] xl:gap-x-[7.5vw]">
          {NITRO_PRODUCTS.map((product, idx) => {
            const isCenter = idx === CENTER_PRODUCT_INDEX;
            const isInner = idx === 1 || idx === 3;

            return (
              <ShopProductCard
                key={product.id}
                product={product}
                variant="desktop"
                isCenter={isCenter}
                shadowClassName={
                  isInner
                    ? "w-[109.6%] bottom-[-2.6%]"
                    : "w-[100.8%] bottom-[-2.3%]"
                }
                canAnchorRef={isCenter ? desktopCenterCanRef : undefined}
                pedestalRef={isCenter ? desktopPedestalRef : undefined}
                hideStaticCan={hideStaticCan}
                cardClassName={
                  isCenter ? "translate-y-7.5 xl:translate-y-9.5" : ""
                }
              />
            );
          })}
        </div>

        {/* Mobile Responsive Layout (< md): Center Can Featured + 4 Flanking Cans Grid */}
        <div className="md:hidden flex flex-col items-center gap-12">
          <ShopProductCard
            product={CENTER_PRODUCT}
            variant="mobile"
            isCenter
            canAnchorRef={mobileCenterCanRef}
            pedestalRef={mobilePedestalRef}
            hideStaticCan={hideStaticCan}
            cardClassName="w-47.5 sm:w-55"
          />

          <div className="grid w-full max-w-110 grid-cols-2 gap-x-8 gap-y-10">
            {FLANKING_PRODUCTS.map((product) => (
              <ShopProductCard
                key={product.id}
                product={product}
                variant="mobile"
                canWrapperClassName="w-29.5 sm:w-35"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
