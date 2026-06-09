"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import DelpradoSiteMock from "./DelpradoSiteMock"
import {
    Lock,
    KeyRound,
    Shield,
    ArrowRight,
    ArrowUpRight,
    ChevronRight,
    CheckCircle2,
    Send,
    Loader2,
    Sparkles,
    Hammer,
    Compass,
    Gem,
    Filter,
    MapPin,
    Instagram,
    Play,
    Film,
    Camera,
    Calendar,
    Bot,
    Layers,
    LayoutGrid,
    Heart,
    MessageCircle,
    Bookmark,
    Megaphone,
    UserRound,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Access — client-side gate (matches the Adriftwood / Maz pattern;   */
/*  access-code distribution, page is noindex via layout.tsx).         */
/* ------------------------------------------------------------------ */
const PROPOSAL_PASSWORD = "delprado-bespoke"

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */
const fadeUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

/* Trixode hexagon mark (same geometry as the email template). */
function HexMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
                <linearGradient id="dpHex" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
            <polygon points="16,4 24.93,9.5 24.93,22.5 16,28 7.07,22.5 7.07,9.5" fill="none" stroke="url(#dpHex)" strokeWidth="2" />
            <circle cx="16" cy="4" r="1.4" fill="#06b6d4" />
            <circle cx="24.93" cy="9.5" r="1.4" fill="#06b6d4" />
            <circle cx="24.93" cy="22.5" r="1.4" fill="#06b6d4" />
            <circle cx="16" cy="28" r="1.4" fill="#06b6d4" />
            <circle cx="7.07" cy="22.5" r="1.4" fill="#06b6d4" />
            <circle cx="7.07" cy="9.5" r="1.4" fill="#06b6d4" />
            <circle cx="16" cy="16" r="2" fill="#3b82f6" />
        </svg>
    )
}

/* Section eyebrow used across the Trixode chrome. */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-blue-500/70" />
            <span className="font-grotesk text-[11px] uppercase tracking-[0.25em] text-blue-400">{children}</span>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Discovery question model                                           */
/* ------------------------------------------------------------------ */
const QUESTION_GROUPS = [
    {
        num: "01",
        group: "Vision & the work",
        questions: [
            { id: "q1", label: "Which piece are you proudest of — and why?" },
            { id: "q2", label: "In five years, is Delprado bigger — or different? A showroom, a name beyond Victoria, a product line?" },
        ],
    },
    {
        num: "02",
        group: "The customer",
        questions: [
            { id: "q3", label: "Describe the client you want more of — and the one you'd politely turn away." },
            { id: "q4", label: "Why do clients choose you? And when you lose one, why?" },
        ],
    },
    {
        num: "03",
        group: "Brand & perception",
        questions: [
            { id: "q5", label: "If Delprado were a person, how would you want it described?" },
            { id: "q6", label: "What should someone feel in the first five seconds on your site — and never feel?" },
        ],
    },
    {
        num: "04",
        group: "Business & goals",
        questions: [
            { id: "q7", label: "From first contact to deposit — where do people hesitate or go quiet?" },
            { id: "q8", label: "Should the site win the job, or prove you're real after you've met?" },
        ],
    },
    {
        num: "05",
        group: "Voice & audience",
        questions: [
            { id: "q9", label: "Who's the face of Delprado — you, the team, or the work? And how do you feel on camera?" },
            { id: "q10", label: "On Instagram, what would keep people watching — the process, the rooms, or the story?" },
        ],
    },
]

const ALL_QUESTIONS = QUESTION_GROUPS.flatMap((g) => g.questions)

type FormState = Record<string, string>

