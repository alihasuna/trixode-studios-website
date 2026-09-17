import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  BookOpen,
  Building2,
  Cpu,
  ExternalLink,
  Linkedin,
  Mail,
  Microscope,
  ShieldCheck,
  Waves,
  Youtube,
} from "lucide-react"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.trixode-studios.com"

const profileUrl = `${siteUrl}/hussien`
const portraitPath = "/images/hussien/hussien-einstein-portrait-4x5.jpg"
const portraitUrl = `${siteUrl}${portraitPath}`
const socialPreviewPath = "/images/hussien/hussien-einstein-social.jpg"

export const metadata: Metadata = {
  title: "Hussien Ballouk | Physics Researcher and Technical Founder",
  description:
    "Hussien Ballouk works across electron microscopy, computational imaging, nanotechnology, semiconductors, and secure agentic software.",
  alternates: { canonical: profileUrl },
  openGraph: {
    title: "Hussien Ballouk | Physics Researcher and Technical Founder",
    description:
      "Research in electron microscopy and computational imaging, alongside secure agentic systems built through Trixode Studios.",
    url: profileUrl,
    type: "profile",
    images: [
      {
        url: socialPreviewPath,
        width: 1200,
        height: 630,
        alt: "Hussien Ballouk standing in front of a sculpted Albert Einstein relief",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hussien Ballouk | Physics Researcher and Technical Founder",
    description:
      "Physics from real research environments and secure systems built with human control.",
    images: [socialPreviewPath],
  },
}

const socialProfiles = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hussien-ballouk-233b3b116/",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@balloukhussien",
    icon: Youtube,
  },
  {
    label: "X",
    href: "https://x.com/HussienBalllouk",
    icon: ExternalLink,
  },
]

const researchAreas = [
  {
    title: "Electron microscopy",
    description: "Understanding matter by studying how electrons interact with structure at very small scales.",
    icon: Microscope,
  },
  {
    title: "Electron ptychography",
    description: "Reconstructing both amplitude and phase from overlapping diffraction measurements.",
    icon: Waves,
  },
  {
    title: "Surfaces and semiconductors",
    description: "Connecting condensed-matter physics, nanotechnology, and surface-sensitive measurements in advanced materials.",
    icon: Atom,
  },
  {
    title: "Computational modelling",
    description: "Designing interactive algorithms that keep expert judgement inside the reconstruction process.",
    icon: Cpu,
  },
]

const publicEvidence = [
  {
    label: "University of Victoria",
    title: "Physics and Astronomy researcher directory",
    href: "https://www.uvic.ca/science/physics/people/people/graduate/index.php",
  },
  {
    label: "PCAMM 2025",
    title: "Reflection-mode ptychography presentation listing",
    href: "https://www.uvic.ca/research/centres/camtec/news/archive/pcamm25.php",
  },
]

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${profileUrl}#person`,
  name: "Hussien Ballouk",
  alternateName: ["Hussien Ali Ballouk", "Hussien Ali Ballouk Hernandez"],
  url: profileUrl,
  image: portraitUrl,
  jobTitle: "Physics researcher and technical founder",
  worksFor: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Trixode Studios",
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "University of Victoria",
    url: "https://www.uvic.ca/",
  },
  knowsAbout: [
    "Condensed matter physics",
    "Electron microscopy",
    "Electron ptychography",
    "Nanotechnology",
    "Semiconductors",
    "Computational modelling",
    "Agentic software systems",
  ],
  sameAs: [
    "https://www.linkedin.com/in/hussien-ballouk-233b3b116/",
    "https://x.com/HussienBalllouk",
    "https://www.youtube.com/@balloukhussien",
    "https://www.instagram.com/quantum.sauce/",
    "https://x.com/trixodestudios",
    "https://www.instagram.com/trixodestudios.inc/",
  ],
}

