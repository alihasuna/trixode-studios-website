"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"

interface WelcomeLoaderProps {
    onLoadingComplete?: () => void
    onAnimationProgress?: (progress: number) => void
}

export default function WelcomeLoader({ onLoadingComplete, onAnimationProgress }: WelcomeLoaderProps) {
    const prefersReducedMotion = useReducedMotion()
    const { resolvedTheme } = useTheme()
    const [isVisible, setIsVisible] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [showCurtainAnimation, setShowCurtainAnimation] = useState(false)
    const [showLogoExit, setShowLogoExit] = useState(false)

    const isDark = resolvedTheme === "dark"

    // Use refs to store callbacks to avoid dependency issues
    const onProgressRef = useRef(onAnimationProgress)
    const onCompleteRef = useRef(onLoadingComplete)

    // Keep refs updated
    useEffect(() => {
        onProgressRef.current = onAnimationProgress
        onCompleteRef.current = onLoadingComplete
    })

    // Handle client-side mounting
    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Main animation effect - only runs once on mount
    useEffect(() => {
        if (!isMounted) return

        if (prefersReducedMotion) {
            setIsVisible(false)
            onProgressRef.current?.(100)
            onCompleteRef.current?.()
            return
        }

        // Simple, reliable timeline with direct callback calls
        const timers: ReturnType<typeof setTimeout>[] = []

        // Start - report initial progress
        onProgressRef.current?.(10)

        // 300ms - letters animating
        timers.push(setTimeout(() => onProgressRef.current?.(20), 300))

        // 800ms - more letters
        timers.push(setTimeout(() => onProgressRef.current?.(30), 800))

        // 1200ms - underline drawing
        timers.push(setTimeout(() => onProgressRef.current?.(40), 1200))

        // 1600ms - Start curtain animation
        timers.push(setTimeout(() => {
            onProgressRef.current?.(50)
            setShowLogoExit(true)
            setShowCurtainAnimation(true)
        }, 1600))

        // 1900ms - curtain lifting
        timers.push(setTimeout(() => onProgressRef.current?.(65), 1900))

        // 2200ms - curtain mid-way
        timers.push(setTimeout(() => onProgressRef.current?.(80), 2200))

        // 2500ms - curtain almost done
        timers.push(setTimeout(() => onProgressRef.current?.(92), 2500))

        // 2800ms - curtain complete
        timers.push(setTimeout(() => onProgressRef.current?.(100), 2800))

        // 3000ms - Complete and hide
        timers.push(setTimeout(() => {
            setIsVisible(false)
            onCompleteRef.current?.()
        }, 3000))

        return () => {
            timers.forEach(clearTimeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, prefersReducedMotion])

    // Multi-layer curtain configuration - adapts to current theme
    const curtainLayers = isDark
        ? [
            { delay: 0, duration: 1.2, color: '#030303', zIndex: 30 },
            { delay: 0.06, duration: 1.15, color: '#080810', zIndex: 25 },
            { delay: 0.12, duration: 1.1, color: '#101018', zIndex: 20 },
        ]
        : [
            { delay: 0, duration: 1.2, color: '#e8e6e3', zIndex: 30 },
            { delay: 0.06, duration: 1.15, color: '#dfddd9', zIndex: 25 },
            { delay: 0.12, duration: 1.1, color: '#d5d3cf', zIndex: 20 },
        ]

    // Don't render on server or before mount - use CSS variable so it
    // matches whatever theme the user's system selects before hydration
    if (!isMounted) {
        return (
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg)' }}
            >
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Loading...</div>
            </div>
        )
    }

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="welcome-loader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center flex-col"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Multi-layer GPU-accelerated curtain */}
                    {curtainLayers.map((layer, index) => (
                        <motion.div
                            key={`curtain-${index}`}
                            className="absolute inset-0 origin-top"
                            style={{
                                backgroundColor: layer.color,
                                zIndex: layer.zIndex,
                                willChange: 'transform',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)',
                            }}
                            initial={{ scaleY: 1 }}
                            animate={showCurtainAnimation ? {
                                scaleY: 0,
                            } : {
                                scaleY: 1,
                            }}
                            transition={{
                                duration: layer.duration,
                                delay: layer.delay,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        />
                    ))}

                    {/* Curtain edge glow line */}
                    <motion.div
                        className="absolute left-0 right-0 h-[3px] origin-top pointer-events-none"
                        style={{
                            top: 0,
                            background: isDark
                                ? 'linear-gradient(90deg, transparent 10%, rgba(59, 130, 246, 0.5) 50%, transparent 90%)'
                                : 'linear-gradient(90deg, transparent 10%, rgba(59, 130, 246, 0.35) 50%, transparent 90%)',
                            boxShadow: isDark
                                ? '0 2px 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)'
                                : '0 2px 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)',
                            zIndex: 35,
                            willChange: 'transform',
                        }}
                        initial={{ y: 0 }}
                        animate={showCurtainAnimation ? {
                            y: '100vh',
                        } : {
                            y: 0,
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    />

                    {/* Logo Wrapper */}
                    <motion.div
                        className="relative z-40 flex flex-col items-center"
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={showLogoExit ? {
                            opacity: 0,
                            y: -60,
                            scale: 0.9,
                        } : {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: 0.5,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    >
                        {/* Logo Letters with 3D flip effect */}
                        <div
                            className="flex text-[1.8rem] sm:text-[2rem] md:text-[2.5rem] font-light tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.5em] font-grotesk overflow-hidden text-black dark:text-white"
                            style={{ perspective: '1000px' }}
                        >
                            {"Trixode-Studios".split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        opacity: 0,
                                        y: '100%',
                                        rotateX: 90,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        rotateX: 0,
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.1 + index * 0.035,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        willChange: 'transform, opacity',
                                    }}
                                >
                                    {letter === "-" ? (
                                        <span className="opacity-40 mx-1">&#xB7;</span>
                                    ) : letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Animated underline with glow pulse */}
                        <div className="relative w-[180px] sm:w-[200px] h-[1px] bg-black/10 dark:bg-white/10 mt-8 sm:mt-12 overflow-hidden">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute left-0 top-0 w-full h-full origin-left"
                                style={{ willChange: 'transform' }}
                            >
                                <div
                                    className="w-full h-full bg-gradient-to-r from-transparent via-brand-blue to-transparent"
                                    style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
                                />
                            </motion.div>
                        </div>

                        {/* Subtle tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.4, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 font-grotesk"
                        >
                            Crafting Intelligence
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