export default function DelpradoProposalPage() {
    const reduce = useReducedMotion()

    /* ---- gate ---- */
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get("token") === PROPOSAL_PASSWORD) setIsUnlocked(true)
    }, [])

    const handleUnlock = () => {
        if (password === PROPOSAL_PASSWORD) {
            setIsUnlocked(true)
            setError(false)
        } else {
            setError(true)
            setPassword("")
            inputRef.current?.focus()
        }
    }

    /* ---- discovery form ---- */
    const initialForm: FormState = { name: "", email: "", company: "", contactPref: "", ...Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, ""])) }
    const [form, setForm] = useState<FormState>(initialForm)
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const mountedAt = useRef<number>(0)
    useEffect(() => {
        mountedAt.current = Date.now()
    }, [])

    const setField = (id: string, value: string) => setForm((f) => ({ ...f, [id]: value }))

    const submitDiscovery = async (e: React.FormEvent) => {
        e.preventDefault()
        if (status === "submitting") return
        setStatus("submitting")
        try {
            const answers = Object.fromEntries(ALL_QUESTIONS.map((q) => [q.id, { question: q.label, answer: form[q.id] }]))
            const res = await fetch("/api/proposals/delprado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    company: form.company, // honeypot
                    contactPref: form.contactPref,
                    answers,
                    elapsedMs: Date.now() - mountedAt.current,
                }),
            })
            if (!res.ok) throw new Error("request failed")
            setStatus("success")
        } catch {
            setStatus("error")
        }
    }

    /* ================================================================ */
    /*  GATE                                                            */
    /* ================================================================ */
    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center px-6 relative overflow-hidden">
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute w-[600px] h-[600px] -top-32 -left-32 blur-[90px] opacity-30 rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)" }} />
                    <div className="absolute w-[500px] h-[500px] bottom-0 -right-20 blur-[90px] opacity-25 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)" }} />
                </div>
                <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "70px 70px" }} />

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 w-full max-w-md text-center">
                    <div className="glass p-12 rounded-3xl">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <HexMark size={26} />
                            <span className="font-grotesk text-sm tracking-[0.18em] text-white/80">TRIXODE&nbsp;STUDIOS</span>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-7">
                            <Lock className="w-7 h-7 text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-light font-grotesk mb-2">Private Proposal</h1>
                        <p className="text-sm text-white/40 mb-8">Prepared exclusively for Delprado Studio. Please enter the access code from your email.</p>
                        <form onSubmit={(e) => { e.preventDefault(); handleUnlock() }} className="space-y-4">
                            <input
                                ref={inputRef}
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false) }}
                                placeholder="Enter access code"
                                autoFocus
                                className={`w-full px-5 py-4 rounded-xl bg-white/[0.04] border text-white placeholder-white/25 text-center text-sm tracking-[0.2em] outline-none transition-all duration-300 ${error ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/10 focus:border-blue-500/50"}`}
                            />
                            <AnimatePresence>
                                {error && (
                                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-red-400">
                                        Incorrect access code. Please try again.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <button type="submit" className="w-full px-5 py-4 rounded-xl bg-blue-500 text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-blue-400 transition-colors duration-300 flex items-center justify-center gap-3 cursor-pointer">
                                <KeyRound className="w-4 h-4" />
                                <span>Unlock Proposal</span>
                            </button>
                        </form>
                    </div>
                    <p className="text-[11px] text-white/20 mt-8">© 2026 Trixode-Studios Inc. · Confidential</p>
                </motion.div>
            </div>
        )
    }

    /* ================================================================ */
    /*  PROPOSAL                                                        */
    /* ================================================================ */
    return (
        <div className="min-h-screen bg-[#030712] text-white overflow-hidden selection:bg-blue-500/30">
            {/* Background aurora + grid (Trixode chrome) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute w-[680px] h-[680px] -top-40 -left-40 blur-[110px] opacity-25 rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)" }} />
                <div className="absolute w-[520px] h-[520px] top-1/3 -right-24 blur-[110px] opacity-20 rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)" }} />
                <div className="absolute w-[460px] h-[460px] bottom-0 left-1/4 blur-[110px] opacity-15 rounded-full" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)" }} />
            </div>
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "90px 90px" }} />

            {/* Fixed brand wordmark */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
                <HexMark size={24} />
                <span className="font-grotesk text-[12px] tracking-[0.18em] text-white/70 hidden sm:inline">TRIXODE&nbsp;STUDIOS</span>
            </div>

            {/* ===== HERO ===== */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 pt-28 pb-24">
                <div className="max-w-5xl w-full mx-auto text-center">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }} className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.03] rounded-full mb-10 backdrop-blur-sm">
                        <Shield className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-grotesk text-[11px] uppercase tracking-[0.22em] text-white/50">Confidential — Prepared for Delprado Studio</span>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center justify-center mb-8">
                        <Eyebrow>Brand · Content · Web — Concept Proposal</Eyebrow>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.45 }} className="font-grotesk font-light leading-[0.98] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
                        <span className="block">The work is one of a kind.</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400">The website should be too.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }} className="text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light text-white/55">
                        You build furniture nobody else can build. Your website should say so. A private look at how we'd give the work a brand, a site, and an Instagram presence worthy of it.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.95 }} className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                        {[
                            { v: "June 2026", l: "Prepared" },
                            { v: "Delprado Studio", l: "For" },
                            { v: "Trixode Studios", l: "By" },
                        ].map((s) => (
                            <div key={s.l} className="glass rounded-2xl p-4">
                                <div className="font-grotesk text-sm md:text-base text-blue-400 font-light">{s.v}</div>
                                <div className="text-[10px] uppercase tracking-[0.18em] text-white/35 mt-1">{s.l}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-16">
                        <motion.div animate={reduce ? undefined : { y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">Scroll</span>
                            <ChevronRight className="w-4 h-4 rotate-90 text-white/25" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ===== 01 · THE GAP ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-16 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">01</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">The gap, plainly</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-light text-white/55">
                        Your hardest problem isn't getting customers — it's getting the <span className="text-white">wrong</span> ones, chasing custom quality at big-box prices. A site as considered as your work screens them out. The people who reach out already expect to pay for bespoke.
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { icon: <Hammer className="w-6 h-6" />, t: "Craft recognizes craft", d: "We sweat pixels and type the way you sweat joinery and finish. This proposal is the proof." },
                            { icon: <MapPin className="w-6 h-6" />, t: "Local materials, local hands", d: "Bespoke, made in Victoria with local materials — a premium story your competitors can't tell. We're a Victoria studio too." },
                            { icon: <Compass className="w-6 h-6" />, t: "Strategy before pixels", d: "The goal isn't a prettier website. It's the right clients, at higher margins." },
                        ].map((c, i) => (
                            <motion.div key={c.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="glass rounded-3xl p-9 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">{c.icon}</div>
                                <h3 className="font-grotesk text-xl font-normal mb-3">{c.t}</h3>
                                <p className="text-sm leading-relaxed text-white/50">{c.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 02 · DISCOVERY ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-12 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">02</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Before we design, we ask</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg max-w-2xl mb-14 leading-relaxed font-light text-white/55">
                        The best furniture starts with listening. So does the best brand. Answer what resonates — the clearer your vision, the sharper what we build.
                    </motion.p>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="font-grotesk text-2xl font-light mb-3">Thank you — I've got it.</h3>
                                <p className="text-white/55 max-w-md mx-auto leading-relaxed">Your answers come straight to me. I'll read every word and come back with a direction built around your vision. Keep scrolling — there's a first concept below.</p>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={submitDiscovery} initial={{ opacity: 1 }} className="space-y-12">
                                {/* identity */}
                                <div className="glass rounded-3xl p-7 md:p-9 grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">Your name</label>
                                        <input value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Who's answering?" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-sm outline-none focus:border-blue-500/50 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] uppercase tracking-[0.18em] text-white/40 mb-2">Email</label>
                                        <input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="So we can reply" className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/25 text-sm outline-none focus:border-blue-500/50 transition-colors" />
                                    </div>
                                    {/* honeypot — visually hidden, only bots fill it */}
                                    <div className="hidden" aria-hidden>
                                        <label>Company (leave blank)<input tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => setField("company", e.target.value)} /></label>
                                    </div>
                                </div>

                                {/* question groups */}
                                {QUESTION_GROUPS.map((g) => (
                                    <motion.div key={g.num} {...fadeUp} className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="font-grotesk text-xs text-blue-400">{g.num}</span>
                                            <span className="w-6 h-px bg-blue-500/40" />
                                            <span className="font-grotesk text-sm uppercase tracking-[0.2em] text-white/60">{g.group}</span>
                                        </div>
                                        {g.questions.map((q) => (
                                            <div key={q.id} className="glass rounded-2xl p-6">
                                                <label className="block text-[15px] leading-relaxed text-white/85 mb-4">{q.label}</label>
                                                <textarea
                                                    value={form[q.id]}
                                                    onChange={(e) => setField(q.id, e.target.value)}
                                                    rows={3}
                                                    placeholder="Type as much or as little as you like…"
                                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 text-sm leading-relaxed outline-none focus:border-blue-500/50 transition-colors resize-y"
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                ))}

                                {/* submit */}
                                <div className="flex flex-col items-center gap-4 pt-2">
                                    {status === "error" && (
                                        <p className="text-sm text-red-400 text-center">
                                            Something went wrong sending that. You can also email us directly at{" "}
                                            <a href="mailto:contact@trixode-studios.com" className="underline text-blue-400">contact@trixode-studios.com</a>.
                                        </p>
                                    )}
                                    <button type="submit" disabled={status === "submitting"} className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500 text-white text-sm uppercase tracking-[0.18em] font-medium hover:bg-blue-400 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
                                        {status === "submitting" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        <span>{status === "submitting" ? "Sending…" : "Send my answers"}</span>
                                    </button>
                                    <p className="text-[12px] text-white/30">No pressure to fill every field — even two or three answers help.</p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* ===== 03 · WHY BRAND, STRATEGY & VISION ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-14 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">03</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Why brand, strategy & vision matter</h2>
                    </motion.div>

                    <motion.div {...fadeUp} className="glass rounded-3xl p-9 md:p-12 mb-12 max-w-4xl">
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-white/75">
                            You'd never deliver a piece with a raw, unfinished surface. <span className="text-blue-400">Your brand is the finish on your business</span> — what lets a stranger see the quality before they've touched it.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {[
                            { icon: <Gem className="w-6 h-6" />, t: "It lets you charge what the work is worth", d: "Same cabinet, two makers. The one with the considered brand charges 30–40% more — and the client feels good paying it. Brand is the only lever that raises price without changing the work." },
                            { icon: <Filter className="w-6 h-6" />, t: "It attracts the right clients", d: "A generic site draws price-shoppers. A crafted one screens them out — by the time someone calls, they expect bespoke." },
                            { icon: <Sparkles className="w-6 h-6" />, t: "It makes you remembered", d: "A brand kit gives people the words and the look to describe you to a friend. Referrals need something to hold onto." },
                            { icon: <Compass className="w-6 h-6" />, t: "Vision tells us what to build", d: "A local studio and a regional name are two different sites. We decide which first — so we don't build for the wrong future." },
                        ].map((c, i) => (
                            <motion.div key={c.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }} className="glass rounded-3xl p-9 hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">{c.icon}</div>
                                <h3 className="font-grotesk text-xl font-normal mb-3">{c.t}</h3>
                                <p className="text-sm leading-relaxed text-white/50">{c.d}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p {...fadeUp} className="text-center text-white/45 text-sm mt-12 max-w-2xl mx-auto">
                        Brand, strategy and vision are the blueprint. The website is the build.
                    </motion.p>
                </div>
            </section>

            {/* ===== 04 · CONCEPT PREVIEW (the WOW) ===== */}
            <section className="relative z-10 px-4 md:px-12 py-28 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">04</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">A first look at what's possible</h2>
                    </motion.div>

                    <motion.div {...fadeUp} className="mb-8 max-w-3xl">
                        <Eyebrow>Concept Preview</Eyebrow>
                        <p className="text-white/55 leading-relaxed mt-4">
                            A first direction, not a final answer. The photographs are <span className="text-white">your own pieces</span>, simply given room to breathe — the real thing, we'd build with you.
                        </p>
                    </motion.div>

                    {/* === Browser-chrome frame (Trixode chrome) wrapping the warm canvas === */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="glass rounded-2xl p-2 md:p-3 shadow-2xl">
                        {/* fake browser bar */}
                        <div className="flex items-center gap-3 px-3 py-2.5">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                                <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/45">
                                    <Lock className="w-3 h-3" />
                                    <span className="tracking-wide">delpradostudio.com</span>
                                </div>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.18em] text-blue-400/70 hidden md:inline">Concept</span>
                        </div>

                        {/* ====== CONCEPT SITE — Ulysses de Santi–inspired, light/dark ====== */}
                        <DelpradoSiteMock />
                    </motion.div>

                    {/* annotation back in Trixode chrome */}
                    <motion.div {...fadeUp} className="grid md:grid-cols-3 gap-5 mt-10">
                        {[
                            { t: "Restraint reads as value", d: "Oversized type and stark, gallery-style space signal a maker who charges for craft — and a light/dark toggle to feel both moods." },
                            { t: "Your work is the hero", d: "Every image is a real Delprado piece. The design just gets out of the way." },
                            { t: "The story is front-and-centre", d: "Local materials, local hands, Victoria — what competitors can't copy, felt first." },
                        ].map((c, i) => (
                            <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
                                <h4 className="font-grotesk text-base mb-2">{c.t}</h4>
                                <p className="text-sm leading-relaxed text-white/50">{c.d}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== 05 · INSTAGRAM & THE PUBLIC PERSONA ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">05</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Instagram & the public persona</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg md:text-xl max-w-3xl mb-6 leading-relaxed font-light text-white/55">
                        The website is where people land. Instagram is how they <span className="text-white">find you</span> — and woodworking is what the algorithm loves: the cut, the grain, the reveal.
                    </motion.p>
                    <motion.p {...fadeUp} className="text-lg max-w-3xl mb-14 leading-relaxed font-light text-white/55">
                        The real prize is the <span className="text-white">public persona</span>. Today Delprado is a company. We'd make it a <span className="text-white">name</span> — a maker people follow, and an audience that waits for the next piece.
                    </motion.p>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                        {/* ---- phone IG mock ---- */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
                            <div className="mb-5"><Eyebrow>Concept Preview · @delpradostudio</Eyebrow></div>
                            <div className="relative w-full max-w-[310px] rounded-[44px] border border-white/12 bg-[#0a0f1c] p-2.5 shadow-2xl">
                                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-20" />
                                {/* IG screen — neutral Instagram UI, contained in the Trixode phone bezel */}
                                <div className="rounded-[34px] overflow-hidden bg-white text-[#262626]">
                                    {/* top bar */}
                                    <div className="flex items-center justify-between px-4 pt-7 pb-3 border-b border-[#dbdbdb]">
                                        <div className="flex items-center gap-1">
                                            <span className="text-[15px] font-semibold text-[#111]">delpradostudio</span>
                                            <ChevronRight className="w-3.5 h-3.5 rotate-90 text-[#111]" />
                                        </div>
                                        <span className="text-[8px] uppercase tracking-[0.15em] text-[#8e8e8e] border border-[#dbdbdb] rounded-full px-2 py-0.5">Concept</span>
                                    </div>
                                    {/* profile */}
                                    <div className="px-4 py-4 flex items-center gap-5">
                                        <div className="w-[68px] h-[68px] rounded-full p-[2px]" style={{ background: "linear-gradient(45deg,#b08456,#e7b97a,#8a6240)" }}>
                                            <div className="w-full h-full rounded-full bg-[#f4ece0] flex items-center justify-center overflow-hidden border-2 border-white">
                                                <img src="/pitch/delprado/dp-logo-black.png" alt="Delprado" className="w-[80%] object-contain" />
                                            </div>
                                        </div>
                                        <div className="flex-1 grid grid-cols-3 text-center">
                                            {[["84", "posts"], ["6,240", "followers"], ["180", "following"]].map(([n, l]) => (
                                                <div key={l}>
                                                    <div className="text-[15px] font-semibold text-[#111]">{n}</div>
                                                    <div className="text-[11px] text-[#262626]">{l}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* bio */}
                                    <div className="px-4 pb-3">
                                        <div className="text-[13px] font-semibold text-[#111]">Delprado Studio</div>
                                        <div className="text-[12px] leading-snug text-[#262626]">Bespoke furniture · cabinetry · millwork</div>
                                        <div className="text-[12px] leading-snug text-[#262626]">Made in Victoria, BC — local materials, local hands.</div>
                                        <div className="text-[12px] text-[#00376b] font-medium mt-0.5">delpradostudio.com</div>
                                    </div>
                                    {/* highlights */}
                                    <div className="px-4 pb-3 flex gap-4">
                                        {[{ i: <Film className="w-4 h-4" />, l: "Process" }, { i: <Sparkles className="w-4 h-4" />, l: "Reveals" }, { i: <Hammer className="w-4 h-4" />, l: "Studio" }, { i: <Layers className="w-4 h-4" />, l: "Wood" }].map((h) => (
                                            <div key={h.l} className="flex flex-col items-center gap-1">
                                                <div className="w-12 h-12 rounded-full border border-[#dbdbdb] flex items-center justify-center text-[#3a2f27]">{h.i}</div>
                                                <span className="text-[10px] text-[#262626]">{h.l}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* tab row */}
                                    <div className="flex border-t border-[#dbdbdb]">
                                        <div className="flex-1 flex justify-center py-2 border-t-2 border-[#111]"><LayoutGrid className="w-4 h-4 text-[#111]" /></div>
                                        <div className="flex-1 flex justify-center py-2"><Play className="w-4 h-4 text-[#8e8e8e]" /></div>
                                        <div className="flex-1 flex justify-center py-2"><UserRound className="w-4 h-4 text-[#8e8e8e]" /></div>
                                    </div>
                                    {/* grid */}
                                    <div className="grid grid-cols-3 gap-[2px] bg-[#dbdbdb]">
                                        {[
                                            { type: "reel", hook: "Rough oak → finished table", img: "/pitch/delprado/dp-millwork-lynburne.jpg" },
                                            { type: "photo", img: "/pitch/delprado/dp-furniture.png" },
                                            { type: "carousel", hook: "Why we source local" },
                                            { type: "photo", img: "/pitch/delprado/dp-closets.png" },
                                            { type: "reel", hook: "60-sec shop tour" },
                                            { type: "photo", img: "/pitch/delprado/dp-millwork-lynburne.jpg", pos: "center 30%" },
                                            { type: "persona", hook: "Meet the maker" },
                                            { type: "photo", img: "/pitch/delprado/dp-furniture.png", pos: "center 70%" },
                                            { type: "reel", hook: "The detail nobody notices" },
                                        ].map((cell, i) => (
                                            <div key={i} className="relative bg-white" style={{ aspectRatio: "1 / 1" }}>
                                                {cell.img ? (
                                                    <img src={cell.img} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: cell.pos || "center" }} />
                                                ) : (
                                                    <div className="absolute inset-0 flex flex-col justify-between p-2" style={{ background: cell.type === "persona" ? "linear-gradient(150deg,#2b2420,#1a1512)" : "linear-gradient(150deg,#8a6240,#b08456)" }}>
                                                        <div className="flex justify-end">
                                                            {cell.type === "carousel" ? <Layers className="w-3 h-3 text-white/90" /> : cell.type === "persona" ? <UserRound className="w-3 h-3 text-white/90" /> : null}
                                                        </div>
                                                        <span className="text-[9px] leading-tight text-white/95 font-medium" style={{ fontFamily: "var(--font-inter), sans-serif" }}>{cell.hook}</span>
                                                    </div>
                                                )}
                                                {cell.type === "reel" && cell.img && (
                                                    <div className="absolute top-1 right-1"><Play className="w-3 h-3 text-white drop-shadow" /></div>
                                                )}
                                                {cell.type === "reel" && !cell.img && (
                                                    <div className="absolute top-1 right-1"><Play className="w-3 h-3 text-white" /></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {/* faux engagement footer */}
                                    <div className="flex items-center gap-4 px-4 py-3 border-t border-[#dbdbdb] text-[#262626]">
                                        <Heart className="w-5 h-5" /><MessageCircle className="w-5 h-5" /><Send className="w-5 h-5" />
                                        <Bookmark className="w-5 h-5 ml-auto" />
                                    </div>
                                </div>
                            </div>
                            <p className="text-[12px] text-white/30 mt-4 text-center max-w-[280px]">Concept feed — your real pieces plus the kinds of posts we'd produce. Numbers are illustrative.</p>
                        </motion.div>

                        {/* ---- content pillars + persona ---- */}
                        <div>
                            <motion.h3 {...fadeUp} className="font-grotesk text-2xl font-light mb-6">Five content pillars, on repeat</motion.h3>
                            <div className="space-y-3">
                                {[
                                    { icon: <Film className="w-5 h-5" />, t: "The Process", tag: "Reels", d: "Raw lumber to finished piece — the satisfying, rewatchable content makers go viral on." },
                                    { icon: <Sparkles className="w-5 h-5" />, t: "The Reveal", tag: "Reels", d: "Cinematic unveils — slow pans across grain, the drawer that glides shut." },
                                    { icon: <UserRound className="w-5 h-5" />, t: "The Maker", tag: "Story · Reels", d: "Your hands, your voice, your why. People follow people, not logos." },
                                    { icon: <Layers className="w-5 h-5" />, t: "The Material", tag: "Carousel", d: "Local wood, local trades, real provenance. What big-box can't claim." },
                                    { icon: <Camera className="w-5 h-5" />, t: "In the Home", tag: "Posts", d: "Finished pieces in real Victoria homes. Aspirational, shareable proof." },
                                ].map((p, i) => (
                                    <motion.div key={p.t} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }} className="glass rounded-2xl p-5 flex gap-4">
                                        <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">{p.icon}</div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-grotesk text-base">{p.t}</h4>
                                                <span className="text-[10px] uppercase tracking-[0.15em] text-blue-400/70 border border-blue-500/20 rounded-full px-2 py-0.5">{p.tag}</span>
                                            </div>
                                            <p className="text-sm leading-relaxed text-white/50">{p.d}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div {...fadeUp} className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-6">
                                <div className="flex items-center gap-2 mb-2 text-blue-400"><Megaphone className="w-5 h-5" /><span className="font-grotesk text-sm uppercase tracking-[0.15em]">Building the persona</span></div>
                                <p className="text-sm leading-relaxed text-white/60">
                                    A logo is recognized; a person is followed. We'd put a face and a voice behind Delprado — someone people feel they know, and trust enough to commission.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* ---- the engine ---- */}
                    <motion.div {...fadeUp} className="mt-14 glass rounded-3xl p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div>
                                <h3 className="font-grotesk text-2xl font-light mb-2">A content engine — not a guessing game</h3>
                                <p className="text-sm text-white/50 max-w-xl">A consistent system that compounds month over month.</p>
                            </div>
                            <div className="flex gap-8 shrink-0">
                                <div>
                                    <div className="font-grotesk text-3xl text-blue-400 font-light">12 + 8</div>
                                    <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">Reels + carousels / mo</div>
                                </div>
                                <div>
                                    <div className="font-grotesk text-3xl text-blue-400 font-light">~30<span className="text-lg"> min</span></div>
                                    <div className="text-[11px] uppercase tracking-[0.15em] text-white/40 mt-1">Of your time / mo</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            {[
                                { n: "01", icon: <Camera className="w-5 h-5" />, t: "Capture", d: "We film at the shop — or you send clips and a voice note." },
                                { n: "02", icon: <Bot className="w-5 h-5" />, t: "Produce", d: "We edit, write and design. Our AI-assisted system turns a little input into a month of content — in your voice." },
                                { n: "03", icon: <CheckCircle2 className="w-5 h-5" />, t: "Approve", d: "Review the month and sign off in a tap." },
                                { n: "04", icon: <Megaphone className="w-5 h-5" />, t: "Publish & report", d: "We publish to Instagram & Pinterest, and report what's working." },
                            ].map((s, i) => (
                                <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                                    {i < 3 && <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-white/10" />}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400">{s.icon}</div>
                                        <span className="font-grotesk text-xs text-blue-400">{s.n}</span>
                                    </div>
                                    <h4 className="font-grotesk text-base mb-2">{s.t}</h4>
                                    <p className="text-sm leading-relaxed text-white/50">{s.d}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <span className="text-[11px] uppercase tracking-[0.15em] text-white/35">Built for</span>
                            {["Instagram", "Pinterest", "TikTok-ready", "Google Business"].map((t) => (
                                <span key={t} className="inline-flex items-center gap-1.5 text-xs text-white/60 border border-white/10 rounded-full px-3 py-1.5">
                                    <Instagram className="w-3 h-3 text-blue-400" />{t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== CLOSE ===== */}
            <section className="relative z-10 px-6 md:px-12 pt-20 pb-32">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp} className="flex justify-center mb-8"><HexMark size={34} /></motion.div>
                    <motion.h2 {...fadeUp} className="font-grotesk text-4xl md:text-5xl font-light mb-6">If it resonates, let's talk.</motion.h2>
                    <motion.p {...fadeUp} className="text-lg text-white/55 leading-relaxed mb-12">
                        Answer the questions whenever you have ten quiet minutes — they come straight to me. If the direction feels right, I'd love to build this with you, here in Victoria.
                    </motion.p>

                    <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a href="#top" onClick={(e) => { e.preventDefault(); document.querySelector("form")?.scrollIntoView({ behavior: "smooth" }) }} className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500 text-white text-sm uppercase tracking-[0.18em] font-medium hover:bg-blue-400 transition-colors cursor-pointer">
                            Answer the questions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="mailto:contact@trixode-studios.com?subject=Delprado%20×%20Trixode" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/15 text-white/80 text-sm uppercase tracking-[0.18em] hover:bg-white/[0.04] transition-colors">
                            Email us directly
                        </a>
                    </motion.div>

                    <motion.div {...fadeUp} className="pt-10 border-t border-white/10">
                        <p className="text-white/70">— <span className="text-white font-medium">Hussien Ballouk</span></p>
                        <p className="text-blue-400 text-sm">Founder, Trixode-Studios Inc.</p>
                        <p className="text-white/35 text-xs mt-4 tracking-wide">contact@trixode-studios.com · Victoria, BC</p>
                        <p className="text-white/20 text-[11px] mt-8">© 2026 Trixode-Studios Inc. · Prepared exclusively for Delprado Studio · Please don't share this link publicly.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
