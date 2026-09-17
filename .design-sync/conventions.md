# Building with the Trixode Studios design system

This library is the component layer of the Trixode Studios marketing site: shadcn/ui
primitives on Radix, styled entirely with Tailwind utility classes, on a dark canvas.

## No wrapper is required — but the theme is dark and fixed

There is no ThemeProvider to mount. All design tokens are defined on `:root` in the
shipped stylesheet, so components are correctly styled the moment they render. Do not
wrap the tree in a provider and do not add a `.dark` class — the dark palette is
already the `:root` default here.

Two components are the exception, because they read React context and render blank
without their parent:

- Anything `Sidebar*` must be inside `<SidebarProvider>`.
- `Tooltip` must be inside `<TooltipProvider>`.

Never set a page background yourself. The stylesheet paints `#030303`; a light
container will make components disappear, because in this palette `--primary` is
near-white (`0 0% 98%`) — a default `<Button>` on a white surface is invisible.

## The one rule that matters most: the stylesheet is pre-compiled and finite

This system ships a **statically compiled** Tailwind stylesheet — about 1,115 distinct
utility classes, exactly the set the real site already uses. There is no Tailwind
compiler in the loop when your design renders. **A utility class that isn't already in
the sheet produces no CSS at all** — it will not error, it will simply do nothing, and
the element renders unstyled.

So: compose from classes you can see in `styles.css`, and when you need a value that
isn't there, use an inline `style={{}}` instead of inventing a class. Inline styles
always work.

Verified absent, as concrete examples of the trap: `text-brand-cyan`,
`from-brand-cyan`, `backdrop-blur-md`, `text-balance`. Verified present and safe:
everything in the tables below, plus the common scale — `p-2/4/6/8`, `px-4`, `py-2`,
`gap-2/3/4/6/8`, `mt-2`, `mb-4`, `space-y-2/4`, `flex`, `flex-col`, `grid`,
`grid-cols-2/3`, `items-center`, `justify-between`, `w-full`, `max-w-sm`, `max-w-md`,
`text-xs/sm/base/lg/xl/2xl/4xl`, `font-medium/semibold/bold`, `rounded-full`,
`border`, `border-2`, `opacity-50`, `shadow-lg`, `transition-colors`, `hover:bg-accent`,
`bg-gradient-to-r`, `from-brand-blue`, `to-brand-purple`.

## The styling idiom: Tailwind utilities, not props

Style layout and your own scaffolding with Tailwind utility classes. Components take
`className` and merge it (via `clsx` + `tailwind-merge`), so passing `className` is
the supported way to adjust one. There is no `sx`, no style props, no theme object.

**Semantic color classes** — always prefer these over raw hex. They resolve through
`hsl(var(--token))` and are what keeps a design on-brand:

| Family | Classes |
|---|---|
| Surface | `bg-background`, `bg-card`, `bg-popover`, `bg-muted`, `bg-secondary` |
| Text | `text-foreground`, `text-muted-foreground`, `text-card-foreground`, `text-primary-foreground` |
| Accent | `bg-primary`, `bg-accent`, `bg-destructive`, `text-primary`, `text-destructive` |
| Line | `border-border`, `border-input`, `ring-ring`, `ring-offset-background` |
| Charts | `--chart-1` … `--chart-5` |

**Brand accents** (literal, use sparingly for emphasis — gradients, glows, marks):
`brand-blue` `#3b82f6`, `brand-purple` `#8b5cf6`, `brand-cyan` `#06b6d4`.
Confirmed available: `bg-brand-blue`, `bg-brand-cyan`, `text-brand-blue`,
`text-brand-purple`, and the gradient pair `from-brand-blue` / `to-brand-purple` with
`bg-gradient-to-r`. Note `text-brand-cyan` and `from-brand-cyan` are **not** compiled —
use an inline style if you need them (see the pre-compiled rule above).

**Typography** — two families, and the distinction carries the brand:

- `font-grotesk` → **Space Grotesk**. The display face. Use it on headings, numerals,
  stat figures, and short emphatic labels. This is the single most brand-defining
  class in the system (438 usages across the real site) — headings without it read
  as generic.
- `font-sans` → **Inter**. Body text and UI. This is the default on `<body>`, so you
  rarely need to write it.

**Glassmorphism** — `.glass` is a real custom utility (135 usages on the site):
translucent fill + backdrop blur + inset highlight + hairline border, with reduced
blur on mobile. Use it for floating panels, nav bars, and cards that sit over the
animated background. It is the house look; reach for it before inventing a card style.

**Radius** comes from `--radius` (`0.5rem`): `rounded-lg` / `rounded-md` / `rounded-sm`
are derived from it, so they stay consistent if the token changes.

## Where the truth lives

- `_ds/<folder>/styles.css` and its `@import` closure — the complete compiled
  stylesheet, every utility and every token definition. Read it before inventing a class.
- `_ds/<folder>/components/<group>/<Name>/<Name>.d.ts` — the real prop contract.
- `_ds/<folder>/components/<group>/<Name>/<Name>.prompt.md` — per-component usage.

Components are grouped by function: `actions`, `forms`, `data-display`,
`dialogs-sheets`, `menus`, `popovers-tooltips`, `layout-disclosure`, `navigation`,
`feedback`, `brand`.

## A note on importing

There is no published npm package. In the real repo these are imported by path —
`import { Button } from "@/components/ui/button"` — which is the idiom to reproduce
if you emit code for this codebase. The `my-v0-project` name that appears in generated
docs is build plumbing, not an installable package.

## Idiomatic example

```tsx
<div className="glass rounded-lg p-6 flex flex-col gap-4">
  <div className="flex items-center justify-between">
    <h3 className="font-grotesk text-lg font-semibold">Simulation Engine</h3>
    <Badge variant="secondary">Active</Badge>
  </div>
  <p className="text-sm text-muted-foreground">
    Real-time plasma physics, rendered in the browser at 60fps.
  </p>
  <div className="flex gap-3">
    <Button>Open demo</Button>
    <Button variant="outline">Source</Button>
  </div>
</div>
```

Note what does the work: `glass` for the surface, `font-grotesk` for the heading,
`text-muted-foreground` for secondary text, and library components for every control.
