"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import WorkflowShell from "./_components/WorkflowShell"
import ProgressBar from "./_components/ProgressBar"
import {
    StepAbout,
    StepAI,
    StepCompany,
    StepIntent,
    StepSecurity,
    StepWorkflow,
    SuccessScreen,
} from "./_components/Steps"
import { useWorkflowState } from "./_components/useWorkflowState"
import {
    STEPS,
    aboutSchema,
    aiSchema,
    companySchema,
    intentSchema,
    securitySchema,
    workflowSchema,
    type StepKey,
} from "./_components/schema"
import type { ZodSchema } from "zod"

type SubmitStatus = "idle" | "submitting" | "success" | "error"

const STEP_SCHEMAS: Record<StepKey, ZodSchema> = {
    about: aboutSchema,
    company: companySchema,
    ai: aiSchema,
    workflow: workflowSchema,
    security: securitySchema,
    intent: intentSchema,
}

export default function WorkflowPage() {
    const {
        state,
        stepIndex,
        setField,
        toggleCheckbox,
        next,
        back,
        reset,
    } = useWorkflowState()

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [status, setStatus] = useState<SubmitStatus>("idle")

    const totalSteps = STEPS.length
    const currentStep = STEPS[Math.min(stepIndex, totalSteps - 1)]
    const isLastStep = stepIndex === totalSteps - 1
    const isSuccess = status === "success"

    const currentStepData = useMemo(() => state[currentStep.key], [state, currentStep.key])

    const validateCurrent = () => {
        const schema = STEP_SCHEMAS[currentStep.key]
        const result = schema.safeParse(currentStepData)
        if (result.success) {
            setErrors({})
            return true
        }
        const next: Record<string, string> = {}
        for (const issue of result.error.issues) {
            const key = issue.path.join(".") || "_"
            if (!next[key]) next[key] = issue.message
        }
        setErrors(next)
        return false
    }

    const handleContinue = async () => {
        if (!validateCurrent()) return
        if (!isLastStep) {
            next()
            return
        }
        // Final submit
        setStatus("submitting")
        try {
            const response = await fetch("/api/lab-workflow", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            })
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`)
            }
            setStatus("success")
        } catch (err) {
            console.error("workflow submit error:", err)
            setStatus("error")
            toast.error(
                "Something went wrong sending that. Try again, or email ceo@trixode-studios.com directly."
            )
        }
    }

    const renderStep = () => {
        switch (currentStep.key) {
            case "about":
                return (
                    <StepAbout
                        state={state.about}
                        errors={errors}
                        setField={(field, value) => setField("about", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("about", field, value)}
                    />
                )
            case "company":
                return (
                    <StepCompany
                        state={state.company}
                        errors={errors}
                        setField={(field, value) => setField("company", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("company", field, value)}
                    />
                )
            case "ai":
                return (
                    <StepAI
                        state={state.ai}
                        errors={errors}
                        setField={(field, value) => setField("ai", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("ai", field, value)}
                    />
                )
            case "workflow":
                return (
                    <StepWorkflow
                        state={state.workflow}
                        errors={errors}
                        setField={(field, value) => setField("workflow", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("workflow", field, value)}
                    />
                )
            case "security":
                return (
                    <StepSecurity
                        state={state.security}
                        errors={errors}
                        setField={(field, value) => setField("security", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("security", field, value)}
                    />
                )
            case "intent":
                return (
                    <StepIntent
                        state={state.intent}
                        errors={errors}
                        setField={(field, value) => setField("intent", field, value)}
                        toggleCheckbox={(field, value) => toggleCheckbox("intent", field, value)}
                    />
                )
        }
    }

    return (
        <WorkflowShell>
            <div className="glass rounded-3xl border border-black/5 dark:border-white/5 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-full blur-3xl -z-10" />

                {isSuccess ? (
                    <SuccessScreen
                        onReset={() => {
                            setStatus("idle")
                            setErrors({})
                            reset()
                        }}
                        name={state.about.name}
                    />
                ) : (
                    <>
                        <ProgressBar current={stepIndex} total={totalSteps} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep.key}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="mb-10">
                                    <h1 className="font-grotesk text-3xl md:text-4xl font-light leading-tight tracking-tight text-black dark:text-white mb-3">
                                        {currentStep.title}
                                    </h1>
                                    <p className="text-base text-black/60 dark:text-white/60 font-light leading-relaxed">
                                        {currentStep.subtitle}
                                    </p>
                                </div>

                                {renderStep()}

                                <div className="mt-12 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setErrors({})
                                            back()
                                        }}
                                        disabled={stepIndex === 0 || status === "submitting"}
                                        className={cn(
                                            "magnetic inline-flex items-center gap-2 text-sm uppercase tracking-widest font-grotesk transition-colors",
                                            stepIndex === 0
                                                ? "text-black/20 dark:text-white/20 cursor-not-allowed"
                                                : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                                        )}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleContinue}
                                        disabled={status === "submitting"}
                                        className="magnetic inline-flex items-center justify-center gap-3 px-8 py-4 border border-black/10 dark:border-white/10 text-sm uppercase tracking-widest hover:border-brand-blue transition-colors relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10">
                                            {status === "submitting"
                                                ? "Sending…"
                                                : isLastStep
                                                    ? "Send it over"
                                                    : "Continue"}
                                        </span>
                                        {status === "submitting" ? (
                                            <Loader2 className="w-4 h-4 relative z-10 animate-spin" />
                                        ) : (
                                            <ArrowRight className="w-4 h-4 relative z-10" />
                                        )}
                                        <div className="absolute inset-0 bg-brand-blue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 opacity-20" />
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                )}
            </div>

            <p className="mt-6 text-center text-xs text-black/55 dark:text-white/55 font-light">
                Your progress is saved on this device until you submit. Nothing leaves your browser until you hit
                Send.
            </p>
        </WorkflowShell>
    )
}
