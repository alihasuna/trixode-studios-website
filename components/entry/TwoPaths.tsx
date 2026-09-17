"use client"

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { STIX_Two_Text } from "next/font/google"
import { useReducedMotion } from "framer-motion"
import { track } from "@vercel/analytics"
import { ArrowRight } from "lucide-react"
import { HexagonLogo } from "@/components/ui/HexagonLogo"

// The Creative site's serif — the two paths carry the typography of the two
// destinations: Space Grotesk for the Lab, STIX Two Text for Creative.
const serif = STIX_Two_Text({ subsets: ["latin"], weight: ["400"], display: "swap" })

export type PathId = "lab" | "creative"

export interface PathOption {
    id: PathId
    index: string
    name: string
    traits: string[]
    cta: string
    href: string
    /** absolute URL on another deployment */
    external?: boolean
    /** false = not reachable yet; the door renders as "Opening soon" */
    live?: boolean
}

interface TwoPathsProps {
    /** the two-paths scene (static import → sized + blur placeholder) */
    image: StaticImageData
    lab: PathOption
    creative: PathOption
}

const STORAGE_KEY = "trx-entry-path"
export const HANDOFF_KEY = "trx-entry-transition"
const EXIT_MS = 720

export function TwoPaths({ image, lab, creative }: TwoPathsProps) {
    const router = useRouter()
    const reduceMotion = useReducedMotion()
    const root = useRef<HTMLDivElement>(null)
    const frame = useRef(0)
    const pointer = useRef({ x: 0, y: 0 })
    const [focus, setFocus] = useState<PathId | null>(null)
    const [leaving, setLeaving] = useState<PathId | null>(null)
    const [remembered, setRemembered] = useState<PathOption | null>(null)

    useEffect(() => {
        router.prefetch(lab.href)
    }, [router, lab.href])

    useEffect(() => {
        try {
            const last = localStorage.getItem(STORAGE_KEY)
            if (last === lab.id) setRemembered(lab)
            if (last === creative.id) setRemembered(creative)
        } catch {
            /* storage unavailable — the page works without it */
        }
    }, [lab, creative])

    useEffect(() => () => cancelAnimationFrame(frame.current), [])

    // Cursor parallax on the scene (mouse only; skipped under reduced motion).
    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return
        const el = root.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        pointer.current = {
            x: (event.clientX - rect.left) / rect.width - 0.5,
            y: (event.clientY - rect.top) / rect.height - 0.5,
        }
        if (!frame.current) {
            frame.current = requestAnimationFrame(() => {
                frame.current = 0
                el.style.setProperty("--px", pointer.current.x.toFixed(3))
                el.style.setProperty("--py", pointer.current.y.toFixed(3))
            })
        }
    }

    const choose = (event: MouseEvent<HTMLAnchorElement>, option: PathOption) => {
        // Modifier clicks keep native behaviour (new tab, etc.).
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        if (leaving) return
        track("enter_path", { path: option.id })
        try {
            localStorage.setItem(STORAGE_KEY, option.id)
            // One-shot hand-off: the Lab shortens its welcome intro when it
            // knows the visitor just came through the entry transition.
            sessionStorage.setItem(HANDOFF_KEY, "1")
        } catch {
            /* ignore */
        }
        const go = () => (option.external ? window.location.assign(option.href) : router.push(option.href))
        if (reduceMotion) {
            go()
            return
        }
        setLeaving(option.id)
        window.setTimeout(go, EXIT_MS)
    }

    // Entrance: CSS-driven (tailwindcss-animate) so content is visible before
    // hydration; `motion-safe:` keeps it off under reduced motion.
    const enter = (delayMs: number) => ({
        className:
            "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-1000 motion-safe:ease-out motion-safe:fill-mode-both",
        style: { animationDelay: `${delayMs}ms` },
    })

    const nav = [
        { name: "Science", href: lab.href },
        ...(creative.live === false ? [] : [{ name: "Design", href: creative.href, external: true }]),
        { name: "People", href: "/people" },
    ]

    const renderPath = (option: PathOption, delay: number) => {
        const isCreative = option.id === "creative"
        const open = option.live !== false
        const className = `tp-path tp-path-${option.id} relative flex items-center border-t border-white/15 px-6 py-4 md:items-end md:border-0 md:px-0 md:py-0 md:pb-[max(13vh,7.5rem)] ${isCreative ? "md:justify-end md:pr-[5.6vw]" : "md:justify-start md:pl-[5.6vw]"}`
        const body = (
                <div style={enter(delay).style} className={`w-full md:w-auto ${enter(delay).className}`}>
                    <div className="tp-block flex items-center justify-between gap-6 md:block">
                        <div>
                            <p className="hidden items-center gap-3 font-grotesk text-[10px] tracking-[0.35em] text-white/80 md:flex">
                                {option.index}
                                <span aria-hidden className="h-px w-8 bg-white/60" />
                            </p>
                            <h2
                                className={
                                    isCreative
                                        ? `${serif.className} mt-0 text-[clamp(2.1rem,4.9vw,5rem)] uppercase leading-none tracking-[0.01em] md:mt-3`
                                        : "mt-0 font-grotesk text-[clamp(2.25rem,5.2vw,5.25rem)] font-medium uppercase leading-none tracking-[-0.01em] md:mt-3"
                                }
                            >
                                {option.name}
                            </h2>
                            <ul id={`tp-desc-${option.id}`} className="mt-2 flex flex-wrap gap-x-2 text-[12px] font-light text-white/85 md:mt-5 md:block md:text-[15px] md:leading-[1.75]">
                                {option.traits.map((trait, index) => (
                                    <li key={trait} className="inline md:block">
                                        {index > 0 && (
                                            <span aria-hidden className="mr-2 text-white/40 md:hidden">
                                                ·
                                            </span>
                                        )}
                                        {trait}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {open ? (
                            <span className="mt-0 inline-flex shrink-0 items-center gap-4 font-grotesk text-[10px] uppercase tracking-[0.32em] md:mt-8 md:text-[11px]">
                                {remembered?.id === option.id && (
                                    <span className="hidden text-white/55 md:inline">Last visit</span>
                                )}
                                <span className="tp-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/80 md:h-14 md:w-14">
                                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                                </span>
                                <span className="hidden md:inline">{option.cta}</span>
                                <span className="sr-only md:hidden">{option.cta}</span>
                                {option.external && <span className="sr-only">(opens the Creative site)</span>}
                            </span>
                        ) : (
                            <span className="mt-0 inline-flex shrink-0 items-center gap-3 font-grotesk text-[10px] uppercase tracking-[0.32em] text-white/70 md:mt-8 md:text-[11px]">
                                <span aria-hidden className="h-px w-8 bg-white/40" />
                                Opening soon
                            </span>
                        )}
                    </div>
                </div>
        )
        if (!open) {
            return (
                <div key={option.id} aria-describedby={`tp-desc-${option.id}`} className={`${className} tp-path-closed`}>
                    {body}
                </div>
            )
        }
        return (
            <a
                key={option.id}
                href={option.href}
                onClick={(event) => choose(event, option)}
                onPointerEnter={() => setFocus(option.id)}
                onPointerLeave={() => setFocus((current) => (current === option.id ? null : current))}
                onFocus={() => setFocus(option.id)}
                onBlur={() => setFocus((current) => (current === option.id ? null : current))}
                aria-describedby={`tp-desc-${option.id}`}
                className={className}
            >
                {body}
            </a>
        )
    }

    return (
        <div
            ref={root}
            data-focus={focus ?? undefined}
            data-leaving={leaving ?? undefined}
            onPointerMove={onPointerMove}
            onPointerLeave={() => setFocus(null)}
            className="tp-root relative isolate z-10 flex h-[100svh] min-h-[600px] w-full flex-col overflow-hidden bg-[#0b0d12] text-white selection:bg-white/20"
        >
            {/* Scene */}
            <div aria-hidden className="tp-scene absolute inset-0 -z-10">
                <Image src={image} alt="" fill priority placeholder="blur" sizes="100vw" className="object-cover object-center" />
            </div>

            {/* Legibility + focus veils */}
            <div aria-hidden className="tp-veil tp-veil-left -z-10" />
            <div aria-hidden className="tp-veil tp-veil-right -z-10" />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div aria-hidden className="tp-fade pointer-events-none absolute inset-0 z-30 bg-[#0b0d12]" />

            {/* Header */}
            <header className="tp-chrome pointer-events-none relative z-20 flex items-start justify-between px-6 pt-6 md:px-12 md:pt-8">
                <Link href="/" className="pointer-events-auto flex items-center gap-3" aria-label="Trixode Studios">
                    <HexagonLogo size={22} className="text-white" />
                    <span className="font-grotesk leading-none">
                        <span className="block text-[13px] font-medium tracking-[0.42em]">TRIXODE</span>
                        <span className="mt-1.5 flex items-center gap-2 text-[9px] tracking-[0.36em] text-white/70">
                            <span aria-hidden className="h-px w-6 bg-white/50" />
                            STUDIOS
                        </span>
                    </span>
                </Link>
                <nav aria-label="Studio" className="pointer-events-auto hidden items-center gap-10 font-grotesk text-[10px] uppercase tracking-[0.32em] text-[#0f172a]/75 md:flex">
                    {nav.map((item) =>
                        item.external ? (
                            <a key={item.name} href={item.href} className="transition-colors duration-300 hover:text-[#0f172a]">
                                {item.name}
                            </a>
                        ) : (
                            <Link key={item.name} href={item.href} className="transition-colors duration-300 hover:text-[#0f172a]">
                                {item.name}
                            </Link>
                        )
                    )}
                </nav>
            </header>

            {/* Headline */}
            <div style={enter(150).style} className={`tp-chrome pointer-events-none relative z-10 mt-[6vh] px-6 text-center md:mt-[5vh] ${enter(150).className}`}>
                <h1
                    className={`${serif.className} text-balance text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.06] tracking-[-0.01em] text-[#0f172a]`}
                >
                    Same curiosity.
                    <br />
                    Different directions.
                </h1>
                <p className="mt-4 font-grotesk text-[10px] uppercase tracking-[0.42em] text-[#0f172a]/80 md:text-[11px]">
                    Two paths. One vision.
                </p>
            </div>

            {/* Paths */}
            <div className="relative z-10 mt-auto flex flex-col md:absolute md:inset-0 md:mt-0 md:grid md:grid-cols-2">
                {renderPath(lab, 450)}
                {renderPath(creative, 600)}
            </div>

            {/* Footer */}
            <footer className="tp-chrome pointer-events-none relative z-20 flex items-end justify-between gap-4 px-6 pb-5 pt-3 font-grotesk text-[9px] uppercase tracking-[0.3em] text-white/70 md:mt-auto md:px-12 md:pb-7 md:text-[10px]">
                <p className="hidden sm:block">48.4284° N · 123.3656° W</p>
                <div className="flex w-full flex-col items-center gap-2 text-center sm:w-auto">
                    <span aria-hidden className="h-px w-8 bg-white/50" />
                    <span>Trixode Studios</span>
                    <span className="text-white/55">Science fuels imagination</span>
                </div>
                <p className="hidden md:block">Ideas · Systems · A brighter tomorrow</p>
            </footer>

            <style>{`
                .tp-scene {
                    transform: translate3d(calc(var(--px, 0) * -18px), calc(var(--py, 0) * -12px), 0) scale(1.05);
                    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .tp-veil {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 56%;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .tp-veil-left {
                    left: 0;
                    background: linear-gradient(90deg, rgba(5, 9, 18, 0.62) 0%, rgba(5, 9, 18, 0.42) 60%, rgba(5, 9, 18, 0) 100%);
                }
                .tp-veil-right {
                    right: 0;
                    background: linear-gradient(270deg, rgba(5, 9, 18, 0.62) 0%, rgba(5, 9, 18, 0.42) 60%, rgba(5, 9, 18, 0) 100%);
                }
                [data-focus="lab"] .tp-veil-right,
                [data-focus="creative"] .tp-veil-left,
                [data-leaving="lab"] .tp-veil-right,
                [data-leaving="creative"] .tp-veil-left {
                    opacity: 1;
                }
                .tp-path {
                    outline: none;
                    transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1);
                }
                [data-focus="lab"] .tp-path-creative,
                [data-focus="creative"] .tp-path-lab {
                    opacity: 0.65;
                }
                .tp-block {
                    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
                }
                [data-focus="lab"] .tp-path-lab .tp-block,
                [data-focus="creative"] .tp-path-creative .tp-block {
                    transform: translateY(-6px);
                }
                .tp-ring {
                    transition: background-color 0.35s ease, color 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .tp-path:hover .tp-ring,
                .tp-path:focus-visible .tp-ring {
                    background: #fff;
                    color: #0b0d12;
                    transform: translateX(6px);
                }
                .tp-path:active .tp-ring {
                    transform: translateX(6px) scale(0.96);
                }
                .tp-path:focus-visible .tp-block {
                    outline: 1px solid rgba(255, 255, 255, 0.7);
                    outline-offset: 16px;
                }
                .tp-chrome {
                    transition: opacity 0.45s ease;
                }
                .tp-fade {
                    opacity: 0;
                    transition: opacity 0.6s ease 0.2s;
                }
                [data-leaving] .tp-scene {
                    transform: scale(1.12);
                    transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
                }
                [data-leaving] .tp-chrome {
                    opacity: 0;
                }
                [data-leaving="lab"] .tp-path-creative,
                [data-leaving="creative"] .tp-path-lab {
                    opacity: 0;
                }
                [data-leaving] .tp-fade {
                    opacity: 1;
                }
                @media (prefers-reduced-motion: reduce) {
                    .tp-scene,
                    .tp-veil,
                    .tp-path,
                    .tp-block,
                    .tp-ring,
                    .tp-chrome,
                    .tp-fade {
                        transition: none !important;
                    }
                    .tp-scene {
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    )
}
