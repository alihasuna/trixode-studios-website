"use client"

import type { ComponentType } from "react"
import { useEffect, useMemo, useState } from "react"
import type { MotionStyle } from "framer-motion"
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  Activity,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Cpu,
  Database,
  Fingerprint,
  Inbox,
  KeyRound,
  Layers3,
  Lock,
  Mail,
  Network,
  Radio,
  ScanFace,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react"

type IconComponent = ComponentType<{ className?: string }>

type AccountId = "gmail" | "outlook" | "apple"
type GateTier = "auto" | "confirm" | "faceid"
type GateState = "ready" | "scanning" | "approved"

interface Account {
  id: AccountId
  label: string
  address: string
  accent: string
  signal: string
}

interface DraftScenario {
  id: string
  accountId: AccountId
  tier: GateTier
  title: string
  to: string
  subject: string
  preview: string
  body: string
  risk: string
  amount?: string
}

interface ProofMetric {
  value: string
  label: string
  caption: string
}

interface SecurityLayer {
  icon: IconComponent
  title: string
  body: string
  accent: string
}

interface AuditEvent {
  id: string
  time: string
  label: string
  detail: string
  state: "done" | "live" | "queued"
}

const ACCOUNTS: Account[] = [
  {
    id: "gmail",
    label: "Gmail",
    address: "hussein@trixode-studios.com",
    accent: "#ef4444",
    signal: "Personal + investor context",
  },
  {
    id: "outlook",
    label: "Outlook",
    address: "hussein@morphika.io",
    accent: "#3b82f6",
    signal: "Operating account",
  },
  {
    id: "apple",
    label: "Apple Mail",
    address: "h.ballouk@icloud.com",
    accent: "#a7f3d0",
    signal: "Local iOS bridge",
  },
]

const TIERS: { id: GateTier; label: string; body: string; accent: string }[] = [
  {
    id: "auto",
    label: "auto",
    body: "Low-risk organization and drafts run silently.",
    accent: "#34d399",
  },
  {
    id: "confirm",
    label: "confirm",
    body: "External sends need a human tap before execution.",
    accent: "#fbbf24",
  },
  {
    id: "faceid",
    label: "faceid",
    body: "Sensitive actions require biometric approval.",
    accent: "#60a5fa",
  },
]

const DRAFTS: DraftScenario[] = [
  {
    id: "wire",
    accountId: "outlook",
    tier: "faceid",
    title: "High-risk send",
    to: "ops@northport-logistics.ca",
    subject: "Wire transfer - invoice INV-2026-441",
    preview: "Approving the CAD 15,400 transfer for the shipment cleared this morning.",
    body:
      "Hi team - approving the CAD 15,400 transfer for the Q2 shipment cleared at customs this morning. Reference INV-2026-441. Please reply with SWIFT confirmation by end of day.",
    amount: "CAD 15,400.00",
    risk: "Payment threshold crossed. Face ID gate required before send.",
  },
  {
    id: "room",
    accountId: "gmail",
    tier: "confirm",
    title: "Data room reply",
    to: "claire.shen@a16z-partners.com",
    subject: "Re: Morphika data room access",
    preview: "Sharing read-only access to the 60-artifact room and the Face ID demo.",
    body:
      "Claire - happy to share read-only access to the 60-artifact data room: pitch, model, whitepaper, risk register, and demo artifacts. The 7-step Face ID approval demo is queued for review.",
    risk: "External recipient. Human confirmation needed.",
  },
  {
    id: "workshop",
    accountId: "apple",
    tier: "auto",
    title: "Calendar coordination",
    to: "yumi@design-collective.studio",
    subject: "Brand workshop - Thursday window",
    preview: "Locking Thursday 2-4pm for the Morphika brand workshop.",
    body:
      "Yumi - locking Thursday 2-4pm for the Morphika brand workshop. The invite and agenda doc are attached to the thread.",
    risk: "Low-risk scheduling. Auto tier allowed.",
  },
]

