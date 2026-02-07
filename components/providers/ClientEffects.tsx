"use client"

import dynamic from "next/dynamic"

// Dynamic import for FluidBackground - client-side only
const FluidBackground = dynamic(() => import("@/components/background/FluidBackground"), { ssr: false })

export default function ClientEffects() {
    return <FluidBackground />
}
