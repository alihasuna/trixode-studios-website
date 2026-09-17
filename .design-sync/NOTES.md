# design-sync notes — Trixode Studios site

Repo-specific gotchas for future syncs. Read this before re-running anything.

Project: `Trixode Studios Design System` (`02bdcb92-470f-41db-bf68-b8d7de8d7e9f`)

## What this repo is (and why the setup is unusual)

This is a **Next.js marketing site, not a published component library**. That drives
almost every non-default choice below:

- No Storybook → `shape: package`.
- No library build, no `dist/`, no `main`/`module`/`exports` in package.json →
  the converter runs in **synth-entry mode** (`[NO_DIST]`), synthesizing an entry
  from `components/ui/*.tsx`. This is expected here, not a failure to fix.
- `npm` never self-installs the package, so `node_modules/my-v0-project` doesn't
  exist and the converter can't find `<node_modules>/<pkg>/package.json`.
  **Fix: `ln -sfn .. node_modules/my-v0-project`** — a self-link. It's inside
  gitignored `node_modules`, so **recreate it after every fresh clone / npm ci**.

## Build order (matters — the steps feed each other)

```sh
ln -sfn .. node_modules/my-v0-project              # once per clone
ln -sfn ../.ds-sync/node_modules .design-sync/node_modules   # once per clone (overrides fork needs ts-morph)
node .design-sync/build-fonts.mjs                  # writes fonts/ + font-vars.css  (network)
node .design-sync/build-docs.mjs                   # writes docs/ (category frontmatter)
node .design-sync/build-css.mjs                    # compiles Tailwind; APPENDS font-vars.css
node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules ./node_modules --out ./ds-bundle
DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node .ds-sync/package-validate.mjs ./ds-bundle
```

`build-fonts` must run before `build-css` (build-css appends its output and exits 1 if missing).

**Re-run `build-css.mjs` after authoring or editing any `.design-sync/previews/*.tsx`** —
Tailwind only emits classes it saw at compile time, and `tailwind.sync.ts` adds
`previews/**` to `content` precisely so preview layout classes exist.

## The Tailwind problem (the big one)

The repo ships **no compiled CSS at all** — every visual property of every component
lives in utility classes compiled at build time. Pointing `cssEntry` at
`styles/globals.css` would ship raw `@tailwind` directives and render every card
unstyled *while still passing the render check* (root non-empty). Hence
`build-css.mjs`, and hence `cssEntry: .design-sync/compiled.css`.

Sanity gate after any CSS change — don't trust "it rendered":
```sh
grep -c "^\.inline-flex" .design-sync/compiled.css   # >0
grep -A2 "^\.bg-primary" .design-sync/compiled.css   # must resolve to hsl(var(--primary))
```
A compiled file under ~100 KB means a content-glob miss. Current size ≈ 214 KB.

## Dark theme

Site is `defaultTheme="dark"` (next-themes writes `html.dark` at runtime); brand bg
is `#030303`. Design surfaces have no `.dark` class, so `build-css.mjs` **derives**
`:root` aliases from the compiled `.dark` token blocks. Derived, never hand-copied —
they can't rot when `globals.css` changes.

Two traps already hit here, both guarded in the script now:
- The custom-token `.dark` block carries an inline `/* Dark Theme Variables */`
  comment which broke the "all declarations are custom properties" test, so it was
  silently skipped and only the shadcn block got aliased — a half-light palette.
- **Both** systems must land (`--bg` custom + `--background` shadcn). The script
  asserts this and exits 1 otherwise.

`html body` (specificity 0,0,2) intentionally overrides the `body{background:#fff}`
the converter inlines into every card `<head>`. Necessary, not cosmetic: in the dark
palette `--primary` is `0 0% 98%`, so a default Button is white-on-white and the card
reads as empty. `emit.mjs` is not forkable by design — specificity wins instead.

## Fonts

`app/layout.tsx` loads Inter, Space Grotesk, Montserrat, Cormorant Garamond via
`next/font/google`, which at runtime both serves the woff2s **and** defines
`--font-inter` / `--font-space-grotesk` / `--font-montserrat` / `--font-cormorant`.
Neither survives into the bundle. `build-fonts.mjs` self-hosts all four (56 latin +
latin-ext faces, ~2.5 MB) and emits the variables.

**Trap:** the converter parses `cfg.extraFonts` stylesheets for `@font-face` rules
**only** and discards everything else — a `:root` block in `fonts.css` never reaches
the bundle. That's why the variables go in a separate `font-vars.css` appended to
`compiled.css` (which is copied verbatim).

