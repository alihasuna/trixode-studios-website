"use client"

import { cn } from "@/lib/utils"

export default function ProgressBar({ current, total }: { current: number; total: number }) {
    const safeTotal = Math.max(total, 1)
    const safeCurrent = Math.min(Math.max(current + 1, 1), safeTotal)
    const percent = (safeCurrent / safeTotal) * 100

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/50 dark:text-white/50">
                <span>
                    Step {safeCurrent} of {safeTotal}
                </span>
                <span className="text-black/30 dark:text-white/30">{Math.round(percent)}%</span>
            </div>
            <div className="h-[2px] bg-black/[0.08] dark:bg-white/[0.08] rounded-full overflow-hidden">
                <div
                    className={cn(
                        "h-full bg-brand-blue rounded-full transition-all duration-500 ease-out"
                    )}
                    style={{ width: `${percent}%`, boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)" }}
                />
            </div>
        </div>
    )
}
