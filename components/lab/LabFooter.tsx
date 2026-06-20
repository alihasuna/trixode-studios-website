import Link from "next/link"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
]

const labLinks = [
    { name: "Lab", href: "/lab" },
    { name: "Workflow", href: "/lab/workflow" },
    { name: "Writing", href: "/writing" },
    { name: "Contact", href: "/lab/contact" },
]

export default function LabFooter() {
    return (
        <footer className="border-t border-black/10 dark:border-white/[0.08] bg-white dark:bg-[#030303] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] dark:via-white/[0.02] to-transparent pointer-events-none" />
            <div className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <HexagonLogo size={28} />
                            <span className="text-lg font-medium text-black dark:text-white font-grotesk">
                                Trixode<span className="ml-1 text-brand-blue/80">/lab</span>
                            </span>
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/50 dark:text-white/40">
                            Research lab · Victoria, BC
                        </p>
                        <a
                            href="mailto:ceo@trixode-studios.com"
                            className="mt-4 inline-block text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                        >
                            ceo@trixode-studios.com
                        </a>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-black/60 dark:text-white/60 mb-5 font-medium">
                            Lab
                        </p>
                        <ul className="space-y-3">
                            {labLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-black/60 dark:text-white/60 mb-5 font-medium">
                            Legal
                        </p>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-light"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-black/10 dark:border-white/[0.08] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/50 dark:text-white/40">
                        © {new Date().getFullYear()} Trixode-Studios Inc.
                    </p>
                    <p className="text-[11px] text-black/30 dark:text-white/30 font-light">
                        Mathematics of agentic systems
                    </p>
                </div>
            </div>
        </footer>
    )
}
