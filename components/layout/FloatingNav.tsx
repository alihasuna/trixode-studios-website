"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import MobileMenu from "@/components/mobile-menu"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

export default function FloatingNav() {
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Projects", href: "/projects" },
        { name: "People", href: "/people" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ]


    return (
        <nav
            className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-[1400px] z-[100] transition-all duration-400 rounded-full px-4 md:px-8 py-3 md:py-4 ${scrolled
                ? "bg-[#030303]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                : "bg-transparent"
                }`}
        >
            <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 magnetic group">
                    <HexagonLogo size={32} />
                    <span className="text-xl font-medium tracking-tight text-white font-['Space_Grotesk',sans-serif]">
                        Trixode
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (pathname?.startsWith(link.href) && link.href !== "/")
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`magnetic text-sm font-normal tracking-normal relative py-2 transition-colors duration-300 group ${isActive ? "text-white" : "text-white/50 hover:text-white"
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

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <MobileMenu currentPath={pathname || "/"} />
                </div>
            </div>
        </nav>
    )
}
