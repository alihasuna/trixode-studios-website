import { blogPostMap } from "@/app/blog/blogData"
import { defaultOgImage, siteUrl } from "@/lib/seo"

export default function Head({ params }: { params: { slug: string } }) {
  const post = blogPostMap[params.slug]
  const title = post ? post.title : "Blog"
  const description = post?.excerpt ??
    "Updates and insights on AI, software architecture, research tooling, and innovation from Trixode Studios."
  const keywords = post
    ? `${post.title}, ${post.category}, AI research, software engineering, Trixode Studios`
    : "AI blog, software architecture, research tools, machine learning, innovation, Trixode Studios"
  const canonicalUrl = new URL(`/blog/${params.slug}`, siteUrl).toString()

  const articleSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Trixode Studios",
          logo: {
            "@type": "ImageObject",
            url: defaultOgImage,
          },
        },
        mainEntityOfPage: canonicalUrl,
        image: defaultOgImage,
      }
    : null

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={defaultOgImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultOgImage} />

      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  )
}
