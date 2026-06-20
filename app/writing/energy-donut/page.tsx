import Link from "next/link"
import type { Metadata } from "next"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

export const metadata: Metadata = {
    title: "The Energy Donut — a curious person's guide to tokamaks",
    description:
        "How magnetic confinement actually works, why every fusion device is a donut, and what the safety factor q means. Live in-browser simulator included.",
    alternates: { canonical: `${baseUrl}/writing/energy-donut` },
    openGraph: {
        title: "The Energy Donut — magnetic confinement explained",
        description:
            "How tokamaks confine plasma in a donut shape. With a live in-browser tokamak simulator.",
        url: `${baseUrl}/writing/energy-donut`,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "The Energy Donut",
        description:
            "A curious person's guide to tokamaks. With a live in-browser simulator.",
    },
}

function H2({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mt-20 mb-8 font-grotesk text-3xl font-light leading-tight tracking-[-0.01em] text-black dark:text-white md:text-4xl">
            {children}
        </h2>
    )
}

function P({ children }: { children: React.ReactNode }) {
    return (
        <p className="mt-6 text-[17px] font-light leading-[1.75] text-black/75 dark:text-white/75 md:text-[19px]">
            {children}
        </p>
    )
}

function Emph({ children }: { children: React.ReactNode }) {
    return <em className="text-black dark:text-white not-italic">{children}</em>
}

