"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import WelcomeLoader from "@/components/ui/WelcomeLoader"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import ServicesSection from "@/components/home/ServicesSection"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const NeonBlob = dynamic(() => import("@/components/hero/NeonBlob"), { ssr: false })

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [animationProgress, setAnimationProgress] = useState(0)
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const [showHeroBlob, setShowHeroBlob] = useState(false)
    const prefersReducedMotion = useReducedMotion()
    const enableMotion = !prefersReducedMotion
    const enableHeavyEffects = enableMotion && isDesktop
    const htmlOverflowRef = useRef<string | null>(null)
    const bodyOverflowRef = useRef<string | null>(null)

    useEffect(() => {
        if (!enableHeavyEffects) {
            setShowHeroBlob(false)
            return
        }

        if (typeof window === "undefined") return

        const schedule = window.setTimeout(() => setShowHeroBlob(true), 800)

        return () => {
            window.clearTimeout(schedule)
        }
    }, [enableHeavyEffects])

    useEffect(() => {
        if (typeof window === "undefined") return

        const html = document.documentElement
        const body = document.body

        if (isLoading) {
            if (htmlOverflowRef.current === null) htmlOverflowRef.current = html.style.overflow
            if (bodyOverflowRef.current === null) bodyOverflowRef.current = body.style.overflow
            html.style.overflow = "hidden"
            body.style.overflow = "hidden"
            return
        }

        html.style.overflow = htmlOverflowRef.current ?? ""
        body.style.overflow = bodyOverflowRef.current ?? ""
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })

        return () => {
            html.style.overflow = htmlOverflowRef.current ?? ""
            body.style.overflow = bodyOverflowRef.current ?? ""
        }
    }, [isLoading])

    // Enable magnetic effect for all .magnetic elements
    useMagneticEffect()

    return (
        <>
            {/* Welcome Loader Animation */}
            <WelcomeLoader
                onLoadingComplete={() => setIsLoading(false)}
                onAnimationProgress={(progress) => setAnimationProgress(progress)}
            />

            {/* Custom Cursor - Only on Desktop */}
            {enableHeavyEffects && <CustomCursor />}

            {/* Floating Navigation */}
            <FloatingNav />

            {/* Main Page Content */}
            <motion.div
                className="min-h-screen bg-[#030303] text-white overflow-hidden origin-top"
                initial={enableMotion ? { scale: 1.05, filter: "blur(8px)" } : false}
                animate={enableMotion ? {
                    scale: animationProgress > 90 ? 1 : 1.05,
                    filter: animationProgress > 90 ? "blur(0px)" : "blur(8px)"
                } : {}}
                transition={enableMotion ? {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                } : { duration: 0 }}
            >

                {/* Background Aurora Effects - Optimized */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    {enableHeavyEffects ? (
                        <>
                            <motion.div
                                className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-35"
                                style={{
                                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
                                    willChange: "transform",
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
                                className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-35"
                                style={{
                                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
                                    willChange: "transform",
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
                                className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-35"
                                style={{
                                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
                                    willChange: "transform",
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
                        </>
                    ) : (
                        <>
                            <div
                                className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-25"
                                style={{
                                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                                }}
                            />
                            <div
                                className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-25"
                                style={{
                                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                                }}
                            />
                            <div
                                className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-25"
                                style={{
                                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)",
                                }}
                            />
                        </>
                    )}
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

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-32 pb-20">
                    <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        {/* Hero Text */}
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.2 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="w-10 h-[1px] bg-[#3b82f6]" style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }} />
                                <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-['Space_Grotesk',sans-serif]">
                                    Victoria, BC / Software Studio
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-none tracking-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.4 }}
                            >
                                <span className="block overflow-hidden pb-[0.12em]">
                                    <motion.span
                                        className="block font-['Space_Grotesk',sans-serif]"
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.9, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ willChange: "transform" }}
                                    >
                                        Crafting
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden pb-[0.12em]">
                                    <motion.span
                                        className="block bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent font-['Space_Grotesk',sans-serif]"
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.9, delay: 3.7, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ willChange: "transform" }}
                                    >
                                        Intelligence
                                    </motion.span>
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.9 }}
                                className="text-lg text-white/50 mb-12 max-w-[500px] leading-relaxed font-light"
                            >
                                Advanced software infrastructure for AI research and scientific computing. We build elegant systems that
                                empower innovators.
                            </motion.p>

                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 4.1 }}
                                className="magnetic inline-flex items-center gap-4 px-8 py-4 border border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group"
                            >
                                <span className="relative z-10">Start a Project</span>
                                <ArrowRight className="w-4 h-4 relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.a>
                        </div>

                        {/* Hero Visual - Floating Cards (Desktop) / Stats Grid (Mobile) */}
                        <div className="relative lg:h-[620px]">
                            {/* Blob positioned as orbital center for cards */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-end pointer-events-none z-0 hidden lg:flex"
                                style={{ paddingRight: "8%" }}
                                initial={{ scale: 0.35, opacity: 0 }}
                                animate={{
                                    scale: animationProgress > 50 ? 1 : 0.35,
                                    opacity: animationProgress > 50 ? 0.85 : 0,
                                }}
                                transition={{
                                    duration: 1.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <div className="w-[520px] h-[520px]">
                                    {showHeroBlob && <NeonBlob />}
                                </div>
                            </motion.div>

                            {/* Mobile Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 lg:hidden mt-12">
                                {[
                                    { value: "99.9%", label: "Uptime" },
                                    { value: "50+", label: "Labs" },
                                    { value: "10x", label: "Faster" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 4.0 + i * 0.1 }}
                                        className="glass p-4 rounded-2xl text-center"
                                    >
                                        <div
                                            className="text-2xl sm:text-3xl font-light text-[#3b82f6] font-['Space_Grotesk',sans-serif]"
                                            style={{ textShadow: "0 0 15px rgba(59, 130, 246, 0.3)" }}
                                        >
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mt-1">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Desktop Floating Cards - Orbit around the blob on right side */}
                            <div className="absolute inset-0 flex items-center justify-end pointer-events-none hidden lg:flex" style={{ paddingRight: "8%" }}>
                                <div className="relative w-[560px] h-[560px] pointer-events-none">

                                    {/* Card 1 - Top orbit position */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] pointer-events-auto cursor-pointer"
                                        initial={{
                                            opacity: 0,
                                            y: 300,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        animate={animationProgress > 60 ? {
                                            opacity: 1,
                                            y: -120,
                                            x: 10,
                                            scale: 1,
                                            rotateX: 0,
                                        } : {
                                            opacity: 0,
                                            y: 300,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        transition={{
                                            opacity: { duration: 1.2 },
                                            y: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                                            x: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                                            rotateX: { duration: 1.2 },
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        {/* Circular orbit around blob */}
                                        <motion.div
                                            animate={animationProgress >= 100 ? {
                                                x: [10, 100, 120, 100, 10, -70, -90, -70],
                                                y: [-120, -100, -30, 30, 90, 110, 30, -30],
                                            } : {}}
                                            transition={{
                                                duration: 60,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -10 }}
                                                className="glass p-8 rounded-3xl w-full h-full"
                                            >
                                                <div
                                                    className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                    style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                                >
                                                    99.9%
                                                </div>
                                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Uptime SLA</div>
                                                <div className="text-lg text-white">Enterprise Ready</div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Card 2 - Left orbit position */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] pointer-events-auto cursor-pointer"
                                        initial={{
                                            opacity: 0,
                                            y: 350,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        animate={animationProgress > 65 ? {
                                            opacity: 1,
                                            y: -20,
                                            x: -140,
                                            scale: 1,
                                            rotateX: 0,
                                        } : {
                                            opacity: 0,
                                            y: 350,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        transition={{
                                            opacity: { duration: 1.2 },
                                            y: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                                            x: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
                                            rotateX: { duration: 1.2 },
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        {/* Circular orbit around blob */}
                                        <motion.div
                                            animate={animationProgress >= 100 ? {
                                                x: [-140, -120, -70, -20, 30, 70, 90, 70, 30, -20, -70, -120],
                                                y: [-20, 40, 90, 120, 120, 90, 40, -20, -60, -90, -100, -60],
                                            } : {}}
                                            transition={{
                                                duration: 65,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -10 }}
                                                className="glass p-8 rounded-3xl w-full h-full"
                                            >
                                                <div
                                                    className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                    style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                                >
                                                    50+
                                                </div>
                                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Research Labs</div>
                                                <div className="text-lg text-white">Global Partners</div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Card 3 - Bottom orbit position */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] pointer-events-auto cursor-pointer"
                                        initial={{
                                            opacity: 0,
                                            y: 320,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        animate={animationProgress > 70 ? {
                                            opacity: 1,
                                            y: 120,
                                            x: -30,
                                            scale: 1,
                                            rotateX: 0,
                                        } : {
                                            opacity: 0,
                                            y: 320,
                                            scale: 0.8,
                                            rotateX: 45,
                                        }}
                                        transition={{
                                            opacity: { duration: 1.2 },
                                            y: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
                                            x: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
                                            scale: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
                                            rotateX: { duration: 1.2 },
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        {/* Circular orbit around blob */}
                                        <motion.div
                                            animate={animationProgress >= 100 ? {
                                                x: [-30, 20, 70, 110, 120, 100, 60, 10, -30, -70, -90, -90, -70],
                                                y: [120, 140, 130, 100, 50, 10, -30, -70, -100, -110, -90, -30, 20],
                                            } : {}}
                                            transition={{
                                                duration: 70,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05, y: -10 }}
                                                className="glass p-8 rounded-3xl w-full h-full"
                                            >
                                                <div
                                                    className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                    style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                                >
                                                    10x
                                                </div>
                                                <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Performance</div>
                                                <div className="text-lg text-white">vs Traditional</div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ServicesSection />

                {/* Expertise Section */}
                <section id="expertise" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">01</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Core Systems
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.08]">
                            {[
                                {
                                    num: "01",
                                    title: "Neural Infrastructure",
                                    desc: "Distributed training platforms and model serving architectures.",
                                },
                                {
                                    num: "02",
                                    title: "Scientific Computing",
                                    desc: "High-performance frameworks for research workloads.",
                                },
                                {
                                    num: "03",
                                    title: "Creative Intelligence",
                                    desc: "Generative systems for human-AI collaboration.",
                                },
                                {
                                    num: "04",
                                    title: "Data Architecture",
                                    desc: "Stream processing and visualization pipelines.",
                                },
                                { num: "05", title: "Cloud Systems", desc: "Scalable infrastructure with enterprise security." },
                                {
                                    num: "06",
                                    title: "Lab Automation",
                                    desc: "Intelligent workflow orchestration systems.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.num}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-[rgba(255,255,255,0.02)] p-12 relative overflow-hidden cursor-pointer hover:bg-white/[0.06] transition-all duration-400"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="relative z-10">
                                        <div className="text-xs text-[#3b82f6] mb-8 font-medium font-['Space_Grotesk',sans-serif] group-hover:translate-x-2 transition-transform duration-300">
                                            {item.num}
                                        </div>
                                        <h3 className="text-2xl mb-4 font-normal group-hover:translate-x-2 transition-transform duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 leading-relaxed group-hover:translate-x-2 transition-transform duration-300">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">02</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Selected Work
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {[
                                { year: "2025", name: "GenomeAnalyzer Pro", category: "Bioinformatics" },
                                { year: "2025", name: "Visionary Studio", category: "Creative Tools" },
                                { year: "2024", name: "InsightFlow", category: "Data Science" },
                                { year: "2024", name: "LabAssistant AI", category: "Automation" },
                            ].map((project, index) => (
                                <motion.a
                                    key={project.name}
                                    href="#"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="magnetic group grid grid-cols-1 md:grid-cols-[100px_1fr_200px_auto] gap-8 p-12 border border-white/[0.08] items-center relative overflow-hidden hover:border-white/20 hover:translate-x-5 transition-all duration-400"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    <span className="text-sm text-white/25 font-['Space_Grotesk',sans-serif] group-hover:text-[#3b82f6] transition-colors">
                                        {project.year}
                                    </span>
                                    <span className="text-3xl md:text-4xl font-normal font-['Space_Grotesk',sans-serif] relative">
                                        {project.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3b82f6] group-hover:w-full transition-all duration-400" />
                                    </span>
                                    <span className="text-sm uppercase tracking-widest text-white/50 group-hover:text-[#3b82f6] transition-colors">
                                        {project.category}
                                    </span>
                                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#3b82f6] group-hover:rotate-45 transition-all duration-400">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section id="team" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">03</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Leadership
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { initials: "JD", name: "Dr. Jane Doe", role: "Chief Scientist" },
                                { initials: "MS", name: "Mark Smith", role: "Lead Engineer" },
                                { initials: "EC", name: "Elena Chen", role: "Creative Director" },
                                { initials: "AK", name: "Alex Kim", role: "Product Lead" },
                            ].map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass p-12 rounded-3xl text-center cursor-pointer group hover:-translate-y-2 transition-all duration-400"
                                >
                                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-white/10 flex items-center justify-center text-2xl font-light font-['Space_Grotesk',sans-serif] group-hover:border-[#3b82f6] group-hover:scale-110 transition-all duration-400">
                                        {member.initials}
                                    </div>
                                    <h3 className="text-xl mb-2 font-normal">{member.name}</h3>
                                    <div className="text-sm uppercase tracking-widest text-white/50 group-hover:text-[#3b82f6] transition-colors">
                                        {member.role}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="relative px-6 md:px-16 py-40 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                                    Let's build something extraordinary.
                                </h3>
                                <p className="text-white/50 mb-12 leading-relaxed text-lg">
                                    We're currently accepting new partnerships for Q2 2025. If you're working on challenging problems at
                                    the intersection of AI and science, we'd love to hear from you.
                                </p>

                                <div className="flex flex-col gap-4">
                                    <a
                                        href="mailto:hello@trixode.com"
                                        className="magnetic glass flex items-center justify-between p-6 rounded-2xl group hover:translate-x-2 transition-all duration-400"
                                    >
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-white/25 mb-1">Email</div>
                                            <div className="text-lg">hello@trixode.com</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-400" />
                                    </a>
                                    <a
                                        href="tel:+12505550127"
                                        className="magnetic glass flex items-center justify-between p-6 rounded-2xl group hover:translate-x-2 transition-all duration-400"
                                    >
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-white/25 mb-1">Phone</div>
                                            <div className="text-lg">+1 (250) 555-0127</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-400" />
                                    </a>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-8"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    alert("Form submitted! (Demo only)")
                                }}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        id="name"
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors"
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Your Name
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        id="email"
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Email Address
                                    </label>
                                </div>

                                <div className="relative">
                                    <textarea
                                        placeholder=" "
                                        id="message"
                                        rows={4}
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors resize-none"
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Tell us about your project
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="magnetic w-full py-5 border border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-[#3b82f6] transition-all duration-400"
                                >
                                    <span className="relative z-10">Send Message</span>
                                    <div className="absolute inset-0 bg-[#3b82f6] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </section>

                <Footer />
            </motion.div>
        </>
    )
}
