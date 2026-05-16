"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Cpu,
  CreditCard,
  Eye,
  Filter,
  Fingerprint,
  Inbox,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  Network,
  ScanFace,
  Send,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
  Zap,
} from "lucide-react"

// ─── theme tokens ───────────────────────────────────────────────────────────

type Theme = "dark" | "light"

const TOKENS: Record<Theme, Record<string, string>> = {
  dark: {
    "--bg": "#030303",
    "--bg-soft": "#050505",
    "--ink": "#ffffff",
    "--ink-dim": "rgba(255,255,255,0.68)",
    "--ink-mute": "rgba(255,255,255,0.48)",
    "--ink-faint": "rgba(255,255,255,0.32)",
    "--line": "rgba(255,255,255,0.10)",
    "--line-strong": "rgba(255,255,255,0.28)",
    "--surface": "rgba(255,255,255,0.025)",
    "--surface-hover": "rgba(255,255,255,0.06)",
    "--surface-strong": "rgba(255,255,255,0.08)",
    "--panel": "#070707",
    "--btn-bg": "#ffffff",
    "--btn-ink": "#000000",
    "--btn-hover-bg": "#dbeafe",
    "--accent": "#60a5fa",
    "--accent-soft": "rgba(96,165,250,0.10)",
    "--accent-line": "rgba(96,165,250,0.35)",
    "--accent-ink": "#bfdbfe",
    "--ok": "#34d399",
    "--ok-soft": "rgba(52,211,153,0.18)",
    "--warn": "#fbbf24",
    "--warn-soft": "rgba(251,191,36,0.15)",
    "--code-bg": "rgba(0,0,0,0.40)",
    "--ambient-1": "rgba(59,130,246,0.35)",
    "--ambient-2": "rgba(139,92,246,0.28)",
    "--ambient-3": "rgba(6,182,212,0.22)",
    "--grid": "rgba(255,255,255,0.025)",
  },
  light: {
    "--bg": "#f3ede2",
    "--bg-soft": "#ece5d6",
    "--ink": "#13100b",
    "--ink-dim": "rgba(19,16,11,0.72)",
    "--ink-mute": "rgba(19,16,11,0.55)",
    "--ink-faint": "rgba(19,16,11,0.40)",
    "--line": "rgba(19,16,11,0.14)",
    "--line-strong": "rgba(19,16,11,0.32)",
    "--surface": "rgba(255,250,242,0.7)",
    "--surface-hover": "rgba(255,255,255,0.92)",
    "--surface-strong": "rgba(255,255,255,1)",
    "--panel": "#ece4d3",
    "--btn-bg": "#13100b",
    "--btn-ink": "#fbf6ea",
    "--btn-hover-bg": "#000",
    "--accent": "#1d4ed8",
    "--accent-soft": "rgba(29,78,216,0.08)",
    "--accent-line": "rgba(29,78,216,0.35)",
    "--accent-ink": "#1d4ed8",
    "--ok": "#047857",
    "--ok-soft": "rgba(4,120,87,0.12)",
    "--warn": "#b45309",
    "--warn-soft": "rgba(180,83,9,0.12)",
    "--code-bg": "rgba(255,255,255,0.85)",
    "--ambient-1": "rgba(245,158,11,0.30)",
    "--ambient-2": "rgba(252,211,77,0.25)",
    "--ambient-3": "rgba(252,165,165,0.18)",
    "--grid": "rgba(19,16,11,0.05)",
  },
}

// ─── content ────────────────────────────────────────────────────────────────

type Account = { id: "gmail" | "outlook" | "apple"; label: string; address: string; dot: string }

const ACCOUNTS: Account[] = [
  { id: "gmail", label: "Gmail · personal", address: "you@gmail.com", dot: "#ea4335" },
  { id: "outlook", label: "Outlook · work", address: "you@company.com", dot: "#0072c6" },
  { id: "apple", label: "Apple Mail · client", address: "you@icloud.com", dot: "#9ca3af" },
]

type Tier = "auto" | "confirm" | "faceid"

const TIERS: { id: Tier; label: string; help: string; accent: string }[] = [
  { id: "auto", label: "auto", help: "Quiet sends for low-risk replies.", accent: "#34d399" },
  { id: "confirm", label: "confirm", help: "Single tap before it leaves the device.", accent: "#fbbf24" },
  { id: "faceid", label: "faceid", help: "Your face is the signature.", accent: "#60a5fa" },
]

type DraftMessage = {
  accountId: Account["id"]
  to: string
  subject: string
  preview: string
  body: string
  amount?: string
  risk: Tier
  reason: string
}

const DRAFTS: DraftMessage[] = [
  {
    accountId: "outlook",
    to: "ops@northport-logistics.ca",
    subject: "Wire transfer · invoice INV-2026-441",
    preview: "Approving the $15,400 transfer for the shipment that cleared this morning…",
    body: "Hi team — approving the $15,400 transfer for the Q2 shipment cleared at customs this morning. Reference INV-2026-441. Settlement window confirmed.\n\nCould you reply with the SWIFT confirmation by end of day?\n\n— You",
    amount: "CAD 15,400.00",
    risk: "faceid",
    reason: "Outbound payment over $5K · biometric required",
  },
  {
    accountId: "gmail",
    to: "claire.shen@a16z-partners.com",
    subject: "Re: deck + warm intro",
    preview: "Happy to share — sending the deck and a 20-min slot for next week…",
    body: "Claire — happy to share. Attaching the deck and a 20-minute slot for next Tuesday at 10am PT.\n\nIf you'd rather a longer first session, I can flex.\n\nThanks for the intro,\n— You",
    risk: "confirm",
    reason: "External recipient · single-tap confirm",
  },
  {
    accountId: "apple",
    to: "yumi@design-collective.studio",
    subject: "Re: brand workshop · Thursday slot",
    preview: "Locking Thursday 2–4pm — sending the agenda and the calendar invite…",
    body: "Yumi — locking Thursday 2–4pm. Sending the agenda doc and the calendar invite right after this.\n\nExcited.\n\n— You",
    risk: "auto",
    reason: "Internal calendar coordination · low-risk auto-send",
  },
]

const VALUE_PROPS = [
  { icon: Inbox, title: "Every inbox, one mind.", body: "Gmail, Outlook, Apple Mail — all under one agent that knows your tone and your threads." },
  { icon: ScanFace, title: "Your face. Your signature.", body: "FaceID gates every sensitive send. Nothing leaves your phone without your skin in the loop." },
  { icon: Eye, title: "Receipts for everything.", body: "Every read, draft, and send written to a signed, append-only log you can export anytime." },
]

type Scenario = { time: string; icon: typeof Mail; title: string; before: string; after: string; tag: string }

