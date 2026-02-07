"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function PrivacyPage() {
  useMagneticEffect()

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
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
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
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
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 text-black dark:text-white font-grotesk"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PRIVACY POLICY
          </motion.h1>

          <motion.div
            className="text-black/40 dark:text-white/40 mb-12"
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
              <section className="glass rounded-3xl p-10 border border-black/5 dark:border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-black dark:text-white mb-4 font-grotesk">INTRODUCTION</h2>
                <p className="text-black/60 dark:text-white/60 leading-relaxed font-light">
                  At Trixode Studios, we are committed to protecting your privacy and ensuring the security of your
                  personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website or use our services.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">INFORMATION WE COLLECT</h2>
                <div className="space-y-4 text-black/60 dark:text-white/60 font-light">
                  <div>
                    <h3 className="text-lg font-medium text-black dark:text-white mb-2 font-grotesk">Personal Information</h3>
                    <p className="leading-relaxed">
                      We may collect personal information that you voluntarily provide to us, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Name and contact information</li>
                      <li>Email address</li>
                      <li>Project details and requirements</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2 font-grotesk">Automatically Collected Information</h3>
                    <p className="leading-relaxed">
                      We may automatically collect certain information about your device and usage patterns:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent</li>
                      <li>Referring website information</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">HOW WE USE YOUR INFORMATION</h2>
                <div className="text-black/60 dark:text-white/60 font-light space-y-2">
                  <p className="leading-relaxed">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide and maintain our services</li>
                    <li>Respond to your inquiries and requests</li>
                    <li>Send you updates about our projects and services</li>
                    <li>Improve our website and user experience</li>
                    <li>Comply with legal obligations</li>
                    <li>Protect against fraudulent or illegal activity</li>
                  </ul>
                </div>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">INFORMATION SHARING</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except as described in this policy. We may share information with:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-black/60 dark:text-white/60 font-light">
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">DATA SECURITY</h2>
                <p className="text-black/60 dark:text-white/60 leading-relaxed font-light">
                  We implement appropriate technical and organizational security measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">YOUR RIGHTS</h2>
                <div className="text-black/60 dark:text-white/60 font-light space-y-2">
                  <p className="leading-relaxed">You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Object to processing of your information</li>
                    <li>Data portability</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </div>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">CONTACT US</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="mt-4 text-black/70 dark:text-white/70 font-light">
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
