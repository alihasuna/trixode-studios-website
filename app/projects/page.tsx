"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Brain, Zap, Search, Target, Lightbulb, TrendingUp, Users, CheckCircle } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useState } from "react"

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("current")
  useMagneticEffect()
  const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
  const prefersReducedMotion = useReducedMotion()
  const enableHeavyEffects = !prefersReducedMotion && isDesktop

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Background Aurora Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {enableHeavyEffects ? (
          <>
            <motion.div
              className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-30"
              style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" }}
              animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-30"
              style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" }}
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-30"
              style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)" }}
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <div className="absolute w-[400px] h-[400px] -top-20 -left-20 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)" }} />
            <div className="absolute w-[350px] h-[350px] top-1/3 -right-10 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)" }} />
            <div className="absolute w-[300px] h-[300px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }} />
          </>
        )}
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
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
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
            className="text-5xl md:text-7xl lg:text-8xl font-light mb-12 text-black dark:text-white font-grotesk leading-[0.9]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black dark:from-white to-black/50 dark:to-white/50">Work</span>
          </motion.h1>

          {/* Tab Navigation */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <button
                onClick={() => setActiveTab("current")}
                className={`magnetic px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border ${activeTab === "current"
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "glass text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30"
                  }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("consulting")}
                className={`magnetic px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border ${activeTab === "consulting"
                  ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                  : "glass text-black/70 dark:text-white/70 border-black/10 dark:border-white/10 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30"
                  }`}
              >
                Client Work
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === "current" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Morphika Project */}
                <motion.div
                  className="group glass rounded-3xl overflow-hidden hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Project Preview */}
                  <div className="h-64 bg-gradient-to-br from-blue-600/20 to-blue-800/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-900/10"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Sparkles className="h-10 w-10 text-brand-blue" />
                        </div>
                        <h3 className="text-2xl font-light text-black dark:text-white font-grotesk">MORPHIKA</h3>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-medium text-black dark:text-white font-grotesk">MORPHIKA</h2>
                      <span className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-4 py-1 text-xs font-medium uppercase tracking-widest rounded-full">
                        LIVE PRODUCT
                      </span>
                    </div>

                    <p className="text-lg text-black/60 dark:text-white/60 mb-8 leading-relaxed font-light">
                      AI-powered image generator for eCommerce. Create hyper-realistic product visuals that elevate your
                      brand instantly with cutting-edge machine learning technology.
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium mb-4 text-black dark:text-white uppercase tracking-widest">Key Features</h4>
                      <ul className="space-y-3 text-black/50 dark:text-white/50">
                        {[
                          "Hyper-realistic product visualization",
                          "Brand-consistent styling",
                          "Instant generation & export",
                          "Multiple format support",
                        ].map((feature, index) => (
                          <motion.li
                            key={feature}
                            className="flex items-center font-light text-sm"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.06 }}
                          >
                            <div className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-3" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium mb-4 text-black dark:text-white uppercase tracking-widest">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {["AI/ML", "Python", "React", "API"].map((tech) => (
                          <span
                            key={tech}
                            className="bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 px-3 py-1 text-xs font-medium rounded border border-black/10 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link href="https://morphika.ai" target="_blank" rel="noopener noreferrer">
                      <button className="magnetic w-full py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-brand-blue transition-all duration-400 bg-black/[0.02] dark:bg-white/[0.02]">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Try Morphika <ExternalLink className="h-4 w-4" />
                        </span>
                        <div className="absolute inset-0 bg-brand-blue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                      </button>
                    </Link>
                  </div>
                </motion.div>

                {/* Researcher AI Project */}
                <motion.div
                  className="group glass rounded-3xl overflow-hidden hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Project Preview */}
                  <div className="h-64 bg-gradient-to-br from-purple-600/20 to-pink-800/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-900/10"></div>
                    <div className="relative z-10 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Brain className="h-10 w-10 text-brand-purple" />
                        </div>
                        <h3 className="text-2xl font-light text-black dark:text-white font-grotesk">RESEARCHER AI</h3>
                        <div className="mt-2 flex items-center justify-center">
                          <span className="bg-black/10 dark:bg-white/10 text-black/80 dark:text-white/80 px-3 py-1 text-[10px] font-medium tracking-widest uppercase rounded-full border border-black/10 dark:border-white/10">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-medium text-black dark:text-white font-grotesk">RESEARCHER AI</h2>
                      <span className="bg-brand-purple/10 text-brand-purple border border-brand-purple/20 px-4 py-1 text-xs font-medium uppercase tracking-widest rounded-full">
                        AI Agent
                      </span>
                    </div>

                    <p className="text-lg text-black/60 dark:text-white/60 mb-8 leading-relaxed font-light">
                      Your intelligent research companion that understands scientific literature, generates hypotheses, designs experiments, and accelerates discovery across all research domains.
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium mb-4 text-black dark:text-white uppercase tracking-widest">Planned Features</h4>
                      <ul className="space-y-3 text-black/50 dark:text-white/50">
                        {[
                          "Intelligent literature review & synthesis",
                          "Automated hypothesis generation",
                          "Experimental design optimization",
                          "Real-time collaboration",
                        ].map((feature, index) => (
                          <motion.li
                            key={feature}
                            className="flex items-center font-light text-sm"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.06 }}
                          >
                            <div className="w-1.5 h-1.5 bg-brand-purple rounded-full mr-3" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-medium mb-4 text-black dark:text-white uppercase tracking-widest">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {["LLM", "RAG", "Vector DB", "NLP"].map((tech) => (
                          <span
                            key={tech}
                            className="bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 px-3 py-1 text-xs font-medium rounded border border-black/10 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40">Development Progress</span>
                        <span className="text-xs font-medium text-brand-purple">35%</span>
                      </div>
                      <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-1">
                        <div className="bg-gradient-to-r from-brand-purple to-pink-500 h-1 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="magnetic w-full py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-brand-purple transition-all duration-400 bg-black/[0.02] dark:bg-white/[0.02]">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Notify Me <Zap className="h-4 w-4" />
                      </span>
                      <div className="absolute inset-0 bg-brand-purple scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Call to Action for Current Projects */}
              <motion.section
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="glass p-16 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <h2 className="text-4xl md:text-5xl font-light mb-6 text-black dark:text-white font-grotesk">Have a Project in Mind?</h2>
                  <p className="text-xl text-black/60 dark:text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    Let's collaborate to build something extraordinary that pushes the boundaries of what's possible in
                    research and innovation.
                  </p>
                  <Link href="/contact">
                    <button className="magnetic px-10 py-5 bg-white text-black text-sm uppercase tracking-widest font-medium rounded-full hover:bg-white/90 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                      Book a Free Strategy Call
                    </button>
                  </Link>
                </div>
              </motion.section>
            </motion.div>
          )}

          {/* AI Consulting Section */}
          {activeTab === "consulting" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section for AI Consulting */}
              <div className="text-center mb-24">
                <motion.div
                  className="inline-flex items-center bg-[#10b981]/10 border border-[#10b981]/20 rounded-full px-6 py-2 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Brain className="h-4 w-4 text-[#10b981] mr-2" />
                  <span className="text-[#10b981] text-xs font-medium uppercase tracking-widest">AI Transformation Specialists</span>
                </motion.div>

                <motion.h2
                  className="text-4xl md:text-6xl font-light mb-8 text-black dark:text-white font-grotesk leading-tight"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  AI Adoption
                  <br />
                  <span className="text-[#10b981]">Consulting</span>
                </motion.h2>

                <motion.p
                  className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto leading-relaxed font-light"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  We help businesses identify pain points and implement tailored AI solutions that drive real value.
                  From strategy to deployment, we're your partners in AI transformation.
                </motion.p>
              </div>

              {/* Our Approach */}
              <div className="mb-24">
                <motion.h3
                  className="text-2xl font-light mb-12 text-center text-black dark:text-white font-grotesk"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  Our Approach
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Search,
                      title: "Discovery",
                      description: "Deep dive into your business processes to identify AI opportunities.",
                      color: "text-blue-400"
                    },
                    {
                      icon: Target,
                      title: "Strategy",
                      description: "Develop a comprehensive AI roadmap aligned with business objectives.",
                      color: "text-emerald-400"
                    },
                    {
                      icon: Lightbulb,
                      title: "Solution",
                      description: "Design and prototype custom AI solutions tailored to your needs.",
                      color: "text-purple-400"
                    },
                    {
                      icon: TrendingUp,
                      title: "Implementation",
                      description: "Deploy, train, and optimize AI systems for maximum impact.",
                      color: "text-orange-400"
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      className="glass p-8 rounded-2xl hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all duration-300 group"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`w-12 h-12 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors`}>
                        <step.icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <h4 className="text-lg font-medium text-black dark:text-white mb-3 text-center">{step.title}</h4>
                      <p className="text-black/50 dark:text-white/50 text-center text-sm leading-relaxed font-light">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mb-24">
                <motion.h3
                  className="text-2xl font-light mb-12 text-center text-black dark:text-white font-grotesk"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  What We Deliver
                </motion.h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    {
                      title: "AI Strategy & Roadmap",
                      description: "Comprehensive assessment and strategic planning for AI integration across your organization.",
                      features: ["Business process analysis", "ROI projections", "Implementation timeline", "Risk assessment"]
                    },
                    {
                      title: "Custom AI Solutions",
                      description: "Bespoke AI systems designed specifically for your industry challenges and requirements.",
                      features: ["Machine learning models", "Natural language processing", "Computer vision", "Predictive analytics"]
                    },
                    {
                      title: "Automation & Optimization",
                      description: "Streamline operations and reduce costs through intelligent process automation.",
                      features: ["Workflow automation", "Decision support systems", "Performance optimization", "Cost reduction analysis"]
                    },
                    {
                      title: "Training & Support",
                      description: "Comprehensive team training and ongoing support to maximize your AI investment.",
                      features: ["Staff training programs", "Technical documentation", "Ongoing maintenance", "Performance monitoring"]
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={service.title}
                      className="glass p-10 rounded-3xl hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-500 border border-black/5 dark:border-white/5"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.45 + index * 0.06 }}
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-xl font-medium text-black dark:text-white mb-4 font-grotesk">{service.title}</h4>
                      <p className="text-black/60 dark:text-white/60 mb-8 font-light leading-relaxed">{service.description}</p>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-black/50 dark:text-white/50 text-sm font-light">
                            <CheckCircle className="h-4 w-4 text-[#10b981] mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call to Action for AI Consulting */}
              <motion.section
                className="text-center"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="glass p-16 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/5 to-[#059669]/5 opacity-30" />
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-10 w-10 text-[#10b981] mr-4" />
                    <h2 className="text-4xl md:text-5xl font-light text-black dark:text-white font-grotesk">Ready to Transform?</h2>
                  </div>
                  <p className="text-xl text-black/60 dark:text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                    Let's discuss how AI can solve your business challenges and unlock new opportunities for growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <button className="magnetic px-10 py-5 bg-[#10b981] text-white text-sm uppercase tracking-widest font-medium rounded-full hover:bg-[#059669] transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        Schedule Consultation
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
