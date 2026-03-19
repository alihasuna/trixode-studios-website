"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Globe,
    Bot,
    Rocket,
    Sparkles,
    Shield,
    ShieldCheck,
    Zap,
    BarChart3,
} from "lucide-react"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const websitePackages = [
    {
        tier: "The Lead Engine",
        badge: "Most Popular",
        price: "$4,999",
        timeline: "2–3 weeks",
        description: "Your website captures leads while you sleep. AI chatbot answers questions 24/7, smart forms qualify visitors, and sub-2-second load times mean nobody bounces.",
        gradient: "from-brand-blue/20 to-brand-cyan/10",
        borderGlow: "group-hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]",
        popular: true,
        guarantee: "30-day satisfaction guarantee",
        features: [
            "Up to 8 pages, premium responsive design",
            "AI chatbot for 24/7 lead capture",
            "Smart lead-capture forms + CRM integration",
            "Sub-2-second load time, mobile-first",
            "SEO-ready architecture + Google Analytics",
            "Blog / CMS system",
            "2 rounds of revisions + 60-day support",
        ],
    },
    {
        tier: "The Lead Engine Pro",
        badge: "Full Power",
        price: "$9,999",
        timeline: "4–6 weeks",
        description: "A world-class digital experience that makes your company look 10x its size. WebGL effects, advanced AI, and everything built to convert.",
        gradient: "from-brand-purple/20 to-brand-blue/10",
        borderGlow: "group-hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]",
        guarantee: "30-day satisfaction guarantee",
        features: [
            "Unlimited pages, fully custom design",
            "Advanced AI chatbot (lead-qualifying)",
            "WebGL / 3D effects & premium animations",
            "Multi-language support",
            "E-commerce or booking integration",
            "Full technical SEO audit & optimization",
            "A/B testing setup",
            "3 revision rounds + 90-day priority support",
        ],
    },
]

const retainerPlans = [
    {
        tier: "Care Plan",
        price: "$499",
        period: "/mo",
        features: [
            "Hosting, security & uptime monitoring",
            "Monthly backups & updates",
            "2 hours of content updates",
            "Bug fixes & performance checks",
        ],
    },
    {
        tier: "Growth Plan",
        price: "$1,499",
        period: "/mo",
        popular: true,
        features: [
            "Everything in Care Plan",
            "8 hours of dev / new features",
            "Monthly performance report",
            "A/B test management",
            "Monthly strategy call",
            "Conversion optimization",
        ],
    },
]

const seoPlans = [
    {
        tier: "Page One Engine",
        price: "$999",
        period: "/mo",
        guarantee: "Page 1 ranking for 3 keywords in 90 days, or next month free",
        features: [
            "Keyword research & content strategy",
            "4 SEO-optimized articles / month",
            "On-page optimization",
            "Monthly ranking & traffic report",
            "3-month minimum commitment",
        ],
    },
    {
        tier: "Page One Domination",
        price: "$2,499",
        period: "/mo",
        popular: true,
        guarantee: "Page 1 for 5 keywords in 90 days, or next month free",
        features: [
            "Everything in Page One Engine",
            "10 articles / month + content calendar",
            "Competitor gap analysis",
            "Technical SEO audit & fixes",
            "Weekly report + revenue attribution",
            "6-month minimum commitment",
        ],
    },
]

const aiPackages = [
    {
        tier: "The Autopilot Agent",
        price: "$7,500",
        timeline: "2–3 weeks",
        description:
            "One AI agent that handles one workflow end-to-end. Customer support, lead qualification, or appointment booking — running 24/7 without human intervention.",
        guarantee: "Working demo in 2 weeks or full refund",
        features: [
            "Single-purpose AI agent for your workflow",
            "Integration with 1–2 tools (CRM, email, Slack)",
            "Trained on your business data (RAG)",
            "Monitoring dashboard",
            "30-day post-launch support",
        ],
    },
    {
        tier: "The Autopilot System",
        price: "$20,000+",
        timeline: "6–10 weeks",
        popular: true,
        description:
            "Multiple AI agents orchestrated together to automate entire business processes. Your team focuses on strategy while AI handles the execution.",
        guarantee: "Pilot results in 4 weeks or full refund",
        features: [
            "Multi-agent orchestration",
            "Unlimited integrations (CRM, ERP, custom APIs)",
            "Custom fine-tuning + RAG on proprietary data",
            "Full analytics dashboard",
            "Employee training + documentation",
            "90-day support + monthly optimization",
        ],
    },
]

