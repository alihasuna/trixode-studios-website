"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function LightPitchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setTheme, theme } = useTheme()

    useEffect(() => {
        // Store the previous theme to restore it when navigating away
        const prevTheme = theme
        setTheme("light")

        return () => {
            if (prevTheme) {
                setTheme(prevTheme)
            }
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <>{children}</>
}
