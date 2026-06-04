import type { Metadata } from "next"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

export const metadata: Metadata = {
    title: "Trixode-Studios Lab — The mathematics of agentic systems",
    description:
        "A research lab bringing academic frameworks to the complexity and security of specific agentic systems. Live testbed: Intellicycle.",
    alternates: {
        canonical: baseUrl,
    },
    openGraph: {
        title: "Trixode-Studios Lab — The mathematics of agentic systems",
        description:
            "Research lab in Victoria, BC. Academic frameworks for the complexity and security of specific agentic systems.",
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
