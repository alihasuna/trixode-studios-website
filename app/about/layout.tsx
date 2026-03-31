import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "About Trixode Studios — AI Agency in Victoria, BC",
  description:
    "Founded in Victoria, BC. Trixode Studios builds AI automation, custom AI agents, and high-performance websites for businesses across British Columbia and Canada.",
  keywords: [
    "about Trixode Studios",
    "AI company Victoria BC",
    "software agency British Columbia",
    "AI startup Victoria",
    "tech company Vancouver Island",
  ],
  path: "/about",
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
