"use client"

import { useEffect, useRef, useCallback } from "react"
import { animate, createTimeline, remove, stagger } from "animejs"
import Link from "next/link"
import {
    ArrowLeft,
    ArrowRight,
    Bot,
    Globe,
    Rocket,
    CheckCircle2,
    Zap,
    Shield,
    BarChart3,
    Layers,
} from "lucide-react"
import CustomCursor from "@/components/ui/CustomCursor"
import FloatingNav from "@/components/layout/FloatingNav"
import Footer from "@/components/footer"
import { useMagneticEffect } from "@/hooks/useMagneticEffect"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services = [
    {
        id: "seo",
        icon: Rocket,
        title: "AI SEO",
        subtitle: "Data-Driven Search Dominance",
        description:
            "Our AI-driven SEO approach goes beyond traditional keyword stuffing. We use advanced machine learning models to analyze search intent, predict trends, and optimize your content ecosystem for maximum visibility.",
        features: [
            "Predictive Keyword Analysis",
            "Automated Content Optimization",
            "Competitor Strategy Decoding",
            "Technical SEO Automation",
            "Voice Search Optimization",
        ],
        price: "$999",
        priceNum: 999,
        gradient: "from-brand-blue to-[#60a5fa]",
        accentColor: "rgba(59, 130, 246, 0.15)",
    },
    {
        id: "webdev",
        icon: Globe,
        title: "Full Website Dev",
        subtitle: "Performance-First Digital Experiences",
        description:
            "We build websites that are not just digital business cards but powerful growth engines. Using the latest frameworks like Next.js and React, we ensure lightning-fast performance, elite accessibility, and stunning visual aesthetics.",
        features: [
            "Headless CMS Architecture",
            "React & Next.js Frameworks",
            "3D WebGL Interactions",
            "Global CDN Deployment",
            "Mobile-First Responsive Design",
        ],
        price: "$1,499",
        priceNum: 1499,
        gradient: "from-brand-purple to-[#a78bfa]",
        accentColor: "rgba(139, 92, 246, 0.15)",
    },
    {
        id: "agentic",
        icon: Bot,
        title: "Agentic AI Bespoke Systems",
        subtitle: "Autonomous Workflows for Enterprise",
        description:
            "Step into the future with custom agentic AI systems designed for your specific business needs. We build autonomous agents that can plan, execute, and verify complex workflows, reducing operational friction and unlocking new capabilities.",
        features: [
            "Custom LLM Fine-Tuning",
            "Multi-Agent Orchestration",
            "Secure Enterprise Integration",
            "Automated Decision Pipelines",
            "Real-time Data Processing",
        ],
        price: "$19,999",
        priceNum: 19999,
        gradient: "from-[#10b981] to-[#34d399]",
        accentColor: "rgba(16, 185, 129, 0.15)",
    },
]

const stats = [
    { label: "Projects Delivered", value: 120, suffix: "+" },
    { label: "Client Retention", value: 98, suffix: "%" },
    { label: "Avg. ROI Increase", value: 340, suffix: "%" },
    { label: "Uptime Guaranteed", value: 99.9, suffix: "%", decimals: 1 },
]

const process = [
    {
        step: "01",
        title: "Discovery",
        desc: "Deep-dive into your business goals, technical landscape, and competitive positioning.",
        icon: BarChart3,
    },
    {
        step: "02",
        title: "Strategy",
        desc: "Architect the solution, define milestones, and align on measurable KPIs.",
        icon: Layers,
    },
    {
        step: "03",
        title: "Build",
        desc: "Iterative development with weekly demos, continuous testing, and agile sprints.",
        icon: Zap,
    },
    {
        step: "04",
        title: "Scale",
        desc: "Launch, monitor, optimise. Ongoing support and performance tuning.",
        icon: Shield,
    },
]

function formatPrice(value: number): string {
    return "$" + value.toLocaleString("en-US")
}

function formatStat(value: number, decimals?: number): string {
    if (decimals) return value.toFixed(decimals)
    return Math.round(value).toLocaleString("en-US")
}

