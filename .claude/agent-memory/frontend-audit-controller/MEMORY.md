# Frontend Audit Controller - Memory

## Project Overview
- **Name**: Trixode Studios Website
- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 3.4 with HSL tokens + glassmorphism
- **Fonts**: Space Grotesk (headings) + Inter (body)
- **Animation Stack**: Framer Motion + CSS @keyframes (GSAP installed but not actively used in main components)

## Design System Patterns

### Color Tokens (CSS Variables in globals.css)
- Primary BG: `--bg: #030303` (near-black)
- Glass effects: `--glass: rgba(255, 255, 255, 0.03)` with `backdrop-filter: blur(20px)`
- Accent: `--accent: #3b82f6` (blue) - HARDCODED in many places as `#3b82f6` instead of using `var(--accent)`
- Border: `--border: rgba(255, 255, 255, 0.08)`
- Secondary accent: `#8b5cf6` (purple) - used but not tokenized
- Tertiary accent: `#06b6d4` (cyan) - used but not tokenized

### Typography Patterns
- Headings: `font-['Space_Grotesk',sans-serif]` - inline font-family, not using Tailwind class
- Body: Inter applied via className in layout
- Consistent use of `font-light` for large headings, `font-medium` for labels

### Glassmorphism Implementation
- `.glass` utility class defined in globals.css
- Standard values: `backdrop-filter: blur(20px)`, `border: 1px solid var(--border)`
- Mobile optimization: reduces blur to `12px` at `max-width: 768px`
- Hover state: increases opacity and glow

## Animation Architecture

### Layer 1: CSS @keyframes (NeonBlob)
- **File**: `/components/hero/NeonBlob.tsx`
- 4-layer liquid metal morphing effect using pure CSS
- Animations: `morph-metal`, `morph-highlight`, `morph-flow`, `pulse-core`
- GPU-accelerated: uses `transform`, `will-change`, `translateZ(0)`, `backface-visibility: hidden`
- Properly supports `@media (prefers-reduced-motion: reduce)`
- Uses scoped JSX styles (not external CSS file)

### Layer 2: Framer Motion (Page animations, scroll effects)
- **Primary usage**: Page transitions, scroll-triggered reveals, micro-interactions
- **Common patterns**:
  - `initial/animate/transition` for page load animations
  - `whileInView` with `viewport={{ once: true }}` for scroll reveals
  - `whileHover` for hover states
  - `useReducedMotion()` hook checked in WelcomeLoader and ServicesSection
- **Performance optimizations**:
  - `willChange` inline styles on animated elements
  - Desktop-only gating via `enableHeavyEffects` pattern

### Layer 3: GSAP (Installed but minimal usage)
- **Dependency**: `gsap@^3.14.2` in package.json
- Not actively used in main components reviewed (HomePage, NeonBlob, WelcomeLoader, etc.)
- No ScrollTrigger usage found in main codebase

## Component Patterns

### Custom Cursor
- **File**: `/components/ui/CustomCursor.tsx`
- Dual-element design: main ring + follower blob
- Mobile detection: disabled on `width < 1024px` or touch devices
- Uses `requestAnimationFrame` for smooth animation (good)
- Adds `.has-custom-cursor` class to body on mount
- Proper cleanup of RAF loop and event listeners

### Welcome Loader
- **File**: `/components/ui/WelcomeLoader.tsx`
- Multi-layer curtain animation (3 layers with staggered delays)
- Progress tracking via callback: `onAnimationProgress(progress)`
- Letter-by-letter reveal with 3D flip effect (`rotateX`)
- Respects `prefersReducedMotion` - instantly completes if enabled
- Cleanup: uses setTimeout array, properly cleared in effect cleanup

### Magnetic Effect Hook
- **File**: `/hooks/useMagneticEffect.ts`
- Applies to all `.magnetic` elements
- Checks `(hover: hover) and (pointer: fine)` to avoid touch devices
- Respects `prefers-reduced-motion`
- Uses RAF for transform updates (good)
- Stores cleanup handlers in Map for proper removal
- **Issue**: Creates new event handlers on every render if effect re-runs (no memoization)

### Floating Navigation
- **File**: `/components/layout/FloatingNav.tsx`
- Glassmorphism effect on scroll (appears at `scrollY > 50`)
- Desktop: full nav links | Mobile: hamburger menu
- Active state detection via pathname
- Scroll listener uses `{ passive: true }` (good)
- **Missing**: reduced-motion handling for scroll transitions

