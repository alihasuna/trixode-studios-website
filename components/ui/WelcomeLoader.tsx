"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface WelcomeLoaderProps {
    onLoadingComplete?: () => void
}

export default function WelcomeLoader({ onLoadingComplete }: WelcomeLoaderProps) {
    const [isVisible, setIsVisible] = useState(true)
    const [dimension, setDimension] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })

        const handleResize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener("resize", handleResize)

        // Hide loader after animation completes
        const timer = setTimeout(() => {
            setIsVisible(false)
            if (onLoadingComplete) onLoadingComplete()
        }, 3000)

        return () => {
            clearTimeout(timer)
            window.removeEventListener("resize", handleResize)
        }
    }, [onLoadingComplete])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    // The "smile" curve: control point is significantly lower than the sides to create the heavy drape look
    // Then it flattens out as it goes up
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

    const exitPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} ${dimension.height * 0.4} 0 0 L0 0`

    return (
        <AnimatePresence>
            {isVisible && dimension.width > 0 && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center flex-col text-white"
                >
                    {/* SVG Curtain */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <svg className="w-full h-full">
                            <motion.path
                                fill="#030303"
                                initial={{ d: initialPath }}
                                exit={{
                                    d: exitPath,
                                    transition: {
                                        duration: 1.2,
                                        ease: [0.76, 0, 0.24, 1],
                                        delay: 0.2
                                    }
                                }}
                            />
                        </svg>
                    </div>

                    {/* Logo Wrapper with higher z-index */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center"
                        exit={{
                            opacity: 0,
                            y: -100,
                            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
                        }}
                    >
                        {/* Logo Letters */}
                        <div className="flex text-[2rem] md:text-[2.5rem] font-light tracking-[0.3em] md:tracking-[0.5em] font-['Space_Grotesk',sans-serif] overflow-hidden">
                            {"Trixode-Studios".split("").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: "100%", rotateX: 90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2 + index * 0.05,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Animated Line */}
                        <div className="w-[200px] h-[1px] bg-white/10 mt-12 relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.5,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent"
                                style={{
                                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
                                }}
                            >
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 2,
                                        delay: 1.5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-full h-full"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
