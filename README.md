# NiTRO Energy Drink

Responsive **Next.js (App Router)** landing page with a bidirectional, scroll-scrubbed 3D can animation built faithfully from the NiTRO Energy Drink Figma prototype (`Energy Drink 001`, `Energy Drink 002`, and `Energy Drink 003`).

## Highlights

- **Bidirectional 3D Scroll Choreography (`GSAP` + `ScrollTrigger`)**:
  - **Phase 1 (`#home → #about`)**: Horizontal scale-up from the Hero centerpiece into exact alignment behind the `"SiNCE 2002 PROD UCING"` tagline in About, synchronized with **2× 360° cylindrical masked label spins** (`-266%` track shift).
  - **Phase 2 (`#about → #shop`)**: Smooth shrink, counter-clockwise `-90°` upright rotation, and **1× 360° reverse cylindrical spin** (`-266% → -133%`) landing squarely onto the glowing middle `NitroGreenPedestal`.
  - **Exact Reverse Scroll & Anchor Navigation**: Scrolling upward or clicking `#home` / `#about` / `#shop` replays every transform in reverse seamlessly.
  - **Accessible by Default**: Respects `prefers-reduced-motion: reduce` via `gsap.matchMedia()` and Lenis, gracefully rendering static layered cans in each section.
- **Butter-Smooth Scrolling (`Lenis`)**: Synchronized directly to `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `scrub: true`) for 60/120fps inertia with zero double-smoothing lag.
- **Smart Auto-Hide Navbar**: Stays pinned at the top, hides smoothly when scrolling down, and glides back in immediately on reverse (upward) scroll or keyboard focus.
- **Single-Source Layered Figma Cans (`<NitroCan />`)**: All 5 product flavors (`NiTRO ENG`, `NiTRO RED`, `NiTRO GREEN`, `NiTRO SKY`, `NiTRO BLUE`) are composed live from `can-base-horizontal.png` + the seamless 3-repeat `can-cover-green-wrap.png` texture using `mix-blend-color-burn` and Figma's exact `mix-blend-hue` flavor fills (`#ff8000`, `#ff0000`, `#00b2ff`, `#0004ff`).

## Project Structure

```text
src/
├── app/
│   ├── globals.css                  # Tailwind v4 base styles, radial backdrop, dark scrollbar
│   ├── layout.tsx                   # Outfit font, metadata, Lenis stylesheet
│   └── page.tsx                     # Root page composing Navbar + NitroScrollExperience
├── assets/                          # Minimal Figma assets (metallic can base, cover wrap, shadows, titles)
├── components/
│   ├── can/
│   │   ├── nitro-can.tsx             # Single-source layered Figma aluminum can (horizontal/vertical + hue + 360° wrap)
│   │   └── scroll-can-stage.tsx      # Floating z-[15] GPU-composited scroll stage & shadows
│   ├── shop/
│   │   ├── shop-product-card.tsx     # Reusable Shop product card (desktop stepped & mobile layouts)
│   │   └── shop-shadows.tsx          # Figma SVG floor ellipses, right shadow, and glowing green pedestal
│   ├── about-section.tsx             # Monochrome athlete photo, untransformed anchors, foreground tagline
│   ├── hero-section.tsx              # Giant NiTRO wordmark, untransformed Hero anchor, 3-zone CTA bar
│   ├── navbar.tsx                    # Smart auto-hide header + responsive mobile menu
│   ├── nitro-scroll-experience.tsx   # Scroll orchestrator wiring Lenis, GSAP timeline, sections, and stage
│   ├── shop-section.tsx              # 5-can desktop stepped showcase & mobile grid
│   └── social-icons.tsx              # Social profile links
├── data/
│   ├── navigation.ts                 # Primary navigation links
│   └── products.ts                   # Product catalog metadata and Figma HUE hex values
├── hooks/
│   ├── use-can-scroll-timeline.ts    # Responsive DOM-measured 2-phase GSAP ScrollTrigger timeline
│   ├── use-navbar-scroll-state.ts    # Hysteresis scroll-direction hook for auto-hide Navbar
│   └── use-smooth-scroll.ts          # Lenis + GSAP ticker synchronization hook
└── lib/
    └── utils.ts                      # `cn()` class-name merger (`clsx` + `tailwind-merge`)
```

## Tech Stack

- **Next.js 16** (App Router, Turbopack, TypeScript strict mode)
- **React 19**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **GSAP 3** (`gsap`, `ScrollTrigger`, `@gsap/react`)
- **Lenis** (`lenis`)
- **Motion** (`motion/react`)
- **clsx + tailwind-merge** (`cn()` utility)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```
