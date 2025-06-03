"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Target, Eye, Lightbulb } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
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
              <Link
                href="/people"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
              >
                People
              </Link>
              <Link href="/about" className="text-cyan-400 font-black">
                About
              </Link>
              {["Projects", "Blog", "Contact"].map((item) => (
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
            <MobileMenu currentPath="/about" />
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
            ABOUT
          </motion.h1>

          {/* Story Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">STORY</h2>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent mb-8"></div>
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
              <h3 className="text-2xl font-black mb-6 text-white">ORIGIN OF THE STUDIO</h3>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg font-semibold">
                  Trixode Studios was born from a simple observation: the gap between cutting-edge research and
                  practical, accessible tools was growing wider every day. Founded by Hussien Ballouk, our studio
                  emerged from years of working with researchers, scientists, and creators who needed powerful software
                  solutions but found existing tools either too complex or too limited.
                </p>
                <p className="text-lg font-semibold">
                  We believe that the future belongs to those who can bridge the worlds of advanced technology and human
                  creativity. Every project we undertake is designed to eliminate barriers and unlock new possibilities
                  for innovation, making sophisticated tools as intuitive as they are powerful.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">MISSION</h2>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-8">
                <blockquote className="text-xl md:text-2xl font-black leading-relaxed text-gray-200">
                  "TO DESIGN ELEGANT SOFTWARE TOOLS AND DIGITAL SERVICES THAT UNLOCK OPPORTUNITIES FOR RESEARCHERS,
                  SCIENTISTS, AND STUDENTS—OFFERING FINANCIAL SUPPORT AND REAL-WORLD EXPOSURE THROUGH PURPOSEFUL
                  INNOVATION."
                </blockquote>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white">VISION</h2>
              </div>
              <div className="bg-gradient-to-br from-pink-900/30 to-purple-800/20 backdrop-blur-sm border border-pink-400/30 rounded-2xl p-8">
                <blockquote className="text-xl md:text-2xl font-black leading-relaxed text-gray-200">
                  "A FUTURE WHERE RESEARCH AND TECHNOLOGY ARE SEAMLESSLY INTEGRATED THROUGH BEAUTIFULLY CRAFTED TOOLS
                  THAT AMPLIFY HUMAN POTENTIAL."
                </blockquote>
              </div>
            </motion.section>
          </div>

          {/* Values Grid */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">VALUES</h2>
            <div className="w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "ELEGANCE",
                  description:
                    "Every line of code, every interface element, every user interaction should be beautiful and purposeful.",
                },
                {
                  title: "IMPACT",
                  description:
                    "We measure success by the real-world problems we solve and the opportunities we create.",
                },
                {
                  title: "ACCESSIBILITY",
                  description:
                    "Powerful tools should be available to everyone, regardless of technical background or resources.",
                },
                {
                  title: "INNOVATION",
                  description:
                    "We push boundaries and explore new possibilities at the intersection of technology and creativity.",
                },
                {
                  title: "COLLABORATION",
                  description:
                    "The best solutions emerge from diverse perspectives and interdisciplinary partnerships.",
                },
                {
                  title: "SUSTAINABILITY",
                  description:
                    "We build for the long term, creating solutions that grow and adapt with changing needs.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="group bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-black mb-4 text-white group-hover:text-cyan-300 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed font-semibold">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
