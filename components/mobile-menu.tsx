"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Menu } from "lucide-react"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

interface MobileMenuProps {
  currentPath?: string
}

export default function MobileMenu({ currentPath = "/" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "People", href: "/people" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 text-white/70 hover:text-white transition-colors duration-300"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#030303]/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl">
            <div className="flex flex-col h-full p-8 relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-12 relative z-10">
                <div className="flex items-center gap-3">
                  <HexagonLogo size={28} />
                  <span className="text-xl font-medium text-white font-['Space_Grotesk',sans-serif]">
                    Trixode
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 relative z-10">
                <ul className="space-y-6">
                  {menuItems.map((item, index) => {
                    const isActive = currentPath === item.href

                    return (
                      <li key={item.name} style={{ transitionDelay: `${index * 50}ms` }} className={`transform transition-all duration-500 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block text-3xl font-light font-['Space_Grotesk',sans-serif] transition-all duration-300 ${isActive
                            ? "text-white"
                            : "text-white/50 hover:text-white hover:pl-2"
                            }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="pt-8 border-t border-white/10 relative z-10">
                <p className="text-white/30 text-sm font-light">
                  © {new Date().getFullYear()} Trixode Studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