export default function HussienPage() {
  return (
    <div className="min-h-[100dvh] bg-[#f5f7f8] text-[#10151c] dark:bg-[#05070a] dark:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="border-b border-black/10 bg-[#f5f7f8]/90 backdrop-blur dark:border-white/10 dark:bg-[#05070a]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Trixode Studios
          </Link>
          <a
            href="mailto:ceo@trixode-studios.com"
            className="inline-flex min-h-11 items-center gap-2 border border-black/15 px-4 text-sm font-medium transition-colors hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/20"
          >
            Contact
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
          <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] [background-size:72px_72px] dark:opacity-30" />
          <div className="relative mx-auto grid max-w-7xl items-end gap-14 px-5 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_0.72fr] lg:items-center lg:gap-24 lg:py-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#2563eb]">
                Physics researcher · technical founder
              </p>
              <h1 className="mt-7 max-w-4xl font-grotesk text-6xl font-medium leading-[0.93] tracking-[-0.055em] sm:text-7xl lg:text-[7.2rem]">
                Hussien Ballouk
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-black/65 dark:text-white/65 md:text-xl">
                I study how computation can recover structure from electron measurements, then apply the same care to secure agentic systems.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {socialProfiles.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 border border-black/15 bg-white/70 px-4 text-sm font-medium transition-colors hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/15 dark:bg-white/[0.03]"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <figure className="justify-self-start lg:justify-self-end">
              <div className="relative aspect-[4/5] w-[min(88vw,25rem)] overflow-hidden border border-black/10 bg-[#dfe5e9] shadow-[0_28px_70px_rgba(16,21,28,0.14)] dark:border-white/15 dark:bg-[#11161c] dark:shadow-[0_28px_70px_rgba(0,0,0,0.34)] lg:h-[min(66dvh,34rem)] lg:w-auto">
                <Image
                  src={portraitPath}
                  alt="Hussien Ballouk standing in front of a sculpted Albert Einstein relief"
                  fill
                  sizes="(max-width: 1024px) 88vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-4 max-w-sm text-xs leading-relaxed text-black/60 dark:text-white/60">
                Based in Victoria, British Columbia
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#2563eb]">Research</p>
              <h2 className="mt-5 font-grotesk text-4xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
                Measurements are not images yet.
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-black/60 dark:text-white/60">
                A detector records how electron waves scatter. Computational imaging asks what structure could have produced those measurements.
              </p>
            </div>

            <div className="grid border-t border-black/10 dark:border-white/10 sm:grid-cols-2">
              {researchAreas.map(({ title, description, icon: Icon }, index) => (
                <article
                  key={title}
                  className={`border-b border-black/10 py-8 dark:border-white/10 sm:p-8 ${
                    index % 2 === 0 ? "sm:border-r" : ""
                  }`}
                >
                  <Icon className="h-6 w-6 text-[#2563eb]" aria-hidden="true" />
                  <h3 className="mt-8 font-grotesk text-xl font-medium tracking-[-0.02em]">{title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-black/55 dark:text-white/55">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-[#0a1018] text-white dark:border-white/10">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.3fr_0.7fr]">
            <figure className="relative min-h-[24rem] overflow-hidden lg:min-h-[38rem]">
              <Image
                src="/images/hussien/electron-diffraction-concept.png"
                alt="Conceptual artwork of electron waves interacting with a crystalline surface"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </figure>
            <div className="flex flex-col justify-between border-t border-white/15 p-7 md:p-12 lg:border-l lg:border-t-0">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#60a5fa]">A useful analogy</p>
                <blockquote className="mt-7 font-grotesk text-3xl font-medium leading-tight tracking-[-0.035em] md:text-4xl">
                  Diffraction is a shadow written in waves. Ptychography works backward from many overlapping shadows.
                </blockquote>
              </div>
              <figcaption className="mt-16 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/60">
                Conceptual artwork for explanation. This is not measured data.
              </figcaption>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-[#2563eb]" aria-hidden="true" />
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#2563eb]">Building</p>
              </div>
              <h2 className="mt-6 font-grotesk text-4xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
                Research discipline, applied to software.
              </h2>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-black/60 dark:text-white/60">
                Through Trixode Studios, I build measurable agentic systems. Morphika is the first product: secure agentic email where a human keeps the consequential decision.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://x.com/trixodestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 bg-[#2563eb] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
                >
                  Trixode on X
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/morphika_ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 border border-black/15 px-5 text-sm font-medium transition-colors hover:border-[#2563eb] hover:text-[#2563eb] dark:border-white/20"
                >
                  Morphika
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className="border-l-2 border-[#2563eb] bg-white p-7 dark:bg-white/[0.035] md:p-10">
              <ShieldCheck className="h-7 w-7 text-[#2563eb]" aria-hidden="true" />
              <h3 className="mt-7 font-grotesk text-2xl font-medium tracking-[-0.02em]">Human authority is a product requirement.</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-black/60 dark:text-white/60">
                Useful agents need room to work. Consequential actions still need identity, evidence, and an accountable human decision.
              </p>
            </aside>
          </div>
        </section>

        <section className="border-y border-black/10 dark:border-white/10">
          <div className="mx-auto grid max-w-7xl md:grid-cols-[0.8fr_1.2fr]">
            <div className="p-7 md:p-10 lg:p-14">
              <BookOpen className="h-6 w-6 text-[#2563eb]" aria-hidden="true" />
              <h2 className="mt-7 font-grotesk text-3xl font-medium tracking-[-0.03em]">Selected writing</h2>
            </div>
            <div className="flex min-h-48 items-center border-t border-black/10 p-7 dark:border-white/10 md:border-l md:border-t-0 md:p-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2563eb]">Editorial review</p>
                <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-black/60 dark:text-white/60">
                  Essays and public talks will be added here after their authorship and claims have been reviewed and endorsed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#2563eb]">Public evidence</p>
              <h2 className="mt-5 font-grotesk text-4xl font-medium leading-tight tracking-[-0.035em]">Follow the source.</h2>
            </div>
            <div className="border-t border-black/10 dark:border-white/10">
              {publicEvidence.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid min-h-28 gap-3 border-b border-black/10 py-7 transition-colors hover:text-[#2563eb] dark:border-white/10 sm:grid-cols-[0.35fr_1fr_auto] sm:items-center"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/60 dark:text-white/60">{item.label}</span>
                  <span className="font-grotesk text-lg font-medium">{item.title}</span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#2563eb] text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-5 py-16 md:flex-row md:items-end md:px-10 md:py-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">Science in public</p>
              <h2 className="mt-5 max-w-2xl font-grotesk text-4xl font-medium leading-tight tracking-[-0.035em] md:text-5xl">
                Physics from inside real research environments.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/quantum.sauce/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 flex-none items-center gap-2 bg-white px-5 text-sm font-semibold text-[#153f9f] transition-colors hover:bg-[#eef4ff]"
            >
              Follow Quantum Sauce
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-[#f5f7f8] dark:border-white/10 dark:bg-[#05070a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-xs text-black/60 dark:text-white/60 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} Hussien Ballouk</span>
          <span>Research explained conceptually. Unpublished results remain private.</span>
        </div>
      </footer>
    </div>
  )
}
