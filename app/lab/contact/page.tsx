"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Send, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import LabFooter from "@/components/lab/LabFooter"
import LabFloatingNav from "@/components/lab/LabFloatingNav"
import CustomCursor from "@/components/ui/CustomCursor"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function LabContactPage() {
    useMagneticEffect()
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
    const prefersReducedMotion = useReducedMotion()
    const enableHeavyEffects = !prefersReducedMotion && isDesktop

    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const validateForm = () => {
        const next: { [key: string]: string } = {}
        if (!formData.name.trim()) next.name = "Your name helps us reply properly."
        if (!formData.email.trim()) next.email = "We'll need an email to write back."
        else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = "That doesn't look like a valid email."
        if (!formData.message.trim()) next.message = "Tell us a little about the workflow."
        else if (formData.message.trim().length < 10) next.message = "A bit more context, please — at least 10 characters."
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        setIsSubmitting(true)
        setSubmitStatus("idle")
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                setSubmitStatus("success")
                setFormData({ name: "", email: "", message: "" })
                setErrors({})
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            console.error("Lab contact form error:", error)
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
            <CustomCursor />
            <LabFloatingNav />

            {/* Aurora */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {enableHeavyEffects ? (
                    <>
                        <motion.div
                            className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-30"
                            style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" }}
                            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-30"
                            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" }}
                            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-30"
                            style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)" }}
                            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                ) : (
                    <>
                        <div className="absolute w-[400px] h-[400px] -top-20 -left-20 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)" }} />
                        <div className="absolute w-[350px] h-[350px] top-1/3 -right-10 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)" }} />
                        <div className="absolute w-[300px] h-[300px] bottom-0 left-1/3 rounded-full blur-[60px] opacity-20" style={{ background: "radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)" }} />
                    </>
                )}
            </div>

            {/* Grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "100px 100px",
                }}
            />

            <main className="pt-32 pb-20 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12"
                    >
                        <Link
                            href="/lab"
                            className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to the lab
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-10 h-[1px] bg-brand-blue" style={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                            Talk to the lab
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl font-light mb-8 text-black dark:text-white font-grotesk leading-[1.05]"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Get in
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-black dark:from-white to-black/50 dark:to-white/50">
                            touch.
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-lg text-black/60 dark:text-white/60 mb-16 max-w-xl leading-relaxed font-light"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        Tell us about the agentic workflow you're working on. We'll reply within a day with what
                        we'd measure first.
                    </motion.p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10" />
                                <h2 className="text-3xl font-light mb-8 text-black dark:text-white font-grotesk">
                                    Send a note
                                </h2>

                                {submitStatus === "success" && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                        <p className="text-green-400 dark:text-green-300 font-medium text-sm">
                                            Thanks — your note is in. We&apos;ll reply within a day.
                                        </p>
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                        <p className="text-red-400 dark:text-red-300 font-medium text-sm">
                                            Something went sideways. Try again, or email us directly at ceo@trixode-studios.com.
                                        </p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <div className="relative">
                                            <input
                                                id="contact-name"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder=" "
                                                className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors ${errors.name ? "border-red-500/50" : "focus:border-brand-blue"}`}
                                                required
                                            />
                                            <label htmlFor="contact-name" className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.name ? "text-red-400" : ""}`}>
                                                Your name
                                            </label>
                                        </div>
                                        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <div className="relative">
                                            <input
                                                id="contact-email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder=" "
                                                className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors ${errors.email ? "border-red-500/50" : "focus:border-brand-blue"}`}
                                                required
                                            />
                                            <label htmlFor="contact-email" className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.email ? "text-red-400" : ""}`}>
                                                Email address
                                            </label>
                                        </div>
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <div className="relative">
                                            <textarea
                                                id="contact-message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder=" "
                                                rows={6}
                                                className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors resize-none ${errors.message ? "border-red-500/50" : "focus:border-brand-blue"}`}
                                                required
                                            />
                                            <label htmlFor="contact-message" className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.message ? "text-red-400" : ""}`}>
                                                What workflow are you thinking about?
                                            </label>
                                        </div>
                                        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="magnetic w-full py-5 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest relative overflow-hidden group hover:border-brand-blue transition-all duration-400 bg-black/[0.02] dark:bg-white/[0.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isSubmitting ? "Sending..." : "Send note"} <Send className="h-4 w-4" />
                                        </span>
                                        <div className="absolute inset-0 bg-brand-blue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                                    </button>
                                </form>

                                <div className="mt-10 pt-10 border-t border-black/10 dark:border-white/10">
                                    <h3 className="text-sm font-medium mb-6 text-black dark:text-white uppercase tracking-widest font-grotesk">
                                        Prefer the long form?
                                    </h3>
                                    <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed">
                                        If you'd rather walk us through your workflow step by step, the{" "}
                                        <Link href="/lab/workflow" className="text-brand-blue underline underline-offset-2 decoration-brand-blue/40 hover:decoration-brand-blue">
                                            workflow form
                                        </Link>{" "}
                                        asks about industry, autonomy level, sensitive data, and infrastructure — six
                                        steps, no pressure.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5">
                                <h2 className="text-3xl font-light mb-8 text-black dark:text-white font-grotesk">
                                    Direct lines
                                </h2>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue transition-all duration-300">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">
                                                Email
                                            </h3>
                                            <a
                                                href="mailto:ceo@trixode-studios.com"
                                                className="text-lg text-black dark:text-white hover:text-brand-blue transition-colors font-light"
                                            >
                                                ceo@trixode-studios.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue transition-all duration-300">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">
                                                Where we are
                                            </h3>
                                            <p className="text-lg text-black dark:text-white font-light">Victoria, BC · Canada</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue transition-all duration-300">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">
                                                Reply time
                                            </h3>
                                            <p className="text-lg text-black dark:text-white font-light">Within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5">
                                <h2 className="text-xl font-light mb-6 text-black dark:text-white font-grotesk">
                                    What to expect
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { num: "1", text: "Send us the rough shape of your workflow." },
                                        { num: "2", text: "We respond with what we'd measure first — and what we wouldn't touch yet." },
                                        { num: "3", text: "If it's a fit, we set up a short call. No deck." },
                                    ].map((step) => (
                                        <div key={step.num} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium flex items-center justify-center flex-shrink-0">
                                                {step.num}
                                            </div>
                                            <p className="text-black/60 dark:text-white/60 font-light text-sm leading-relaxed">
                                                {step.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <LabFooter />
        </div>
    )
}
