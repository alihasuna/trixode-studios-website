"use client"

import { useState, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Linkedin } from "lucide-react"
import WelcomeLoader from "@/components/ui/WelcomeLoader"
import CustomCursor from "@/components/ui/CustomCursor"
import LabFloatingNav from "@/components/lab/LabFloatingNav"
import LabFooter from "@/components/lab/LabFooter"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const NeonBlob = dynamic(() => import("@/components/hero/NeonBlob"), { ssr: false })

const RESEARCH_AREAS = [
    {
        num: "01",
        title: "Complexity metrics",
        desc: "Measures of branching, depth, and decision density in agent execution graphs — turning intuition about 'how complex' into numbers operators can compare.",
    },
    {
        num: "02",
        title: "Capability boundaries",
        desc: "Formal models of what a deployed agent can and cannot reach, so capability creep stops being a surprise discovered after an incident.",
    },
    {
        num: "03",
        title: "Information flow",
        desc: "Tracking what an agent sees, retains, and emits — the surface where leakage, contamination, and prompt injection live.",
    },
    {
        num: "04",
        title: "Adversarial pressure",
        desc: "Quantifying robustness under real counterparties pushing back. Benchmarks lie; live markets don't.",
    },
    {
        num: "05",
        title: "Tractability bounds",
        desc: "Knowing in advance which workflows are even decidable — and which are stochastic surfaces dressed as deterministic systems.",
    },
    {
        num: "06",
        title: "Operational safety",
        desc: "Translating structural measures into thresholds, alerts, and rollbacks that an oncall team can actually act on at 3am.",
    },
]

const PROJECTS: { name: string; status: string; desc: string; href?: string }[] = [
    {
        name: "Intellcycle",
        status: "Live · 2026",
        desc: "An agentic marketplace for recycled metals. Real counterparties, real settlement, real adversarial pressure — the surface where our measurements stop being theoretical.",
        href: "https://www.intellicycle.net/",
    },
    {
        name: "Morphika",
        status: "Live · 2026",
        desc: "An agentic solution for email — autonomous handling of inbox workflows that usually need a human in the loop. Where information-flow and capability-boundary measures get tested daily.",
    },
]

type TeamMember = {
    name: string
    role: string
    image: string | null
    blurb: string
    credentials?: string[]
    linkedin?: string
}

const TEAM: TeamMember[] = [
    {
        name: "Hussien Ballouk",
        role: "Founder",
        image:
            "https://res.cloudinary.com/dmkfxjv0s/image/upload/w_200,h_200,c_fill,g_face,f_auto,q_auto/v1749088385/ceo_photo.png",
        blurb: "Physics, strategy, and software engineering — with a math backbone.",
        credentials: [
            "B.Sc. & M.Sc., Southern Federal University (Russia)",
            "Ph.D. Physics, University of Victoria — in progress",
            "Background in nanotechnology",
        ],
        linkedin: "https://www.linkedin.com/in/hussien-ballouk-233b3b116/?locale=en",
    },
    {
        name: "Amir Ahmadian",
        role: "Founder",
        image:
            "https://res.cloudinary.com/dnsl6kst1/image/upload/w_200,h_200,c_fill,g_face,f_auto,q_auto/v1770191425/ChatGPT_Image_Feb_3_2026_11_47_46_PM_sasgnj.png",
        blurb: "Materials-science rigor with startup-tested execution — anchoring the lab's theory in real systems.",
        credentials: [
            "Ph.D. Materials Science",
            "Background in materials-science startups",
        ],
        linkedin: "https://www.linkedin.com/in/amir-ahmadian12/",
    },
    {
        name: "Matthew",
        role: "Collaborator",
        image: "/mathew.png",
        blurb: "Adds math formalism to the equation.",
        credentials: [
            "M.Sc. Mathematics, UVic 2024",
            "Combined Honours, CS & Mathematics, 2020",
        ],
    },
]

