"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { createPortal } from "react-dom"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

interface MobileMenuProps {
  currentPath?: string
}

export default function MobileMenu({ currentPath = "/" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      const timer = setTimeout(() => setIsVisible(false), 500)
      return () => clearTimeout(timer)
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "People", href: "/people" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  // Menu Overlay content - rendered via portal
  const MenuOverlay = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0"
      style={{
        zIndex: 9999,
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: 'opacity 0.5s ease-out, visibility 0.5s ease-out',
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Dark background overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-[#030303]"
        style={{
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.4s ease-out',
        }}
        onClick={closeMenu}
      />

      {/* Decorative gradient orbs */}
      <div
        className="absolute rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/20 blur-[100px]"
        style={{
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
          transition: 'all 0.8s ease-out',
        }}
      />
      <div
        className="absolute rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-600/15 blur-[80px]"
        style={{
          bottom: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 0.8s ease-out 0.1s',
        }}
      />

      {/* Menu Content */}
      <div className="relative h-full flex flex-col justify-between p-6 pt-24 pb-10 overflow-y-auto">
        {/* Header with Logo */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.5s ease-out 0.1s',
          }}
        >
          <HexagonLogo size={32} />
          <span className="text-2xl font-medium text-white font-['Space_Grotesk',sans-serif] tracking-tight">
            Trixode
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="space-y-4">
            {menuItems.map((item, index) => {
              const isActive = currentPath === item.href
              const delay = 0.15 + (index * 0.05)

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-4 py-2"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.5s ease-out ${delay}s`,
                    }}
                  >
                    {/* Active indicator dot */}
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 flex-shrink-0
                        ${isActive
                          ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                          : "bg-white/20 group-hover:bg-blue-400"
                        }`}
                    />

                    {/* Link text */}
                    <span
                      className={`text-3xl sm:text-4xl font-light tracking-tight transition-all duration-300
                        ${isActive
                          ? "text-white"
                          : "text-white/50 group-hover:text-white group-hover:translate-x-2"
                        }`}
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {item.name}
                    </span>

                    {/* Hover arrow */}
                    <svg
                      className={`w-5 h-5 transition-all duration-300 flex-shrink-0
                        ${isActive
                          ? "text-blue-500 opacity-100 translate-x-0"
                          : "text-white/40 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className="space-y-6"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.5s',
          }}
        >
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-white/30 text-sm font-light">
              © {new Date().getFullYear()} Trixode Studios
            </p>
            <p className="text-white/20 text-xs">
              Victoria, BC
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Enhanced Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="relative z-[10000] w-12 h-12 flex items-center justify-center focus:outline-none group"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
      >
        {/* Glow effect on hover */}
        <span className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300 scale-0 group-hover:scale-100" />

        {/* Animated hamburger lines */}
        <div className="relative w-6 h-5 flex flex-col justify-between">
          {/* Top line */}
          <span
            className={`block h-[2px] rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center
              ${isOpen
                ? "translate-y-[9px] rotate-45 w-full bg-white"
                : "w-full group-hover:w-4 group-hover:translate-x-2"
              }`}
          />
          {/* Middle line */}
          <span
            className={`block h-[2px] rounded-full bg-white transition-all duration-300 ease-out
              ${isOpen
                ? "opacity-0 translate-x-4"
                : "w-full opacity-100 group-hover:w-6"
              }`}
          />
          {/* Bottom line */}
          <span
            className={`block h-[2px] rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center
              ${isOpen
                ? "-translate-y-[9px] -rotate-45 w-full bg-white"
                : "w-4 group-hover:w-full group-hover:-translate-x-0"
              }`}
          />
        </div>
      </button>

      {/* Render menu overlay via portal to escape transform context */}
      {mounted && isVisible && createPortal(MenuOverlay, document.body)}
    </>
  )
}
