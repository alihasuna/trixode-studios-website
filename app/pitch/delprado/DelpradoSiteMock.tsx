"use client"

/**
 * Concept website mock for Delprado — inspired by ulyssesdesanti.com.
 * Stark gallery aesthetic: oversized grotesque type, generous whitespace,
 * an asymmetric photo grid, a kinetic marquee, and a built-in light/dark
 * toggle. Self-contained so it can live inside the Trixode browser-frame.
 */

import { useState } from "react"
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion"
import { Sun, Moon, ArrowUpRight } from "lucide-react"

type Work = { img: string; t: string; m: string; ratio: string; pos: string; cls: string; n: string }

const WORKS: Work[] = [
    { n: "01", img: "/pitch/delprado/dp-furniture.png", t: "Live-edge console", m: "Walnut · 2025", ratio: "3 / 4", pos: "center 35%", cls: "col-span-12 md:col-span-6" },
    { n: "02", img: "/pitch/delprado/dp-millwork-lynburne.jpg", t: "Lynburne millwork", m: "White oak · Victoria", ratio: "3 / 4", pos: "center 28%", cls: "col-span-12 md:col-span-5 md:col-start-8 md:mt-28" },
    { n: "03", img: "/pitch/delprado/dp-closets.png", t: "Fitted dressing room", m: "Cabinetry · made to measure", ratio: "16 / 10", pos: "center", cls: "col-span-12 md:col-span-9 md:col-start-2" },
]

const MARQUEE = ["Bespoke", "Local materials", "One of a kind", "Cabinetry", "Millwork", "Victoria, BC"]

