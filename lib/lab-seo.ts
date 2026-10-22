// Shared SEO values for the Lab micro-site (/lab/*).
// Kept out of app/lab/layout.tsx because Next.js layouts may only export
// route-segment fields.

export const LAB_TITLE = "Trixode Lab: Research and engineering for agentic systems"

export const LAB_DESCRIPTION =
    "Trixode Lab is the research and engineering arm of Trixode Studios in Victoria, BC. It studies the complexity and security of agentic systems and builds agent harnesses and agentic features on real products and research platforms."

export const LAB_SHORT_DESCRIPTION =
    "The research and engineering arm of Trixode Studios (Victoria, BC): complexity and security of agentic systems, agent harnesses and agentic features."

// A child segment's `openGraph` replaces the parent's entirely, so every Lab
// layout re-declares this image.
export const LAB_OG_IMAGE = {
    url: "/og/lab.png",
    width: 1200,
    height: 630,
    alt: "Trixode Lab: the mathematics of agentic systems",
}
