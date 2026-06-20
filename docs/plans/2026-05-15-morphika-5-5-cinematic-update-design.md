# Morphika 5.5 Cinematic Update Design

## Goal

Refine `/pitch/morphika/5.5` so the page feels more natural, immersive, and cinematic while keeping the route isolated.

## Approved Direction

- Remove the top header/menu entirely.
- Make the ambient light always visible with layered, softer radial glows.
- Use slow dim-mode breathing in dark mode instead of abrupt or artificial transitions.
- Add scroll-linked parallax depth across hero copy, app cockpit, proof ribbon, architecture, and market panels.
- Keep reduced-motion users on static natural glows with no parallax animation.

## Implementation Notes

Use Framer Motion scroll values inside the existing client component. Avoid new routes or global CSS unless strictly necessary. Keep all changes inside `app/pitch/morphika/5.5/Morphika55Mock.tsx`.
