import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk" })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Trixode Studios - Crafting the Future of Software",
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
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trixode Studios"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trixode Studios - Crafting the Future of Software",
    description: "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators.",
    images: ["/images/og-image.jpg"],
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
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
