// Umbrella-brand destinations.
//
// Trixode Studios is one brand with two doors:
//   - Lab      — this repo, served under /lab (the umbrella entry page is at /).
//   - Creative — the trixode-agency repo (Desktop/TRIXODE-STUDIOS/trixode-agency),
//                a separate Next.js deployment on its own host.
//
// Override the Creative host per environment with NEXT_PUBLIC_CREATIVE_URL in
// .env.local. The Creative site carries the mirror setting for the Lab.
const trim = (url: string) => url.replace(/\/+$/, "")

const configuredCreativeUrl = process.env.NEXT_PUBLIC_CREATIVE_URL

export const CREATIVE_URL = trim(configuredCreativeUrl || "https://creative.trixode-studios.com")

/** In production the Creative door opens only once its host is configured;
 *  until then it reads "Opening soon" and the Creative links stay hidden. */
export const CREATIVE_LIVE = Boolean(configuredCreativeUrl) || process.env.NODE_ENV !== "production"

export interface Destination {
    name: string
    href: string
    /** absolute URL on another deployment */
    external?: boolean
    /** false = destination not reachable yet */
    live?: boolean
}

export const DESTINATIONS = {
    studio: { name: "Trixode Studios", href: "/" },
    lab: { name: "Lab", href: "/lab" },
    creative: { name: "Creative", href: CREATIVE_URL, external: true, live: CREATIVE_LIVE },
} satisfies Record<string, Destination>
