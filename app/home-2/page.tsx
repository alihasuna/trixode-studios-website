"use client"

import { useEffect, useRef } from "react"
import { animate, createTimeline, remove, stagger } from "animejs"
import MobileMenu from "@/components/mobile-menu"

const capabilities = [
  {
    title: "Adaptive Platforms",
    body: "Systems that evolve with your data, tuned for scale and resilience.",
  },
  {
    title: "Signal Intelligence",
    body: "Analytics that surface patterns, prioritize risk, and automate decisions.",
  },
  {
    title: "Product Acceleration",
    body: "Rapid build cycles with measurable ROI and pragmatic architecture.",
  },
]

const milestones = [
  {
    label: "Discovery",
    detail: "Clarify the outcome, define the constraints, and align on metrics.",
  },
  {
    label: "Design",
    detail: "Prototype the experience, validate the flow, and pressure-test risks.",
  },
  {
    label: "Build",
    detail: "Ship in focused sprints with instrumentation baked into every release.",
  },
  {
    label: "Scale",
    detail: "Harden, automate, and expand to new surfaces and markets.",
  },
]

const projects = [
  {
    name: "Northwind Radar",
    field: "Climate Intelligence",
    year: "2025",
  },
  {
    name: "Vector Atlas",
    field: "Biotech Infrastructure",
    year: "2025",
  },
  {
    name: "Axial Studio",
    field: "Creative Systems",
    year: "2024",
  },
]

