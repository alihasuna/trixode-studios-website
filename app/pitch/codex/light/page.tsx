"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brain,
  CheckCircle2,
  Gauge,
  Handshake,
  Languages,
  Moon,
  ShieldCheck,
  Timer,
  TrendingUp,
} from "lucide-react"

interface OfferPath {
  name: string
  fit: string
  timeline: string
  investment: string
  paymentStructure: string
  estimatedOutcome: string
  includes: string[]
  decision: string
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
}

const meetingClosingLines = [
  "Your market credibility is already premium; this engagement makes your digital experience match it.",
  "Today we only need one decision: Foundation Build or Authority Engine.",
  "Once selected, we book the 90-minute blueprint in 72 hours and begin execution immediately.",
]

const talkTrackSteps = [
  {
    segment: "Minute 0-1",
    objective: "Frame the upside",
    keyLine: "The opportunity is not visibility. It is conversion architecture for premium clients.",
  },
  {
    segment: "Minute 1-2",
    objective: "Show evidence",
    keyLine: "Current technical profile slows trust before your strongest authority signals appear.",
  },
  {
    segment: "Minute 2-4",
    objective: "Explain psychology",
    keyLine: "When clarity and prestige are sequenced correctly, hesitation drops and action rises.",
  },
  {
    segment: "Minute 4-6",
    objective: "Present solution",
    keyLine: "Website + agentic automation creates a client experience that serves while selling.",
  },
  {
    segment: "Minute 6-7",
    objective: "Close next step",
    keyLine: "Pick Path 1 or Path 2 and confirm the blueprint session in the next 72 hours.",
  },
]

const scoreCards = [
  { label: "Performance", value: "40 / 100", insight: "Mobile speed is currently conversion-limiting." },
  { label: "Accessibility", value: "96 / 100", insight: "Strong foundation with minor contrast refinements needed." },
  { label: "Best Practices", value: "58 / 100", insight: "Tracking/deprecation cleanup improves trust posture." },
  { label: "SEO", value: "100 / 100", insight: "Discovery is strong; conversion architecture is the priority." },
  { label: "LCP", value: "16.2s", insight: "Above premium tolerance for mobile-first luxury leads." },
  { label: "Page Size", value: "16.7 MB", insight: "Hero media weight is the biggest performance drag." },
]

const analysisColumns = [
  {
    title: "Technical",
    icon: <Gauge className="h-5 w-5" />,
    bullets: [
      "Heavy hero media and script overhead delay first meaningful paint.",
      "Duplicate third-party tracking reduces best-practice score.",
      "Quick wins: media optimization, script sequencing, CSS pruning.",
    ],
  },
  {
    title: "Design + Psychology",
    icon: <Brain className="h-5 w-5" />,
    bullets: [
      "Authority assets are present but not sequenced for fast trust.",
      "Long-form blocks create cognitive friction for decision-makers.",
      "Needed shift: premium editorial hierarchy + commitment ladder CTAs.",
    ],
  },
  {
    title: "Optimization",
    icon: <TrendingUp className="h-5 w-5" />,
    bullets: [
      "Phase 1: speed + clarity repair to recover conversion confidence.",
      "Phase 2: conversion architecture + bilingual trust routing.",
      "Phase 3: automation layer for pipeline growth and follow-up consistency.",
    ],
  },
]

const automationAgents = [
  "AI Luxury Lead Concierge",
  "Buyer Intent Scoring Agent",
  "Seller Opportunity Engine",
  "Listing Intelligence Agent",
  "Follow-Up Nurture Agent",
  "Reputation and Referral Agent",
]

