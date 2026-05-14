import { notFound } from "next/navigation"
import Card from "../_components/Card"
import { CARDS, CARD_SLUGS } from "../cards"

export function generateStaticParams() {
    return CARD_SLUGS.map((slug) => ({ slug }))
}

type PageProps = {
    params: Promise<{ slug: string }>
}

export default async function SocialCardPage({ params }: PageProps) {
    const { slug } = await params
    const spec = CARDS[slug]
    if (!spec) return notFound()

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                background: "#1a1a1a",
                padding: 0,
            }}
        >
            <Card spec={spec} />
        </div>
    )
}
