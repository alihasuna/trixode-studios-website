import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Contact Trixode Studios — Victoria, BC AI Agency",
  description:
    "Get in touch with Victoria's leading AI agency. We respond within 24 hours. Based in Victoria, BC, serving businesses across Vancouver and British Columbia.",
  keywords: [
    "contact Trixode Studios",
    "AI agency contact Victoria",
    "software company Victoria BC contact",
    "hire AI developer Victoria",
    "AI consultation Vancouver",
  ],
  path: "/contact",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