const processSteps = [
    {
        step: "01",
        title: "Discovery",
        desc: "Free 30-min AI audit. We screen-share, analyze your business, and identify exactly where AI creates the most impact.",
        icon: Sparkles,
    },
    {
        step: "02",
        title: "Strategy",
        desc: "We build the roadmap: what to build, in what order, with clear milestones and measurable KPIs.",
        icon: BarChart3,
    },
    {
        step: "03",
        title: "Build",
        desc: "Iterative development with weekly demos. You see progress every week and stay in control.",
        icon: Zap,
    },
    {
        step: "04",
        title: "Launch & Scale",
        desc: "We deploy, monitor, and optimize. Ongoing support as your business grows.",
        icon: Shield,
    },
]

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
}

const stagger = (i: number, base = 0) => ({
    ...fadeUp,
    transition: { duration: 0.5, delay: base + i * 0.08 },
})

/* ------------------------------------------------------------------ */
/*  Reusable Components                                                */
/* ------------------------------------------------------------------ */

function SectionHeader({
    num,
    title,
    subtitle,
    icon: Icon,
}: {
    num: string
    title: string
    subtitle: string
    icon: React.ElementType
}) {
    return (
        <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-sm text-brand-blue font-medium font-grotesk tracking-wider">{num}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight font-grotesk mb-4">{title}</h2>
            <p className="text-lg text-black/50 dark:text-white/50 max-w-2xl leading-relaxed">{subtitle}</p>
        </motion.div>
    )
}

function FeatureItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.li
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay }}
            className="flex items-start gap-3 text-[15px] text-black/70 dark:text-white/70"
        >
            <CheckCircle2 className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" />
            <span>{children}</span>
        </motion.li>
    )
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
    const [activeTab, setActiveTab] = useState<"websites" | "seo" | "ai">("websites")
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
    useMagneticEffect()

    return (
        <>
            {isDesktop && <CustomCursor />}
            <FloatingNav />

            <main className="min-h-screen bg-transparent text-black dark:text-white">
                {/* Background Effects */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div
                        className="absolute w-[600px] h-[600px] -top-40 -left-40 rounded-full blur-[80px] opacity-25"
                        style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)" }}
                    />
                    <div
                        className="absolute w-[500px] h-[500px] top-1/2 -right-20 rounded-full blur-[80px] opacity-20"
                        style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)" }}
                    />
                    <div
                        className="absolute w-[400px] h-[400px] bottom-20 left-1/3 rounded-full blur-[80px] opacity-20"
                        style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }}
                    />
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

                {/* ============================================================ */}
                {/*  HERO                                                         */}
                {/* ============================================================ */}
                <section className="relative px-6 md:px-16 pt-36 pb-20 md:pt-44 md:pb-32">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="flex items-center gap-4 mb-6"
                        >
                            <Link
                                href="/"
                                className="magnetic flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 hover:text-brand-blue transition-colors"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Home
                            </Link>
                            <div className="w-8 h-[1px] bg-brand-blue" style={{ boxShadow: "0 0 10px rgba(59,130,246,0.4)" }} />
                            <span className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-grotesk">
                                Services & Pricing
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-[1.05] tracking-tight font-grotesk"
                        >
                            <span className="block">Stop Losing Leads.</span>
                            <span className="block bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                                Start Growing Revenue.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="text-lg md:text-xl text-black/50 dark:text-white/50 max-w-2xl leading-relaxed font-light"
                        >
                            Every service comes with a guarantee. Pick the system that fits your business. We&apos;ll build it fast, and it&apos;ll start working while you sleep.
                        </motion.p>
                    </div>
                </section>

                {/* ============================================================ */}
                {/*  SERVICE CATEGORY TABS                                        */}
                {/* ============================================================ */}
                <section className="relative px-6 md:px-16 pb-8">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="glass inline-flex rounded-2xl p-1.5 gap-1"
                        >
                            {[
                                { key: "websites" as const, label: "Websites", icon: Globe },
                                { key: "seo" as const, label: "AI SEO", icon: Rocket },
                                { key: "ai" as const, label: "AI Agents", icon: Bot },
                            ].map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`magnetic relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${activeTab === key
                                        ? "text-white"
                                        : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                        }`}
                                >
                                    {activeTab === key && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{label}</span>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/*  WEBSITES SECTION                                             */}
                {/* ============================================================ */}
                <AnimatePresence mode="wait">
                    {activeTab === "websites" && (
                        <motion.section
                            key="websites"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative px-6 md:px-16 py-16 md:py-24"
                        >
                            <div className="max-w-6xl mx-auto">
                                <SectionHeader
                                    num="01"
                                    title="The Lead Engine"
                                    subtitle="High-performance AI websites that capture leads 24/7, load in under 2 seconds, and make your business look 10x its size."
                                    icon={Globe}
                                />

                                {/* Website Package Cards */}
                                <div className="grid md:grid-cols-2 gap-6 mb-24 max-w-4xl">
                                    {websitePackages.map((pkg, i) => (
                                        <motion.div
                                            key={pkg.tier}
                                            {...stagger(i, 0.1)}
                                            className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${pkg.borderGlow}`}
                                        >
                                            {/* Popular badge */}
                                            {pkg.popular && (
                                                <div className="absolute top-0 left-0 right-0 z-10">
                                                    <div className="mx-auto w-fit px-4 py-1.5 bg-gradient-to-r from-brand-blue to-brand-purple text-white text-xs font-medium tracking-wider uppercase rounded-b-xl">
                                                        Most Popular
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className={`glass h-full p-8 md:p-10 rounded-3xl flex flex-col bg-gradient-to-br ${pkg.gradient} ${pkg.popular ? "border-brand-blue/30 dark:border-brand-blue/20" : ""
                                                    }`}
                                            >
                                                {/* Header */}
                                                <div className="mb-8">
                                                    <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-3 font-grotesk">
                                                        {pkg.badge}
                                                    </div>
                                                    <h3 className="text-2xl font-medium font-grotesk mb-2">{pkg.tier}</h3>
                                                    <div className="flex items-baseline gap-2">
                                                        <span
                                                            className="text-4xl md:text-5xl font-light text-brand-blue font-grotesk"
                                                            style={{ textShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                                                        >
                                                            {pkg.price}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-black/40 dark:text-white/40 mt-2">
                                                        Delivered in {pkg.timeline}
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-8">
                                                    {pkg.description}
                                                </p>

                                                {/* Features */}
                                                <ul className="flex flex-col gap-3 mb-10 flex-1">
                                                    {pkg.features.map((f, fi) => (
                                                        <FeatureItem key={f} delay={0.3 + fi * 0.05}>
                                                            {f}
                                                        </FeatureItem>
                                                    ))}
                                                </ul>

                                                {/* Guarantee */}
                                                {pkg.guarantee && (
                                                    <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{pkg.guarantee}</span>
                                                    </div>
                                                )}

                                                {/* CTA */}
                                                <a
                                                    href="#cta"
                                                    className="magnetic inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-medium uppercase tracking-wider transition-all duration-300 border border-black/10 dark:border-white/10 hover:border-brand-blue hover:text-brand-blue group/btn"
                                                >
                                                    <span>Book Free Strategy Call</span>
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Website Retainer Plans */}
                                <motion.div {...fadeUp} className="mb-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
                                            <Shield className="w-4 h-4 text-brand-purple" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-light font-grotesk">
                                            Ongoing Care & Growth
                                        </h3>
                                    </div>
                                    <p className="text-black/50 dark:text-white/50 max-w-xl mb-10">
                                        We don&apos;t build and disappear. Keep your site fast, secure, and always improving.
                                    </p>
                                </motion.div>

                                <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
                                    {retainerPlans.map((plan, i) => (
                                        <motion.div
                                            key={plan.tier}
                                            {...stagger(i, 0.1)}
                                            className={`glass p-8 rounded-3xl group hover:-translate-y-1 transition-all duration-400 ${plan.popular ? "border-brand-purple/30 dark:border-brand-purple/20" : ""
                                                }`}
                                        >
                                            <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-2 font-grotesk">
                                                {plan.tier}
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-6">
                                                <span className="text-3xl font-light text-brand-purple font-grotesk">{plan.price}</span>
                                                <span className="text-sm text-black/40 dark:text-white/40">{plan.period}</span>
                                            </div>
                                            <ul className="flex flex-col gap-3">
                                                {plan.features.map((f) => (
                                                    <li key={f} className="flex items-start gap-3 text-[14px] text-black/60 dark:text-white/60">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple mt-0.5 shrink-0" />
                                                        <span>{f}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* ============================================================ */}
                    {/*  SEO SECTION                                                  */}
                    {/* ============================================================ */}
                    {activeTab === "seo" && (
                        <motion.section
                            key="seo"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative px-6 md:px-16 py-16 md:py-24"
                        >
                            <div className="max-w-6xl mx-auto">
                                <SectionHeader
                                    num="02"
                                    title="Page One Engine"
                                    subtitle="We turn Google into your #1 salesperson. Predictive keyword analysis, AI-generated content, and reporting tied directly to revenue."
                                    icon={Rocket}
                                />

                                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                                    {seoPlans.map((plan, i) => (
                                        <motion.div
                                            key={plan.tier}
                                            {...stagger(i, 0.1)}
                                            className={`group relative rounded-3xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.1)]`}
                                        >
                                            {plan.popular && (
                                                <div className="absolute top-0 left-0 right-0 z-10">
                                                    <div className="mx-auto w-fit px-4 py-1.5 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-medium tracking-wider uppercase rounded-b-xl">
                                                        Best Value
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className={`glass h-full p-8 md:p-10 rounded-3xl flex flex-col ${plan.popular ? "border-brand-blue/30 dark:border-brand-blue/20" : ""
                                                    }`}
                                            >
                                                <div className="mb-8">
                                                    <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-2 font-grotesk">
                                                        {plan.tier}
                                                    </div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span
                                                            className="text-4xl md:text-5xl font-light text-brand-blue font-grotesk"
                                                            style={{ textShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                                                        >
                                                            {plan.price}
                                                        </span>
                                                        <span className="text-sm text-black/40 dark:text-white/40">{plan.period}</span>
                                                    </div>
                                                </div>

                                                <ul className="flex flex-col gap-3 mb-10 flex-1">
                                                    {plan.features.map((f, fi) => (
                                                        <FeatureItem key={f} delay={0.2 + fi * 0.05}>
                                                            {f}
                                                        </FeatureItem>
                                                    ))}
                                                </ul>

                                                {/* Guarantee */}
                                                {plan.guarantee && (
                                                    <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{plan.guarantee}</span>
                                                    </div>
                                                )}

                                                <a
                                                    href="#cta"
                                                    className="magnetic inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-medium uppercase tracking-wider transition-all duration-300 border border-black/10 dark:border-white/10 hover:border-brand-blue hover:text-brand-blue group/btn"
                                                >
                                                    <span>Book Free Strategy Call</span>
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    )}

                    {/* ============================================================ */}
                    {/*  AI AGENTS SECTION                                            */}
                    {/* ============================================================ */}
                    {activeTab === "ai" && (
                        <motion.section
                            key="ai"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="relative px-6 md:px-16 py-16 md:py-24"
                        >
                            <div className="max-w-6xl mx-auto">
                                <SectionHeader
                                    num="03"
                                    title="The Autopilot System"
                                    subtitle="Your business, running on autopilot. We build autonomous AI agents designed specifically for your workflows and processes."
                                    icon={Bot}
                                />

                                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                                    {aiPackages.map((pkg, i) => (
                                        <motion.div
                                            key={pkg.tier}
                                            {...stagger(i, 0.1)}
                                            className="group relative rounded-3xl overflow-hidden transition-all duration-500"
                                        >
                                            {pkg.popular && (
                                                <div className="absolute top-0 left-0 right-0 z-10">
                                                    <div className="mx-auto w-fit px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-brand-cyan text-white text-xs font-medium tracking-wider uppercase rounded-b-xl">
                                                        Most Popular
                                                    </div>
                                                </div>
                                            )}

                                            <div
                                                className={`glass h-full p-8 md:p-10 rounded-3xl flex flex-col ${pkg.popular ? "border-emerald-500/30 dark:border-emerald-500/20" : ""
                                                    }`}
                                            >
                                                <div className="mb-6">
                                                    <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-2 font-grotesk">
                                                        {pkg.tier}
                                                    </div>
                                                    <div className="flex items-baseline gap-1 mb-1">
                                                        <span
                                                            className="text-3xl md:text-4xl font-light text-emerald-500 font-grotesk"
                                                            style={{ textShadow: "0 0 20px rgba(16,185,129,0.3)" }}
                                                        >
                                                            {pkg.price}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-black/40 dark:text-white/40">
                                                        Timeline: {pkg.timeline}
                                                    </div>
                                                </div>

                                                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-8">
                                                    {pkg.description}
                                                </p>

                                                <ul className="flex flex-col gap-3 mb-10 flex-1">
                                                    {pkg.features.map((f, fi) => (
                                                        <FeatureItem key={f} delay={0.2 + fi * 0.05}>
                                                            {f}
                                                        </FeatureItem>
                                                    ))}
                                                </ul>

                                                {/* Guarantee */}
                                                {pkg.guarantee && (
                                                    <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{pkg.guarantee}</span>
                                                    </div>
                                                )}

                                                <a
                                                    href="#cta"
                                                    className="magnetic inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-medium uppercase tracking-wider transition-all duration-300 border border-black/10 dark:border-white/10 hover:border-emerald-500 hover:text-emerald-500 group/btn"
                                                >
                                                    <span>Book Free Strategy Call</span>
                                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>



                {/* ============================================================ */}
                {/*  HOW IT WORKS                                                  */}
                {/* ============================================================ */}
                <section className="relative px-6 md:px-16 py-16 md:py-24 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="max-w-6xl mx-auto">
                        <SectionHeader
                            num="04"
                            title="How It Works"
                            subtitle="From first call to launch in as little as two weeks. Here's the process."
                            icon={Sparkles}
                        />

                        <div className="grid md:grid-cols-4 gap-6">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={step.step}
                                    {...stagger(i, 0.1)}
                                    className="glass p-8 rounded-3xl group hover:-translate-y-1 transition-all duration-400 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors">
                                            <step.icon className="w-5 h-5 text-brand-blue" />
                                        </div>
                                        <div className="text-xs text-brand-blue font-medium font-grotesk mb-3">{step.step}</div>
                                        <h4 className="text-xl font-medium font-grotesk mb-3">{step.title}</h4>
                                        <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/*  WHY TRIXODE                                                   */}
                {/* ============================================================ */}
                <section className="relative px-6 md:px-16 py-16 md:py-24">
                    <div className="max-w-6xl mx-auto">
                        <motion.div {...fadeUp} className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-light font-grotesk mb-6">
                                Why Trixode?
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[
                                {
                                    icon: Sparkles,
                                    color: "brand-purple",
                                    gradient: "from-purple-500/20 to-violet-500/10",
                                    borderColor: "border-purple-400/20",
                                    glowColor: "rgba(139,92,246,0.4)",
                                    title: "Built by Scientists",
                                    desc: "Founded by researchers in Physics and Material Science. We don't just integrate AI — we engineer it from first principles.",
                                },
                                {
                                    icon: Zap,
                                    color: "brand-blue",
                                    gradient: "from-blue-500/20 to-cyan-500/10",
                                    borderColor: "border-blue-400/20",
                                    glowColor: "rgba(59,130,246,0.4)",
                                    title: "Sub-2s Load Time",
                                    desc: "Every site we build loads in under 2 seconds. Test our own site and see.",
                                },
                                {
                                    icon: Bot,
                                    color: "brand-cyan",
                                    gradient: "from-cyan-500/20 to-teal-500/10",
                                    borderColor: "border-cyan-400/20",
                                    glowColor: "rgba(6,182,212,0.4)",
                                    title: "AI-Native",
                                    desc: "Every website ships with AI features. Your leads get answered at 3am, not just during office hours.",
                                },
                                {
                                    icon: ShieldCheck,
                                    color: "amber-400",
                                    gradient: "from-amber-400/20 to-yellow-500/10",
                                    borderColor: "border-amber-400/20",
                                    glowColor: "rgba(251,191,36,0.4)",
                                    title: "Enterprise-Grade Security",
                                    desc: "ISO 27001-aligned processes, SOC 2 compatible architecture, and GDPR-compliant data handling as standard.",
                                },
                                {
                                    icon: Shield,
                                    color: "emerald-400",
                                    gradient: "from-emerald-500/20 to-green-500/10",
                                    borderColor: "border-emerald-400/20",
                                    glowColor: "rgba(52,211,153,0.4)",
                                    title: "We Don't Disappear",
                                    desc: "Ongoing support, monthly reporting, and a team that grows your site every month.",
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    {...stagger(i, 0.1)}
                                    className="glass p-8 rounded-3xl text-center group hover:-translate-y-1 transition-all duration-400"
                                >
                                    <div className="mb-4 flex justify-center">
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center ${item.borderColor} border`}>
                                            <item.icon className={`w-6 h-6 text-${item.color}`} style={{ filter: `drop-shadow(0 0 8px ${item.glowColor})` }} />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-medium font-grotesk mb-2">{item.title}</h4>
                                    <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================================ */}
                {/*  CTA                                                           */}
                {/* ============================================================ */}
                <section id="cta" className="relative px-6 md:px-16 py-24 md:py-40">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Glow background */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div
                                    className="w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
                                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
                                />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light font-grotesk mb-8 leading-tight">
                                    Your competitors are{" "}
                                    <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                                        already using AI
                                    </span>
                                </h2>

                                <p className="text-lg text-black/50 dark:text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">
                                    Book a free 30-minute strategy call. We&apos;ll audit your current setup, identify the biggest revenue leak, and give you a clear plan — whether you hire us or not.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="mailto:hello@trixode.com"
                                        className="magnetic inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white rounded-2xl text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity"
                                    >
                                        <span>Book Free Strategy Call</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="mailto:hello@trixode.com"
                                        className="magnetic inline-flex items-center justify-center gap-3 px-8 py-4 border border-black/10 dark:border-white/10 rounded-2xl text-sm font-medium uppercase tracking-wider hover:border-brand-blue hover:text-brand-blue transition-all"
                                    >
                                        <span>hello@trixode.com</span>
                                    </a>
                                </div>

                                <p className="text-xs text-black/30 dark:text-white/30 mt-8 uppercase tracking-widest">
                                    24-hour response guaranteed
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    )
}
