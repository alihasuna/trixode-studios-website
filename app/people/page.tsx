"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Github, Linkedin, Mail, Code, Brain, Rocket, Users, Globe } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function PeoplePage() {
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
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-light mb-16 text-black dark:text-white font-grotesk"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black dark:from-white to-black/50 dark:to-white/50">People</span>
          </motion.h1>

          {/* People Grid */}
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Hussien Ballouk */}
            <div className="glass rounded-3xl p-10 relative overflow-hidden group hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-blue/10 to-transparent rounded-full blur-3xl -z-10 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col items-center text-center gap-8">
                {/* Avatar */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://res.cloudinary.com/dmkfxjv0s/image/upload/w_400,h_400,c_fill,g_face,f_auto,q_auto/v1749088385/ceo_photo.png"
                      alt="Hussien Ballouk - CEO of Trixode Studios"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium mb-3 text-black dark:text-white font-grotesk">HUSSIEN BALLOUK</h2>
                  <p className="text-brand-blue mb-6 font-medium text-sm tracking-widest uppercase">FOUNDER & CEO</p>

                  <blockquote className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed font-light italic">
                    "I build elegant, high-impact software that empowers researchers, scientists, and creators."
                  </blockquote>

                  {/* Social Links */}
                  <div className="flex space-x-4 justify-center">
                    {[
                      { icon: Github, href: "https://github.com/trixodestudios" },
                      { icon: Linkedin, href: "https://linkedin.com/in/trixode-studios-054154311" },
                      { icon: Mail, href: "mailto:ceo@trixode-studios.com" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Amir Ahmadian */}
            <div className="glass rounded-3xl p-10 relative overflow-hidden group hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-purple/10 to-transparent rounded-full blur-3xl -z-10 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex flex-col items-center text-center gap-8">
                {/* Avatar */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="https://res.cloudinary.com/dnsl6kst1/image/upload/v1770191425/ChatGPT_Image_Feb_3_2026_11_47_46_PM_sasgnj.png"
                      alt="Amir Ahmadian - Chief Scientific Officer at Trixode Studios"
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium mb-3 text-black dark:text-white font-grotesk">AMIR AHMADIAN</h2>
                  <p className="text-brand-purple mb-6 font-medium text-sm tracking-widest uppercase">CHIEF SCIENTIFIC OFFICER</p>

                  <blockquote className="text-lg text-black/70 dark:text-white/70 mb-8 leading-relaxed font-light italic">
                    "PhD physicist and CSO focused on applying machine learning and systems thinking to translate complex
                    research into reliable, real-world software."
                  </blockquote>

                  {/* Social Links */}
                  <div className="flex space-x-4 justify-center">
                    {[{ icon: Linkedin, href: "https://www.linkedin.com/in/amir-ahmadian12/" }].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
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
            <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-brand-blue" />
                </div>
                <h3 className="text-2xl font-medium text-black dark:text-white font-grotesk">Expertise</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Full-Stack Development",
                  "AI & Machine Learning",
                  "Product Strategy",
                  "Research Tools",
                  "Team Leadership",
                ].map((skill, index) => (
                  <motion.li
                    key={skill}
                    className="flex items-center text-black/70 dark:text-white/70 font-light"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3" />
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-brand-purple/10 rounded-lg flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-brand-purple" />
                </div>
                <h3 className="text-2xl font-medium text-black dark:text-white font-grotesk">Leadership</h3>
              </div>
              <p className="text-black/70 dark:text-white/70 leading-relaxed font-light text-lg">
                Building technology that bridges the gap between complex research and practical applications, making
                powerful tools accessible to everyone who seeks to innovate and create.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
