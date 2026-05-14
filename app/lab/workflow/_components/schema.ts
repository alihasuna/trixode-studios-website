import { z } from "zod"

export const aboutSchema = z.object({
    name: z.string().min(2, "Your name helps us address you properly."),
    email: z.string().email("That doesn't look like a valid email."),
    company: z.string().min(1, "We'd like to know where you're calling from."),
    role: z.string().min(1, "What's your role on this?"),
})

export const companySchema = z.object({
    industry: z.string().min(1, "Pick the closest fit — you can refine later."),
    size: z.string().min(1, "Roughly how big is the team?"),
})

export const aiSchema = z.object({
    maturity: z.string().min(1, "Where are you on the curve?"),
    tools: z.array(z.string()).default([]),
})

export const workflowSchema = z.object({
    autonomy: z.string().min(1, "How much does the agent decide on its own?"),
    dataClasses: z.array(z.string()).default([]),
})

export const securitySchema = z.object({
    infra: z.array(z.string()).default([]),
})

export const intentSchema = z.object({
    goal: z.string().optional().default(""),
    url: z
        .string()
        .optional()
        .default("")
        .refine(
            (val) => !val || /^https?:\/\/.+/i.test(val),
            "Include the full URL (https://...) or leave it empty."
        ),
})

export const fullSchema = z.object({
    about: aboutSchema,
    company: companySchema,
    ai: aiSchema,
    workflow: workflowSchema,
    security: securitySchema,
    intent: intentSchema,
})

export type FullPayload = z.infer<typeof fullSchema>

export type WorkflowState = {
    about: { name: string; email: string; company: string; role: string }
    company: { industry: string; size: string }
    ai: { maturity: string; tools: string[] }
    workflow: { autonomy: string; dataClasses: string[] }
    security: { infra: string[] }
    intent: { goal: string; url: string }
}

export const initialState: WorkflowState = {
    about: { name: "", email: "", company: "", role: "" },
    company: { industry: "", size: "" },
    ai: { maturity: "", tools: [] },
    workflow: { autonomy: "", dataClasses: [] },
    security: { infra: [] },
    intent: { goal: "", url: "" },
}

export const STEPS = [
    {
        key: "about",
        title: "First, a quick hello",
        subtitle: "Just so we know who's on the other end of this.",
    },
    {
        key: "company",
        title: "What kind of work?",
        subtitle: "Industry and rough team size — we'll calibrate the rest from here.",
    },
    {
        key: "ai",
        title: "Where are you with AI today?",
        subtitle: "No wrong answer. Knowing the starting point shapes what's measurable.",
    },
    {
        key: "workflow",
        title: "How autonomous, and how sensitive?",
        subtitle: "These two together set the bar for what 'safe enough' has to mean for you.",
    },
    {
        key: "security",
        title: "Where does it have to live?",
        subtitle: "Infrastructure constraints and security requirements often decide what's even on the table.",
    },
    {
        key: "intent",
        title: "Anything else we should know?",
        subtitle: "Optional — but a sentence here often saves the first call.",
    },
] as const

export type StepKey = (typeof STEPS)[number]["key"]

export const INDUSTRY_OPTIONS = [
    { value: "finance", label: "Finance & banking" },
    { value: "healthcare", label: "Healthcare & life sciences" },
    { value: "manufacturing", label: "Manufacturing & supply chain" },
    { value: "energy", label: "Energy & utilities" },
    { value: "tech", label: "Software & technology" },
    { value: "retail", label: "Retail & e-commerce" },
    { value: "professional", label: "Professional services" },
    { value: "government", label: "Government & public sector" },
    { value: "other", label: "Something else" },
]

export const SIZE_OPTIONS = [
    { value: "solo", label: "Solo / founder" },
    { value: "2-10", label: "2–10 people" },
    { value: "11-50", label: "11–50 people" },
    { value: "51-200", label: "51–200 people" },
    { value: "200+", label: "200+ people" },
]

export const MATURITY_OPTIONS = [
    { value: "none", label: "None yet", description: "We're starting to think about it." },
    { value: "exploring", label: "Exploring", description: "Prototypes, internal experiments, the occasional chatbot." },
    { value: "production", label: "In production", description: "At least one AI system running in something people depend on." },
    { value: "mature", label: "Mature", description: "Multiple systems shipped, real metrics, real incidents." },
]

export const TOOL_OPTIONS = [
    { value: "openai", label: "OpenAI" },
    { value: "anthropic", label: "Anthropic" },
    { value: "bedrock", label: "AWS Bedrock" },
    { value: "azure-openai", label: "Azure OpenAI" },
    { value: "google", label: "Google / Gemini" },
    { value: "in-house", label: "In-house models" },
    { value: "open-source", label: "Open-source (Llama, Mistral, ...)" },
    { value: "other", label: "Other" },
]

export const AUTONOMY_OPTIONS = [
    { value: "assistant", label: "Assistant", description: "Suggests; humans decide and act." },
    { value: "copilot", label: "Co-pilot", description: "Drafts and acts under review." },
    { value: "multi-step", label: "Multi-step", description: "Plans and executes chains, humans approve key steps." },
    { value: "autonomous", label: "Autonomous", description: "Runs end-to-end without per-step human approval." },
]

export const DATA_CLASS_OPTIONS = [
    { value: "pii", label: "Personal data (PII)" },
    { value: "phi", label: "Health data (PHI)" },
    { value: "financial", label: "Financial / transactional" },
    { value: "ip", label: "Proprietary IP / trade secrets" },
    { value: "regulated", label: "Other regulated data" },
    { value: "none", label: "None of the above / unsure" },
]

export const INFRA_OPTIONS = [
    { value: "on-prem", label: "On-prem / private datacenter" },
    { value: "cloud", label: "Public cloud" },
    { value: "hybrid", label: "Hybrid / multi-cloud" },
    { value: "regulated", label: "Regulated industry constraints" },
    { value: "sso", label: "SSO / identity integration required" },
    { value: "audit", label: "Audit trails required" },
    { value: "air-gapped", label: "Air-gapped or restricted-network" },
]
