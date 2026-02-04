"use client"

import { useEffect, useState, useCallback } from "react"

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        document.addEventListener('mousemove', handleMouseMove)
        return () => document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Animate cursor and follower
    useEffect(() => {
        let animationFrame: number

        const animate = () => {
            setCursorPosition((prev) => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.2,
                y: prev.y + (mousePosition.y - prev.y) * 0.2,
            }))

            setFollowerPosition((prev) => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.1,
                y: prev.y + (mousePosition.y - prev.y) * 0.1,
            }))

            animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [mousePosition])

    // Handle hover state
    useEffect(() => {
        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => setIsHovering(false)

        const interactiveElements = document.querySelectorAll('a, button, .magnetic')

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', handleMouseEnter)
            el.addEventListener('mouseleave', handleMouseLeave)
        })

        return () => {
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', handleMouseEnter)
                el.removeEventListener('mouseleave', handleMouseLeave)
            })
        }
    }, [])

    if (isMobile) return null

    return (
        <>
            {/* Main cursor ring */}
            <div
                className={`fixed pointer-events-none z-[9999] border border-[#3b82f6] rounded-full transition-all duration-300 ${isHovering ? 'w-[50px] h-[50px] border-white/50 bg-white/10' : 'w-[20px] h-[20px]'
                    }`}
                style={{
                    left: `${cursorPosition.x}px`,
                    top: `${cursorPosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                }}
            />

            {/* Cursor follower blob */}
            <div
                className="fixed pointer-events-none z-[9998] w-[40px] h-[40px] rounded-full transition-transform duration-150"
                style={{
                    left: `${followerPosition.x}px`,
                    top: `${followerPosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                }}
            />
        </>
    )
}
