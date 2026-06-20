# Morphika 5.5 Cinematic Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refine the existing Morphika 5.5 mock with natural always-on glow, no menu chrome, and cinematic parallax scrolling.

**Architecture:** Keep the update isolated to the existing client component at `app/pitch/morphika/5.5/Morphika55Mock.tsx`. Use Framer Motion scroll transforms for parallax and preserve reduced-motion behavior by returning static transforms when users prefer reduced motion.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion.

---

### Task 1: Remove Menu Chrome

**Files:**
- Modify: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1:** Remove the header block from the first hero section.

**Step 2:** Remove unused imports caused by the header removal.

**Step 3:** Keep enough top padding so the hero still breathes without visible nav chrome.

### Task 2: Natural Always-On Glow

**Files:**
- Modify: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1:** Replace abrupt ambient motion with layered fixed radial glows.

**Step 2:** Add a low-opacity permanent glow field for dark dim mode.

**Step 3:** Gate breathing animation behind `enableMotion`; static users keep the same natural glow without animation.

### Task 3: Scroll Parallax Dynamics

**Files:**
- Modify: `app/pitch/morphika/5.5/Morphika55Mock.tsx`

**Step 1:** Import `useScroll` and `useTransform` from Framer Motion.

**Step 2:** Create scroll progress transforms in `Morphika55Mock`.

**Step 3:** Apply separate parallax transforms to hero copy, cockpit, proof ribbon, architecture/security section, and market section.

**Step 4:** Ensure reduced-motion mode disables parallax transforms.

### Task 4: Verification

**Files:**
- No file changes expected unless verification exposes an issue.

**Step 1:** Run targeted lint:

`npx eslint "app/pitch/morphika/5.5/page.tsx" "app/pitch/morphika/5.5/Morphika55Mock.tsx"`

Expected: no output.

**Step 2:** Run production build:

`npm run build`

Expected: build succeeds and `/pitch/morphika/5.5` remains listed as static.

**Commit note:** Do not commit unless the user explicitly asks.
