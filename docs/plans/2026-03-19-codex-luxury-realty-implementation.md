# Codex Luxury Realty Pitch Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a polished `/pitch/codex` page that presents a full technical/design/optimization audit of `mazmajidi.ca` and converts the meeting into a structured next-step decision.

**Architecture:** Implement a single client-rendered Next.js page (`app/pitch/codex/page.tsx`) composed of static typed data arrays and section maps. Keep rendering deterministic (no API calls) so the page is stable in a live meeting. Reuse Framer Motion and Tailwind patterns already present in existing pitch pages.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Scaffold the new route file

**Files:**
- Create: `app/pitch/codex/page.tsx`

**Step 1: Write the initial page shell**

```tsx
"use client"

export default function CodexPitchPage() {
  return <main>Codex pitch</main>
}
```

**Step 2: Run lint to verify baseline passes**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 3: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: scaffold codex luxury pitch route"
```

### Task 2: Implement visual system and hero

**Files:**
- Modify: `app/pitch/codex/page.tsx`

**Step 1: Add motion presets and color/typography direction**

```tsx
const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, ... }
```

**Step 2: Add hero with meeting context and two CTA buttons**

```tsx
<h1>Confidential Growth Audit & Luxury Digital Infrastructure Proposal</h1>
<a href="#priority-fixes">View Priority Fixes</a>
<a href="#automation-blueprint">See Automation Blueprint</a>
```

**Step 3: Run lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 4: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: add codex hero and visual direction"
```

### Task 3: Add executive snapshot + technical audit

**Files:**
- Modify: `app/pitch/codex/page.tsx`

**Step 1: Add typed data arrays for scorecards and findings**

```tsx
interface ScoreCard { label: string; value: string; context: string }
const scoreCards: ScoreCard[] = [ ... ]
```

**Step 2: Render metrics and technical findings with severity + business impact**

```tsx
{technicalFindings.map((item) => (
  <article key={item.title}>...</article>
))}
```

**Step 3: Run lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 4: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: add codex executive snapshot and technical audit"
```

### Task 4: Add design psychology + optimization sections

**Files:**
- Modify: `app/pitch/codex/page.tsx`

**Step 1: Add design audit items mapped to trust and conversion psychology**

```tsx
const designFindings = [
  { principle: "Cognitive Ease", gap: "...", impact: "..." },
]
```

**Step 2: Add optimization roadmap with quick wins and structural wins**

```tsx
const optimizationRoadmap = [ ... ]
```

**Step 3: Run lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 4: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: add design psychology and optimization roadmap"
```

### Task 5: Add problem-solution-offer and automation blueprint

**Files:**
- Modify: `app/pitch/codex/page.tsx`

**Step 1: Add problem -> solution -> offer section with clear narrative**

```tsx
<section>
  <h2>Problem -> Solution -> Offer</h2>
</section>
```

**Step 2: Add BC luxury agentic automation cards (lead concierge, scoring, seller intent, listing intelligence, nurture, reputation)**

```tsx
const automationAgents = [ ... ]
```

**Step 3: Run lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 4: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: add codex automation blueprint for BC luxury real estate"
```

### Task 6: Add structured CTA and final polish

**Files:**
- Modify: `app/pitch/codex/page.tsx`

**Step 1: Add two-path CTA with commitment ladder**

```tsx
const offerPaths = [
  { name: "Foundation Build", ... },
  { name: "Authority Engine", ... },
]
```

**Step 2: Add next-step block (book 90-min blueprint in 72 hours)**

```tsx
<a href="mailto:...">Book 90-minute Luxury Growth Blueprint</a>
```

**Step 3: Add footer trust line and confidentiality note**

```tsx
<footer>Confidential — Prepared for meeting use</footer>
```

**Step 4: Run lint**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 5: Commit**

```bash
git add app/pitch/codex/page.tsx
git commit -m "feat: complete codex luxury pitch with structured CTA"
```

### Task 7: Validate output and handoff

**Files:**
- Verify: `app/pitch/codex/page.tsx`
- Verify: `docs/plans/2026-03-19-codex-luxury-realty-design.md`

**Step 1: Final lint run**

Run: `npm run lint`
Expected: PASS (or only pre-existing unrelated warnings/errors)

**Step 2: Manual review checklist**

Run through this checklist:
- Hero communicates confidentiality + strategic authority
- All three analysis types present (technical, design, optimization)
- Problem/solution/offer sections are explicit
- Agentic automation is specific to BC luxury real estate workflow
- CTA presents two options + scheduled next action
- Mobile spacing and hierarchy remain readable

**Step 3: Commit documentation updates**

```bash
git add docs/plans/2026-03-19-codex-luxury-realty-design.md docs/plans/2026-03-19-codex-luxury-realty-implementation.md
git commit -m "docs: add codex design and implementation plans"
```
