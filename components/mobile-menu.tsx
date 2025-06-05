"use client"

import { useState } from "react"
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

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-2 text-white hover:text-blue-400 transition-colors duration-300"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0a0a1a]/95 backdrop-blur-xl border-l border-blue-500/20 z-40 md:hidden shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-blue-500/20 bg-[#0a0a1a]/95 backdrop-blur-xl">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 px-6 py-4 bg-[#0a0a1a]/95 backdrop-blur-xl">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                          currentPath === item.href
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-blue-500/20 bg-[#0a0a1a]/95 backdrop-blur-xl">
                <p className="text-sm text-gray-400 mb-4">Connect with us</p>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/trixodestudios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 border border-blue-500/20 hover:border-blue-400/40"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/trixode-studios-054154311/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 border border-blue-500/20 hover:border-blue-400/40"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