const PROOF_METRICS: ProofMetric[] = [
  { value: "2-4", label: "inboxes per worker", caption: "The lived surface Morphika unifies." },
  { value: "0", label: "compliance-grade audit in rivals", caption: "No biometric approval plus append-only log." },
  { value: "7", label: "step Face ID demo", caption: "The approval flow shipping from the deck." },
  { value: "60", label: "artifact data room", caption: "Pitch, model, whitepaper, risk register." },
]

const SECURITY_LAYERS: SecurityLayer[] = [
  {
    icon: ScanFace,
    title: "Biometric send gate",
    body: "Face ID / Touch ID before sensitive sends. The user remains the final executor.",
    accent: "from-blue-400/30 to-cyan-300/10",
  },
  {
    icon: KeyRound,
    title: "Ed25519 action proof",
    body: "Every message action is signed, tiered, and written to the audit chain.",
    accent: "from-violet-400/30 to-blue-300/10",
  },
  {
    icon: ShieldCheck,
    title: "Moltguard scan",
    body: "Prompt-injection scanning sits in front of every tool call and mailbox adapter.",
    accent: "from-emerald-400/30 to-cyan-300/10",
  },
  {
    icon: Database,
    title: "Append-only audit",
    body: "Exportable SQLite artifact: who, what, account, tier, signature, and timestamp.",
    accent: "from-sky-400/30 to-indigo-300/10",
  },
]

const MARKET_SIGNALS = [
  "MCP-native plugin framework",
  "Self-hostable mesh",
  "Per-agent encrypted credentials",
  "Gmail + Outlook + Apple Mail",
]

function buildAuditEvents(draft: DraftScenario, account: Account, tier: GateTier, gateState: GateState): AuditEvent[] {
  return [
    {
      id: "read",
      time: "00:01",
      label: "context read",
      detail: `${account.label} thread inspected with scoped credential`,
      state: "done",
    },
    {
      id: "scan",
      time: "00:04",
      label: "Moltguard scan",
      detail: `Injection surface checked for ${draft.subject}`,
      state: gateState === "ready" ? "live" : "done",
    },
    {
      id: "tier",
      time: "00:07",
      label: `${tier} tier assigned`,
      detail: draft.risk,
      state: gateState === "approved" ? "done" : "live",
    },
    {
      id: "sign",
      time: "00:09",
      label: "Ed25519 signature",
      detail: gateState === "approved" ? "Action signed and sealed" : "Waiting for approval proof",
      state: gateState === "approved" ? "done" : gateState === "scanning" ? "live" : "queued",
    },
    {
      id: "append",
      time: "00:10",
      label: "append-only log",
      detail: gateState === "approved" ? "Audit event committed" : "Prepared immutable audit row",
      state: gateState === "approved" ? "done" : "queued",
    },
  ]
}

