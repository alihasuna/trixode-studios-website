import Link from "next/link"
import { CARDS } from "./cards"

export default function SocialIndex() {
    return (
        <div className="min-h-screen bg-[#030303] text-white px-10 py-16">
            <div className="max-w-3xl mx-auto">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40 mb-3">
                    Trixode · social card index
                </p>
                <h1 className="font-grotesk text-4xl font-light mb-2">Social card outputs</h1>
                <p className="text-white/55 font-light mb-12 max-w-[560px] leading-relaxed">
                    Open any card at its native dimensions and screenshot the rendered area. The
                    URL prints the exact size — use a browser viewport set to match.
                </p>

                <ul className="divide-y divide-white/10 border-y border-white/10">
                    {Object.entries(CARDS).map(([slug, spec]) => (
                        <li key={slug}>
                            <Link
                                href={`/print/social/${slug}`}
                                className="flex items-center justify-between gap-6 py-5 group hover:bg-white/[0.02] -mx-3 px-3 rounded"
                            >
                                <div>
                                    <div className="font-grotesk text-lg group-hover:text-brand-blue transition-colors">
                                        /{slug}
                                    </div>
                                    <div className="text-sm text-white/45 font-light mt-1">
                                        {spec.headline || spec.eyebrow}
                                    </div>
                                </div>
                                <div className="font-mono text-xs tracking-wider text-white/40">
                                    {spec.width} × {spec.height}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="text-xs text-white/30 font-light mt-12 leading-relaxed max-w-[560px]">
                    Tip: in Chrome devtools (Cmd-Opt-I), open the device toolbar and enter the
                    exact card dimensions to get a 1:1 viewport before screenshotting. Or run
                    a headless screenshot via Puppeteer pointing at these URLs.
                </p>
            </div>
        </div>
    )
}
