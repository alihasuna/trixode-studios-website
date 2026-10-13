import type { Metadata } from "next"
import { createMetadata, siteUrl } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Our Team — Trixode Studios",
  description:
    "Meet the researchers and builders behind Trixode Studios, a Victoria team building measurable, secure agentic systems.",
  keywords: [
    "Trixode Studios team",
    "AI developers Victoria BC",
    "software engineers Vancouver Island",
    "Hussien Ballouk",
    "Hussien Ali Ballouk Hernandez",
    "Security Lead",
  ],
  path: "/people",
})

const teamPageUrl = new URL("/people", siteUrl).toString()

// schema.org Person record for the security lead. Rendered server-side so it
// is present in the raw HTML of /people (not client-only).
const securityLeadSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${teamPageUrl}#hussien-ali-ballouk-hernandez`,
  name: "Hussien Ali Ballouk Hernandez",
  jobTitle: "Founder & Security Lead",
  email: "mailto:hussienb@trixode-studios.com",
  url: teamPageUrl,
  description:
    "Founder and Security Lead at Trixode Studios. Responsible for the security of Trixode's agentic systems and infrastructure, including threat modeling, access control, agent tool permissions, and infrastructure hardening across product and client deployments.",
  worksFor: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Trixode Studios Inc.",
    url: siteUrl,
  },
}

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(securityLeadSchema) }}
      />
      {children}
    </>
  )
}
