# Morphika 5.5 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a cinematic interactive Morphika product mock at `/pitch/morphika/5.5`.

**Architecture:** Add a new Next App Router segment under `app/pitch/morphika/5.5`. Keep metadata in a server `page.tsx`, and place the interactive client UI in `Morphika55Mock.tsx` so the route is isolated from the existing Morphika pitch page and source PDFs.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React.

---

### Task 1: Route Shell

**Files:**
- Create: `app/pitch/morphika/5.5/page.tsx`
- Create: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1: Create server route file**

Create `page.tsx` with route metadata and render `Morphika55Mock`.

**Step 2: Create client component placeholder**

Create `Morphika55Mock.tsx` with `"use client"`, a default exported component, and a minimal dark full-screen shell.

**Step 3: Verify route compiles**

Run: `npm run lint`
Expected: no new lint errors from the new route files.

### Task 2: Cinematic Interactive Mock

**Files:**
- Modify: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1: Add content data**

Define typed arrays for accounts, approval tiers, draft scenarios, proof metrics, security layers, and audit events derived from the approved pitch content.

**Step 2: Add app state**

Use local React state for selected draft, account, approval tier, gate status, and audit expansion. Sync account/tier when draft changes.

**Step 3: Build UI sections**

Implement one page with hero, phone cockpit, secure brain panel, audit log, architecture strip, security proof cards, market proof, and closing panel.

**Step 4: Add cinematic motion safely**

Use `useReducedMotion` to disable looping/large motion for reduced-motion users. Use Framer Motion for reveal, pulse, and state transitions.

### Task 3: Responsive And Accessibility Pass

**Files:**
- Modify: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1: Mobile layout**

Ensure the cockpit stacks cleanly on small screens and the sticky/floating controls do not block content.

**Step 2: Interactive semantics**

Use real buttons for account, draft, tier, and approval controls. Add clear `aria-pressed` and labels where needed.

**Step 3: Reduced motion check**

Confirm the page remains usable when `prefers-reduced-motion` is active.

### Task 4: Verification

**Files:**
- No file changes expected unless lint/build exposes issues.

**Step 1: Run lint**

Run: `npm run lint`
Expected: no new lint failures from `app/pitch/morphika/5.5`.

**Step 2: Run production build**

Run: `npm run build`
Expected: route builds successfully.

**Step 3: Inspect changed files**

Run: `git status --short`
Expected: only the new design/implementation docs and `app/pitch/morphika/5.5` files are added by this task, plus pre-existing unrelated worktree changes.

**Commit note:** Do not commit unless the user explicitly asks.