Why that matters concretely: Space Grotesk is **not** applied by a global `h1–h6`
rule (the only such rule in `globals.css` is scoped to `.home2-root`). It is applied
through the Tailwind `font-grotesk` class — **438 usages** across `app/` and
`components/` — which resolves to `var(--font-space-grotesk), sans-serif` via
`tailwind.config.ts`. With the variable undefined, every one of those 438 call sites
silently falls back to plain sans-serif. Likewise `body` uses
`var(--font-inter), "Inter", sans-serif`, which survives only because the literal
`"Inter"` fallback matches a shipped `@font-face`.

## Known render warns (triaged — a warn NOT in this list is new, look at it)

- `[FONT_MISSING] "Cambria"` — Tailwind's default `font-serif` fallback stack
  (`ui-serif, Georgia, Cambria, ...`), a Microsoft system font. Never meant to ship.
- `[TOKENS_MISSING]` 3 remaining `--radix-*` vars
  (`--radix-accordion-content-height`, `--radix-navigation-menu-viewport-*`) —
  set by Radix at runtime. Expected absent from static CSS.
- `[NO_DIST]` — expected, see above. Not a fixable condition in this repo.
- `[RENDER_THIN]` on **true compound sub-parts** — layout wrappers that paint nothing
  on their own and only render meaningfully inside their parent, where their parent's
  authored preview is what actually verifies them:
  `CardContent`, `CardFooter`, `CardHeader`, `TableCaption`, `TableCell`, `TableHead`,
  `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarHeader`,
  `SidebarMenuItem`, `SidebarMenuSubButton`, `SidebarMenuSubItem`, `SidebarProvider`,
  `BreadcrumbItem`, `NavigationMenuItem`, `PaginationItem`, `ContextMenuLabel`,
  `DrawerFooter`, `DrawerHeader`, `DropdownMenuLabel`, `MenubarLabel`.

  **NOT triaged — these are standalone components that should paint, and their
  `[RENDER_THIN]` must clear via an authored preview, not be accepted:**
  `Toggle`, `Avatar`, `HexagonLogo`, `AspectRatio`, `PaginationLink`,
  `BreadcrumbSeparator`, `InputOTPSeparator`.
  Checked at first sync: none are *broken* — each renders (HexagonLogo a 32px
  hexagon, Toggle a 40px button, Avatar a 40px circle) but is small and textless
  because the crash-prevention props give them no children. If one of these still
  warns after its preview is authored, that IS a real defect — investigate, don't
  add it to the triaged list above.

## Exclusions (`componentSrcMap`)

- `Calendar: null` — `calendar.tsx` imports `react-day-picker`, which is **not
  installed**. It's dead code (nothing imports it; the `<Calendar>` hits in `app/`
  are the *lucide-react icon*). Including it hard-fails the esbuild bundle.
- `CustomCursor: null`, `WelcomeLoader: null` — user scoped these out; they live in
  `components/ui/` so `srcDir` would otherwise sweep them in.
- `Toaster: components/ui/sonner.tsx` — **both** `sonner.tsx` and `toaster.tsx`
  export `Toaster`. `export * from` both makes the name ambiguous, ES star-export
  semantics drop it, and it lands `undefined` on the global (`[BUNDLE_EXPORT]`).
  CLAUDE.md says Sonner is the canonical toast system, so sonner.tsx wins.

## The `source-kit.mjs` fork (`.design-sync/overrides/`)

Three changes, all specific to synth-entry mode; declared in `cfg.libOverrides`:

1. Null-mapped components are excluded from the **synthesized entry**, not just the
   card list. Upstream builds the entry before exclusions apply, so `Calendar: null`
   still `export * from`'d calendar.tsx and broke the bundle.
2. A **pinned** src path shadows other files claiming the same name (the Toaster case).
3. **A pin must ADD to discovery, not replace it.** Upstream only falls back to the
   src scan when the name set is completely empty; with no `.d.ts` tree
   (`exportedNames` returns empty here), adding the single `Toaster` pin collapsed
   the component list from **246 to 1**. Watch for this if the fork is ever dropped.

The fork's relative imports are repointed at `../../.ds-sync/lib/`, and it needs
`.design-sync/node_modules -> ../.ds-sync/node_modules` to resolve `ts-morph`.
On re-sync, diff it against the bundled `lib/source-kit.mjs` and merge upstream changes.

