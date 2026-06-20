import type { Metadata } from "next"

import Morphika55Mock from "./Morphika55Mock"

export const metadata: Metadata = {
  title: "Morphika 5.5 - Interactive App Mock",
  description:
    "A cinematic product mock for Morphika, the biometric-gated operating layer for AI-native multi-inbox work.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function Morphika55Page() {
  return <Morphika55Mock />
}
