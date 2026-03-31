import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "AI & Software Blog — Insights from Victoria, BC",
  description:
    "Insights on AI automation, AI agents, SEO, and software development from Trixode Studios — Victoria BC's AI agency. Tips for businesses in Vancouver and British Columbia.",
  keywords: [
    "AI blog Victoria BC",
    "software development blog Vancouver",
    "AI automation tips",
    "AI agents guide",
    "SEO tips for BC businesses",
  ],
  path: "/blog",
})

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
