import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trixode-Studios — Launch Plan · May 2026",
    robots: { index: false, follow: false },
}

const SCHEDULE: {
    date: string
    day: string
    block: string
    ship: string
    output: string
    owner?: string
}[] = [
    { date: "May 13", day: "Wed", block: "Foundation", ship: "Website + /lab + /print/social shipped", output: "Live on production", owner: "Done" },
    { date: "May 14", day: "Thu", block: "SPS · draft", ship: "Outline rubric — four families, weights w₁..w₄, scoring scale", output: "Internal markdown draft", owner: "Hussien + Amir" },
    { date: "May 15", day: "Fri", block: "SPS · draft", ship: "Write methodology section: scope, threat model, sources (Lethal Trifecta, TFA, Shaik ADR)", output: "Methodology in draft", owner: "Hussien" },
    { date: "May 16–17", day: "Sat–Sun", block: "SPS · polish", ship: "Soft buffer. Verify benchmark numbers (Morphika 88 / Copilot 40 / Gemini 45 / SH-SW 30) traceable to scoring inputs", output: "Defensible benchmark table", owner: "Amir" },
    { date: "May 18", day: "Mon", block: "Ship SPS", ship: "Publish /lab/sps page + github.com/trixodestudios/sps repo (rubric.md, methodology.md, README.md, LICENSE)", output: "/lab/sps + repo live", owner: "Hussien" },
    { date: "May 19", day: "Tue", block: "Profile rollout", ship: "Render OG card + LinkedIn/X banners. Push public/og.png. Update LinkedIn Company About + Specialties. Update founder headlines. Update X / IG bios. Publish GitHub org README.", output: "All channels aligned", owner: "Hussien" },
    { date: "May 20", day: "Wed", block: "Launch · Post 1", ship: "The hook — LinkedIn + X + Instagram", output: "Post 1 live with hook-square image", owner: "Hussien" },
    { date: "May 21–25", day: "Thu–Mon", block: "Engage", ship: "Reply to comments, no new posts. Light /lab copy iteration if needed.", output: "Inbound conversations logged", owner: "All" },
    { date: "May 26", day: "Tue", block: "Launch · Post 2", ship: "The instrument — LinkedIn + X + GitHub `v0.1.0` release", output: "Post 2 live with sps-instrument image; SPS tagged v0.1.0", owner: "Hussien + Amir" },
    { date: "May 27", day: "Wed", block: "Engage", ship: "No post. Watch GitHub stars + issues + impressions.", output: "Day-1 telemetry on SPS", owner: "All" },
    { date: "May 28", day: "Thu", block: "Launch · Post 3", ship: "The benchmark table — LinkedIn + X. Image: sps-benchmark.", output: "Post 3 live; engagement deltas vs Post 1 logged", owner: "Hussien" },
    { date: "May 29–31", day: "Fri–Sun", block: "Review", ship: "Read engagement, draft Post 4 (the invitation), plan June.", output: "Review note + June draft", owner: "All" },
]