function pseudoRandom(seed: number): number {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

function generateParticles(count: number) {
    return Array.from({ length: count }).map((_, i) => {
        const left = pseudoRandom(i + 11) * 100
        const top = pseudoRandom(i + 37) * 100
        return {
            id: i,
            left: Number(left.toFixed(3)),
            top: Number(top.toFixed(3)),
        }
    })
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ServicesPage() {
    const rootRef = useRef<HTMLDivElement | null>(null)
    const progressRef = useRef<HTMLDivElement | null>(null)
    const rafScroll = useRef<number>(0)
    const particles = generateParticles(20)
    useMagneticEffect()

    /* ---------- Scroll-linked progress bar ---------- */
    const handleScroll = useCallback(() => {
        if (rafScroll.current) cancelAnimationFrame(rafScroll.current)
        rafScroll.current = requestAnimationFrame(() => {
            if (!progressRef.current) return
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
            progressRef.current.style.width = `${pct}%`
        })
    }, [])

    /* ---------- 3D tilt on glass cards ---------- */
    const setupTilt = useCallback((root: HTMLElement) => {
        const cards = root.querySelectorAll<HTMLElement>("[data-tilt]")
        const isTouchDevice =
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        if (isTouchDevice) return () => { }

        const handlers = new Map<
            HTMLElement,
            { move: (e: MouseEvent) => void; leave: () => void }
        >()

        cards.forEach((card) => {
            const move = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const cx = rect.width / 2
                const cy = rect.height / 2
                const rotateX = ((y - cy) / cy) * -8
                const rotateY = ((x - cx) / cx) * 8
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
            }
            const leave = () => {
                animate(card, {
                    rotateX: 0,
                    rotateY: 0,
                    translateZ: 0,
                    duration: 600,
                    ease: "outExpo",
                })
            }
            handlers.set(card, { move, leave })
            card.addEventListener("mousemove", move)
            card.addEventListener("mouseleave", leave)
        })

        return () => {
            handlers.forEach(({ move, leave }, card) => {
                card.removeEventListener("mousemove", move)
                card.removeEventListener("mouseleave", leave)
            })
        }
    }, [])

    /* ---------- Dynamic light effect on glass ---------- */
    const setupGlassLight = useCallback((root: HTMLElement) => {
        const cards = root.querySelectorAll<HTMLElement>("[data-glass-light]")
        const isTouchDevice =
            !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        if (isTouchDevice) return () => { }

        const handlers = new Map<
            HTMLElement,
            { move: (e: MouseEvent) => void; leave: () => void }
        >()

        cards.forEach((card) => {
            const move = (e: MouseEvent) => {
                const rect = card.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.01) 100%)`
            }
            const leave = () => {
                card.style.background = ""
            }
            handlers.set(card, { move, leave })
            card.addEventListener("mousemove", move)
            card.addEventListener("mouseleave", leave)
        })

        return () => {
            handlers.forEach(({ move, leave }, card) => {
                card.removeEventListener("mousemove", move)
                card.removeEventListener("mouseleave", leave)
            })
        }
    }, [])

    /* ---------- Parallax on scroll ---------- */
    const setupParallax = useCallback((root: HTMLElement) => {
        const els = root.querySelectorAll<HTMLElement>("[data-speed]")
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reducedMotion || els.length === 0) return () => { }

        let raf = 0
        const onScroll = () => {
            if (raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const scrolled = window.scrollY
                els.forEach((el) => {
                    const speed = parseFloat(el.getAttribute("data-speed") ?? "0")
                    const rect = el.getBoundingClientRect()
                    const inView =
                        rect.top < window.innerHeight + 200 && rect.bottom > -200
                    if (inView) {
                        el.style.transform = `translateY(${-(scrolled * speed)}px)`
                    }
                })
            })
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    /* ---------- Scroll-scrubbed dynamics ---------- */
    const setupScrollDynamics = useCallback((root: HTMLElement) => {
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (reducedMotion) return () => { }

        const reactiveEls = root.querySelectorAll<HTMLElement>(
            "[data-scroll-reactive]"
        )
        const glowEls = root.querySelectorAll<HTMLElement>("[data-scroll-glow]")
        const trackEl = root.querySelector<HTMLElement>("[data-scroll-track]")
        const lineEl = root.querySelector<HTMLElement>("[data-scroll-line]")
        const indicatorEl = root.querySelector<HTMLElement>(
            "[data-scroll-indicator]"
        )

        let lastScroll = window.scrollY
        let raf = 0

        const update = () => {
            const scrollTop = window.scrollY
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight
            const progress = docHeight > 0 ? scrollTop / docHeight : 0

            root.style.setProperty("--scroll-progress", progress.toFixed(4))

            const velocity = Math.min(Math.abs(scrollTop - lastScroll) / 40, 1)
            root.style.setProperty("--scroll-velocity", velocity.toFixed(3))
            lastScroll = scrollTop

            reactiveEls.forEach((el) => {
                const speed = parseFloat(el.getAttribute("data-scroll-speed") ?? "0.04")
                const axis = el.getAttribute("data-scroll-axis") ?? "y"
                const drift = scrollTop * speed
                const rotate = scrollTop * speed * 0.6

                if (axis === "x") {
                    el.style.transform = `translateX(${drift}px) rotate(${rotate}deg)`
                    return
                }

                if (axis === "both") {
                    el.style.transform = `translate3d(${drift * 0.4}px, ${-drift}px, 0) rotate(${rotate}deg)`
                    return
                }

                el.style.transform = `translateY(${-drift}px) rotate(${rotate}deg)`
            })

            glowEls.forEach((el) => {
                const rect = el.getBoundingClientRect()
                const start = window.innerHeight * 0.9
                const end = window.innerHeight * 0.2
                const raw = (start - rect.top) / (start - end)
                const clamped = Math.min(1, Math.max(0, raw))
                el.style.setProperty("--glow-progress", clamped.toFixed(3))
            })

            if (trackEl && lineEl && indicatorEl) {
                const rect = trackEl.getBoundingClientRect()
                const total = rect.height + window.innerHeight * 0.4
                const raw = (window.innerHeight - rect.top) / total
                const clamped = Math.min(1, Math.max(0, raw))
                const lineRect = lineEl.getBoundingClientRect()
                const distance = Math.max(0, lineRect.width - 12)
                indicatorEl.style.transform = `translateX(${clamped * distance}px)`
                indicatorEl.style.opacity = clamped > 0 && clamped < 1 ? "1" : "0"
            }
        }

        const onScroll = () => {
            if (raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)

        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    /* ---------- Hero figure interaction ---------- */
    const setupHeroOrbitMotion = useCallback((root: HTMLElement) => {
        const figure = root.querySelector<HTMLElement>("[data-hero-figure]")
        const orbit = root.querySelector<HTMLElement>("[data-hero-orbit]")
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
        if (!figure || !orbit || reducedMotion) return () => { }

        let raf = 0
        const onMove = (e: MouseEvent) => {
            const rect = figure.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5

            if (raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const translateX = x * 22
                const translateY = y * 18
                const rotate = x * 6
                orbit.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg)`
            })
        }

        const onLeave = () => {
            animate(orbit, {
                translateX: 0,
                translateY: 0,
                rotate: 0,
                duration: 900,
                easing: "outExpo",
            })
        }

        figure.addEventListener("mousemove", onMove)
        figure.addEventListener("mouseleave", onLeave)

        return () => {
            figure.removeEventListener("mousemove", onMove)
            figure.removeEventListener("mouseleave", onLeave)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [])

    /* ================================================================ */
    /*  MAIN EFFECT -- anime.js orchestration                           */
    /* ================================================================ */
    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        /* Collect all animated targets */
        const heroEls = root.querySelectorAll("[data-animate='hero']")
        const sectionEls = root.querySelectorAll("[data-animate='section']")
        const featureEls = root.querySelectorAll("[data-animate='feature']")
        const ctaEls = root.querySelectorAll("[data-animate='cta']")
        const iconEls = root.querySelectorAll("[data-animate='icon']")
        const lineEls = root.querySelectorAll("[data-animate='line']")
        const priceEls = root.querySelectorAll("[data-animate='price']")
        const auroraEls = root.querySelectorAll("[data-animate='aurora']")
        const statEls = root.querySelectorAll("[data-animate='stat']")
        const processEls = root.querySelectorAll("[data-animate='process']")
        const particleEls = root.querySelectorAll("[data-animate='particle']")
        const orbitEls = root.querySelectorAll("[data-animate='orbit']")
        const signalEls = root.querySelectorAll("[data-animate='signal']")
        const timelineLineEl = root.querySelector("[data-animate='timeline-line']")
        const reactiveEls = root.querySelectorAll("[data-scroll-reactive]")
        const glowEls = root.querySelectorAll("[data-scroll-glow]")
        const indicatorEl = root.querySelector("[data-scroll-indicator]")

        /* ---- Reduced-motion bail-out ---- */
        if (reducedMotion) {
            const all = [
                ...heroEls,
                ...sectionEls,
                ...featureEls,
                ...ctaEls,
                ...iconEls,
                ...priceEls,
                ...statEls,
                ...processEls,
                ...orbitEls,
                ...signalEls,
            ]
            all.forEach((el) => {
                const h = el as HTMLElement
                h.style.opacity = "1"
                h.style.transform = "none"
            })
            lineEls.forEach((el) => {
                ; (el as HTMLElement).style.transform = "scaleY(1)"
            })
            if (timelineLineEl) {
                ; (timelineLineEl as HTMLElement).style.transform = "scaleX(1)"
            }
            reactiveEls.forEach((el) => {
                const h = el as HTMLElement
                h.style.transform = "none"
            })
            orbitEls.forEach((el) => {
                ; (el as HTMLElement).style.transform = "none"
            })
            glowEls.forEach((el) => {
                ; (el as HTMLElement).style.setProperty("--glow-progress", "0")
            })
            if (indicatorEl) {
                ; (indicatorEl as HTMLElement).style.transform = "translateX(0)"
                    ; (indicatorEl as HTMLElement).style.opacity = "1"
            }
            priceEls.forEach((el, i) => {
                ; (el as HTMLElement).textContent = services[i]?.price ?? ""
            })
            statEls.forEach((el) => {
                const h = el as HTMLElement
                const v = parseFloat(h.getAttribute("data-stat-target") ?? "0")
                const d = parseInt(h.getAttribute("data-stat-decimals") ?? "0", 10)
                const s = h.getAttribute("data-stat-suffix") ?? ""
                h.textContent = formatStat(v, d || undefined) + s
            })
            return
        }

        /* ---- 1. Hero entrance timeline ---- */
        createTimeline()
            .add(heroEls, {
                opacity: [0, 1],
                translateY: [24, 0],
                delay: stagger(70),
                duration: 600,
                ease: "outExpo",
            })

        /* ---- 2. Continuous loops (desktop only — too heavy for mobile GPUs) ---- */
        const isDesktopDevice = window.matchMedia(
            "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
        ).matches

        if (isDesktopDevice) {
            /* Aurora morph */
            animate(auroraEls, {
                translateY: [0, -40],
                translateX: [0, 30],
                scale: [1, 1.08],
                direction: "alternate",
                ease: "inOutSine",
                duration: 10000,
                delay: stagger(2500),
                loop: true,
            })

            /* Floating particles */
            if (particleEls.length > 0) {
                animate(particleEls, {
                    translateY: [0, -14],
                    translateX: [0, 6],
                    opacity: [0.2, 0.5],
                    direction: "alternate",
                    ease: "inOutSine",
                    duration: () => 3000 + Math.random() * 3000,
                    delay: stagger(250),
                    loop: true,
                })
            }

            /* Orbital figure motion */
            if (orbitEls.length > 0) {
                orbitEls.forEach((el) => {
                    const speed = parseFloat(el.getAttribute("data-orbit-speed") ?? "1")
                    animate(el, {
                        rotate: [0, 360],
                        duration: 24000 / speed,
                        easing: "linear",
                        loop: true,
                    })
                })
            }

            if (signalEls.length > 0) {
                animate(signalEls, {
                    scale: [0.9, 1.15],
                    opacity: [0.4, 0.85],
                    direction: "alternate",
                    easing: "inOutSine",
                    duration: 2000,
                    delay: stagger(320),
                    loop: true,
                })
            }
        }


        /* ---- 4. Scroll progress bar ---- */
        window.addEventListener("scroll", handleScroll, { passive: true })

        /* ---- 5. IntersectionObserver for all scroll-triggered animations ---- */
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    const el = entry.target as HTMLElement
                    const type = el.getAttribute("data-animate")

                    /* --- Service section cards --- */
                    if (type === "section") {
                        animate(el, {
                            opacity: [0, 1],
                            translateY: [40, 0],
                            duration: 550,
                            ease: "outExpo",
                        })

                        const parent = el.closest("section")
                        if (parent) {
                            /* Stagger features */
                            const features = parent.querySelectorAll(
                                "[data-animate='feature']"
                            )
                            if (features.length > 0) {
                                animate(features, {
                                    opacity: [0, 1],
                                    translateX: [-16, 0],
                                    delay: stagger(50, { start: 200 }),
                                    duration: 400,
                                    ease: "outExpo",
                                })
                                features.forEach((f) => observer.unobserve(f))
                            }

                            /* Price counter */
                            const priceEl = parent.querySelector(
                                "[data-animate='price']"
                            ) as HTMLElement | null
                            if (priceEl) {
                                const target = parseInt(
                                    priceEl.getAttribute("data-price-target") ?? "0",
                                    10
                                )
                                animate(priceEl, {
                                    opacity: [0, 1],
                                    translateY: [12, 0],
                                    duration: 400,
                                    ease: "outExpo",
                                })
                                const counter = { val: 0 }
                                animate(counter, {
                                    val: [0, target],
                                    duration: 900,
                                    ease: "outExpo",
                                    onUpdate: () => {
                                        priceEl.textContent = formatPrice(
                                            Math.round(counter.val)
                                        )
                                    },
                                })
                                observer.unobserve(priceEl)
                            }

                            /* Icon entrance + float */
                            const icon = parent.querySelector(
                                "[data-animate='icon']"
                            ) as HTMLElement | null
                            if (icon) {
                                animate(icon, {
                                    opacity: [0, 1],
                                    scale: [0.7, 1],
                                    rotate: ["-12deg", "0deg"],
                                    duration: 500,
                                    ease: "outExpo",
                                })
                                animate(icon, {
                                    translateY: [0, -10],
                                    direction: "alternate",
                                    ease: "inOutSine",
                                    duration: 2400,
                                    loop: true,
                                    delay: 500,
                                })
                                observer.unobserve(icon)
                            }

                            /* Decorative line draw */
                            const line = parent.querySelector(
                                "[data-animate='line']"
                            ) as HTMLElement | null
                            if (line) {
                                animate(line, {
                                    scaleY: [0, 1],
                                    duration: 700,
                                    ease: "outExpo",
                                })
                                observer.unobserve(line)
                            }
                        }
                    }

                    /* --- Stat counters --- */
                    if (type === "stat") {
                        const target = parseFloat(
                            el.getAttribute("data-stat-target") ?? "0"
                        )
                        const decimals = parseInt(
                            el.getAttribute("data-stat-decimals") ?? "0",
                            10
                        )
                        const suffix = el.getAttribute("data-stat-suffix") ?? ""

                        animate(el, {
                            opacity: [0, 1],
                            translateY: [16, 0],
                            duration: 450,
                            ease: "outExpo",
                        })

                        const counter = { val: 0 }
                        animate(counter, {
                            val: [0, target],
                            duration: 1000,
                            ease: "outExpo",
                            onUpdate: () => {
                                el.textContent =
                                    formatStat(counter.val, decimals || undefined) +
                                    suffix
                            },
                        })
                    }

                    /* --- Process steps --- */
                    if (type === "process") {
                        animate(el, {
                            opacity: [0, 1],
                            translateY: [24, 0],
                            scale: [0.95, 1],
                            duration: 500,
                            ease: "outExpo",
                        })
                    }

                    /* --- Timeline line --- */
                    if (type === "timeline-line") {
                        animate(el, {
                            scaleX: [0, 1],
                            duration: 800,
                            ease: "outExpo",
                        })
                    }

                    /* --- CTA --- */
                    if (type === "cta") {
                        animate(el, {
                            opacity: [0, 1],
                            translateY: [40, 0],
                            scale: [0.95, 1],
                            duration: 600,
                            ease: "outExpo",
                        })
                        const children = el.querySelectorAll(
                            "[data-animate='cta-child']"
                        )
                        if (children.length > 0) {
                            animate(children, {
                                opacity: [0, 1],
                                translateY: [20, 0],
                                delay: stagger(80, { start: 250 }),
                                duration: 500,
                                ease: "outExpo",
                            })
                        }
                    }

                    observer.unobserve(el)
                })
            },
            { threshold: 0.12, rootMargin: "-40px 0px" }
        )

        /* Observe everything */
        const allObservable = [
            ...sectionEls,
            ...ctaEls,
            ...featureEls,
            ...iconEls,
            ...lineEls,
            ...priceEls,
            ...statEls,
            ...processEls,
        ]
        allObservable.forEach((el) => observer.observe(el))
        if (timelineLineEl) observer.observe(timelineLineEl)

        /* ---- Setup interactive effects ---- */
        const cleanupTilt = setupTilt(root)
        const cleanupGlass = setupGlassLight(root)
        const cleanupParallax = setupParallax(root)
        const cleanupDynamics = setupScrollDynamics(root)
        const cleanupHeroOrbit = setupHeroOrbitMotion(root)

        /* ---- Cleanup ---- */
        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", handleScroll)
            if (rafScroll.current) cancelAnimationFrame(rafScroll.current)
            cleanupTilt()
            cleanupGlass()
            cleanupParallax()
            cleanupDynamics()
            cleanupHeroOrbit()
            remove(heroEls)
            remove(sectionEls)
            remove(featureEls)
            remove(ctaEls)
            remove(iconEls)
            remove(lineEls)
            remove(priceEls)
            remove(auroraEls)
            remove(statEls)
            remove(processEls)
            remove(particleEls)
            remove(orbitEls)
            remove(signalEls)
        }
    }, [handleScroll, setupTilt, setupGlassLight, setupParallax, setupScrollDynamics, setupHeroOrbitMotion])

    /* ================================================================ */
    /*  RENDER                                                          */
    /* ================================================================ */
    return (
        <div ref={rootRef} className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white overflow-hidden">
            <CustomCursor />
            <FloatingNav />

            {/* ---- Scroll Progress Bar ---- */}
            <div className="fixed top-0 left-0 w-full h-[2px] z-[100]">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan"
                    style={{ width: "0%", transition: "width 0.05s linear" }}
                />
            </div>

            {/* ---- Background Aurora ---- */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div
                    data-animate="aurora"
                    className="absolute w-[500px] h-[500px] lg:w-[900px] lg:h-[900px] -top-60 -right-60 rounded-full blur-[60px] lg:blur-[140px] opacity-10 lg:opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
                    }}
                />
                <div
                    data-animate="aurora"
                    className="absolute w-[400px] h-[400px] lg:w-[700px] lg:h-[700px] top-[40%] -left-40 rounded-full blur-[60px] lg:blur-[120px] opacity-10 lg:opacity-15"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
                    }}
                />
                <div
                    data-animate="aurora"
                    className="absolute w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bottom-[10%] right-[20%] rounded-full blur-[60px] lg:blur-[100px] opacity-8 lg:opacity-10"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
                    }}
                />
            </div>

            {/* ---- Grid Overlay ---- */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />

            {/* ---- Floating Particles ---- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        data-animate="particle"
                        className="absolute w-[2px] h-[2px] rounded-full bg-white/30"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                            opacity: 0.2,
                        }}
                    />
                ))}
            </div>

            <div className="pt-32 pb-20 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* ============================================= */}
                    {/*  HERO                                          */}
                    {/* ============================================= */}
                    <div data-animate="hero" className="opacity-0 mb-12">
                        <Link
                            href="/"
                            className="magnetic inline-flex items-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors duration-300 font-medium group"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center mb-32">
                        <div>
                            <div data-animate="hero" className="opacity-0">
                                <span className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">
                                    <span className="w-10 h-[1px] bg-gradient-to-r from-brand-blue to-brand-purple" />
                                    What We Build
                                </span>
                            </div>
                            <div data-animate="hero" className="opacity-0">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 font-grotesk leading-[0.95]">
                                    Our{" "}
                                    <span className="bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan bg-clip-text text-transparent">
                                        Services
                                    </span>
                                </h1>
                            </div>
                            <div data-animate="hero" className="opacity-0">
                                <p className="text-xl text-black/50 dark:text-white/50 max-w-xl leading-relaxed font-light mb-10">
                                    We combine cutting-edge technology with strategic
                                    expertise to deliver solutions that drive measurable
                                    business impact.
                                </p>
                            </div>
                            <div data-animate="hero" className="opacity-0 flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="magnetic inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-all duration-300 group"
                                >
                                    Start a Project
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a
                                    href="#process"
                                    className="magnetic inline-flex items-center gap-3 px-8 py-4 border border-black/10 dark:border-white/10 rounded-full text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all duration-300 font-medium uppercase tracking-wider text-sm"
                                >
                                    Our Process
                                </a>
                            </div>
                        </div>

                        {/* Hero visual -- stat cards with parallax */}
                        <div
                            className="relative hidden lg:block h-[450px]"
                            data-animate="hero"
                            data-hero-figure
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <div
                                    data-scroll-reactive
                                    data-scroll-speed="0.05"
                                    data-scroll-axis="both"
                                    className="absolute -top-10 -right-10 w-[360px] h-[360px] rounded-full border border-black/10 dark:border-white/10"
                                    style={{ boxShadow: "0 0 60px rgba(59,130,246,0.12)" }}
                                    data-hero-orbit
                                >
                                    <div
                                        data-animate="orbit"
                                        data-orbit-speed="0.8"
                                        className="absolute inset-6 rounded-full border border-black/10 dark:border-white/10"
                                    >
                                        <div
                                            data-animate="signal"
                                            className="absolute -top-1 left-1/2 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-brand-blue/80 ring-8 ring-brand-blue/10"
                                        />
                                    </div>
                                    <div
                                        data-animate="orbit"
                                        data-orbit-speed="1.15"
                                        className="absolute inset-16 rounded-full border border-dashed border-black/10 dark:border-white/10"
                                    >
                                        <div
                                            data-animate="signal"
                                            className="absolute left-1/2 -bottom-1 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-brand-purple/80 ring-8 ring-brand-purple/10"
                                        />
                                    </div>
                                    <div
                                        data-animate="orbit"
                                        data-orbit-speed="1.4"
                                        className="absolute inset-28 rounded-full border border-black/10 dark:border-white/10"
                                    >
                                        <div
                                            data-animate="signal"
                                            className="absolute -left-1 top-1/2 w-2.5 h-2.5 -translate-y-1/2 rounded-full bg-brand-cyan/80 ring-8 ring-brand-cyan/10"
                                        />
                                    </div>
                                </div>
                                <div
                                    data-scroll-reactive
                                    data-scroll-speed="0.08"
                                    data-scroll-axis="y"
                                    className="absolute top-20 left-6 w-[280px] h-[280px] rounded-full border border-black/5 dark:border-white/5"
                                    style={{ boxShadow: "0 0 80px rgba(139,92,246,0.18)" }}
                                />
                                <div
                                    data-scroll-reactive
                                    data-scroll-speed="0.06"
                                    data-scroll-axis="x"
                                    className="absolute bottom-4 right-16 w-[220px] h-[220px] rounded-full border border-black/10 dark:border-white/10"
                                    style={{ boxShadow: "0 0 60px rgba(6,182,212,0.16)" }}
                                />
                            </div>
                            {/* Card 1 - Projects Delivered */}
                            <div
                                data-speed="0.03"
                                data-tilt
                                data-glass-light
                                className="absolute -top-2 right-0 glass p-8 rounded-3xl w-[280px] z-30 border border-brand-blue/20 dark:border-brand-blue/30 hover:border-brand-blue/40 dark:hover:border-brand-blue/50 transition-all duration-500 will-change-transform group/card"
                                style={{
                                    transformStyle: "preserve-3d",
                                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-purple/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                {/* Animated glow ring */}
                                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-brand-blue/40 via-brand-purple/40 to-brand-blue/40 opacity-0 group-hover/card:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

                                <div className="relative z-10">
                                    <div className="text-5xl xl:text-6xl font-light font-grotesk bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-[length:200%_100%] bg-clip-text text-transparent mb-3 group-hover/card:animate-gradient-x">
                                        120+
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/50 mb-2 font-medium">
                                        Projects Delivered
                                    </div>
                                    <div className="text-lg font-medium text-black/80 dark:text-white/80 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                                        Enterprise Scale
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 - Client Retention */}
                            <div
                                data-speed="0.06"
                                data-tilt
                                data-glass-light
                                className="absolute bottom-0 left-[5%] glass p-8 rounded-3xl w-[260px] z-20 border border-brand-purple/20 dark:border-brand-purple/30 hover:border-brand-purple/40 dark:hover:border-brand-purple/50 transition-all duration-500 will-change-transform group/card"
                                style={{
                                    transformStyle: "preserve-3d",
                                    boxShadow: "0 8px 32px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-cyan/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                {/* Animated glow ring */}
                                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-brand-purple/40 via-brand-cyan/40 to-brand-purple/40 opacity-0 group-hover/card:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

                                <div className="relative z-10">
                                    <div className="text-5xl xl:text-6xl font-light font-grotesk bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-purple bg-[length:200%_100%] bg-clip-text text-transparent mb-3 group-hover/card:animate-gradient-x">
                                        98%
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/50 mb-2 font-medium">
                                        Client Retention
                                    </div>
                                    <div className="text-lg font-medium text-black/80 dark:text-white/80 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                                        Year over Year
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 - Performance */}
                            <div
                                data-speed="0.04"
                                data-tilt
                                data-glass-light
                                className="absolute top-[50%] right-[25%] -translate-y-1/2 glass p-6 rounded-3xl w-[200px] z-25 border border-[#10b981]/20 dark:border-[#10b981]/30 hover:border-[#10b981]/40 dark:hover:border-[#10b981]/50 transition-all duration-500 will-change-transform group/card"
                                style={{
                                    transformStyle: "preserve-3d",
                                    boxShadow: "0 8px 32px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#10b981]/5 via-transparent to-[#34d399]/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                {/* Animated glow ring */}
                                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-[#10b981]/40 via-[#34d399]/40 to-[#10b981]/40 opacity-0 group-hover/card:opacity-100 blur-sm transition-opacity duration-500 -z-10" />

                                <div className="relative z-10">
                                    <div className="text-5xl xl:text-5xl font-light font-grotesk bg-gradient-to-r from-[#10b981] via-[#34d399] to-[#10b981] bg-[length:200%_100%] bg-clip-text text-transparent mb-3 group-hover/card:animate-gradient-x">
                                        10x
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.25em] text-black/50 dark:text-white/50 mb-2 font-medium">
                                        Performance
                                    </div>
                                    <div className="text-base font-medium text-black/80 dark:text-white/80 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                                        vs Traditional
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ============================================= */}
                    {/*  STATS BAR                                     */}
                    {/* ============================================= */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-black/[0.06] dark:bg-white/[0.06] rounded-2xl overflow-hidden mb-40">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white dark:bg-[#030303] p-8 md:p-10 text-center group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-500"
                            >
                                <div
                                    data-animate="stat"
                                    data-stat-target={stat.value}
                                    data-stat-suffix={stat.suffix}
                                    data-stat-decimals={stat.decimals ?? 0}
                                    className="opacity-0 text-4xl md:text-5xl font-light font-grotesk text-black dark:text-white mb-2"
                                >
                                    0{stat.suffix}
                                </div>
                                <div className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 font-grotesk">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ============================================= */}
                    {/*  SERVICES                                      */}
                    {/* ============================================= */}
                    <div className="flex items-end justify-between mb-24 pb-8 border-b border-black/10 dark:border-white/10">
                        <div>
                            <span className="text-sm text-brand-blue font-medium font-grotesk">
                                01
                            </span>
                            <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white font-grotesk mt-2">
                                Core Services
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-40">
                        {services.map((service, index) => (
                            <section
                                key={service.id}
                                id={service.id}
                                className="relative scroll-mt-32"
                            >
                                {/* Decorative Line */}
                                <div
                                    data-animate="line"
                                    className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 -translate-x-1/2 h-full z-0 origin-top"
                                    style={{ transform: "scaleY(0)" }}
                                />

                                <div
                                    data-animate="section"
                                    className={`opacity-0 grid lg:grid-cols-2 gap-16 items-center relative z-10 ${index % 2 === 1 ? "lg:direction-rtl" : ""
                                        }`}
                                >
                                    {/* Content Side */}
                                    <div
                                        className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                                                style={{
                                                    boxShadow: `0 8px 32px ${service.accentColor}`,
                                                }}
                                            >
                                                <service.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-light font-grotesk">
                                                    {service.title}
                                                </h2>
                                                <h3 className="text-sm text-black/50 dark:text-white/50 font-medium uppercase tracking-wider mt-1">
                                                    {service.subtitle}
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-black/50 dark:text-white/50 text-lg leading-relaxed">
                                            {service.description}
                                        </p>

                                        <ul className="space-y-4">
                                            {service.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    data-animate="feature"
                                                    className="opacity-0 flex items-center gap-3 text-black/70 dark:text-white/70 group/feat"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 group-hover/feat:scale-110 transition-transform" />
                                                    <span className="group-hover/feat:text-black dark:group-hover/feat:text-white transition-colors">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="pt-8 flex flex-wrap items-center gap-8 border-t border-black/10 dark:border-white/10">
                                            <div>
                                                <div className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-1">
                                                    Starting At
                                                </div>
                                                <div className="text-3xl md:text-4xl font-bold font-grotesk">
                                                    <span
                                                        data-animate="price"
                                                        data-price-target={service.priceNum}
                                                        className="opacity-0"
                                                    >
                                                        {service.price}
                                                    </span>
                                                    <span className="text-sm font-normal text-black/40 dark:text-white/40 ml-1">
                                                        /mo
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href="/contact"
                                                className="magnetic px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold uppercase tracking-wider hover:bg-brand-blue hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                            >
                                                Start Project
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Visual Side -- glass card with tilt + light */}
                                    <div
                                        className={`${index % 2 === 1 ? "lg:order-1" : ""
                                            }`}
                                    >
                                        <div
                                            data-tilt
                                            data-glass-light
                                            className="glass p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group hover:border-black/20 dark:hover:border-white/20 transition-colors duration-500 min-h-[420px] flex items-center justify-center will-change-transform"
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            <div
                                                data-scroll-glow
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    background: `radial-gradient(600px circle at 50% 20%, ${service.accentColor} 0%, transparent 60%)`,
                                                    opacity: "calc(0.15 + var(--glow-progress) * 0.6)",
                                                    transform:
                                                        "translateY(calc(var(--glow-progress) * -24px))",
                                                }}
                                            />
                                            {/* Dynamic gradient bg */}
                                            <div
                                                className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                                            />
                                            <div
                                                className={`absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br ${service.gradient} blur-[100px] opacity-20`}
                                            />


                                            <div className="relative z-10 text-center">
                                                <div
                                                    data-animate="icon"
                                                    className="opacity-0"
                                                >
                                                    <service.icon className="w-36 h-36 mx-auto text-white/15 mb-6 stroke-[0.5]" />
                                                </div>
                                                <div className="text-sm uppercase tracking-[0.3em] text-black/30 dark:text-white/30 font-grotesk">
                                                    Professional Grade
                                                </div>
                                                <div
                                                    className={`mt-4 w-16 h-[2px] mx-auto bg-gradient-to-r ${service.gradient} rounded-full opacity-40`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* ============================================= */}
                    {/*  PROCESS / METHODOLOGY                         */}
                    {/* ============================================= */}
                    <section
                        id="process"
                        className="mt-48 scroll-mt-32"
                        data-scroll-track
                    >
                        <div className="flex items-end justify-between mb-24 pb-8 border-b border-black/10 dark:border-white/10">
                            <div>
                                <span className="text-sm text-brand-purple font-medium font-grotesk">
                                    02
                                </span>
                                <h2 className="text-4xl md:text-6xl font-light text-black dark:text-white font-grotesk mt-2">
                                    Our Process
                                </h2>
                            </div>
                            <p className="hidden md:block text-black/40 dark:text-white/40 max-w-sm text-right text-sm leading-relaxed">
                                A proven methodology refined across 120+ projects for
                                predictable, high-quality outcomes.
                            </p>
                        </div>

                        {/* Process cards container */}
                        <div className="relative">

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {process.map((item) => (
                                    <div
                                        key={item.step}
                                        data-animate="process"
                                        data-tilt
                                        data-glass-light
                                        className="opacity-0 glass p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 relative group will-change-transform"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Step dot on timeline */}
                                        <div className="hidden md:flex absolute -top-[4px] left-1/2 -translate-x-1/2 -translate-y-[56px] w-3 h-3 rounded-full bg-brand-blue border-2 border-[#030303] z-10 group-hover:scale-150 transition-transform" />

                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-xs font-grotesk text-brand-blue font-bold tracking-wider">
                                                {item.step}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-brand-blue/10 transition-colors">
                                                <item.icon className="w-5 h-5 text-black/60 dark:text-white/60 group-hover:text-brand-blue transition-colors" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-light font-grotesk mb-3 group-hover:text-brand-blue transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-black/40 dark:text-white/40 leading-relaxed text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ============================================= */}
                    {/*  CTA                                           */}
                    {/* ============================================= */}
                    <section className="mt-48 text-center">
                        <div
                            data-animate="cta"
                            className="opacity-0 glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden max-w-5xl mx-auto border border-black/10 dark:border-white/10"
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-brand-purple/5 to-brand-cyan/10" />
                            <div
                                data-scroll-reactive
                                data-scroll-speed="0.05"
                                data-scroll-axis="x"
                                className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-blue/10 blur-[100px]"
                            />
                            <div
                                data-scroll-reactive
                                data-scroll-speed="0.08"
                                data-scroll-axis="both"
                                className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-purple/10 blur-[100px]"
                            />

                            <h2
                                data-animate="cta-child"
                                className="opacity-0 text-4xl md:text-6xl font-light mb-6 font-grotesk relative z-10"
                            >
                                Ready to Transform
                                <br />
                                <span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                                    Your Business?
                                </span>
                            </h2>
                            <p
                                data-animate="cta-child"
                                className="opacity-0 text-black/50 dark:text-white/50 text-xl mb-12 max-w-2xl mx-auto relative z-10"
                            >
                                Schedule a free consultation with our experts to discuss
                                your specific needs and goals.
                            </p>
                            <div
                                data-animate="cta-child"
                                className="opacity-0 relative z-10 flex flex-wrap justify-center gap-4"
                            >
                                <Link
                                    href="/contact"
                                    className="magnetic inline-flex items-center gap-3 px-10 py-5 bg-brand-blue text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#2563eb] transition-colors group"
                                >
                                    Get in Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/projects"
                                    className="magnetic inline-flex items-center gap-3 px-10 py-5 border border-black/20 dark:border-white/20 text-black dark:text-white rounded-full font-bold uppercase tracking-wider hover:border-black/40 dark:hover:border-white/40 transition-colors"
                                >
                                    View Our Work
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}
