"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Code2, Sparkles, Users, Mail } from "lucide-react"
import WelcomeLoader from "@/components/ui/WelcomeLoader"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import NeonBlob from "@/components/hero/NeonBlob"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import ServicesSection from "@/components/home/ServicesSection"

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true)

    // Enable magnetic effect for all .magnetic elements
    useMagneticEffect()

    return (
        <>
            {/* Welcome Loader Animation */}
            <WelcomeLoader onLoadingComplete={() => setIsLoading(false)} />

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Floating Navigation */}
            <FloatingNav />

            {/* Main Page Content */}
            <motion.div
                className="min-h-screen bg-[#030303] text-white overflow-hidden origin-top"
                initial={{ scale: 1.1, filter: "blur(10px)" }}
                animate={{
                    scale: isLoading ? 1.1 : 1,
                    filter: isLoading ? "blur(10px)" : "blur(0px)"
                }}
                transition={{
                    duration: 1.2,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.2
                }}
            >

                {/* Background Aurora Effects */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <motion.div
                        className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-40"
                        style={{
                            background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                        }}
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-40"
                        style={{
                            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                        }}
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <motion.div
                        className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-40"
                        style={{
                            background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)",
                        }}
                        animate={{
                            x: [0, 40, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>

                {/* Grid Overlay */}
                <div
                    className="fixed inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
                        backgroundSize: "100px 100px",
                    }}
                />

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-32 pb-20">
                    <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        {/* Hero Text */}
                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.2 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="w-10 h-[1px] bg-[#3b82f6]" style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }} />
                                <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-['Space_Grotesk',sans-serif]">
                                    Victoria, BC / Software Studio
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-[0.95] tracking-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3.4 }}
                            >
                                <motion.div
                                    className="overflow-hidden"
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    transition={{ duration: 1, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <motion.span
                                        className="block font-['Space_Grotesk',sans-serif]"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        Crafting
                                    </motion.span>
                                </motion.div>
                                <motion.div
                                    className="overflow-hidden"
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    transition={{ duration: 1, delay: 3.7, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <motion.span
                                        className="block bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent font-['Space_Grotesk',sans-serif]"
                                        initial={{ y: "100%" }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 3.7, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        Intelligence
                                    </motion.span>
                                </motion.div>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 3.9 }}
                                className="text-lg text-white/50 mb-12 max-w-[500px] leading-relaxed font-light"
                            >
                                Advanced software infrastructure for AI research and scientific computing. We build elegant systems that
                                empower innovators.
                            </motion.p>

                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 4.1 }}
                                className="magnetic inline-flex items-center gap-4 px-8 py-4 border border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group"
                            >
                                <span className="relative z-10">Start a Project</span>
                                <ArrowRight className="w-4 h-4 relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </motion.a>
                        </div>

                        {/* Hero Visual - Floating Cards */}
                        <div className="relative h-[600px] hidden lg:block">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]">
                                    <div className="w-full h-full">
                                        <NeonBlob />
                                    </div>
                                </div>
                                {/* Card 1 */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        className="w-[340px] pointer-events-auto cursor-pointer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            x: [380, 0, -380, 0, 380],
                                            y: [0, 120, 0, -120, 0],
                                            scale: [1, 1.1, 1, 0.8, 1],
                                            zIndex: [10, 20, 10, 1, 10]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.2 },
                                            default: {
                                                duration: 40,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: -13.3 // Start at 1/3 orbit
                                            }
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -10 }}
                                            className="glass p-8 rounded-3xl w-full h-full"
                                        >
                                            <div
                                                className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                            >
                                                99.9%
                                            </div>
                                            <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Uptime SLA</div>
                                            <div className="text-lg text-white">Enterprise Ready</div>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Card 2 */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        className="w-[320px] pointer-events-auto cursor-pointer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            x: [380, 0, -380, 0, 380],
                                            y: [0, 120, 0, -120, 0],
                                            scale: [1, 1.1, 1, 0.8, 1],
                                            zIndex: [10, 20, 10, 1, 10]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.3 },
                                            default: {
                                                duration: 40,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: -26.6 // Start at 2/3 orbit
                                            }
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -10 }}
                                            className="glass p-8 rounded-3xl w-full h-full"
                                        >
                                            <div
                                                className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                            >
                                                50+
                                            </div>
                                            <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Research Labs</div>
                                            <div className="text-lg text-white">Global Partners</div>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Card 3 */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                        className="w-[300px] pointer-events-auto cursor-pointer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: 1,
                                            x: [380, 0, -380, 0, 380],
                                            y: [0, 120, 0, -120, 0],
                                            scale: [1, 1.1, 1, 0.8, 1],
                                            zIndex: [10, 20, 10, 1, 10]
                                        }}
                                        transition={{
                                            opacity: { duration: 0.8, delay: 0.4 },
                                            default: {
                                                duration: 40,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: 0 // Start at 0/3 orbit
                                            }
                                        }}
                                        style={{ perspective: 1000 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -10 }}
                                            className="glass p-8 rounded-3xl w-full h-full"
                                        >
                                            <div
                                                className="text-5xl font-light text-[#3b82f6] mb-2 font-['Space_Grotesk',sans-serif]"
                                                style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                                            >
                                                10x
                                            </div>
                                            <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Performance</div>
                                            <div className="text-lg text-white">vs Traditional</div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ServicesSection />

                {/* Expertise Section */}
                <section id="expertise" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">01</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Core Systems
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/[0.08]">
                            {[
                                {
                                    num: "01",
                                    title: "Neural Infrastructure",
                                    desc: "Distributed training platforms and model serving architectures.",
                                },
                                {
                                    num: "02",
                                    title: "Scientific Computing",
                                    desc: "High-performance frameworks for research workloads.",
                                },
                                {
                                    num: "03",
                                    title: "Creative Intelligence",
                                    desc: "Generative systems for human-AI collaboration.",
                                },
                                {
                                    num: "04",
                                    title: "Data Architecture",
                                    desc: "Stream processing and visualization pipelines.",
                                },
                                { num: "05", title: "Cloud Systems", desc: "Scalable infrastructure with enterprise security." },
                                {
                                    num: "06",
                                    title: "Lab Automation",
                                    desc: "Intelligent workflow orchestration systems.",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.num}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-[rgba(255,255,255,0.02)] p-12 relative overflow-hidden cursor-pointer hover:bg-white/[0.06] transition-all duration-400"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                    <div className="relative z-10">
                                        <div className="text-xs text-[#3b82f6] mb-8 font-medium font-['Space_Grotesk',sans-serif] group-hover:translate-x-2 transition-transform duration-300">
                                            {item.num}
                                        </div>
                                        <h3 className="text-2xl mb-4 font-normal group-hover:translate-x-2 transition-transform duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-white/50 leading-relaxed group-hover:translate-x-2 transition-transform duration-300">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">02</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Selected Work
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {[
                                { year: "2025", name: "GenomeAnalyzer Pro", category: "Bioinformatics" },
                                { year: "2025", name: "Visionary Studio", category: "Creative Tools" },
                                { year: "2024", name: "InsightFlow", category: "Data Science" },
                                { year: "2024", name: "LabAssistant AI", category: "Automation" },
                            ].map((project, index) => (
                                <motion.a
                                    key={project.name}
                                    href="#"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="magnetic group grid grid-cols-1 md:grid-cols-[100px_1fr_200px_auto] gap-8 p-12 border border-white/[0.08] items-center relative overflow-hidden hover:border-white/20 hover:translate-x-5 transition-all duration-400"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    <span className="text-sm text-white/25 font-['Space_Grotesk',sans-serif] group-hover:text-[#3b82f6] transition-colors">
                                        {project.year}
                                    </span>
                                    <span className="text-3xl md:text-4xl font-normal font-['Space_Grotesk',sans-serif] relative">
                                        {project.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3b82f6] group-hover:w-full transition-all duration-400" />
                                    </span>
                                    <span className="text-sm uppercase tracking-widest text-white/50 group-hover:text-[#3b82f6] transition-colors">
                                        {project.category}
                                    </span>
                                    <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#3b82f6] group-hover:rotate-45 transition-all duration-400">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section id="team" className="relative px-6 md:px-16 py-40">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-end mb-24 pb-8 border-b border-white/10">
                            <span className="text-sm text-[#3b82f6] font-medium font-['Space_Grotesk',sans-serif]">03</span>
                            <h2 className="text-5xl md:text-7xl font-light max-w-[600px] leading-tight font-['Space_Grotesk',sans-serif]">
                                Leadership
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { initials: "JD", name: "Dr. Jane Doe", role: "Chief Scientist" },
                                { initials: "MS", name: "Mark Smith", role: "Lead Engineer" },
                                { initials: "EC", name: "Elena Chen", role: "Creative Director" },
                                { initials: "AK", name: "Alex Kim", role: "Product Lead" },
                            ].map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass p-12 rounded-3xl text-center cursor-pointer group hover:-translate-y-2 transition-all duration-400"
                                >
                                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-white/10 flex items-center justify-center text-2xl font-light font-['Space_Grotesk',sans-serif] group-hover:border-[#3b82f6] group-hover:scale-110 transition-all duration-400">
                                        {member.initials}
                                    </div>
                                    <h3 className="text-xl mb-2 font-normal">{member.name}</h3>
                                    <div className="text-sm uppercase tracking-widest text-white/50 group-hover:text-[#3b82f6] transition-colors">
                                        {member.role}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="relative px-6 md:px-16 py-40 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
                                    Let's build something extraordinary.
                                </h3>
                                <p className="text-white/50 mb-12 leading-relaxed text-lg">
                                    We're currently accepting new partnerships for Q2 2025. If you're working on challenging problems at
                                    the intersection of AI and science, we'd love to hear from you.
                                </p>

                                <div className="flex flex-col gap-4">
                                    <a
                                        href="mailto:hello@trixode.com"
                                        className="magnetic glass flex items-center justify-between p-6 rounded-2xl group hover:translate-x-2 transition-all duration-400"
                                    >
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-white/25 mb-1">Email</div>
                                            <div className="text-lg">hello@trixode.com</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-400" />
                                    </a>
                                    <a
                                        href="tel:+12505550127"
                                        className="magnetic glass flex items-center justify-between p-6 rounded-2xl group hover:translate-x-2 transition-all duration-400"
                                    >
                                        <div>
                                            <div className="text-xs uppercase tracking-widest text-white/25 mb-1">Phone</div>
                                            <div className="text-lg">+1 (250) 555-0127</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-400" />
                                    </a>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.form
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col gap-8"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    alert("Form submitted! (Demo only)")
                                }}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        id="name"
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors"
                                    />
                                    <label
                                        htmlFor="name"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Your Name
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        id="email"
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors"
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Email Address
                                    </label>
                                </div>

                                <div className="relative">
                                    <textarea
                                        placeholder=" "
                                        id="message"
                                        rows={4}
                                        className="peer w-full bg-transparent border-b border-white/10 py-4 text-white outline-none focus:border-[#3b82f6] transition-colors resize-none"
                                    />
                                    <label
                                        htmlFor="message"
                                        className="absolute left-0 top-4 text-white/50 transition-all peer-focus:text-[#3b82f6] peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4"
                                    >
                                        Tell us about your project
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="magnetic w-full py-5 border border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-[#3b82f6] transition-all duration-400"
                                >
                                    <span className="relative z-10">Send Message</span>
                                    <div className="absolute inset-0 bg-[#3b82f6] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400" />
                                </button>
                            </motion.form>
                        </div>
                    </div>
                </section>

                <Footer />
            </motion.div>
        </>
    )
}
