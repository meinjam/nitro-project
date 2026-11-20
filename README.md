# NiTRO Energy Drink — Interactive Landing Experience

A responsive, interactive frontend web application built from the Nitro Energy Drink Figma design system using **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Motion**.

## Features

- **Hero Showcase (`#home`)**: Radial obsidian backdrop with the gradient `NITRO` display wordmark, floating horizontal Nitro Green can, CTA controls (`Buy Now`, `More info`), and social links.
- **Heritage / Story (`#about`)**: Editorial split composition featuring the monochrome athlete visual, scroll-linked parallax horizontal can, and stacked `SINCE 2002 PRODUCING` display typography.
- **Interactive 5-Flavor Lineup (`#shop`)**:
  - Desktop stepped 5-can showcase (`NiTRO ENG`, `NiTRO RED`, `NiTRO GREEN`, `NiTRO SKY`, `NiTRO BLUE`) with clickable spotlight selection and glowing pedestal feedback.
  - Responsive tablet & mobile carousel with arrow controls and flavor selector pills.
- **Performance Gallery (`#gallery`)**: Formula highlights (`220 mg` caffeine, `0g` added sugar, `5` signature editions) and nutrition specs modal.
- **Shopping Bag Drawer**: Slide-over cart supporting add/remove, quantity adjustments, live subtotal calculation, and order confirmation state.
- **Responsive Navigation & Contact Footer (`#contact`)**: Fixed header with mobile/tablet drawer and wholesale/contact inquiry form.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion/react`)
- Lucide React (`lucide-react`)

## Local Development

```bash
npm install
npm run dev
```

## Build & Quality Checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```
