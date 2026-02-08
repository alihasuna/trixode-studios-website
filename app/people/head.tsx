import { defaultOgImage, siteUrl } from "@/lib/seo"

export default function Head() {
  const title = "People"
  const description =
    "Meet the leadership and experts behind Trixode Studios' AI research, engineering, and delivery."
  const keywords =
    "leadership, AI experts, research team, software engineering team, Trixode Studios"
  const canonicalUrl = new URL("/people", siteUrl).toString()

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
