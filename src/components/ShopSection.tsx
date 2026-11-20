"use client";

import Image from "next/image";
import { NITRO_PRODUCTS } from "@/data/products";

function CanRightShadow({ uid }: { uid: string }) {
  const filterId = `filter0_f_1_236_${uid}`;

  return (
    <svg
      viewBox="0 0 130 578"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 -right-[40%] z-[5] w-[77.5%] h-[130.8%] -translate-y-1/2"
    >
      <g filter={`url(#${filterId})`}>
        <ellipse cx="64.9174" cy="288.939" rx="21.8602" ry="245.882" fill="black" />
      </g>
      <defs>
        <filter
          id={filterId}
          x="4.57764e-05"
          y="0"
          width="129.835"
          height="577.879"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="21.5286"
            result="effect1_foregroundBlur_1_236"
          />
        </filter>
      </defs>
    </svg>
  );
}

function FlankingCanShadow({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 217 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none absolute left-1/2 z-0 h-auto -translate-x-1/2 ${className}`}
    >
      <ellipse cx="108.5" cy="16.3774" rx="108.5" ry="16.3774" fill="#212121" />
    </svg>
  );
}

function NitroGreenPedestal({ uid }: { uid: string }) {
  const filterId = `filter0_d_1_176_${uid}`;
  const maskId = `stroke0_1_176_${uid}`;

  return (
    <svg
      viewBox="0 0 325 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 -bottom-[6.9%] z-0 w-[126.65%] h-auto -translate-x-1/2"
    >
      <g filter={`url(#${filterId})`}>
        <ellipse cx="162.4" cy="45.9" rx="132.5" ry="20" fill="#828282" />
        <mask id={maskId} fill="white">
          <path d="M294.9 45.9C294.9 56.9457 235.578 65.9 162.4 65.9C89.2223 65.9 29.9 56.9457 29.9 45.9C29.9 34.8543 89.2223 25.9 162.4 25.9C235.578 25.9 294.9 34.8543 294.9 45.9Z" />
        </mask>
        <ellipse
          cx="162.4"
          cy="45.9"
          rx="132.5"
          ry="20"
          strokeWidth="6"
          stroke="#3C3C3C"
          mask={`url(#${maskId})`}
        />
      </g>
      <defs>
        <filter
          id={filterId}
          x="2.47955e-05"
          y="-5.72205e-06"
          width="324.8"
          height="99.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="14.95" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.878431 0 0 0 0 0.901961 0 0 0 0 0 0 0 0 0.36 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_176"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_176"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export function ShopSection() {
  return (
    <section
      id="shop"
      className="nitro-radial-bg relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-[120px]">
        {/* Desktop & Tablet 5-Can Stepped Showcase (exact Energy Drink 003, non-clickable, only center focusable) */}
        <div className="hidden md:grid grid-cols-[8.73fr_10.31fr_13.36fr_10.31fr_8.73fr] items-end gap-x-[4vw] lg:gap-x-[5.5vw] xl:gap-x-[7.5vw]">
          {NITRO_PRODUCTS.map((product, idx) => {
            const isCenter = idx === 2;
            const isInner = idx === 1 || idx === 3;

            return (
              <div
                key={product.id}
                tabIndex={isCenter ? 0 : undefined}
                aria-label={
                  isCenter
                    ? `${product.name}, ${product.subtitle}, ${product.price}`
                    : undefined
                }
                className={`flex flex-col items-center select-none ${
                  isCenter
                    ? "translate-y-[30px] xl:translate-y-[38px] rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e0e600]"
                    : ""
                }`}
              >
                {/* Can Image + Exact Figma Floor Ellipse */}
                <div className="relative flex w-full items-end justify-center">
                  {isCenter ? (
                    <NitroGreenPedestal uid="desktop" />
                  ) : (
                    <FlankingCanShadow
                      className={
                        isInner
                          ? "w-[109.6%] -bottom-[2.6%]"
                          : "w-[100.8%] -bottom-[2.3%]"
                      }
                    />
                  )}
                  <CanRightShadow uid={`desktop-${product.id}`} />
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-auto object-contain"
                    draggable={false}
                  />
                </div>

                {/* Product Info */}
                <div
                  className={`flex flex-col items-center text-center ${
                    isCenter
                      ? "mt-8 lg:mt-10 xl:mt-[48px]"
                      : "mt-7 lg:mt-9 xl:mt-[46px]"
                  }`}
                >
                  <h3 className="sr-only">{product.name}</h3>
                  <Image
                    src={product.titleImage}
                    alt={product.name}
                    className="h-[15px] lg:h-[18px] xl:h-[21px] w-auto object-contain"
                    draggable={false}
                  />
                  <p className="mt-1.5 text-[13px] lg:text-[15px] xl:text-[17px] font-normal leading-[1.5] text-white/[0.58] whitespace-nowrap">
                    {product.subtitle}
                  </p>
                  <p className="mt-0.5 text-[18px] lg:text-[21px] xl:text-[24px] font-extrabold leading-[1.5] text-white whitespace-nowrap">
                    {product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Responsive Layout (< md): Center Can Featured + 4 Flanking Cans Grid */}
        <div className="md:hidden flex flex-col items-center gap-12">
          {(() => {
            const center = NITRO_PRODUCTS[2];
            return (
              <div
                tabIndex={0}
                aria-label={`${center.name}, ${center.subtitle}, ${center.price}`}
                className="flex w-[190px] sm:w-[220px] flex-col items-center rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e0e600]"
              >
                <div className="relative flex w-full items-end justify-center">
                  <NitroGreenPedestal uid="mobile" />
                  <CanRightShadow uid={`mobile-${center.id}`} />
                  <Image
                    src={center.image}
                    alt={center.name}
                    className="relative z-10 w-full h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <div className="mt-8 flex flex-col items-center text-center">
                  <h3 className="sr-only">{center.name}</h3>
                  <Image
                    src={center.titleImage}
                    alt={center.name}
                    className="h-[19px] w-auto object-contain"
                    draggable={false}
                  />
                  <p className="mt-1.5 text-[16px] text-white/[0.58]">
                    {center.subtitle}
                  </p>
                  <p className="mt-0.5 text-[22px] font-extrabold text-white">
                    {center.price}
                  </p>
                </div>
              </div>
            );
          })()}

          <div className="grid w-full max-w-[440px] grid-cols-2 gap-x-8 gap-y-10">
            {[
              NITRO_PRODUCTS[0],
              NITRO_PRODUCTS[1],
              NITRO_PRODUCTS[3],
              NITRO_PRODUCTS[4],
            ].map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center select-none"
              >
                <div className="relative flex w-[118px] sm:w-[140px] items-end justify-center">
                  <FlankingCanShadow className="w-[105%] -bottom-[2.4%]" />
                  <CanRightShadow uid={`mobile-${product.id}`} />
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-full h-auto object-contain"
                    draggable={false}
                  />
                </div>
                <div className="mt-6 flex flex-col items-center text-center">
                  <h3 className="sr-only">{product.name}</h3>
                  <Image
                    src={product.titleImage}
                    alt={product.name}
                    className="h-[15px] w-auto object-contain"
                    draggable={false}
                  />
                  <p className="mt-1 text-[14px] text-white/[0.58]">
                    {product.subtitle}
                  </p>
                  <p className="mt-0.5 text-[18px] font-extrabold text-white">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
