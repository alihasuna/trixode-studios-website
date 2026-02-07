"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function TermsPage() {
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
            TERMS OF SERVICE
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
                <h2 className="text-2xl md:text-3xl font-light text-black dark:text-white mb-4 font-grotesk">ACCEPTANCE OF TERMS</h2>
                <p className="text-black/60 dark:text-white/60 leading-relaxed font-light">
                  By accessing and using the Trixode Studios website and services, you accept and agree to be bound by
                  the terms and provision of this agreement. If you do not agree to abide by the above, please do not
                  use this service.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">SERVICES DESCRIPTION</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  Trixode Studios provides software development, AI-powered tools, and technology consulting services.
                  We specialize in creating elegant solutions for researchers, scientists, and innovators. Our services
                  include but are not limited to:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-1 text-black/60 dark:text-white/60 font-light">
                  <li>Custom software development</li>
                  <li>AI and machine learning solutions</li>
                  <li>Research tool development</li>
                  <li>Technology consulting</li>
                  <li>Product strategy and design</li>
                </ul>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">USER RESPONSIBILITIES</h2>
                <div className="text-black/60 dark:text-white/60 font-light space-y-4">
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

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">INTELLECTUAL PROPERTY</h2>
                <div className="text-black/60 dark:text-white/60 font-light space-y-4">
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

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">PAYMENT TERMS</h2>
                <div className="text-black/60 dark:text-white/60 font-light space-y-4">
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

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">LIMITATION OF LIABILITY</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  To the fullest extent permitted by law, Trixode Studios shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether
                  incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">TERMINATION</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  We may terminate or suspend your access to our services immediately, without prior notice or
                  liability, for any reason whatsoever, including without limitation if you breach the Terms of Service.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">GOVERNING LAW</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  These Terms shall be interpreted and governed by the laws of British Columbia, Canada, without regard
                  to its conflict of law provisions.
                </p>
              </section>

              <section className="glass rounded-3xl p-10 border border-white/5">
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4 font-grotesk">CONTACT INFORMATION</h2>
                <p className="text-white/60 leading-relaxed font-light">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-black/70 dark:text-white/70 font-light">
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
