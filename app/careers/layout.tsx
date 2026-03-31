import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Careers at Trixode Studios — Victoria, BC",
  description:
    "Join Victoria's AI agency. Remote-first positions in AI engineering, web development, and design. Build AI agents and cutting-edge software from British Columbia.",
  keywords: [
    "AI jobs Victoria BC",
    "software developer jobs Victoria",
    "tech careers Vancouver Island",
    "AI engineer jobs British Columbia",
    "remote developer jobs BC",
  ],
  path: "/careers",
})

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
