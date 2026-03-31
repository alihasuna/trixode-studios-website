import type { Metadata } from "next"

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.trixode-studios.com"

export const defaultOgImage = new URL("/logo.png", siteUrl).toString()

export const COMPANY = {
  name: "Trixode Studios",
  legalName: "Trixode-Studios S.A.S. B.I.C.",
  email: "hello@trixode.com",
  url: siteUrl,
  location: "Victoria, BC",
  region: "British Columbia, Canada",
  cities: ["Victoria", "Vancouver"],
  tagline: "AI Software Company in Victoria, BC",
} as const

/**
 * Generate page-specific metadata with consistent branding and local SEO signals.
 */
export function createMetadata(options: {
  title: string
  description: string
  keywords?: string[]
  path?: string
  ogType?: "website" | "article"
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const {
    title,
    description,
    keywords = [],
    path = "",
    ogType = "website",
    ogImage = defaultOgImage,
    noIndex = false,
  } = options

  const url = new URL(path, siteUrl).toString()

  const baseKeywords = [
    "AI agency Victoria BC",
    "software company Vancouver",
    "AI automation British Columbia",
    "AI agents Victoria",
    "web development Victoria BC",
    "AI SEO Vancouver",
    "Trixode Studios",
  ]

  const allKeywords = [...new Set([...keywords, ...baseKeywords])]

  return {
    title,
    description,
    keywords: allKeywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Trixode Studios`,
      description,
      type: ogType,
      locale: "en_CA",
      url,
      siteName: "Trixode Studios",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — Trixode Studios`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Trixode Studios`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}