export default function LabPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [animationProgress, setAnimationProgress] = useState(0)
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
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
        return () => window.clearTimeout(schedule)
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

    useMagneticEffect()

    return (
        <>
            <WelcomeLoader
                onLoadingComplete={() => setIsLoading(false)}
                onAnimationProgress={(progress) => setAnimationProgress(progress)}
            />

            {enableHeavyEffects && <CustomCursor />}

            <LabFloatingNav />

            <motion.div
                className="min-h-screen bg-transparent text-black dark:text-white overflow-hidden origin-top"
                initial={enableMotion ? { scale: 1.05, filter: "blur(8px)" } : false}
                animate={enableMotion ? {
                    scale: animationProgress > 90 ? 1 : 1.05,
                    filter: animationProgress > 90 ? "blur(0px)" : "blur(8px)"
                } : {}}
                transition={enableMotion ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
            >
                {/* Background Aurora */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    {enableHeavyEffects ? (
                        <>
                            <motion.div
                                className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-35"
                                style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)", willChange: "transform" }}
                                animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-35"
                                style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)", willChange: "transform" }}
                                animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-35"
                                style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)", willChange: "transform" }}
                                animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </>
                    ) : (
                        <>
                            <div className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-25" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)" }} />
                            <div className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-25" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)" }} />
                            <div className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-25" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }} />
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

                {/* Hero */}
                <section className="relative min-h-screen flex items-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
                    {/* Blob — desktop, vertically centered on the right */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-end pointer-events-none z-0 hidden lg:flex"
                        style={{ paddingRight: "6%" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: animationProgress > 50 ? 0.95 : 0 }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden
                    >
                        <motion.div
                            className="w-[440px] h-[440px] xl:w-[520px] xl:h-[520px]"
                            initial={{ scale: 0.35 }}
                            animate={{ scale: animationProgress > 50 ? 1 : 0.35 }}
                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {showHeroBlob && <NeonBlob />}
                        </motion.div>
                    </motion.div>

                    {/* Blob — mobile / tablet, behind content */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 lg:hidden"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{
                            scale: animationProgress > 50 ? 1 : 0.4,
                            opacity: animationProgress > 50 ? 0.25 : 0,
                        }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        aria-hidden
                    >
                        <div className="w-[360px] h-[360px] sm:w-[460px] sm:h-[460px]">
                            {showHeroBlob && <NeonBlob />}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10 max-w-7xl w-full mx-auto">
                        <div className="max-w-[860px]">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 3.2 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <div className="w-10 h-[1px] bg-brand-blue" style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }} />
                                <span className="text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 font-grotesk">
                                    Research lab · Victoria, BC
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-light mb-10 leading-[1.08] tracking-[-0.02em]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.3 }}
                            >
                                <span className="block overflow-hidden pb-[0.25em]">
                                    <motion.span
                                        className="block font-grotesk"
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.7, delay: 3.35, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ willChange: "transform" }}
                                    >
                                        The mathematics of
                                    </motion.span>
                                </span>
                                <span className="block overflow-hidden pb-[0.25em]">
                                    <motion.span
                                        className="block bg-gradient-to-r from-slate-800 to-brand-blue dark:from-white dark:to-brand-blue bg-clip-text text-transparent font-grotesk"
                                        initial={{ y: "110%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 0.7, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ willChange: "transform" }}
                                    >
                                        agentic systems.
                                    </motion.span>
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 3.6 }}
                                className="text-lg md:text-xl text-black/60 dark:text-white/60 mb-12 max-w-[600px] leading-relaxed font-light"
                            >
                                We bring academic frameworks to bear on the{" "}
                                <span className="text-black dark:text-white">complexity</span> and{" "}
                                <span className="text-black dark:text-white">security</span> of
                                specific agentic systems. Our live testbed is{" "}
                                <span className="text-black dark:text-white">Intellcycle</span>, an agentic
                                marketplace for recycled metals.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 3.75 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    href="/lab/workflow"
                                    className="magnetic inline-flex items-center gap-4 px-8 py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Start a workflow</span>
                                    <ArrowRight className="w-4 h-4 relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                </Link>
                                <Link
                                    href="/lab/contact"
                                    className="magnetic inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors border-b border-black/20 dark:border-white/20 hover:border-brand-blue"
                                >
                                    Get in touch
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Direction */}
                <section id="direction" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto md:grid md:grid-cols-12 md:gap-12 relative">
                        <div className="md:col-span-4">
                            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                                01 · Direction
                            </span>
                        </div>
                        <div className="mt-8 md:col-span-8 md:mt-0">
                            <motion.p
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="font-grotesk text-[28px] md:text-[40px] font-light leading-[1.25] tracking-[-0.015em] text-black dark:text-white"
                            >
                                Agentic systems are growing in capability faster than the tools we have
                                to measure whether they are tractable, safe, or correct.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mt-8 max-w-[680px] text-[16px] md:text-[17px] leading-[1.7] text-black/60 dark:text-white/60 font-light"
                            >
                                We study the structural properties of agent behaviour — branching, information
                                flow, capability boundaries, adversarial pressure — and translate them into
                                measures operators can act on. The work is exercised on real workflows, not
                                benchmarks.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Research areas grid */}
                <section id="research" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-black/10 dark:border-white/10">
                            <span className="text-sm text-brand-blue font-medium font-grotesk">02</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                                What we study
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-black/[0.08] dark:bg-white/[0.08]">
                            {RESEARCH_AREAS.map((item, index) => (
                                <motion.div
                                    key={item.num}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="group bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] p-8 md:p-12 relative overflow-hidden cursor-default hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-400"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="relative z-10">
                                        <div className="text-xs text-brand-blue mb-8 font-medium font-grotesk group-hover:translate-x-2 transition-transform duration-300">
                                            {item.num}
                                        </div>
                                        <h3 className="text-2xl mb-4 font-normal group-hover:translate-x-2 transition-transform duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-black/50 dark:text-white/50 leading-relaxed group-hover:translate-x-2 transition-transform duration-300 font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section id="projects" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-black/10 dark:border-white/10">
                            <span className="text-sm text-brand-blue font-medium font-grotesk">03</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                                Live work
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {PROJECTS.map((project, index) => {
                                const Content = (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                        <span className="text-sm text-black/25 dark:text-white/25 font-grotesk group-hover:text-brand-blue transition-colors uppercase tracking-widest">
                                            {project.status}
                                        </span>
                                        <div className="relative">
                                            <h3 className="text-3xl md:text-4xl font-normal font-grotesk mb-3">
                                                {project.name}
                                            </h3>
                                            <p className="text-black/60 dark:text-white/60 leading-relaxed font-light max-w-[640px]">
                                                {project.desc}
                                            </p>
                                        </div>
                                        <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue group-hover:rotate-45 transition-all duration-400 flex-shrink-0">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </>
                                )

                                const wrapperClass =
                                    "magnetic grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-6 md:gap-8 p-10 md:p-12 border border-black/[0.08] dark:border-white/[0.08] items-start md:items-center relative overflow-hidden hover:border-black/20 dark:hover:border-white/20 hover:translate-x-2 transition-all duration-400 group"

                                return project.href ? (
                                    <motion.a
                                        key={project.name}
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className={wrapperClass}
                                    >
                                        {Content}
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={project.name}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className={wrapperClass}
                                    >
                                        {Content}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section id="team" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-8 pb-8 border-b border-black/10 dark:border-white/10">
                            <span className="text-sm text-brand-blue font-medium font-grotesk">04</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                                Team
                            </h2>
                        </div>
                        <p className="text-base md:text-lg text-black/55 dark:text-white/55 font-light leading-relaxed max-w-[600px] mb-20">
                            A small group of science people working on interesting problems in business.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {TEAM.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className="glass p-10 rounded-3xl text-center cursor-default group hover:-translate-y-2 transition-all duration-400 flex flex-col"
                                >
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-2 border-black/10 dark:border-white/10 group-hover:border-brand-blue group-hover:scale-110 transition-all duration-400 flex items-center justify-center bg-black/[0.03] dark:bg-white/[0.03]">
                                        {member.image ? (
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                width={200}
                                                height={200}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        ) : (
                                            <span
                                                className="font-grotesk text-3xl font-light text-brand-blue"
                                                aria-hidden
                                            >
                                                {member.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg mb-1 font-normal font-grotesk text-black dark:text-white">
                                        {member.name}
                                    </h3>
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-black/40 dark:text-white/40 group-hover:text-brand-blue transition-colors font-grotesk mb-4">
                                        {member.role}
                                    </div>
                                    <p className="text-sm text-black/55 dark:text-white/55 font-light leading-relaxed mb-4 min-h-[1.5em]">
                                        {member.blurb}
                                    </p>
                                    {member.credentials && member.credentials.length > 0 && (
                                        <ul className="text-xs text-black/45 dark:text-white/45 font-light leading-relaxed space-y-1 mb-4">
                                            {member.credentials.map((line) => (
                                                <li key={line}>{line}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto inline-flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/50 hover:text-brand-blue transition-colors font-grotesk pt-2"
                                            aria-label={`${member.name} on LinkedIn`}
                                        >
                                            <Linkedin className="w-3.5 h-3.5" />
                                            <span>LinkedIn</span>
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section id="cta" className="relative px-6 md:px-16 py-40 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-light mb-8 leading-tight font-grotesk"
                        >
                            Working on something agentic?
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-black/60 dark:text-white/60 mb-12 font-light max-w-[560px] mx-auto"
                        >
                            Tell us the shape of the workflow. We'll come back with what's measurable and
                            what isn't yet — no decks, no boilerplate.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link
                                href="/lab/workflow"
                                className="magnetic inline-flex items-center gap-4 px-8 py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-brand-blue transition-colors"
                            >
                                <span className="relative z-10">Start a workflow</span>
                                <ArrowRight className="w-4 h-4 relative z-10" />
                                <div className="absolute inset-0 bg-brand-blue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                            </Link>
                            <Link
                                href="/lab/contact"
                                className="magnetic inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                            >
                                Or just say hi
                            </Link>
                        </motion.div>
                    </div>
                </section>

                <LabFooter />
            </motion.div>
        </>
    )
}