const POST_COPY = [
    {
        n: 1,
        name: "The hook",
        image: "hook-square (1080×1080) + hook-landscape (1200×675) variant",
        linkedin:
            "trixode-studios.com\n\nA small research lab in Victoria, BC, working on the mathematics of agentic systems — the complexity and security of specific agentic workflows. Two testbeds in production: Intellcycle and Morphika.",
        x: "trixode-studios.com\n\nResearch lab. The mathematics of agentic systems. Testbeds: Intellcycle, Morphika.",
    },
    {
        n: 2,
        name: "The instrument",
        image: "sps-instrument (1080×1080)",
        linkedin:
            "Introducing SPS-v0.1 — a four-family scoring rubric for agentic email security. Methodology, family weights, and limitations are public. Where the rubric agrees with intuition is reassuring; where it disagrees is where the work is.\n\n→ trixode-studios.com/lab/sps",
        x: "SPS-v0.1: a four-family rubric for agentic email security. Methodology, weights, limits — all public. → trixode-studios.com/lab/sps",
    },
    {
        n: 3,
        name: "The benchmark",
        image: "sps-benchmark (1080×1080)",
        linkedin:
            "SPS-v0.1 on agentic email, first pass:\n\nMorphika — 88\nMicrosoft Copilot — 40\nGoogle Gemini — 45\nSuperhuman / Shortwave — 30\n\nDisagree with the scoring? Open an issue: github.com/trixodestudios/sps",
        x: "SPS-v0.1 first pass on agentic email:\n\nMorphika 88\nCopilot 40\nGemini 45\nSuperhuman / Shortwave 30\n\nMethodology + open issues: github.com/trixodestudios/sps",
    },
    {
        n: 4,
        name: "The invitation (early June)",
        image: "listening (1080×1080)",
        linkedin:
            "We're talking to teams building production agents where complexity or security pressure is already showing up. If that's you, we'd like to hear what you're measuring (and what you're not).\n\nhussienb@trixode-studios.com",
        x: "Building production agents where complexity or security is starting to bite? We'd like to hear what you're measuring (and what you're not). hussienb@trixode-studios.com",
    },
]

const ASSETS = [
    { file: "public/og.png", source: "/print/social/og", size: "1200×630", status: "needs render" },
    { file: "public/social/banner-linkedin.png", source: "/print/social/banner-linkedin", size: "1584×396", status: "needs render" },
    { file: "public/social/banner-x.png", source: "/print/social/banner-x", size: "1500×500", status: "needs render" },
    { file: "public/social/post-hook-1080.png", source: "/print/social/hook-square", size: "1080×1080", status: "needs render" },
    { file: "public/social/post-hook-1200.png", source: "/print/social/hook-landscape", size: "1200×675", status: "needs render" },
    { file: "public/social/post-sps-instrument.png", source: "/print/social/sps-instrument", size: "1080×1080", status: "needs render (gates on /lab/sps)" },
    { file: "public/social/post-sps-benchmark.png", source: "/print/social/sps-benchmark", size: "1080×1080", status: "needs render (gates on /lab/sps)" },
    { file: "public/social/post-listening.png", source: "/print/social/listening", size: "1080×1080", status: "needs render (for June)" },
    { file: "public/social/avatar-460.png", source: "public/favicon.svg flattened on #030303", size: "460×460", status: "needs export" },
]

const PROFILE_COPY = {
    liTagline:
        "The mathematics of agentic systems. A research lab applying academic frameworks to the complexity and security of specific agentic workflows.",
    liAbout:
        "Trixode Studios is a research lab in Victoria, BC, working on the mathematics of agentic systems — the formal structure, complexity, and security of AI agents operating in the real world. We translate academic frameworks from physics, materials science, and mathematics into agent architectures that are auditable and economically grounded.\n\nTestbeds:\n• Intellcycle — agentic marketplace for recycled metals.\n• Morphika — agentic email infrastructure.\n\nFounded by researchers. Built for the agentic decade.",
    liSpecialties: "Agentic Systems · Applied Mathematics · Multi-Agent Architectures · Agent Security · Complexity Measurement",
    xBio:
        "Research lab. The mathematics of agentic systems — complexity, structure, security. Testbeds: Intellcycle, Morphika. Victoria, BC.",
    igBio:
        "Research lab for agentic systems.\nThe math behind agent complexity and security.\nTestbeds: Intellcycle / Morphika.\nVictoria, BC → trixode-studios.com",
    headlines: {
        hussien:
            "Co-founder, Trixode Studios | Ph.D. candidate, Physics @ UVic | Working on the mathematics of agentic systems",
        amir: "Co-founder, Trixode Studios | Ph.D., Materials Science | Working on the structure and security of agentic systems",
        matthew:
            "Mathematician, Trixode Studios | M.Sc. Mathematics @ UVic | Math formalism for agentic systems",
    },
    ghReadme: `# Trixode Studios

A research lab studying the mathematics of agentic systems.

We work on the formal structure, complexity, and security of AI agents — and ship testbeds that put the theory under load. Current testbeds: **Intellcycle** (agentic marketplace for recycled metals) and **Morphika** (agentic email).

Victoria, BC. Founded by researchers in physics, materials science, and mathematics.`,
}

