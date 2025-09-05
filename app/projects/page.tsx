"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, Brain, Zap, Search, Target, Lightbulb, TrendingUp, Users, CheckCircle } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import CursorEffect from "@/components/cursor-effect"
import { useState } from "react"

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

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("current")

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
              {["People", "About"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item}
                </Link>
              ))}
              <Link href="/projects" className="text-cyan-400 font-black">
                Projects
              </Link>
              {["Blog", "Contact"].map((item) => (
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
            <MobileMenu currentPath="/projects" />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 relative z-10">
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
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PROJECTS &
            <br />
            SERVICES
          </motion.h1>

          {/* Tab Navigation */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
                  activeTab === "current"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30"
                }`}
              >
                Current Projects
              </button>
              <button
                onClick={() => setActiveTab("consulting")}
                className={`px-8 py-4 rounded-2xl font-black text-lg transition-all duration-300 ${
                  activeTab === "consulting"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/30"
                }`}
              >
                AI Consulting
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === "current" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Projects Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Morphika Project */}
            <motion.div
              className="group bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl overflow-hidden hover:border-blue-400/40 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              {/* Project Preview */}
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-900/20"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">MORPHIKA</h3>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-white">MORPHIKA</h2>
                  <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-black rounded-full">
                    AI TOOL
                  </span>
                </div>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed font-semibold">
                  AI-powered image generator for eCommerce. Create hyper-realistic product visuals that elevate your
                  brand instantly with cutting-edge machine learning technology.
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">KEY FEATURES</h4>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      "Hyper-realistic product visualization",
                      "Brand-consistent styling",
                      "Instant generation & export",
                      "Multiple format support",
                    ].map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {["AI/ML", "Python", "React", "API"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-blue-900/50 text-blue-300 px-3 py-1 text-sm font-black rounded-lg border border-blue-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link href="https://v0-saas-image-generation-software.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 font-black"
                  size="lg"
                >
                    View Live Demo
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                </Link>
              </div>
            </motion.div>

            {/* AI Research Agent Project */}
            <motion.div
              className="group bg-gradient-to-br from-purple-900/20 to-pink-900/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl overflow-hidden hover:border-purple-400/40 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Project Preview */}
              <div className="h-64 bg-gradient-to-br from-purple-600 to-pink-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-900/20"></div>

                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Brain className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">RESEARCHER AI</h3>
                    <div className="mt-2 flex items-center justify-center">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 text-xs font-black rounded-full">
                        COMING SOON
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-white">RESEARCHER AI</h2>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 text-sm font-black rounded-full">
                    AI AGENT
                  </span>
                </div>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed font-semibold">
                  Your intelligent research companion that understands scientific literature, generates hypotheses, designs experiments, and accelerates discovery across all research domains.
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">PLANNED FEATURES</h4>
                  <ul className="space-y-2 text-gray-400">
                    {[
                      "Intelligent literature review & synthesis",
                      "Automated hypothesis generation",
                      "Experimental design optimization",
                      "Real-time collaboration with researchers",
                      "Cross-domain knowledge connection",
                      "Publication-ready report generation",
                    ].map((feature, index) => (
                      <motion.li
                        key={feature}
                        className="flex items-center font-semibold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-pink-400 rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-lg font-black mb-4 text-white">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {["LLM", "RAG", "Vector DB", "NLP", "Python", "React", "GraphQL"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-purple-900/50 text-purple-300 px-3 py-1 text-sm font-black rounded-lg border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-black text-white">DEVELOPMENT PROGRESS</span>
                    <span className="text-sm font-black text-purple-400">35%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white border border-purple-500/30 rounded-xl font-black hover:from-purple-600/70 hover:to-pink-600/70 transition-all duration-300"
                  size="lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Notify Me When Ready
                </Button>
              </div>
            </motion.div>
              </div>

              {/* Call to Action for Current Projects */}
              <motion.section
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-3xl p-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">HAVE A PROJECT IN MIND?</h2>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
                    Let's collaborate to build something extraordinary that pushes the boundaries of what's possible in
                    research and innovation.
                  </p>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 px-12 py-6 text-xl font-black rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      Start a Project
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
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
              transition={{ duration: 0.6 }}
            >
              {/* Hero Section for AI Consulting */}
              <div className="text-center mb-16">
                <motion.div
                  className="inline-flex items-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Brain className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-emerald-400 font-black text-sm">AI TRANSFORMATION SPECIALISTS</span>
                </motion.div>
                
                <motion.h2
                  className="text-4xl md:text-6xl font-black mb-6 text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  AI ADOPTION
                  <br />
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    CONSULTING
                  </span>
                </motion.h2>
                
                <motion.p
                  className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  We help businesses identify pain points and implement tailored AI solutions that drive real value. 
                  From strategy to deployment, we're your partners in AI transformation.
                </motion.p>
              </div>

              {/* Our Approach */}
              <div className="mb-20">
                <motion.h3
                  className="text-3xl md:text-4xl font-black mb-12 text-center text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  OUR APPROACH
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Search,
                      title: "DISCOVERY",
                      description: "Deep dive into your business processes to identify AI opportunities and pain points",
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: Target,
                      title: "STRATEGY",
                      description: "Develop a comprehensive AI roadmap aligned with your business objectives",
                      color: "from-emerald-500 to-emerald-600"
                    },
                    {
                      icon: Lightbulb,
                      title: "SOLUTION",
                      description: "Design and prototype custom AI solutions tailored to your specific needs",
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      icon: TrendingUp,
                      title: "IMPLEMENTATION",
                      description: "Deploy, train, and optimize AI systems for maximum business impact",
                      color: "from-orange-500 to-orange-600"
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="text-xl font-black text-white mb-3 text-center">{step.title}</h4>
                      <p className="text-gray-300 text-center font-semibold leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mb-20">
                <motion.h3
                  className="text-3xl md:text-4xl font-black mb-12 text-center text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  WHAT WE DELIVER
                </motion.h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {[
                    {
                      title: "AI STRATEGY & ROADMAP",
                      description: "Comprehensive assessment and strategic planning for AI integration across your organization.",
                      features: ["Business process analysis", "ROI projections", "Implementation timeline", "Risk assessment"]
                    },
                    {
                      title: "CUSTOM AI SOLUTIONS",
                      description: "Bespoke AI systems designed specifically for your industry challenges and requirements.",
                      features: ["Machine learning models", "Natural language processing", "Computer vision", "Predictive analytics"]
                    },
                    {
                      title: "AUTOMATION & OPTIMIZATION",
                      description: "Streamline operations and reduce costs through intelligent process automation.",
                      features: ["Workflow automation", "Decision support systems", "Performance optimization", "Cost reduction analysis"]
                    },
                    {
                      title: "TRAINING & SUPPORT",
                      description: "Comprehensive team training and ongoing support to maximize your AI investment.",
                      features: ["Staff training programs", "Technical documentation", "Ongoing maintenance", "Performance monitoring"]
                    }
                  ].map((service, index) => (
                    <motion.div
                      key={service.title}
                      className="bg-gradient-to-br from-emerald-900/20 to-teal-900/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-8 hover:border-emerald-400/40 transition-all duration-500"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <h4 className="text-2xl font-black text-white mb-4">{service.title}</h4>
                      <p className="text-gray-300 mb-6 font-semibold leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-gray-400 font-semibold">
                            <CheckCircle className="h-5 w-5 text-emerald-400 mr-3 flex-shrink-0" />
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
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/10 backdrop-blur-sm border border-emerald-500/20 rounded-3xl p-12">
                  <div className="flex items-center justify-center mb-6">
                    <Users className="h-12 w-12 text-emerald-400 mr-4" />
                    <h2 className="text-4xl md:text-5xl font-black text-white">READY TO TRANSFORM?</h2>
                  </div>
                  <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-semibold">
                    Let's discuss how AI can solve your business challenges and unlock new opportunities for growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white border-0 px-12 py-6 text-xl font-black rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                      >
                        Schedule Consultation
                        <ArrowRight className="ml-2 h-6 w-6" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.section>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
