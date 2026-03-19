# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trixode Studios corporate website — a Next.js 16 App Router site with heavy animation, glassmorphism design, and Radix UI components. Dark-themed with HSL CSS variable tokens.

## Commands

- `npm run dev` — Start dev server (Turbopack enabled via `turbopack` config in `next.config.mjs`)
- `npm run build` — Production build (TS errors ignored via `typescript.ignoreBuildErrors`)
- `npm run start` — Serve production build
- `npm run lint` — ESLint 9 flat config with next/core-web-vitals

No test framework is configured.

## Tech Stack

- **Framework**: Next.js 16.1.6, React 19, TypeScript 5 (strict)
- **Styling**: Tailwind CSS 3.4 with `tailwindcss-animate`, class-variance-authority, clsx + tailwind-merge via `cn()` in `lib/utils.ts`
- **UI**: Radix UI primitives wrapped as shadcn/ui components (config in `components.json`)
- **Animation**: Framer Motion (interactions/transitions), GSAP 3.14 + ScrollTrigger (choreography), CSS keyframes (always-on GPU effects), Anime.js v4
- **3D**: Three.js + React Three Fiber/Drei (used sparingly)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API (`RESEND_API_KEY` in `.env.local`)
- **Toasts**: Sonner (`sonner` package, wrapped in `components/ui/sonner.tsx`)
- **Icons**: Lucide React
- **Fonts**: Space Grotesk (headings), Inter (body) via next/font/google — exposed as `--font-space-grotesk` and `--font-inter` CSS variables, used in Tailwind as `font-grotesk` and `font-sans`

## Architecture

**Path alias**: `@/*` maps to project root for all imports.

**Config**: `next.config.mjs` (note: `.mjs` extension, not `.ts`).

**Environment variables** (in `.env.local`):
- `RESEND_API_KEY` — used by all API routes for email delivery
- `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_BASE_URL` — base URL for sitemap, metadata, and OG tags (falls back to `https://www.trixode-studios.com`)

**App Router structure** (`app/`):
- Home page is in a route group: `app/(home)/page.tsx`
- Pages: home, home-2 (alternate design), about, pricing, careers, contact, blog (with `[slug]` dynamic route), projects, people, privacy, terms, cookies, accessibility
- **Routing gotcha**: `/services` permanently redirects to `/pricing` (configured in `next.config.mjs` redirects). A legacy `app/services/page.tsx` still exists.
- API routes: `api/contact/`, `api/newsletter/`, `api/apply/` — all use Resend for email
- SEO: dynamic `sitemap.ts` and `robots.ts`, Organization JSON-LD schema in root layout
- Blog data is static in `app/blog/blogData.ts` (no CMS)
- Global CSS imported from `styles/globals.css` in root layout (not `app/globals.css`)

**Providers** (in `components/providers/`):
- `ThemeProvider` — wraps next-themes with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`
- `ClientEffects` — dynamically imports and renders `FluidBackground` (global animated background, SSR-disabled)

**Components** (`components/`):
- `ui/` — Radix/shadcn primitives plus custom: `CustomCursor.tsx` (dual-element, desktop-only), `WelcomeLoader.tsx` (animated loading screen), `HexagonLogo.tsx`
- `hero/NeonBlob.tsx` — 4-layer morphing blob, dynamically imported with `ssr: false`
- `layout/FloatingNav.tsx` — Sticky glassmorphism nav
- `home/ServicesSection.tsx` — Service cards with parallax scroll

**Custom hooks** (`hooks/`):
- `useMagneticEffect` — RAF-based magnetic hover on buttons, respects reduced motion
- `useMediaQuery` — Generic media query hook; returns `false` during SSR to avoid hydration mismatch
- `useMousePosition` — Real-time cursor tracking
- `use-toast` — Toast notification state management (used with Sonner)

**Note**: `useIsMobile` exists in both `hooks/use-mobile.tsx` and `components/ui/use-mobile.tsx` (identical copies — the `components/ui/` copy is the shadcn default).

## ESLint Configuration

Uses ESLint 9 flat config (`eslint.config.mjs`) extending `eslint-config-next/core-web-vitals`. Disabled rules:
- `react/no-unescaped-entities` — off (allows `'` and `"` in JSX text)
- `react-hooks/purity` — off
- `react-hooks/set-state-in-effect` — off

## Animation Patterns

Three-layer approach — use the right tool for each job:

1. **CSS keyframes** in `styles/globals.css` for always-on GPU-accelerated effects (blob morphing, gradients)
2. **Framer Motion** for interaction-driven animations (page transitions, scroll reveals, hover states). Use `variants` pattern for reusable definitions. Use `useReducedMotion()` from framer-motion to check preference.
3. **GSAP** for complex timeline choreography. Always clean up with `useGSAP()` context or manual cleanup in useEffect return.

**Anime.js v4** is also used (notably on the services page) — import from `animejs` (not `anime.js`): `import { animate, createTimeline, stagger } from "animejs"`.

All animations must respect `prefers-reduced-motion`. Desktop-only effects (custom cursor, magnetic) are gated behind `useMediaQuery`. The homepage demonstrates the pattern:
```
const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
const prefersReducedMotion = useReducedMotion()
const enableHeavyEffects = !prefersReducedMotion && isDesktop
```

## Styling Conventions

**Two CSS variable systems** coexist in `styles/globals.css`:
1. **Custom theme tokens** (top of `:root`) — raw values used in custom components: `--bg`, `--surface`, `--glass`, `--glass-hover`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--accent`, `--accent-glow`, `--border`, `--border-light`, `--cursor-glow`
2. **shadcn/ui HSL tokens** (`@layer base :root`) — HSL value-only variables consumed via `hsl(var(--name))` in Tailwind config: `--background`, `--foreground`, `--primary`, `--card`, `--muted`, `--accent`, `--destructive`, `--border`, `--ring`, etc.

When adding shadcn components, they use the HSL system. Custom components typically use the raw theme tokens directly.

**Gotcha**: `components.json` references `app/globals.css` as the CSS path, but the actual file is `styles/globals.css`. If `npx shadcn` commands fail to find the CSS, adjust the path in `components.json` first.

- Glassmorphism via `.glass` utility class in `@layer utilities` (backdrop-blur + inset box-shadow + border, reduced blur on mobile)
- Dark mode via class strategy in Tailwind config
- Mobile-first responsive with Tailwind breakpoint prefixes
- Brand colors available as Tailwind classes: `brand-blue`, `brand-purple`, `brand-cyan`

**home-2 alternate design** uses its own CSS variable namespace (`.home2-root` class): `--h2-bg`, `--h2-ink`, `--h2-muted`, `--h2-accent`, `--h2-accent-2`, `--h2-border`. Uses Space Grotesk as primary font instead of Inter.

## Performance Rules

- Dynamically import heavy animation components: `dynamic(() => import(...), { ssr: false })`
- Gate desktop-only effects behind `useMediaQuery('(min-width: 1024px)')` checks
- Use `will-change: transform` sparingly and only on actively animated elements
- Images use Next.js `<Image>` with WebP/AVIF optimization enabled
- Custom cursor hides the native cursor via `body.has-custom-cursor` class (desktop only, applied in CSS `@media (min-width: 1024px)`)

## Deployment

Hosted on Vercel (region: iad1) with Vercel Speed Insights. Config in `vercel.json`:
- API routes: `contact` and `newsletter` have 10s max duration
- Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- Static assets cached 1 year immutable, API responses cached 1 hour
- Deploys only from `main` branch
