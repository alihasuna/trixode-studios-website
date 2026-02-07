"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Github, Linkedin, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

export default function ContactPage() {
  useMagneticEffect()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      console.error('Contact form error:', error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Background Aurora Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-30"
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
          className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-30"
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
          className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-30"
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
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />

      <div className="pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-light mb-16 text-black dark:text-white font-grotesk"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get in
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black dark:from-white to-black/50 dark:to-white/50">Touch</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10" />
                <h2 className="text-3xl font-light mb-8 text-black dark:text-white font-grotesk">Send Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-green-300 font-medium text-sm">
                      Message sent successfully! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-300 font-medium text-sm">
                      Failed to send message. Please try again or email us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors ${errors.name ? "border-red-500/50" : "focus:border-brand-blue"
                          }`}
                        required
                      />
                      <label
                        className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.name ? "text-red-400" : ""
                          }`}
                      >
                        Your Name
                      </label>
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors ${errors.email ? "border-red-500/50" : "focus:border-brand-blue"
                          }`}
                        required
                      />
                      <label
                        className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.email ? "text-red-400" : ""
                          }`}
                      >
                        Email Address
                      </label>
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        rows={6}
                        className={`peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 text-black dark:text-white outline-none transition-colors resize-none ${errors.message ? "border-red-500/50" : "focus:border-brand-blue"
                          }`}
                        required
                      />
                      <label
                        className={`absolute left-0 top-4 text-black/50 dark:text-white/50 transition-all peer-focus:text-brand-blue peer-focus:text-xs peer-focus:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 pointer-events-none ${errors.message ? "text-red-400" : ""
                          }`}
                      >
                        Tell us about your project...
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
                      {isSubmitting ? "Sending..." : "Send Message"} <Send className="h-4 w-4" />
                    </span>
                    <div className="absolute inset-0 bg-brand-blue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5 relative overflow-hidden">
                <h2 className="text-3xl font-light mb-8 text-black dark:text-white font-grotesk">Contact Info</h2>

                <div className="space-y-8">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue group-hover:text-brand-blue transition-all duration-300">
                      <Mail className="h-5 w-5 hover:text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">Email</h3>
                      <a
                        href="mailto:ceo@trixode-studios.com"
                        className="text-lg text-black dark:text-white hover:text-brand-blue transition-colors font-light"
                      >
                        ceo@trixode-studios.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue group-hover:text-brand-blue transition-all duration-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">Locations</h3>
                      <p className="text-lg text-black dark:text-white font-light">Victoria, BC, Canada</p>
                      <p className="text-lg text-black dark:text-white font-light">Quito, Ecuador</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:border-brand-blue group-hover:text-brand-blue transition-all duration-300">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-black/50 dark:text-white/50 uppercase tracking-widest mb-1 font-grotesk">Response Time</h3>
                      <p className="text-lg text-black dark:text-white font-light">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glass p-2 rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden h-64 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.4268!2d-123.3703512!3d48.4285154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f738ad41f3453%3A0x1e3e5d4d5f5f5f5f!2s341%20Quebec%20St%2C%20Victoria%2C%20BC%20V8V%201W4%2C%20Canada!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.2) brightness(0.8)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl opacity-70 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Social Links */}
              <div className="glass p-10 rounded-3xl border border-black/5 dark:border-white/5">
                <h2 className="text-xl font-light mb-8 text-black dark:text-white font-grotesk">Follow Us</h2>

                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/trixodestudios", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/trixode-studios-054154311/", label: "LinkedIn" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="magnetic w-14 h-14 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
