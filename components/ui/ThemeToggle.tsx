"use client"

import { useTheme } from "next-themes"
import { useState, useEffect, useCallback } from "react"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'flash' | 'fade'>('idle')

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  const handleToggle = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    setAnimationPhase('flash')

    // Flash phase
    setTimeout(() => {
      setAnimationPhase('fade')
      setTheme(isDark ? "light" : "dark")
    }, 150)

    // Complete animation
    setTimeout(() => {
      setAnimationPhase('idle')
      setIsAnimating(false)
    }, 700)
  }, [isDark, isAnimating, setTheme])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5" />
    )
  }

  return (
    <>
      {/* Smooth screen transition overlay */}
      <AnimatePresence>
        {animationPhase !== 'idle' && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[99]"
            initial={{ opacity: 0 }}
            animate={{
              opacity: animationPhase === 'flash' ? 1 : 0
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: animationPhase === 'flash' ? 0.15 : 0.5,
              ease: animationPhase === 'flash' ? 'easeOut' : [0.4, 0, 0.2, 1]
            }}
            style={{
              background: isDark
                ? 'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(250, 204, 21, 0.2), rgba(255, 255, 255, 0.1) 50%, transparent 80%)'
                : 'radial-gradient(ellipse 100% 80% at 50% 60%, rgba(30, 58, 138, 0.25), rgba(0, 0, 0, 0.35) 50%, transparent 80%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 80px, black 120px)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 80px, black 120px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="magnetic relative w-10 h-10 rounded-full flex items-center justify-center
                   bg-black/5 dark:bg-white/5 
                   hover:bg-black/10 dark:hover:bg-white/10
                   border border-black/10 dark:border-white/10
                   transition-colors duration-300 overflow-hidden"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: isAnimating
              ? isDark
                ? 'radial-gradient(circle, rgba(250, 204, 21, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(100, 116, 139, 0.3) 0%, transparent 70%)'
              : 'transparent'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon container with smooth transition */}
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              className="relative z-10"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.2 }
              }}
            >
              <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="relative z-10"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.2 }
              }}
            >
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring effect on toggle */}
        <AnimatePresence>
          {isAnimating && (
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: isDark ? 'rgba(250, 204, 21, 0.6)' : 'rgba(100, 116, 139, 0.5)'
              }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Outer glow */}
        <motion.div
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          animate={{
            boxShadow: isAnimating
              ? isDark
                ? '0 0 25px 8px rgba(250, 204, 21, 0.35), 0 0 50px 15px rgba(250, 204, 21, 0.15)'
                : '0 0 25px 8px rgba(100, 116, 139, 0.25), 0 0 50px 15px rgba(100, 116, 139, 0.1)'
              : '0 0 0 0 transparent'
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </motion.button>
    </>
  )
}

export default ThemeToggle
