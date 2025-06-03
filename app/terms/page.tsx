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

export default function TermsPage() {
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
            TERMS OF SERVICE
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
                <h2 className="text-2xl font-black text-white mb-4">ACCEPTANCE OF TERMS</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  By accessing and using the Trixode Studios website and services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                  use this service.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">SERVICES DESCRIPTION</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  Trixode Studios provides software development, AI-powered tools, and technology consulting services.
                  We specialize in creating elegant solutions for researchers, scientists, and innovators. Our services
                  include but are not limited to:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-gray-300 font-medium">
                  <li>Custom software development</li>
                  <li>AI and machine learning solutions</li>
                  <li>Research tool development</li>
                  <li>Technology consulting</li>
                  <li>Product strategy and design</li>
                </ul>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">USER RESPONSIBILITIES</h2>
                <div className="text-gray-300 font-medium space-y-4">
                  <p className="leading-relaxed">By using our services, you agree to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services for lawful purposes only</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not interfere with or disrupt our services</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Comply with all applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">INTELLECTUAL PROPERTY</h2>
                <div className="text-gray-300 font-medium space-y-4">
                  <p className="leading-relaxed">
                    All content, features, and functionality on our website and in our services are owned by Trixode
                    Studios and are protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="leading-relaxed">
                    For custom development projects, intellectual property ownership will be clearly defined in separate
                    project agreements.
                  </p>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">PAYMENT TERMS</h2>
                <div className="text-gray-300 font-medium space-y-4">
                  <p className="leading-relaxed">
                    Payment terms for our services will be specified in individual project agreements. Generally:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Invoices are due within 30 days of receipt</li>
                    <li>Late payments may incur additional fees</li>
                    <li>All prices are in Canadian dollars unless otherwise specified</li>
                    <li>Refunds are handled on a case-by-case basis</li>
                  </ul>
                </div>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">LIMITATION OF LIABILITY</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  To the fullest extent permitted by law, Trixode Studios shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">TERMINATION</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  We may terminate or suspend your access to our services immediately, without prior notice or
                  liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">GOVERNING LAW</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  These Terms shall be interpreted and governed by the laws of British Columbia, Canada, without regard
                  to its conflict of law provisions.
                </p>
              </section>

              <section className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-2xl font-black text-white mb-4">CONTACT INFORMATION</h2>
                <p className="text-gray-300 leading-relaxed font-medium">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-cyan-300 font-semibold">
                  <p>Email: legal@trixodestudios.com</p>
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
