import type { Metadata } from "next"
import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  title: "AI Services & Pricing — Victoria, BC",
  description:
    "AI agents from $7,500. AI-powered websites from $4,999. AI SEO from $999/mo. Victoria BC's AI agency serving businesses across Vancouver and British Columbia.",
  keywords: [
    "AI pricing Victoria BC",
    "website development cost Vancouver",
    "AI agent pricing",
    "SEO services Victoria BC",
    "AI chatbot pricing",
    "web design pricing Vancouver Island",
  ],
  path: "/pricing",
})

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
