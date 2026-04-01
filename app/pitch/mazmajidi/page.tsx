"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
    ArrowRight,
    Shield,
    Zap,
    Globe,
    Layers,
    Sparkles,
    ChevronRight,
    Eye,
    AlertTriangle,
    CheckCircle2,
    Monitor,
    Smartphone,
    Bot,
    Search,
    BarChart3,
    Code2,
    Rocket,
    MapPin,
    Clock,
    Users,
    Sun,
    Moon,
    Brain,
    MessageCircle,
    Home,
    TrendingUp,
    Heart,
    Languages,
    Building2,
    Target,
    LineChart,
    UserCheck,
    Send,
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

export default function MazMajidiPitchPage() {
    const [isDark, setIsDark] = useState(true)

    const d = (dark: string, light: string) => isDark ? dark : light

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
                    style={{ background: `radial-gradient(circle, rgba(212, 175, 55, ${d("0.35", "0.15")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[500px] h-[500px] top-1/4 -right-20 blur-[80px] opacity-25", "w-[600px] h-[600px] top-1/4 -right-24 blur-[120px] opacity-30")}`}
                    style={{ background: `radial-gradient(circle, rgba(139, 92, 246, ${d("0.20", "0.10")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[400px] h-[400px] bottom-1/4 left-1/4 blur-[80px] opacity-20", "w-[500px] h-[500px] bottom-1/4 left-1/4 blur-[120px] opacity-25")}`}
                    style={{ background: `radial-gradient(circle, rgba(212, 175, 55, ${d("0.20", "0.08")}) 0%, transparent 70%)` }}
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
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span className={`text-[11px] uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/50", "text-slate-400")}`}>
                            Confidential — Prepared for Maz Majidi
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-10 h-[1px] bg-amber-400" style={{ boxShadow: d("0 0 10px rgba(212, 175, 55, 0.4)", "none") }} />
                            <span className={`text-xs uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>
                                Digital Transformation & AI Automation Proposal
                            </span>
                            <div className="w-10 h-[1px] bg-amber-400" style={{ boxShadow: d("0 0 10px rgba(212, 175, 55, 0.4)", "none") }} />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight font-grotesk mb-8"
                    >
                        <span className="block">Elevating</span>
                        <span className={`block bg-clip-text text-transparent ${d("bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600", "bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700")}`}>
                            Maz Majidi
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className={`text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}
                    >
                        A premium digital experience and AI-powered client system worthy of $300M+ in luxury transactions.
                        From top realtor to the most technologically advanced luxury advisor in Vancouver.
                    </motion.p>

                    {/* Quick Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.1 }}
                        className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
                    >
                        {[
                            { value: "March 2026", label: "Prepared" },
                            { value: "Maz Majidi", label: "For" },
                            { value: "Trixode Studios", label: "By" },
                        ].map((stat) => (
                            <div key={stat.label} className={`p-4 rounded-2xl text-center backdrop-blur-sm border transition-colors duration-700 ${d("glass", "bg-white/80 border-slate-200/80 shadow-sm")}`}>
                                <div className="text-sm md:text-base font-light text-amber-400 font-grotesk">{stat.value}</div>
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

            {/* === SECTION 2: CURRENT SITE AUDIT === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">01</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Current Site Audit
                        </h2>
                    </motion.div>

                    {/* Screenshots Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {[
                            { src: "/pitch/maz-homepage.png", label: "Homepage", alt: "Maz Majidi current homepage" },
                            { src: "/pitch/maz-about.png", label: "About", alt: "Maz Majidi about page" },
                            { src: "/pitch/maz-contact.png", label: "Contact", alt: "Maz Majidi contact page" },
                        ].map((img, i) => (
                            <motion.div
                                key={img.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className={`relative overflow-hidden rounded-2xl border mb-4 transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        width={600}
                                        height={400}
                                        className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <Eye className="w-5 h-5 text-white/70" />
                                    </div>
                                </div>
                                <span className={`text-sm uppercase tracking-widest font-grotesk transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>{img.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Issues Grid */}
                    <motion.h3 {...fadeUp} className="text-2xl md:text-3xl font-light mb-12 font-grotesk">
                        <AlertTriangle className="inline w-6 h-6 text-amber-400 mr-3 -mt-1" />
                        Key Findings
                    </motion.h3>

                    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] transition-colors duration-700 ${d("bg-white/[0.06]", "bg-slate-200/60")}`}>
                        {[
                            {
                                num: "01",
                                title: "Passive Lead Capture",
                                desc: "Only a static Contact Form 7 page exists. For a $300M+ luxury realtor, this is like leaving a tip jar on a Ferrari showroom counter. HNW clients expect concierge-level digital interactions.",
                                severity: "high",
                            },
                            {
                                num: "02",
                                title: "No Client Segmentation",
                                desc: "Buyers, sellers, Persian-speaking clients, and international investors all land on the same experience. No personalization, no language routing, no behavioral triggers.",
                                severity: "high",
                            },
                            {
                                num: "03",
                                title: "Content Buried in Walls",
                                desc: "Excellent 20+ long-form articles with deep market expertise — but buried in text-heavy WordPress layouts. Executive buyers scan, they don't read paragraphs.",
                                severity: "high",
                            },
                            {
                                num: "04",
                                title: "Performance & Page Weight",
                                desc: "Full-resolution parallax backgrounds and unoptimized WordPress assets create slow load times on mobile. Google Core Web Vitals penalties reduce organic visibility.",
                                severity: "medium",
                            },
                            {
                                num: "05",
                                title: "Missing Real-Time Proof",
                                desc: "Strong testimonials exist but presented statically. No animated counters for '$300M+ sold', no live listing feed, no 'recently sold' ticker. Static text doesn't convey momentum.",
                                severity: "medium",
                            },
                            {
                                num: "06",
                                title: "Bilingual Underutilized",
                                desc: "The Persian-speaking value proposition — a massive differentiator serving 90,000+ Persian speakers in Metro Vancouver — is an afterthought rather than a core brand pillar.",
                                severity: "medium",
                            },
                        ].map((issue, index) => (
                            <motion.div
                                key={issue.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className={`group p-10 relative overflow-hidden cursor-default transition-all duration-400 ${d("bg-white/[0.02] hover:bg-white/[0.04]", "bg-white/80 hover:bg-white")}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xs text-amber-400 font-medium font-grotesk">{issue.num}</span>
                                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${issue.severity === "high" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"}`}>
                                            {issue.severity}
                                        </span>
                                    </div>
                                    <h4 className="text-lg mb-3 font-normal">{issue.title}</h4>
                                    <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{issue.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 3: THE PROBLEM — WHY THIS MATTERS === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-amber-50/50 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">02</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            The Paradigm Shift
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-16 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        81% of luxury home buyers begin their search online. The website isn&apos;t a brochure — it&apos;s the first handshake.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {[
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Buyers Are Digital-Native",
                                desc: "The next wave of $5M+ buyers are tech executives, crypto founders, and international professionals who judge competence by digital presence — not business cards.",
                            },
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: "12,000+ Competing Realtors",
                                desc: "Greater Vancouver has over 12,000 realtors. The top 1% differentiate through experience design, not just transaction volume. Standing out requires a digital moat.",
                            },
                            {
                                icon: <Languages className="w-6 h-6" />,
                                title: "90,000+ Persian Speakers Underserved",
                                desc: "Maz is positioned as the Persian-speaking luxury advisor on the North Shore. But this positioning exists through word-of-mouth — not through a digital experience that makes it instantly clear.",
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: "Market Timing is Everything",
                                desc: "The agents who capture the next real estate cycle will be those who built AI-powered client systems before the market turned. The infrastructure must exist before the demand surge.",
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
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 mb-6 transition-colors ${d("bg-amber-400/10 group-hover:bg-amber-400/20", "bg-amber-50 group-hover:bg-amber-100")}`}>
                                    {card.icon}
                                </div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{card.title}</h4>
                                <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* The Core Problem Statement */}
                    <motion.div
                        {...fadeUp}
                        className={`p-12 rounded-3xl text-center max-w-4xl mx-auto ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")}`}
                    >
                        <Brain className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                        <p className={`text-lg md:text-xl leading-relaxed font-light transition-colors duration-700 ${d("text-white/60", "text-slate-600")}`}>
                            Maz Majidi has a <span className="text-amber-400 font-medium">$300M+ track record</span>, award-winning construction expertise,
                            12+ years of luxury market knowledge, bilingual cultural competence, and glowing client testimonials —
                            but his digital presence operates at <span className="text-amber-400 font-medium">10% of its potential</span>.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 4: THE SOLUTION — AGENTIC AI === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">03</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            AI-Powered Solution
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        Four intelligent agents working 24/7 — capturing leads, qualifying buyers, nurturing relationships, and
                        positioning Maz as the most technologically advanced luxury advisor in Vancouver.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <MessageCircle className="w-6 h-6" />,
                                agent: "Agent 01",
                                title: "Bilingual Luxury Concierge",
                                desc: "A conversational AI fluent in English and Persian that replaces the static contact form with lifestyle-driven lead qualification. \"Are you looking for ocean views, mountain backdrop, or both?\"",
                                psychology: "The IKEA Effect — when clients invest effort describing their dream home, they become emotionally invested in the advisor who listened.",
                                impact: "Captures leads at 2am, on weekends, and from international time zones — exactly when $5M+ buyers from Iran, Dubai, and Hong Kong are browsing.",
                                tag: "Lead Capture",
                            },
                            {
                                icon: <Home className="w-6 h-6" />,
                                agent: "Agent 02",
                                title: "AI Property Value Estimator",
                                desc: "Homeowners enter their address to receive a \"Maz Majidi Preliminary Market Position Report\" — including comparable sales, renovation ROI insights, and neighborhood trends.",
                                psychology: "The Reciprocity Principle — giving something valuable for free creates an obligation to reciprocate. 4x more likely to list with Maz.",
                                impact: "Every report is a warm seller lead. Data-backed insights build trust before the first meeting even happens.",
                                tag: "Seller Leads",
                            },
                            {
                                icon: <LineChart className="w-6 h-6" />,
                                agent: "Agent 03",
                                title: "VIP Market Intelligence",
                                desc: "Monitors MLS listings, development permits, and zoning changes in real-time. Sends personalized alerts when a property matches hyper-specific client criteria — before it hits public search.",
                                psychology: "Exclusivity Bias — receiving \"insider\" information reinforces the perception that Maz operates at a different level than other agents.",
                                impact: "Creates a locked-in client base. Clients who receive personalized intelligence never consider another advisor.",
                                tag: "Client Retention",
                            },
                            {
                                icon: <UserCheck className="w-6 h-6" />,
                                agent: "Agent 04",
                                title: "CRM Orchestrator",
                                desc: "Tracks every website interaction; segments contacts into Hot, Warm, and Long-term. Automated personalized market updates, birthday notes, and re-engagement alerts when dormant clients return.",
                                psychology: "The Mere Exposure Effect — consistent, non-intrusive touchpoints build familiarity. The client who receives thoughtful updates for 18 months will call Maz — not Google.",
                                impact: "No lead ever falls through the cracks. The system works while Maz focuses on high-value client relationships.",
                                tag: "Automation",
                            },
                        ].map((agent, index) => (
                            <motion.div
                                key={agent.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-10 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 transition-colors ${d("bg-amber-400/10 group-hover:bg-amber-400/20", "bg-amber-50 group-hover:bg-amber-100")}`}>
                                        {agent.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ${d("text-amber-400/60 border-amber-400/10", "text-amber-600/70 border-amber-200")}`}>
                                        {agent.tag}
                                    </span>
                                </div>
                                <div className="text-xs text-amber-400 font-medium font-grotesk mb-2">{agent.agent}</div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{agent.title}</h4>
                                <p className={`text-sm leading-relaxed mb-4 transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{agent.desc}</p>

                                {/* Psychology callout */}
                                <div className={`p-4 rounded-xl mb-4 ${d("bg-amber-400/[0.05] border border-amber-400/10", "bg-amber-50 border border-amber-100")}`}>
                                    <div className={`text-[10px] uppercase tracking-widest mb-1 ${d("text-amber-400/60", "text-amber-600/60")}`}>Psychology</div>
                                    <p className={`text-xs leading-relaxed ${d("text-white/50", "text-slate-600")}`}>{agent.psychology}</p>
                                </div>

                                {/* Impact */}
                                <div className={`flex items-start gap-2 text-xs ${d("text-white/30", "text-slate-400")}`}>
                                    <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                                    <span>{agent.impact}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 5: WEBSITE VISION === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-amber-50/50 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">04</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Premium Web Experience
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <Monitor className="w-6 h-6" />, title: "Luxury Dark Aesthetic", desc: "Glassmorphism, aurora gradients, and cinematic scroll animations that convey exclusivity before a single word is read.", tag: "Design" },
                            { icon: <Languages className="w-6 h-6" />, title: "Full Bilingual System", desc: "English/Persian toggle that transforms the entire experience — culturally adapted imagery, RTL layout, and native content flow.", tag: "Bilingual" },
                            { icon: <Sparkles className="w-6 h-6" />, title: "Motion & Micro-Interactions", desc: "Scroll-triggered reveals, hover effects, and fluid transitions. The site shouldn't just show luxury — it should feel alive.", tag: "UX" },
                            { icon: <BarChart3 className="w-6 h-6" />, title: "Animated Trust Engine", desc: "'$300M+ Sold' · '12+ Years' · '4 Award Programs' — animated counters and certification badges triggered on scroll.", tag: "Conversion" },
                            { icon: <Building2 className="w-6 h-6" />, title: "Interactive Portfolio", desc: "Filterable property grid with 3D-hover cards. Filter by price, location, status. Each listing tells a visual story.", tag: "Properties" },
                            { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-First Performance", desc: "Sub-2-second loads. Thumb-optimized navigation for executives browsing between meetings. 95+ Lighthouse score.", tag: "Speed" },
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
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-amber-400 transition-colors ${d("bg-amber-400/10 group-hover:bg-amber-400/20", "bg-amber-50 group-hover:bg-amber-100")}`}>
                                        {card.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ${d("text-amber-400/60 border-amber-400/10", "text-amber-600/70 border-amber-200")}`}>
                                        {card.tag}
                                    </span>
                                </div>
                                <h4 className="text-xl mb-3 font-normal font-grotesk">{card.title}</h4>
                                <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>{card.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* LIVE MOCKUPS SHOWCASE */}
                    <div className="mt-32 pt-20 border-t border-white/10">
                        <motion.div {...fadeUp} className="text-center mb-16">
                            <span className="text-sm text-amber-400 font-medium font-grotesk block mb-4">Interactive Demos</span>
                            <h3 className="text-3xl md:text-5xl font-light font-grotesk">Choose Your Aesthetic</h3>
                            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
                                We&apos;ve built three functional, animated Next.js mockups based on your reference materials. 
                                Click any option below to experience a live preview.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "Digital FinTech",
                                    href: "/pitch/mazmajidi/mockup-1",
                                    desc: "Sleek, data-driven luxury with clean grids. Inspired by TREF.",
                                    tag: "Modern Tech",
                                    preview: "/mockup-1-hero-screenshot.png"
                                },
                                {
                                    name: "LA Monolith",
                                    href: "/pitch/mazmajidi/mockup-2",
                                    desc: "Aggressive typography, cinematic visuals, high contrast. Inspired by Altman Brothers.",
                                    tag: "Edgy Modern",
                                    preview: "/mockup-2-hero-screenshot.png"
                                },
                                {
                                    name: "Quiet Luxury",
                                    href: "/pitch/mazmajidi/mockup-3",
                                    desc: "Prestige elegance, serif typography, serene interactions. Inspired by Kumara Wilcoxon.",
                                    tag: "Classic Elegance",
                                    preview: "/mockup-3-hero-screenshot.png"
                                },
                            ].map((mockup, index) => (
                                <motion.a
                                    key={mockup.name}
                                    href={mockup.href}
                                    target="_blank"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`block group rounded-3xl overflow-hidden transition-all duration-400 ${d("glass border border-white/10 hover:border-white/20", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-xl")}`}
                                >
                                    {/* Preview Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={mockup.preview}
                                            alt={`${mockup.name} mockup preview`}
                                            fill
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${d("from-[#030303] via-[#030303]/50 to-transparent", "from-white via-white/50 to-transparent")}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ${d("text-amber-400/60 border-amber-400/10", "text-amber-600/70 border-amber-200")}`}>
                                                {mockup.tag}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:-rotate-45 transition-transform duration-300" />
                                        </div>
                                        <h4 className="text-2xl mb-2 font-normal font-grotesk group-hover:text-amber-400 transition-colors">{mockup.name}</h4>
                                        <p className={`text-sm leading-relaxed transition-colors duration-700 ${d("text-white/40 group-hover:text-white/60", "text-slate-500")}`}>
                                            {mockup.desc}
                                        </p>
                                        <div className={`mt-4 text-xs uppercase tracking-widest flex items-center gap-2 ${d("text-white/30", "text-slate-400")}`}>
                                            <span>View Live Demo</span>
                                            <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* === SECTION 6: TECH STACK === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">05</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Technology
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Next.js 16", desc: "React framework", icon: <Code2 className="w-5 h-5" /> },
                            { name: "TypeScript", desc: "Type safety", icon: <Shield className="w-5 h-5" /> },
                            { name: "Framer Motion", desc: "Animations", icon: <Sparkles className="w-5 h-5" /> },
                            { name: "Tailwind CSS", desc: "Design system", icon: <Layers className="w-5 h-5" /> },
                            { name: "Vercel Edge", desc: "Global CDN", icon: <Globe className="w-5 h-5" /> },
                            { name: "AI Concierge", desc: "24/7 bilingual", icon: <Bot className="w-5 h-5" /> },
                            { name: "Analytics", desc: "Conversion tracking", icon: <BarChart3 className="w-5 h-5" /> },
                            { name: "SEO Suite", desc: "Search visibility", icon: <Search className="w-5 h-5" /> },
                        ].map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 rounded-2xl text-center group hover:-translate-y-1 transition-all duration-300 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400 transition-colors ${d("bg-white/[0.05] group-hover:bg-amber-400/10", "bg-amber-50 group-hover:bg-amber-100")}`}>
                                    {tech.icon}
                                </div>
                                <div className="text-sm font-medium font-grotesk mb-1">{tech.name}</div>
                                <div className={`text-[11px] uppercase tracking-wider transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 7: PROCESS === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-amber-50/50 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">06</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Our Process
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { phase: "01", title: "Discovery", duration: "Week 1", items: ["Brand & persona deep-dive", "Content & asset audit", "Bilingual UX strategy", "AI agent requirements"], icon: <Search className="w-5 h-5" /> },
                            { phase: "02", title: "Design", duration: "Week 2–3", items: ["Luxury UI/UX wireframes", "High-fidelity mockups", "Motion design spec", "Persian RTL prototypes"], icon: <Sparkles className="w-5 h-5" /> },
                            { phase: "03", title: "Build", duration: "Week 3–5", items: ["Next.js development", "AI agent training", "Bilingual integration", "SEO & analytics"], icon: <Code2 className="w-5 h-5" /> },
                            { phase: "04", title: "Launch", duration: "Week 5–6", items: ["QA & browser testing", "Performance tuning", "Domain migration", "AI agent deployment"], icon: <Rocket className="w-5 h-5" /> },
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
                                    <div className="w-10 h-10 rounded-full border border-amber-400/30 flex items-center justify-center text-amber-400">
                                        {step.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>{step.duration}</span>
                                </div>
                                <div className="text-xs text-amber-400 font-medium font-grotesk mb-2">{step.phase}</div>
                                <h4 className="text-xl mb-6 font-grotesk">{step.title}</h4>
                                <ul className="space-y-3">
                                    {step.items.map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 8: WHY TRIXODE === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">07</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Why Trixode
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            { value: "10+", label: "Projects Shipped", desc: "Across AI agents, web platforms, and growth engines", icon: <Zap className="w-6 h-6" /> },
                            { value: "BC, Canada", label: "Local Team", desc: "Same province, same market understanding. We know the BC real estate landscape.", icon: <MapPin className="w-6 h-6" /> },
                            { value: "24h", label: "Response Guarantee", desc: "Every message answered within one business day. No exceptions.", icon: <Clock className="w-6 h-6" /> },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-10 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-400 ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-400 transition-colors ${d("bg-amber-400/10 group-hover:bg-amber-400/20", "bg-amber-50 group-hover:bg-amber-100")}`}>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-light text-amber-400 mb-2 font-grotesk" style={{ textShadow: d("0 0 20px rgba(212, 175, 55, 0.3)", "none") }}>
                                    {stat.value}
                                </div>
                                <div className={`text-xs uppercase tracking-widest mb-3 transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>{stat.label}</div>
                                <p className={`text-sm transition-colors duration-700 ${d("text-white/30", "text-slate-500")}`}>{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "AI-native agency — we build with AI, not just about AI",
                            "Full-service: design, development, AI agents, SEO, and strategy",
                            "Direct access to founding team — no account managers in between",
                            "Specialized in luxury & premium brand digital experiences",
                        ].map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`flex items-center gap-4 p-6 border rounded-xl group hover:translate-x-2 transition-all duration-400 ${d("border-white/[0.06] hover:border-white/10", "border-slate-200/80 hover:border-slate-300 bg-white/50")}`}
                            >
                                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                                <span className={`text-sm transition-colors ${d("text-white/60 group-hover:text-white/80", "text-slate-600 group-hover:text-slate-800")}`}>{point}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 9: INVESTMENT & NEXT STEPS === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent", "bg-gradient-to-b from-transparent via-amber-50/50 to-transparent")}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-amber-400 font-medium font-grotesk">08</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Next Steps
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Full Transformation Package */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 rounded-3xl relative overflow-hidden group ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <span className={`inline-block text-[10px] uppercase tracking-widest text-amber-400 px-3 py-1 border rounded-full mb-6 ${d("border-amber-400/20", "border-amber-200")}`}>
                                    Recommended
                                </span>
                                <h3 className="text-2xl font-grotesk mb-2">Full Digital Transformation</h3>
                                <p className={`text-sm mb-8 leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                    Complete website rebuild + 4 AI agents. The website captures attention; the agents convert and retain.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Full UI/UX redesign (8–10 luxury pages)",
                                        "Next.js + Framer Motion build",
                                        "Full bilingual system (EN/FA)",
                                        "Interactive property portfolio",
                                        "Bilingual AI Concierge (24/7)",
                                        "AI Property Value Estimator",
                                        "VIP Market Intelligence Monitor",
                                        "CRM Orchestrator & automation",
                                        "SEO optimization & analytics",
                                        "60 days post-launch support",
                                    ].map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/50", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Individual Packages */}
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
                                    { name: "Premium Website Rebuild", desc: "8–10 pages, bilingual, luxury design, SEO" },
                                    { name: "Bilingual AI Concierge", desc: "24/7 EN/FA conversational lead capture" },
                                    { name: "Property Value Estimator", desc: "Automated seller reports with ROI insights" },
                                    { name: "VIP Market Monitor", desc: "Real-time personalized listing alerts" },
                                    { name: "CRM Orchestrator", desc: "Automated follow-up & lifecycle management" },
                                    { name: "SEO & Content Strategy", desc: "Ongoing optimization and keyword tracking" },
                                    { name: "Ongoing Maintenance", desc: "Updates, monitoring, and priority support" },
                                ].map((addon) => (
                                    <div
                                        key={addon.name}
                                        className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${d("border-white/[0.06] hover:border-white/10", "border-slate-200/80 hover:border-slate-300")}`}
                                    >
                                        <div>
                                            <div className="text-sm font-medium">{addon.name}</div>
                                            <div className={`text-[11px] mt-0.5 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{addon.desc}</div>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 shrink-0 ml-4 ${d("text-amber-400/40", "text-amber-500/40")}`} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className={`text-sm mb-8 max-w-lg mx-auto transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>
                            This proposal is valid for 30 days. We&apos;d love to discuss how we can bring this vision to life.
                        </p>
                        <a
                            href="mailto:hello@trixode.com?subject=Maz%20Majidi%20Digital%20Transformation"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-amber-500 text-black text-sm uppercase tracking-widest rounded-full hover:bg-amber-400 transition-all duration-300 group font-medium"
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
                        Confidential — Prepared exclusively for Maz Majidi
                    </div>
                    <div className={`text-[11px] transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                        © 2026 Trixode Studios
                    </div>
                </div>
            </footer>
        </div>
    )
}