function Figure({ w }: { w: Work }) {
    const reduce = useReducedMotion()
    return (
        <motion.figure
            className={`group ${w.cls}`}
            initial={reduce ? false : { opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative overflow-hidden" style={{ aspectRatio: w.ratio }}>
                <img src={w.img} alt={w.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]" style={{ objectPosition: w.pos }} />
            </div>
            <figcaption className="flex items-baseline justify-between mt-4 gap-4">
                <span className="text-base md:text-lg" style={{ color: "var(--ds-ink)" }}>
                    <span className="mr-3" style={{ color: "var(--ds-accent)" }}>{w.n}</span>{w.t}
                </span>
                <span className="text-[11px] tracking-[0.16em] uppercase shrink-0" style={{ color: "var(--ds-muted)" }}>{w.m}</span>
            </figcaption>
        </motion.figure>
    )
}

export default function DelpradoSiteMock() {
    const reduce = useReducedMotion()
    const [dark, setDark] = useState(false)

    // subtle cursor parallax on the oversized hero wordmark
    const hx = useMotionValue(0)
    const hy = useMotionValue(0)
    const sx = useSpring(hx, { stiffness: 70, damping: 18 })
    const sy = useSpring(hy, { stiffness: 70, damping: 18 })
    const onHeroMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        hx.set(((e.clientX - r.left) / r.width - 0.5) * 26)
        hy.set(((e.clientY - r.top) / r.height - 0.5) * 16)
    }
    const onHeroLeave = () => { hx.set(0); hy.set(0) }

    const bg = dark ? "#0d0c0a" : "#f3efe7"
    const ink = dark ? "#f4f0e8" : "#15120e"
    const muted = dark ? "rgba(244,240,232,0.52)" : "rgba(21,18,14,0.5)"
    const line = dark ? "rgba(244,240,232,0.16)" : "rgba(21,18,14,0.14)"
    const accent = "#b08456"

    const rootStyle = {
        "--ds-bg": bg,
        "--ds-ink": ink,
        "--ds-muted": muted,
        "--ds-line": line,
        "--ds-accent": accent,
        background: "var(--ds-bg)",
        color: "var(--ds-ink)",
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        transition: "background-color 0.6s ease, color 0.6s ease",
    } as React.CSSProperties

    const Toggle = () => (
        <button onClick={() => setDark((d) => !d)} aria-label="Toggle light or dark" className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shrink-0 transition-colors" style={{ border: "1px solid var(--ds-line)", color: "var(--ds-ink)" }}>
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    )

    return (
        <div className="relative rounded-xl overflow-hidden" style={rootStyle}>
            {/* NAV */}
            <div className="flex items-center justify-between px-5 md:px-10 py-5" style={{ borderBottom: "1px solid var(--ds-line)" }}>
                <span className="text-sm md:text-base font-bold tracking-[0.16em]">DELPRADO</span>
                <div className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.04em]" style={{ color: "var(--ds-muted)" }}>
                    <span>Work</span><span>Studio</span><span>Materials</span>
                </div>
                <div className="flex items-center gap-4 md:gap-5">
                    <span className="hidden sm:inline text-[12px]" style={{ color: "var(--ds-muted)" }}>hello@delpradostudio.com</span>
                    <Toggle />
                </div>
            </div>

            {/* HERO — oversized wordmark with cursor parallax */}
            <div className="relative px-5 md:px-10 pt-12 md:pt-16 pb-10 overflow-hidden" onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>
                <motion.h2
                    aria-label="Delprado"
                    className="font-bold leading-[0.82] tracking-[-0.04em] select-none whitespace-nowrap"
                    style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)", x: sx, y: sy }}
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                >
                    DELPRADO
                </motion.h2>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
                    <div className="text-[13px] md:text-sm leading-[1.7]" style={{ color: "var(--ds-muted)" }}>
                        Bespoke furniture<br />Cabinetry &amp; millwork<br />Made in Victoria, BC
                    </div>
                    <p className="text-[15px] md:text-lg max-w-sm leading-snug" style={{ color: "var(--ds-ink)" }}>
                        One of a kind, every time — designed for the room it will live in.
                    </p>
                </div>
            </div>

            {/* MARQUEE */}
            <div className="relative overflow-hidden py-4" style={{ borderTop: "1px solid var(--ds-line)", borderBottom: "1px solid var(--ds-line)" }}>
                <motion.div className="flex whitespace-nowrap" animate={reduce ? undefined : { x: ["0%", "-50%"] }} transition={{ duration: 24, ease: "linear", repeat: Infinity }}>
                    {[0, 1].map((half) => (
                        <div key={half} className="flex items-center shrink-0">
                            {MARQUEE.map((word, i) => (
                                <span key={i} className="flex items-center text-2xl md:text-4xl">
                                    <span className="px-6 md:px-8">{word}</span>
                                    <span style={{ color: "var(--ds-accent)" }}>✦</span>
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* WORK — asymmetric editorial gallery */}
            <div className="px-5 md:px-10 py-14 md:py-24">
                <div className="flex items-baseline justify-between mb-12">
                    <span className="text-[12px] tracking-[0.22em]" style={{ color: "var(--ds-muted)" }}>SELECTED WORK</span>
                    <span className="text-[12px] tracking-[0.22em] inline-flex items-center gap-1.5" style={{ color: "var(--ds-muted)" }}>ALL PROJECTS <ArrowUpRight className="w-3.5 h-3.5" /></span>
                </div>
                <div className="grid grid-cols-12 gap-x-5 md:gap-x-6 gap-y-16 md:gap-y-24">
                    {WORKS.map((w) => <Figure key={w.n} w={w} />)}
                </div>
            </div>

            {/* STATEMENT */}
            <div className="px-5 md:px-10 py-20 md:py-28" style={{ borderTop: "1px solid var(--ds-line)" }}>
                <p className="font-medium leading-[1.04] tracking-[-0.02em]" style={{ fontSize: "clamp(1.9rem, 5vw, 4.75rem)" }}>
                    We don&apos;t make furniture for rooms.<br />
                    <span style={{ color: "var(--ds-muted)" }}>We make it for the people who live in them.</span>
                </p>
            </div>

            {/* FOOTER / contact */}
            <div className="px-5 md:px-10 py-12 flex flex-col md:flex-row md:items-end justify-between gap-8" style={{ borderTop: "1px solid var(--ds-line)" }}>
                <div>
                    <div className="text-[12px] tracking-[0.22em] mb-3" style={{ color: "var(--ds-muted)" }}>START A COMMISSION</div>
                    <span className="font-bold leading-none tracking-[-0.02em] break-all" style={{ fontSize: "clamp(1.6rem, 4.5vw, 3.75rem)" }}>hello@delpradostudio.com</span>
                </div>
                <div className="flex items-center gap-5 shrink-0">
                    <span className="text-[12px]" style={{ color: "var(--ds-muted)" }}>Victoria, BC</span>
                    <Toggle />
                </div>
            </div>
        </div>
    )
}
