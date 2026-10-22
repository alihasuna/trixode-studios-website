import type { Metadata } from "next"
import { LAB_OG_IMAGE } from "@/lib/lab-seo"

// page.tsx is a client component, so its metadata lives here.
const title = "Contact the Lab"
const description =
    "Contact Trixode Lab in Victoria, BC about an agentic workflow, agent harness or research collaboration. Tell us what you are building and we will reply with what we would measure first."

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/lab/contact" },
    openGraph: {
        title: `${title} | Trixode Lab`,
        description,
        url: "/lab/contact",
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

export default function LabContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
