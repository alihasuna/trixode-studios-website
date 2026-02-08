import { defaultOgImage, siteUrl } from "@/lib/seo"

export default function Head() {
  const title = "About"
  const description =
    "Learn about Trixode Studios, our mission, vision, and the values that guide our AI and software work."
  const keywords =
    "Trixode Studios, about, mission, vision, AI studio, software engineering, AI solutions"
  const canonicalUrl = new URL("/about", siteUrl).toString()

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