export default function Morphika55Mock() {
  const prefersReducedMotion = useReducedMotion()
  const enableMotion = !prefersReducedMotion
  const { scrollYProgress } = useScroll()
  const [draftIndex, setDraftIndex] = useState(0)
  const [accountId, setAccountId] = useState<AccountId>(DRAFTS[0].accountId)
  const [tier, setTier] = useState<GateTier>(DRAFTS[0].tier)
  const [gateState, setGateState] = useState<GateState>("ready")
  const [expandedAudit, setExpandedAudit] = useState(true)

  const draft = DRAFTS[draftIndex]
  const account = ACCOUNTS.find((item) => item.id === accountId) ?? ACCOUNTS[0]
  const tierMeta = TIERS.find((item) => item.id === tier) ?? TIERS[0]
  const auditEvents = useMemo(
    () => buildAuditEvents(draft, account, tier, gateState),
    [account, draft, gateState, tier]
  )

  useEffect(() => {
    setAccountId(draft.accountId)
    setTier(draft.tier)
    setGateState("ready")
  }, [draft.accountId, draft.tier])

  useEffect(() => {
    if (gateState !== "scanning") return

    const timer = window.setTimeout(() => setGateState("approved"), 1100)
    return () => window.clearTimeout(timer)
  }, [gateState])

  const approveLabel = gateState === "approved" ? "Approved" : tier === "faceid" ? "Face ID approve" : "Approve action"
  const ambientY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const ambientScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1.08, 1.16])
  const heroY = useTransform(scrollYProgress, [0, 0.34], [0, -96])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22, 0.42], [1, 0.82, 0.26])
  const cockpitY = useTransform(scrollYProgress, [0, 0.36], [0, 78])
  const cockpitScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.965])
  const ribbonY = useTransform(scrollYProgress, [0.02, 0.38], [0, -46])
  const depthY = useTransform(scrollYProgress, [0.18, 0.82], [92, -58])
  const marketY = useTransform(scrollYProgress, [0.58, 1], [86, -34])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white antialiased">
      <AmbientStage
        enableMotion={enableMotion}
        parallaxStyle={enableMotion ? { y: ambientY, scale: ambientScale } : undefined}
      />

      <main className="relative z-10">
        <section className="relative mx-auto min-h-screen w-full max-w-7xl px-5 py-8 sm:px-8 lg:min-h-[138vh] lg:px-10">
          <div className="relative flex min-h-screen flex-col justify-center py-6 lg:sticky lg:top-0">
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] xl:gap-14">
              <motion.div style={enableMotion ? { y: heroY, opacity: heroOpacity } : undefined}>
                <HeroCopy enableMotion={enableMotion} />
              </motion.div>

              <motion.section className="relative" style={enableMotion ? { y: cockpitY, scale: cockpitScale } : undefined}>
                <ProductCockpit
                  account={account}
                  accountId={accountId}
                  accounts={ACCOUNTS}
                  auditEvents={auditEvents}
                  draft={draft}
                  draftIndex={draftIndex}
                  drafts={DRAFTS}
                  enableMotion={enableMotion}
                  expandedAudit={expandedAudit}
                  gateState={gateState}
                  onApprove={() => setGateState(gateState === "approved" ? "ready" : "scanning")}
                  onSelectAccount={(nextAccount) => {
                    setAccountId(nextAccount)
                    setGateState("ready")
                  }}
                  onSelectDraft={setDraftIndex}
                  onSelectTier={(nextTier) => {
                    setTier(nextTier)
                    setGateState("ready")
                  }}
                  onToggleAudit={() => setExpandedAudit((value) => !value)}
                  tier={tier}
                  tierMeta={tierMeta}
                  tiers={TIERS}
                  approveLabel={approveLabel}
                />
              </motion.section>
            </div>

            <motion.div style={enableMotion ? { y: ribbonY } : undefined}>
              <ProofRibbon />
            </motion.div>
          </div>
        </section>

        <motion.section
          className="relative mx-auto grid w-full max-w-7xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10"
          style={enableMotion ? { y: depthY } : undefined}
        >
          <ArchitecturePanel enableMotion={enableMotion} />
          <SecurityGrid />
        </motion.section>

        <motion.section
          className="relative mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 lg:px-10"
          style={enableMotion ? { y: marketY } : undefined}
        >
          <MarketProof />
        </motion.section>
      </main>
    </div>
  )
}