## Grouping

Flat `components/ui/` means the converter's group heuristic yields `general` for all
246 — one unbrowsable group. `build-docs.mjs` generates one
`.design-sync/docs/<Name>.md` per export carrying `category:` frontmatter, bound by
slug via `cfg.docsDir` (no 248-entry `docsMap`, which the skill warns rots).
Families are assigned **per source file**, so every export of `dialog.tsx` lands
together. Adding a component to `components/ui/` → add its stem to `FAMILY` in
`build-docs.mjs`, else it falls back to `general`.

## Render check without a playwright browser

No `~/.cache/ms-playwright` here and the 200 MB download is unnecessary: `playwright`
is installed into `.ds-sync/` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` and driven
against the system Chrome via **`DS_CHROMIUM_PATH`**. Verified working (Chrome 151).
Every validate/capture command needs that env var or it fails `[RENDER_SKIPPED]`.

## LIVE SITE BUG — `--accent` / `--border` token collision (reported, deliberately NOT fixed)

Found independently by three preview batches and confirmed directly. **This is a defect
in `styles/globals.css`, not a sync artifact, and it is live in production.**

`--accent` and `--border` are each defined twice in incompatible formats:
- **unlayered** `:root` (L14, L~38) and `.dark` (L29 block): raw values —
  `--accent: #3b82f6`, `--border: rgba(255,255,255,0.08)`
- inside **`@layer base`** (L~253, L~289): shadcn HSL triplets — `0 0% 14.9%`

Unlayered CSS always beats layered CSS, so the raw values win. `hsl(var(--accent))` is
then malformed and the whole declaration is dropped.

Consequences in production today:
- All **33** `bg-accent` / `hover:bg-accent` / `focus:bg-accent` usages paint nothing:
  no focused-item highlight in DropdownMenu / ContextMenu / Menubar / Command, no
  pressed state on `Toggle` (`toggle.tsx:9` `data-[state=on]:bg-accent`), no
  ghost/outline Button hover.
- All **7** `bg-border` usages are invisible: Separator, ResizableHandle, ScrollBar,
  `command.tsx:105`, `context-menu.tsx:162`.
- `border-border` falls back to `currentColor` — which is why Cards render a **bright
  white** border instead of a subtle hairline.
- `--sidebar-*` tokens are NOT affected (the custom block never defines them), so
  Sidebar highlights genuinely render.

**The user chose "report only, sync faithfully"** — the DS renders exactly as the live
site does. Affected cells are graded `good` with the caveat in their `note` field; no
preview fakes a highlight with an inline colour. Do not "fix" this in the sync without
a new decision.

Fix when they want it: rename the custom-theme tokens (`--accent` → `--brand-accent`,
`--border` → `--hairline`) across `globals.css` + ~39 call sites in `app/` and
`components/`. The shadcn names cannot move — `tailwind.config.ts` is bound to them.

## Harness learnings from the preview campaign

- **`[CONFIG_STALE]`**: `preview-rebuild.mjs` refuses any component whose `cfg.overrides`
  entry changed since the bundle was stamped. `configSlicesFor()`
  (`lib/sync-hashes.mjs:153–174`) strips `cardMode`/`primaryStory` but **keys
  `viewport`** — so `cardMode`-only overrides rebuild fine while every
  `viewport`-carrying one fails. **Finalise all `cfg.overrides` edits, then run one full
  `package-build.mjs`, before any scoped preview work.** There is no bypass flag.
- **Capture clock freezes animation.** `package-capture.mjs` used
  `page.clock.setFixedTime()`, which also shims `performance.now()`/`rAF` and pins every
  Framer Motion element at its `initial` keyframe (ThemeToggle's Moon captured at
  opacity 0; recharts froze mid-draw). **Patched locally** to `page.addInitScript`
  overriding only `Date`/`Date.now` — keeps determinism, animation runs.
  `clock.runFor()` does NOT rescue it. **`.ds-sync/` is regenerated from the skill on
  every re-sync, so this patch must be reapplied** (see the comment block in the file).
- **`dark:` variants are inert in cards.** Tailwind emits them as `:is(.dark *)` and no
  card has a `.dark` ancestor. Only **12** occurrences exist in `components/ui`, so the
  blast radius is small and the two affected previews wrap themselves in
  `<div className="dark">`. A global fix (a `cfg.provider` wrapper) would re-render all
  50 graded components — not worth invalidating the campaign. Revisit only if `dark:`
  usage grows.
