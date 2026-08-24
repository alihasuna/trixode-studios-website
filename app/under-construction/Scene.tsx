// Brand hexagon geometry — same construction as components/ui/HexagonLogo.tsx
const SIZE = 560
const CENTER = SIZE / 2
const RADIUS = SIZE * 0.35
const VERTICES = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3
    return {
        x: +(CENTER + RADIUS * Math.cos(angle)).toFixed(3),
        y: +(CENTER + RADIUS * Math.sin(angle)).toFixed(3),
    }
})
const HEX_POINTS = VERTICES.map((p) => `${p.x},${p.y}`).join(" ")

export default function Scene() {
    return (
        <main className="uc-root relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6">
            {/* Faint construction grid */}
            <div aria-hidden className="uc-grid pointer-events-none absolute inset-0" />

            {/* Brand hexagon, being redrawn */}
            <div aria-hidden className="uc-hex pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full">
                    {VERTICES.map((p, i) => (
                        <line
                            key={`spoke-${i}`}
                            x1={CENTER}
                            y1={CENTER}
                            x2={p.x}
                            y2={p.y}
                            stroke="rgba(255,255,255,0.045)"
                            strokeWidth="1"
                        />
                    ))}
                    <polygon points={HEX_POINTS} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
                    {/* Blue tracer drawing the outline */}
                    <polygon
                        className="uc-tracer"
                        points={HEX_POINTS}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        pathLength={1}
                    />
                    {VERTICES.map((p, i) => (
                        <circle
                            key={`node-${i}`}
                            className="uc-node"
                            style={{ animationDelay: `${i * 0.55}s` }}
                            cx={p.x}
                            cy={p.y}
                            r="2.5"
                            fill="rgba(255,255,255,0.5)"
                        />
                    ))}
                    <circle cx={CENTER} cy={CENTER} r="2" fill="rgba(255,255,255,0.25)" />
                </svg>
            </div>

            {/* Copy */}
            <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
                <p className="uc-in mb-8 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40" style={{ animationDelay: "0.1s" }}>
                    Trixode Studios
                </p>

                <h1
                    className="uc-in font-grotesk text-balance text-[clamp(2.75rem,7.5vw,5.25rem)] font-light leading-[1.04] tracking-[-0.025em] text-white"
                    style={{ animationDelay: "0.2s" }}
                >
                    Under construction.
                </h1>

                <p className="uc-in mt-6 max-w-md text-balance text-base font-light leading-relaxed text-white/60 sm:text-lg" style={{ animationDelay: "0.3s" }}>
                    We&apos;re rebuilding this site into something better. Back soon.
                </p>

                <div className="uc-in uc-rule mt-12" style={{ animationDelay: "0.4s" }} aria-hidden>
                    <span className="uc-rule-sweep" />
                </div>

                <a
                    href="mailto:hussienb@trixode-studios.com"
                    className="uc-in mt-12 text-sm text-white/40 transition-colors duration-300 hover:text-white"
                    style={{ animationDelay: "0.5s" }}
                >
                    hussienb@trixode-studios.com
                </a>
            </div>

            <p className="absolute bottom-8 text-[0.7rem] tracking-[0.08em] text-white/25">
                © {new Date().getFullYear()} Trixode Studios
            </p>

            <style>{`
                .uc-grid {
                    background-image:
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 100px 100px;
                    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
                    -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%);
                }
                .uc-hex {
                    width: clamp(360px, 76vmin, 640px);
                    height: clamp(360px, 76vmin, 640px);
                }
                /* Static fallback: a settled arc of the outline */
                .uc-tracer {
                    stroke-dasharray: 0.18 0.82;
                    stroke-dashoffset: 0;
                    filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.45));
                }
                .uc-node {
                    opacity: 0.35;
                }
                .uc-rule {
                    position: relative;
                    width: 220px;
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    overflow: hidden;
                }
                .uc-rule-sweep {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 64px;
                    height: 1px;
                    margin-left: -32px;
                    background: #3b82f6;
                    box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
                }
                @media (prefers-reduced-motion: no-preference) {
                    .uc-in {
                        animation: uc-enter 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
                    }
                    .uc-tracer {
                        animation: uc-trace 10s linear infinite;
                    }
                    .uc-node {
                        animation: uc-node-pulse 3.3s linear infinite;
                    }
                    .uc-rule-sweep {
                        margin-left: 0;
                        animation: uc-sweep 3.8s ease-in-out infinite;
                    }
                }
                @keyframes uc-enter {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes uc-trace {
                    to {
                        stroke-dashoffset: -1;
                    }
                }
                @keyframes uc-node-pulse {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.75;
                    }
                }
                @keyframes uc-sweep {
                    0% {
                        left: -64px;
                    }
                    100% {
                        left: 220px;
                    }
                }
            `}</style>
        </main>
    )
}
