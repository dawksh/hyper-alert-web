# wagmi starter

Next.js starter with wagmi, shadcn/ui, Tailwind CSS, and modern stack.

## Features

-   wagmi v1, ready for EVM chains
-   shadcn/ui (New York style, lucide icons)
-   Next.js 15 (app directory, RSC, TypeScript)
-   Tailwind CSS 4, custom theme, dark mode
-   Geist font (sans, mono)
-   Utility-first: clsx, tailwind-merge
-   Animated with tw-animate-css
-   Pre-configured for base-sepolia
-   Minimal, extendable structure

## Scripts

-   `dev`: next dev --turbopack
-   `dev:https`: next dev --turbopack --experimental-https
-   `build`: next build
-   `start`: next start
-   `lint`: next lint

## Structure

-   `app/` - routes, layout, global styles
-   `components/ui/` - shadcn/ui components
-   `components/shared/` - providers
-   `lib/` - wagmi config, utils
-   `public/` - static assets

## Quick Start

1. Install deps: `npm install`
2. Start dev: `npm run dev`

## License

MIT
