"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  Gauge,
  Handshake,
  Languages,
  LineChart,
  Sun,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
} from "lucide-react"

interface ScoreCard {
  label: string
  value: string
  proof: string
  businessMeaning: string
}

interface TechnicalFinding {
  title: string
  severity: "Critical" | "High" | "Medium"
  evidence: string
  impact: string
  recommendation: string
}

interface PsychologyFinding {
  principle: string
  currentGap: string
  salesCost: string
  upgradeMove: string
}

interface RoadmapStep {
  phase: string
  objective: string
  wins: string[]
}

interface AutomationAgent {
  name: string
  mission: string
  psychLever: string
  salesOutcome: string
  bcContext: string
}

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

interface TalkTrackStep {
  segment: string
  objective: string
  keyLine: string
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 },
}

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true, margin: "-80px" },
}

const scoreCards: ScoreCard[] = [
  {
    label: "Performance",
    value: "40 / 100",
    proof: "Mobile Lighthouse",
    businessMeaning: "Speed lag weakens first trust signal for premium clients.",
  },
  {
    label: "Accessibility",
    value: "96 / 100",
    proof: "Strong baseline",
    businessMeaning: "Good foundation with small contrast fixes needed.",
  },
  {
    label: "Best Practices",
    value: "58 / 100",
    proof: "Deprecated APIs + 3rd-party cookie issues",
    businessMeaning: "Tech reliability and privacy perception can feel outdated.",
  },
  {
    label: "SEO",
    value: "100 / 100",
    proof: "Yoast + indexable content",
    businessMeaning: "Discovery is strong; conversion architecture is the gap.",
  },
  {
    label: "Largest Contentful Paint",
    value: "16.2s",
    proof: "Mobile metric",
    businessMeaning: "Luxury buyers wait, but they do not wait long online.",
  },
  {
    label: "Homepage Transfer Size",
    value: "16.7 MB",
    proof: "~14 MB video file dominates payload",
    businessMeaning: "High data load hurts mobile experience and ad efficiency.",
  },
]

const technicalFindings: TechnicalFinding[] = [
  {
    title: "Heavy Hero Media Delays Trust Formation",
    severity: "Critical",
    evidence: "Largest request is a homepage video near 14 MB.",
    impact: "Slow visual start reduces authority in the first 5 seconds.",
    recommendation: "Serve lightweight poster-first hero, lazy-load video, ship modern formats.",
  },
  {
    title: "Mobile Render Path Is Too Slow",
    severity: "Critical",
    evidence: "FCP 11.0s and LCP 16.2s on mobile profile.",
    impact: "High-intent leads bounce before value proposition appears.",
    recommendation: "Prioritize above-the-fold HTML/CSS and defer non-critical scripts.",
  },
  {
    title: "Script Overhead Creates Main-Thread Friction",
    severity: "High",
    evidence: "Unused JavaScript estimate ~511 KiB, bootup ~5.6s.",
    impact: "Interactions feel heavy, lowering confidence in premium service quality.",
    recommendation: "Consolidate trackers, trim plugins, and split script loading by intent.",
  },
  {
    title: "Styling Payload Is Larger Than Needed",
    severity: "Medium",
    evidence: "Unused CSS estimate ~81 KiB.",
    impact: "Extra style weight slows first meaningful paint.",
    recommendation: "Remove dead style bundles and inline critical style subset.",
  },
  {
    title: "Tracking and Compliance Signals Need Cleanup",
    severity: "High",
    evidence: "Duplicate analytics script loading and 3rd-party cookie issue.",
    impact: "Lower best-practices score can impact platform trust and paid performance.",
    recommendation: "Unify analytics strategy, gate optional scripts, simplify cookie surface.",
  },
  {
    title: "Minor Contrast Gaps in Key Copy",
    severity: "Medium",
    evidence: "Accessibility report flags low-contrast text areas.",
    impact: "Readability friction reduces message clarity on mobile.",
    recommendation: "Raise contrast and tighten hierarchy for confidence-first scanning.",
  },
]

