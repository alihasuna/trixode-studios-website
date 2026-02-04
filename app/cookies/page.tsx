"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function CookiesPage() {
  useMagneticEffect()

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Background Aurora Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="pt-32 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="magnetic inline-flex items-center text-white/50 hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-white font-['Space_Grotesk',sans-serif]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            COOKIE POLICY
          </motion.h1>

          <motion.div
            className="text-white/40 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="font-light">Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>

          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-8">
              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">WHAT ARE COOKIES</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a
                  website. They are widely used to make websites work more efficiently and to provide information to
                  website owners.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">HOW WE USE COOKIES</h2>
                <p className="text-white/60 leading-relaxed font-light mb-4">
                  Trixode Studios uses cookies to enhance your browsing experience and improve our services. We use
                  cookies for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-white/60 font-light">
                  <li>Essential website functionality</li>
                  <li>Remembering your preferences</li>
                  <li>Analytics and performance monitoring</li>
                  <li>Security and fraud prevention</li>
                  <li>Improving user experience</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">TYPES OF COOKIES WE USE</h2>
                <div className="space-y-6 text-white/60 font-light">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Essential Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies are necessary for the website to function properly. They enable basic functions like
                      page navigation and access to secure areas of the website.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Analytics Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies help us understand how visitors interact with our website by collecting and
                      reporting information anonymously.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Functional Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies enable the website to provide enhanced functionality and personalization, such as
                      remembering your preferences.
                    </p>
                  </div>
                </div>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">THIRD-PARTY COOKIES</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  We may use third-party services that place cookies on your device. These include:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-white/60 font-light">
                  <li>Google Analytics for website analytics</li>
                  <li>Social media platforms for content sharing</li>
                  <li>Content delivery networks for performance</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">MANAGING COOKIES</h2>
                <div className="text-white/60 font-light space-y-4">
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

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">COOKIE RETENTION</h2>
                <div className="text-white/60 font-light space-y-4">
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

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">UPDATES TO THIS POLICY</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                  operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie
                  Policy on this page with an updated "Last updated" date.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">CONTACT US</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
                </p>
                <div className="mt-4 text-white/70 font-light">
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
