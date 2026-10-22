import type { Metadata } from "next"
import { LAB_OG_IMAGE } from "@/lib/lab-seo"

// page.tsx is a client component, so its metadata lives here.
const title = "Describe your agentic workflow"
const description =
    "A short, six-step intake for Trixode Lab: your team, where you are with AI, how autonomous and sensitive the workflow is, and where it has to run. It helps us scope what to measure and secure first."

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/lab/workflow" },
    openGraph: {
        title: `${title} | Trixode Lab`,
        description,
        url: "/lab/workflow",
        siteName: "Trixode Studios",
        locale: "en_CA",
        type: "website",
        images: [LAB_OG_IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: `${title} | Trixode Lab`,
        description,
        images: [LAB_OG_IMAGE.url],
    },
}

export default function LabWorkflowLayout({ children }: { children: React.ReactNode }) {
    return children
}
