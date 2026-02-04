"use client"

import { useEffect } from "react"

export function useMagneticEffect() {
    useEffect(() => {
        const magneticElements = document.querySelectorAll('.magnetic')

        const handleMouseMove = (e: MouseEvent, el: Element) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

                ; (el as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
        }

        const handleMouseLeave = (el: Element) => {
            ; (el as HTMLElement).style.transform = 'translate(0, 0)'
        }

        magneticElements.forEach((el) => {
            const moveHandler = (e: Event) => handleMouseMove(e as MouseEvent, el)
            const leaveHandler = () => handleMouseLeave(el)

            el.addEventListener('mousemove', moveHandler)
            el.addEventListener('mouseleave', leaveHandler)

                // Store handlers for cleanup
                ; (el as any)._magneticHandlers = { moveHandler, leaveHandler }
        })

        return () => {
            magneticElements.forEach((el) => {
                const handlers = (el as any)._magneticHandlers
                if (handlers) {
                    el.removeEventListener('mousemove', handlers.moveHandler)
                    el.removeEventListener('mouseleave', handlers.leaveHandler)
                }
            })
        }
    }, [])
}
