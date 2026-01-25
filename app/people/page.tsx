"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import CursorEffect from "@/components/cursor-effect"

// Connected Hexagon Logo Component
const ConnectedHexagonLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => {
  const hexagonPoints = []
  const center = size / 2
  const radius = size * 0.35

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    hexagonPoints.push({ x, y })
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <polygon
          points={hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />
        {hexagonPoints.map((point, i) => (
          <g key={i}>
            <line
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400/60"
            />
            <circle cx={point.x} cy={point.y} r="2" fill="currentColor" className="text-blue-400" />
          </g>
        ))}
        <circle cx={center} cy={center} r="2" fill="currentColor" className="text-blue-400" />
      </svg>
    </div>
  )
}

export default function PeoplePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Cursor Effect */}
      <CursorEffect />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ConnectedHexagonLogo size={32} />
              <span className="text-xl font-black text-white">Trixode Studios</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/people" className="text-cyan-400 font-black">
                People
              </Link>
              {["About", "Projects", "Blog", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item}
                </Link>
              ))}
            </div>
            {/* Mobile Menu */}
            <MobileMenu currentPath="/people" />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-16 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PEOPLE
          </motion.h1>

          {/* People Grid */}
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Hussien Ballouk */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-10 shadow-2xl">
              <div className="flex flex-col items-start gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-blue-400/30 shadow-xl shadow-blue-500/20">
                      <img
                        src="https://res.cloudinary.com/dmkfxjv0s/image/upload/w_400,h_400,c_fill,g_face,f_auto,q_auto/v1749088385/ceo_photo.png"
                        alt="Hussien Ballouk - CEO of Trixode Studios"
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
                    </div>

                    {/* Corner lights */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-blue-400/20 shadow-2xl shadow-blue-500/10"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-black mb-2 text-white">HUSSIEN BALLOUK</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-6 mx-auto"></div>
                  <p className="text-lg text-blue-300 mb-6 font-black">FOUNDER & CEO OF TRIXODE STUDIOS</p>

                  <blockquote className="text-xl md:text-2xl font-black text-gray-300 mb-8 leading-relaxed">
                    "I BUILD ELEGANT, HIGH-IMPACT SOFTWARE THAT EMPOWERS RESEARCHERS, SCIENTISTS, AND CREATORS."
                  </blockquote>

                  {/* Social Links */}
                  <div className="flex space-x-4 justify-center">
                    {[
                      { icon: Github, href: "#" },
                      { icon: Linkedin, href: "#" },
                      { icon: Mail, href: "mailto:ceo@trixode-studios.com" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-xl flex items-center justify-center hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="h-5 w-5 text-blue-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6 text-white">EXPERTISE</h3>
              <ul className="space-y-3 text-gray-300">
                {[
                  "Full-Stack Development",
                  "AI & Machine Learning",
                  "Product Strategy",
                  "Research Tools",
                  "Team Leadership",
                ].map((skill, index) => (
                  <motion.li
                    key={skill}
                    className="flex items-center font-semibold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-400/20 rounded-2xl p-8">
              <h3 className="text-2xl font-black mb-6 text-white">MISSION</h3>
              <p className="text-gray-300 leading-relaxed font-semibold">
                Building technology that bridges the gap between complex research and practical applications, making
                powerful tools accessible to everyone who seeks to innovate and create.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
