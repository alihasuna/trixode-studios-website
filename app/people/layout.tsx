import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "Our Team — Trixode Studios",
  description:
    "Meet the team behind Victoria's AI agency. Engineers and scientists building AI agents, websites, and automation for businesses across British Columbia.",
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
