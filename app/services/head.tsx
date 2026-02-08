import { defaultOgImage, siteUrl } from "@/lib/seo"

export default function Head() {
  const title = "Services"
  const description =
    "Explore AI SEO, full website development, and agentic AI systems designed to drive measurable business impact."
  const keywords =
    "AI SEO, website development, agentic AI, automation, AI systems, software services, Trixode Studios"
  const canonicalUrl = new URL("/services", siteUrl).toString()

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Trixode Studios`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={defaultOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Trixode Studios`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
    </>
  )
}