const SCENARIOS: Scenario[] = [
  { time: "08:14", icon: Mail, title: "Triages 47 overnight emails", before: "You scroll for 25 minutes to find the 3 that matter.", after: "Morphika reads everything, surfaces the 3 that need you, drafts replies to the rest.", tag: "Saves 25 min" },
  { time: "10:42", icon: CreditCard, title: "Approves a wire transfer", before: "You re-read the invoice, double-check the account, hold your breath, click send.", after: "Draft pre-fills. Scan. Send. Audit log signed in the same second.", tag: "FaceID gate" },
  { time: "14:30", icon: Calendar, title: "Locks a Thursday workshop", before: "Six messages back and forth across two inboxes to confirm one slot.", after: "Auto-replies with the slot, sends the invite, files the thread. You never touched it.", tag: "Auto-send" },
  { time: "18:09", icon: Filter, title: "Catches a phishing attempt", before: "You almost click the 'invoice' link from a spoofed sender.", after: "Moltguard flags it, quarantines the draft, asks if you want to report it.", tag: "Caught early" },
]

const FEATURES = [
  { icon: Inbox, label: "Multi-account orchestration", body: "Gmail · Outlook · Apple Mail · IMAP." },
  { icon: ScanFace, label: "FaceID-gated sends", body: "Three tiers: auto · confirm · faceid." },
  { icon: Eye, label: "Append-only audit log", body: "Every action signed and exportable." },
  { icon: Wand2, label: "Tone-true drafts", body: "Trained on your last 1,000 replies." },
  { icon: Filter, label: "Moltguard scanning", body: "Prompt-injection and phishing caught before you do." },
  { icon: Lock, label: "Per-agent credentials", body: "AES-128-CBC + HMAC, PBKDF2 at 480k rounds." },
  { icon: Server, label: "Self-hostable mesh", body: "Run it on your hardware. No cloud needed." },
  { icon: Network, label: "MCP-native plugins", body: "Plug in calendars, CRMs, anything that speaks MCP." },
]

type Plan = { name: string; price: string; cadence: string; blurb: string; features: string[]; cta: string; highlight?: boolean }

const PLANS: Plan[] = [
  { name: "Personal", price: "$9", cadence: "/ month", blurb: "For one inbox you actually live in.", features: ["1 account (Gmail · Outlook · Apple)", "Tone-true drafts", "FaceID approval", "30-day audit log"], cta: "Start free for 14 days" },
  { name: "Pro", price: "$19", cadence: "/ month", blurb: "Built for the 2-to-4-inbox knowledge worker.", features: ["Up to 4 accounts", "All Personal features", "Moltguard scanning", "Custom approval tiers per sender", "1-year audit log · export anytime"], cta: "Start free for 14 days", highlight: true },
  { name: "Team", price: "$49", cadence: "/ seat / month", blurb: "Shared agents, separate keys, one compliance picture.", features: ["Unlimited accounts per seat", "Self-hostable mesh option", "Per-agent credential isolation", "Exportable compliance bundle", "Priority support"], cta: "Talk to us" },
]

const FAQS = [
  { q: "Does Morphika train on my emails?", a: "Never on a public model. The agent learns your tone from your own outbox, stored encrypted on your device or your self-hosted node. Your data never leaves the perimeter you control." },
  { q: "What happens if I lose my phone?", a: "Keys live in the Secure Enclave — they don't sync. A lost device can't sign anything. Re-enrol on a new phone with FaceID + a recovery passphrase you set at install." },
  { q: "Can the agent send without me seeing it?", a: "Only if you set the sender to `auto` (low-risk replies). The default for any new contact, attachment, or amount over your threshold is `confirm` or `faceid`. You can always lower or raise the gate." },
  { q: "How is this different from Superhuman, Shortwave, or Apple Intelligence?", a: "Those are single-account, single-provider AI assistants. Morphika is the only multi-account agent with biometric approval and a compliance-grade audit log — the layer regulated and security-conscious users have been waiting for." },
  { q: "Do you support self-hosting?", a: "Yes — Team plan and up. Drop the Morphika node onto your own server, point your accounts at it, and your data stays inside your network. We provide a hardened Docker image and a Helm chart." },
  { q: "When can I try it?", a: "iOS beta opens summer 2026. Two design partners are running today. Join the waitlist and we'll prioritize regulated prosumers and small teams first." },
]

const SOCIAL_PROOF = [
  { stat: "47", label: "emails triaged before you wake up" },
  { stat: "25 min", label: "saved every morning" },
  { stat: "100%", label: "of sends logged & signed" },
  { stat: "0", label: "passwords typed" },
]

const TESTIMONIAL = {
  quote: "Three inboxes used to feel like three jobs. Now there's one card on my phone that says 'these need you, the rest is handled.' I haven't been this calm in years.",
  author: "Design partner · CFO · regulated SMB",
  meta: "Running Morphika since March 2026",
}

// ─── page ───────────────────────────────────────────────────────────────────

