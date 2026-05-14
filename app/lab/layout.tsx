import type { Metadata } from "next"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

export const metadata: Metadata = {
    title: "Trixode-Studios Lab — The mathematics of agentic systems",
    description:
        "A research lab developing math models that measure the complexity and security of agentic workflows. Live testbed: Intellcycle.",
    alternates: {
        canonical: baseUrl,
    },
    openGraph: {
        title: "Trixode-Studios Lab — The mathematics of agentic systems",
        description:
            "Research lab in Victoria, BC. Math models for the complexity and security of agentic workflows.",
        url: baseUrl,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Trixode-Studios Lab",
        description:
            "The mathematics of agentic systems. Research lab in Victoria, BC.",
    },
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
