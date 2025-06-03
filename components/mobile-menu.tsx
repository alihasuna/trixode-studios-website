"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Menu } from "lucide-react"

interface MobileMenuProps {
  currentPath?: string
}

export default function MobileMenu({ currentPath = "/" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: "People", href: "/people" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen])
  const closeMenu = useCallback(() => setIsOpen(false), [])

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white hover:text-cyan-300 transition-colors duration-300"
        aria-label="Toggle mobile menu"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0a0a1a]/95 backdrop-blur-xl border-l border-blue-500/20 z-40 md:hidden"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-blue-500/10">
                <span className="text-xl font-black text-white">Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-6">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => {
                    const isActive = currentPath === item.href
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`block py-3 px-4 rounded-xl font-black text-lg transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 to-cyan-400/20 text-cyan-300 border border-cyan-400/30"
                              : "text-gray-300 hover:text-white hover:bg-blue-900/20"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    )
                  })}
                </ul>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 pt-6 border-t border-blue-500/10"
                >
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="block w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white text-center py-3 px-6 rounded-xl font-black transition-all duration-300 shadow-lg shadow-blue-500/25"
                  >
                    Get In Touch
                  </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mt-6 pt-6 border-t border-blue-500/10"
                >
                  <p className="text-sm font-black text-gray-400 mb-4">FOLLOW US</p>
                  <div className="flex space-x-4">
                    {[
                      { name: "GitHub", href: "https://github.com/trixodestudios" },
                      { name: "LinkedIn", href: "https://linkedin.com/company/trixodestudios" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-300 transition-colors duration-300 font-semibold text-sm"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
