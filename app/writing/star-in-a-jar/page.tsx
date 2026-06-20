import Link from "next/link"
import type { Metadata } from "next"

const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://www.trixode-studios.com"

export const metadata: Metadata = {
    title: "Energy Donuts and a Star in a Jar — DIY Fusion",
    description:
        "A curious person's guide to DIY fusion, with a live in-browser simulator of a Farnsworth fusor. Swap the inner-grid shape, watch the plasma respond.",
    alternates: { canonical: `${baseUrl}/writing/star-in-a-jar` },
    openGraph: {
        title: "Energy Donuts and a Star in a Jar",
        description:
            "A curious person's guide to DIY fusion. With a live in-browser fusor simulator.",
        url: `${baseUrl}/writing/star-in-a-jar`,
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Energy Donuts and a Star in a Jar",
        description:
            "A curious person's guide to DIY fusion. With a live fusor simulator.",
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

export default function StarInAJar() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#030303] text-black dark:text-white">
            {/* Top bar */}
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

            {/* Hero */}
            <section className="mx-auto max-w-3xl px-6 pt-20 pb-12 md:px-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8b5cf6]">
                    Essay
                </p>
                <h1 className="mt-6 font-grotesk text-[3rem] font-light leading-[1.05] tracking-[-0.025em] md:text-[5rem]">
                    Energy Donuts<br />
                    <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">
                        and a Star in a Jar
                    </span>
                </h1>
                <p className="mt-8 max-w-2xl text-xl font-light leading-relaxed text-black/65 dark:text-white/65">
                    A curious person's guide to DIY fusion.
                </p>
                <div className="mt-10 flex items-baseline gap-6 font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                    <span>by Ali</span>
                    <span>·</span>
                    <span>12 min read</span>
                    <span>·</span>
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black/60 dark:text-white/60 hover:text-[#3b82f6]"
                    >
                        repo →
                    </a>
                </div>
            </section>

            {/* Live demo */}
            <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
                <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black">
                    <div className="absolute inset-0 grid place-items-center text-xs font-mono uppercase tracking-[0.22em] text-white/30 pointer-events-none">
                        loading plasma…
                    </div>
                    <iframe
                        src="/fusor-sim/fusor_sim.html"
                        title="Farnsworth Fusor — Plasma Geometry Lab"
                        className="relative block h-[640px] w-full md:h-[760px]"
                        loading="lazy"
                        allow="fullscreen"
                    />
                </div>
                <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-black/40 dark:text-white/40">
                    live in your browser · drag to orbit · pick a cage shape in the side panel
                </p>
            </section>

            {/* Essay body */}
            <article className="mx-auto max-w-3xl px-6 pb-32 md:px-10">
                <P>
                    There's a thing you can build in a garage that, if you do it
                    right, makes a tiny star.
                </P>
                <P>
                    I'm not exaggerating. People do this. They post the videos.
                    The device is called a <Emph>Farnsworth fusor</Emph>, and
                    it's been quietly humming away in basements since 1964. The
                    kid who first patented it was nineteen. The whole apparatus
                    fits on a workbench.
                </P>
                <P>
                    I should be honest up front: a fusor doesn't make useful
                    energy. Nobody has ever gotten one to produce more power
                    than it consumes, and there are deep reasons to think
                    nobody ever will. But it <Emph>does</Emph> make real fusion
                    reactions. Real neutrons. Real, controlled bursts of "we
                    just smashed two hydrogen nuclei together hard enough to
                    fuse them into helium." In a glass jar. On a workbench. In
                    some guy's basement in Ohio.
                </P>
                <P>
                    I built the simulator above to figure out why this works,
                    why it doesn't quite work <Emph>enough</Emph>, and — the
                    part that surprised me most — what happens when you change
                    the shape of the cage in the middle. This is the story of
                    what I found.
                </P>

                <H2>The bulb</H2>
                <P>
                    The recipe is hilariously short. Take a glass vacuum
                    chamber, pump almost all the air out, put a tiny puff of
                    deuterium gas back in. (Deuterium is just hydrogen with an
                    extra neutron. It's stable. You can mail-order it.)
                    Suspend a small metal cage inside the chamber — a few
                    centimeters across, made of thin tungsten wire bent into a
                    sphere or a geodesic or really whatever shape you feel like.
                    Apply a <Emph>very</Emph> negative voltage to the cage.
                    Tens of thousands of volts, negative. The chamber walls
                    stay grounded. Turn the lights off.
                </P>
                <P>
                    If you did it right, you see a soft pink glow filling the
                    bulb. The cage in the middle is also glowing. And if you
                    look carefully, you can see bright beams of light shooting
                    out from inside the cage, through the gaps between the
                    wires, like spokes on a glowing bicycle wheel.
                </P>
                <P>
                    That glow is plasma. Those beams are ions, moving at
                    roughly a million meters per second. And a tiny number of
                    them are colliding hard enough in the middle to fuse.
                </P>
                <P>What is actually going on?</P>

                <H2>The field, or, why ions roll downhill</H2>
                <P>Here's the trick.</P>
                <P>
                    The cage has thirty thousand volts on it.{" "}
                    <Emph>Negative</Emph> thirty thousand. Negative voltage
                    means "this place repels electrons and attracts anything
                    positive." Hydrogen ions are positive things.
                </P>
                <P>
                    So if you take a deuterium ion — somewhere in the chamber,
                    doesn't matter where — and let it go, it does what any
                    attracted thing does. It falls. Toward the cage. Picking
                    up speed as it goes.
                </P>
                <P>
                    By the time it reaches the cage, it has roughly thirty
                    thousand electron-volts of kinetic energy. (One eV is what
                    an electron picks up falling through one volt. Thirty
                    thousand volts means thirty thousand eV. Per ion. There's
                    no free lunch — that energy comes straight out of the wall
                    socket.) This is fast. Faster than escape velocity from
                    the Sun.
                </P>
                <P>
                    Now here's the part that took me a while to wrap my head
                    around: <Emph>the ion doesn't stop at the cage</Emph>.
                </P>
                <P>
                    The cage isn't a solid sphere. It's a few wires arranged
                    into the <Emph>shape</Emph> of a sphere, with most of the
                    volume being empty space between wires. So the ion screams
                    toward the cage, threads the needle through one of the
                    gaps, and finds itself on the <Emph>other side</Emph> of
                    the cage, still moving fast.
                </P>
                <P>
                    But now the cage is <Emph>behind</Emph> it. Which means
                    the cage is still pulling it back. So the ion slows,
                    stops, reverses, and falls back through the cage again.
                    And again. And again. Each oscillation taking about a
                    microsecond.
                </P>
                <P>
                    Until it either (a) clips a wire and dies, or (b) collides
                    with another ion in the dense middle hard enough to
                    actually fuse.
                </P>

                <H2>The dance</H2>
                <P>
                    Now imagine doing this not with one ion but with a hundred
                    million.
                </P>
                <P>
                    They're all falling toward the same point — the center of
                    the cage. They all reach the middle at roughly the same
                    time, all moving very fast, all converging on the same
                    tiny volume of space.
                </P>
                <P>
                    That's where the fusion happens. When two deuterium ions
                    slam into each other head-on at high enough energy,
                    occasionally — very, very occasionally, like one in a
                    million collisions — they tunnel through their mutual
                    Coulomb repulsion, stick together, become a heavier
                    nucleus, and release a neutron. That neutron carries off
                    some of the energy and goes flying out of the chamber.
                </P>
                <P>That's fusion. The thing the Sun does. Just at much smaller scale.</P>
                <P>
                    The whole reason the cage <Emph>works</Emph> is because of
                    its gaps. If the cage were a solid sphere, ions would hit
                    it and stop. The fact that it's mostly empty space lets
                    ions oscillate through it indefinitely. Each ion gets
                    thousands of chances to find a partner before something
                    stops it.
                </P>
                <P>
                    Which means the <Emph>shape</Emph> of the cage really,
                    really matters. And this is the part nobody told me. I had
                    to build a simulator to actually see it.
                </P>

                <H2>Energy donuts versus cages</H2>
                <P>
                    Quick detour, because if you've heard of fusion you've
                    probably heard the word "tokamak" and you're wondering how
                    it relates.
                </P>
                <P>
                    There are two big families of fusion devices on Earth.
                </P>
                <P>
                    <Emph>Energy donuts</Emph> (tokamaks) use magnetic fields
                    to confine plasma in a torus — a literal donut shape. The
                    plasma swirls around the donut, steered by enormous
                    superconducting coils. ITER, the big international fusion
                    project, is a tokamak. SPARC, the MIT spinoff, is a
                    tokamak. These are the billions-of-dollars,
                    will-probably-work-someday projects.
                </P>
                <P>
                    <Emph>Cages</Emph> (electrostatic confinement, like our
                    fusor) use voltage instead of magnets. They are absurdly
                    cheaper, simpler, and inherently leaky — the cage wires
                    keep absorbing ions, which is the fundamental reason a
                    fusor will (probably) never give net energy. But they
                    work, you can build one for a few thousand dollars, and
                    you can change the cage shape on a Saturday afternoon to
                    see what happens.
                </P>
                <P>
                    Both shapes are honest attempts at the same problem:{" "}
                    <Emph>
                        how do you get a bunch of positively-charged particles
                        to stay close enough to each other for long enough
                        that some of them fuse, despite Coulomb's law
                        screaming at them to fly apart?
                    </Emph>
                </P>
                <P>
                    The donut crowd answers with magnets. The cage crowd
                    answers with electricity. Both work. Neither has won.
                </P>

                <H2>Shape matters: what I found</H2>
                <P>
                    Here's the simulator's whole reason for existing: the cage
                    doesn't have to be a sphere.
                </P>
                <P>
                    People have built fusors with cages shaped like single
                    rings, helices, double helices, hourglasses, cones, cubes,
                    and tiny toroids. They all work. They all behave{" "}
                    <Emph>differently</Emph>. I implemented all of these in
                    code and watched.
                </P>
                <P>
                    <Emph>Geodesic sphere.</Emph> The classic. Ions converge
                    to a tight focus in the middle. You see spokes of light
                    through every gap. This is called <Emph>star mode</Emph>.
                    It's what most fusors look like in operation.
                </P>
                <P>
                    <Emph>Single ring.</Emph> The focus collapses to a{" "}
                    <Emph>line</Emph> through the middle of the ring instead
                    of a point. Beautiful, but the ions oscillate along the
                    axis instead of converging spherically. Less central
                    density. Less fusion.
                </P>
                <P>
                    <Emph>Helix and helical cross.</Emph> The ions get an
                    angular twist on the way in. The focus is fuzzier, the
                    dynamics are wilder, and the cross-helix gives some funky
                    standing-wave patterns I genuinely did not expect.
                </P>
                <P>
                    <Emph>Hourglass and cone.</Emph> Asymmetric cages. These
                    can lock into <Emph>tight jet mode</Emph> — instead of
                    star-mode spokes going every direction, all the plasma
                    streams out one preferred opening as a single collimated
                    beam. It is striking on camera.
                </P>
                <P>
                    <Emph>Cube.</Emph> Surprisingly bad. Ions get hung up at
                    the edges of the faces. Lots of grid losses.
                </P>
                <P>
                    <Emph>Toroid.</Emph> Basically a tiny tokamak grid. Star
                    mode forms in two ring-shaped focal zones instead of one
                    central point. The "donut shape inside a cage" concept
                    does work in miniature, but you lose the central
                    convergence that makes the spherical fusor good at making
                    neutrons.
                </P>
                <P>
                    The biggest lesson: there is no single best shape. Every
                    cage trades focus quality against grid losses against
                    where in the chamber the energy goes. The reason every
                    amateur uses a sphere or geodesic is because, for the
                    basement-budget version of this experiment, central
                    convergence beats everything else.
                </P>

                <H2>What the sim does, and doesn't</H2>
                <P>Quick honesty section, because I owe it to you.</P>
                <P>
                    The sim solves real Coulomb's law. The electric field
                    around each charged wire segment is computed from the
                    textbook closed-form expression for a finite line of
                    charge — no shortcuts, no approximations of the field
                    shape. The ions move under real Newtonian mechanics with
                    a symplectic integrator that conserves energy properly
                    over long runs.
                </P>
                <P>
                    What the sim <Emph>doesn't</Emph> model: space charge
                    (the ions don't repel each other), ionization (real
                    fusors continuously make new ions out of the neutral
                    gas), electrons (the sim only tracks positive ions), and
                    the actual fusion reactions themselves (zero neutrons are
                    produced — you'd need a quantum cross-section calculation
                    for that). It also uses reduced units, so you can't read
                    off "this is 30 kV deuterium" from the screen — only{" "}
                    <Emph>relative</Emph> behavior between geometries is
                    meaningful.
                </P>
                <P>
                    This is a qualitative tool. It tells you why one cage
                    shape focuses ions tighter than another, and what star
                    mode and jet mode and halo mode look like from the
                    inside. It does not predict how many neutrons per second
                    a real build would produce. For that, you need much
                    heavier machinery — particle-in-cell codes that take days
                    of supercomputer time to run.
                </P>

                <H2>Why this matters (a little)</H2>
                <P>
                    Net-positive fusion is not coming out of a hobbyist's
                    basement. The energy-donut crowd will get there first, if
                    anyone does, and even they have to keep moving the date.
                </P>
                <P>
                    But understanding <Emph>why</Emph> a fusor works gives
                    you a free pass into thinking about every other fusion
                    device on Earth. Magnetic confinement, inertial
                    confinement, the tabletop neutron sources used in
                    oil-well logging, the giant lasers at NIF in California —
                    they all reduce to the same single question, which is the
                    question I started this thing with: <Emph>how do you get
                    charged particles to stick together long enough to fuse,
                    when Coulomb's law is doing everything it can to fling
                    them apart?</Emph>
                </P>
                <P>
                    A fusor is the simplest possible answer to that question:
                    just pull them together with electricity. The whole rest
                    of fusion engineering is asking "okay, but cheaper, and
                    without the cage absorbing all of them."
                </P>

                <H2>Play with it</H2>
                <P>
                    The simulator above is open source. Pick a cage shape.
                    Crank the voltage. Watch the modes change. Fork it, try a
                    shape I didn't think of, post your screenshots.
                </P>
                <P>
                    If you build something interesting, tag me. I want to see
                    what star mode looks like inside a Klein bottle.
                </P>
                <P className="" >
                    <span className="text-black/40 dark:text-white/40">— Ali</span>
                </P>

                {/* CTAs */}
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
                        href="/writing"
                        className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 dark:border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-black/60 dark:text-white/60 transition-colors hover:border-black/30 dark:hover:border-white/30 hover:text-black dark:hover:text-white"
                    >
                        More writing →
                    </Link>
                </div>
            </article>

            <footer className="border-t border-black/10 dark:border-white/10 py-10 text-center text-xs text-black/40 dark:text-white/40">
                <span>© 2026 Trixode Studios · Victoria, BC</span>
            </footer>
        </div>
    )
}
