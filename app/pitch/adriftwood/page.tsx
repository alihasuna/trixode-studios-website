"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
    ArrowRight,
    Shield,
    Zap,
    ChevronRight,
    CheckCircle2,
    Search,
    BarChart3,
    Rocket,
    MapPin,
    Clock,
    Users,
    Sun,
    Moon,
    Brain,
    TrendingUp,
    Target,
    LineChart,
    Send,
    Camera,
    Film,
    Palette,
    Calendar,
    FolderOpen,
    Instagram,
    PenTool,
    Repeat,
    Eye,
    Share2,
    MessageSquare,
    Mail,
    BookOpen,
    Globe,
    Pin,
    Megaphone,
    Layers,
    FileText,
    MessagesSquare,
    Newspaper,
    Bot,
    Sparkles,
    Hash,
    LayoutGrid,
    MousePointerClick,
    PieChart,
    Lock,
    KeyRound,
} from "lucide-react"

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
}

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.08 } },
    viewport: { once: true },
}

const staggerChild = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
}

const PROPOSAL_PASSWORD = "Adriftwood2026"

export default function AdriftwoodPitchPage() {
    const [isDark, setIsDark] = useState(true)
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const d = (dark: string, light: string) => isDark ? dark : light
    
    // Auto-unlock via URL token
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        if (params.get("token") === PROPOSAL_PASSWORD) {
            setIsUnlocked(true)
        }
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

    // Password Gate
    if (!isUnlocked) {
        return (
            <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center px-6 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute w-[600px] h-[600px] -top-32 -left-32 blur-[80px] opacity-30 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)" }} />
                    <div className="absolute w-[500px] h-[500px] top-1/4 -right-20 blur-[80px] opacity-25 rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.20) 0%, transparent 70%)" }} />
                </div>
                {/* Grid */}
                <div className="fixed inset-0 pointer-events-none z-0"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md text-center"
                >
                    <div className="glass p-12 rounded-3xl">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-8">
                            <Lock className="w-7 h-7 text-blue-500" />
                        </div>
                        <h1 className="text-2xl font-light font-grotesk mb-2">Protected Document</h1>
                        <p className="text-sm text-white/40 mb-8">
                            This proposal is confidential. Please enter the access code provided by Trixode Studios.
                        </p>
                        <form onSubmit={(e) => { e.preventDefault(); handleUnlock(); }} className="space-y-4">
                            <input
                                ref={inputRef}
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                placeholder="Enter access code"
                                autoFocus
                                className={`w-full px-5 py-4 rounded-xl bg-white/[0.04] border text-white placeholder-white/20 text-center text-sm tracking-widest outline-none transition-all duration-300 ${
                                    error ? "border-red-500/50 bg-red-500/[0.04]" : "border-white/10 focus:border-blue-500/40"
                                }`}
                            />
                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-xs text-red-400"
                                    >
                                        Incorrect access code. Please try again.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                            <button
                                type="submit"
                                className="w-full px-5 py-4 rounded-xl bg-blue-500 text-white text-sm uppercase tracking-widest font-medium hover:bg-blue-400 transition-colors duration-300 flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <KeyRound className="w-4 h-4" />
                                <span>Unlock Proposal</span>
                            </button>
                        </form>
                    </div>
                    <p className="text-[11px] text-white/15 mt-8">
                        © 2026 Trixode Studios · Prepared exclusively for Adriftwood Co.
                    </p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className={`min-h-screen overflow-hidden transition-colors duration-700 ${d("bg-[#030303] text-white", "bg-[#fafbfc] text-slate-900")}`}>
            {/* Theme Toggle */}
            <motion.button
                onClick={() => setIsDark(!isDark)}
                className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-500 cursor-pointer ${d(
                    "bg-white/[0.06] border-white/10 hover:bg-white/10 text-white/70 hover:text-white",
                    "bg-black/[0.04] border-slate-200 hover:bg-black/[0.08] text-slate-500 hover:text-slate-800 shadow-sm"
                )}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <Sun className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                            <Moon className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-700">
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[600px] h-[600px] -top-32 -left-32 blur-[80px] opacity-30", "w-[700px] h-[700px] -top-40 -left-40 blur-[120px] opacity-40")}`}
                    style={{ background: `radial-gradient(circle, rgba(59, 130, 246, ${d("0.35", "0.15")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[500px] h-[500px] top-1/4 -right-20 blur-[80px] opacity-25", "w-[600px] h-[600px] top-1/4 -right-24 blur-[120px] opacity-30")}`}
                    style={{ background: `radial-gradient(circle, rgba(139, 92, 246, ${d("0.20", "0.10")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[400px] h-[400px] bottom-1/4 left-1/4 blur-[80px] opacity-20", "w-[500px] h-[500px] bottom-1/4 left-1/4 blur-[120px] opacity-25")}`}
                    style={{ background: `radial-gradient(circle, rgba(59, 130, 246, ${d("0.20", "0.08")}) 0%, transparent 70%)` }}
                />
            </div>

            {/* Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: d(
                        "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
                        "linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)"
                    ),
                    backgroundSize: "100px 100px",
                }}
            />

            {/* === HERO === */}
            <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-20 pb-20 z-10">
                <div className="max-w-6xl w-full mx-auto text-center">
                    {/* Confidential Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-12 backdrop-blur-sm transition-colors duration-700 ${d("border-white/10 bg-white/[0.03]", "border-slate-200/80 bg-white/60")}`}
                    >
                        <Shield className="w-3.5 h-3.5 text-blue-500" />
                        <span className={`text-[11px] uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/50", "text-slate-400")}`}>
                            Confidential — Prepared for Adriftwood Co.
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-10 h-[1px] bg-blue-500" style={{ boxShadow: d("0 0 10px rgba(59, 130, 246, 0.4)", "none") }} />
                            <span className={`text-xs uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>
                                Digital Marketing & Content Strategy Proposal
                            </span>
                            <div className="w-10 h-[1px] bg-blue-500" style={{ boxShadow: d("0 0 10px rgba(59, 130, 246, 0.4)", "none") }} />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight font-grotesk mb-8"
                    >
                        <span className="block">Growing</span>
                        <span className={`block bg-clip-text text-transparent ${d("bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700", "bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700")}`}>
                            Adriftwood
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className={`text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}
                    >
                        A content engine, SEO strategy, and AI-powered distribution system
                        designed to turn handcrafted excellence into a nationally recognized brand.
                    </motion.p>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
                    >
                        {[
                            { value: "April 2026", label: "Prepared" },
                            { value: "Adriftwood Co.", label: "For" },
                            { value: "Trixode Studios", label: "By" },
                        ].map((stat) => (
                            <div key={stat.label} className={`p-4 rounded-2xl text-center backdrop-blur-sm border transition-colors duration-700 ${d("glass", "bg-white/80 border-slate-200/80 shadow-sm")}`}>
                                <div className="text-sm md:text-base font-light text-blue-500 font-grotesk">{stat.value}</div>
                                <div className={`text-[10px] uppercase tracking-widest mt-1 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-20">
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
                            <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${d("text-white/20", "text-slate-300")}`}>Scroll to explore</span>
                            <ChevronRight className={`w-4 h-4 rotate-90 transition-colors duration-700 ${d("text-white/20", "text-slate-300")}`} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 2: THE OPPORTUNITY === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">01</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            The Opportunity
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        72% of millennials discover new brands through social media. Adriftwood has the product, the story,
                        and the craftsmanship — but the world doesn&apos;t know yet.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {[
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: "Handcrafted Is Trending",
                                desc: "The \"Buy Local\" movement has evolved into a $600B+ global market preference. Consumers actively seek maker-direct brands over mass-produced alternatives — especially in furniture where quality is felt daily.",
                            },
                            {
                                icon: <Instagram className="w-6 h-6" />,
                                title: "Social-First Discovery",
                                desc: "Instagram Reels and Pinterest are the #1 discovery channels for home furnishing. Woodworking content averages 3x higher engagement than other categories — people are fascinated by the craft.",
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "The Story Is Underutilized",
                                desc: "Father-and-son, tree-planting heritage, rescued Vancouver Island wood, zero-VOC finishes — Adriftwood's story is extraordinary but currently lives only on the website. Social media turns stories into movements.",
                            },
                            {
                                icon: <MapPin className="w-6 h-6" />,
                                title: "Victoria's Maker Economy",
                                desc: "Victoria is becoming known for artisan brands. Local SEO and GEO-targeted content can position Adriftwood as the premier furniture maker on the Island — capturing searches before big-box competitors.",
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`p-10 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 transition-colors ${d("bg-blue-500/10 group-hover:bg-blue-500/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                    {card.icon}
                                </div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{card.title}</h4>
                                <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Core Statement */}
                    <motion.div
                        {...fadeUp}
                        className={`p-12 rounded-3xl text-center max-w-4xl mx-auto ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                    >
                        <Brain className="w-10 h-10 text-blue-500 mx-auto mb-6" />
                        <p className={`text-lg md:text-xl leading-relaxed font-light transition-colors duration-700 ${d("text-white/60", "text-slate-600")}`}>
                            Adriftwood has <span className="text-blue-500 font-medium">a product people fall in love with</span>, a founder story
                            that resonates, and sustainability credentials that matter — but without a consistent content engine,
                            <span className="text-blue-500 font-medium"> the best-kept secret on Vancouver Island stays a secret</span>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 3: SOCIAL CONTENT ENGINE === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/30 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">02</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Content Engine
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        A systematic, high-quality content machine — 12 reels and 8 carousels per month — designed to
                        stop the scroll, build community, and drive sales.
                    </motion.p>

                    {/* Reels Section */}
                    <motion.div {...fadeUp} className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Film className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl md:text-3xl font-light font-grotesk">Instagram Reels</h3>
                            <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ml-2 ${d("text-blue-500/60 border-blue-500/10", "text-blue-600/70 border-blue-200")}`}>
                                12/month · 3/week
                            </span>
                        </div>

                        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-[1px] transition-colors duration-700 ${d("bg-white/[0.06]", "bg-slate-200/60")}`}>
                            {[
                                {
                                    num: "01",
                                    title: "Workshop Process",
                                    desc: "Raw lumber to finished piece — satisfying ASMR cuts, sanding, joinery close-ups. The \"stop-the-scroll\" hook starts with the finished product.",
                                    hook: "\"This bed took 40 hours to build\"",
                                    frequency: "3–4/month",
                                },
                                {
                                    num: "02",
                                    title: "Product Reveals",
                                    desc: "Cinematic unveils of finished beds, tables, and sculptures. Dramatic lighting, slow pans across wood grain, the moment hardware clicks.",
                                    hook: "\"$6,999 live walnut king bed — worth it?\"",
                                    frequency: "2–3/month",
                                },
                                {
                                    num: "03",
                                    title: "Founder Stories",
                                    desc: "Jake and Tim sharing their journey — tree planting origins, philosophy on wood, what \"adrift\" means. Vulnerability builds loyal community.",
                                    hook: "\"My dad planted 750 million trees...\"",
                                    frequency: "2–3/month",
                                },
                                {
                                    num: "04",
                                    title: "Education & Value",
                                    desc: "Sleep science, zero-VOC benefits, \"standard vs. custom\" comparisons, wood sourcing stories. Save-worthy content that positions authority.",
                                    hook: "\"Stop buying beds with toxic finishes\"",
                                    frequency: "2–3/month",
                                },
                            ].map((reel, index) => (
                                <motion.div
                                    key={reel.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className={`group p-8 relative overflow-hidden cursor-default transition-all duration-400 ${d("bg-white/[0.02] hover:bg-white/[0.04]", "bg-white/80 hover:bg-white")}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs text-blue-500 font-medium font-grotesk">{reel.num}</span>
                                            <span className={`text-[10px] uppercase tracking-widest ${d("text-white/20", "text-slate-400")}`}>{reel.frequency}</span>
                                        </div>
                                        <h4 className="text-base mb-2 font-normal">{reel.title}</h4>
                                        <p className={`text-sm leading-relaxed mb-4 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{reel.desc}</p>
                                        <div className={`p-3 rounded-lg text-xs italic ${d("bg-blue-500/[0.05] border border-blue-500/10 text-blue-500/70", "bg-blue-50 border border-blue-100 text-blue-600/80")}`}>
                                            Hook: {reel.hook}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Carousels Section */}
                    <motion.div {...fadeUp}>
                        <div className="flex items-center gap-3 mb-8">
                            <LayoutGrid className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl md:text-3xl font-light font-grotesk">Carousels</h3>
                            <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ml-2 ${d("text-blue-500/60 border-blue-500/10", "text-blue-600/70 border-blue-200")}`}>
                                8/month · 2/week · Instagram + Pinterest
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: "Product Features",
                                    desc: "Deep-dive into each bed frame — materials, dimensions, finishes, why the 5.5\" slats matter. Swipeable product education.",
                                    icon: <Layers className="w-5 h-5" />,
                                    platform: "IG + Pinterest",
                                },
                                {
                                    title: "Sleep Science",
                                    desc: "Research-backed facts about sleep quality, VOC exposure, and how your bed frame impacts health. Save-worthy authority content.",
                                    icon: <Brain className="w-5 h-5" />,
                                    platform: "IG + Pinterest",
                                },
                                {
                                    title: "Buy Canadian Series",
                                    desc: "Spotlight on local materials, Vancouver Island sourcing, the environmental impact of choosing Canadian-made over imported.",
                                    icon: <MapPin className="w-5 h-5" />,
                                    platform: "IG + Pinterest",
                                },
                                {
                                    title: "Behind the Grain",
                                    desc: "The story behind each wood type — rescued cedar origins, birch characteristics, walnut live-edge selection. Educational and beautiful.",
                                    icon: <BookOpen className="w-5 h-5" />,
                                    platform: "IG + Pinterest",
                                },
                            ].map((carousel, index) => (
                                <motion.div
                                    key={carousel.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className={`p-8 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-blue-500 transition-colors ${d("bg-blue-500/10 group-hover:bg-blue-500/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                            {carousel.icon}
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 border rounded-full ${d("text-blue-500/60 border-blue-500/10", "text-blue-600/70 border-blue-200")}`}>
                                            {carousel.platform}
                                        </span>
                                    </div>
                                    <h4 className="text-base mb-2 font-normal font-grotesk">{carousel.title}</h4>
                                    <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{carousel.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Inspiration */}
                    <motion.div {...fadeUp} className="mt-16">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl md:text-3xl font-light font-grotesk">Viral Content Playbook</h3>
                        </div>
                        <p className={`text-sm mb-8 max-w-3xl leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                            How we identify high-performing content: we monitor trending audio, analyze competitor engagement patterns,
                            and apply proven hooks from the woodworking/furniture niche. Here&apos;s the framework:
                        </p>
                        <div className={`grid md:grid-cols-3 gap-[1px] ${d("bg-white/[0.06]", "bg-slate-200/60")}`}>
                            {[
                                {
                                    title: "The Satisfying Process",
                                    desc: "Woodworking is ASMR gold. Crisp planing sounds, perfect joinery reveals, finish applications. These consistently hit 100K+ views because they're endlessly rewatchable.",
                                    metric: "Avg. 3x higher engagement",
                                },
                                {
                                    title: "Transformation Hooks",
                                    desc: "\"Rough lumber → $7,000 bed\" — Before/after content drives saves and shares. Start with the finished product (hook), then show the journey (retention).",
                                    metric: "Highest save rate",
                                },
                                {
                                    title: "Controversial Authority",
                                    desc: "\"Stop buying beds with toxic finishes\" or \"Why your $200 bed frame is ruining your sleep\" — bold statements drive comments, which drive algorithm reach.",
                                    metric: "Highest comment rate",
                                },
                                {
                                    title: "Founder Vulnerability",
                                    desc: "People follow people, not brands. Jake's tree planting backstory, Tim's 750M trees — personal narratives build community loyalty unlike anything else.",
                                    metric: "Highest follower conversion",
                                },
                                {
                                    title: "Trending Audio Surfing",
                                    desc: "We monitor the Reels tab weekly for rising audio (5K–20K uses = sweet spot). Pair trending sounds with woodworking visuals to ride the algorithm wave.",
                                    metric: "Algorithm boost",
                                },
                                {
                                    title: "Save-Worthy Education",
                                    desc: "\"5 signs your bed frame is too weak\" or \"The VOC guide\" — educational content earns saves, which Instagram weights higher than likes in 2026.",
                                    metric: "Saves > likes in algorithm",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.06 }}
                                    className={`p-8 cursor-default transition-all duration-400 ${d("bg-white/[0.02] hover:bg-white/[0.04]", "bg-white/80 hover:bg-white")}`}
                                >
                                    <h4 className="text-base mb-2 font-normal">{item.title}</h4>
                                    <p className={`text-sm leading-relaxed mb-3 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{item.desc}</p>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-blue-500" />
                                        <span className={`text-[11px] text-blue-500/70 font-medium`}>{item.metric}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 4: WORKFLOW & TOOLS === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">03</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Workflow & Tools
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        A transparent, structured pipeline so you always know what&apos;s coming, what&apos;s in progress, and what&apos;s live.
                        No surprises, no missed deadlines.
                    </motion.p>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                phase: "01",
                                title: "Monthly Planning",
                                duration: "Day 1–3",
                                items: [
                                    "Content calendar review",
                                    "Trend & audio research",
                                    "Theme selection for month",
                                    "Client approval on plan",
                                ],
                                icon: <Calendar className="w-5 h-5" />,
                            },
                            {
                                phase: "02",
                                title: "Asset Creation",
                                duration: "Weekly",
                                items: [
                                    "Reel filming & editing",
                                    "Carousel design in Figma",
                                    "Copy & caption writing",
                                    "Hashtag & SEO research",
                                ],
                                icon: <Camera className="w-5 h-5" />,
                            },
                            {
                                phase: "03",
                                title: "Review & Approve",
                                duration: "48h turnaround",
                                items: [
                                    "Content preview in Jira",
                                    "Client feedback loop",
                                    "Revisions if needed",
                                    "Final sign-off",
                                ],
                                icon: <CheckCircle2 className="w-5 h-5" />,
                            },
                            {
                                phase: "04",
                                title: "Publish & Analyze",
                                duration: "Ongoing",
                                items: [
                                    "Scheduled publishing",
                                    "Engagement monitoring",
                                    "Performance tracking",
                                    "Monthly report & insights",
                                ],
                                icon: <BarChart3 className="w-5 h-5" />,
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={step.phase}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className={`p-8 rounded-3xl relative group hover:-translate-y-2 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                {index < 3 && (
                                    <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] transition-colors duration-700 ${d("bg-white/10", "bg-slate-200")}`} />
                                )}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500">
                                        {step.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>{step.duration}</span>
                                </div>
                                <div className="text-xs text-blue-500 font-medium font-grotesk mb-2">{step.phase}</div>
                                <h4 className="text-xl mb-6 font-grotesk">{step.title}</h4>
                                <ul className="space-y-3">
                                    {step.items.map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tool Stack */}
                    <motion.div {...fadeUp} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Jira", desc: "Project management", icon: <FolderOpen className="w-5 h-5" /> },
                            { name: "Google Drive", desc: "Asset storage", icon: <FolderOpen className="w-5 h-5" /> },
                            { name: "Figma", desc: "Carousel design", icon: <Palette className="w-5 h-5" /> },
                            { name: "Later / Buffer", desc: "Scheduling", icon: <Clock className="w-5 h-5" /> },
                        ].map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 rounded-2xl text-center group hover:-translate-y-1 transition-all duration-300 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-blue-500 transition-colors ${d("bg-white/[0.05] group-hover:bg-blue-500/10", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                    {tech.icon}
                                </div>
                                <div className="text-sm font-medium font-grotesk mb-1">{tech.name}</div>
                                <div className={`text-[11px] uppercase tracking-wider transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{tech.desc}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 5: SEO + GEO === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/30 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">04</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            SEO + GEO Strategy
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        Dominate &quot;handcrafted furniture Victoria BC&quot; and surrounding search queries —
                        ensuring Adriftwood appears first when buyers are ready to purchase.
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Search className="w-6 h-6" />,
                                title: "Technical SEO Audit",
                                desc: "Full crawl of adriftwood.co — indexing issues, Core Web Vitals, schema markup, image optimization, and meta tag strategy. Fix the foundation first.",
                                tag: "Foundation",
                            },
                            {
                                icon: <MapPin className="w-6 h-6" />,
                                title: "Local GEO Targeting",
                                desc: "Google Business Profile optimization, local citation building, and geo-targeted content for Victoria, Duncan, Vancouver, and Vancouver Island searches.",
                                tag: "Local",
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: "Keyword Strategy",
                                desc: "Target high-intent keywords: \"handcrafted bed frames Victoria\", \"custom furniture BC\", \"zero VOC bed frame Canada\", \"cedar bed frame Vancouver Island\".",
                                tag: "Keywords",
                            },
                            {
                                icon: <FileText className="w-6 h-6" />,
                                title: "Content SEO",
                                desc: "Optimize existing pages and create new SEO-driven landing pages for each product category and material type. Blog content strategy for long-tail keywords.",
                                tag: "Content",
                            },
                            {
                                icon: <Globe className="w-6 h-6" />,
                                title: "GEO (AI Search)",
                                desc: "Optimize for AI-powered search engines (ChatGPT, Perplexity, Google AI Overviews). Structured data, FAQ schema, and authoritative content that LLMs reference.",
                                tag: "AI Search",
                            },
                            {
                                icon: <LineChart className="w-6 h-6" />,
                                title: "Monthly Reporting",
                                desc: "Search Console performance, keyword ranking movements, traffic trends, and conversion tracking. Data-driven decisions every month.",
                                tag: "Analytics",
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`p-10 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 transition-colors ${d("bg-blue-500/10 group-hover:bg-blue-500/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                        {card.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ${d("text-blue-500/60 border-blue-500/10", "text-blue-600/70 border-blue-200")}`}>
                                        {card.tag}
                                    </span>
                                </div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{card.title}</h4>
                                <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 6: AGENTIC CONTENT SYSTEM === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">05</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Agentic Content System
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        Jake writes <span className="text-blue-500 font-medium">one piece of content per month</span>. Our AI-powered system
                        transforms it into high-value Reddit posts and email newsletters — amplifying the founder&apos;s voice without the founder&apos;s time.
                    </motion.p>

                    {/* Pipeline Visual */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            {
                                icon: <PenTool className="w-6 h-6" />,
                                step: "Input",
                                title: "Founder Writes",
                                desc: "Jake writes one authentic piece per month — a story, lesson, build log, or opinion. Raw, unpolished, real. Could be a voice memo, a paragraph, or a full post.",
                                detail: "Time commitment: ~30 minutes/month",
                            },
                            {
                                icon: <Bot className="w-6 h-6" />,
                                step: "Transform",
                                title: "AI Agent Processes",
                                desc: "Our agentic system takes the raw input and produces two outputs: a Reddit-optimized post that follows community norms, and a beautifully formatted email newsletter.",
                                detail: "Preserves Jake's voice & authenticity",
                            },
                            {
                                icon: <Send className="w-6 h-6" />,
                                step: "Distribute",
                                title: "Multi-Channel Publish",
                                desc: "Reddit post goes to targeted subreddits with proper etiquette. Newsletter is sent via Resend to the subscriber list. Both drive traffic back to adriftwood.co.",
                                detail: "Automated distribution pipeline",
                            },
                        ].map((phase, index) => (
                            <motion.div
                                key={phase.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className={`p-10 rounded-3xl relative group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                {index < 2 && (
                                    <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] transition-colors duration-700 ${d("bg-white/10", "bg-slate-200")}`} />
                                )}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 transition-colors ${d("bg-blue-500/10 group-hover:bg-blue-500/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                    {phase.icon}
                                </div>
                                <div className="text-xs text-blue-500 font-medium font-grotesk mb-2 uppercase tracking-widest">{phase.step}</div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{phase.title}</h4>
                                <p className={`text-sm leading-relaxed mb-4 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{phase.desc}</p>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                                    <span className={`text-xs ${d("text-white/30", "text-slate-400")}`}>{phase.detail}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reddit Strategy */}
                    <motion.div {...fadeUp} className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <MessagesSquare className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl md:text-3xl font-light font-grotesk">Reddit Strategy</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    sub: "r/woodworking",
                                    members: "6M+",
                                    approach: "Process-focused content: build logs with technical details, joinery close-ups, wood species discussions. The community wants to see the journey, not just the finished piece.",
                                    rule: "Follow the 9:1 rule — 90% value, 10% promotion",
                                },
                                {
                                    sub: "r/malelivingspace",
                                    members: "2M+",
                                    approach: "Lifestyle context: show Adriftwood pieces in designed rooms. Frame posts around \"room makeover\" narratives, seek feedback on space layouts. Let the furniture sell itself.",
                                    rule: "Never drop product links — let people ask",
                                },
                                {
                                    sub: "r/BuyCanadian",
                                    members: "Growing",
                                    approach: "Patriotic maker story: locally sourced, father-and-son craftsmanship, island heritage. This community actively wants to support Canadian brands.",
                                    rule: "Lead with the story, not the sale",
                                },
                                {
                                    sub: "r/furniture",
                                    members: "300K+",
                                    approach: "Quality comparisons: \"standard vs. custom\" content, why 5.5\" slats matter, the difference between zero-VOC and conventional finishes.",
                                    rule: "Educational angle builds trust first",
                                },
                            ].map((reddit, index) => (
                                <motion.div
                                    key={reddit.sub}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08 }}
                                    className={`p-8 rounded-3xl cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-blue-500" />
                                            <span className="font-grotesk font-medium">{reddit.sub}</span>
                                        </div>
                                        <span className={`text-[10px] uppercase tracking-widest ${d("text-white/30", "text-slate-400")}`}>{reddit.members} members</span>
                                    </div>
                                    <p className={`text-sm leading-relaxed mb-4 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{reddit.approach}</p>
                                    <div className={`p-3 rounded-lg text-xs ${d("bg-blue-500/[0.05] border border-blue-500/10 text-blue-500/70", "bg-blue-50 border border-blue-100 text-blue-600/80")}`}>
                                        ✦ {reddit.rule}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div {...fadeUp}>
                        <div className="flex items-center gap-3 mb-8">
                            <Mail className="w-6 h-6 text-blue-500" />
                            <h3 className="text-2xl md:text-3xl font-light font-grotesk">Newsletter via Resend</h3>
                        </div>
                        <div className={`p-10 rounded-3xl ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    { title: "Frequency", desc: "1x/month — high-value, never spammy. Each issue is worth opening.", icon: <Calendar className="w-5 h-5" /> },
                                    { title: "Content", desc: "Founder letter, new product spotlights, behind-the-scenes, exclusive early access for subscribers.", icon: <Newspaper className="w-5 h-5" /> },
                                    { title: "Platform", desc: "Powered by Resend — beautiful emails, high deliverability, integrated with the existing Adriftwood tech stack.", icon: <Send className="w-5 h-5" /> },
                                ].map((item) => (
                                    <div key={item.title} className="text-center">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-500 ${d("bg-blue-500/10", "bg-blue-50")}`}>
                                            {item.icon}
                                        </div>
                                        <h4 className="text-base font-grotesk mb-2">{item.title}</h4>
                                        <p className={`text-sm leading-relaxed ${d("text-white/40", "text-slate-500")}`}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 7: INVESTMENT & TIMELINE === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/30 to-transparent")}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">06</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Investment
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Full Package */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 rounded-3xl relative overflow-hidden group ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <span className={`inline-block text-[10px] uppercase tracking-widest text-blue-500 px-3 py-1 border rounded-full mb-6 ${d("border-blue-500/20", "border-blue-200")}`}>
                                    Recommended — Save $100/mo
                                </span>
                                <h3 className="text-2xl font-grotesk mb-2">Full Growth Package</h3>
                                <p className={`text-sm mb-2 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                    Monthly retainer — everything included. Partnership rate.
                                </p>
                                <div className="text-4xl font-light text-blue-500 font-grotesk mb-1" style={{ textShadow: d("0 0 20px rgba(59, 130, 246, 0.3)", "none") }}>
                                    $950
                                    <span className={`text-base ml-1 ${d("text-white/30", "text-slate-400")}`}>/month</span>
                                </div>
                                <p className={`text-xs mb-2 ${d("text-white/20", "text-slate-400")}`}>Minimum 3-month commitment</p>
                                <p className={`text-xs mb-8 ${d("text-white/20", "text-slate-400")}`}>
                                    <span className="line-through">$1,050/mo individually</span>
                                    <span className="text-blue-500/60 ml-2">→ Bundle saves $100/mo</span>
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "12 Instagram Reels / month (3/week)",
                                        "8 Carousels / month — IG + Pinterest (2/week)",
                                        "Google SEO & GEO optimization",
                                        "Pinterest account setup & strategy",
                                        "Agentic Reddit post system (1/month)",
                                        "Resend newsletter (1/month)",
                                        "Jira + Google Drive workflow",
                                        "Monthly content calendar & approval flow",
                                        "Monthly performance report & strategy call",
                                    ].map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/50", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Individual Components */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className={`p-10 rounded-3xl ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                        >
                            <h3 className="text-2xl font-grotesk mb-2">Also Available Separately</h3>
                            <p className={`text-sm mb-8 leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                Each component can be engaged individually based on priority and budget.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { name: "Social Content (Reels + Carousels)", desc: "20 pieces/month across Instagram & Pinterest", price: "From $500/mo" },
                                    { name: "SEO + GEO Package", desc: "Technical audit, keyword strategy, monthly optimization", price: "From $300/mo" },
                                    { name: "Agentic Content System", desc: "Reddit + Newsletter AI-powered pipeline", price: "From $250/mo" },
                                    { name: "Pinterest Setup & Strategy", desc: "New account, board creation, pin optimization", price: "Included" },
                                    { name: "Content Strategy Only", desc: "Monthly calendar, trend research, creative direction", price: "Ask us" },
                                    { name: "Monthly Reporting", desc: "Analytics dashboards and strategy recommendations", price: "Included" },
                                ].map((addon) => (
                                    <div
                                        key={addon.name}
                                        className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${d("border-white/[0.06] hover:border-white/10", "border-slate-200/80 hover:border-slate-300")}`}
                                    >
                                        <div>
                                            <div className="text-sm font-medium">{addon.name}</div>
                                            <div className={`text-[11px] mt-0.5 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{addon.desc}</div>
                                        </div>
                                        <span className={`text-xs font-medium shrink-0 ml-4 ${addon.price.startsWith("From") ? "text-blue-500" : d("text-white/30", "text-slate-400")}`}>{addon.price}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <motion.div {...fadeUp}>
                        <h3 className="text-2xl md:text-3xl font-light font-grotesk mb-8 text-center">Engagement Timeline</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { month: "Month 1", title: "Foundation", desc: "SEO audit, content strategy, Pinterest setup, first month of content, workflow onboarding" },
                                { month: "Month 2–3", title: "Growth", desc: "Full content cadence live, SEO optimizations rolling out, Reddit & newsletter launched, engagement building" },
                                { month: "Month 4+", title: "Scale", desc: "Data-driven optimization, double down on winners, expand to new channels if warranted, compound growth" },
                            ].map((phase, index) => (
                                <motion.div
                                    key={phase.month}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-6 rounded-2xl text-center cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                                >
                                    <div className="text-xs text-blue-500 font-medium font-grotesk mb-2">{phase.month}</div>
                                    <h4 className="text-base font-grotesk mb-2">{phase.title}</h4>
                                    <p className={`text-xs leading-relaxed ${d("text-white/40", "text-slate-500")}`}>{phase.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 8: MEASUREMENT & KPIs === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">07</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            How We Measure
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        Every dollar invested is tracked. Monthly reports with clear KPIs,
                        so you always know what&apos;s working and what we&apos;re optimizing.
                    </motion.p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {[
                            {
                                icon: <Users className="w-6 h-6" />,
                                metric: "Follower Growth",
                                desc: "Instagram and Pinterest follower count tracked monthly. Target: consistent month-over-month growth with quality followers who match the buyer profile.",
                                target: "Benchmark set in Month 1",
                            },
                            {
                                icon: <Eye className="w-6 h-6" />,
                                metric: "Engagement Rate",
                                desc: "Likes, comments, saves, and shares per post. Engagement rate is the true health indicator — it measures how much people care, not just how many see it.",
                                target: "Target: 3%+ engagement rate",
                            },
                            {
                                icon: <MousePointerClick className="w-6 h-6" />,
                                metric: "Website Traffic",
                                desc: "Traffic from social media, Reddit, and newsletters measured via Google Analytics. Track which content types drive the most website visits and store page views.",
                                target: "Track source attribution",
                            },
                            {
                                icon: <Search className="w-6 h-6" />,
                                metric: "SEO Rankings",
                                desc: "Keyword position tracking for target terms. Monthly rank change reporting for \"handcrafted furniture Victoria\", \"cedar bed frame BC\", and 20+ target keywords.",
                                target: "Page 1 for core terms",
                            },
                            {
                                icon: <Mail className="w-6 h-6" />,
                                metric: "Newsletter Growth",
                                desc: "Subscriber count, open rate, and click-through rate via Resend analytics. Newsletter subscribers are the highest-value audience — they opted in.",
                                target: "Target: 40%+ open rate",
                            },
                            {
                                icon: <PieChart className="w-6 h-6" />,
                                metric: "Content Performance",
                                desc: "Per-post analytics: reach, impressions, saves, shares, and profile visits generated. Identifies which content pillars and hooks perform best for optimization.",
                                target: "Monthly top-performer analysis",
                            },
                        ].map((kpi, index) => (
                            <motion.div
                                key={kpi.metric}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`p-8 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-blue-500 mb-6 transition-colors ${d("bg-blue-500/10 group-hover:bg-blue-500/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                    {kpi.icon}
                                </div>
                                <h4 className="text-lg mb-2 font-normal font-grotesk">{kpi.metric}</h4>
                                <p className={`text-sm leading-relaxed mb-3 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{kpi.desc}</p>
                                <div className="flex items-center gap-2">
                                    <Target className="w-3 h-3 text-blue-500" />
                                    <span className={`text-xs text-blue-500/70 font-medium`}>{kpi.target}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Monthly Report Preview */}
                    <motion.div
                        {...fadeUp}
                        className={`p-10 rounded-3xl text-center max-w-4xl mx-auto ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                    >
                        <BarChart3 className="w-10 h-10 text-blue-500 mx-auto mb-6" />
                        <h4 className="text-xl font-grotesk mb-3">Monthly Strategy Call</h4>
                        <p className={`text-sm leading-relaxed max-w-2xl mx-auto ${d("text-white/40", "text-slate-500")}`}>
                            Every month you receive a comprehensive performance report + a 30-minute strategy call.
                            We review what worked, what didn&apos;t, and adjust the plan for the next month.
                            No guessing — just data-driven growth.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 9: TERMS & ENGAGEMENT === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/30 to-transparent")}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-blue-500 font-medium font-grotesk">08</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Terms & Engagement
                        </h2>
                    </motion.div>

                    <div className={`grid md:grid-cols-2 gap-[1px] mb-16 ${d("bg-white/[0.06]", "bg-slate-200/60")}`}>
                        {[
                            {
                                title: "Engagement Period",
                                desc: "Minimum 3-month commitment with month-to-month renewal thereafter. Either party may terminate with 30 days written notice after the initial period.",
                            },
                            {
                                title: "Payment Terms",
                                desc: "Monthly retainer invoiced on the 1st of each month, due within 14 days. First month payment required before work begins.",
                            },
                            {
                                title: "Content Ownership",
                                desc: "All content created during the engagement is owned by Adriftwood Co. upon payment. Trixode retains the right to feature work in portfolio with client approval.",
                            },
                            {
                                title: "Scope & Revisions",
                                desc: "Deliverables as outlined in this proposal. Up to 2 rounds of revisions per content piece. Additional revisions or scope changes quoted separately.",
                            },
                            {
                                title: "Approval Workflow",
                                desc: "Content submitted via Jira for review. Client has 48 hours to approve or request revisions. No response within 48h = auto-approval for scheduling.",
                            },
                            {
                                title: "Confidentiality",
                                desc: "Both parties agree to maintain confidentiality of proprietary information, strategies, and business data shared during the engagement.",
                            },
                        ].map((term, index) => (
                            <motion.div
                                key={term.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className={`p-8 cursor-default ${d("bg-white/[0.02]", "bg-white/80")}`}
                            >
                                <h4 className="text-base mb-2 font-grotesk">{term.title}</h4>
                                <p className={`text-sm leading-relaxed ${d("text-white/40", "text-slate-500")}`}>{term.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className={`text-sm mb-8 max-w-lg mx-auto transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>
                            This proposal is valid for 30 days. We&apos;d love to help Adriftwood become the most recognized
                            handcrafted furniture brand in Canada.
                        </p>
                        <a
                            href="mailto:hello@trixode.com?subject=Adriftwood%20Digital%20Marketing%20Proposal"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-blue-500 text-black text-sm uppercase tracking-widest rounded-full hover:bg-blue-500 transition-all duration-300 group font-medium"
                        >
                            <span>Let&apos;s Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <div className={`mt-6 flex items-center justify-center gap-4 text-xs transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                            <span>hello@trixode.com</span>
                            <span>•</span>
                            <span>BC, Canada</span>
                            <span>•</span>
                            <span>trixode-studios.com</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`relative z-10 border-t px-6 md:px-16 py-8 transition-colors duration-700 ${d("border-white/[0.06]", "border-slate-200")}`}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Trixode Studios" width={100} height={28} className={`opacity-50 transition-all duration-700 ${d("invert", "")}`} />
                    </div>
                    <div className={`text-[11px] uppercase tracking-widest transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                        Confidential — Prepared exclusively for Adriftwood Co.
                    </div>
                    <div className={`text-[11px] transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                        © 2026 Trixode Studios
                    </div>
                </div>
            </footer>
        </div>
    )
}
