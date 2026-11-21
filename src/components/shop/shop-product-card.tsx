"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { NitroCan } from "@/components/can/nitro-can";
import type { NitroProduct } from "@/data/products";
import { cn } from "@/lib/utils";
import {
  CanRightShadow,
  FlankingCanShadow,
  NitroGreenPedestal,
} from "./shop-shadows";

interface ShopProductCardProps {
  product: NitroProduct;
  variant: "desktop" | "mobile";
  isCenter?: boolean;
  shadowClassName?: string;
  canAnchorRef?: RefObject<HTMLDivElement | null>;
  pedestalRef?: RefObject<HTMLDivElement | null>;
  hideStaticCan?: boolean;
  cardClassName?: string;
  canWrapperClassName?: string;
}

export function ShopProductCard({
  product,
  variant,
  isCenter = false,
  shadowClassName = "w-[105%] bottom-[-2.4%]",
  canAnchorRef,
  pedestalRef,
  hideStaticCan = false,
  cardClassName = "",
  canWrapperClassName = "w-full",
}: ShopProductCardProps) {
  const isDesktop = variant === "desktop";

  return (
    <div
      tabIndex={isCenter ? 0 : undefined}
      aria-label={
        isCenter
          ? `${product.name}, ${product.subtitle}, ${product.price}`
          : undefined
      }
      className={cn(
        "flex flex-col items-center select-none",
        isCenter &&
          "rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e0e600]",
        cardClassName
      )}
    >
      {/* Can Composition + Exact Figma Floor Ellipse & Right Shadow */}
      <div className={cn("relative flex items-end justify-center", canWrapperClassName)}>
        {isCenter ? (
          <NitroGreenPedestal uid={variant} pedestalRef={pedestalRef} />
        ) : (
          <FlankingCanShadow className={shadowClassName} />
        )}
        <CanRightShadow uid={`${variant}-${product.id}`} />

        {isCenter ? (
          <div ref={canAnchorRef} className="relative z-10 aspect-340/896 w-full">
            <NitroCan
              alt={product.name}
              orientation="vertical"
              className={cn(hideStaticCan && "opacity-0 invisible")}
            />
          </div>
        ) : (
          <NitroCan
            alt={product.name}
            orientation="vertical"
            hueColor={product.hueColor}
            className="z-10"
          />
        )}
      </div>

      {/* Product Typography */}
      <div
        className={cn(
          "relative z-10 flex flex-col items-center text-center",
          isDesktop
            ? isCenter
              ? "mt-8 lg:mt-10 xl:mt-12"
              : "mt-7 lg:mt-9 xl:mt-11.5"
            : isCenter
              ? "mt-8"
              : "mt-6"
        )}
      >
        <h3 className="sr-only">{product.name}</h3>
        <Image
          src={product.titleImage}
          alt={product.name}
          className={cn(
            "w-auto object-contain",
            isDesktop
              ? "h-3.75 lg:h-4.5 xl:h-5.25"
              : isCenter
                ? "h-4.75"
                : "h-3.75"
          )}
          draggable={false}
        />
        <p
          className={cn(
            "text-white/[0.58]",
            isDesktop
              ? "mt-1.5 text-[13px] lg:text-[15px] xl:text-[17px] font-normal leading-normal whitespace-nowrap"
              : isCenter
                ? "mt-1.5 text-[16px]"
                : "mt-1 text-[14px]"
          )}
        >
          {product.subtitle}
        </p>
        <p
          className={cn(
            "mt-0.5 font-extrabold text-white",
            isDesktop
              ? "text-[18px] lg:text-[21px] xl:text-[24px] leading-normal whitespace-nowrap"
              : isCenter
                ? "text-[22px]"
                : "text-[18px]"
          )}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}
