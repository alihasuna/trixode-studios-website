"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { CheckboxGroup, RadioCardGroup, SelectField, TextField, TextareaField } from "./fields"
import {
    AUTONOMY_OPTIONS,
    DATA_CLASS_OPTIONS,
    INDUSTRY_OPTIONS,
    INFRA_OPTIONS,
    MATURITY_OPTIONS,
    SIZE_OPTIONS,
    TOOL_OPTIONS,
    type WorkflowState,
} from "./schema"

type StepErrors = Record<string, string>

type StepBaseProps<K extends keyof WorkflowState> = {
    state: WorkflowState[K]
    errors: StepErrors
    setField: (field: string, value: string) => void
    toggleCheckbox: (field: string, value: string) => void
}

export function StepAbout({ state, errors, setField }: StepBaseProps<"about">) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                    id="about-name"
                    label="Your name"
                    value={state.name}
                    onChange={(v) => setField("name", v)}
                    autoComplete="name"
                    placeholder="Jane Cole"
                    error={errors.name}
                />
                <TextField
                    id="about-email"
                    label="Work email"
                    type="email"
                    value={state.email}
                    onChange={(v) => setField("email", v)}
                    autoComplete="email"
                    placeholder="jane@example.com"
                    error={errors.email}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <TextField
                    id="about-company"
                    label="Company"
                    value={state.company}
                    onChange={(v) => setField("company", v)}
                    autoComplete="organization"
                    placeholder="Northshore Labs"
                    error={errors.company}
                />
                <TextField
                    id="about-role"
                    label="Your role"
                    value={state.role}
                    onChange={(v) => setField("role", v)}
                    autoComplete="organization-title"
                    placeholder="Head of AI / CTO / PM…"
                    error={errors.role}
                />
            </div>
        </div>
    )
}

export function StepCompany({ state, errors, setField }: StepBaseProps<"company">) {
    return (
        <div className="space-y-8">
            <SelectField
                id="company-industry"
                label="Industry"
                options={INDUSTRY_OPTIONS}
                value={state.industry}
                onChange={(v) => setField("industry", v)}
                error={errors.industry}
            />
            <RadioCardGroup
                name="company-size"
                label="Team size"
                options={SIZE_OPTIONS}
                value={state.size}
                onChange={(v) => setField("size", v)}
                error={errors.size}
                columns={2}
            />
        </div>
    )
}

export function StepAI({ state, errors, setField, toggleCheckbox }: StepBaseProps<"ai">) {
    return (
        <div className="space-y-10">
            <RadioCardGroup
                name="ai-maturity"
                label="Where are you with AI today?"
                options={MATURITY_OPTIONS}
                value={state.maturity}
                onChange={(v) => setField("maturity", v)}
                error={errors.maturity}
            />
            <CheckboxGroup
                label="Anything you're already using?"
                helperText="Pick all that apply. Skip if none."
                options={TOOL_OPTIONS}
                values={state.tools}
                onToggle={(v) => toggleCheckbox("tools", v)}
                columns={2}
            />
        </div>
    )
}

export function StepWorkflow({ state, errors, setField, toggleCheckbox }: StepBaseProps<"workflow">) {
    return (
        <div className="space-y-10">
            <RadioCardGroup
                name="workflow-autonomy"
                label="How autonomous does the agent need to be?"
                options={AUTONOMY_OPTIONS}
                value={state.autonomy}
                onChange={(v) => setField("autonomy", v)}
                error={errors.autonomy}
            />
            <CheckboxGroup
                label="What kinds of data does it touch?"
                helperText="Pick all that apply. It's okay if you're not sure yet."
                options={DATA_CLASS_OPTIONS}
                values={state.dataClasses}
                onToggle={(v) => toggleCheckbox("dataClasses", v)}
                columns={2}
            />
        </div>
    )
}

export function StepSecurity({ state, toggleCheckbox }: StepBaseProps<"security">) {
    return (
        <div className="space-y-6">
            <CheckboxGroup
                label="Infrastructure & security needs"
                helperText="Anything that's a hard constraint, not a nice-to-have."
                options={INFRA_OPTIONS}
                values={state.infra}
                onToggle={(v) => toggleCheckbox("infra", v)}
                columns={2}
            />
        </div>
    )
}

export function StepIntent({ state, errors, setField }: StepBaseProps<"intent">) {
    return (
        <div className="space-y-8">
            <TextareaField
                id="intent-goal"
                label="What are you trying to figure out?"
                value={state.goal}
                onChange={(v) => setField("goal", v)}
                placeholder="One or two sentences is plenty — what would 'this worked' look like for you?"
                rows={5}
            />
            <TextField
                id="intent-url"
                label="Anywhere we can read more? (optional)"
                type="url"
                value={state.url}
                onChange={(v) => setField("url", v)}
                placeholder="https://yourcompany.com or a doc link"
                error={errors.url}
            />
        </div>
    )
}

export function SuccessScreen({ onReset, name }: { onReset: () => void; name: string }) {
    return (
        <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-brand-blue" />
            </div>
            <h2 className="font-grotesk text-3xl md:text-5xl font-light leading-tight tracking-tight mb-6 text-black dark:text-white">
                Thanks{name ? `, ${name.split(" ")[0]}` : ""}.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg font-light leading-relaxed max-w-[520px] mx-auto mb-12">
                We've got everything we need to give you a useful first answer. Expect a note from us within a
                day — what we'd measure first, what we wouldn't touch yet, and whether a call makes sense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/lab"
                    className="magnetic inline-flex items-center gap-2 px-8 py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest hover:border-brand-blue transition-colors"
                >
                    Back to the lab
                    <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                    type="button"
                    onClick={onReset}
                    className="magnetic inline-flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                >
                    Start over
                </button>
            </div>
        </div>
    )
}