export default function LaunchPlanPage() {
    return (
        <div className="launch-doc">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
:root {
    --bg: #fafaf7;
    --fg: #0a0a0a;
    --muted: rgba(10,10,10,0.62);
    --dim: rgba(10,10,10,0.42);
    --border: rgba(10,10,10,0.10);
    --border-hi: rgba(10,10,10,0.18);
    --soft: rgba(10,10,10,0.025);
    --accent: #2563eb;
    --card-bg: #ffffff;
    --sg: 'Space Grotesk', system-ui, sans-serif;
    --inter: 'Inter', system-ui, sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
@page { size: A4; margin: 16mm 18mm; }
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html, body { background: var(--bg); color: var(--fg); font-family: var(--inter); font-size: 11pt; line-height: 1.55; -webkit-font-smoothing: antialiased; }
.launch-doc { max-width: 820px; margin: 0 auto; padding: 40px 56px 80px; }

.eyebrow { font-family: var(--mono); font-size: 9.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.eyebrow .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); margin-right: 10px; vertical-align: middle; }

.cover { padding: 32px 0 44px; border-bottom: 1px solid var(--border); margin-bottom: 36px; }
.cover h1 { font-family: var(--sg); font-weight: 300; font-size: 36pt; line-height: 1.06; letter-spacing: -0.022em; margin-top: 14px; max-width: 640px; }
.cover .lede { font-family: var(--inter); font-weight: 400; font-size: 13pt; line-height: 1.55; color: var(--muted); margin-top: 18px; max-width: 620px; }
.cover .meta { display: flex; gap: 24px; margin-top: 28px; font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); }
.cover .meta span strong { color: var(--fg); font-weight: 600; }

section.block { padding: 36px 0; border-bottom: 1px solid var(--border); }
section.block:last-of-type { border-bottom: none; }
section.block h2 { font-family: var(--sg); font-weight: 400; font-size: 22pt; letter-spacing: -0.015em; margin-top: 14px; color: var(--fg); }
section.block h3 { font-family: var(--sg); font-weight: 500; font-size: 13pt; margin: 22px 0 10px; color: var(--fg); }
section.block p, section.block li { font-size: 11pt; line-height: 1.6; color: var(--muted); }
section.block p { margin: 10px 0; }
section.block strong { color: var(--fg); font-weight: 600; }

.gate { background: var(--card-bg); border: 1px solid var(--border-hi); border-radius: 8px; padding: 22px 26px; margin-top: 16px; }
.gate .gate-eyebrow { font-family: var(--mono); font-size: 9pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }

table.cal { width: 100%; border-collapse: collapse; margin-top: 14px; }
table.cal th, table.cal td { text-align: left; vertical-align: top; padding: 10px 12px; border-bottom: 1px solid var(--border); font-size: 10.5pt; line-height: 1.45; }
table.cal th { font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); font-weight: 500; border-bottom: 1px solid var(--border-hi); }
table.cal td.date { font-family: var(--mono); font-size: 9.5pt; color: var(--fg); white-space: nowrap; width: 78px; }
table.cal td.day { font-family: var(--mono); font-size: 9.5pt; color: var(--dim); white-space: nowrap; width: 60px; }
table.cal td.block { font-family: var(--sg); font-weight: 500; color: var(--fg); white-space: nowrap; width: 130px; }
table.cal td.ship { color: var(--muted); }
table.cal td.output { color: var(--dim); font-size: 9.5pt; font-family: var(--mono); white-space: nowrap; width: 180px; }
table.cal tr.divider td { padding-top: 16px; border-top: 1px solid var(--border-hi); }

