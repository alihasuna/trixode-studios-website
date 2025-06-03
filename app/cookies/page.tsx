"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
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

export default function CookiesPage() {
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
            COOKIE POLICY
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
                <h2 className="text-2xl font-black text-white mb-4">WHAT ARE COOKIES</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a
                  website. They are widely used to make websites work more efficiently and to provide information to
                  website owners.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">HOW WE USE COOKIES</h2>
                <p className="text-gray-300 leading-relaxed font-medium mb-4">
                  Trixode Studios uses cookies to enhance your browsing experience and improve our services. We use
                  cookies for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-300 font-medium">
                  <li>Essential website functionality</li>
                  <li>Remembering your preferences</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Security and fraud prevention</li>
                  <li>Improving user experience</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">TYPES OF COOKIES WE USE</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Essential Cookies</h3>
                    <p className="text-gray-300 leading-relaxed font-medium">
                      These cookies are necessary for the website to function properly. They enable basic functions like
                      page navigation and access to secure areas of the website.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Analytics Cookies</h3>
                    <p className="text-gray-300 leading-relaxed font-medium">
                      These cookies help us understand how visitors interact with our website by collecting and
                      reporting information anonymously.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">Functional Cookies</h3>
                    <p className="text-gray-300 leading-relaxed font-medium">
                      These cookies enable the website to provide enhanced functionality and personalization, such as
                      remembering your preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">THIRD-PARTY COOKIES</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  We may use third-party services that place cookies on your device. These include:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-gray-300 font-medium">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms for content sharing</li>
                  <li>Content delivery networks for performance</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">MANAGING COOKIES</h2>
                <div className="text-gray-300 font-medium space-y-4">
                  <p className="leading-relaxed">You can control and manage cookies in various ways:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                    <li>Delete existing cookies through your browser settings</li>
                    <li>Set your browser to notify you when cookies are being sent</li>
                    <li>Use private/incognito browsing mode</li>
                  </ul>
                  <p className="leading-relaxed">
                    Please note that disabling cookies may affect the functionality of our website.
                  </p>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">COOKIE RETENTION</h2>
                <div className="text-gray-300 font-medium space-y-4">
                  <p className="leading-relaxed">
                    Cookies are retained for different periods depending on their purpose:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Session cookies: Deleted when you close your browser</li>
                    <li>Persistent cookies: Remain until they expire or you delete them</li>
                    <li>Analytics cookies: Typically retained for 2 years</li>
                    <li>Functional cookies: Retained based on their specific purpose</li>
                  </ul>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">UPDATES TO THIS POLICY</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie
                  Policy on this page with an updated "Last updated" date.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">CONTACT US</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                </p>
                <div className="mt-4 text-cyan-300 font-semibold">
                  <p>Email: privacy@trixodestudios.com</p>
                  <p>Address: Victoria, BC, Canada</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
