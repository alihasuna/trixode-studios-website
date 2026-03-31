/**
 * Centralized JSON-LD structured data generators for SEO.
 *
 * Usage: import the schema you need and render it inside a
 * `<script type="application/ld+json">` tag.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.trixode-studios.com"

/* ------------------------------------------------------------------ */
/*  ProfessionalService  (replaces the old bare Organization)          */
/* ------------------------------------------------------------------ */

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: "Trixode Studios",
  legalName: "Trixode-Studios S.A.S. B.I.C.",
  url: siteUrl,
  logo: new URL("/logo.png", siteUrl).toString(),
  image: new URL("/logo.png", siteUrl).toString(),
  description:
    "Victoria BC's leading AI agency. We build custom AI agents, high-performance websites, and AI-powered SEO for businesses in Victoria, Vancouver, and across British Columbia.",
  email: "hello@trixode.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.4284,
    longitude: -123.3656,
  },
  areaServed: [
    {
      "@type": "City",
      name: "Victoria",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "British Columbia",
      },
    },
    {
      "@type": "City",
      name: "Vancouver",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "British Columbia",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "British Columbia",
      containedInPlace: {
        "@type": "Country",
        name: "Canada",
      },
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Agents",
    "Machine Learning",
    "Web Development",
    "Search Engine Optimization",
    "Business Process Automation",
    "Next.js Development",
    "React Development",
  ],
  founder: {
    "@type": "Person",
    name: "Hussien Ballouk",
    jobTitle: "Founder & CEO",
  },
  employee: [
    {
      "@type": "Person",
      name: "Hussien Ballouk",
      jobTitle: "Founder & CEO",
    },
    {
      "@type": "Person",
      name: "Amir Ahmadian",
      jobTitle: "Chief Technology Officer",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@trixode.com",
    availableLanguage: ["English", "Spanish", "French"],
  },
  sameAs: [
    "https://github.com/trixodestudios",
    "https://linkedin.com/in/trixode-studios-054154311",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI & Software Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered Website Development",
          description:
            "High-performance Next.js websites with AI chatbots, lead capture, and sub-2-second load times. Starting at $4,999.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI SEO & Content",
          description:
            "Predictive keyword strategy, AI-generated content, and revenue-tied reporting. Starting at $999/month.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Agent Development",
          description:
            "Custom autonomous AI agents that automate business workflows 24/7. Starting at $7,500.",
        },
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/*  WebSite  (enables sitelinks search box in Google)                   */
/* ------------------------------------------------------------------ */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Trixode Studios",
  url: siteUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-CA",
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList generator                                            */
/* ------------------------------------------------------------------ */

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: new URL(item.path, siteUrl).toString(),
      })),
    ],
  }
}

/* ------------------------------------------------------------------ */
/*  FAQPage generator                                                   */
/* ------------------------------------------------------------------ */

export function faqSchema(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

/* ------------------------------------------------------------------ */
/*  Article / BlogPosting generator                                     */
/* ------------------------------------------------------------------ */

export function articleSchema(options: {
  title: string
  description: string
  slug: string
  date: string
  author: string
  image?: string
}) {
  const { title, description, slug, date, author, image } = options

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: new URL(`/blog/${slug}`, siteUrl).toString(),
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Trixode Studios",
      logo: {
        "@type": "ImageObject",
        url: new URL("/logo.png", siteUrl).toString(),
      },
    },
    image: image || new URL("/logo.png", siteUrl).toString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": new URL(`/blog/${slug}`, siteUrl).toString(),
    },
    inLanguage: "en-CA",
  }
}

/* ------------------------------------------------------------------ */
/*  Service page schema                                                 */
/* ------------------------------------------------------------------ */

export const servicePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": new URL("/pricing", siteUrl).toString(),
  name: "AI Services & Pricing — Trixode Studios",
  description:
    "AI agents, high-performance websites, and AI SEO services for businesses in Victoria, Vancouver, and BC.",
  url: new URL("/pricing", siteUrl).toString(),
  provider: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-CA",
}