.assets { width: 100%; border-collapse: collapse; margin-top: 14px; }
.assets th, .assets td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); font-size: 9.5pt; font-family: var(--mono); color: var(--muted); }
.assets th { font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); border-bottom: 1px solid var(--border-hi); }
.assets td.size { color: var(--fg); white-space: nowrap; width: 100px; }
.assets td.status { color: var(--accent); white-space: nowrap; }

.post { background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 22px 26px; margin: 18px 0; page-break-inside: avoid; }
.post .label { font-family: var(--mono); font-size: 9pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); }
.post h3 { font-family: var(--sg); font-weight: 500; font-size: 16pt; margin: 4px 0 0; letter-spacing: -0.01em; }
.post .img-spec { font-family: var(--mono); font-size: 9pt; color: var(--dim); margin-top: 4px; }
.post .channel { margin-top: 14px; }
.post .channel .channel-label { font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); margin-bottom: 4px; }
.post .channel pre { font-family: var(--inter); font-size: 10.5pt; line-height: 1.55; white-space: pre-wrap; color: var(--fg); background: var(--soft); padding: 12px 14px; border-radius: 4px; border-left: 2px solid var(--accent); }

.bio { background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 22px 26px; margin: 16px 0; }
.bio .field-label { font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--dim); margin-top: 14px; }
.bio .field-label:first-child { margin-top: 0; }
.bio pre { font-family: var(--inter); font-size: 10.5pt; line-height: 1.55; white-space: pre-wrap; color: var(--fg); background: var(--soft); padding: 10px 12px; margin-top: 4px; border-radius: 4px; border-left: 2px solid var(--accent); }

