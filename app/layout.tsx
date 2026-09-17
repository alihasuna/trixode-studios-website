import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, Montserrat, Cormorant_Garamond } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import ClientEffects from "@/components/providers/ClientEffects"
import { professionalServiceSchema, websiteSchema } from "@/lib/schemas"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk" })
const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-montserrat" })
// Editorial serif — scoped exclusively to the Delprado concept-mock canvas (.delprado-canvas). Never used in Trixode chrome.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant" })
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
    default: "Trixode Studios — Secure Agentic Systems",
    template: "%s | Trixode Studios",
  },
  description:
    "A Victoria, BC research-led studio building measurable, secure agentic systems with accountable human decisions.",
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
    canonical: '/',
  },
  openGraph: {
    title: "Trixode Studios — Secure Agentic Systems",
    description:
      "A research-led studio building measurable, secure agentic systems with accountable human decisions.",
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "Trixode Studios",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Trixode Studios, a research-led agentic software studio in Victoria, BC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trixode Studios — Secure Agentic Systems",
    description:
      "A research-led studio building measurable, secure agentic systems with accountable human decisions.",
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${montserrat.variable} ${cormorant.variable} ${inter.className}`}>
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
        <Analytics />
      </body>
    </html>
  )
}