## Performance Patterns

### Dynamic Imports
- NeonBlob: `dynamic(() => import("@/components/hero/NeonBlob"), { ssr: false })`
- Delayed mount via `showHeroBlob` state (800ms timeout)
- Only rendered on desktop via `enableHeavyEffects`

### Conditional Rendering
- `isDesktop` via `useMediaQuery("(min-width: 1024px)")`
- `enableHeavyEffects = !prefersReducedMotion && isDesktop`
- CustomCursor returns `null` if `isMobile`

### Image Optimization
- **Issue**: Direct `<img>` tags used in about page (team photos) instead of Next.js `<Image>`
- Uses Cloudinary URLs with query params for resizing

## Accessibility Patterns

### Reduced Motion Support
- WelcomeLoader: full skip if `prefersReducedMotion`
- HomePage aurora effects: conditional Framer Motion vs static divs
- NeonBlob: `@media (prefers-reduced-motion: reduce)` stops animations
- ServicesSection: disables parallax if reduced motion or mobile
- **Missing**: FloatingNav scroll transitions, magnetic effects

### Keyboard Navigation
- Radix UI components provide built-in a11y (not heavily used in main pages)
- Standard `<Link>` and `<a>` elements used correctly

### Focus Management
- **Missing**: No visible custom focus styles found (relying on browser defaults)

## Recent Fixes (2026-02-06 Audit)

### NeonBlob Component
- FIXED: Reduced blur values for sharper metallic look (base: 8px→6px, highlight: 8px→6px, flow: 15px→10px)
- FIXED: Added more keyframe steps (3→5 steps at 0%, 20%, 40%, 60%, 80%, 100%)
- FIXED: Improved core glow with higher opacity (0.55 start, 0.85 peak)
- VERIFIED: Reduced motion support working correctly with `@media (prefers-reduced-motion: reduce)`

### Homepage (app/page.tsx)
- FIXED: Blob container opacity increased from 0.85 to 0.95 for better visibility (line 265)
- FIXED: Removed duplicate `flex` class (line 260 originally had duplicate removed)
- FIXED: Section numbering (Services=01, Expertise=02, Projects=03, Team=04)
- FIXED: Team section now uses Next.js `<Image>` component instead of `<img>` (lines 634-640)
- FIXED: Card orbit animations tightened with better duration spacing (60s, 65s, 70s)

### Footer
- FIXED: Copyright year updated to 2026 (line 94)

### ServicesSection
- FIXED: Section number changed from 02 to 01 (line 53)

## Common Issues Found

### Critical
1. **Hardcoded colors**: `#3b82f6`, `#8b5cf6`, `#06b6d4` directly in JSX instead of CSS tokens
2. **Inline font-family**: `font-['Space_Grotesk',sans-serif]` repeated 50+ times instead of Tailwind utility
3. **Magnetic effect re-render**: Hook creates new handlers on every re-run (missing empty dependency array or memoization)

### Major
1. ~~**No Next.js Image optimization**: Direct `<img>` tags in team section~~ FIXED 2026-02-06
2. **Missing custom focus styles**: Globals.css has basic `:focus-visible` but components don't have consistent visible focus indicators
3. **Layout shift risk**: NeonBlob loads after 800ms delay, potential CLS
4. **UseMediaQuery hydration**: Returns `false` on server, `true` on client (hydration mismatch potential - mitigated by design)

### Minor
1. **Inconsistent blur values**: blur-[60px], blur-[100px] across pages (should standardize)
2. **Form submission**: Contact form uses `alert()` (demo placeholder)
3. **External links missing rel**: Some social links don't have `rel="noopener noreferrer"` (Footer does it correctly)

## File Structure
- `/app/**/page.tsx` - Route pages
- `/components/ui/**` - Radix UI primitives + custom UI (53 files)
- `/components/layout/**` - Layout components (FloatingNav)
- `/components/hero/**` - Hero-specific (NeonBlob)
- `/components/home/**` - Home page sections (ServicesSection)
- `/hooks/**` - Custom hooks (useMagneticEffect, useMediaQuery, etc.)
- `/styles/globals.css` - Global styles, design tokens, utilities

## Next Actions for Future Audits
- Check GSAP usage in other pages (blog, projects, etc.)
- Review Radix UI component implementations (53 files)
- Test actual Core Web Vitals with Lighthouse
- Check bundle size impact of unused Radix components
