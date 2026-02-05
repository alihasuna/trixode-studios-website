"use client"

import { useEffect } from "react"

export function useMagneticEffect() {
    useEffect(() => {
        if (typeof window === "undefined") return
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
        if (!canHover.matches || reduceMotion.matches) return

        const magneticElements = document.querySelectorAll('.magnetic')

        const handleMouseMove = (e: MouseEvent, el: Element) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            // Use simple direct update, browser handles compositing well for transform
            // But strict throttling via RAF prevents excessive JS work
            requestAnimationFrame(() => {
                (el as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
            })
        }

        const handleMouseLeave = (el: Element) => {
            requestAnimationFrame(() => {
                (el as HTMLElement).style.transform = 'translate(0, 0)'
            })
        }

        const cleanupMap = new Map<Element, { move: (e: Event) => void, leave: () => void }>()

        magneticElements.forEach((el) => {
            const moveHandler = (e: Event) => handleMouseMove(e as MouseEvent, el)
            const leaveHandler = () => handleMouseLeave(el)

            cleanupMap.set(el, { move: moveHandler, leave: leaveHandler })

            el.addEventListener('mousemove', moveHandler)
            el.addEventListener('mouseleave', leaveHandler)
        })

        return () => {
            magneticElements.forEach((el) => {
                const handlers = cleanupMap.get(el)
                if (handlers) {
                    el.removeEventListener('mousemove', handlers.move)
                    el.removeEventListener('mouseleave', handlers.leave)
                }
            })
        }
    }, [])
}
