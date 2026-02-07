# AGENTS.md

Guidelines for agentic coding agents working on this Trixode Studios Next.js repository.

## Build & Lint Commands

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build            # Production build (ignores TS errors)
npm run start            # Serve production build

# Quality
npm run lint             # ESLint (next/core-web-vitals + next/typescript)
```

**Testing:** No test framework is configured. If adding one, use Jest or Vitest with:
```bash
npm test                 # Run all tests
npm test Button.test.tsx # Run single test file
npm run test:watch       # Watch mode
```

### File Structure
```
app/                     # Next.js App Router pages
  api/                   # API routes (contact, newsletter, apply)
  layout.tsx             # Root layout with fonts & metadata
  page.tsx               # Home page
  [page]/page.tsx        # Other static pages
components/
  ui/                    # shadcn/ui components (buttons, dialogs, etc.)
  layout/                # Navigation, footer
  home/                  # Home page sections
  hero/                  # Hero components with heavy animations
hooks/                   # Custom React hooks
lib/
  utils.ts               # cn() helper for class merging
styles/
  globals.css            # Global styles, CSS variables, keyframes
```

## Code Style Guidelines

### Imports
- Use path alias `@/*` for all internal imports (e.g., `import { Button } from "@/components/ui/button"`)
- Order: React/types → third-party → `@/*` internal → relative (with blank lines between groups)
- React 19: Can import type separately (e.g., `import type { ReactNode } from "react"`)

### Components
- **Naming:** PascalCase files, PascalCase component names, always set `displayName`
- **Class merging:** Use `cn()` utility from `@/lib/utils` for all Tailwind className composition
- **Variants:** Use `class-variance-authority` (CVA) for component variants (see `@/components/ui/button.tsx`)
- **Ref forwarding:** Use `React.forwardRef` with proper typing and displayName

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface MyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline"
}

const MyComponent = React.forwardRef<HTMLDivElement, MyProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div ref={ref} className={cn("base-classes", className)} {...props} />
  )
)
MyComponent.displayName = "MyComponent"
```

### TypeScript
- **Strict mode enabled** - no implicit any, strict null checks
- Prefer explicit interface over type for object shapes
- Use `type` for unions, utility types, and simple aliases
- Props interfaces named `{ComponentName}Props`
- Event handlers: `React.MouseEvent<HTMLButtonElement>`, `React.FormEvent<HTMLFormElement>`

### Styling
- **Mobile-first** with Tailwind prefixes (sm:, md:, lg:, xl:)
- Use CSS variables from `styles/globals.css` (e.g., `--bg`, `--surface`, `--glass`)
- Glassmorphism: Apply `.glass` utility class
- **No arbitrary values** in Tailwind - add to config instead
- Animation utilities from `tailwindcss-animate`

### Animation Patterns
```tsx
import { useReducedMotion } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const isDesktop = useMediaQuery("(min-width: 1024px)")
const prefersReducedMotion = useReducedMotion()
const enableEffects = !prefersReducedMotion && isDesktop
```
- **CSS keyframes:** GPU effects in `styles/globals.css`
- **Framer Motion:** Page transitions, scroll reveals, hover states
- **GSAP:** Complex timeline choreography with cleanup in useEffect return
- **Dynamic imports:** Heavy animation components use `dynamic(() => import(...), { ssr: false })`

### Error Handling
- API routes: Always wrap in try/catch, return JSON with error message
- Components: Use error boundaries for React errors
- Never expose secrets in error messages or logs

### Naming Conventions
- **Files:** PascalCase for components, camelCase for utilities/hooks
- **Variables:** camelCase for local variables, UPPER_SNAKE for constants
- **Custom hooks:** Prefix with `use` (e.g., `useMagneticEffect`)
- **CSS classes:** kebab-case for custom classes

### Security & Performance
- **Never commit secrets** to repo (check .env.local for RESEND_API_KEY, etc.)
- Use Next.js `<Image>` with WebP/AVIF formats
- Add `will-change: transform` only on actively animated elements
- Apply security headers (already in next.config.mjs)

### Environment
- Next.js 16.1.6, React 19, TypeScript 5
- Radix UI primitives + shadcn/ui components
- Tailwind CSS 3.4 with HSL color variables
- GSAP 3.14 + ScrollTrigger, Framer Motion, Anime.js
- Resend for email, Lucide for icons

### Form Handling
- Use React Hook Form with Zod validation via `@hookform/resolvers`
- Import Form components from `@/components/ui/form` (shadcn wrappers)
- Example pattern:
```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10)
})

type FormData = z.infer<typeof schema>

const form = useForm<FormData>({
  resolver: zodResolver(schema)
})
```

### API Routes
- Always wrap handlers in try/catch blocks
- Return JSON responses with proper status codes
- Use Resend for email functionality (requires `RESEND_API_KEY`)
- Example pattern:
```tsx
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Process data
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

### Commits & PRs
- **Never commit** unless explicitly asked by the user
- Do NOT commit .env files or any file containing secrets
- Before committing, run `npm run lint` to ensure code quality
- If a pre-commit hook fails, create a new commit after fixing (don't amend pushed commits)

### Accessibility
- Respect `prefers-reduced-motion` media query for all animations
- Use semantic HTML elements (button vs div with onClick)
- Add proper ARIA labels for interactive elements
- Ensure keyboard navigation works for custom components
- Test with screen readers when building complex UI
