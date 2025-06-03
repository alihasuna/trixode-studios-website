"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
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

export default function AccessibilityPage() {
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
              {["People", "About", "Projects", "Blog", "Contact"].map((item) => (
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
            <MobileMenu />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
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
            className="text-5xl md:text-7xl font-black mb-8 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ACCESSIBILITY
          </motion.h1>

          <motion.div
            className="text-gray-400 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-semibold">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>

          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">OUR COMMITMENT</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Trixode Studios is committed to ensuring digital accessibility for people with disabilities. We are
                  continually improving the user experience for everyone and applying the relevant accessibility
                  standards to ensure we provide equal access to all users.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">ACCESSIBILITY STANDARDS</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
                  guidelines explain how to make web content more accessible for people with disabilities and
                  user-friendly for everyone.
                </p>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Our website aims to achieve and maintain compliance with these standards through:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-gray-300 font-medium">
                  <li>Proper semantic HTML structure</li>
                  <li>Sufficient color contrast ratios</li>
                  <li>Keyboard navigation support</li>
                  <li>Screen reader compatibility</li>
                  <li>Alternative text for images</li>
                  <li>Clear and consistent navigation</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">ACCESSIBILITY FEATURES</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Visual Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                      <li>High contrast color schemes</li>
                      <li>Scalable fonts and responsive design</li>
                      <li>Clear visual hierarchy</li>
                      <li>Alternative text for all meaningful images</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Motor Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                      <li>Full keyboard navigation support</li>
                      <li>Large clickable areas</li>
                      <li>No time-sensitive interactions</li>
                      <li>Skip navigation links</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Cognitive Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                      <li>Clear and simple language</li>
                      <li>Consistent navigation and layout</li>
                      <li>Descriptive headings and labels</li>
                      <li>Error prevention and clear error messages</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">ASSISTIVE TECHNOLOGIES</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  Our website is designed to be compatible with assistive technologies, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                  <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                  <li>Voice recognition software</li>
                  <li>Keyboard-only navigation</li>
                  <li>Browser zoom functionality</li>
                  <li>High contrast mode</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">ONGOING EFFORTS</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  We are continuously working to improve the accessibility of our website through:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                  <li>Regular accessibility audits and testing</li>
                  <li>User feedback incorporation</li>
                  <li>Staff training on accessibility best practices</li>
                  <li>Staying updated with accessibility guidelines</li>
                  <li>Third-party accessibility testing</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">FEEDBACK AND SUPPORT</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility
                  barriers or have suggestions for improvement, please let us know:
                </p>
                <div className="text-cyan-300 font-semibold space-y-2">
                  <p>Email: accessibility@trixodestudios.com</p>
                  <p>Phone: Available upon request</p>
                  <p>Address: Victoria, BC, Canada</p>
                </div>
                <p className="text-gray-300 leading-relaxed font-medium mt-4">
                  We aim to respond to accessibility feedback within 2 business days.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">ALTERNATIVE FORMATS</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  If you need information from our website in an alternative format, such as large print, audio, or
                  Braille, please contact us. We will work with you to provide the information in a format that meets
                  your needs at no additional cost.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