function AmbientStage({
  enableMotion,
  parallaxStyle,
}: {
  enableMotion: boolean
  parallaxStyle?: MotionStyle
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div className="absolute -inset-32" style={parallaxStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-12%,rgba(124,168,255,0.34),transparent_38%),radial-gradient(ellipse_at_84%_34%,rgba(87,73,255,0.22),transparent_34%),radial-gradient(ellipse_at_14%_76%,rgba(42,226,218,0.18),transparent_36%),linear-gradient(180deg,rgba(3,3,3,0)_0%,rgba(3,3,3,0.72)_82%)]" />
        <div className="absolute left-1/2 top-1/2 h-[58rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[170px]" />
        <div className="absolute bottom-[-8rem] left-[8%] h-[32rem] w-[44rem] rotate-[-16deg] rounded-full bg-cyan-300/10 blur-[130px]" />
        <div className="absolute right-[-8rem] top-[12%] h-[38rem] w-[30rem] rotate-[18deg] rounded-full bg-violet-400/12 blur-[150px]" />
      </motion.div>
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "104px 104px",
          maskImage: "radial-gradient(circle at center, black 45%, transparent 82%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {enableMotion ? (
        <>
          <motion.div
            className="absolute left-[4%] top-[6%] h-[28rem] w-[42rem] rounded-full blur-[140px]"
            style={{ background: "radial-gradient(ellipse, rgba(96,165,250,0.22) 0%, transparent 68%)" }}
            animate={{ x: [0, 34, -14, 0], y: [0, 18, 44, 0], scale: [1, 1.06, 0.98, 1] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10rem] right-[2%] h-[34rem] w-[44rem] rounded-full blur-[150px]"
            style={{ background: "radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, transparent 70%)" }}
            animate={{ x: [0, -28, -52, 0], y: [0, -36, -14, 0], scale: [1, 1.03, 1.1, 1] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[18%] top-[18%] h-[24rem] w-[34rem] rounded-full blur-[130px]"
            style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.14) 0%, transparent 72%)" }}
            animate={{ opacity: [0.52, 0.72, 0.58, 0.52], scale: [1, 1.08, 1.02, 1] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : null}
    </div>
  )
}

function HeroCopy({ enableMotion }: { enableMotion: boolean }) {
  return (
    <motion.div
      initial={enableMotion ? { opacity: 0, y: 24 } : false}
      animate={enableMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/50 backdrop-blur-xl">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.9)]" />
        Secure agentic email today
      </div>

      <h1 className="max-w-4xl font-grotesk text-[3rem] font-light leading-[0.95] tracking-[-0.08em] text-white sm:text-6xl md:text-7xl xl:text-[6.5rem]">
        The inbox becomes a biometric
        <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">
          control plane.
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
        One MCP-native agent reads, drafts, gates, signs, and logs every action across Gmail, Outlook, and Apple Mail. The human remains the last private key.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {PROOF_METRICS.slice(0, 3).map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={enableMotion ? { opacity: 0, y: 18 } : false}
            animate={enableMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.12 + index * 0.08, duration: 0.55 }}
            className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
          >
            <p className="font-grotesk text-3xl font-light text-blue-200">{metric.value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

interface ProductCockpitProps {
  account: Account
  accountId: AccountId
  accounts: Account[]
  approveLabel: string
  auditEvents: AuditEvent[]
  draft: DraftScenario
  draftIndex: number
  drafts: DraftScenario[]
  enableMotion: boolean
  expandedAudit: boolean
  gateState: GateState
  onApprove: () => void
  onSelectAccount: (account: AccountId) => void
  onSelectDraft: (index: number) => void
  onSelectTier: (tier: GateTier) => void
  onToggleAudit: () => void
  tier: GateTier
  tierMeta: { id: GateTier; label: string; body: string; accent: string }
  tiers: { id: GateTier; label: string; body: string; accent: string }[]
}

function ProductCockpit({
  account,
  accountId,
  accounts,
  approveLabel,
  auditEvents,
  draft,
  draftIndex,
  drafts,
  enableMotion,
  expandedAudit,
  gateState,
  onApprove,
  onSelectAccount,
  onSelectDraft,
  onSelectTier,
  onToggleAudit,
  tier,
  tierMeta,
  tiers,
}: ProductCockpitProps) {
  return (
    <motion.div
      initial={enableMotion ? { opacity: 0, scale: 0.96, y: 28 } : false}
      animate={enableMotion ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-blue-500/20 blur-[80px]" />
      <div className="rounded-[2rem] border border-white/10 bg-black/50 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[0.88fr_1.12fr]">
          <PhoneFrame
            account={account}
            approveLabel={approveLabel}
            draft={draft}
            enableMotion={enableMotion}
            gateState={gateState}
            onApprove={onApprove}
            tier={tier}
            tierMeta={tierMeta}
          />

          <div className="flex flex-col gap-3">
            <ControlPanel
              accountId={accountId}
              accounts={accounts}
              draftIndex={draftIndex}
              drafts={drafts}
              onSelectAccount={onSelectAccount}
              onSelectDraft={onSelectDraft}
            />
            <TierPanel onSelectTier={onSelectTier} tier={tier} tiers={tiers} />
            <SecureBrainPanel
              account={account}
              auditEvents={auditEvents}
              enableMotion={enableMotion}
              expandedAudit={expandedAudit}
              gateState={gateState}
              onToggleAudit={onToggleAudit}
              tier={tier}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface PhoneFrameProps {
  account: Account
  approveLabel: string
  draft: DraftScenario
  enableMotion: boolean
  gateState: GateState
  onApprove: () => void
  tier: GateTier
  tierMeta: { id: GateTier; label: string; body: string; accent: string }
}

function PhoneFrame({ account, approveLabel, draft, enableMotion, gateState, onApprove, tier, tierMeta }: PhoneFrameProps) {
  const isApproved = gateState === "approved"
  const isScanning = gateState === "scanning"

  return (
    <div className="relative overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#05070d] p-4 min-h-[600px] sm:p-5">
      <div className="absolute left-1/2 top-3 z-20 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(59,130,246,0.22),transparent_38%)]" />

      <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center justify-between pt-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">Morphika secure brain</p>
              <h2 className="mt-2 font-grotesk text-2xl font-light">Unified inbox</h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              <Inbox className="h-5 w-5 text-blue-200" />
            </div>
          </div>

          <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Active account</p>
                <p className="mt-2 font-grotesk text-lg text-white">{account.label}</p>
                <p className="mt-1 text-xs text-white/40">{account.address}</p>
              </div>
              <span
                className="h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]"
                style={{ backgroundColor: account.accent, color: account.accent }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={draft.id}
              initial={enableMotion ? { opacity: 0, x: 18, filter: "blur(10px)" } : false}
              animate={enableMotion ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              exit={enableMotion ? { opacity: 0, x: -18, filter: "blur(10px)" } : {}}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.5rem] border border-white/10 bg-black/40 p-4"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
                <Mail className="h-3.5 w-3.5" /> Draft prepared
              </div>
              <h3 className="mt-4 font-grotesk text-xl font-light text-white">{draft.subject}</h3>
              <p className="mt-2 text-sm text-white/40">To: {draft.to}</p>
              {draft.amount ? (
                <div className="mt-4 inline-flex rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs text-blue-100">
                  {draft.amount}
                </div>
              ) : null}
              <p className="mt-4 text-sm leading-6 text-white/60">{draft.body}</p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">Approval tier</p>
              <p className="mt-1 font-grotesk text-2xl font-light" style={{ color: tierMeta.accent }}>
                {tierMeta.label}
              </p>
            </div>
            <GateGlyph gateState={gateState} tier={tier} enableMotion={enableMotion} />
          </div>
          <p className="mb-4 text-sm leading-6 text-white/50">{draft.risk}</p>
          <button
            type="button"
            onClick={onApprove}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-blue-300/30 bg-blue-400/15 px-4 py-4 font-grotesk text-sm uppercase tracking-[0.2em] text-blue-100 transition duration-300 hover:border-blue-200/60 hover:bg-blue-400/25 focus:outline-none focus:ring-2 focus:ring-blue-300/60"
            aria-pressed={isApproved}
          >
            {isScanning ? <Activity className={`h-4 w-4 ${enableMotion ? "animate-spin" : ""}`} /> : isApproved ? <Check className="h-4 w-4" /> : <Fingerprint className="h-4 w-4" />}
            {isScanning ? "Scanning" : approveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function GateGlyph({ enableMotion, gateState, tier }: { enableMotion: boolean; gateState: GateState; tier: GateTier }) {
  const iconColor = gateState === "approved" ? "text-emerald-200" : tier === "faceid" ? "text-blue-200" : "text-amber-200"

  return (
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/50">
      {enableMotion ? (
        <motion.span
          className="absolute inset-0 rounded-full border border-blue-300/35"
          animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
      <ScanFace className={`relative z-10 h-7 w-7 ${iconColor}`} />
    </div>
  )
}

interface ControlPanelProps {
  accountId: AccountId
  accounts: Account[]
  draftIndex: number
  drafts: DraftScenario[]
  onSelectAccount: (account: AccountId) => void
  onSelectDraft: (index: number) => void
}

function ControlPanel({ accountId, accounts, draftIndex, drafts, onSelectAccount, onSelectDraft }: ControlPanelProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Inbox routing</p>
          <h3 className="mt-1 font-grotesk text-xl font-light">Multi-account surface</h3>
        </div>
        <Network className="h-5 w-5 text-cyan-200" />
      </div>

      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {accounts.map((item) => {
          const active = item.id === accountId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectAccount(item.id)}
              aria-pressed={active}
              className={`rounded-2xl border p-3 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300/50 ${
                active ? "border-blue-300/50 bg-blue-400/10" : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className="mb-3 block h-2 w-2 rounded-full" style={{ backgroundColor: item.accent }} />
              <span className="block font-grotesk text-sm text-white">{item.label}</span>
              <span className="mt-1 block text-xs text-white/40">{item.signal}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 space-y-2">
        {drafts.map((item, index) => {
          const active = index === draftIndex
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectDraft(index)}
              aria-pressed={active}
              className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 ${
                active ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-black/20 hover:border-white/20"
              }`}
            >
              <span>
                <span className="block text-sm text-white">{item.title}</span>
                <span className="mt-1 block text-xs text-white/40">{item.preview}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TierPanel({
  onSelectTier,
  tier,
  tiers,
}: {
  onSelectTier: (tier: GateTier) => void
  tier: GateTier
  tiers: { id: GateTier; label: string; body: string; accent: string }[]
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/40">
        <Lock className="h-3.5 w-3.5" /> Approval tiers
      </div>
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {tiers.map((item) => {
          const active = item.id === tier
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTier(item.id)}
              aria-pressed={active}
              className={`rounded-2xl border p-3 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300/50 ${
                active ? "border-white/25 bg-white/[0.07]" : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span className="block font-grotesk text-lg" style={{ color: item.accent }}>
                {item.label}
              </span>
              <span className="mt-2 block text-xs leading-5 text-white/40">{item.body}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface SecureBrainPanelProps {
  account: Account
  auditEvents: AuditEvent[]
  enableMotion: boolean
  expandedAudit: boolean
  gateState: GateState
  onToggleAudit: () => void
  tier: GateTier
}

function SecureBrainPanel({ account, auditEvents, enableMotion, expandedAudit, gateState, onToggleAudit, tier }: SecureBrainPanelProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/40">Secure brain state</p>
          <h3 className="mt-1 font-grotesk text-xl font-light">Signed tool-call path</h3>
        </div>
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/10">
          {enableMotion ? (
            <motion.span
              className="absolute inset-0 rounded-full border border-cyan-200/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
          <Cpu className="relative z-10 h-5 w-5 text-blue-100" />
        </div>
      </div>

      <div className="my-4 grid grid-cols-3 gap-2">
        {[
          { label: "scope", value: account.label, icon: Inbox },
          { label: "tier", value: tier, icon: Fingerprint },
          { label: "state", value: gateState, icon: Radio },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 p-3">
              <Icon className="mb-2 h-4 w-4 text-blue-200" />
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-white/30">{item.label}</p>
              <p className="mt-1 truncate font-grotesk text-sm text-white">{item.value}</p>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onToggleAudit}
        className="mb-3 flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left text-sm text-white/60 transition hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-300/50"
        aria-expanded={expandedAudit}
      >
        Append-only audit stream
        <ArrowRight className={`h-4 w-4 transition ${expandedAudit ? "rotate-90" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expandedAudit ? (
          <motion.div
            initial={enableMotion ? { opacity: 0, height: 0 } : false}
            animate={enableMotion ? { opacity: 1, height: "auto" } : {}}
            exit={enableMotion ? { opacity: 0, height: 0 } : {}}
            className="space-y-2 overflow-hidden"
          >
            {auditEvents.map((event) => (
              <AuditRow key={event.id} event={event} />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function AuditRow({ event }: { event: AuditEvent }) {
  const tone = event.state === "done" ? "text-emerald-200" : event.state === "live" ? "text-blue-200" : "text-white/30"

  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
        {event.state === "done" ? <Check className="h-3.5 w-3.5 text-emerald-200" /> : <CircleDot className={`h-3.5 w-3.5 ${tone}`} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className={`text-xs uppercase tracking-[0.18em] ${tone}`}>{event.label}</p>
          <p className="text-xs text-white/30">{event.time}</p>
        </div>
        <p className="mt-1 text-xs leading-5 text-white/40">{event.detail}</p>
      </div>
    </div>
  )
}

function ProofRibbon() {
  return (
    <div className="mt-10 grid gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
      {PROOF_METRICS.map((metric) => (
        <div key={metric.label} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4">
          <p className="font-grotesk text-3xl font-light text-white">{metric.value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-blue-200/80">{metric.label}</p>
          <p className="mt-2 text-xs leading-5 text-white/40">{metric.caption}</p>
        </div>
      ))}
    </div>
  )
}

function ArchitecturePanel({ enableMotion }: { enableMotion: boolean }) {
  const nodes = [
    { icon: ScanFace, label: "User iOS", detail: "Secure Enclave", x: "16%", y: "70%" },
    { icon: Cpu, label: "Secure Brain", detail: "MCP + Moltguard", x: "50%", y: "28%" },
    { icon: Mail, label: "Mailboxes", detail: "Gmail + Outlook + Apple", x: "84%", y: "70%" },
  ]

  return (
    <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="relative z-10 max-w-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-white/40">Architecture</p>
        <h2 className="mt-3 font-grotesk text-4xl font-light tracking-[-0.04em] text-white">One agent across every inbox. With proof.</h2>
      </div>

      <div className="absolute inset-0">
        {enableMotion ? (
          <motion.div
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/15" />
        )}
        <svg className="absolute inset-0 h-full w-full" role="presentation" aria-hidden="true">
          <line x1="16%" y1="70%" x2="50%" y2="28%" stroke="rgba(96,165,250,0.35)" strokeDasharray="5 8" />
          <line x1="50%" y1="28%" x2="84%" y2="70%" stroke="rgba(45,212,191,0.35)" strokeDasharray="5 8" />
        </svg>
        {nodes.map((node) => {
          const Icon = node.icon
          return (
            <div
              key={node.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
              style={{ left: node.x, top: node.y }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/60 shadow-[0_0_60px_rgba(59,130,246,0.22)] backdrop-blur-xl">
                <Icon className="h-8 w-8 text-blue-100" />
              </div>
              <p className="mt-3 font-grotesk text-sm text-white">{node.label}</p>
              <p className="mt-1 text-xs text-white/40">{node.detail}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SecurityGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {SECURITY_LAYERS.map((layer) => {
        const Icon = layer.icon
        return (
          <article key={layer.title} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${layer.accent} opacity-0 transition duration-500 group-hover:opacity-100`} />
            <div className="relative z-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                <Icon className="h-5 w-5 text-blue-100" />
              </div>
              <h3 className="font-grotesk text-2xl font-light tracking-[-0.03em] text-white">{layer.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/50">{layer.body}</p>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function MarketProof() {
  return (
    <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/40">Product thesis</p>
          <h2 className="mt-4 max-w-3xl font-grotesk text-4xl font-light leading-tight tracking-[-0.05em] text-white sm:text-5xl">
            Email earns the right to become the agent marketplace.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            The mock keeps the pre-seed wedge tight: secure multi-inbox agentic email first, then trust-tiered MCP infrastructure after the approval surface is proven.
          </p>
        </div>

        <div className="grid gap-3">
          {MARKET_SIGNALS.map((signal, index) => (
            <div key={signal} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/25 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/20 bg-blue-400/10 font-grotesk text-xs text-blue-100">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-white/70">{signal}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-10 grid gap-3 md:grid-cols-3">
        {[
          { icon: Layers3, title: "Multi-account", body: "Gmail, Outlook, and Apple Mail under one agentic surface." },
          { icon: TerminalSquare, title: "MCP-native", body: "Each integration declares scope, tier, and trust level." },
          { icon: Sparkles, title: "Audit primitive", body: "The audit log is not reporting. It is the product surface." },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <Icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-5 font-grotesk text-xl font-light text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/40">{item.body}</p>
            </div>
          )
        })}
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-blue-300/20 bg-blue-400/10 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-blue-100/70">Operating layer</p>
          <p className="mt-2 text-sm text-white/60">Secure agentic email today. Agent marketplace tomorrow.</p>
        </div>
        <div className="flex items-center gap-2 font-grotesk text-sm uppercase tracking-[0.2em] text-blue-100">
          Launch mock <Zap className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
