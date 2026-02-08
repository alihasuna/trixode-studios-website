import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ClientEffects from "@/components/providers/ClientEffects"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk" })
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.trixode-studios.com"
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trixode Studios",
  url: siteUrl,
  logo: new URL("/logo.png", siteUrl).toString(),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@trixode.com",
  },
  sameAs: [
    "https://github.com/trixodestudios",
    "https://linkedin.com/in/trixode-studios-054154311",
  ],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trixode Studios - Crafting the Future of Software",
    template: "%s | Trixode Studios",
  },
  description: "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators. We specialize in AI-powered solutions, research tools and advanced software development.",
  keywords: "AI, software development, research tools, innovation, technology, quantum computing, machine learning, scientific tools, data science",
  authors: [{ name: "Trixode Studios" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" }
    ],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Trixode Studios - Crafting the Future of Software",
    description: "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Trixode Studios",
    images: [
      {
        url: "/logo.png",
        width: 610,
        height: 172,
        alt: "Trixode Studios"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trixode Studios - Crafting the Future of Software",
    description: "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <ThemeProvider>
          <ClientEffects />
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