export default function MorphikaProductPage() {
  const prefersReducedMotion = useReducedMotion()
  const enableMotion = !prefersReducedMotion

  const [theme, setTheme] = useState<Theme>("dark")
  const [ripple, setRipple] = useState<{ x: number; y: number; to: Theme; key: number } | null>(null)

  const [accountId, setAccountId] = useState<Account["id"]>("outlook")
  const [tier, setTier] = useState<Tier>("faceid")
  const [draftIndex, setDraftIndex] = useState(0)

  const draft = DRAFTS[draftIndex]
  const account = ACCOUNTS.find((a) => a.id === accountId) ?? ACCOUNTS[0]

  useEffect(() => {
    setTier(draft.risk)
    setAccountId(draft.accountId)
  }, [draftIndex, draft.accountId, draft.risk])

  const tokens = TOKENS[theme]

  const handleLamp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark"
    setTheme(next)
    if (!enableMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    setRipple({ x, y, to: next, key: Date.now() })
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans antialiased"
      style={{
        ...(tokens as React.CSSProperties),
        backgroundColor: "var(--bg)",
        color: "var(--ink)",
        transition: "background-color 1.4s cubic-bezier(0.22, 1, 0.36, 1), color 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <AmbientBackdrop enableMotion={enableMotion} />
      <FloatingNav theme={theme} onLamp={handleLamp} />

      <main className="relative z-10">
        <Hero enableMotion={enableMotion} />
        <ValueStripe />
        <DeviceSection
          enableMotion={enableMotion}
          account={account}
          accountId={accountId}
          setAccountId={setAccountId}
          tier={tier}
          setTier={setTier}
          draft={draft}
          draftIndex={draftIndex}
          setDraftIndex={setDraftIndex}
        />
        <ScenariosSection />
        <FeatureGrid />
        <TrustSection />
        <SocialProofSection />
        <PricingSection />
        <FAQSection />
        <WaitlistSection />
        <Footer />
      </main>

      <LampRipple ripple={ripple} onCommit={() => setRipple(null)} />
    </div>
  )
}

// ─── lamp ripple ────────────────────────────────────────────────────────────

function LampRipple({
  ripple,
  onCommit,
}: {
  ripple: { x: number; y: number; to: Theme; key: number } | null
  onCommit: (to: Theme) => void
}) {
  // A soft, layered light wash. The page bg/ink already transition underneath via CSS;
  // this overlay is just the "lamp filling the room" feeling — a warm glow when turning
  // on, a cool dusk when turning off. No hard edges, no clip-paths.
  return (
    <AnimatePresence>
      {ripple && (
        <>
          {/* Wide, slow ambient bloom — the room warming up / cooling down */}
          <motion.div
            key={`${ripple.key}-bloom`}
            className="pointer-events-none fixed inset-0 z-[55]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => onCommit(ripple.to)}
            style={{
              background:
                ripple.to === "light"
                  ? `radial-gradient(120vmax 120vmax at ${ripple.x}px ${ripple.y}px, rgba(255,221,160,0.55) 0%, rgba(255,210,140,0.32) 18%, rgba(248,228,190,0.18) 36%, transparent 65%)`
                  : `radial-gradient(110vmax 110vmax at ${ripple.x}px ${ripple.y}px, rgba(40,60,100,0.40) 0%, rgba(20,28,52,0.22) 28%, rgba(8,10,18,0.10) 50%, transparent 72%)`,
              mixBlendMode: ripple.to === "light" ? "soft-light" : "multiply",
            }}
          />
          {/* Tight, fast inner spark — the bulb itself flaring on */}
          <motion.div
            key={`${ripple.key}-spark`}
            className="pointer-events-none fixed inset-0 z-[56]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.1, times: [0, 0.25, 1], ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                ripple.to === "light"
                  ? `radial-gradient(28vmax 28vmax at ${ripple.x}px ${ripple.y}px, rgba(255,236,184,0.85) 0%, rgba(255,210,130,0.45) 25%, transparent 60%)`
                  : `radial-gradient(24vmax 24vmax at ${ripple.x}px ${ripple.y}px, rgba(96,140,210,0.55) 0%, rgba(40,60,110,0.25) 30%, transparent 65%)`,
              mixBlendMode: ripple.to === "light" ? "screen" : "screen",
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

// ─── chrome / ambient ───────────────────────────────────────────────────────

function AmbientBackdrop({ enableMotion }: { enableMotion: boolean }) {
  const { scrollY } = useScroll()
  // Parallax layers — different translate rates create depth as you scroll.
  const ySlow = useTransform(scrollY, [0, 4000], [0, -240])
  const yMed = useTransform(scrollY, [0, 4000], [0, -480])
  const yFast = useTransform(scrollY, [0, 4000], [0, -720])
  const gridY = useTransform(scrollY, [0, 4000], [0, -160])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {enableMotion ? (
        <>
          <motion.div
            className="absolute -left-32 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--ambient-1) 0%, transparent 70%)", y: ySlow }}
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-24 top-1/3 h-[32rem] w-[32rem] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--ambient-2) 0%, transparent 70%)", y: yMed }}
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--ambient-3) 0%, transparent 70%)", y: yFast }}
            animate={{ x: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        <>
          <div className="absolute -left-32 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]" style={{ background: "var(--ambient-1)" }} />
          <div className="absolute -right-24 top-1/3 h-[32rem] w-[32rem] rounded-full blur-[120px]" style={{ background: "var(--ambient-2)" }} />
        </>
      )}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          y: gridY,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}

function FloatingNav({ theme, onLamp }: { theme: Theme; onLamp: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
      <nav
        className="flex items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-xl"
        style={{ borderColor: "var(--line)", background: "color-mix(in srgb, var(--bg) 55%, transparent)" }}
      >
        <span
          className="ml-2 font-grotesk text-[12px] uppercase tracking-[0.22em]"
          style={{ color: "var(--ink-dim)" }}
        >
          Morphika
        </span>
        <LampButton theme={theme} onClick={onLamp} />
        <a
          href="#waitlist"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em]"
          style={{ background: "var(--btn-bg)", color: "var(--btn-ink)", transition: "background 0.6s ease, color 0.6s ease" }}
        >
          Get early access
          <ArrowRight className="h-3 w-3" />
        </a>
      </nav>
    </div>
  )
}

function LampButton({
  theme,
  onClick,
  compact = false,
}: {
  theme: Theme
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  compact?: boolean
}) {
  const lit = theme === "light"
  // Both states glow — lit is bright/warm, dark is a dim night-light ember.
  const ringMin = lit ? "rgba(252,211,77,0.55)" : "rgba(252,211,77,0.22)"
  const ringMax = lit ? "rgba(252,211,77,0.0)" : "rgba(252,211,77,0.0)"
  const innerGlow = lit
    ? "radial-gradient(circle, rgba(255,228,160,0.7) 0%, rgba(252,211,77,0.25) 50%, transparent 75%)"
    : "radial-gradient(circle, rgba(252,211,77,0.30) 0%, rgba(252,211,77,0.08) 55%, transparent 80%)"
  const bulbColor = lit ? "#f59e0b" : "#facc15"
  const bulbFill = lit ? "rgba(252,211,77,0.55)" : "rgba(252,211,77,0.18)"

  return (
    <button
      onClick={onClick}
      aria-label={lit ? "Turn off the light" : "Turn on the light"}
      className={`group relative ${compact ? "h-8 w-8" : "ml-1 h-8 w-10"} grid place-items-center overflow-visible rounded-full border`}
      style={{
        borderColor: lit ? "rgba(252,211,77,0.35)" : "var(--line)",
        background: lit ? "rgba(255,224,150,0.18)" : "var(--surface)",
        transition: "border-color 0.6s ease, background 0.6s ease",
      }}
    >
      {/* tiny pull cord */}
      <span
        className="absolute left-1/2 top-[-10px] h-[10px] w-px -translate-x-1/2"
        style={{ background: "var(--line-strong)" }}
      />
      {/* outer halo — always breathing, intensity follows theme */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{ boxShadow: [`0 0 0 0 ${ringMin}`, `0 0 0 ${lit ? 10 : 5}px ${ringMax}`] }}
        transition={{ duration: lit ? 2.4 : 3.6, repeat: Infinity, ease: "easeOut" }}
      />
      {/* inner glow disc — continuously visible, breathes softly */}
      <motion.span
        className="pointer-events-none absolute -inset-1 rounded-full"
        style={{ background: innerGlow, filter: "blur(2px)" }}
        animate={{ opacity: lit ? [0.85, 1, 0.85] : [0.45, 0.65, 0.45] }}
        transition={{ duration: lit ? 3.2 : 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <Lightbulb
        className="relative z-10 h-4 w-4"
        strokeWidth={1.6}
        style={{ color: bulbColor, fill: bulbFill, transition: "color 0.6s ease, fill 0.6s ease" }}
      />
    </button>
  )
}

// ─── hero ───────────────────────────────────────────────────────────────────

function Hero({ enableMotion }: { enableMotion: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 35])

  return (
    <section ref={ref} className="relative px-6 pt-40 md:px-16 md:pt-48">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-wrap items-center gap-3"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] uppercase tracking-[0.18em]"
            style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink-dim)" }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "var(--ok)" }} />
              <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--ok)" }} />
            </span>
            iOS beta · summer 2026
          </span>
          <span className="font-grotesk text-[12px] uppercase tracking-[0.22em]" style={{ color: "var(--ink-faint)" }}>
            By Trixode Studios
          </span>
        </motion.div>

        <motion.div
          className="grid items-end gap-12 lg:grid-cols-12"
          style={enableMotion ? { y: textY, opacity: textOpacity, scale: textScale } : undefined}
        >
          <div className="lg:col-span-8">
            <h1
              className="font-grotesk text-[3rem] font-light leading-[1.02] tracking-[-0.022em] sm:text-[4.5rem] md:text-[6.25rem] xl:text-[7.5rem]"
              style={{ color: "var(--ink)" }}
            >
              <BreathLine delay={0.1}>Your AI for email.</BreathLine>
              <BreathLine delay={0.22}>
                Across{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--ink) 0%, var(--accent) 100%)" }}
                >
                  every inbox.
                </span>
              </BreathLine>
              <BreathLine delay={0.34}>Approved with you.</BreathLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-12 max-w-3xl text-xl font-light leading-relaxed md:text-2xl"
              style={{ color: "var(--ink-dim)" }}
            >
              Morphika reads, drafts, and — with FaceID — sends across every Gmail, Outlook, and Apple Mail
              account you own. Quiet on the easy stuff. Loud and biometric on the things that matter.
              Receipts for all of it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-14 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#waitlist"
                className="group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-base font-medium transition"
                style={{ background: "var(--btn-bg)", color: "var(--btn-ink)" }}
              >
                Get early access
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-3 rounded-full border px-8 py-4 text-base font-medium transition"
                style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
              >
                See it work
                <Layers className="h-5 w-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-16 flex flex-wrap items-center gap-5 text-[12px] uppercase tracking-[0.16em]"
              style={{ color: "var(--ink-mute)" }}
            >
              <span className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                Free for 14 days
              </span>
              <span className="h-3 w-px" style={{ background: "var(--line)" }} />
              <span>No card to start</span>
              <span className="h-3 w-px" style={{ background: "var(--line)" }} />
              <span>Cancel anytime</span>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:col-span-4 lg:block"
            style={enableMotion ? { y: orbY, scale: orbScale, rotate: orbRotate } : undefined}
          >
            <BiometricOrb enableMotion={enableMotion} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function BreathLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden pb-[0.18em]">
      <motion.span
        className="block font-grotesk"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function BiometricOrb({ enableMotion }: { enableMotion: boolean }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, var(--accent-line) 0%, transparent 70%)",
        }}
        animate={enableMotion ? { scale: [1, 1.04, 1], opacity: [0.85, 1, 0.85] } : undefined}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-6 rounded-full border"
        style={{ borderColor: "var(--line-strong)", borderStyle: "dashed" }}
        animate={enableMotion ? { rotate: [0, 360] } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-14 rounded-full border"
        style={{ borderColor: "var(--accent-line)", borderStyle: "dashed" }}
        animate={enableMotion ? { rotate: [360, 0] } : undefined}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <motion.div
          className="flex h-32 w-32 items-center justify-center rounded-3xl border backdrop-blur-xl"
          style={{ borderColor: "var(--line-strong)", background: "color-mix(in srgb, var(--bg) 60%, transparent)" }}
          animate={enableMotion ? { y: [0, -6, 0] } : undefined}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ScanFace className="h-14 w-14" style={{ color: "var(--accent)" }} strokeWidth={1.25} />
        </motion.div>
      </div>
    </div>
  )
}

