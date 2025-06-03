"use client"

import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"

export default function CursorEffect() {
  const { mousePosition, isMobile, isClient } = useMousePosition()

  // Don't render on server or mobile
  if (!isClient || isMobile) {
    return null
  }

  return (
    <motion.div
      className="fixed w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-0"
      style={{
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  )
} 