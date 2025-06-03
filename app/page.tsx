"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Zap, Users } from "lucide-react"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"

// Connected Hexagon Logo Component
const ConnectedHexagonLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => {
  const hexagonPoints = []
  const center = size / 2
  const radius = size * 0.35

  // Calculate hexagon vertices
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    hexagonPoints.push({ x, y })
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        {/* Hexagon outline */}
        <polygon
          points={hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />

        {/* Connected lines between points */}
        {hexagonPoints.map((point, i) => (
          <g key={i}>
            {/* Lines to center */}
            <motion.line
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400/60"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />

            {/* Points at vertices */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="currentColor"
              className="text-blue-400"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          </g>
        ))}

        {/* Center point */}
        <motion.circle
          cx={center}
          cy={center}
          r="2"
          fill="currentColor"
          className="text-blue-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
      </svg>
    </div>
  )
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
      
      // Detect potential low-power scenarios
      const lowPower = mobile || navigator.hardwareConcurrency <= 4
      setIsLowPowerMode(lowPower)
    }

    checkMobile()
    
    // Only add mouse tracking on desktop
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile])

  // Reduced animation variants for mobile
  const mobileAnimationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  }

  const desktopAnimationVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  }

  const animationVariants = isMobile ? mobileAnimationVariants : desktopAnimationVariants

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden relative">
      {/* Simplified Background for Mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {!isLowPowerMode ? (
          <>
            {/* Main flowing shapes - Desktop only */}
            <motion.div
              className="absolute -top-1/2 -left-1/4 w-full h-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-96 h-96 bg-gradient-to-r from-blue-600/30 to-blue-400/20 rounded-full blur-3xl" />
            </motion.div>

            <motion.div
              className="absolute top-1/4 -right-1/4 w-full h-full"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-80 h-80 bg-gradient-to-r from-pink-500/20 to-purple-500/15 rounded-full blur-3xl" />
            </motion.div>

            {/* Flowing curved lines - Desktop only */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#be185d" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              <motion.path
                d="M-100,200 Q200,100 400,300 T800,200 Q1000,400 1200,100"
                stroke="url(#blueGradient)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />

              <motion.path
                d="M-50,400 Q300,200 600,500 T1000,300 Q1200,600 1400,200"
                stroke="url(#pinkGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
              />
            </svg>

            {/* Interactive mouse effect - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                style={{
                  left: mousePosition.x - 192,
                  top: mousePosition.y - 192,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
              />
            )}
          </>
        ) : (
          /* Simple static background for mobile/low-power devices */
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/15 to-purple-500/10 rounded-full blur-2xl" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ConnectedHexagonLogo size={32} />
              <span className="text-xl font-black text-white">Trixode Studios</span>
            </Link>

            {/* Desktop Menu */}
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
            <MobileMenu currentPath="/" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-6 font-medium"
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ ...animationVariants.transition, delay: 0.1 }}
          >
            Click #more below to explore our services & projects. Yeap, is like magic!
          </motion.p>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight text-white"
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ ...animationVariants.transition, delay: 0.2 }}
          >
            We build beautiful &<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              elegant software
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ ...animationVariants.transition, delay: 0.3 }}
          >
            Empowering scientists, innovators, and creators with AI-powered tools that bridge the gap between
            cutting-edge research and practical applications.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={animationVariants.initial}
            animate={animationVariants.animate}
            transition={{ ...animationVariants.transition, delay: 0.4 }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 px-8 py-6 text-lg font-black rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 px-8 py-6 text-lg font-black rounded-lg backdrop-blur-sm transition-all duration-300"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={animationVariants.initial}
            whileInView={animationVariants.animate}
            transition={animationVariants.transition}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">CRAFTING THE FUTURE</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-medium">
              We combine cutting-edge technology with elegant design to create tools that transform how research and
              innovation happen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "ELEGANT CODE",
                description:
                  "Clean, maintainable code built with modern frameworks and best practices for scalability and performance.",
              },
              {
                icon: Zap,
                title: "AI POWERED",
                description:
                  "Advanced machine learning and artificial intelligence seamlessly integrated into intuitive user experiences.",
              },
              {
                icon: Users,
                title: "HUMAN FOCUSED",
                description:
                  "Technology that amplifies human creativity and intelligence, designed for researchers and innovators.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500"
                initial={animationVariants.initial}
                whileInView={animationVariants.animate}
                transition={{ ...animationVariants.transition, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={!isMobile ? { y: -5 } : {}}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={animationVariants.initial}
            whileInView={animationVariants.animate}
            transition={animationVariants.transition}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">READY TO BUILD THE FUTURE?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
              Let's collaborate to create something extraordinary that pushes the boundaries of what's possible.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 px-12 py-6 text-xl font-black rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Get In Touch
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