.checklist { list-style: none; padding-left: 0; margin-top: 12px; }
.checklist li { padding: 7px 0 7px 24px; position: relative; color: var(--fg); font-size: 10.5pt; border-bottom: 1px dotted var(--border); }
.checklist li:last-child { border-bottom: none; }
.checklist li::before { content: ""; position: absolute; left: 0; top: 12px; width: 14px; height: 14px; border: 1px solid var(--border-hi); border-radius: 3px; background: #fff; }

.foot { margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.14em; text-transform: uppercase; color: var(--dim); display: flex; justify-content: space-between; }

@media print {
    html, body { background: #fff; }
    .launch-doc { padding: 0; }
    section.block { page-break-inside: avoid; }
    .post, .bio, .gate { page-break-inside: avoid; }
    table.cal { page-break-inside: avoid; }
    .no-print { display: none !important; }
}

.print-hint { background: var(--card-bg); border: 1px dashed var(--border-hi); border-radius: 6px; padding: 12px 16px; margin: 0 0 24px; font-size: 9.5pt; color: var(--muted); font-family: var(--mono); letter-spacing: 0.04em; }
.print-hint kbd { background: var(--fg); color: var(--bg); padding: 1px 7px; border-radius: 3px; font-family: var(--mono); font-size: 8.5pt; letter-spacing: 0.06em; }
                `,
                }}
            />

            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
            />

            <div className="print-hint no-print">
                Print to PDF: <kbd>⌘P</kbd> → set Destination to <strong>Save as PDF</strong> → Layout: Portrait → Margins: Default.
            </div>

            <header className="cover">
                <p className="eyebrow"><span className="dot" />Trixode-Studios · Launch Plan · May 2026</p>
                <h1>The mathematics of agentic systems.<br />Launch plan, May 13–31.</h1>
                <p className="lede">
                    Hold the launch sequence until <strong>SPS-v0.1</strong> is public. Then ship the brand, ship the rubric,
                    ship the benchmark. One artifact and three posts is the minimum that lets a Series-A scout reach &quot;yes,
                    worth a meeting&quot; on first scan. This document is the schedule, the copy, and the image checklist for
                    getting from today to May 31 without overclaim.
                </p>
                <div className="meta">
                    <span><strong>Date</strong> · 2026-05-13</span>
                    <span><strong>Owner</strong> · Hussien</span>
                    <span><strong>Channels</strong> · LinkedIn, X, IG, GitHub</span>
                </div>
            </header>

            {/* Strategic premise */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />01 · Premise</p>
                <h2>Why the artifact ships before the posts</h2>
                <p>
                    A &quot;research lab&quot; claim without a single public artifact reads as positioning theater to the people
                    we&apos;re trying to reach. The CEO advisor&apos;s call is unambiguous: hold the launch sequence by ~5 working
                    days, ship <strong>SPS-v0.1</strong> as a public page + repo, then run posts 1–3. The rubric and benchmark
                    numbers already exist internally; this is a publication exercise, not a research project.
                </p>
                <div className="gate">
                    <p className="gate-eyebrow">The gate</p>
                    <p>
                        <strong>SPS-v0.1.</strong> Four-family scoring rubric for agentic email security. Public page at
                        <strong> trixode-studios.com/lab/sps</strong> + repo at <strong>github.com/trixodestudios/sps</strong>.
                        Methodology, weights (w₁..w₄), limitations, and the four-row benchmark
                        (Morphika 88 / Copilot 40 / Gemini 45 / SH-SW 30) are all visible. Estimated effort: <strong>1 working day of focused write-up</strong>.
                    </p>
                </div>
            </section>

            {/* Schedule */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />02 · Schedule · 18 days</p>
                <h2>From foundation to first three posts</h2>
                <table className="cal">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Block</th>
                            <th>What ships</th>
                            <th>Output</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SCHEDULE.map((row, i) => (
                            <tr key={row.date} className={i > 0 && SCHEDULE[i - 1].block !== row.block ? "divider" : ""}>
                                <td className="date">{row.date}</td>
                                <td className="day">{row.day}</td>
                                <td className="block">{row.block}</td>
                                <td className="ship">{row.ship}</td>
                                <td className="output">{row.output}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p style={{ marginTop: 16, fontSize: "10.5pt", color: "var(--dim)" }}>
                    Cadence rule: at most one post per ~3 days. Engagement &gt; reach — we want comments to read, not
                    impressions to count.
                </p>
            </section>

            {/* Asset checklist */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />03 · Asset checklist</p>
                <h2>Nine files. One avatar, two banners, six post images.</h2>
                <p>
                    Open each source URL in the browser at native dimensions and capture the rendered area. Each card lives
                    at <strong>trixode-studios.com/print/social/&lt;slug&gt;</strong> — they&apos;re statically generated, dark-mode,
                    and locked to the live brand tokens.
                </p>
                <table className="assets">
                    <thead>
                        <tr>
                            <th>Target file</th>
                            <th>Source</th>
                            <th>Size</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ASSETS.map((a) => (
                            <tr key={a.file}>
                                <td>{a.file}</td>
                                <td>{a.source}</td>
                                <td className="size">{a.size}</td>
                                <td className="status">{a.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Profile copy */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />04 · Profile copy · ready to paste</p>
                <h2>Channel bios, headlines, and READMEs</h2>

                <div className="bio">
                    <p className="field-label">LinkedIn Company Page · Tagline</p>
                    <pre>{PROFILE_COPY.liTagline}</pre>

                    <p className="field-label">LinkedIn Company Page · About</p>
                    <pre>{PROFILE_COPY.liAbout}</pre>

                    <p className="field-label">LinkedIn · Specialties (5)</p>
                    <pre>{PROFILE_COPY.liSpecialties}</pre>
                </div>

                <div className="bio">
                    <p className="field-label">Founder LinkedIn headlines</p>
                    <pre>{`Hussien: ${PROFILE_COPY.headlines.hussien}\n\nAmir: ${PROFILE_COPY.headlines.amir}\n\nMatthew: ${PROFILE_COPY.headlines.matthew}`}</pre>
                </div>

                <div className="bio">
                    <p className="field-label">X bio · ≤160 chars</p>
                    <pre>{PROFILE_COPY.xBio}</pre>

                    <p className="field-label">Instagram bio · ≤150 chars</p>
                    <pre>{PROFILE_COPY.igBio}</pre>
                </div>

                <div className="bio">
                    <p className="field-label">GitHub org README · opening</p>
                    <pre>{PROFILE_COPY.ghReadme}</pre>
                </div>
            </section>

            {/* Post copy */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />05 · Launch posts · the actual copy</p>
                <h2>Four posts. The first three this month.</h2>

                {POST_COPY.map((p) => (
                    <div className="post" key={p.n}>
                        <p className="label">Post {p.n}</p>
                        <h3>{p.name}</h3>
                        <p className="img-spec">Image: <strong>{p.image}</strong></p>
                        <div className="channel">
                            <p className="channel-label">LinkedIn / Instagram</p>
                            <pre>{p.linkedin}</pre>
                        </div>
                        <div className="channel">
                            <p className="channel-label">X</p>
                            <pre>{p.x}</pre>
                        </div>
                    </div>
                ))}
            </section>

            {/* Risks */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />06 · What not to do</p>
                <h2>Specific overclaim risks for this month</h2>
                <ul style={{ marginLeft: 18, marginTop: 12 }}>
                    <li>
                        <strong>Don&apos;t use &quot;verifiable&quot;, &quot;provable&quot;, or &quot;safer AI&quot;</strong> in any
                        bio or post until SPS-v0.1 is published. A Series-A scout will Google for these claims against an
                        arXiv preprint or eval repo — finding nothing reads as positioning theater. Stick to &quot;applying&quot; / &quot;studying&quot; / &quot;measuring&quot;.
                    </li>
                    <li>
                        <strong>Don&apos;t reference org partnerships that haven&apos;t been confirmed in writing.</strong> No
                        &quot;working with [Anthropic | OpenAI | Y Combinator | …]&quot; on any channel. Reference Intellcycle and
                        Morphika by name — they&apos;re yours, they&apos;re live, they&apos;re defensible.
                    </li>
                    <li>
                        <strong>Don&apos;t announce hiring before pipeline.</strong> &quot;We&apos;re hiring&quot; without a roles
                        page is a smell. Add hiring after Post 3 lands, or wait for June.
                    </li>
                    <li>
                        <strong>Don&apos;t post on weekends.</strong> Saturday/Sunday is for review and engagement, not for
                        launching. Posts 1–3 run on Wed / Tue / Thu.
                    </li>
                    <li>
                        <strong>Don&apos;t add hashtags to images.</strong> Captions can carry one or two if useful; the image
                        itself stays clean. No emoji in image or copy.
                    </li>
                </ul>
            </section>

            {/* Pre-flight */}
            <section className="block">
                <p className="eyebrow"><span className="dot" />07 · Pre-flight · before Post 1</p>
                <h2>The checklist that gates the launch</h2>
                <ul className="checklist">
                    <li><strong>/lab/sps</strong> page is live with methodology, weights, limitations, and a citation list.</li>
                    <li><strong>github.com/trixodestudios/sps</strong> repo exists with rubric.md + README.md + LICENSE.</li>
                    <li><strong>public/og.png</strong> exists (rendered from /print/social/og). LinkedIn Post Inspector + X Card Validator both preview clean.</li>
                    <li>LinkedIn Company Page About + Specialties + tagline updated to the new copy.</li>
                    <li>LinkedIn banner uploaded (1584×396), X banner uploaded (1500×500), GitHub org avatar uploaded (460×460).</li>
                    <li>Hussien / Amir / Matthew LinkedIn headlines updated to the agreed pattern.</li>
                    <li>X bio + Instagram bio updated.</li>
                    <li>GitHub org README replaced with the agreed markdown; pins set to <code>sps</code>, <code>intellcycle-public</code>, <code>morphika-public</code>.</li>
                    <li>Post 1 image (hook-square) captured and dropped into a draft on LinkedIn + X + IG.</li>
                </ul>
            </section>

            <div className="foot">
                <span>Trixode-Studios · 2026-05-13</span>
                <span>page · 1</span>
            </div>
        </div>
    )
}
