"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Github, Linkedin, Mail, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer"
import MobileMenu from "@/components/mobile-menu"

// Connected Hexagon Logo Component
const ConnectedHexagonLogo = ({ size = 32, className = "" }: { size?: number; className?: string }) => {
  const hexagonPoints = []
  const center = size / 2
  const radius = size * 0.35

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    hexagonPoints.push({ x, y })
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <polygon
          points={hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-blue-400"
        />
        {hexagonPoints.map((point, i) => (
          <g key={i}>
            <line
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-400/60"
            />
            <circle cx={point.x} cy={point.y} r="2" fill="currentColor" className="text-blue-400" />
          </g>
        ))}
        <circle cx={center} cy={center} r="2" fill="currentColor" className="text-blue-400" />
      </svg>
    </div>
  )
}

export default function ContactPage() {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would send the data to your backend
      console.log("Form submitted:", formData)

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
      setErrors({})
    } catch (error) {
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
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/15 to-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a1a]/80 backdrop-blur-xl border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <ConnectedHexagonLogo size={32} />
              <span className="text-xl font-black text-white">Trixode Studios</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {["People", "About", "Projects", "Blog"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item}
                </Link>
              ))}
              <Link href="/contact" className="text-cyan-400 font-black">
                Contact
              </Link>
            </div>

            {/* Mobile Menu */}
            <MobileMenu currentPath="/contact" />
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 relative z-10">
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
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-16 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            GET IN
            <br />
            TOUCH
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-8 text-white">SEND MESSAGE</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-green-300 font-semibold">
                      Message sent successfully! We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                    <p className="text-red-300 font-semibold">
                      Failed to send message. Please try again or email us directly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-black text-gray-300 mb-2">NAME</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-blue-900/20 border text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/20 transition-all duration-300 font-semibold ${
                        errors.name
                          ? "border-red-500/50 focus:border-red-400"
                          : "border-cyan-500/30 focus:border-cyan-400"
                      }`}
                      placeholder="Your name"
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-400 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black text-gray-300 mb-2">EMAIL</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-blue-900/20 border text-white placeholder-gray-400 rounded-xl focus:ring-cyan-400/20 transition-all duration-300 font-semibold ${
                        errors.email
                          ? "border-red-500/50 focus:border-red-400"
                          : "border-cyan-500/30 focus:border-cyan-400"
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-400 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black text-gray-300 mb-2">MESSAGE</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full bg-blue-900/20 border text-white placeholder-gray-400 rounded-xl focus:ring-blue-400/20 transition-all duration-300 resize-none font-semibold ${
                        errors.message
                          ? "border-red-500/50 focus:border-red-400"
                          : "border-blue-500/30 focus:border-blue-400"
                      }`}
                      placeholder="Tell us about your project..."
                      required
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-400 font-medium">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 font-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
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
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-8 text-white">CONTACT INFO</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-xl flex items-center justify-center">
                      <Mail className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <h3 className="font-black text-white mb-1">EMAIL</h3>
                      <a
                        href="mailto:hello@trixodestudios.com"
                        className="text-gray-300 font-semibold hover:text-cyan-300 transition-colors"
                      >
                        hello@trixodestudios.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-black text-white mb-1">LOCATION</h3>
                      <p className="text-gray-300 font-semibold">Victoria, BC, Canada</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="font-black text-white mb-1">RESPONSE TIME</h3>
                      <p className="text-gray-300 font-semibold">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-6 text-white">FIND US</h2>
                <div className="w-full h-64 rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83326.84493156316!2d-123.42914!3d48.4284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548f738bddb06171%3A0x384ea2ba9681b302!2sVictoria%2C%20BC%2C%20Canada!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 backdrop-blur-sm border border-pink-400/20 rounded-2xl p-8">
                <h2 className="text-3xl font-black mb-8 text-white">FOLLOW US</h2>

                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/trixodestudios", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com/company/trixodestudios", label: "LinkedIn" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 rounded-xl flex items-center justify-center hover:from-cyan-500/30 hover:to-blue-600/30 hover:border-cyan-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6 text-blue-300" />
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
