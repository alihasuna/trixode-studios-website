"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        if (typeof window === "undefined" || typeof window.matchMedia !== "function") return

        const media = window.matchMedia(query)
        setMatches(media.matches)

        const listener = () => setMatches(media.matches)

        if (typeof media.addEventListener === "function") {
            media.addEventListener("change", listener)
            return () => media.removeEventListener("change", listener)
        }

        media.addListener(listener)
        return () => media.removeListener(listener)
    }, [query])

    // Return false during SSR and first render to avoid hydration mismatch
    if (!mounted) return false

    return matches
}
