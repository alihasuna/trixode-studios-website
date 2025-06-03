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

          {/* Founder Section */}
          <motion.div
            className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="relative">
                  {/* Tech Digital Avatar */}
                  <div className="w-72 h-72 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600 rounded-3xl p-2 shadow-2xl shadow-purple-500/25">
                    <div className="w-full h-full bg-gradient-to-br from-gray-900/90 to-black/80 rounded-3xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
                      {/* Digital Tech Avatar */}
                      <div className="relative z-10">
                        <svg width="220" height="220" viewBox="0 0 140 140" className="text-cyan-400">
                          <defs>
                            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                              <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                            </linearGradient>
                            <linearGradient id="headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          
                          {/* Circuit Board Background */}
                          <rect x="20" y="20" width="100" height="100" fill="#111827" rx="10" opacity="0.8" />
                          
                          {/* Circuit Lines */}
                          <g stroke="url(#circuitGrad)" strokeWidth="1.5" fill="none">
                            <line x1="25" y1="40" x2="45" y2="40" />
                            <line x1="45" y1="40" x2="45" y2="30" />
                            <line x1="45" y1="30" x2="60" y2="30" />
                            
                            <line x1="25" y1="60" x2="35" y2="60" />
                            <line x1="35" y1="60" x2="35" y2="50" />
                            
                            <line x1="95" y1="45" x2="115" y2="45" />
                            <line x1="105" y1="35" x2="105" y2="55" />
                            
                            <line x1="85" y1="80" x2="105" y2="80" />
                            <line x1="95" y1="70" x2="95" y2="90" />
                            
                            <line x1="30" y1="100" x2="50" y2="100" />
                            <line x1="40" y1="90" x2="40" y2="110" />
                          </g>
                          
                          {/* Circuit Nodes */}
                          <circle cx="45" cy="40" r="2" fill="#06b6d4" />
                          <circle cx="35" cy="60" r="2" fill="#8b5cf6" />
                          <circle cx="105" cy="45" r="2" fill="#ec4899" />
                          <circle cx="95" cy="80" r="2" fill="#06b6d4" />
                          <circle cx="40" cy="100" r="2" fill="#8b5cf6" />
                          
                          {/* Main Avatar Container - Hexagonal */}
                          <polygon
                            points="70,25 95,35 95,75 70,85 45,75 45,35"
                            fill="url(#headGrad)"
                            stroke="url(#circuitGrad)"
                            strokeWidth="2"
                          />
                          
                          {/* Digital Face Grid */}
                          <g stroke="#06b6d4" strokeWidth="0.5" opacity="0.3">
                            <line x1="50" y1="45" x2="90" y2="45" />
                            <line x1="50" y1="55" x2="90" y2="55" />
                            <line x1="50" y1="65" x2="90" y2="65" />
                            <line x1="60" y1="35" x2="60" y2="75" />
                            <line x1="70" y1="35" x2="70" y2="75" />
                            <line x1="80" y1="35" x2="80" y2="75" />
                          </g>
                          
                          {/* Digital Eyes */}
                          <rect x="58" y="48" width="6" height="4" fill="#06b6d4" rx="1" />
                          <rect x="76" y="48" width="6" height="4" fill="#06b6d4" rx="1" />
                          <rect x="59" y="49" width="4" height="2" fill="#ffffff" rx="0.5" />
                          <rect x="77" y="49" width="4" height="2" fill="#ffffff" rx="0.5" />
                          
                          {/* Digital Mouth */}
                          <rect x="65" y="62" width="10" height="2" fill="#ec4899" rx="1" />
                          <rect x="67" y="63" width="6" height="1" fill="#ffffff" rx="0.5" opacity="0.8" />
                          
                          {/* Tech Pattern on Face */}
                          <g stroke="#8b5cf6" strokeWidth="0.8" fill="none" opacity="0.6">
                            <path d="M 55 40 L 60 45 L 55 50" />
                            <path d="M 85 40 L 80 45 L 85 50" />
                          </g>
                          
                          {/* Digital "Hair" - Circuit Pattern */}
                          <g stroke="url(#circuitGrad)" strokeWidth="1" fill="none">
                            <path d="M 50 35 Q 60 28 70 32 Q 80 28 90 35" />
                            <circle cx="55" cy="32" r="1" fill="#06b6d4" />
                            <circle cx="70" cy="30" r="1" fill="#8b5cf6" />
                            <circle cx="85" cy="32" r="1" fill="#ec4899" />
                          </g>
                          
                          {/* Status Indicators */}
                          <circle cx="92" cy="38" r="2" fill="#10b981" opacity="0.8" />
                          <circle cx="48" cy="38" r="2" fill="#f59e0b" opacity="0.8" />
                          
                          {/* Digital Body */}
                          <rect x="60" y="85" width="20" height="25" fill="#1f2937" rx="2" />
                          <rect x="63" y="88" width="14" height="19" fill="#374151" rx="1" />
                          
                          {/* Tech Lines on Body */}
                          <g stroke="#06b6d4" strokeWidth="0.5" opacity="0.7">
                            <line x1="65" y1="90" x2="75" y2="90" />
                            <line x1="65" y1="95" x2="75" y2="95" />
                            <line x1="65" y1="100" x2="75" y2="100" />
                          </g>
                          
                          {/* Power Button */}
                          <circle cx="70" cy="102" r="3" fill="#ec4899" opacity="0.8" />
                          <circle cx="70" cy="102" r="1.5" fill="#ffffff" />
                        </svg>
                      </div>
                      
                      {/* Digital Glow Effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 rounded-3xl"></div>
                      <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-cyan-400/20 rounded-full blur-lg animate-pulse"></div>
                      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-purple-500/20 rounded-full blur-lg animate-pulse delay-150"></div>
                    </div>
                  </div>
                  
                  {/* Tech Accent Elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-sm shadow-lg"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-400 rounded-sm shadow-lg"></div>
                  <div className="absolute top-3 -left-3 w-3 h-3 bg-cyan-400 rounded-full shadow-lg"></div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">HUSSIEN BALLOUK</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-6"></div>
                <p className="text-xl text-blue-300 mb-8 font-black">FOUNDER & CEO OF TRIXODE STUDIOS</p>

                <blockquote className="text-2xl md:text-3xl font-black text-gray-300 mb-8 leading-relaxed">
                  "I BUILD ELEGANT, HIGH-IMPACT SOFTWARE THAT EMPOWERS RESEARCHERS, SCIENTISTS, AND CREATORS."
                </blockquote>

                {/* Social Links */}
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Mail, href: "#" },
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
