import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Trixode Studios - Crafting the Future of Software",
  description: "High-tech software and AI studio crafting elegant tools for scientists, innovators, and creators. We specialize in AI-powered solutions, research tools and advanced software development.",
  keywords: "AI, software development, research tools, innovation, technology, quantum computing, machine learning, scientific tools, data science",
  authors: [{ name: "Trixode Studios" }],
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
