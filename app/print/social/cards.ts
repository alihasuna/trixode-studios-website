/**
 * Trixode social-card specs.
 * Each entry is a fixed-dimension canvas rendered at /print/social/{slug}.
 * Open the URL at exact dimensions in the browser, screenshot, drop into
 * LinkedIn / X / Instagram / GitHub.
 *
 * Brand tokens come from styles/globals.css and tailwind.config.ts.
 */

export type CardTemplate = "A" | "B" | "C"

export type CardSpec = {
    template: CardTemplate
    width: number
    height: number
    eyebrow: string
    headline?: string
    body?: string
    artifact?:
        | { kind: "table"; rows: { label: string; value: string; accent?: boolean }[] }
        | { kind: "equation"; latex: string; gloss?: string }
    url?: string
}

export const CARD_URL = "trixode-studios.com"

export const CARDS: Record<string, CardSpec> = {
    // ── Launch sequence ─────────────────────────────────────────────
    "hook-square": {
        template: "A",
        width: 1080,
        height: 1080,
        eyebrow: "TRIXODE · LAB · 2026",
        headline: "The mathematics of agentic systems.",
        body: "A research lab in Victoria, BC. Two testbeds in production.",
        url: CARD_URL,
    },
    "hook-landscape": {
        template: "A",
        width: 1200,
        height: 675,
        eyebrow: "TRIXODE · LAB · 2026",
        headline: "The mathematics of agentic systems.",
        body: "A research lab in Victoria, BC.",
        url: CARD_URL,
    },
    "sps-instrument": {
        template: "B",
        width: 1080,
        height: 1080,
        eyebrow: "SPS · v0.1 · 2026",
        artifact: {
            kind: "equation",
            latex: "SPS = w₁·I + w₂·C + w₃·B + w₄·F",
            gloss: "A four-family scoring rubric for agentic email security. Methodology, weights, and limitations are public.",
        },
        url: `${CARD_URL}/lab/sps`,
    },
    "sps-benchmark": {
        template: "B",
        width: 1080,
        height: 1080,
        eyebrow: "SPS · v0.1 · BENCHMARK",
        artifact: {
            kind: "table",
            rows: [
                { label: "Morphika", value: "88", accent: true },
                { label: "Microsoft Copilot", value: "40" },
                { label: "Google Gemini", value: "45" },
                { label: "Superhuman / Shortwave", value: "30" },
            ],
        },
        url: `${CARD_URL}/lab/sps`,
    },
    listening: {
        template: "A",
        width: 1080,
        height: 1080,
        eyebrow: "WE'RE LISTENING",
        headline: "What are you measuring?",
        body: "And what aren't you?",
        url: CARD_URL,
    },

    // ── Profile / channel ───────────────────────────────────────────
    og: {
        template: "A",
        width: 1200,
        height: 630,
        eyebrow: "TRIXODE · LAB",
        headline: "The mathematics of agentic systems.",
        body: "Research lab · Victoria, BC.",
        url: CARD_URL,
    },
    "banner-linkedin": {
        template: "A",
        width: 1584,
        height: 396,
        eyebrow: "TRIXODE · LAB",
        headline: "The mathematics of agentic systems.",
        url: CARD_URL,
    },
    "banner-x": {
        template: "A",
        width: 1500,
        height: 500,
        eyebrow: "TRIXODE · LAB",
        headline: "The mathematics of agentic systems.",
        url: CARD_URL,
    },
}

export const CARD_SLUGS = Object.keys(CARDS)
