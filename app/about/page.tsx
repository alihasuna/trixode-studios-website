"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Target, Eye, Lightbulb } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function AboutPage() {
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
              className="magnetic inline-flex items-center text-white/50 hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-light mb-16 text-white font-['Space_Grotesk',sans-serif]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About
          </motion.h1>

          {/* Story Section */}
          <motion.section
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">01</span>
              <h2 className="text-3xl md:text-4xl font-light text-white font-['Space_Grotesk',sans-serif]">The Story</h2>
            </div>

            <div className="glass p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#3b82f6]/10 to-transparent rounded-full blur-3xl -z-10" />

              <h3 className="text-2xl font-medium mb-6 text-white font-['Space_Grotesk',sans-serif]">Origin of the Studio</h3>
              <div className="space-y-6 text-white/70 leading-relaxed text-lg font-light">
                <p>
                  Trixode Studios was born from watching businesses struggle with AI adoption. Founded by Hussien Ballouk, our studio
                  emerged from years of seeing companies miss massive opportunities because AI felt too complex, too risky, or too
                  expensive. We saw businesses drowning in manual processes while AI solutions sat unused on the shelf.
                </p>
                <p>
                  We believe that AI should solve real business problems—not create new ones. Every solution we build is designed to
                  eliminate operational friction, reduce costs, and accelerate growth. We turn AI from a technical challenge into a
                  competitive advantage that any business can understand and implement with confidence.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">02</span>
                <h2 className="text-3xl md:text-4xl font-light text-white font-['Space_Grotesk',sans-serif]">Mission</h2>
              </div>
              <div className="glass p-10 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group hover:bg-white/[0.06] transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Target className="h-10 w-10 text-[#3b82f6] mb-6" />
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-white font-['Space_Grotesk',sans-serif]">
                  "To build AI-powered automation tools that save time, cut costs, and scale growth for businesses
                  and innovators—making advanced technology accessible to every company ready to transform their operations."
                </blockquote>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">03</span>
                <h2 className="text-3xl md:text-4xl font-light text-white font-['Space_Grotesk',sans-serif]">Vision</h2>
              </div>
              <div className="glass p-10 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group hover:bg-white/[0.06] transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Eye className="h-10 w-10 text-[#8b5cf6] mb-6" />
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-white font-['Space_Grotesk',sans-serif]">
                  "A future where every company—from startups to enterprises—can harness AI automation
                  securely and effectively to drive innovation and competitive advantage."
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
            <div className="flex items-center gap-4 mb-12">
              <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">04</span>
              <h2 className="text-4xl md:text-5xl font-light text-white font-['Space_Grotesk',sans-serif]">Core Values</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "CLARITY",
                  description:
                    "We cut through AI complexity to deliver clear, actionable solutions that business leaders can understand and implement confidently.",
                },
                {
                  title: "IMPACT",
                  description:
                    "We measure success by tangible business results: time saved, costs reduced, and revenue growth accelerated through AI automation.",
                },
                {
                  title: "TRUST",
                  description:
                    "We build secure, transparent AI solutions that protect your data and reputation while delivering measurable value to your business.",
                },
                {
                  title: "INNOVATION",
                  description:
                    "We combine proven AI technologies with creative problem-solving to unlock new efficiencies and competitive advantages.",
                },
                {
                  title: "COLLABORATION",
                  description:
                    "We partner closely with your team to ensure AI adoption enhances human capabilities rather than replacing them.",
                },
                {
                  title: "SUSTAINABILITY",
                  description:
                    "We design AI systems that scale with your business growth and adapt to evolving market demands for long-term success.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  className="group glass p-8 rounded-2xl hover:bg-white/[0.08] transition-all duration-500 cursor-default"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-lg font-medium mb-4 text-white group-hover:text-[#3b82f6] transition-colors font-['Space_Grotesk',sans-serif] tracking-wide">
                    {value.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-sm font-light">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
