"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import DelpradoSiteMock from "../DelpradoSiteMock"
import {
    Lock,
    KeyRound,
    Shield,
    ArrowRight,
    ArrowDown,
    ChevronRight,
    XCircle,
    AlertTriangle,
    Quote,
    LayoutTemplate,
    ImageOff,
    BookOpen,
    Split,
    UserX,
    Filter,
    Compass,
    Sparkles,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Access — client-side gate (same code as the Delprado proposal;     */
/*  page is noindex via layout.tsx).                                   */
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

/* Trixode hexagon mark (same geometry as the proposal; unique gradient id). */
function HexMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
                <linearGradient id="auditHex" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
            </defs>
            <polygon points="16,4 24.93,9.5 24.93,22.5 16,28 7.07,22.5 7.07,9.5" fill="none" stroke="url(#auditHex)" strokeWidth="2" />
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

/* Reusable browser-chrome frame (Trixode chrome). */
function BrowserFrame({ url, label, children }: { url: string; label?: string; children: React.ReactNode }) {
    return (
        <div className="glass rounded-2xl p-2 md:p-3 shadow-2xl">
            <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/70" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/45">
                        <Lock className="w-3 h-3" />
                        <span className="tracking-wide">{url}</span>
                    </div>
                </div>
                {label ? <span className="text-[10px] uppercase tracking-[0.18em] text-blue-400/70 hidden md:inline">{label}</span> : <span className="w-10 hidden md:inline" />}
            </div>
            {children}
        </div>
    )
}

/* ------------------------------------------------------------------ */
/*  Content models                                                    */
/* ------------------------------------------------------------------ */

/* Felipe's own words — the bar we grade the current site against. */
const CRITERIA = [
    { quote: "They should feel like they found the best and most exclusive website.", label: "On the first five seconds" },
    { quote: "They should never feel like they can buy my products for the price of a cheap big-box store like IKEA.", label: "On what to avoid" },
    { quote: "First win the job — then prove I'm real after we've met.", label: "On the site's job" },
    { quote: "Most of the time, when the quote is presented, they hesitate.", label: "On where deals stall" },
]

/* The seven findings — client-facing framing: what's happening → what it costs. */
const FINDINGS = [
    {
        icon: <LayoutTemplate className="w-6 h-6" />,
        t: "It reads as a contractor, not the most exclusive maker in the city",
        d: "The homepage leads with a generic template and a category headline any cabinet shop could run. Nothing signals “exclusive” — and a generic look quietly signals “negotiable,” which invites the price pushback you mentioned.",
    },
    {
        icon: <ImageOff className="w-6 h-6" />,
        t: "Your work isn't the hero",
        d: "Your value is one-of-a-kind pieces — yet the photography is thin and small, and your proudest project (the five-shop cabinet) isn't told at all. For a craft business, the work should fill the screen and the words should step back.",
    },
    {
        icon: <BookOpen className="w-6 h-6" />,
        t: "There's no story to justify the price",
        d: "You sell the best design solution for a space — design intelligence. The site never shows it: no case studies, no “here was the problem, here's how I solved it.” So the quote arrives cold, at exactly the moment deals go quiet.",
    },
    {
        icon: <Split className="w-6 h-6" />,
        t: "Your brand is split across two websites",
        d: "Two Delprado sites are live at once — delpradostudio.com and an older delprado-custom-furniture.com. That divides your search presence and reads as unmanaged. One brand deserves one home.",
    },
    {
        icon: <UserX className="w-6 h-6" />,
        t: "You're nowhere on it",
        d: "You want to be the face of Delprado — but there's no you on the site. No story, no voice, no maker. People commission people, not an anonymous “studio,” and nothing connects to the process content that would power Instagram.",
    },
    {
        icon: <Filter className="w-6 h-6" />,
        t: "The inquiry doesn't protect your time",
        d: "A single “Request a Consultation” button does nothing to screen the “copy this photo from the internet” client you'd rather decline — and gives the right client no signal they've found something rare.",
    },
    {
        icon: <Compass className="w-6 h-6" />,
        t: "It's technically fine — but almost invisible",
        d: "To be fair: the site loads fast and is well-built. The real issue is reach — there's so little traffic that Google has no data on it. Today the business runs entirely on your word of mouth; the site isn't bringing you anyone new.",
    },
]

/* Scorecard — his goal vs. the current site. */
type Verdict = "fail" | "warn"
const SCORECARD: { goal: string; verdict: Verdict; note: string }[] = [
    { goal: "Feel “best & most exclusive” in five seconds", verdict: "fail", note: "Generic template" },
    { goal: "Never feel “IKEA-priced”", verdict: "fail", note: "Reads negotiable" },
    { goal: "Make the work the hero", verdict: "fail", note: "Thin, small imagery" },
    { goal: "Justify the price before the quote", verdict: "fail", note: "No story or case studies" },
    { goal: "Win the job and prove you're real", verdict: "warn", note: "Weakly, for warm leads only" },
    { goal: "One strong brand", verdict: "fail", note: "Two competing domains" },
    { goal: "You as the face", verdict: "fail", note: "No maker, no persona" },
    { goal: "Qualify and protect your time", verdict: "fail", note: "Generic consult form" },
    { goal: "Be found by new clients", verdict: "fail", note: "No measurable traffic" },
]

export default function DelpradoAuditPage() {
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
                        <h1 className="text-2xl font-light font-grotesk mb-2">Private Website Audit</h1>
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
                                <span>Unlock Audit</span>
                            </button>
                        </form>
                    </div>
                    <p className="text-[11px] text-white/20 mt-8">© 2026 Trixode-Studios Inc. · Confidential</p>
                </motion.div>
            </div>
        )
    }

    /* ================================================================ */
    /*  AUDIT                                                           */
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
                        <span className="font-grotesk text-[11px] uppercase tracking-[0.22em] text-white/50">Confidential — Website Audit for Delprado Studio</span>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-center justify-center mb-8">
                        <Eyebrow>An Honest Look at Your Website</Eyebrow>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.45 }} className="font-grotesk font-light leading-[0.98] tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8">
                        <span className="block">Your work is one of a kind.</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-400">Your website isn't — yet.</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.75 }} className="text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light text-white/55">
                        A friendly, honest audit of your site today — graded against the goals you told us yourself. Not a list of complaints, but a map of the opportunity sitting in plain sight.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.95 }} className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                        {[
                            { v: "Delprado Studio", l: "For" },
                            { v: "June 2026", l: "Prepared" },
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

            {/* ===== 01 · JUDGED BY YOUR OWN WORDS ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-16 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">01</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Judged by your own words</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-light text-white/55">
                        We're not grading your site on our taste. We're holding it to <span className="text-white">the goals you gave us</span>. Here's the bar you set — every finding below is measured against it.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-5">
                        {CRITERIA.map((c, i) => (
                            <motion.div key={c.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }} className="glass rounded-3xl p-8">
                                <Quote className="w-7 h-7 text-blue-400/70 mb-5" />
                                <p className="text-lg leading-relaxed text-white/85 font-light mb-5">“{c.quote}”</p>
                                <div className="text-[11px] uppercase tracking-[0.18em] text-white/35">{c.label} — Felipe, in discovery</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 02 · YOUR CURRENT SITE ===== */}
            <section className="relative z-10 px-4 md:px-12 py-28 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">02</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Your current site, honestly</h2>
                    </motion.div>

                    <motion.div {...fadeUp} className="mb-8 max-w-3xl">
                        <Eyebrow>As it stands today</Eyebrow>
                        <p className="text-white/55 leading-relaxed mt-4">
                            This is your homepage as a new visitor meets it. It's clean and it works — but look at how little of <span className="text-white">your work</span> you actually see, and how quickly the page asks you to read instead of feel.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                        <BrowserFrame url="delpradostudio.com" label="Live today">
                            <div className="rounded-xl overflow-hidden max-h-[560px] overflow-y-auto bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/pitch/delprado/current-site-desktop.png" alt="Delprado Studio current website homepage" className="w-full block" />
                            </div>
                        </BrowserFrame>
                    </motion.div>

                    <motion.div {...fadeUp} className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-6 max-w-3xl">
                        <div className="flex items-center gap-2 mb-2 text-amber-300"><Split className="w-5 h-5" /><span className="font-grotesk text-sm uppercase tracking-[0.15em]">One brand, two front doors</span></div>
                        <p className="text-sm leading-relaxed text-white/60">
                            There are actually two Delprado sites live right now — <span className="text-white">delpradostudio.com</span> and an older <span className="text-white">delprado-custom-furniture.com</span>. Splitting your name across both divides your search presence and quietly works against the premium, meticulous impression your work earns.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== 03 · WHAT'S HOLDING IT BACK ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-14 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">03</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">What's holding it back</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg max-w-3xl mb-16 leading-relaxed font-light text-white/55">
                        Seven things, each tied to something it's quietly costing you — the wrong clients, the price conversation, the leads who never find you.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-5">
                        {FINDINGS.map((c, i) => (
                            <motion.div key={c.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }} className="glass rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">{c.icon}</div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="font-grotesk text-xs text-blue-400/70">{String(i + 1).padStart(2, "0")}</span>
                                            <h3 className="font-grotesk text-lg font-normal leading-snug">{c.t}</h3>
                                        </div>
                                        <p className="text-sm leading-relaxed text-white/50">{c.d}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 04 · SCORECARD ===== */}
            <section className="relative z-10 px-6 md:px-12 py-28 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-14 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">04</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">The scorecard</h2>
                    </motion.div>

                    <motion.p {...fadeUp} className="text-lg max-w-2xl mb-12 leading-relaxed font-light text-white/55">
                        Your goals, lined up against the site as it stands. This is the gap we'd close.
                    </motion.p>

                    <motion.div {...fadeUp} className="glass rounded-3xl overflow-hidden">
                        <div className="hidden sm:grid grid-cols-[1fr_auto] gap-4 px-7 py-4 border-b border-white/10 text-[11px] uppercase tracking-[0.18em] text-white/35">
                            <span>What you want</span>
                            <span>Your site today</span>
                        </div>
                        {SCORECARD.map((row) => (
                            <div key={row.goal} className="grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto] gap-x-4 gap-y-1 items-center px-7 py-4 border-b border-white/5 last:border-0">
                                <span className="order-2 sm:order-1 text-sm text-white/80 col-span-2 sm:col-span-1">{row.goal}</span>
                                <span className="order-1 sm:order-2 inline-flex items-center gap-2 text-[13px] shrink-0">
                                    {row.verdict === "fail" ? (
                                        <><XCircle className="w-4 h-4 text-red-400/80" /><span className="text-white/45">{row.note}</span></>
                                    ) : (
                                        <><AlertTriangle className="w-4 h-4 text-amber-300/80" /><span className="text-white/45">{row.note}</span></>
                                    )}
                                </span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.p {...fadeUp} className="text-center text-white/45 text-sm mt-10 max-w-2xl mx-auto">
                        None of this is about effort — it's about direction. Every one of these is fixable, and most of them with the same redesign.
                    </motion.p>
                </div>
            </section>

            {/* ===== 05 · BEFORE → AFTER ===== */}
            <section className="relative z-10 px-4 md:px-12 py-28">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-8 pb-7 border-b border-white/10">
                        <span className="font-grotesk text-sm text-blue-400">05</span>
                        <h2 className="font-grotesk text-4xl md:text-5xl lg:text-6xl font-light max-w-xl leading-tight">Before, and what's possible</h2>
                    </motion.div>

                    <motion.div {...fadeUp} className="mb-12 max-w-3xl">
                        <Eyebrow>The same business, two impressions</Eyebrow>
                        <p className="text-white/55 leading-relaxed mt-4">
                            Same pieces. Same maker. The only thing that changes is whether the website is working as hard as you do. On the right is a first concept — your own work, simply given room to breathe.
                        </p>
                    </motion.div>

                    {/* BEFORE */}
                    <motion.div {...fadeUp} className="mb-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-grotesk">Before</span>
                            <span className="flex-1 h-px bg-white/10" />
                            <span className="text-[11px] uppercase tracking-[0.18em] text-red-400/70">Today</span>
                        </div>
                        <BrowserFrame url="delpradostudio.com">
                            <div className="rounded-xl overflow-hidden max-h-[360px] overflow-y-auto bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/pitch/delprado/current-site-desktop.png" alt="Delprado Studio current website" className="w-full block" />
                            </div>
                        </BrowserFrame>
                    </motion.div>

                    {/* arrow */}
                    <motion.div {...fadeUp} className="flex justify-center mb-10">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                            <ArrowDown className="w-5 h-5 text-blue-400" />
                        </div>
                    </motion.div>

                    {/* AFTER */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-grotesk">After</span>
                            <span className="flex-1 h-px bg-gradient-to-r from-blue-500/40 to-transparent" />
                            <span className="text-[11px] uppercase tracking-[0.18em] text-blue-400/80 inline-flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Concept</span>
                        </div>
                        <BrowserFrame url="delpradostudio.com" label="Concept">
                            <DelpradoSiteMock />
                        </BrowserFrame>
                        <p className="text-[12px] text-white/30 mt-4 text-center">A first direction, not a final answer — try the light/dark toggle. The full concept lives in your proposal.</p>
                    </motion.div>
                </div>
            </section>

            {/* ===== CLOSE ===== */}
            <section className="relative z-10 px-6 md:px-12 pt-20 pb-32">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp} className="flex justify-center mb-8"><HexMark size={34} /></motion.div>
                    <motion.h2 {...fadeUp} className="font-grotesk text-4xl md:text-5xl font-light mb-6">The gap is the opportunity.</motion.h2>
                    <motion.p {...fadeUp} className="text-lg text-white/55 leading-relaxed mb-12">
                        Everything above is fixable — most of it in one move. If this resonates, the full concept, the plan, and the discovery questions are waiting in your proposal.
                    </motion.p>

                    <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <a href="/pitch/delprado?token=delprado-bespoke" className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-blue-500 text-white text-sm uppercase tracking-[0.18em] font-medium hover:bg-blue-400 transition-colors cursor-pointer">
                            See the full proposal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="mailto:contact@trixode-studios.com?subject=Delprado%20×%20Trixode%20—%20the%20audit" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/15 text-white/80 text-sm uppercase tracking-[0.18em] hover:bg-white/[0.04] transition-colors">
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
