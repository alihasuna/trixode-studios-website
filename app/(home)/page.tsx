"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const NeonBlob = dynamic(() => import("@/components/hero/NeonBlob"), { ssr: false })

export default function StudioPage() {
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
    const [showHeroBlob, setShowHeroBlob] = useState(false)
    const prefersReducedMotion = useReducedMotion()
    const enableMotion = !prefersReducedMotion
    const enableHeavyEffects = enableMotion && isDesktop

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

    return (
        <main className="relative min-h-screen bg-[#030303] text-white antialiased overflow-hidden">
            {/* Background Aurora Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {enableHeavyEffects ? (
                    <>
                        <motion.div
                            className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-35"
                            style={{
                                background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
                                willChange: "transform",
                            }}
                            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-35"
                            style={{
                                background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
                                willChange: "transform",
                            }}
                            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-35"
                            style={{
                                background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
                                willChange: "transform",
                            }}
                            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                ) : (
                    <>
                        <div
                            className="absolute w-[500px] h-[500px] -top-20 -left-20 rounded-full blur-[60px] opacity-25"
                            style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)" }}
                        />
                        <div
                            className="absolute w-[400px] h-[400px] top-1/3 -right-10 rounded-full blur-[60px] opacity-25"
                            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)" }}
                        />
                        <div
                            className="absolute w-[350px] h-[350px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-25"
                            style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }}
                        />
                    </>
                )}
            </div>

            {/* Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "100px 100px",
                }}
            />

            {/* Blob floating in background (Right Side) */}
            <motion.div
                className="absolute inset-0 flex items-center justify-end pointer-events-none z-0 hidden lg:flex"
                style={{ paddingRight: "8%" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-[600px] h-[600px]">
                    {showHeroBlob && <NeonBlob />}
                </div>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10">
                <header className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-8 md:px-10">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
                    Trixode-Studios
                    </span>
                    <Link
                    href="mailto:ali@trixode-studios.com"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                    Contact
                    </Link>
                </header>

                <section className="mx-auto max-w-[1200px] px-6 pt-28 pb-40 md:px-10 md:pt-44 md:pb-56 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="mb-10 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Research lab · Victoria, BC
                        </span>

                        <h1 className="font-grotesk text-[44px] font-light leading-[1.04] tracking-[-0.025em] text-white md:text-[80px]">
                        The mathematics of
                        <br />
                        agentic systems.
                        </h1>

                        <p className="mt-10 max-w-[640px] text-[18px] leading-[1.55] text-white/60 md:text-[20px]">
                        Trixode-Studios is a research lab developing math models that measure
                        the <span className="text-white">complexity</span> and{" "}
                        <span className="text-white">security</span> of agentic workflows.
                        Our live testbed is{" "}
                        <span className="text-white">Intellcycle</span>, an agentic
                        marketplace for recycled metals.
                        </p>

                        <div className="mt-14">
                        <Link
                            href="mailto:ali@trixode-studios.com"
                            className="inline-flex items-center gap-2 border-b border-white/30 pb-1 text-[15px] text-white transition-colors hover:border-white"
                        >
                            Get in touch
                            <span aria-hidden className="translate-y-[-1px]">
                            →
                            </span>
                        </Link>
                        </div>
                    </motion.div>
                </section>

                <section className="border-t border-white/[0.08] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/5 to-transparent pointer-events-none" />
                    <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-12 md:gap-12 md:px-10 md:py-32 relative">
                    <div className="md:col-span-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Direction
                        </h2>
                    </div>
                    <div className="mt-8 md:col-span-8 md:mt-0">
                        <p className="font-grotesk text-[26px] font-light leading-[1.35] tracking-[-0.015em] text-white md:text-[34px]">
                        Agentic systems are growing in capability faster than the tools
                        we have to measure whether they are tractable, safe, or correct.
                        </p>
                        <p className="mt-8 max-w-[680px] text-[16px] leading-[1.7] text-white/60 md:text-[17px]">
                        We study the structural properties of agent behaviour —
                        branching, information flow, capability boundaries, adversarial
                        pressure — and translate them into measures operators can act
                        on. The work is exercised on real workflows, not benchmarks.
                        </p>
                    </div>
                    </div>
                </section>

                <section className="border-t border-white/[0.08] relative">
                    <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
                    <div className="md:col-span-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Live testbed
                        </h2>
                    </div>
                    <div className="mt-8 md:col-span-8 md:mt-0">
                        <h3 className="font-grotesk text-[30px] font-light leading-[1.15] tracking-[-0.015em] text-white md:text-[40px]">
                        Intellcycle
                        </h3>
                        <p className="mt-6 max-w-[680px] text-[16px] leading-[1.7] text-white/60 md:text-[17px]">
                        An agentic marketplace for recycled metals. Real counterparties,
                        real settlement, real adversarial pressure — the surface where
                        measurements stop being theoretical.
                        </p>
                    </div>
                    </div>
                </section>

                <section className="border-t border-white/[0.08] relative">
                    <div className="mx-auto max-w-[1200px] px-6 py-24 md:grid md:grid-cols-12 md:gap-12 md:px-10 md:py-32">
                    <div className="md:col-span-4">
                        <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        Founders
                        </h2>
                    </div>
                    <div className="mt-8 md:col-span-8 md:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                            {[
                                {
                                    name: "Ali Hasuna",
                                    role: "Chief Executive Officer",
                                    image: "https://res.cloudinary.com/dmkfxjv0s/image/upload/w_200,h_200,c_fill,g_face,f_auto,q_auto/v1749088385/ceo_photo.png",
                                },
                                {
                                    name: "Amir Ahmadian",
                                    role: "Chief Science Officer",
                                    image: "https://res.cloudinary.com/dnsl6kst1/image/upload/w_200,h_200,c_fill,g_face,f_auto,q_auto/v1770191425/ChatGPT_Image_Feb_3_2026_11_47_46_PM_sasgnj.png",
                                },
                            ].map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass bg-white/[0.03] border border-white/[0.08] p-10 rounded-3xl text-center cursor-pointer group hover:-translate-y-2 hover:bg-white/[0.06] transition-all duration-400"
                                >
                                    <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-blue group-hover:scale-110 transition-all duration-400">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>
                                    <h3 className="text-xl mb-2 font-normal uppercase font-grotesk">{member.name}</h3>
                                    <div className="text-sm uppercase tracking-widest text-white/50 group-hover:text-brand-blue transition-colors">
                                        {member.role}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    </div>
                </section>

                <footer className="border-t border-white/[0.08] relative">
                    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                        © 2026 Trixode-Studios Inc.
                    </p>
                    <Link
                        href="mailto:ali@trixode-studios.com"
                        className="text-[12px] text-white/40 transition-colors hover:text-white"
                    >
                        ali@trixode-studios.com
                    </Link>
                    </div>
                </footer>
            </div>
        </main>
    )
}
