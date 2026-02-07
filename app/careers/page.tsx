"use client"

import type React from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Send, Code, Brain, Users, Zap } from "lucide-react"
import Footer from "@/components/footer"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

// Types
interface FormData {
  // Personal Info
  fullName: string
  email: string
  location: string
  portfolio: string
  linkedin: string

  // Hard Skills
  languages: string[]
  frameworks: string[]
  aiTools: string[]
  agenticTools: string[]
  yearsExperience: string
  bestProject: string

  // Agentic AI & MCP
  agenticExperience: string
  mcpKnowledge: string
  agentProject: string
  cliToolsExperience: string
  securityExperience: string

  // Soft Skills
  idealWorkday: string
  handleAmbiguity: string
  motivation: string
  communicationPref: string
  remoteExperience: string

  // Vibe Coding
  challengeType: string
  challengeContent: string
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  location: "",
  portfolio: "",
  linkedin: "",
  languages: [],
  frameworks: [],
  aiTools: [],
  agenticTools: [],
  yearsExperience: "",
  bestProject: "",
  agenticExperience: "",
  mcpKnowledge: "",
  agentProject: "",
  cliToolsExperience: "",
  securityExperience: "",
  idealWorkday: "",
  handleAmbiguity: "",
  motivation: "",
  communicationPref: "",
  remoteExperience: "",
  challengeType: "",
  challengeContent: "",
}

