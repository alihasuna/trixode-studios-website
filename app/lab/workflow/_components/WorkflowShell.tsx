"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import LabFloatingNav from "@/components/lab/LabFloatingNav"
import LabFooter from "@/components/lab/LabFooter"
import { Toaster } from "@/components/ui/sonner"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function WorkflowShell({ children }: { children: React.ReactNode }) {
    useMagneticEffect()
    const isDesktop = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)")
    const prefersReducedMotion = useReducedMotion()
    const enableHeavyEffects = !prefersReducedMotion && isDesktop

    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden flex flex-col">
            {enableHeavyEffects && <CustomCursor />}
            <LabFloatingNav />

            {/* Aurora */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {enableHeavyEffects ? (
                    <>
                        <motion.div
                            className="absolute w-[600px] h-[600px] -top-20 -left-20 rounded-full blur-[100px] opacity-25"
                            style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)" }}
                            animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[500px] h-[500px] top-1/3 -right-10 rounded-full blur-[100px] opacity-25"
                            style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)" }}
                            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-[400px] h-[400px] bottom-0 left-1/3 rounded-full blur-[100px] opacity-25"
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

            {/* Grid */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "100px 100px",
                }}
            />

            <div className="flex-1 pt-32 pb-20 relative z-10">
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8"
                    >
                        <Link
                            href="/lab"
                            className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group text-sm"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to the lab
                        </Link>
                    </motion.div>

                    {children}
                </div>
            </div>

            <LabFooter />
            <Toaster richColors position="bottom-right" />
        </div>
    )
}
