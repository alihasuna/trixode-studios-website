"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Bot, Globe, Rocket, CheckCircle2 } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function ServicesPage() {
    useMagneticEffect()

    const services = [
        {
            id: "seo",
            icon: Rocket,
            title: "AI SEO",
            subtitle: "Data-Driven Search Dominance",
            description: "Our AI-driven SEO approach goes beyond traditional keyword stuffing. We use advanced machine learning models to analyze search intent, predict trends, and optimize your content ecosystem for maximum visibility.",
            features: [
                "Predictive Keyword Analysis",
                "Automated Content Optimization",
                "Competitor Strategy Decoding",
                "Technical SEO Automation",
                "Voice Search Optimization"
            ],
            price: "$999",
            gradient: "from-[#3b82f6] to-[#60a5fa]"
        },
        {
            id: "webdev",
            icon: Globe,
            title: "Full Website Dev",
            subtitle: "Performance-First Digital Experiences",
            description: "We build websites that are not just digital business cards but powerful growth engines. Using the latest frameworks like Next.js and React, we ensure lightning-fast performance, elite accessibility, and stunning visual aesthetics.",
            features: [
                "Headless CMS Architecture",
                "React & Next.js Frameworks",
                "3D WebGL Interactions",
                "Global CDN Deployment",
                "Mobile-First Responsive Design"
            ],
            price: "$1,499",
            gradient: "from-[#8b5cf6] to-[#a78bfa]"
        },
        {
            id: "agentic",
            icon: Bot,
            title: "Agentic AI Bespoke Systems",
            subtitle: "Autonomous Workflows for Enterprise",
            description: "Step into the future with custom agentic AI systems designed for your specific business needs. We build autonomous agents that can plan, execute, and verify complex workflows, reducing operational friction and unlocking new capabilities.",
            features: [
                "Custom LLM Fine-Tuning",
                "Multi-Agent Orchestration",
                "Secure Enterprise Integration",
                "Automated Decision Pipelines",
                "Real-time Data Processing"
            ],
            price: "$19,999",
            gradient: "from-[#10b981] to-[#34d399]"
        }
    ]

    return (
        <div className="min-h-screen bg-[#030303] text-white overflow-hidden">
            <CustomCursor />
            <FloatingNav />

            {/* Background Aurora */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    className="absolute w-[800px] h-[800px] -top-40 -right-40 rounded-full blur-[120px] opacity-20"
                    style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" }}
                    animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[600px] h-[600px] bottom-0 left-0 rounded-full blur-[100px] opacity-20"
                    style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" }}
                    animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
                    backgroundSize: "100px 100px",
                }}
            />

            <div className="pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <Link
                            href="/"
                            className="magnetic inline-flex items-center text-white/50 hover:text-white transition-colors duration-300 font-medium group"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-24"
                    >
                        <h1 className="text-6xl md:text-8xl font-light mb-8 font-['Space_Grotesk',sans-serif]">
                            Our <span className="text-[#3b82f6]">Services</span>
                        </h1>
                        <p className="text-xl text-white/50 max-w-2xl leading-relaxed font-light">
                            We combine cutting-edge technology with strategic expertise to deliver solutions that drive measurable business impact.
                        </p>
                    </motion.div>

                    <div className="space-y-32">
                        {services.map((service, index) => (
                            <section key={service.id} id={service.id} className="relative scroll-mt-32">
                                {/* Decorative Line */}
                                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 h-full z-0" />

                                <motion.div
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`grid lg:grid-cols-2 gap-16 items-center relative z-10 ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}
                                >
                                    {/* Content Side */}
                                    <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-light font-['Space_Grotesk',sans-serif]">{service.title}</h2>
                                        </div>

                                        <h3 className="text-xl text-white/80 font-medium">{service.subtitle}</h3>
                                        <p className="text-white/50 text-lg leading-relaxed">{service.description}</p>

                                        <ul className="space-y-4">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-3 text-white/70">
                                                    <CheckCircle2 className="w-5 h-5 text-[#3b82f6]" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="pt-8 flex items-center gap-8 border-t border-white/10">
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Starting At</div>
                                                <div className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif]">{service.price}<span className="text-sm font-normal text-white/40 ml-1">/mo</span></div>
                                            </div>
                                            <button className="magnetic px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-wider hover:bg-[#3b82f6] hover:text-white transition-all duration-300 flex items-center gap-2 group">
                                                Start Project
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Visual Side */}
                                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500 min-h-[400px] flex items-center justify-center">
                                            {/* Dynamic Background for Card */}
                                            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                                            <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${service.gradient} blur-[80px] opacity-20 block`} />

                                            <div className="relative z-10 text-center">
                                                <service.icon className="w-32 h-32 mx-auto text-white/20 mb-8 stroke-1" />
                                                <div className="text-sm uppercase tracking-[0.3em] text-white/40 font-['Space_Grotesk',sans-serif]">
                                                    Professional Grade
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </section>
                        ))}
                    </div>

                    {/* CTA */}
                    <section className="mt-40 text-center">
                        <div className="glass p-16 rounded-[3rem] relative overflow-hidden max-w-4xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 via-transparent to-[#8b5cf6]/10" />
                            <h2 className="text-4xl md:text-5xl font-light mb-8 font-['Space_Grotesk',sans-serif] relative z-10">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto relative z-10">
                                Schedule a free consultation with our experts to discuss your specific needs and goals.
                            </p>
                            <Link href="/contact" className="magnetic relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-[#3b82f6] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-colors">
                                Get in Touch
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </section>

                </div>
            </div>
            <Footer />
        </div>
    )
}
