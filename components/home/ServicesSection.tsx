"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
    {
        tag: "SEO",
        title: "AI SEO",
        description: "Perfect for brands seeking max efficiency and ROI by outsourcing the entire SEO and content process.",
        price: "$999",
        link: "/services#seo"
    },
    {
        tag: "WEB DEVELOPMENT",
        title: "FULL WEBSITE DEV",
        description: "We will develop a product of any complexity for you, which will take your business to a new level with the snap of a finger.",
        price: "$1,499",
        link: "/services#webdev"
    },
    {
        tag: "AI SYSTEMS",
        title: "AGENTIC AI BESPOKE SYSTEMS",
        description: "We have highly qualified specialists in various fields. With our team, you can develop solutions of any complexity for your business.",
        price: "$19,999",
        link: "/services#agentic"
    }
]

export default function ServicesSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [200, -200])
    const y3 = useTransform(scrollYProgress, [0, 1], [150, -150])

    const yTransforms = [y1, y2, y3]

    return (
        <section ref={containerRef} id="services" className="relative px-6 md:px-16 py-40 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex justify-between items-end mb-24 pb-8 border-b border-white/10">
                    <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">02</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-light text-white font-['Space_Grotesk',sans-serif] tracking-tight text-center uppercase"
                    >
                        Services
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            style={{ y: yTransforms[index] }}
                            className="magnetic glass p-8 md:p-10 rounded-[2rem] flex flex-col justify-between h-[500px] relative group border border-white/10 hover:border-white/20 transition-all duration-500 will-change-transform"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-[#3b82f6] text-xs font-bold rounded-full mb-8 font-['Space_Grotesk',sans-serif] tracking-wider uppercase group-hover:bg-[#3b82f6]/10 transition-colors">
                                    {service.tag}
                                </span>

                                <h3 className="text-2xl md:text-3xl font-light mb-4 font-['Space_Grotesk',sans-serif] uppercase leading-tight text-white group-hover:text-[#3b82f6] transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-white/50 text-lg leading-relaxed mb-6">
                                    {service.description}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <div className="mb-6">
                                    <span className="block text-sm font-bold uppercase tracking-wider text-white/30 mb-1">Starting At</span>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl md:text-5xl font-light font-['Space_Grotesk',sans-serif] text-white">{service.price}</span>
                                        <span className="text-white/30 ml-1 font-medium">/mo</span>
                                    </div>
                                </div>

                                <Link
                                    href={service.link}
                                    className="block w-full"
                                >
                                    <div className="bg-white/5 border border-white/10 text-white rounded-full py-4 px-6 flex items-center justify-center gap-2 group-hover:bg-[#3b82f6] group-hover:border-[#3b82f6] transition-all duration-300">
                                        <span className="text-sm font-bold tracking-widest uppercase">Get More</span>
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
