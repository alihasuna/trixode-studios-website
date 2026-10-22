import type { Metadata } from "next"
import { LAB_DESCRIPTION, LAB_OG_IMAGE, LAB_SHORT_DESCRIPTION, LAB_TITLE } from "@/lib/lab-seo"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

const abs = (path: string) => new URL(path, baseUrl).toString()

export const metadata: Metadata = {
    title: {
        absolute: LAB_TITLE,
        template: "%s | Trixode Lab",
    },
    description: LAB_DESCRIPTION,
    keywords: [
        "Trixode Lab",
        "agentic systems research",
        "AI agent security",
        "agent harness",
        "agentic features",
        "complexity of agentic systems",
        "Victoria BC",
        "Trixode Studios",
    ],
    // Relative paths resolve against metadataBase (root layout).
    alternates: {
        canonical: "/lab",
    },
    openGraph: {
        title: LAB_TITLE,
        description: LAB_SHORT_DESCRIPTION,
        url: "/lab",
        siteName: "Trixode Studios",
        locale: "en_CA",
        type: "website",
        images: [LAB_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: LAB_TITLE,
        description: LAB_SHORT_DESCRIPTION,
        images: [LAB_OG_IMAGE.url],
    },
}

const orgId = `${baseUrl}/#organization`
const labId = `${baseUrl}/lab#organization`
const founderId = `${baseUrl}/hussien#person`

// Facts only. Intellicycle and Fixr are collaborations: no creator/owner
// pointing at Trixode. ElectroSim belongs to the UVic EM group: not linked,
// not listed as our work.
const labJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "ResearchOrganization",
            "@id": labId,
            name: "Trixode Lab",
            alternateName: "Trixode Studios Lab",
            url: abs("/lab"),
            description: LAB_DESCRIPTION,
            parentOrganization: { "@id": orgId },
            founder: {
                "@type": "Person",
                "@id": founderId,
                name: "Hussien Ballouk",
                description: "Physics PhD candidate at the University of Victoria and founder of Trixode Studios.",
                url: abs("/hussien"),
                affiliation: { "@type": "CollegeOrUniversity", name: "University of Victoria" },
            },
            address: {
                "@type": "PostalAddress",
                addressLocality: "Victoria",
                addressRegion: "BC",
                addressCountry: "CA",
            },
            knowsAbout: [
                "Agentic systems",
                "Complexity of agentic systems",
                "Security of agentic systems",
                "AI agent harnesses",
                "Agentic product features",
                "Research software for electron microscopy",
                "Physics simulation in WebAssembly",
            ],
            contactPoint: {
                "@type": "ContactPoint",
                contactType: "research enquiries",
                url: abs("/lab/contact"),
            },
        },
        {
            "@type": "ItemList",
            "@id": `${baseUrl}/lab#work`,
            name: "Trixode Lab: products, collaborations and research tools",
            itemListOrder: "https://schema.org/ItemListUnordered",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "Morphika",
                        url: "https://morphika.ai",
                        applicationCategory: "BusinessApplication",
                        description: "Trixode Studios' own agentic email product.",
                        creator: { "@id": orgId },
                    },
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "Intellicycle (collaboration)",
                    url: "https://www.intellicycle.net/",
                    description:
                        "Collaboration. Intellicycle is an agentic marketplace for recycled metals; Trixode Lab helps build its agent harness and agentic features.",
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Fixr (collaboration)",
                    description: "Collaboration on a property and asset-operations platform.",
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                        "@type": "CreativeWork",
                        name: "Trixode OS",
                        description: "Trixode Studios' in-house design system and tooling.",
                        creator: { "@id": orgId },
                    },
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "gemicro",
                        applicationCategory: "DeveloperApplication",
                        description:
                            "Claude Code skills and a command-line tool for the Electron Microscopy Research Group at the University of Victoria. It is the agent layer that runs on the group's ElectroSim computing platform: microscope sessions, simulations, processing and compute jobs are recorded in a hash-chained ledger anchored to Morphika.",
                        creator: { "@id": labId },
                    },
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "fusor-sim",
                        url: abs("/fusor-sim/fusor_sim.html"),
                        applicationCategory: "EducationalApplication",
                        operatingSystem: "Web browser",
                        description:
                            "Interactive simulation of ion dynamics in a Farnsworth fusor, written in C++ with raylib and compiled to WebAssembly.",
                        creator: { "@id": labId },
                    },
                },
                {
                    "@type": "ListItem",
                    position: 7,
                    item: {
                        "@type": "SoftwareApplication",
                        name: "donut-sim",
                        url: abs("/donut-sim/donut_sim.html"),
                        applicationCategory: "EducationalApplication",
                        operatingSystem: "Web browser",
                        description:
                            "Interactive simulation of tokamak magnetic confinement, written in C++ with raylib and compiled to WebAssembly.",
                        creator: { "@id": labId },
                    },
                },
            ],
        },
    ],
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(labJsonLd).replace(/</g, "\\u003c"),
                }}
            />
            {children}
        </>
    )
}