const psychologyFindings: PsychologyFinding[] = [
  {
    principle: "Cognitive Ease",
    currentGap: "Long blocks of copy create high reading effort.",
    salesCost: "Users delay action because value is not instantly digestible.",
    upgradeMove: "Use executive summaries, signal words, and tiered depth sections.",
  },
  {
    principle: "Authority Sequencing",
    currentGap: "Proof points appear, but not in a persuasion-first order.",
    salesCost: "Visitors understand credentials late in the journey.",
    upgradeMove: "Show results, niche authority, and trust assets in the first screen stack.",
  },
  {
    principle: "Commitment Ladder",
    currentGap: "Primary path is broad contact without guided micro-commitment.",
    salesCost: "Qualified leads postpone reaching out due to decision ambiguity.",
    upgradeMove: "Introduce segmented actions: buyer plan, seller valuation, strategic consult.",
  },
  {
    principle: "Social Proof Amplification",
    currentGap: "Testimonials are strong but presented as static wall text.",
    salesCost: "Emotional transfer from past client success is reduced.",
    upgradeMove: "Convert proof into guided story cards with context, objection, and outcome.",
  },
  {
    principle: "Bilingual Trust Transfer",
    currentGap: "Persian advantage exists but is not architected as a premium differentiator.",
    salesCost: "Cultural trust edge is under-monetized in first-session conversion.",
    upgradeMove: "Create mirrored bilingual journeys with dedicated trust and CTA pathways.",
  },
  {
    principle: "Prestige Atmosphere",
    currentGap: "Visual experience does not fully match luxury advisory positioning.",
    salesCost: "Perceived positioning gap can lower premium fee acceptance.",
    upgradeMove: "Adopt editorial luxury direction with strong rhythm, contrast, and restraint.",
  },
]

const roadmap: RoadmapStep[] = [
  {
    phase: "Phase 01 - First 14 Days",
    objective: "Recover speed, clarity, and conversion confidence.",
    wins: [
      "Replace heavy hero media flow with optimized visual pipeline.",
      "Simplify script stack and remove duplicated tracking loads.",
      "Ship high-clarity conversion strips for buyers and sellers.",
    ],
  },
  {
    phase: "Phase 02 - Weeks 3 to 6",
    objective: "Rebuild digital authority for luxury positioning.",
    wins: [
      "Launch premium narrative architecture with authority-first sequencing.",
      "Deploy bilingual conversion routing for English and Persian audiences.",
      "Create proof engine: transactions, testimonials, and market intelligence blocks.",
    ],
  },
  {
    phase: "Phase 03 - Ongoing",
    objective: "Automate follow-up, qualification, and pipeline growth.",
    wins: [
      "Activate AI lead concierge with qualification and booking logic.",
      "Run seller intent triggers and nurture sequences for warm inventory.",
      "Track pipeline analytics from first click to signed appointment.",
    ],
  },
]