// ─── value stripe ───────────────────────────────────────────────────────────

function ValueStripe() {
  return (
    <section className="relative px-6 pt-28 md:px-16 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <div
          className="grid gap-px overflow-hidden rounded-3xl border md:grid-cols-3"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}
        >
          {VALUE_PROPS.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-8 md:p-10"
                style={{ background: "var(--panel)" }}
              >
                <Icon className="h-7 w-7" strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                <h3 className="mt-7 font-grotesk text-3xl font-light leading-tight" style={{ color: "var(--ink)" }}>
                  {v.title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  {v.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── device demo ────────────────────────────────────────────────────────────

function DeviceSection({
  enableMotion,
  account,
  accountId,
  setAccountId,
  tier,
  setTier,
  draft,
  draftIndex,
  setDraftIndex,
}: {
  enableMotion: boolean
  account: Account
  accountId: Account["id"]
  setAccountId: (id: Account["id"]) => void
  tier: Tier
  setTier: (t: Tier) => void
  draft: DraftMessage
  draftIndex: number
  setDraftIndex: (i: number) => void
}) {
  const [phase, setPhase] = useState<"idle" | "scanning" | "approved">("idle")
  const [audit, setAudit] = useState<
    { id: string; time: string; verb: string; subject: string; tier: Tier; ok: boolean }[]
  >([
    { id: "seed-1", time: "08:14:02", verb: "READ", subject: "47 overnight messages triaged", tier: "auto", ok: true },
    { id: "seed-2", time: "08:14:11", verb: "DRAFT", subject: "Re: deck + warm intro", tier: "confirm", ok: true },
  ])
  const [composeText, setComposeText] = useState("")
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    setComposeText("")
    setPhase("idle")
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    if (!enableMotion) {
      setComposeText(draft.body)
      return
    }
    let i = 0
    intervalRef.current = window.setInterval(() => {
      i += 2
      setComposeText(draft.body.slice(0, i))
      if (i >= draft.body.length && intervalRef.current) window.clearInterval(intervalRef.current)
    }, 18)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [draftIndex, enableMotion, draft.body])

  const tierMeta = TIERS.find((t) => t.id === tier) ?? TIERS[2]

  const handleApprove = () => {
    if (phase === "scanning") return
    if (tier === "faceid") {
      setPhase("scanning")
      window.setTimeout(() => {
        pushAudit(true)
        flashApproved()
      }, 1500)
      return
    }
    pushAudit(true)
    flashApproved()
  }

  const flashApproved = () => {
    setPhase("approved")
    window.setTimeout(() => setPhase("idle"), 1800)
  }

  const pushAudit = (ok: boolean) => {
    const stamp = new Date().toLocaleTimeString("en-GB", { hour12: false })
    setAudit((prev) =>
      [{ id: `${Date.now()}`, time: stamp, verb: "SEND", subject: draft.subject, tier, ok }, ...prev].slice(0, 6),
    )
  }

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: demoProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const phoneY = useTransform(demoProgress, [0, 0.5, 1], [80, 0, -80])
  const phoneRotate = useTransform(demoProgress, [0, 0.5, 1], [-3, 0, 2])

  return (
    <section ref={sectionRef} id="demo" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          ord="01"
          eyebrow="Try it"
          title="Pick the message. Pick the tier. Approve with your face."
          subtitle="This is the actual flow. Tap a draft on the left, pick a tier, hold approve. Watch the audit log on the right write itself."
        />

        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px_minmax(0,1fr)]">
          <div className="order-2 space-y-6 lg:order-1">
            <Panel title="Your accounts">
              <div className="grid grid-cols-1 gap-2">
                {ACCOUNTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAccountId(a.id)}
                    className="group flex w-full min-w-0 items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition"
                    style={{
                      borderColor: accountId === a.id ? "var(--line-strong)" : "var(--line)",
                      background: accountId === a.id ? "var(--surface-hover)" : "var(--surface)",
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: a.dot }} />
                      <div className="min-w-0">
                        <p className="truncate text-[15px]" style={{ color: "var(--ink)" }}>{a.label}</p>
                        <p className="truncate text-[12px]" style={{ color: "var(--ink-mute)" }}>{a.address}</p>
                      </div>
                    </div>
                    {accountId === a.id ? (
                      <Check className="h-4 w-4" style={{ color: "var(--ink-dim)" }} />
                    ) : (
                      <ChevronRight className="h-4 w-4" style={{ color: "var(--ink-faint)" }} />
                    )}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel title="Drafts your agent prepared">
              <div className="grid grid-cols-1 gap-2">
                {DRAFTS.map((d, i) => {
                  const a = ACCOUNTS.find((x) => x.id === d.accountId)!
                  const active = draftIndex === i
                  return (
                    <button
                      key={d.subject}
                      onClick={() => setDraftIndex(i)}
                      className="flex w-full min-w-0 items-start gap-3 rounded-2xl border p-3.5 text-left transition"
                      style={{
                        borderColor: active ? "var(--line-strong)" : "var(--line)",
                        background: active ? "var(--surface-hover)" : "var(--surface)",
                      }}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a.dot }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px]" style={{ color: "var(--ink)" }}>{d.subject}</p>
                        <p className="truncate text-[12px]" style={{ color: "var(--ink-mute)" }}>{d.preview}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </Panel>
          </div>

          <motion.div
            className="order-1 lg:order-2"
            style={enableMotion ? { y: phoneY, rotate: phoneRotate } : undefined}
          >
            <PhoneFrame>
              <PhoneInbox
                account={account}
                tier={tier}
                draft={draft}
                composeText={composeText}
                phase={phase}
                tierMeta={tierMeta}
                onApprove={handleApprove}
                onChangeTier={setTier}
                enableMotion={enableMotion}
              />
            </PhoneFrame>
            <p
              className="mt-5 text-center text-[12px] uppercase tracking-[0.18em]"
              style={{ color: "var(--ink-faint)" }}
            >
              Live mock · tap & hold to feel the gate
            </p>
          </motion.div>

          <div className="order-3 lg:order-3 space-y-6">
            <Panel title="Receipts · written in real time">
              <ul className="space-y-2 font-mono text-[12.5px]">
                <AnimatePresence initial={false}>
                  {audit.map((row) => (
                    <motion.li
                      key={row.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start gap-2 rounded-xl border px-3 py-2"
                      style={{ borderColor: "var(--line)", background: "var(--code-bg)" }}
                    >
                      <span style={{ color: "var(--ink-mute)" }}>{row.time}</span>
                      <span
                        className="shrink-0 rounded px-1.5 py-px text-[10px] uppercase tracking-[0.1em]"
                        style={{
                          background:
                            row.verb === "SEND"
                              ? "var(--ok-soft)"
                              : row.verb === "DRAFT"
                                ? "var(--accent-soft)"
                                : "var(--surface-strong)",
                          color:
                            row.verb === "SEND"
                              ? "var(--ok)"
                              : row.verb === "DRAFT"
                                ? "var(--accent-ink)"
                                : "var(--ink-dim)",
                        }}
                      >
                        {row.verb}
                      </span>
                      <span className="truncate" style={{ color: "var(--ink)" }}>
                        {row.subject}
                      </span>
                      <span className="ml-auto shrink-0" style={{ color: "var(--ink-mute)" }}>
                        sig:{row.id.slice(-6)}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div
                className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "var(--ink-mute)" }}
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5" style={{ color: "var(--ok)" }} />
                  Signed · append-only
                </span>
                <span>Export anytime</span>
              </div>
            </Panel>

            <Panel title="Moltguard · scanning every draft">
              <div className="space-y-3 text-[15px]">
                <ScanRow label="Phishing pattern" status="clear" />
                <ScanRow label="Tone & voice match" status="clear" />
                <ScanRow label="Recipient anomaly" status={draft.amount ? "warn" : "clear"} />
                <ScanRow label="Attachment safety" status="clear" />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-3xl border p-6 backdrop-blur-xl"
      style={{ borderColor: "var(--line)", background: "var(--surface)" }}
    >
      <p className="mb-4 text-[10.5px] uppercase tracking-[0.22em]" style={{ color: "var(--ink-mute)" }}>
        {title}
      </p>
      {children}
    </div>
  )
}

function ScanRow({ label, status }: { label: string; status: "clear" | "warn" }) {
  const ok = status === "clear"
  return (
    <div
      className="flex items-center justify-between rounded-xl border px-3 py-2.5"
      style={{ borderColor: "var(--line)", background: "var(--code-bg)" }}
    >
      <span style={{ color: "var(--ink)" }}>{label}</span>
      <span
        className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em]"
        style={{ color: ok ? "var(--ok)" : "var(--warn)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ok ? "var(--ok)" : "var(--warn)" }} />
        {ok ? "Clear" : "Review"}
      </span>
    </div>
  )
}

// Phone keeps its own dark palette regardless of page theme — feels more like a product render.
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div
        className="absolute -inset-6 rounded-[60px] opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-line) 0%, transparent 70%)" }}
      />
      <div
        className="relative rounded-[44px] border bg-gradient-to-b from-white/10 to-white/[0.02] p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ borderColor: "var(--line-strong)" }}
      >
        <div className="relative overflow-hidden rounded-[36px] bg-[#0a0a0d]">
          <div className="absolute left-1/2 top-2 z-20 flex h-7 w-32 -translate-x-1/2 items-center justify-center rounded-full bg-black/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          </div>
          <div className="relative h-[740px] w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}

function PhoneInbox({
  account,
  tier,
  draft,
  composeText,
  phase,
  tierMeta,
  onApprove,
  onChangeTier,
  enableMotion,
}: {
  account: Account
  tier: Tier
  draft: DraftMessage
  composeText: string
  phase: "idle" | "scanning" | "approved"
  tierMeta: { id: Tier; label: string; help: string; accent: string }
  onApprove: () => void
  onChangeTier: (t: Tier) => void
  enableMotion: boolean
}) {
  return (
    <div className="flex h-full flex-col px-4 pb-4 pt-12 text-white">
      <div className="flex items-center justify-between px-2 text-[10px] text-white/60">
        <span>9:41</span>
        <span className="font-grotesk tracking-[0.12em]">MORPHIKA</span>
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3" /> 96%
        </span>
      </div>

      <motion.div
        key={account.id}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2"
      >
        <span className="h-2 w-2 rounded-full" style={{ background: account.dot }} />
        <span className="text-[11px] text-white/75">{account.label}</span>
        <span className="ml-auto text-[10px] text-white/40">{account.address}</span>
      </motion.div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <motion.div
          key={draft.subject}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative flex min-h-0 flex-1 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Awaiting your nod</p>
              <p className="mt-1 font-grotesk text-[15px] leading-snug text-white">{draft.subject}</p>
              <p className="mt-1 text-[11px] text-white/55">to · {draft.to}</p>
            </div>
            {draft.amount && (
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-amber-200">
                {draft.amount}
              </span>
            )}
          </div>

          <div className="mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3">
            <p className="whitespace-pre-line font-mono text-[11.5px] leading-relaxed text-white/80">
              {composeText}
              {enableMotion && composeText.length < draft.body.length && (
                <span className="ml-px inline-block h-3 w-1.5 -translate-y-0.5 bg-blue-300/80 align-middle">&nbsp;</span>
              )}
            </p>
          </div>

          <p className="mt-3 text-[11px] text-white/45">{draft.reason}</p>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {TIERS.map((t) => {
              const active = t.id === tier
              return (
                <button
                  key={t.id}
                  onClick={() => onChangeTier(t.id)}
                  className={`rounded-xl border px-2 py-2 text-center text-[10px] uppercase tracking-[0.14em] transition ${
                    active ? "border-white/40 bg-white/10 text-white" : "border-white/10 text-white/55 hover:text-white"
                  }`}
                  style={active ? { boxShadow: `inset 0 0 0 1px ${t.accent}55` } : undefined}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[10.5px] text-white/45">{tierMeta.help}</p>

          <div className="mt-4">
            <ApproveButton phase={phase} tier={tier} onClick={onApprove} accent={tierMeta.accent} />
          </div>
        </motion.div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-emerald-300" />
          Audit: streaming
        </span>
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3 w-3" />
          12 MCP servers
        </span>
      </div>

      <AnimatePresence>
        {phase === "scanning" && tier === "faceid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [0.96, 1.06, 0.96] }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="relative"
            >
              <ScanFace className="h-20 w-20 text-blue-300" strokeWidth={1} />
              <motion.div
                className="absolute -inset-6 rounded-full border border-blue-300/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                style={{ borderStyle: "dashed" }}
              />
              <motion.div
                className="absolute left-1/2 top-0 h-1 w-24 -translate-x-1/2 rounded-full bg-blue-300/70 blur-[2px]"
                animate={{ y: [0, 64, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/65">FaceID · approving send</p>
          </motion.div>
        )}
        {phase === "approved" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-24 w-24 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-400/10"
            >
              <Check className="h-12 w-12 text-emerald-300" strokeWidth={1.5} />
            </motion.div>
            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/65">Sent · logged · signed</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ApproveButton({
  phase,
  tier,
  onClick,
  accent,
}: {
  phase: "idle" | "scanning" | "approved"
  tier: Tier
  onClick: () => void
  accent: string
}) {
  const Icon = tier === "faceid" ? Fingerprint : tier === "confirm" ? Send : Sparkles
  const label =
    phase === "scanning"
      ? "Scanning…"
      : phase === "approved"
        ? "Approved"
        : tier === "faceid"
          ? "Hold to approve · FaceID"
          : tier === "confirm"
            ? "Tap to confirm send"
            : "Auto-send queued"
  return (
    <button
      onClick={onClick}
      disabled={phase !== "idle"}
      className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.1] disabled:opacity-70"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <Icon className="h-4 w-4" style={{ color: accent }} />
        {label}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  )
}

// ─── scenarios ──────────────────────────────────────────────────────────────

function ScenariosSection() {
  const [active, setActive] = useState(0)
  const current = SCENARIOS[active]
  const Icon = current.icon
  return (
    <section id="scenarios" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          ord="02"
          eyebrow="A day with Morphika"
          title="What your inbox looks like on a Tuesday."
          subtitle="Tap through the timeline. See what changes when the agent is the one reading first."
        />

        <div className="mt-20 grid items-start gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="relative">
            <div
              className="absolute left-[15px] top-2 bottom-2 hidden w-px lg:block"
              style={{ background: "var(--line)" }}
            />
            <ul className="space-y-1">
              {SCENARIOS.map((s, i) => {
                const ItemIcon = s.icon
                const isActive = active === i
                return (
                  <li key={s.time}>
                    <button
                      onClick={() => setActive(i)}
                      className="relative flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition"
                      style={{
                        borderColor: isActive ? "var(--line-strong)" : "transparent",
                        background: isActive ? "var(--surface-hover)" : "transparent",
                      }}
                    >
                      <span
                        className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border"
                        style={{
                          borderColor: isActive ? "var(--accent-line)" : "var(--line)",
                          background: isActive ? "var(--accent-soft)" : "var(--code-bg)",
                        }}
                      >
                        <ItemIcon
                          className="h-4 w-4"
                          style={{ color: isActive ? "var(--accent)" : "var(--ink-mute)" }}
                        />
                      </span>
                      <div>
                        <p
                          className="font-mono text-[11.5px] uppercase tracking-[0.16em]"
                          style={{ color: "var(--ink-faint)" }}
                        >
                          {s.time}
                        </p>
                        <p
                          className="text-[16px]"
                          style={{ color: isActive ? "var(--ink)" : "var(--ink-dim)" }}
                        >
                          {s.title}
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl border p-8 md:p-12"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Clock className="h-3 w-3" />
                  {current.time}
                </span>
                <span
                  className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--line)", background: "var(--surface-hover)", color: "var(--ink-dim)" }}
                >
                  {current.tag}
                </span>
              </div>
              <h3
                className="mt-8 font-grotesk text-4xl font-light leading-tight md:text-5xl"
                style={{ color: "var(--ink)" }}
              >
                {current.title}
              </h3>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "var(--line)", background: "var(--code-bg)" }}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--ink-faint)" }}>
                    Without Morphika
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                    {current.before}
                  </p>
                </div>
                <div
                  className="relative overflow-hidden rounded-2xl border p-6"
                  style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)" }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
                    style={{ background: "var(--accent-line)" }}
                  />
                  <p
                    className="text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--accent)" }}
                  >
                    With Morphika
                  </p>
                  <p className="mt-3 text-[17px] leading-relaxed" style={{ color: "var(--ink)" }}>
                    {current.after}
                  </p>
                  <Icon className="mt-6 h-6 w-6" style={{ color: "var(--accent)" }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ─── feature grid ───────────────────────────────────────────────────────────

function FeatureGrid() {
  return (
    <section id="features" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          ord="03"
          eyebrow="What you get"
          title="Everything an email-first life actually needs."
          subtitle="Built by people who run their working day across four inboxes and trust no one with the send button."
        />
        <div
          className="mt-20 grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                className="group relative overflow-hidden p-8 transition"
                style={{ background: "var(--panel)" }}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition group-hover:opacity-100"
                  style={{ background: "var(--accent-soft)" }}
                />
                <Icon className="h-6 w-6" style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                <p className="mt-6 font-grotesk text-[19px]" style={{ color: "var(--ink)" }}>
                  {f.label}
                </p>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  {f.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── trust ──────────────────────────────────────────────────────────────────

function TrustSection() {
  const pillars = [
    { icon: Lock, title: "Your data stays where you put it.", body: "On your phone, or on a node you control. Never trained into a public model." },
    { icon: ScanFace, title: "Biometric or it doesn't happen.", body: "FaceID gates every send that matters. Keys live in the Secure Enclave and don't sync." },
    { icon: Eye, title: "Every action has a receipt.", body: "Append-only audit log of every read, draft, and send. Signed. Exportable." },
    { icon: Server, title: "Run it on your own iron.", body: "Team plans ship with a Docker image and a Helm chart. Single-tenant by default." },
  ]
  return (
    <section id="trust" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          ord="04"
          eyebrow="Trust"
          title="Built for the people who can't afford to be wrong."
          subtitle="If your inbox holds wires, contracts, or client confidences, this is the security model you'd build for yourself."
        />
        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border p-10 transition"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition group-hover:opacity-100"
                  style={{ background: "var(--accent-soft)" }}
                />
                <Icon className="h-7 w-7" style={{ color: "var(--accent)" }} strokeWidth={1.5} />
                <h3 className="mt-7 font-grotesk text-[28px] font-light leading-tight" style={{ color: "var(--ink)" }}>
                  {p.title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  {p.body}
                </p>
              </motion.article>
            )
          })}
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.18em]"
          style={{ color: "var(--ink-mute)" }}
        >
          <span>SOC 2 · in progress</span>
          <span className="hidden h-3 w-px sm:block" style={{ background: "var(--line)" }} />
          <span>ISO 27001 mapped</span>
          <span className="hidden h-3 w-px sm:block" style={{ background: "var(--line)" }} />
          <span>ISO 42001 mapped</span>
          <span className="hidden h-3 w-px sm:block" style={{ background: "var(--line)" }} />
          <span>PIPEDA · GDPR ready</span>
        </div>
      </div>
    </section>
  )
}

// ─── social proof ───────────────────────────────────────────────────────────

function SocialProofSection() {
  return (
    <section className="relative px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[40px] border p-10 md:p-16"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "var(--accent-soft)" }}
          />
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] uppercase tracking-[0.18em]"
                style={{ borderColor: "var(--line)", background: "var(--surface-hover)", color: "var(--ink-dim)" }}
              >
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                From a design partner
              </span>
              <p
                className="mt-8 font-grotesk text-3xl font-light leading-snug md:text-[44px]"
                style={{ color: "var(--ink)" }}
              >
                "{TESTIMONIAL.quote}"
              </p>
              <p className="mt-7 text-[15px]" style={{ color: "var(--ink-dim)" }}>
                {TESTIMONIAL.author}
              </p>
              <p className="text-[13px]" style={{ color: "var(--ink-faint)" }}>
                {TESTIMONIAL.meta}
              </p>
            </div>
            <div
              className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border"
              style={{ borderColor: "var(--line)", background: "var(--line)" }}
            >
              {SOCIAL_PROOF.map((s) => (
                <div key={s.label} className="p-7" style={{ background: "var(--panel)" }}>
                  <p
                    className="font-grotesk text-4xl font-light md:text-[44px]"
                    style={{ color: "var(--ink)" }}
                  >
                    {s.stat}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── pricing ────────────────────────────────────────────────────────────────

function PricingSection() {
  const [annual, setAnnual] = useState(true)
  const multiplier = annual ? 0.8 : 1
  return (
    <section id="pricing" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          ord="05"
          eyebrow="Pricing"
          title="One price for the calm. Pay for the inboxes you actually have."
          subtitle="Start free. Upgrade when you stop opening Gmail at 11pm."
        />

        <div
          className="mt-14 flex items-center justify-center gap-3 text-[12px] uppercase tracking-[0.16em]"
          style={{ color: "var(--ink-dim)" }}
        >
          <span style={{ color: annual ? "var(--ink-faint)" : "var(--ink)" }}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            aria-label="Toggle annual billing"
            className="relative h-7 w-14 rounded-full border transition"
            style={{ borderColor: "var(--line)", background: "var(--surface)" }}
          >
            <motion.span
              className="absolute top-0.5 h-6 w-6 rounded-full"
              style={{ background: "var(--accent)" }}
              animate={{ x: annual ? 30 : 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
          <span style={{ color: annual ? "var(--ink)" : "var(--ink-faint)" }}>
            Annual <span style={{ color: "var(--ok)" }}>−20%</span>
          </span>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PLANS.map((p, i) => {
            const numeric = parseFloat(p.price.replace("$", ""))
            const priced = `$${Math.round(numeric * multiplier)}`
            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative overflow-hidden rounded-3xl border p-10 transition"
                style={{
                  borderColor: p.highlight ? "var(--accent-line)" : "var(--line)",
                  background: p.highlight
                    ? "linear-gradient(to bottom, var(--accent-soft), var(--surface))"
                    : "var(--surface)",
                }}
              >
                {p.highlight && (
                  <span
                    className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.16em]"
                    style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <Sparkles className="h-3 w-3" />
                    Most picked
                  </span>
                )}
                <p
                  className="font-grotesk text-[13px] uppercase tracking-[0.22em]"
                  style={{ color: "var(--accent)" }}
                >
                  {p.name}
                </p>
                <div className="mt-7 flex items-baseline gap-1.5">
                  <span className="font-grotesk text-6xl font-light" style={{ color: "var(--ink)" }}>
                    {priced}
                  </span>
                  <span className="text-[14px]" style={{ color: "var(--ink-mute)" }}>
                    {p.cadence}
                  </span>
                </div>
                <p className="mt-5 text-[16px] leading-relaxed" style={{ color: "var(--ink-dim)" }}>
                  {p.blurb}
                </p>
                <ul className="mt-9 space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px]" style={{ color: "var(--ink)" }}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--ok)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="mt-11 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition"
                  style={
                    p.highlight
                      ? { background: "var(--btn-bg)", color: "var(--btn-ink)" }
                      : {
                          border: "1px solid var(--line-strong)",
                          background: "var(--surface-hover)",
                          color: "var(--ink)",
                        }
                  }
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            )
          })}
        </div>

        <p
          className="mt-12 text-center text-[13px] uppercase tracking-[0.16em]"
          style={{ color: "var(--ink-mute)" }}
        >
          Self-host & enterprise ·{" "}
          <a href="#waitlist" className="underline-offset-4 hover:underline" style={{ color: "var(--ink)" }}>
            talk to us
          </a>
        </p>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          ord="06"
          eyebrow="FAQ"
          title="The honest answers."
          subtitle="If you can't find what you're looking for, write us — we read every message."
        />
        <div
          className="mt-20 divide-y overflow-hidden rounded-3xl border"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} style={{ borderColor: "var(--line)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-7 text-left transition md:px-10 md:py-8"
                  style={{ background: isOpen ? "var(--surface-hover)" : "transparent" }}
                >
                  <span className="font-grotesk text-[20px] md:text-[24px]" style={{ color: "var(--ink)" }}>
                    {f.q}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-5 w-5" style={{ color: "var(--ink-dim)" }} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="px-6 pb-8 text-[17px] leading-relaxed md:px-10"
                        style={{ color: "var(--ink-dim)" }}
                      >
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── waitlist ───────────────────────────────────────────────────────────────

function WaitlistSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const valid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="relative px-6 py-36 md:px-16 md:py-48">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] border p-10 md:p-16"
          style={{
            borderColor: "var(--line-strong)",
            background: "linear-gradient(to bottom right, var(--surface-hover), var(--surface))",
          }}
        >
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "var(--accent-soft)" }}
          />
          <p className="text-[12px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>
            Limited early access
          </p>
          <h2
            className="mt-7 max-w-3xl font-grotesk text-5xl font-light leading-[1.05] tracking-[-0.02em] md:text-7xl"
            style={{ color: "var(--ink)" }}
          >
            Get the calmest inbox of your career.
          </h2>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed" style={{ color: "var(--ink-dim)" }}>
            We're inviting the first 500 users this summer. Regulated prosumers and small teams first. Drop
            your email — we'll send the iOS build the day yours opens.
          </p>

          <form onSubmit={handleSubmit} className="mt-12 flex max-w-xl flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="waitlist-email">Email</label>
            <div className="relative flex-1">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: "var(--ink-faint)" }}
              />
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSubmitted(false)
                }}
                placeholder="you@inbox.com"
                className="w-full rounded-full border py-4 pl-11 pr-4 text-[15px] focus:outline-none"
                style={{
                  borderColor: "var(--line-strong)",
                  background: "var(--code-bg)",
                  color: "var(--ink)",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!valid}
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ background: "var(--btn-bg)", color: "var(--btn-ink)" }}
            >
              {submitted ? "You're on the list" : "Join waitlist"}
              {submitted ? <Check className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            </button>
          </form>

          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-[14px]"
                style={{ color: "var(--ok)" }}
              >
                Thanks — we'll be in touch the day your invite opens.
              </motion.p>
            )}
          </AnimatePresence>

          <div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] uppercase tracking-[0.16em]"
            style={{ color: "var(--ink-mute)" }}
          >
            <span className="flex items-center gap-2" style={{ color: "var(--ink-dim)" }}>
              <Shield className="h-3.5 w-3.5" />
              No spam. Ever.
            </span>
            <span className="hidden h-3 w-px sm:block" style={{ background: "var(--line)" }} />
            <span>One-tap unsubscribe</span>
            <span className="hidden h-3 w-px sm:block" style={{ background: "var(--line)" }} />
            <span>iOS-first · macOS soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t px-6 py-14 md:px-16" style={{ borderColor: "var(--line)" }}>
      <div
        className="mx-auto flex max-w-7xl flex-col gap-6 text-[12px] uppercase tracking-[0.16em] md:flex-row md:items-center md:justify-between"
        style={{ color: "var(--ink-mute)" }}
      >
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-2" style={{ color: "var(--ink-dim)" }}>
            <Shield className="h-3.5 w-3.5" />
            Morphika · made by Trixode Studios
          </span>
          <span>Victoria, BC</span>
        </div>
        <div className="flex flex-wrap items-center gap-4" style={{ color: "var(--ink-faint)" }}>
          <a href="#faq" className="hover:opacity-70" style={{ color: "var(--ink-mute)" }}>FAQ</a>
          <span>·</span>
          <a href="#pricing" className="hover:opacity-70" style={{ color: "var(--ink-mute)" }}>Pricing</a>
          <span>·</span>
          <a
            href="mailto:hello@trixode-studios.com"
            className="hover:opacity-70"
            style={{ color: "var(--ink-mute)" }}
          >
            hello@trixode-studios.com
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── shared ─────────────────────────────────────────────────────────────────

function SectionHeading({
  ord,
  eyebrow,
  title,
  subtitle,
}: {
  ord: string
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end">
      <div className="md:col-span-3">
        <span
          className="font-mono text-[12px] uppercase tracking-[0.22em]"
          style={{ color: "var(--ink-faint)" }}
        >
          {ord} · {eyebrow}
        </span>
      </div>
      <div className="md:col-span-9">
        <motion.h2
          initial={{ opacity: 0, y: 56, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-grotesk text-4xl font-light leading-[1.05] tracking-[-0.015em] md:text-[64px]"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-xl leading-relaxed"
            style={{ color: "var(--ink-dim)" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  )
}
