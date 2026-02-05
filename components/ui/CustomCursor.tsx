"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const cursorRef = useRef<HTMLDivElement | null>(null)
    const followerRef = useRef<HTMLDivElement | null>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const cursorRefPos = useRef({ x: 0, y: 0 })
    const followerRefPos = useRef({ x: 0, y: 0 })

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Track mouse position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        document.addEventListener("mousemove", handleMouseMove)
        return () => document.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Animate cursor and follower
    useEffect(() => {
        if (isMobile) return
        let animationFrame: number

        const animate = () => {
            const cursorEl = cursorRef.current
            const followerEl = followerRef.current
            if (!cursorEl || !followerEl) {
                animationFrame = requestAnimationFrame(animate)
                return
            }

            cursorRefPos.current = {
                x: mouseRef.current.x,
                y: mouseRef.current.y,
            }

            followerRefPos.current = {
                x: followerRefPos.current.x + (mouseRef.current.x - followerRefPos.current.x) * 0.25,
                y: followerRefPos.current.y + (mouseRef.current.y - followerRefPos.current.y) * 0.25,
            }

            cursorEl.style.transform = `translate3d(${cursorRefPos.current.x}px, ${cursorRefPos.current.y}px, 0) translate(-50%, -50%)`
            followerEl.style.transform = `translate3d(${followerRefPos.current.x}px, ${followerRefPos.current.y}px, 0) translate(-50%, -50%)`

            animationFrame = requestAnimationFrame(animate)
        }

        animationFrame = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(animationFrame)
    }, [isMobile])

    // Handle hover state
    useEffect(() => {
        if (isMobile) return
        const isInteractive = (target: EventTarget | null) => {
            if (!(target instanceof Element)) return false
            return Boolean(
                target.closest(
                    "a, button, .magnetic, [role='button'], input, textarea, select, label"
                )
            )
        }
        const handlePointerOver = (event: PointerEvent) => {
            setIsHovering(isInteractive(event.target))
        }
        const handlePointerOut = (event: PointerEvent) => {
            if (!isInteractive(event.relatedTarget)) {
                setIsHovering(false)
            }
        }

        document.addEventListener("pointerover", handlePointerOver)
        document.addEventListener("pointerout", handlePointerOut)
        return () => {
            document.removeEventListener("pointerover", handlePointerOver)
            document.removeEventListener("pointerout", handlePointerOut)
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) return
        document.body.classList.add("has-custom-cursor")
        return () => {
            document.body.classList.remove("has-custom-cursor")
        }
    }, [isMobile])

    if (isMobile) return null

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className={`fixed pointer-events-none z-[9999] rounded-full border border-[rgba(255,255,255,0.55)] transition-[width,height,background-color,border-color] duration-150 ease-out ${
                    isHovering
                        ? "w-[42px] h-[42px] border-white/70 bg-white/15"
                        : "w-[14px] h-[14px] bg-transparent"
                }`}
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
                    mixBlendMode: "normal",
                    willChange: "transform",
                }}
            />

            {/* Cursor follower blob */}
            <div
                ref={followerRef}
                className="fixed pointer-events-none z-[9998] w-[26px] h-[26px] rounded-full"
                style={{
                    left: 0,
                    top: 0,
                    transform: "translate3d(0, 0, 0) translate(-50%, -50%)",
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)",
                    willChange: "transform",
                }}
            />
        </>
    )
}