const offerPaths: OfferPath[] = [
  {
    name: "Path 1 - Foundation Build",
    fit: "Best for immediate conversion lift with core automation enabled.",
    timeline: "4-6 weeks",
    investment: "$12,500 CAD one-time",
    paymentStructure: "50% kickoff, 30% design approval, 20% launch handoff",
    estimatedOutcome: "Conversion-first website + core concierge automation live in one sprint cycle.",
    includes: [
      "Premium website rebuild (conversion architecture + performance first)",
      "Buyer/seller segmented funnels with bilingual trust flow",
      "Core AI concierge + appointment routing",
      "Analytics baseline and decision dashboard",
    ],
    decision: "Approve build direction and start discovery sprint.",
  },
  {
    name: "Path 2 - Authority Engine",
    fit: "Best for market leadership and sustained pipeline automation.",
    timeline: "8-12 weeks setup + optimization cadence",
    investment: "$24,000 CAD setup + $2,400 CAD/month optimization",
    paymentStructure: "40% kickoff, 30% systems deployment, 30% launch + first optimization cycle",
    estimatedOutcome: "Full digital authority stack with multi-agent pipeline automation and monthly growth operations.",
    includes: [
      "Everything in Foundation Build",
      "Full 6-agent automation stack and nurture orchestration",
      "Listing intelligence and seller opportunity triggers",
      "Monthly optimization cycle with growth reporting",
    ],
    decision: "Approve full authority roadmap and launch implementation plan.",
  },
]

