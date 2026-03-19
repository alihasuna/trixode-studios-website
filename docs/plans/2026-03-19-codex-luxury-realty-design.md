# Codex Luxury Realty Pitch Design

**Date:** 2026-03-19  
**Owner:** Trixode Studios  
**Audience:** Maz Majidi (luxury real estate advisor, North Shore + Vancouver)

## Purpose

Create a high-authority pitch page at `/pitch/codex` that:
- Delivers a full audit of `mazmajidi.ca` (technical, design, optimization)
- Frames the business problem through psychology and sales principles
- Presents a premium website + agentic automation solution tailored to luxury real estate in BC
- Uses a structured, low-friction call to action for a second sales call (first Zoom)

## Context and Constraints

- User requested the structure to follow the successful AI4Enterprise analysis style.
- User requested direct meeting-readiness language and a clear, actionable CTA.
- Existing repository already contains rich animated pitch pages under `app/pitch/ai4enterprise` and `app/pitch/mazmajidi`.
- No backend/API implementation required for this deliverable; this is a presentation artifact.

## Source Evidence Used

- Live crawl and content review of `https://mazmajidi.ca/` and key pages (`about`, `buyers`, `sellers`, `contact`, `featured-properties`)
- Lighthouse mobile audit run captured in `/tmp/maz-lh.json`:
  - Performance: 40
  - Accessibility: 96
  - Best Practices: 58
  - SEO: 100
  - FCP: 11.0s
  - LCP: 16.2s
  - TBT: 610ms
  - Total transfer size: 16,755 KiB
  - Largest request: `24-M.mp4` (~14 MB)
- robots/sitemap verification for technical SEO posture (Yoast sitemap present, robots configured)

## Narrative Design Strategy (Approved Direction)

Chosen approach: **Audit-to-Offer Narrative**.

Why this approach:
- Builds trust first with proof and diagnosis
- Converts expertise into urgency without pressure
- Fits call stage: second interaction, first video meeting

## Information Architecture

1. Hero + Confidential Context
2. Executive Snapshot (fast metrics + business meaning)
3. Technical Audit (issues -> business impact)
4. Design and Conversion Psychology Audit
5. Optimization Roadmap (quick wins + strategic wins)
6. Problem -> Solution -> Offer framing
7. Agentic Automation Stack for BC luxury agents
8. Structured CTA for immediate next decision
9. Footer with trust cues and handoff options

## Psychology and Sales Model Embedded

- **Authority:** objective performance metrics + market-tailored diagnosis
- **Clarity:** explicit problem framing and phased solution paths
- **Risk Reversal:** phased offer and clear deliverables per path
- **Commitment Ladder:** choose path now -> schedule 90-minute blueprint within 72 hours
- **Service Positioning:** language centered on client outcomes, not tech novelty

## UX and Visual Direction

- Premium editorial tone with architectural luxury cues
- Distinct palette (onyx, sandstone, muted gold, mist)
- Motion is restrained and meaningful (staggered reveals, hover depth)
- High legibility with mobile-first section spacing
- Avoid generic SaaS look and avoid visual over-noise

## Technical Architecture for `app/pitch/codex/page.tsx`

- `"use client"` page using React + Framer Motion + Lucide icons
- Reusable constants for:
  - motion presets
  - scorecards
  - technical findings
  - design findings
  - optimization initiatives
  - automation agents
  - two offer paths
- Section components kept inline for speed, with clear grouped rendering blocks
- Tailwind-first styling aligned with existing project conventions

## Data Flow

- Static in-file data arrays -> mapped to cards and sections
- No runtime fetches; deterministic rendering for sales reliability
- CTA links use mailto + anchor patterns for immediate action

## Error Handling and Edge Cases

- Content-first static rendering avoids network/state failure modes
- All mapped lists keyed with deterministic ids/titles
- Mobile breakpoints preserve hierarchy for long-form sales content

## Verification Plan

- Run repository lint to validate TSX and style compliance
- Manually inspect route `/pitch/codex` for section order, responsiveness, and CTA visibility

## Success Criteria

- New route exists at `app/pitch/codex/page.tsx`
- Includes full technical/design/optimization analysis of current site
- Includes BC-luxury-specific agentic automation proposal
- Includes structured CTA suitable for the upcoming Zoom call
- Content tone reflects psychology-led, service-first sales approach
