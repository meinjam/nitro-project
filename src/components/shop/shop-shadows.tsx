import type { RefObject } from "react";
import { cn } from "@/lib/utils";

export function CanRightShadow({ uid }: { uid: string }) {
  const filterId = `filter0_f_1_236_${uid}`;

  return (
    <svg
      viewBox="0 0 130 578"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-[-40%] z-8 w-[77.5%] h-[130.8%] -translate-y-1/2"
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

export function FlankingCanShadow({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 217 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 z-5 h-auto -translate-x-1/2",
        className
      )}
    >
      <ellipse cx="108.5" cy="16.3774" rx="108.5" ry="16.3774" fill="#212121" />
    </svg>
  );
}

export function NitroGreenPedestal({
  uid,
  pedestalRef,
}: {
  uid: string;
  pedestalRef?: RefObject<HTMLDivElement | null>;
}) {
  const filterId = `filter0_d_1_176_${uid}`;
  const maskId = `stroke0_1_176_${uid}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 bottom-[-6.9%] z-5 w-[126.65%] -translate-x-1/2"
    >
      <div ref={pedestalRef} className="w-full will-change-transform">
        <svg
          viewBox="0 0 325 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
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
      </div>
    </div>
  );
}