export default function CodexPitchPageLight() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f5f1] text-slate-900">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-32 -top-20 h-[34rem] w-[34rem] rounded-full bg-amber-300/35 blur-3xl" />
        <div className="absolute -right-28 top-56 h-[30rem] w-[30rem] rounded-full bg-sky-200/35 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:96px_96px]" />
      </div>

      <main className="relative z-10">
        <div className="fixed right-6 top-6 z-40">
          <Link
            href="/pitch/codex"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-700 transition hover:bg-white"
          >
            <Moon className="h-3.5 w-3.5" />
            Dark Mode
          </Link>
        </div>

        <section className="px-6 pb-12 pt-24 md:px-16 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-500"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              Light Version - Prepared for Maz Majidi
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.6 }}
              className="mb-4 font-grotesk text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Luxury Real Estate Growth Infrastructure - BC, Canada
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="max-w-5xl font-grotesk text-4xl leading-[1.02] text-slate-900 sm:text-6xl lg:text-7xl"
            >
              Full Website Analysis, Conversion Strategy, and Agentic Automation Blueprint
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg"
            >
              This version is optimized for brighter meeting environments while preserving the full strategic narrative.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#structured-cta"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Jump to CTA
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#talk-track"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white"
              >
                Open Talk Track
                <Timer className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-4 md:px-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-amber-300/50 bg-amber-100/60 p-6">
            <p className="mb-4 font-grotesk text-lg text-slate-900">Meeting Mode: 3 Closing Lines</p>
            <div className="grid gap-3 md:grid-cols-3">
              {meetingClosingLines.map((line, index) => (
                <div key={line} className="rounded-2xl border border-amber-200/70 bg-white/90 p-4 text-sm text-slate-700">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-700">Line {index + 1}</p>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="talk-track" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6 border-b border-slate-300/70 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">00 - Presenter Script</p>
                <h2 className="font-grotesk text-3xl text-slate-900 md:text-5xl">5-7 Minute Talk Track</h2>
              </div>
              <Timer className="hidden h-8 w-8 text-slate-500 md:block" />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {talkTrackSteps.map((step) => (
                <motion.article key={step.segment} {...fadeUp} className="rounded-3xl border border-slate-300/70 bg-white/90 p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-slate-500">{step.segment}</p>
                  <p className="mb-3 font-grotesk text-lg text-slate-900">{step.objective}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{step.keyLine}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6 border-b border-slate-300/70 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">01 - Snapshot</p>
                <h2 className="font-grotesk text-3xl text-slate-900 md:text-5xl">Current Website Signals</h2>
              </div>
              <Gauge className="hidden h-8 w-8 text-slate-500 md:block" />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {scoreCards.map((card) => (
                <motion.article key={card.label} {...fadeUp} className="rounded-3xl border border-slate-300/70 bg-white/90 p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">{card.label}</p>
                  <p className="mb-3 font-grotesk text-3xl text-slate-900">{card.value}</p>
                  <p className="text-sm text-slate-600">{card.insight}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6 border-b border-slate-300/70 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">02 - Full Analysis</p>
                <h2 className="font-grotesk text-3xl text-slate-900 md:text-5xl">Technical, Design, and Optimization</h2>
              </div>
              <Brain className="hidden h-8 w-8 text-slate-500 md:block" />
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3">
              {analysisColumns.map((column) => (
                <motion.article key={column.title} {...fadeUp} className="rounded-3xl border border-slate-300/70 bg-white/90 p-6">
                  <div className="mb-4 flex items-center gap-2 text-slate-700">
                    {column.icon}
                    <p className="font-grotesk text-xl text-slate-900">{column.title}</p>
                  </div>
                  <ul className="space-y-3">
                    {column.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6 border-b border-slate-300/70 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">03 - Agentic Automation</p>
                <h2 className="font-grotesk text-3xl text-slate-900 md:text-5xl">Luxury Realtor Automation Stack</h2>
              </div>
              <Bot className="hidden h-8 w-8 text-slate-500 md:block" />
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {automationAgents.map((agent) => (
                <motion.article key={agent} {...fadeUp} className="rounded-3xl border border-slate-300/70 bg-white/90 p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.16em] text-slate-500">Automation Agent</p>
                  <p className="font-grotesk text-xl text-slate-900">{agent}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="structured-cta" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6 border-b border-slate-300/70 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">04 - Structured CTA</p>
                <h2 className="font-grotesk text-3xl text-slate-900 md:text-5xl">Choose Direction on This Call</h2>
              </div>
              <Handshake className="hidden h-8 w-8 text-slate-500 md:block" />
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-2">
              {offerPaths.map((path) => (
                <motion.article key={path.name} {...fadeUp} className="rounded-3xl border border-slate-300/70 bg-white/90 p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-grotesk text-2xl text-slate-900">{path.name}</p>
                    <span className="rounded-full border border-slate-300 px-3 py-1 text-xs uppercase tracking-[0.12em] text-slate-600">
                      {path.timeline}
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-slate-600">{path.fit}</p>

                  <div className="mb-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-1 text-xs uppercase tracking-[0.14em] text-slate-500">Investment</p>
                      <p className="text-sm text-slate-800">{path.investment}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-1 text-xs uppercase tracking-[0.14em] text-slate-500">Payment Structure</p>
                      <p className="text-sm text-slate-800">{path.paymentStructure}</p>
                    </div>
                  </div>

                  <ul className="mb-4 space-y-2">
                    {path.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-slate-600">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        {line}
                      </li>
                    ))}
                  </ul>

                  <p className="mb-2 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Expected Outcome:</span> {path.estimatedOutcome}
                  </p>
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">Decision on call:</span> {path.decision}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              {...fadeUp}
              className="mt-8 rounded-3xl border border-emerald-300/50 bg-emerald-100/60 p-6 md:flex md:items-center md:justify-between"
            >
              <div className="mb-4 md:mb-0">
                <p className="mb-1 text-xs uppercase tracking-[0.14em] text-emerald-800">72-hour next action</p>
                <p className="text-sm text-slate-700">Book the 90-minute Luxury Growth Blueprint and lock implementation timeline.</p>
              </div>
              <a
                href="mailto:hello@trixode.com?subject=Maz%20Majidi%20-%20Luxury%20Growth%20Blueprint"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Book Blueprint
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-slate-300/70 px-6 py-10 md:px-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-[0.14em] text-slate-500 md:flex-row md:items-center">
            <span className="inline-flex items-center gap-2">
              <Languages className="h-4 w-4" />
              English + Persian conversion strategy
            </span>
            <span>Confidential meeting material</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
