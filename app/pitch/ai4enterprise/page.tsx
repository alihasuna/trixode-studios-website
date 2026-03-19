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

export default function AI4EnterprisePitchPage() {
    const [isDark, setIsDark] = useState(true)

    // Theme helpers
    const d = (dark: string, light: string) => isDark ? dark : light

    return (
        <div className={`min-h-screen overflow-hidden transition-colors duration-700 ${d("bg-[#030303] text-white", "bg-[#fafbfc] text-slate-900")}`}>
            {/* Theme Toggle Button */}
            <motion.button
                onClick={() => setIsDark(!isDark)}
                className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-500 cursor-pointer ${d(
                    "bg-white/[0.06] border-white/10 hover:bg-white/10 text-white/70 hover:text-white",
                    "bg-black/[0.04] border-slate-200 hover:bg-black/[0.08] text-slate-500 hover:text-slate-800 shadow-sm"
                )
                    }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div
                            key="sun"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Sun className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Moon className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Background Aurora / Gradient Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-opacity duration-700">
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[600px] h-[600px] -top-32 -left-32 blur-[80px] opacity-30", "w-[700px] h-[700px] -top-40 -left-40 blur-[120px] opacity-40")}`}
                    style={{ background: `radial-gradient(circle, rgba(59, 130, 246, ${d("0.35", "0.15")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[500px] h-[500px] top-1/4 -right-20 blur-[80px] opacity-25", "w-[600px] h-[600px] top-1/4 -right-24 blur-[120px] opacity-30")}`}
                    style={{ background: `radial-gradient(circle, rgba(139, 92, 246, ${d("0.25", "0.12")}) 0%, transparent 70%)` }}
                />
                <div
                    className={`absolute rounded-full transition-all duration-700 ${d("w-[400px] h-[400px] bottom-1/4 left-1/4 blur-[80px] opacity-20", "w-[500px] h-[500px] bottom-1/4 left-1/4 blur-[120px] opacity-25")}`}
                    style={{ background: `radial-gradient(circle, rgba(6, 182, 212, ${d("0.25", "0.10")}) 0%, transparent 70%)` }}
                />
            </div>

            {/* Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: d(
                        "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)"
                    ),
                    backgroundSize: "100px 100px",
                }}
            />

            {/* === SECTION 1: HERO === */}
            <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-20 pb-20 z-10">
                <div className="max-w-6xl w-full mx-auto text-center">
                    {/* Confidential Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-12 backdrop-blur-sm transition-colors duration-700 ${d("border-white/10 bg-white/[0.03]", "border-slate-200/80 bg-white/60")
                            }`}
                    >
                        <Shield className="w-3.5 h-3.5 text-brand-blue" />
                        <span className={`text-[11px] uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/50", "text-slate-400")}`}>
                            Confidential — Prepared for AI4Enterprise
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="w-10 h-[1px] bg-brand-blue" style={{ boxShadow: d("0 0 10px rgba(59, 130, 246, 0.4)", "none") }} />
                            <span className={`text-xs uppercase tracking-[0.2em] font-grotesk transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>
                                Website Renovation Proposal
                            </span>
                            <div className="w-10 h-[1px] bg-brand-blue" style={{ boxShadow: d("0 0 10px rgba(59, 130, 246, 0.4)", "none") }} />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight font-grotesk mb-8"
                    >
                        <span className="block">Elevating</span>
                        <span className={`block bg-clip-text text-transparent ${d("bg-gradient-to-r from-white via-brand-blue to-brand-purple", "bg-gradient-to-r from-slate-800 via-brand-blue to-brand-purple")}`}>
                            AI4Enterprise
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className={`text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}
                    >
                        A bespoke web experience that matches the caliber of 35+ years of enterprise expertise.
                        From consulting leader to digital authority.
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
                            { value: "Steve Harris", label: "For" },
                            { value: "Trixode Studios", label: "By" },
                        ].map((stat) => (
                            <div key={stat.label} className={`p-4 rounded-2xl text-center backdrop-blur-sm border transition-colors duration-700 ${d("glass", "bg-white/80 border-slate-200/80 shadow-sm")
                                }`}>
                                <div className="text-sm md:text-base font-light text-brand-blue font-grotesk">{stat.value}</div>
                                <div className={`text-[10px] uppercase tracking-widest mt-1 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-20"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-700 ${d("text-white/20", "text-slate-300")}`}>Scroll to explore</span>
                            <ChevronRight className={`w-4 h-4 rotate-90 transition-colors duration-700 ${d("text-white/20", "text-slate-300")}`} />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === SECTION 2: CURRENT SITE AUDIT === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">01</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Current Site Audit
                        </h2>
                    </motion.div>

                    {/* Screenshots Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {[
                            { src: "/pitch/ai4e-homepage.png", label: "Homepage", alt: "AI4Enterprise current homepage" },
                            { src: "/pitch/ai4e-capabilities.png", label: "Capabilities", alt: "AI4Enterprise capabilities page" },
                            { src: "/pitch/ai4e-about.png", label: "About", alt: "AI4Enterprise about page" },
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
                                title: "Generic Stock Imagery",
                                desc: "Neural network backgrounds feel templated. Doesn't convey the premium, hands-on consulting expertise Steve brings.",
                                severity: "high",
                            },
                            {
                                num: "02",
                                title: "Dated Visual Framework",
                                desc: "Light grey Squarespace aesthetic lacks the modern sophistication expected from a firm leading $500M+ portfolios.",
                                severity: "high",
                            },
                            {
                                num: "03",
                                title: "Zero Motion Design",
                                desc: "Completely static pages with no micro-interactions. For an AI consultancy, this feels disconnected from innovation.",
                                severity: "medium",
                            },
                            {
                                num: "04",
                                title: "Content-Heavy Cards",
                                desc: "Capabilities page presents dense text blocks with poor visual hierarchy. High bounce-rate risk for executive visitors.",
                                severity: "high",
                            },
                            {
                                num: "05",
                                title: "Weak Trust Signals",
                                desc: "No visible client count, certification badges, or proof-of-work metrics. Enterprise buyers need social proof immediately.",
                                severity: "high",
                            },
                            {
                                num: "06",
                                title: "Brand Disconnect",
                                desc: "The 'Think → Model → Act' identity is strong but the website doesn't deliver on that promise visually.",
                                severity: "medium",
                            },
                        ].map((issue, index) => (
                            <motion.div
                                key={issue.num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.06 }}
                                className={`group p-10 relative overflow-hidden cursor-default transition-all duration-400 ${d("bg-white/[0.02] hover:bg-white/[0.04]", "bg-white/80 hover:bg-white")
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xs text-brand-blue font-medium font-grotesk">{issue.num}</span>
                                        <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${issue.severity === "high"
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-amber-500/10 text-amber-400"
                                            }`}>
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

            {/* === SECTION 3: OUR VISION === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">02</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Our Vision
                        </h2>
                    </motion.div>

                    <motion.p {...fadeUp} className={`text-lg md:text-xl max-w-3xl mb-20 leading-relaxed font-light transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                        A complete digital transformation that positions AI4Enterprise as the definitive GenAI consulting
                        authority in British Columbia — and beyond. Every pixel engineered to convert enterprise visitors into clients.
                    </motion.p>

                    {/* Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {[
                            {
                                icon: <Monitor className="w-6 h-6" />,
                                title: "Premium Dark Experience",
                                desc: "A sophisticated dark-mode design with glassmorphism, subtle motion, and aurora gradients. Conveys innovation before a single word is read.",
                                tag: "Design",
                            },
                            {
                                icon: <Sparkles className="w-6 h-6" />,
                                title: "Motion & Micro-Interactions",
                                desc: "Scroll-triggered reveals, hover effects, and fluid transitions. The site should feel alive — matching the dynamism of AI itself.",
                                tag: "UX",
                            },
                            {
                                icon: <BarChart3 className="w-6 h-6" />,
                                title: "Trust & Social Proof Engine",
                                desc: "30+ organisations. 35+ years. Certified across 4 platforms. These metrics need to be impossible to miss with animated counters and certification badges.",
                                tag: "Conversion",
                            },
                            {
                                icon: <Layers className="w-6 h-6" />,
                                title: "Content Architecture Redesign",
                                desc: "Replace text walls with scannable, card-based layouts. Think → Model → Act becomes a visual journey, not just a logo.",
                                tag: "Strategy",
                            },
                            {
                                icon: <Smartphone className="w-6 h-6" />,
                                title: "Mobile-First Responsive",
                                desc: "Enterprise decision-makers browse on phones between meetings. Every page optimized for thumb-friendly navigation and fast load times.",
                                tag: "Performance",
                            },
                            {
                                icon: <Search className="w-6 h-6" />,
                                title: "SEO & Discovery Suite",
                                desc: "Structured data, meta optimization, blog indexing, and page speed improvements. Rank for 'GenAI consulting Victoria BC' and related queries.",
                                tag: "Growth",
                            },
                        ].map((card, index) => (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`p-10 rounded-3xl group hover:-translate-y-1 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-brand-blue transition-colors ${d("bg-brand-blue/10 group-hover:bg-brand-blue/20", "bg-blue-50 group-hover:bg-blue-100")}`}>
                                        {card.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest px-3 py-1 border rounded-full ${d("text-brand-blue/60 border-brand-blue/10", "text-brand-blue/70 border-blue-100")}`}>
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

            {/* === SECTION 4: TECH STACK === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-brand-blue/[0.03] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/50 to-transparent")}`}>
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">03</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Technology
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Next.js 15", desc: "React framework", icon: <Code2 className="w-5 h-5" /> },
                            { name: "TypeScript", desc: "Type safety", icon: <Shield className="w-5 h-5" /> },
                            { name: "Framer Motion", desc: "Animations", icon: <Sparkles className="w-5 h-5" /> },
                            { name: "Tailwind CSS", desc: "Design system", icon: <Layers className="w-5 h-5" /> },
                            { name: "Vercel", desc: "Edge deployment", icon: <Globe className="w-5 h-5" /> },
                            { name: "AI Chatbot", desc: "Lead capture", icon: <Bot className="w-5 h-5" /> },
                            { name: "Analytics", desc: "Conversion tracking", icon: <BarChart3 className="w-5 h-5" /> },
                            { name: "SEO Suite", desc: "Search visibility", icon: <Search className="w-5 h-5" /> },
                        ].map((tech, index) => (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className={`p-6 rounded-2xl text-center group hover:-translate-y-1 transition-all duration-300 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 text-brand-blue transition-colors ${d("bg-white/[0.05] group-hover:bg-brand-blue/10", "bg-blue-50 group-hover:bg-blue-100")
                                    }`}>
                                    {tech.icon}
                                </div>
                                <div className="text-sm font-medium font-grotesk mb-1">{tech.name}</div>
                                <div className={`text-[11px] uppercase tracking-wider transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{tech.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 5: OUR PROCESS === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">04</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Our Process
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            {
                                phase: "01",
                                title: "Discovery",
                                duration: "Week 1",
                                items: ["Brand deep-dive workshop", "Content audit & IA", "Competitor analysis", "Technical requirements"],
                                icon: <Search className="w-5 h-5" />,
                            },
                            {
                                phase: "02",
                                title: "Design",
                                duration: "Week 2–3",
                                items: ["UI/UX wireframes", "High-fidelity mockups", "Motion design spec", "Mobile-first prototypes"],
                                icon: <Sparkles className="w-5 h-5" />,
                            },
                            {
                                phase: "03",
                                title: "Build",
                                duration: "Week 3–5",
                                items: ["Next.js development", "Animation engineering", "CMS integration", "SEO implementation"],
                                icon: <Code2 className="w-5 h-5" />,
                            },
                            {
                                phase: "04",
                                title: "Launch",
                                duration: "Week 5–6",
                                items: ["QA & browser testing", "Performance tuning", "Domain migration", "Analytics setup"],
                                icon: <Rocket className="w-5 h-5" />,
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={step.phase}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                                className={`p-8 rounded-3xl relative group hover:-translate-y-2 transition-all duration-400 cursor-default ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")
                                    }`}
                            >
                                {/* Connecting Line */}
                                {index < 3 && (
                                    <div className={`hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] transition-colors duration-700 ${d("bg-white/10", "bg-slate-200")}`} />
                                )}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-10 h-10 rounded-full border border-brand-blue/30 flex items-center justify-center text-brand-blue">
                                        {step.icon}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>{step.duration}</span>
                                </div>
                                <div className="text-xs text-brand-blue font-medium font-grotesk mb-2">{step.phase}</div>
                                <h4 className="text-xl mb-6 font-grotesk">{step.title}</h4>
                                <ul className="space-y-3">
                                    {step.items.map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 6: WHY TRIXODE === */}
            <section className="relative px-6 md:px-16 py-32 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">05</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Why Trixode
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {[
                            {
                                value: "10+",
                                label: "Projects Shipped",
                                desc: "Across AI agents, web platforms, and growth engines",
                                icon: <Zap className="w-6 h-6" />,
                            },
                            {
                                value: "Victoria, BC",
                                label: "Local Team",
                                desc: "Same city, same community. We understand the BC tech ecosystem.",
                                icon: <MapPin className="w-6 h-6" />,
                            },
                            {
                                value: "24h",
                                label: "Response Guarantee",
                                desc: "Every message answered within one business day. No exceptions.",
                                icon: <Clock className="w-6 h-6" />,
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-10 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-400 ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue transition-colors ${d("bg-brand-blue/10 group-hover:bg-brand-blue/20", "bg-blue-50 group-hover:bg-blue-100")
                                    }`}>
                                    {stat.icon}
                                </div>
                                <div
                                    className="text-3xl md:text-4xl font-light text-brand-blue mb-2 font-grotesk"
                                    style={{ textShadow: d("0 0 20px rgba(59, 130, 246, 0.3)", "none") }}
                                >
                                    {stat.value}
                                </div>
                                <div className={`text-xs uppercase tracking-widest mb-3 transition-colors duration-700 ${d("text-white/40", "text-slate-400")}`}>{stat.label}</div>
                                <p className={`text-sm transition-colors duration-700 ${d("text-white/30", "text-slate-500")}`}>{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Differentiators */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            "AI-native agency — we build with AI, not just about AI",
                            "Full-service: design, development, SEO, and AI integration",
                            "Direct access to founding team — no account managers in between",
                            "Fellow VIATEC community members — we share your values",
                        ].map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className={`flex items-center gap-4 p-6 border rounded-xl group hover:translate-x-2 transition-all duration-400 ${d("border-white/[0.06] hover:border-white/10", "border-slate-200/80 hover:border-slate-300 bg-white/50")
                                    }`}
                            >
                                <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                                <span className={`text-sm transition-colors ${d("text-white/60 group-hover:text-white/80", "text-slate-600 group-hover:text-slate-800")}`}>{point}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SECTION 7: INVESTMENT & NEXT STEPS === */}
            <section className={`relative px-6 md:px-16 py-32 z-10 ${d("bg-gradient-to-b from-transparent via-brand-blue/[0.03] to-transparent", "bg-gradient-to-b from-transparent via-blue-50/50 to-transparent")}`}>
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className={`flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-20 pb-8 border-b transition-colors duration-700 ${d("border-white/10", "border-slate-200")}`}>
                        <span className="text-sm text-brand-blue font-medium font-grotesk">06</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light max-w-[600px] leading-tight font-grotesk">
                            Next Steps
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Website Package */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`p-10 rounded-3xl relative overflow-hidden group ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-md")
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <span className={`inline-block text-[10px] uppercase tracking-widest text-brand-blue px-3 py-1 border rounded-full mb-6 ${d("border-brand-blue/20", "border-blue-200")}`}>
                                    Recommended
                                </span>
                                <h3 className="text-2xl font-grotesk mb-2">Website Renovation</h3>
                                <p className={`text-sm mb-8 leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                    Complete redesign and rebuild of ai4enterprise.ca with premium design,
                                    motion engineering, SEO, and mobile optimization.
                                </p>
                                <div className="mb-8">
                                    <div className={`text-[10px] uppercase tracking-widest mb-2 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>Investment</div>
                                    <div className="text-4xl font-light text-brand-blue font-grotesk" style={{ textShadow: d("0 0 20px rgba(59, 130, 246, 0.3)", "none") }}>
                                        $4,999
                                    </div>
                                    <div className={`text-sm mt-1 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>One-time project fee</div>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Full UI/UX redesign (5–7 pages)",
                                        "Next.js + Framer Motion build",
                                        "Mobile-first responsive",
                                        "SEO optimization & structured data",
                                        "Vercel deployment & domain setup",
                                        "30 days post-launch support",
                                    ].map((item) => (
                                        <li key={item} className={`flex items-start gap-2 text-sm transition-colors duration-700 ${d("text-white/50", "text-slate-500")}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Add-Ons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className={`p-10 rounded-3xl ${d("glass", "bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm")
                                }`}
                        >
                            <h3 className="text-2xl font-grotesk mb-2">Optional Add-Ons</h3>
                            <p className={`text-sm mb-8 leading-relaxed transition-colors duration-700 ${d("text-white/40", "text-slate-500")}`}>
                                Enhance the core package with additional capabilities tailored to your needs.
                            </p>
                            <div className="space-y-4">
                                {[
                                    { name: "AI Chatbot Integration", price: "$1,500", desc: "Trained on your content, captures leads 24/7" },
                                    { name: "SEO & Content Strategy", price: "$999/mo", desc: "Ongoing content, keyword tracking, and reporting" },
                                    { name: "Blog & CMS System", price: "$1,200", desc: "Easy content management with markdown support" },
                                    { name: "Analytics Dashboard", price: "$800", desc: "Real-time visitor insights and conversion tracking" },
                                    { name: "Ongoing Maintenance", price: "$499/mo", desc: "Updates, monitoring, and priority support" },
                                ].map((addon) => (
                                    <div
                                        key={addon.name}
                                        className={`flex items-center justify-between p-4 border rounded-xl transition-colors ${d("border-white/[0.06] hover:border-white/10", "border-slate-200/80 hover:border-slate-300")
                                            }`}
                                    >
                                        <div>
                                            <div className="text-sm font-medium">{addon.name}</div>
                                            <div className={`text-[11px] mt-0.5 transition-colors duration-700 ${d("text-white/30", "text-slate-400")}`}>{addon.desc}</div>
                                        </div>
                                        <span className="text-sm text-brand-blue font-grotesk whitespace-nowrap ml-4">{addon.price}</span>
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
                            href="mailto:hello@trixode.com?subject=AI4Enterprise%20Website%20Renovation"
                            className="inline-flex items-center gap-4 px-10 py-5 bg-brand-blue text-white text-sm uppercase tracking-widest rounded-full hover:bg-brand-blue/90 transition-all duration-300 group"
                        >
                            <span>Let&apos;s Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <div className={`mt-6 flex items-center justify-center gap-4 text-xs transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                            <span>hello@trixode.com</span>
                            <span>•</span>
                            <span>Victoria, BC</span>
                            <span>•</span>
                            <span>trixode-studios.com</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer Bar */}
            <footer className={`relative z-10 border-t px-6 md:px-16 py-8 transition-colors duration-700 ${d("border-white/[0.06]", "border-slate-200")}`}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Trixode Studios" width={100} height={28} className={`opacity-50 transition-all duration-700 ${d("invert", "")}`} />
                    </div>
                    <div className={`text-[11px] uppercase tracking-widest transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                        Confidential — Prepared exclusively for AI4Enterprise
                    </div>
                    <div className={`text-[11px] transition-colors duration-700 ${d("text-white/20", "text-slate-400")}`}>
                        © 2026 Trixode Studios
                    </div>
                </div>
            </footer>
        </div>
    )
}