- **Radix specifics** (cost real debugging time): `ContextMenu` has **no**
  `open`/`defaultOpen` — open it with a `useEffect` dispatching
  `new MouseEvent("contextmenu", {bubbles:true, cancelable:true, clientX, clientY})`;
  all three of bubbles/cancelable/coords are load-bearing. `Menubar` opens with
  `<Menubar defaultValue="x">` + `<MenubarMenu value="x">` — the explicit `value` is
  mandatory or Radix generates an id `defaultValue` can never match. Tooltip and
  HoverCard do **not** portal.
- **`Sidebar` sizing**: `Sidebar` uses `h-full` but `SidebarProvider` only sets
  `min-h-svh`, so the percentage resolves to `auto`. Give the provider a *definite*
  inline `height`/`minHeight` and `SidebarInset` `minHeight: 0`.
- **Component defects found** (real, not preview artifacts): `Slider` cannot render a
  disabled state — `disabled:opacity-50` sits on `SliderPrimitive.Thumb`, a
  `<span role="slider">` that can never match `:disabled`. `Textarea` ignores `rows`
  (`min-h-[80px]` + flex context wins).
- **Utility classes verified ABSENT** (Tailwind is pre-compiled — these silently do
  nothing): `w-40 w-44 w-28 w-1/2 h-40 h-1.5 basis-1/2 md:basis-1/2 self-stretch pb-2
  min-h-full text-brand-cyan from-brand-cyan backdrop-blur-md text-balance`. Use inline
  `style={{}}` instead.
- `--radix-accordion-content-height` is a non-issue for capture — open panels measure
  and paint correctly.

## Deferred

- **`Toaster`** (sonner) ships the floor card. It is an app-level singleton whose store
  is module-level, so a preview must share the *same* `sonner` instance: add `"sonner"`
  to `cfg.extraEntries`, then author a preview importing `toast` from the bundle. A
  second copy resolved from `node_modules` has its own store and renders empty
  (confirmed by capture). Authorable on any re-sync.

## Re-sync risks (what can silently go stale)

- **The two symlinks** (`node_modules/my-v0-project`, `.design-sync/node_modules`) are
  gitignored and vanish on a fresh clone. Both are required. Symptom of the first:
  `ENOENT .../node_modules/my-v0-project/package.json`.
- **Fonts are committed** (`.design-sync/fonts/`, 58 files ≈ 2.5 MB) precisely so a
  fresh clone builds **offline**. `build-fonts.mjs` therefore **skips** when
  `fonts/font-vars.css` already exists — pass `--force` to genuinely refetch (e.g.
  after changing `FAMILIES`). Do NOT remove that guard: the script `rmSync`s
  `fonts/` before fetching, and the documented build order runs it unconditionally,
  so without the guard an offline run would delete all 58 committed files and then
  exit 1, leaving `build-css.mjs` unable to find `font-vars.css`.
  On a `--force` refetch, the Google Fonts API's per-subset `/* latin */` comment
  format is what the parser keys on; if that changes, the script exits 1 rather than
  silently shipping fontless CSS.
- **`FAMILY` in `build-docs.mjs` is a hand-maintained map.** New components in
  `components/ui/` silently land in `general` until added. It reports unmapped files
  on every run — read that line.
- **`compiled.css` is generated and gitignored-adjacent** — it is NOT committed. Any
  clone must run the three build scripts before the converter.
- **Preview classes:** authoring a preview that uses a utility class not already used
  anywhere in `components/**` or `app/**` requires re-running `build-css.mjs`, or the
  class silently doesn't exist and the card renders unstyled.
- The site's real import idiom is `@/components/ui/<file>` — there is **no published
  package**. `pkg: my-v0-project` is converter plumbing only; don't present it as an
  installable package name in docs.
- **`conventions.md` enumerates specific utility classes as present or absent.** That
  list is derived from the compiled sheet, which contains only what `components/**`
  and `app/**` actually use (~1,115 selectors). Adding or removing usage in the site
  changes the set, so **re-validate those names on every re-sync** and fix any that no
  longer verify. Confirmed absent at first sync, cited in the doc as examples of the
  trap: `text-brand-cyan`, `from-brand-cyan`, `backdrop-blur-md`, `text-balance`.
  Validate with:
  `node -e` against `.design-sync/compiled.css`, matching `^\.<class>` — beware zsh
  mangling `{` in grep patterns; put the check in a script file, not an inline loop.
