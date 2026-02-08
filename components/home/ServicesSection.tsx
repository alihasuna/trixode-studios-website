"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const services = [
    {
        tag: "AI SEO & GROWTH",
        title: "AI SEO & GROWTH ENGINE",
        description: "AI-powered content strategy, predictive keyword analysis, and automated optimization. Monthly reporting that shows exactly where your traffic and revenue are growing.",
        price: "$999",
        priceSuffix: "/mo",
        secondaryPrice: null,
        ctaText: "Learn More",
        link: "/services#seo"
    },
    {
        tag: "AI-POWERED WEBSITES",
        title: "AI-POWERED WEBSITES",
        description: "High-performance Next.js sites with AI chatbots, smart forms, and conversion optimization baked in. Built to load fast, rank high, and turn visitors into customers.",
        price: "$4,999",
        priceSuffix: "",
        secondaryPrice: "or $1,499/mo retainer",
        ctaText: "Learn More",
        link: "/services#webdev"
    },
    {
        tag: "CUSTOM AI AGENTS",
        title: "CUSTOM AI AGENTS & AUTOMATION",
        description: "Autonomous AI agents that handle workflows, integrate with your CRM and tools, and eliminate the manual work slowing your team down. Built for your specific business.",
        price: "$15,000",
        priceSuffix: "+",
        secondaryPrice: "Based on scope & complexity",
        ctaText: "Book a Call",
        link: "/contact"
    }
]

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()
    const isMobile = useIsMobile()
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const shouldReduce = prefersReducedMotion || isMobile
    const y1 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [100, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [200, -200])
    const y3 = useTransform(scrollYProgress, [0, 1], shouldReduce ? [0, 0] : [150, -150])

    const yTransforms = [y1, y2, y3]

    return (
        <section ref={containerRef} id="services" className="relative px-6 md:px-16 py-40 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-24 pb-8 border-b border-black/10 dark:border-white/10">
                    <span className="text-sm text-brand-blue font-medium font-grotesk">01</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-light text-black dark:text-white font-grotesk tracking-tight text-center uppercase"
                    >
                        Services
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            style={{ y: yTransforms[index] }}
                            className="magnetic glass p-8 md:p-10 rounded-[2rem] flex flex-col justify-between min-h-[420px] md:min-h-[500px] relative group border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 will-change-transform"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-blue text-xs font-bold rounded-full mb-8 font-grotesk tracking-wider uppercase group-hover:bg-brand-blue/10 transition-colors">
                                    {service.tag}
                                </span>

                                <h3 className="text-2xl md:text-3xl font-light mb-4 font-grotesk uppercase leading-tight text-black dark:text-white group-hover:text-brand-blue transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-black/50 dark:text-white/50 text-lg leading-relaxed mb-6">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6">
                                    {service.price ? (
                                        <>
                                            <span className="block text-sm font-bold uppercase tracking-wider text-black/30 dark:text-white/30 mb-1">Starting At</span>
                                            <div className="flex items-baseline">
                                                <span className="text-4xl md:text-5xl font-light font-grotesk text-black dark:text-white">{service.price}</span>
                                                {service.priceSuffix && <span className="text-black/30 dark:text-white/30 ml-1 font-medium">{service.priceSuffix}</span>}
                                            </div>
                                            {service.secondaryPrice && (
                                                <span className="block text-sm text-black/40 dark:text-white/40 mt-1">{service.secondaryPrice}</span>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <span className="block text-sm font-bold uppercase tracking-wider text-black/30 dark:text-white/30 mb-1">Pricing</span>
                                            <span className="text-2xl md:text-3xl font-light font-grotesk text-black dark:text-white">Custom</span>
                                            <span className="block text-sm text-black/40 dark:text-white/40 mt-1">Based on scope & requirements</span>
                                        </>
                                    )}
                                </div>

                                <Link
                                    href={service.link}
                                    className="block w-full"
                                >
                                    <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-300">
                                        <span className="text-sm font-bold tracking-widest uppercase">{service.ctaText}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
