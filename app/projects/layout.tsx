import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Our Projects — AI Solutions by Trixode Studios",
  description:
    "See what we've built. AI agents, high-performance websites, and automation systems for businesses in Victoria, Vancouver, and across BC. Featuring Morphika AI.",
  keywords: [
    "AI projects Victoria BC",
    "software portfolio Vancouver",
    "Morphika AI",
    "AI case studies British Columbia",
    "web development portfolio Victoria",
  ],
  path: "/projects",
})

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
