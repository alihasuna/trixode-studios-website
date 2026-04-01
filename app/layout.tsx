import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, Montserrat } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ClientEffects from "@/components/providers/ClientEffects"
import { professionalServiceSchema, websiteSchema } from "@/lib/schemas"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk" })
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat" })
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.trixode-studios.com"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Trixode Studios — AI Software Company in Victoria, BC",
    template: "%s | Trixode Studios",
  },
  description:
    "Victoria BC's leading AI agency. Custom AI agents, high-performance websites, and AI SEO for businesses in Victoria, Vancouver, and across British Columbia. Starting at $999/mo.",
  keywords:
    "AI agency Victoria BC, software company Victoria, AI agents Vancouver, web development Victoria BC, AI SEO British Columbia, AI automation Vancouver, software development Victoria, Trixode Studios, AI chatbot Victoria, business automation BC",
  authors: [{ name: "Trixode Studios" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Trixode Studios — AI Software Company in Victoria, BC",
    description:
      "Victoria's leading AI agency. Custom AI agents, high-performance websites, and AI-powered SEO for businesses across BC.",
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Trixode Studios",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Trixode Studios — AI Agency in Victoria, BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trixode Studios — AI Software Company in Victoria, BC",
    description:
      "Victoria's leading AI agency. Custom AI agents, websites, and AI SEO for businesses across BC.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "Next.js",
  other: {
    "geo.region": "CA-BC",
    "geo.placename": "Victoria",
    "geo.position": "48.4284;-123.3656",
    ICBM: "48.4284, -123.3656",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${montserrat.variable} ${inter.className}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
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