const automationAgents: AutomationAgent[] = [
  {
    name: "AI Luxury Lead Concierge",
    mission: "Qualify buyer/seller intent in under 2 minutes and route to the right next step.",
    psychLever: "Progress Principle - users continue when each step feels easy and relevant.",
    salesOutcome: "Higher response speed, cleaner lead qualification, stronger booking rates.",
    bcContext: "Handles local and international interest across North Shore, West Van, and Vancouver core.",
  },
  {
    name: "Buyer Intent Scoring Agent",
    mission: "Score readiness from budget, timing, financing, and neighborhood preference signals.",
    psychLever: "Personal Relevance - people engage deeper when guidance feels tailored.",
    salesOutcome: "Prioritizes highest-likelihood buyers for direct advisor attention.",
    bcContext: "Supports detached, waterfront, and prestige strata buyer journeys in BC luxury segments.",
  },
  {
    name: "Seller Opportunity Engine",
    mission: "Capture valuation requests, detect seller motivation, and launch timed follow-up.",
    psychLever: "Loss Aversion - clarity on missed market timing increases action.",
    salesOutcome: "Converts passive homeowner curiosity into listing conversations.",
    bcContext: "Aligns with neighborhood-level turnover patterns in North Vancouver and West Vancouver.",
  },
  {
    name: "Listing Intelligence Agent",
    mission: "Generate pricing narratives, comp snapshots, and buyer objection pre-handling.",
    psychLever: "Authority Bias - data-backed stories reduce uncertainty and increase trust.",
    salesOutcome: "Improves listing presentation quality and negotiation confidence.",
    bcContext: "Uses local micro-market patterns for prestige property positioning.",
  },
  {
    name: "Follow-Up Nurture Agent",
    mission: "Run multilingual email/SMS sequences based on behavior and readiness stage.",
    psychLever: "Mere-Exposure Effect - consistent, useful contact builds preference over time.",
    salesOutcome: "Higher reactivation and referral flow from warm and dormant leads.",
    bcContext: "Designed for compliant cadence and culturally aware tone in BC market communications.",
  },
  {
    name: "Reputation and Referral Agent",
    mission: "Automate testimonial capture, review prompts, and referral loops after milestone wins.",
    psychLever: "Social Proof - visible outcomes increase confidence for new prospects.",
    salesOutcome: "Compounds trust assets and shortens sales cycle in premium segments.",
    bcContext: "Highlights neighborhood-specific wins and bilingual client stories.",
  },
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

const severityStyles: Record<TechnicalFinding["severity"], string> = {
  Critical: "bg-red-500/15 text-red-200 border border-red-500/30",
  High: "bg-orange-500/15 text-orange-200 border border-orange-500/30",
  Medium: "bg-amber-500/15 text-amber-200 border border-amber-500/30",
}

const meetingClosingLines = [
  "Your market credibility is already premium; this engagement makes your digital experience match it.",
  "Today we only need one decision: Foundation Build or Authority Engine.",
  "Once selected, we book the 90-minute blueprint in 72 hours and begin execution immediately.",
]

const talkTrackSteps: TalkTrackStep[] = [
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

export default function CodexPitchPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-neutral-100">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-amber-200/10 blur-3xl" />
        <div className="absolute -right-24 top-56 h-[30rem] w-[30rem] rounded-full bg-sky-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-200/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:96px_96px]" />
      </div>

      <main className="relative z-10">
        <div className="fixed right-6 top-6 z-40">
          <Link
            href="/pitch/codex/light"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-neutral-100 transition hover:bg-white/20"
          >
            <Sun className="h-3.5 w-3.5" />
            Light Mode
          </Link>
        </div>

        <section className="px-6 pb-16 pt-24 md:px-16 md:pt-32">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-neutral-300"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-200" />
              Confidential Pitch Draft - Prepared for Maz Majidi
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="mb-8"
            >
              <p className="mb-6 font-grotesk text-xs uppercase tracking-[0.2em] text-amber-100/80">
                Luxury Real Estate Growth Infrastructure - BC, Canada
              </p>
              <h1 className="max-w-5xl font-grotesk text-4xl leading-[1.02] text-neutral-50 sm:text-6xl lg:text-7xl">
                Full Website Analysis, Conversion Strategy, and Agentic Automation Blueprint
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.6 }}
              className="max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg"
            >
              Built for your second call context: clear diagnosis first, solution confidence second, and a structured
              decision path that makes next steps easy for a premium client.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#priority-fixes"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-amber-200 px-7 py-3 text-sm font-medium text-neutral-900 transition hover:bg-amber-100"
              >
                View Priority Fixes
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#automation-blueprint"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-neutral-100 transition hover:bg-white/10"
              >
                See Automation Blueprint
                <Bot className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 rounded-3xl border border-amber-100/30 bg-amber-100/10 p-6"
            >
              <p className="mb-4 font-grotesk text-lg text-amber-50">Meeting Mode: 3 Closing Lines</p>
              <div className="grid gap-3 md:grid-cols-3">
                {meetingClosingLines.map((line, index) => (
                  <div key={line} className="rounded-2xl bg-black/20 p-4 text-sm text-neutral-100">
                    <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">Line {index + 1}</p>
                    <p>{line}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="talk-track" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">00 - Presenter Script</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">5-7 Minute Talk Track</h2>
              </div>
              <Timer className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
            >
              {talkTrackSteps.map((step) => (
                <motion.article key={step.segment} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">{step.segment}</p>
                  <p className="mb-3 font-grotesk text-lg text-neutral-50">{step.objective}</p>
                  <p className="text-sm leading-relaxed text-neutral-200">{step.keyLine}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">01 - Executive Snapshot</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">What the Current Site Is Signaling</h2>
              </div>
              <div className="hidden rounded-full border border-emerald-200/40 bg-emerald-200/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-emerald-100 md:block">
                Strong expertise, under-leveraged digital conversion
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {scoreCards.map((card) => (
                <motion.article key={card.label} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-neutral-400">{card.label}</p>
                  <p className="mb-2 font-grotesk text-3xl text-neutral-50">{card.value}</p>
                  <p className="mb-4 text-sm text-amber-100/80">{card.proof}</p>
                  <p className="text-sm leading-relaxed text-neutral-300">{card.businessMeaning}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="priority-fixes" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">02 - Technical Analysis</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">Priority Technical Findings</h2>
              </div>
              <Gauge className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              {technicalFindings.map((item) => (
                <motion.article key={item.title} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-grotesk text-xl text-neutral-50 md:text-2xl">{item.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${severityStyles[item.severity]}`}>
                      {item.severity}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-neutral-400">Evidence</p>
                      <p className="text-sm text-neutral-200">{item.evidence}</p>
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-neutral-400">Business Impact</p>
                      <p className="text-sm text-neutral-200">{item.impact}</p>
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="mb-2 text-xs uppercase tracking-[0.14em] text-neutral-400">Recommendation</p>
                      <p className="text-sm text-neutral-200">{item.recommendation}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">03 - Design and Sales Psychology</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">Where Trust and Conversion Are Leaking</h2>
              </div>
              <Brain className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 lg:grid-cols-2"
            >
              {psychologyFindings.map((item) => (
                <motion.article key={item.principle} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-amber-100/80">{item.principle}</p>
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-200">
                      <span className="font-semibold text-neutral-50">Current Gap:</span> {item.currentGap}
                    </p>
                    <p className="text-sm text-neutral-200">
                      <span className="font-semibold text-neutral-50">Sales Cost:</span> {item.salesCost}
                    </p>
                    <p className="text-sm text-neutral-200">
                      <span className="font-semibold text-neutral-50">Upgrade Move:</span> {item.upgradeMove}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">04 - Optimization Plan</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">Performance and Conversion Roadmap</h2>
              </div>
              <TrendingUp className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 lg:grid-cols-3"
            >
              {roadmap.map((phase) => (
                <motion.article key={phase.phase} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <p className="mb-3 text-xs uppercase tracking-[0.18em] text-amber-100/80">{phase.phase}</p>
                  <p className="mb-5 font-grotesk text-xl text-neutral-50">{phase.objective}</p>
                  <ul className="space-y-3">
                    {phase.wins.map((win) => (
                      <li key={win} className="flex items-start gap-2 text-sm text-neutral-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        {win}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">05 - Problem to Offer</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">A Sales-Ready Narrative for Tomorrow</h2>
              </div>
              <Handshake className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 md:grid-cols-3"
            >
              <motion.article variants={fadeUp} className="rounded-3xl border border-red-300/20 bg-red-300/5 p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-red-100/80">Problem</p>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Market credibility is elite, but digital conversion architecture does not yet match luxury advisory
                  standards. High-intent prospects are not guided into confident next steps fast enough.
                </p>
              </motion.article>

              <motion.article variants={fadeUp} className="rounded-3xl border border-sky-300/20 bg-sky-300/5 p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-sky-100/80">Solution</p>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Build a premium conversion-first website with bilingual trust routing, then deploy agentic operations to
                  qualify, nurture, and book ideal buyer and seller conversations automatically.
                </p>
              </motion.article>

              <motion.article variants={fadeUp} className="rounded-3xl border border-emerald-300/20 bg-emerald-300/5 p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-emerald-100/80">Offer</p>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Two clear implementation paths with transparent scope and timeline, ending in one immediate decision:
                  choose direction now, schedule blueprint in 72 hours, begin execution with confidence.
                </p>
              </motion.article>
            </motion.div>
          </div>
        </section>

        <section id="automation-blueprint" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">06 - Agentic Automation Blueprint</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">Built Specifically for BC Luxury Real Estate</h2>
              </div>
              <Bot className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-4 lg:grid-cols-2"
            >
              {automationAgents.map((agent) => (
                <motion.article key={agent.name} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <h3 className="mb-3 font-grotesk text-2xl text-neutral-50">{agent.name}</h3>
                  <p className="mb-4 text-sm text-neutral-200">
                    <span className="font-semibold text-neutral-50">Mission:</span> {agent.mission}
                  </p>
                  <div className="space-y-3 text-sm text-neutral-200">
                    <p>
                      <span className="font-semibold text-neutral-50">Psychology Lever:</span> {agent.psychLever}
                    </p>
                    <p>
                      <span className="font-semibold text-neutral-50">Sales Outcome:</span> {agent.salesOutcome}
                    </p>
                    <p>
                      <span className="font-semibold text-neutral-50">BC Context:</span> {agent.bcContext}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="structured-cta" className="px-6 py-16 md:px-16">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="mb-12 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-amber-100/70">07 - Structured Call to Action</p>
                <h2 className="font-grotesk text-3xl text-neutral-50 md:text-5xl">Decision Framework for This Zoom Call</h2>
              </div>
              <Timer className="hidden h-8 w-8 text-amber-100/70 md:block" />
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
              className="mb-10 grid gap-4 lg:grid-cols-2"
            >
              {offerPaths.map((path) => (
                <motion.article key={path.name} variants={fadeUp} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="font-grotesk text-2xl text-neutral-50">{path.name}</h3>
                    <span className="rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1 text-xs uppercase tracking-[0.12em] text-amber-100/90">
                      {path.timeline}
                    </span>
                  </div>
                  <p className="mb-5 text-sm text-neutral-200">{path.fit}</p>
                  <div className="mb-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="mb-1 text-xs uppercase tracking-[0.14em] text-neutral-400">Investment</p>
                      <p className="text-sm text-neutral-100">{path.investment}</p>
                    </div>
                    <div className="rounded-2xl bg-black/20 p-4">
                      <p className="mb-1 text-xs uppercase tracking-[0.14em] text-neutral-400">Payment Structure</p>
                      <p className="text-sm text-neutral-100">{path.paymentStructure}</p>
                    </div>
                  </div>
                  <ul className="mb-6 space-y-3">
                    {path.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-sm text-neutral-200">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mb-3 text-sm text-neutral-100">
                    <span className="font-semibold text-neutral-50">Expected Outcome:</span> {path.estimatedOutcome}
                  </p>
                  <p className="text-sm text-neutral-100">
                    <span className="font-semibold text-neutral-50">Decision on call:</span> {path.decision}
                  </p>
                </motion.article>
              ))}
            </motion.div>

            <motion.article {...fadeUp} className="rounded-3xl border border-amber-100/30 bg-amber-100/10 p-6 md:p-8">
              <p className="mb-4 font-grotesk text-xl text-amber-50 md:text-2xl">Recommended 72-Hour Next Step</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">Step 1 - Today</p>
                  <p className="text-sm text-neutral-100">Select Path 1 or Path 2 before this call ends.</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">Step 2 - Within 72h</p>
                  <p className="text-sm text-neutral-100">Book a 90-minute Luxury Growth Blueprint session.</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-amber-100/80">Step 3 - After Blueprint</p>
                  <p className="text-sm text-neutral-100">Approve implementation scope and start execution sprint.</p>
                </div>
              </div>
            </motion.article>

            <motion.div
              {...fadeUp}
              className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:flex-row md:items-center"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-100" />
                <p className="max-w-2xl text-sm text-neutral-200">
                  Service-first position: this plan is designed to reduce stress for your clients, improve decision
                  confidence, and help your team deliver premium guidance at scale.
                </p>
              </div>
              <a
                href="mailto:hello@trixode.com?subject=Maz%20Majidi%20-%20Luxury%20Growth%20Blueprint"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-white"
              >
                Book the 90-minute Blueprint
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-white/10 px-6 py-10 md:px-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.14em] text-neutral-400">
              <span className="inline-flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Trixode Studios
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" />
                Luxury Real Estate Focus
              </span>
              <span className="inline-flex items-center gap-2">
                <Languages className="h-4 w-4" />
                English + Persian Journey Strategy
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-1">
                <LineChart className="h-3.5 w-3.5" />
                Data-Informed, Psychology-Led
              </span>
              <span>Confidential meeting material</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
