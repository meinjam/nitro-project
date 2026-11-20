# NiTRO Energy Drink

Responsive **Next.js (App Router)** frontend built faithfully from the Nitro Energy Drink Figma design (`Energy Drink 001`, `Energy Drink 002`, and `Energy Drink 003`).

## Project Structure

- `src/app/` — Next.js App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — `Navbar.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `ShopSection.tsx`, `SocialIcons.tsx`
- `src/data/` — `products.ts`
- `src/assets/` — Exported Figma product cans, athlete visual, and display typography assets

## Tech Stack

- Next.js 16 (App Router, `src/` directory)
- React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Motion (`motion/react`)
- Lucide React (`lucide-react`)

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```