export default function EnergyDonut() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white">
            <header className="border-b border-black/10 dark:border-white/10">
                <div className="mx-auto flex max-w-5xl items-baseline gap-4 px-6 py-5 md:px-10">
                    <Link href="/writing" className="font-grotesk text-sm tracking-[0.18em] uppercase text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white">
                        ← Writing
                    </Link>
                    <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                        DIY fusion · 2026
                    </span>
                </div>
            </header>

            <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:px-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3b82f6]">
                    Essay · part 2 of 2
                </p>
                <h1 className="mt-6 font-grotesk text-[3rem] font-light leading-[1.05] tracking-[-0.025em] md:text-[5rem]">
                    The{" "}
                    <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                        Energy Donut
                    </span>
                </h1>
                <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-black/65 dark:text-white/65">
                    A curious person's guide to tokamaks, magnetic fields, and the engineering of stars.
                </p>
                <div className="mt-10 flex items-baseline gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                    <span>by Ali</span>
                    <span>·</span>
                    <span>10 min read</span>
                    <span>·</span>
                    <Link href="/writing/star-in-a-jar" className="text-black/60 dark:text-white/60 hover:text-[#8b5cf6]">
                        part 1: Star in a Jar
                    </Link>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
                <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black">
                    <div className="absolute inset-0 grid place-items-center text-xs font-mono uppercase tracking-[0.22em] text-white/30 pointer-events-none">
                        winding the coils…
                    </div>
                    <iframe
                        src="/donut-sim/donut_sim.html"
                        title="Energy Donut — Tokamak Magnetic Confinement"
                        className="relative block h-[640px] w-full md:h-[760px]"
                        loading="lazy"
                        allow="fullscreen"
                    />
                </div>
                <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                    live · drag to orbit · turn poloidal Bp down to break confinement
                </p>
            </section>

            <article className="mx-auto max-w-3xl px-6 pb-32 md:px-10">
                <P>
                    In the{" "}
                    <Link href="/writing/star-in-a-jar" className="text-black dark:text-white underline decoration-black/30 dark:decoration-white/30 underline-offset-4 hover:decoration-black dark:hover:decoration-white">
                        last essay
                    </Link>{" "}
                    I built a fusor — a tiny fusion device that uses raw
                    electric voltage to pull ions into a cage and let them
                    oscillate until some of them fuse. Cages are the
                    basement-budget answer to fusion.
                </P>
                <P>
                    This is the <Emph>other</Emph> answer. The one with the
                    billion-dollar price tag. The energy donut.
                </P>
                <P>
                    A tokamak is shaped, in essence, like a donut. Not a
                    metaphor. A literal hollow toroidal shell wrapped in a
                    forest of enormous superconducting electromagnets. Inside
                    the donut you put a few grams of deuterium-tritium fuel,
                    heat it to a hundred million degrees, and let the magnets
                    hold it in place while the fusion happens.
                </P>
                <P>
                    I built a simulator for this one too. Same C++/raylib
                    stack as the fusor. Same in-browser embed. Different
                    physics — <Emph>very</Emph> different physics.
                </P>
                <P>Let's get into it.</P>

                <H2>Why a donut?</H2>
                <P>
                    The fusor used voltage to pull ions inward. Magnets work
                    differently. Charged particles in a magnetic field don't
                    fall toward the magnet — they{" "}
                    <Emph>spiral around the field line</Emph>. The line is
                    the rail; the particle is a bead with a fixed
                    perpendicular speed, sliding along.
                </P>
                <P>
                    So if you want to hold plasma in place with magnets, you
                    need to give the field lines somewhere to go that{" "}
                    <Emph>doesn't escape</Emph>. A straight magnetic field
                    would let particles slide right off the end. A torus
                    solves this: the field lines wrap around the donut hole
                    and close on themselves. A particle on a closed field
                    line is, in principle, trapped forever.
                </P>
                <P>
                    That's the whole conceptual basis of magnetic
                    confinement. Find a closed magnetic geometry. Put plasma
                    on it. Watch it stay.
                </P>
                <P>
                    The donut shape — the <Emph>torus</Emph> — turns out to
                    be the simplest such geometry that actually works.
                    Everything else (stellarators, mirror machines,
                    spheromaks) is a variation on the same theme: bend the
                    field lines into closed loops so the plasma can't escape.
                </P>

                <H2>The field, or, why donuts twist</H2>
                <P>
                    There's a complication. The toroidal field — the field
                    running <Emph>the long way</Emph> around the donut —
                    varies with radius. Specifically it's <Emph>stronger</Emph>{" "}
                    on the inside of the donut and <Emph>weaker</Emph> on the
                    outside (because the magnets are closer together on the
                    inside). This variation means a charged particle drifts
                    slowly outward across the field lines.
                </P>
                <P>
                    If that drift were the end of the story, every plasma
                    would dribble out the outer wall in a few microseconds.
                    Not useful.
                </P>
                <P>
                    The fix is <Emph>poloidal twist</Emph>. You add a second
                    magnetic field component that runs{" "}
                    <Emph>the short way</Emph> around the donut —
                    perpendicular to the main toroidal field. The result is
                    that every field line is now a <Emph>helix</Emph> —
                    wrapping around the long way and also slowly around the
                    short way at the same time.
                </P>
                <P>
                    The crucial thing about a helical field line is that it
                    spends half its length on the inside of the donut and
                    half on the outside. The radial drift, integrated around
                    a full helix, cancels out. A particle on a helical field
                    line stays trapped.
                </P>
                <P>
                    So a tokamak's magnetic field is two fields stacked: a
                    strong toroidal field generated by external coils, plus a
                    weaker poloidal field generated{" "}
                    <Emph>by the plasma current itself</Emph>. (Yes — you
                    induce a giant current in the plasma using a transformer,
                    and that current makes the poloidal twist. The plasma is
                    also the wire in its own magnet.)
                </P>
                <P>
                    In the sim, the slider labeled <Emph>POLOIDAL Bp</Emph>{" "}
                    adjusts that twist. Watch what happens when you set it to
                    zero.
                </P>

                <H2>The safety factor q</H2>
                <P>
                    How tight should the twist be? This question has a name:
                    the <Emph>safety factor</Emph>, written <Emph>q</Emph>.
                </P>
                <P>
                    Roughly: <Emph>q</Emph> counts how many times a field
                    line goes around the long way for every one time it goes
                    around the short way. <Emph>q = 3</Emph> means a field
                    line spirals around the donut three full toroidal turns
                    before completing one poloidal turn.
                </P>
                <P>
                    The name "safety" is not a marketing thing. Tokamak
                    physicists discovered very early that if <Emph>q</Emph>{" "}
                    drops below about 1 anywhere in the plasma, the plasma
                    goes unstable. A specific instability called a{" "}
                    <Emph>sawtooth</Emph> kicks in, the plasma reorganises
                    violently, and confinement breaks. So you keep{" "}
                    <Emph>q &gt; 1</Emph> everywhere and call yourself safe.
                </P>
                <P>
                    The HUD in the sim shows the approximate <Emph>q</Emph>{" "}
                    in the top-right. Crank toroidal <Emph>B0</Emph> up and{" "}
                    <Emph>q</Emph> goes up — tighter winding, more stable.
                    Crank poloidal <Emph>Bp</Emph> down and <Emph>q</Emph>{" "}
                    explodes — the plasma is just sliding around the donut
                    without twisting, drifts dominate, particles escape.
                </P>
                <P>
                    This is the central engineering knob of every tokamak on
                    Earth.
                </P>

                <H2>What the sim shows</H2>
                <P>
                    The simulator is a <Emph>test-particle</Emph> picture.
                    Each particle is independent — it moves under the
                    prescribed magnetic field with Newton's laws (Lorentz
                    force) using the Boris integrator (the standard
                    symplectic scheme for magnetic-only motion). There's no
                    plasma current self-consistency, no MHD, no kinetic
                    instabilities. The fields are fixed, the particles dance.
                </P>
                <P>What you can see clearly:</P>
                <P>
                    <Emph>Gyration</Emph> — each particle spirals tightly
                    around its local field line. The gyroradius (how big the
                    spiral) depends on thermal velocity and field strength —
                    slider both.
                </P>
                <P>
                    <Emph>Field-line motion</Emph> — particles slide along
                    the helical field lines, which wrap the donut.
                </P>
                <P>
                    <Emph>Drifts</Emph> — when poloidal <Emph>Bp</Emph> is
                    small, watch particles drift outward and escape. When{" "}
                    <Emph>Bp</Emph> is healthy, they stay confined.
                </P>
                <P>
                    <Emph>Mixing</Emph> — at moderate field strengths the
                    particle distribution fills the entire flux surface — the
                    helical motion plus drifts add up to a uniform donut.
                </P>
                <P>
                    The faint blue lines visible in the chamber are sampled
                    magnetic field lines, integrated forward by RK2. They're
                    the rails the plasma rides on.
                </P>

                <H2>What the sim doesn't show</H2>
                <P>The honest list:</P>
                <P>
                    <Emph>Plasma current self-consistency</Emph> — real
                    tokamak poloidal field comes from a plasma current that
                    responds to everything else. Here it's a knob.
                </P>
                <P>
                    <Emph>MHD instabilities</Emph> — real plasmas have kink
                    modes, ballooning modes, edge-localised modes — the whole
                    zoo of ways a confined plasma finds to escape.
                    Test-particle pictures don't see any of this.
                </P>
                <P>
                    <Emph>Heating</Emph> — I just give particles thermal
                    velocity at spawn. Real tokamaks heat with neutral beam
                    injection, radiofrequency, and ohmic dissipation of the
                    plasma current itself.
                </P>
                <P>
                    <Emph>Fusion</Emph> — zero neutrons. Same as the fusor sim.
                </P>
                <P>
                    <Emph>The actual hard part</Emph> — scrape-off layer,
                    divertor heat loads, tritium breeding, neutron damage to
                    walls — the engineering work that consumes 90% of an
                    actual tokamak project.
                </P>
                <P>
                    This is, again, a tool for <Emph>seeing</Emph> magnetic
                    confinement. Not for designing a power plant.
                </P>

                <H2>Donuts versus cages</H2>
                <P>
                    The fusor sim showed how the{" "}
                    <Emph>shape of a cage</Emph> decides where
                    electrostatically-confined ions converge. This sim shows
                    how the <Emph>ratio of magnetic field components</Emph>{" "}
                    decides whether magnetically-confined ions stay or escape.
                </P>
                <P>
                    Both reduce to the same question I posed at the end of
                    the last essay: how do you keep charged particles close
                    together long enough that some of them fuse?
                </P>
                <P>Cages answer with voltage. They're cheap, simple, leaky.</P>
                <P>
                    Donuts answer with magnets. They're absurdly expensive,
                    scale to enormous size, and might one day actually give
                    net power.
                </P>
                <P>
                    If anyone gets to net-positive fusion in our lifetime,
                    it'll almost certainly be a donut. ITER is a donut. SPARC
                    is a donut. The Wendelstein 7-X stellarator in Germany is
                    a more sophisticated relative of the donut. The Chinese
                    EAST, the Korean KSTAR, the British MAST-U — all donuts.
                </P>
                <P>
                    The fusor is a basement experiment. The energy donut is a
                    national-laboratory experiment. Both are honest answers
                    to the same question, at very different scales.
                </P>

                <H2>Play with it</H2>
                <P>Pick up the simulator above. Try these:</P>
                <P>
                    Set <Emph>Bp</Emph> to 0 (no twist) and watch the plasma
                    fail.
                </P>
                <P>
                    Set <Emph>Bp</Emph> to 0.4 (strong twist) and watch the
                    helical field lines pull everything into nice orbits.
                </P>
                <P>
                    Crank thermal velocity up to see large gyroradii —
                    particles trace big visible loops as they slide along
                    field lines.
                </P>
                <P>
                    Squish the donut by shrinking <Emph>a</Emph>. Small minor
                    radius = tighter confinement, smaller volume, lower{" "}
                    <Emph>q</Emph>.
                </P>
                <P>
                    If you build an actual stellarator in your garage, tag
                    me. I want pictures.
                </P>
                <P>
                    <span className="text-black/40 dark:text-white/40">— Ali</span>
                </P>

                <div className="mt-20 flex flex-col gap-4 border-t border-black/10 dark:border-white/10 pt-10 sm:flex-row">
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-full border border-black/15 dark:border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/80 dark:text-white/80 transition-colors hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
                    >
                        Repo on GitHub →
                    </a>
                    <Link
                        href="/writing/star-in-a-jar"
                        className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 dark:border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60 dark:text-white/60 transition-colors hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white"
                    >
                        ← Part 1: Star in a Jar
                    </Link>
                </div>
            </article>

            <footer className="border-t border-black/10 dark:border-white/10 py-10 text-center text-xs text-black/40 dark:text-white/40">
                <span>© 2026 Trixode Studios · Victoria, BC</span>
            </footer>
        </div>
    )
}
