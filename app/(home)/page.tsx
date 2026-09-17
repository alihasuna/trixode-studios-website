import type { Metadata } from "next"
import { TwoPaths, type PathOption } from "@/components/entry/TwoPaths"
import { DESTINATIONS } from "@/lib/destinations"
// The two-paths scene (docs/entry/two-paths-concept.png is the source concept).
// Replace this file with a text-free export of the same scene — 3:2, ≥1536px
// wide, same filename; the interim file is the concept render with its
// baked-in labels inpainted out. Static import → Next sizes it and builds the
// blur placeholder shown while the full image streams in.
import scene from "@/public/images/entry/two-paths.jpg"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

const description =
    "Same curiosity, different directions. Trixode Studios is two paths under one name: a research lab for the mathematics of agentic systems, and a creative studio building modern, elegant interfaces for the AI era."

export const metadata: Metadata = {
    title: "Same curiosity. Different directions.",
    description,
    alternates: {
        canonical: baseUrl,
    },
    openGraph: {
        title: "Trixode Studios: Two paths. One vision.",
        description,
        url: baseUrl,
        type: "website",
        images: [{ url: scene.src, width: scene.width, height: scene.height }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Trixode Studios",
        description,
        images: [scene.src],
    },
}

// Umbrella entry: Trixode Studios is one brand with two destinations —
// Lab (this deployment, /lab) and Creative (the trixode-agency deployment).
const LAB: PathOption = {
    id: "lab",
    index: "01",
    name: "Lab",
    traits: ["Research", "Engineering", "Technical Agency", "Real-World Solutions"],
    cta: "Enter Lab",
    href: DESTINATIONS.lab.href,
}

const CREATIVE: PathOption = {
    id: "creative",
    index: "02",
    name: "Creative",
    traits: ["Design", "Brand", "Storytelling", "Ideas into Reality"],
    cta: "Enter Creative",
    href: DESTINATIONS.creative.href,
    external: true,
    live: DESTINATIONS.creative.live,
}

export default function StudioEntryPage() {
    return <TwoPaths image={scene} lab={LAB} creative={CREATIVE} />
}
