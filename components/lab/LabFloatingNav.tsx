"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "framer-motion"
import { createPortal } from "react-dom"
import { HexagonLogo } from "@/components/ui/HexagonLogo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const navLinks = [
    { name: "Lab", href: "/lab" },
    { name: "Workflow", href: "/lab/workflow" },
]

const contactLink = { name: "Contact", href: "/lab/contact" }

export default function LabFloatingNav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    const isActive = (href: string) =>
        pathname === href || (pathname?.startsWith(href + "/") ?? false)

    return (
        <>
            <nav
                className={`fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] max-w-[1400px] z-[100] ${prefersReducedMotion ? "" : "transition-all duration-400"} rounded-full px-4 lg:px-8 py-3 lg:py-4 ${scrolled
                    ? "bg-white/80 dark:bg-[#030303]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    : "bg-transparent"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <Link href="/lab" className="flex items-center gap-3 magnetic group">
                        <HexagonLogo size={32} />
                        <span className="text-xl font-medium tracking-tight text-black dark:text-white font-grotesk">
                            Trixode
                            <span className="ml-1 text-brand-blue/80">/lab</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-12">
                            {navLinks.map((link) => {
                                const active = isActive(link.href) && link.href !== "/lab" || pathname === link.href
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`magnetic text-sm font-normal tracking-normal relative py-2 transition-colors duration-300 group ${active ? "text-black dark:text-white" : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                                }`}
                                        >
                                            {link.name}
                                            <span
                                                className={`absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300 ${active ? "w-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "w-0 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                    }`}
                                            />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <Link
                            href={contactLink.href}
                            className="magnetic px-5 py-2 bg-[#2563eb] text-white text-sm font-medium rounded-full hover:bg-[#2563eb]/90 transition-colors duration-300 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                        >
                            {contactLink.name}
                        </Link>
                        <ThemeToggle />
                    </div>

                    <div className="lg:hidden flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="relative z-[10000] w-12 h-12 flex items-center justify-center focus:outline-none group"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                        >
                            <div className="relative w-6 h-5 flex flex-col justify-between">
                                <span className={`block h-[2px] rounded-full bg-black dark:bg-white transition-all duration-500 origin-center ${menuOpen ? "translate-y-[9px] rotate-45 w-full" : "w-full"}`} />
                                <span className={`block h-[2px] rounded-full bg-black dark:bg-white transition-all duration-300 ${menuOpen ? "opacity-0 translate-x-4" : "w-full opacity-100"}`} />
                                <span className={`block h-[2px] rounded-full bg-black dark:bg-white transition-all duration-500 origin-center ${menuOpen ? "-translate-y-[9px] -rotate-45 w-full" : "w-4"}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {mounted && createPortal(
                <div
                    className="fixed inset-0 lg:hidden"
                    style={{
                        zIndex: 9999,
                        opacity: menuOpen ? 1 : 0,
                        visibility: menuOpen ? "visible" : "hidden",
                        transition: "opacity 0.4s ease-out, visibility 0.4s ease-out",
                        pointerEvents: menuOpen ? "auto" : "none",
                    }}
                >
                    <div
                        className="absolute inset-0 bg-white dark:bg-[#030303]"
                        onClick={() => setMenuOpen(false)}
                    />
                    <div
                        className="absolute rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/20 blur-[60px] sm:blur-[100px]"
                        style={{ top: "-20%", right: "-10%", width: "60vw", height: "60vw", opacity: menuOpen ? 1 : 0, transition: "opacity 0.6s ease-out" }}
                    />
                    <div className="relative h-full flex flex-col justify-between p-6 pt-24 pb-10 overflow-y-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <HexagonLogo size={32} />
                            <span className="text-2xl font-medium text-black dark:text-white font-grotesk tracking-tight">
                                Trixode<span className="ml-1 text-brand-blue/80">/lab</span>
                            </span>
                        </div>

                        <nav className="flex-1 flex flex-col justify-center">
                            <ul className="space-y-6">
                                {[...navLinks, contactLink].map((item, index) => {
                                    const active = pathname === item.href
                                    const delay = 0.15 + index * 0.05
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="group flex items-center gap-4 py-3"
                                                style={{
                                                    opacity: menuOpen ? 1 : 0,
                                                    transform: menuOpen ? "translateX(0)" : "translateX(-30px)",
                                                    transition: `all 0.5s ease-out ${delay}s`,
                                                }}
                                            >
                                                <span
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0 ${active ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" : "bg-black/20 dark:bg-white/20 group-hover:bg-blue-400"}`}
                                                />
                                                <span
                                                    className={`text-3xl sm:text-4xl font-light tracking-tight transition-all duration-300 ${active ? "text-black dark:text-white" : "text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white"}`}
                                                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                                                >
                                                    {item.name}
                                                </span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>

                        <div className="border-t border-black/10 dark:border-white/10 pt-6 flex items-center justify-between">
                            <p className="text-black/30 dark:text-white/30 text-sm font-light">
                                © {new Date().getFullYear()} Trixode-Studios
                            </p>
                            <p className="text-black/20 dark:text-white/20 text-xs">Victoria, BC</p>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    )
}
