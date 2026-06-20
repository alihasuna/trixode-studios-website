import type { Metadata } from "next"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

export const metadata: Metadata = {
    title: "Writing — chill science, DIY fusion, energy donuts",
    description:
        "Essays on physics, fusion, and things worth being curious about. Interactive simulators included.",
    alternates: { canonical: `${baseUrl}/writing` },
    openGraph: {
        title: "Writing — Trixode Studios",
        description:
            "Essays on physics, fusion, and things worth being curious about.",
        url: `${baseUrl}/writing`,
        type: "website",
    },
}

export default function WritingLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}
