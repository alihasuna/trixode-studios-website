import { defaultOgImage, siteUrl } from "@/lib/seo"

export default function Head() {
  const title = "Trixode Studios - Crafting the Future of Software"
  const description =
    "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators. We specialize in AI-powered solutions, research tools and advanced software development."
  const keywords =
    "Trixode Studios, AI studio, software development, AI research tools, machine learning, data science, scientific computing, innovation"
  const canonicalUrl = siteUrl

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={defaultOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />
    </>
  )
}
