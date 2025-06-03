"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react"
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

export default function ProjectsPage() {
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
              {["People", "About"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item}
                </Link>
              ))}
              <Link href="/projects" className="text-cyan-400 font-black">
                Projects
              </Link>
              {["Blog", "Contact"].map((item) => (
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
            <MobileMenu currentPath="/projects" />
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
            CURRENT
            <br />
            PROJECTS
          </motion.h1>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Morphika Project */}
            <motion.div
              className="group bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl overflow-hidden hover:border-blue-400/40 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              {/* Project Preview */}
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-900/20"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">MORPHIKA</h3>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-white">MORPHIKA</h2>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-black rounded-full">
                    AI TOOL
                  </span>
                </div>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed font-semibold">
                  AI-powered image generator for eCommerce. Create hyper-realistic product visuals that elevate your
                  brand instantly with cutting-edge machine learning technology.
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">KEY FEATURES</h4>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      "Hyper-realistic product visualization",
                      "Brand-consistent styling",
                      "Instant generation & export",
                      "Multiple format support",
                    ].map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {["AI/ML", "Python", "React", "API"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-900/50 text-blue-300 px-3 py-1 text-sm font-black rounded-lg border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 font-black"
                  size="lg"
                >
                  Learn More
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* Coming Soon Project */}
            <motion.div
              className="group bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-600/30 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Project Preview */}
              <div className="h-64 bg-gradient-to-br from-gray-600 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-gray-900/20"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/10">
                      <span className="text-2xl font-black text-white/60">?</span>
                    </div>
                    <h3 className="text-2xl font-black text-white/60">COMING SOON</h3>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <h2 className="text-3xl font-black text-white/60 mb-6">NEXT INNOVATION</h2>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed font-semibold">
                  We're working on something extraordinary. Stay tuned for our next breakthrough in research and
                  development tools that will reshape how innovation happens.
                </p>

                <Button
                  className="w-full bg-gray-600/50 text-white/60 border-0 rounded-xl cursor-not-allowed font-black"
                  size="lg"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.section
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">HAVE A PROJECT IN MIND?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
                Let's collaborate to build something extraordinary that pushes the boundaries of what's possible in
                research and innovation.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 px-12 py-6 text-xl font-black rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  )
}
