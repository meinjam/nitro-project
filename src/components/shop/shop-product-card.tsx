"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { NitroCan } from "@/components/can/nitro-can";
import type { NitroProduct } from "@/data/products";
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
  shadowClassName = "w-[105%] -bottom-[2.4%]",
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
      className={`flex flex-col items-center select-none ${
        isCenter
          ? "rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e0e600]"
          : ""
      } ${cardClassName}`}
    >
      {/* Can Composition + Exact Figma Floor Ellipse & Right Shadow */}
      <div className={`relative flex items-end justify-center ${canWrapperClassName}`}>
        {isCenter ? (
          <NitroGreenPedestal uid={variant} pedestalRef={pedestalRef} />
        ) : (
          <FlankingCanShadow className={shadowClassName} />
        )}
        <CanRightShadow uid={`${variant}-${product.id}`} />

        {isCenter ? (
          <div ref={canAnchorRef} className="relative z-[10] aspect-[340/896] w-full">
            <NitroCan
              alt={product.name}
              orientation="vertical"
              className={hideStaticCan ? "opacity-0 invisible" : ""}
            />
          </div>
        ) : (
          <NitroCan
            alt={product.name}
            orientation="vertical"
            hueColor={product.hueColor}
            className="z-[10]"
          />
        )}
      </div>

      {/* Product Typography */}
      <div
        className={`relative z-[10] flex flex-col items-center text-center ${
          isDesktop
            ? isCenter
              ? "mt-8 lg:mt-10 xl:mt-[48px]"
              : "mt-7 lg:mt-9 xl:mt-[46px]"
            : isCenter
              ? "mt-8"
              : "mt-6"
        }`}
      >
        <h3 className="sr-only">{product.name}</h3>
        <Image
          src={product.titleImage}
          alt={product.name}
          className={
            isDesktop
              ? "h-[15px] lg:h-[18px] xl:h-[21px] w-auto object-contain"
              : isCenter
                ? "h-[19px] w-auto object-contain"
                : "h-[15px] w-auto object-contain"
          }
          draggable={false}
        />
        <p
          className={
            isDesktop
              ? "mt-1.5 text-[13px] lg:text-[15px] xl:text-[17px] font-normal leading-[1.5] text-white/[0.58] whitespace-nowrap"
              : isCenter
                ? "mt-1.5 text-[16px] text-white/[0.58]"
                : "mt-1 text-[14px] text-white/[0.58]"
          }
        >
          {product.subtitle}
        </p>
        <p
          className={
            isDesktop
              ? "mt-0.5 text-[18px] lg:text-[21px] xl:text-[24px] font-extrabold leading-[1.5] text-white whitespace-nowrap"
              : isCenter
                ? "mt-0.5 text-[22px] font-extrabold text-white"
                : "mt-0.5 text-[18px] font-extrabold text-white"
          }
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}
