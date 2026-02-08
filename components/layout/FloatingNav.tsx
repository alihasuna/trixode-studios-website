"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useReducedMotion } from "framer-motion"
import MobileMenu from "@/components/mobile-menu"
import { HexagonLogo } from "@/components/ui/HexagonLogo"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export default function FloatingNav() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
    ]

    const contactLink = { name: "Contact", href: "/contact" }


    return (
        <nav
            className={`fixed top-4 lg:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] max-w-[1400px] z-[100] ${prefersReducedMotion ? "" : "transition-all duration-400"} rounded-full px-4 lg:px-8 py-3 lg:py-4 ${scrolled
                ? "bg-white/80 dark:bg-[#030303]/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 magnetic group">
                    <HexagonLogo size={32} />
                    <span className="text-xl font-medium tracking-tight text-black dark:text-white font-grotesk">
                        Trixode
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    <ul className="flex items-center gap-12">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (pathname?.startsWith(link.href) && link.href !== "/")
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`magnetic text-sm font-normal tracking-normal relative py-2 transition-colors duration-300 group ${isActive ? "text-black dark:text-white" : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300 ${isActive ? "w-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "w-0 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                    <Link
                        href={contactLink.href}
                        className="magnetic px-5 py-2 bg-brand-blue text-white text-sm font-medium rounded-full hover:bg-brand-blue/90 transition-colors duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    >
                        {contactLink.name}
                    </Link>
                    <ThemeToggle />
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden flex items-center gap-3">
                    <ThemeToggle />
                    <MobileMenu currentPath={pathname || "/"} />
                </div>
            </div>
        </nav>
    )
}
