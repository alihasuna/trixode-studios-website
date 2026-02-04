"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function AccessibilityPage() {
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
            ACCESSIBILITY
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
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">OUR COMMITMENT</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  Trixode Studios is committed to ensuring digital accessibility for people with disabilities. We are
                  continually improving the user experience for everyone and applying the relevant accessibility
                  standards to ensure we provide equal access to all users.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">ACCESSIBILITY STANDARDS</h2>
                <p className="text-white/60 leading-relaxed font-light mb-4">
                  We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
                  guidelines explain how to make web content more accessible for people with disabilities and
                  user-friendly for everyone.
                </p>
                <p className="text-white/60 leading-relaxed font-light">
                  Our website aims to achieve and maintain compliance with these standards through:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-white/60 font-light">
                  <li>Proper semantic HTML structure</li>
                  <li>Sufficient color contrast ratios</li>
                  <li>Keyboard navigation support</li>
                  <li>Screen reader compatibility</li>
                  <li>Alternative text for images</li>
                  <li>Clear and consistent navigation</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">ACCESSIBILITY FEATURES</h2>
                <div className="space-y-6 text-white/60 font-light">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Visual Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>High contrast color schemes</li>
                      <li>Scalable fonts and responsive design</li>
                      <li>Clear visual hierarchy</li>
                      <li>Alternative text for all meaningful images</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Motor Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Full keyboard navigation support</li>
                      <li>Large clickable areas</li>
                      <li>No time-sensitive interactions</li>
                      <li>Skip navigation links</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-['Space_Grotesk',sans-serif]">Cognitive Accessibility</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Clear and simple language</li>
                      <li>Consistent navigation and layout</li>
                      <li>Descriptive headings and labels</li>
                      <li>Error prevention and clear error messages</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">ASSISTIVE TECHNOLOGIES</h2>
                <p className="text-white/60 leading-relaxed font-light mb-4">
                  Our website is designed to be compatible with assistive technologies, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-white/60 font-light">
                  <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                  <li>Voice recognition software</li>
                  <li>Keyboard-only navigation</li>
                  <li>Browser zoom functionality</li>
                  <li>High contrast mode</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">ONGOING EFFORTS</h2>
                <p className="text-white/60 leading-relaxed font-light mb-4">
                  We are continuously working to improve the accessibility of our website through:
                </p>
                <ul className="list-disc list-inside space-y-1 text-white/60 font-light">
                  <li>Regular accessibility audits and testing</li>
                  <li>User feedback incorporation</li>
                  <li>Staff training on accessibility best practices</li>
                  <li>Staying updated with accessibility guidelines</li>
                  <li>Third-party accessibility testing</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">FEEDBACK AND SUPPORT</h2>
                <p className="text-white/60 leading-relaxed font-light mb-4">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility
                  barriers or have suggestions for improvement, please let us know:
                </p>
                <div className="text-white/70 font-light space-y-2">
                  <p>Email: accessibility@trixodestudios.com</p>
                  <p>Phone: Available upon request</p>
                  <p>Address: Victoria, BC, Canada</p>
                </div>
                <p className="text-white/60 leading-relaxed font-light mt-4">
                  We aim to respond to accessibility feedback within 2 business days.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-['Space_Grotesk',sans-serif]">ALTERNATIVE FORMATS</h2>
                <p className="text-white/60 leading-relaxed font-light">
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
