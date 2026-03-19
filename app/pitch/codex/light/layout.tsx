"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function CodexLightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { setTheme, theme } = useTheme()

  useEffect(() => {
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
