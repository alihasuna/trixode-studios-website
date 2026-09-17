# Trixode Studios umbrella: everything left to launch

State on 2026-09-16: entry page ("Two Paths"), Lab wiring, Creative wiring, production
hardening and the taste pass are built and verified locally in both repos. Nothing is
committed or deployed yet. This is the ordered plan to get from here to live.

Legend: **You** = founder decision or account access. **Me** = can be done in a session.
Effort is wall-clock, rough.

---

## Phase 0: Decisions (You, ~1 hour total)

| # | Decision | Recommendation | Unblocks |
|---|---|---|---|
| 0.1 | Creative host | `creative.trixode-studios.com` (subdomain, separate Vercel project). Path-based `/creative` would need a multi-zone rewrite and a `basePath` in the Creative app; not worth it. | Phases 2, 3 |
| 0.2 | Launch order | Entry + Lab first, Creative door shows "Opening soon" until its host is live; or hold everything until both are live. Recommend the first. | Phase 2.3 |
| 0.3 | Scene asset | Export the same concept scene with no text, 3:2, 2400px wide or more. Optional: a 4:5 portrait crop for phones. | Phase 1 |
| 0.4 | Creative provenance | The Creative site still ships models and a handshake flipbook extracted from shader.se (`trixode-agency/TODO.md`, "Licensing / provenance"). License, replace, or accept before the Creative host goes public. | Phase 4 |
| 0.5 | Creative showcase permissions | FIXR, IntelliCycle, Adriftwood appear in the work strip. Confirm each may be shown. | Phase 4 |
| 0.6 | Booking + social links | `BOOK_A_CALL` is a mailto placeholder; LinkedIn URL differs between repos. Pick the canonical ones. | Phase 2.4 |
| 0.7 | Entry copy kept from the concept | Coordinates line, "Science fuels imagination", "Ideas · Systems · A brighter tomorrow", 01/02 marks. Keep or cut. | Phase 2.4 |
| 0.8 | Returning visitors | Keep the quiet "Last visit" caption, or auto-redirect returning visitors to their last choice. Recommend caption. | Phase 2.4 |

## Phase 1: Assets (You, ~30 min)

1. Text-free scene export → `WEBSITE-TRIXODE/main/public/images/entry/two-paths.jpg`
   (same filename, nothing else changes).
2. Optional portrait crop → `two-paths-portrait.jpg` (I wire it as an art-directed source
   for phones in 2.2).
3. Optional 1200×630 crop for social previews (otherwise the scene is auto-used).

## Phase 2: Code finish (Me, ~half a day)

| # | Task | Notes |
|---|---|---|
| 2.1 | Commit + branches | `WEBSITE-TRIXODE/main`: branch `feat/umbrella-two-paths` (entry page, Lab links, forwarder, gate toggles, taste pass). `trixode-agency`: branch `feat/umbrella-lab-link`. Pre-existing uncommitted work in `main` (metadata rebrand, Hussien page) stays separate. Open two PRs. |
| 2.2 | Mobile art direction | Use the portrait crop under 768px so the door and paths stay legible on phones. Skip if no crop. |
| 2.3 | "Opening soon" state for the Creative door | If `NEXT_PUBLIC_CREATIVE_URL` is unset in production, the door renders non-clickable with "Opening soon" instead of pointing at a placeholder host. Removes the dead-end risk from 0.2. |
| 2.4 | Apply decisions 0.6 to 0.8 | Copy and link edits only. |
| 2.5 | Analytics on the doors | `enter_lab` / `enter_creative` events via Vercel Analytics (package not installed yet in `main`; Speed Insights is). Tells you which path people take. |
| 2.6 | Quality gates | Lighthouse on `/`, `/lab`, Creative `/` (Creative is a heavy 3D site; record the baseline, do not chase 100). axe accessibility pass on all three. Safari and iOS check of `100svh`, blur, and the hand-off intro. |
| 2.7 | Vercel-specific | Creative `next.config.ts` has `output: "standalone"` for Docker; Vercel ignores it with a warning. Keep for Docker or drop if Vercel is the only target. Add a `vercel.json` to Creative only if you want its headers managed there too (Next headers already cover it). |

## Phase 3: Infrastructure (You for accounts, Me for config; ~1 hour)

1. **Creative Vercel project**: import `alihasuna/trixode-agency`, framework Next.js,
   Node 24. Env: `NEXT_PUBLIC_SITE_URL=https://creative.trixode-studios.com`,
   `NEXT_PUBLIC_STUDIO_URL=https://www.trixode-studios.com`. Add domain
   `creative.trixode-studios.com`; DNS CNAME to Vercel.
2. **Marketing (`www`) project env**: `NEXT_PUBLIC_CREATIVE_URL=https://creative.trixode-studios.com`.
   Leave `PUBLIC_SITE_OPEN` unset until Phase 4.
3. **Preview run**: with both preview URLs, set the env vars to the preview origins on a
   preview branch and click through entry → Lab → Creative → back.
4. **Apex**: make sure `trixode-studios.com` redirects to `www` (Vercel domain settings).
5. **Search Console**: add the `creative` subdomain property; keep the `www` one.

## Phase 4: Launch (Both, ~1 hour plus soak)

1. Run `docs/entry/LAUNCH.md` step 5 checks on the preview deployment.
2. Confirm 0.4 and 0.5 are resolved for the Creative host, or keep the door on
   "Opening soon" (2.3) and launch entry + Lab alone.
3. Set `PUBLIC_SITE_OPEN=1` on `www`, redeploy. The holding page and the `/preview`
   password gate retire together.
4. Smoke test in production: `/`, `/lab`, `/lab/workflow` submit, `/lab/contact` submit
   (Resend key present), `/creative` forwards, Creative `/lab` forwards back, sitemaps
   and robots on both hosts, OG previews.
5. Submit both sitemaps in Search Console. Watch Speed Insights for a day.

## Phase 5: After launch (optional)

- Retire `app/under-construction`, `app/preview` and the gate code once stable.
- Ambient motion in the scene (slow cloud drift as a second image layer) if the still
  image feels static on large screens. Keep it under the brand's restraint bar.
- Revisit the concept-kept copy (0.7) with real visitor data from 2.5.
- Creative repo TODO items that are not launch-blocking (statue asset cleanup, patina
  tuning, hero texture Commodore traces).

## Critical path

0.1 → 3.1 → 3.2 → 3.3 → 4.1 → 4.3. Everything else runs alongside. If 0.4 or 0.5
stall, 2.3 lets entry + Lab launch on their own.