export default function HomeOptionTwo() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const heroTargets = root.querySelectorAll("[data-animate='hero']")
    const sectionTargets = root.querySelectorAll("[data-animate='section']")
    const orbitTargets = root.querySelectorAll("[data-animate='orbit']")

    if (reducedMotion) {
      ;[...heroTargets, ...sectionTargets].forEach((el) => {
        const element = el as HTMLElement
        element.style.opacity = "1"
        element.style.transform = "none"
        element.classList.remove("opacity-0", "translate-y-6")
      })
      return
    }

    createTimeline().add(heroTargets, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(120),
      duration: 900,
      ease: "outExpo",
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target, {
              opacity: [0, 1],
              translateY: [24, 0],
              duration: 800,
              ease: "outExpo",
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionTargets.forEach((el) => observer.observe(el))

    animate(orbitTargets, {
      translateY: [0, -14],
      direction: "alternate",
      ease: "inOutSine",
      duration: 2600,
      delay: stagger(260),
      loop: true,
    })

    return () => {
      observer.disconnect()
      remove(heroTargets)
      remove(sectionTargets)
      remove(orbitTargets)
    }
  }, [])

  return (
    <div ref={rootRef} className="home2-root">
      <div className="home2-surface">
        <div className="relative z-10">
          <header className="px-6 md:px-16 pt-10">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full border border-[color:var(--h2-border)] flex items-center justify-center text-sm tracking-[0.2em]">
                  TS
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Trixode</div>
                  <div className="text-lg">Home Option Two</div>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em] text-[color:var(--h2-muted)]">
                <a className="hover:text-[color:var(--h2-ink)] transition-colors" href="#capabilities">
                  Capabilities
                </a>
                <a className="hover:text-[color:var(--h2-ink)] transition-colors" href="#process">
                  Process
                </a>
                <a className="hover:text-[color:var(--h2-ink)] transition-colors" href="#contact">
                  Contact
                </a>
              </nav>
              <div className="md:hidden">
                <MobileMenu currentPath="/home-2" />
              </div>
            </div>
          </header>

          <section className="px-6 md:px-16 pt-20 pb-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
              <div className="space-y-10">
                <div data-animate="hero" className="opacity-0 translate-y-6">
                  <span className="text-xs uppercase tracking-[0.4em] text-[color:var(--h2-muted)]">
                    Victoria, BC / Software Studio
                  </span>
                </div>
                <div data-animate="hero" className="opacity-0 translate-y-6">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95]">
                    We design
                    <span className="block text-[color:var(--h2-accent)]">intentional</span>
                    systems for
                    <span className="block text-[color:var(--h2-accent-2)]">high-stakes</span>
                    teams.
                  </h1>
                </div>
                <p
                  data-animate="hero"
                  className="opacity-0 translate-y-6 text-lg text-[color:var(--h2-muted)] max-w-xl"
                >
                  A senior studio dedicated to AI, product platforms, and data intelligence. We help ambitious teams ship
                  resilient infrastructure with a premium user experience.
                </p>
                <div data-animate="hero" className="opacity-0 translate-y-6 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-[0.3em] border border-[color:var(--h2-border)] hover:border-[color:var(--h2-accent)] transition-colors"
                  >
                    Start a Project
                  </a>
                  <a
                    href="#capabilities"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)] hover:text-[color:var(--h2-ink)] transition-colors"
                  >
                    Explore Capabilities
                  </a>
                </div>
                <div data-animate="hero" className="opacity-0 translate-y-6 grid grid-cols-2 gap-6">
                  {[
                    { label: "Delivery velocity", value: "6-week sprints" },
                    { label: "Support window", value: "24/7 coverage" },
                  ].map((item) => (
                    <div key={item.label} className="border-t border-[color:var(--h2-border)] pt-4">
                      <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">
                        {item.label}
                      </div>
                      <div className="text-xl mt-2">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div
                  data-animate="hero"
                  className="opacity-0 translate-y-6 border border-[color:var(--h2-border)] rounded-3xl p-8 bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">
                        Signal Stack
                      </div>
                      <div className="text-3xl mt-3">Realtime Intelligence</div>
                    </div>
                    <div className="h-12 w-12 rounded-full border border-[color:var(--h2-border)] flex items-center justify-center">
                      98%
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-2xl text-[color:var(--h2-accent)]">12M</div>
                      <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">signals/day</div>
                    </div>
                    <div>
                      <div className="text-2xl text-[color:var(--h2-accent-2)]">0.4s</div>
                      <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">avg response</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4">
                  {[
                    { title: "Scenario Planning", note: "Live simulations and risk scoring" },
                    { title: "Data Provenance", note: "Auditable pipelines with full lineage" },
                    { title: "AI Ops", note: "Guardrails for human-AI collaboration" },
                  ].map((item) => (
                    <div
                      key={item.title}
                      data-animate="hero"
                      className="opacity-0 translate-y-6 flex items-center justify-between border border-[color:var(--h2-border)] rounded-2xl px-6 py-4"
                    >
                      <div>
                        <div className="text-lg">{item.title}</div>
                        <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">{item.note}</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[color:var(--h2-accent)]" data-animate="orbit" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="capabilities" className="px-6 md:px-16 py-20">
            <div className="max-w-6xl mx-auto">
              <div data-animate="section" className="opacity-0 translate-y-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Capabilities</div>
                  <h2 className="text-4xl md:text-5xl mt-3">Built for consequential work.</h2>
                </div>
                <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">01</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {capabilities.map((item) => (
                  <div
                    key={item.title}
                    data-animate="section"
                    className="opacity-0 translate-y-6 border border-[color:var(--h2-border)] rounded-3xl p-6 bg-[rgba(255,255,255,0.02)]"
                  >
                    <div className="text-2xl mb-4 text-[color:var(--h2-accent)]">{item.title}</div>
                    <p className="text-[color:var(--h2-muted)] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="process" className="px-6 md:px-16 py-20">
            <div className="max-w-6xl mx-auto">
              <div data-animate="section" className="opacity-0 translate-y-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Method</div>
                  <h2 className="text-4xl md:text-5xl mt-3">Precision process, zero fluff.</h2>
                </div>
                <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">02</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {milestones.map((item, index) => (
                  <div
                    key={item.label}
                    data-animate="section"
                    className="opacity-0 translate-y-6 border border-[color:var(--h2-border)] rounded-3xl p-6"
                  >
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">0{index + 1}</div>
                    <div className="text-2xl mt-3">{item.label}</div>
                    <p className="text-[color:var(--h2-muted)] mt-3 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-16 py-20">
            <div className="max-w-6xl mx-auto">
              <div data-animate="section" className="opacity-0 translate-y-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Selected Work</div>
                  <h2 className="text-4xl md:text-5xl mt-3">Ships that move markets.</h2>
                </div>
                <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">03</span>
              </div>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    data-animate="section"
                    className="opacity-0 translate-y-6 border border-[color:var(--h2-border)] rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">{project.year}</div>
                      <div className="text-2xl mt-2">{project.name}</div>
                    </div>
                    <div className="text-sm uppercase tracking-[0.3em] text-[color:var(--h2-muted)] mt-2 md:mt-0">
                      {project.field}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="px-6 md:px-16 py-24">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
              <div data-animate="section" className="opacity-0 translate-y-6">
                <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Contact</div>
                <h2 className="text-4xl md:text-5xl mt-3">Let us map the next release.</h2>
                <p className="text-[color:var(--h2-muted)] mt-6 leading-relaxed">
                  We are opening Q2 and Q3 partnership slots. Tell us about the initiative, timeline, and the outcomes
                  you need to deliver.
                </p>
                <div className="mt-8 grid gap-4">
                  <div className="border border-[color:var(--h2-border)] rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Email</div>
                    <div className="text-lg mt-2">hello@trixode.com</div>
                  </div>
                  <div className="border border-[color:var(--h2-border)] rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]">Phone</div>
                    <div className="text-lg mt-2">+1 (250) 555-0127</div>
                  </div>
                </div>
              </div>
              <form data-animate="section" className="opacity-0 translate-y-6 border border-[color:var(--h2-border)] rounded-3xl p-8 grid gap-6">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full bg-transparent border-b border-[color:var(--h2-border)] py-3 mt-2 text-[color:var(--h2-ink)] focus:outline-none focus:border-[color:var(--h2-accent)]"
                    placeholder="Your name"
                    type="text"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    className="w-full bg-transparent border-b border-[color:var(--h2-border)] py-3 mt-2 text-[color:var(--h2-ink)] focus:outline-none focus:border-[color:var(--h2-accent)]"
                    placeholder="you@company.com"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-[color:var(--h2-muted)]" htmlFor="message">
                    Project Overview
                  </label>
                  <textarea
                    id="message"
                    className="w-full bg-transparent border-b border-[color:var(--h2-border)] py-3 mt-2 text-[color:var(--h2-ink)] focus:outline-none focus:border-[color:var(--h2-accent)] resize-none"
                    placeholder="Tell us about the scope"
                    rows={4}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 border border-[color:var(--h2-border)] py-3 text-sm uppercase tracking-[0.3em] hover:border-[color:var(--h2-accent)] transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
