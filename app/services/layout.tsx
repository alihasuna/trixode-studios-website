import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "AI Services — Web Development, AI SEO & AI Agents",
  description:
    "Explore Trixode Studios' AI services: custom AI agents, AI-powered websites, and AI SEO. Serving businesses in Victoria, Vancouver, and across British Columbia.",
  keywords: [
    "AI services Victoria BC",
    "web development services Vancouver",
    "AI SEO services British Columbia",
    "AI agent development Victoria",
    "business automation services BC",
    "agentic AI Victoria",
  ],
  path: "/services",
})

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