// Options
const languageOptions = ["JavaScript", "TypeScript", "Python", "Rust", "Go", "Java", "C#", "PHP", "Ruby", "Swift", "Kotlin", "SQL", "Other"]
const frameworkOptions = ["React", "Next.js", "Vue", "Svelte", "Angular", "Astro", "Node.js", "Express", "NestJS", "Django", "FastAPI", "Flask", "Laravel", "Tailwind CSS", "Supabase", "Prisma", "tRPC", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Vercel", "AWS", "Firebase", "Other"]
const aiToolOptions = ["Cursor", "Antigravity", "GitHub Copilot", "Claude", "ChatGPT", "Gemini", "Perplexity", "Codeium", "Tabnine", "Windsurf", "Aider", "Continue", "Other"]
const agenticToolOptions = ["LangChain", "LangGraph", "CrewAI", "AutoGPT", "OpenAI Assistants", "Anthropic MCP", "Vercel AI SDK", "LlamaIndex", "Semantic Kernel", "Haystack", "AutoGen", "SuperAGI", "Other"]
const cliToolOptions = ["Claude CLI", "OpenAI CLI", "GitHub CLI", "Terraform", "Ansible", "n8n", "Make/Integromat", "Zapier", "Bash/Shell", "Python Scripts", "Custom Pipelines", "Other"]
const securityToolOptions = ["Burp Suite", "OWASP ZAP", "Nmap", "Metasploit", "Wireshark", "Kali Linux", "Nessus", "SQLMap", "Hashcat", "Snyk", "Dependabot", "SonarQube", "Other"]
const experienceOptions = ["< 1 year", "1-2 years", "3-5 years", "5-10 years", "10+ years"]
const communicationOptions = ["Mostly async (Slack, email)", "Mostly sync (calls, meetings)", "Balanced mix"]

export default function CareersPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
  const prefersReducedMotion = useReducedMotion()
  const enableHeavyEffects = !prefersReducedMotion && isDesktop
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { title: "START", icon: Zap },
    { title: "INFO", icon: Users },
    { title: "SKILLS", icon: Code },
    { title: "AGENTS", icon: Brain },
    { title: "MINDSET", icon: Users },
    { title: "CHALLENGE", icon: Zap },
    { title: "DONE", icon: Check },
  ]

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Required"
      if (!formData.email.trim()) newErrors.email = "Required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email"
      if (!formData.location.trim()) newErrors.location = "Required"
    }

    if (currentStep === 2) {
      if (formData.languages.length === 0) newErrors.languages = "Select at least one"
      if (formData.aiTools.length === 0) newErrors.aiTools = "Select at least one"
      if (!formData.yearsExperience) newErrors.yearsExperience = "Required"
    }

    if (currentStep === 3) {
      if (!formData.agenticExperience.trim()) newErrors.agenticExperience = "Required"
    }

    if (currentStep === 4) {
      if (!formData.idealWorkday.trim()) newErrors.idealWorkday = "Required"
      if (!formData.handleAmbiguity.trim()) newErrors.handleAmbiguity = "Required"
      if (!formData.communicationPref) newErrors.communicationPref = "Required"
    }

    if (currentStep === 5) {
      if (!formData.challengeType) newErrors.challengeType = "Select an option"
      if (!formData.challengeContent.trim()) newErrors.challengeContent = "Required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (step === 0 || validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1))
      setErrors({})
    }
  }

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0))
    setErrors({})
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const currentValues = formData[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    setFormData((prev) => ({ ...prev, [field]: newValues }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setStep(6)
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  useMagneticEffect()

  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Background Aurora Effects */}
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
        <div className="max-w-5xl mx-auto px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Link>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((s, i) => (
                <div key={s.title} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 border-2 md:border-4 flex items-center justify-center font-black text-lg transition-all ${i <= step
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white dark:text-white"
                      : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-600 dark:text-gray-400"
                      }`}
                  >
                    {i < step ? <Check className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className={`mt-2 text-xs font-black uppercase tracking-wider hidden md:block ${i <= step ? "text-cyan-400" : "text-gray-500"
                    }`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 bg-cyan-500/20 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 rounded-full"
                style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            {/* Step 0: Hero */}
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none">
                  JOIN THE
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">FUTURE</span>
                </h1>

                <div className="border-2 border-cyan-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-sm p-8 mb-8 text-left rounded-xl">
                  <h2 className="text-2xl font-black mb-4 uppercase">We're hiring AI-native developers</h2>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    At Trixode Studios, we build fast using AI. We're looking for developers who
                    embrace vibe coding, leverage AI tools daily, and can turn ideas into
                    production-ready code at lightning speed.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: Code, text: "AI-first development" },
                      { icon: Zap, text: "Ship fast, iterate faster" },
                      { icon: Brain, text: "Think different, build different" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 text-cyan-400">
                        <item.icon className="w-5 h-5" />
                        <span className="font-bold">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-xl px-12 py-4 rounded-lg hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all uppercase tracking-wide inline-flex items-center gap-3"
                >
                  Apply Now
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-4xl font-black mb-8 uppercase">Tell us about yourself</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.fullName ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg`}
                      placeholder="Your full name"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1 font-bold">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.email ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1 font-bold">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.location ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg`}
                      placeholder="City, Country"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1 font-bold">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Portfolio / GitHub
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      LinkedIn (optional)
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Hard Skills */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-4xl font-black mb-8 uppercase">Your Tech Stack</h2>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Languages you use *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => handleMultiSelect("languages", lang)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.languages.includes(lang)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    {errors.languages && <p className="text-red-500 text-sm mt-2 font-bold">{errors.languages}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Frameworks
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {frameworkOptions.map((fw) => (
                        <button
                          key={fw}
                          type="button"
                          onClick={() => handleMultiSelect("frameworks", fw)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.frameworks.includes(fw)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {fw}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      AI Tools you use *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {aiToolOptions.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleMultiSelect("aiTools", tool)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.aiTools.includes(tool)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                    {errors.aiTools && <p className="text-red-500 text-sm mt-2 font-bold">{errors.aiTools}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Years of Experience *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {experienceOptions.map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, yearsExperience: exp }))
                            if (errors.yearsExperience) setErrors((prev) => ({ ...prev, yearsExperience: "" }))
                          }}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.yearsExperience === exp
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                    {errors.yearsExperience && <p className="text-red-500 text-sm mt-2 font-bold">{errors.yearsExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Best Project (describe briefly)
                    </label>
                    <textarea
                      name="bestProject"
                      value={formData.bestProject}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Tell us about a project you're proud of..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Agentic AI & MCP */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-4xl font-black mb-4 uppercase">Agentic AI & MCP</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                  We build AI agents and use MCP servers. Tell us about your experience.
                </p>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Agentic AI Tools You've Used
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {agenticToolOptions.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleMultiSelect("agenticTools", tool)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.agenticTools.includes(tool)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Describe your experience building AI agents *
                    </label>
                    <textarea
                      name="agenticExperience"
                      value={formData.agenticExperience}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.agenticExperience ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg`}
                      placeholder="Have you built autonomous agents, multi-agent systems, or AI workflows? What tools did you use?"
                    />
                    {errors.agenticExperience && <p className="text-red-500 text-sm mt-1 font-bold">{errors.agenticExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      What do you know about MCP (Model Context Protocol)?
                    </label>
                    <textarea
                      name="mcpKnowledge"
                      value={formData.mcpKnowledge}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Have you used Anthropic's MCP? Built MCP servers? Integrated MCP tools into agents? Tell us about it..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Describe an AI agent project you'd like to build
                    </label>
                    <textarea
                      name="agentProject"
                      value={formData.agentProject}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="What kind of autonomous system excites you? Research agents? Coding agents? Multi-modal agents?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      CLI AI Tools & Automation Platforms
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {cliToolOptions.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleMultiSelect("agenticTools", tool)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.agenticTools.includes(tool)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-[#0a0a1a] border-cyan-500/30 text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Tell us about your CLI tools & automation experience
                    </label>
                    <textarea
                      name="cliToolsExperience"
                      value={formData.cliToolsExperience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Do you use CLI AI tools? Built automations with n8n, Make, or Zapier? Custom shell scripts for dev workflows?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Security & Pen Testing Tools
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {securityToolOptions.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleMultiSelect("agenticTools", tool)}
                          className={`px-3 py-2 border-2 font-bold uppercase text-xs transition-all rounded-lg ${formData.agenticTools.includes(tool)
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-[#0a0a1a] border-cyan-500/30 text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Security & Pen Testing Experience
                    </label>
                    <textarea
                      name="securityExperience"
                      value={formData.securityExperience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Any experience with security audits, pen testing, OWASP top 10, or secure coding practices?"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Soft Skills */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-4xl font-black mb-8 uppercase">Your Mindset</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Describe your ideal workday *
                    </label>
                    <textarea
                      name="idealWorkday"
                      value={formData.idealWorkday}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.idealWorkday ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg`}
                      placeholder="When are you most productive? What does a great day look like?"
                    />
                    {errors.idealWorkday && <p className="text-red-500 text-sm mt-1 font-bold">{errors.idealWorkday}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      How do you handle ambiguity? *
                    </label>
                    <textarea
                      name="handleAmbiguity"
                      value={formData.handleAmbiguity}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.handleAmbiguity ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg`}
                      placeholder="What do you do when requirements are unclear?"
                    />
                    {errors.handleAmbiguity && <p className="text-red-500 text-sm mt-1 font-bold">{errors.handleAmbiguity}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      What motivates you?
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="What gets you excited about work?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-4">
                      Communication Preference *
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {communicationOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, communicationPref: opt }))
                            if (errors.communicationPref) setErrors((prev) => ({ ...prev, communicationPref: "" }))
                          }}
                          className={`px-3 py-2 border-2 font-bold text-sm transition-all rounded-lg ${formData.communicationPref === opt
                            ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                            : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-gray-700 dark:text-gray-300 hover:border-cyan-400"
                            }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {errors.communicationPref && <p className="text-red-500 text-sm mt-2 font-bold">{errors.communicationPref}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-black uppercase tracking-wide mb-2">
                      Remote Work Experience
                    </label>
                    <textarea
                      name="remoteExperience"
                      value={formData.remoteExperience}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 border-cyan-500/30 p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none rounded-lg"
                      placeholder="Have you worked remotely before? How did it go?"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Vibe Coding Challenge */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-4xl font-black mb-4 uppercase">The Vibe Check</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                  Show us how you use AI to solve problems. Pick one option.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { value: "walkthrough", label: "Write a walkthrough", desc: "Describe how you'd solve a problem with AI" },
                      { value: "video", label: "Link a video/demo", desc: "Share a recorded session of you coding with AI" },
                      { value: "github", label: "Share a repo", desc: "Link to AI-assisted code you've written" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, challengeType: opt.value, challengeContent: "" }))
                          if (errors.challengeType) setErrors((prev) => ({ ...prev, challengeType: "", challengeContent: "" }))
                        }}
                        className={`p-6 border-2 text-left transition-all rounded-xl ${formData.challengeType === opt.value
                          ? "bg-gradient-to-r from-blue-500 to-cyan-400 border-cyan-400 text-white"
                          : "bg-black/[0.03] dark:bg-[#0a0a1a] border-cyan-500/30 text-black dark:text-white hover:border-cyan-400"
                          }`}
                      >
                        <div className="font-black uppercase mb-2">{opt.label}</div>
                        <div className={`text-sm ${formData.challengeType === opt.value ? "text-white/70" : "text-gray-600 dark:text-gray-400"}`}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.challengeType && <p className="text-red-500 text-sm font-bold">{errors.challengeType}</p>}

                  {formData.challengeType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      <label className="block text-sm font-black uppercase tracking-wide mb-2">
                        {formData.challengeType === "walkthrough" && "Your Walkthrough *"}
                        {formData.challengeType === "video" && "Video/Demo Link *"}
                        {formData.challengeType === "github" && "GitHub Repo Link *"}
                      </label>
                      {formData.challengeType === "walkthrough" ? (
                        <textarea
                          name="challengeContent"
                          value={formData.challengeContent}
                          onChange={handleInputChange}
                          rows={8}
                          className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.challengeContent ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors resize-none font-mono rounded-lg`}
                          placeholder={`Example: "To build a todo app with AI, I would first prompt Claude to scaffold a Next.js project with TypeScript. Then I'd iterate on the component structure by..."`}
                        />
                      ) : (
                        <input
                          type="url"
                          name="challengeContent"
                          value={formData.challengeContent}
                          onChange={handleInputChange}
                          className={`w-full bg-black/[0.03] dark:bg-[#0a0a1a] border-2 ${errors.challengeContent ? "border-red-500" : "border-cyan-500/30"} p-4 text-black dark:text-white font-bold focus:border-cyan-400 focus:outline-none transition-colors rounded-lg`}
                          placeholder={formData.challengeType === "video" ? "https://loom.com/share/..." : "https://github.com/..."}
                        />
                      )}
                      {errors.challengeContent && <p className="text-red-500 text-sm mt-1 font-bold">{errors.challengeContent}</p>}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Check className="w-12 h-12 text-white" />
                </div>

                <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">
                  Application
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Received</span>
                </h2>

                <div className="border-2 border-cyan-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/10 p-8 mb-8 text-left max-w-xl mx-auto rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Thanks for applying, <span className="text-cyan-400 font-bold">{formData.fullName}</span>!
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    We'll review your application and get back to you within <span className="text-white font-bold">48 hours</span>.
                    Check your email for a confirmation.
                  </p>
                </div>

                <Link
                  href="/"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-xl px-12 py-4 rounded-lg hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wide inline-flex items-center gap-3"
                >
                  Back to Home
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step > 0 && step < 6 && (
            <div className="flex justify-between mt-12">
              <button
                onClick={prevStep}
                className="bg-black/[0.03] dark:bg-[#0a0a1a] text-black dark:text-white font-black px-8 py-4 border-2 border-cyan-500/30 rounded-lg hover:border-cyan-400 transition-all uppercase tracking-wide inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black px-8 py-4 rounded-lg hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wide inline-flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black px-8 py-4 rounded-lg hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/25 transition-all uppercase tracking-wide inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <Send className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 border-2 border-red-500 bg-red-500/10 text-red-400 font-bold rounded-lg"
            >
              Failed to submit application. Please try again or email us at ceo@trixode-studios.com
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
