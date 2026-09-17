import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Our Team — Trixode Studios",
  description:
    "Meet the researchers and builders behind Trixode Studios, a Victoria team building measurable, secure agentic systems.",
  keywords: [
    "Trixode Studios team",
    "AI developers Victoria BC",
    "software engineers Vancouver Island",
    "Hussien Ballouk",
    "Amir Ahmadian",
  ],
  path: "/people",
})

export default function PeopleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
