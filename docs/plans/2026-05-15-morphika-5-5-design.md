# Morphika 5.5 Interactive Mock Design

## Goal

Create a cinematic one-page Morphika app mock at `/pitch/morphika/5.5` without changing the pitch deck PDF, one-pager PDF, or the existing `/pitch/morphika` route.

## Direction

Use the current Trixode dark glass, grid, aurora, and Space Grotesk visual language, but make the page feel like a live product cockpit instead of another investor slide. The approved direction is more cinematic: layered motion, surreal ambient UI, responsive panels, and clear interactions that demonstrate Morphika's security primitives.

## Page Structure

- Hero: operating-layer headline, proof badges, and a live inbox/security cockpit.
- Interactive app mock: account selector, draft selector, approval tier controls, Face ID gate, secure-brain state, and append-only audit stream.
- Architecture: user, secure brain, and mailboxes shown as animated connected layers.
- Security proof: biometric approval, Ed25519 signing, Moltguard scanning, encrypted credentials, and audit log.
- Market/product proof: distilled pitch-deck facts as supporting metrics, not editable references.
- Closing: compact CTA-style final panel for the app thesis.

## Constraints

- Create only the new `app/pitch/morphika/5.5` route folder for the mock.
- Do not edit the source PDFs or the existing Morphika pitch page.
- Respect `prefers-reduced-motion` and mobile layouts.
- Use existing stack patterns: Next App Router, React client component, Tailwind, Framer Motion, and Lucide icons.
