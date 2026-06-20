import Link from "next/link"

const essays = [
    {
        slug: "energy-donut",
        kicker: "DIY fusion · 2026 · part 2",
        title: "The Energy Donut",
        excerpt: "A curious person's guide to tokamaks, magnetic fields, and the engineering of stars. Live in-browser simulator included.",
        readTime: "10 min",
    },
    {
        slug: "star-in-a-jar",
        kicker: "DIY fusion · 2026 · part 1",
        title: "Energy Donuts and a Star in a Jar",
        excerpt: "A curious person's guide to DIY fusion — with a live in-browser simulator of a Farnsworth fusor.",
        readTime: "12 min",
    },
]

export default function WritingIndex() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white">
            <header className="border-b border-black/10 dark:border-white/10">
                <div className="mx-auto flex max-w-5xl items-baseline gap-4 px-6 py-5 md:px-10">
                    <Link href="/" className="font-grotesk text-sm tracking-[0.18em] uppercase text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white">
                        Trixode Studios
                    </Link>
                    <span className="text-xs text-black/40 dark:text-white/40">/ writing</span>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-6 pb-32 pt-20 md:px-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                    Writing
                </p>
                <h1 className="mt-6 font-grotesk text-5xl font-light leading-[1.05] tracking-[-0.02em] md:text-7xl">
                    Chill science.<br />Stuff worth being curious about.
                </h1>
                <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-black/60 dark:text-white/60 md:text-lg">
                    Essays on physics, fusion, and the things I build to understand them.
                    Most come with an interactive simulator. Feynman-style — no equations
                    unless they earn their place.
                </p>

                <ul className="mt-20 space-y-2 border-t border-black/10 dark:border-white/10">
                    {essays.map((essay) => (
                        <li key={essay.slug}>
                            <Link
                                href={`/writing/${essay.slug}`}
                                className="group block border-b border-black/10 dark:border-white/10 py-8 transition-colors hover:border-black/30 dark:hover:border-white/30"
                            >
                                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40 md:w-40 md:flex-none md:pt-2">
                                        {essay.kicker}
                                    </span>
                                    <div className="flex-1">
                                        <h2 className="font-grotesk text-2xl font-light leading-tight tracking-[-0.01em] text-black dark:text-white transition-colors group-hover:text-[#3b82f6] md:text-3xl">
                                            {essay.title}
                                        </h2>
                                        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-black/55 dark:text-white/55">
                                            {essay.excerpt}
                                        </p>
                                        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-black/35 dark:text-white/35">
                                            {essay.readTime} · read
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>

            <footer className="border-t border-black/10 dark:border-white/10 py-10 text-center text-xs text-black/40 dark:text-white/40">
                <span>© 2026 Trixode Studios · Victoria, BC</span>
            </footer>
        </div>
    )
}
