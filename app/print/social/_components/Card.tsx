import type { CSSProperties } from "react"
import { HexagonLogo } from "@/components/ui/HexagonLogo"
import type { CardSpec } from "../cards"

/**
 * Renders a Trixode social card at its exact target dimensions.
 * Three templates: A (statement), B (artifact), C (blob portrait — not yet wired).
 *
 * All sizing scales off a 1080-px reference grid so layout stays balanced
 * across 1080² / 1200×675 / 1584×396 / 1500×500 / 1200×630 surfaces.
 */
export default function Card({ spec }: { spec: CardSpec }) {
    const scale = Math.min(spec.width, spec.height) / 1080
    const inset = Math.max(48, Math.round(80 * scale))

    const frame: CSSProperties = {
        width: spec.width,
        height: spec.height,
        padding: inset,
        background: "#030303",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-inter), Inter, sans-serif",
    }

    return (
        <div style={frame}>
            {/* Subtle grid overlay — mirrors the live site */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                    backgroundSize: `${Math.round(120 * scale)}px ${Math.round(120 * scale)}px`,
                    pointerEvents: "none",
                }}
            />

            {/* Eyebrow */}
            <div
                style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: Math.round(18 * scale),
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {spec.eyebrow}
            </div>

            {/* Body, varies by template */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
                {spec.template === "A" && <StatementBody spec={spec} scale={scale} />}
                {spec.template === "B" && <ArtifactBody spec={spec} scale={scale} />}
            </div>

            {/* Footer: mark + URL */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: Math.round(20 * scale),
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: Math.round(14 * scale) }}>
                    <HexagonLogo size={Math.round(32 * scale)} />
                    <span
                        style={{
                            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                            fontWeight: 500,
                            fontSize: Math.round(22 * scale),
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Trixode<span style={{ color: "#3B82F6", marginLeft: Math.round(4 * scale) }}>/lab</span>
                    </span>
                </div>
                {spec.url && (
                    <span
                        style={{
                            fontFamily: "var(--font-inter), Inter, sans-serif",
                            fontSize: Math.round(16 * scale),
                            color: "rgba(255,255,255,0.45)",
                            letterSpacing: "0.04em",
                        }}
                    >
                        {spec.url}
                    </span>
                )}
            </div>
        </div>
    )
}

function StatementBody({ spec, scale }: { spec: CardSpec; scale: number }) {
    const headlineSize = spec.headline && spec.headline.length > 30 ? 72 : 96
    return (
        <>
            {spec.headline && (
                <h1
                    style={{
                        fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                        fontWeight: 300,
                        fontSize: Math.round(headlineSize * scale),
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "#FFFFFF",
                        margin: 0,
                        marginBottom: Math.round(40 * scale),
                        maxWidth: "92%",
                    }}
                >
                    {spec.headline}
                </h1>
            )}
            {spec.body && (
                <>
                    <div
                        style={{
                            width: Math.round(64 * scale),
                            height: 2,
                            background: "#3B82F6",
                            marginBottom: Math.round(28 * scale),
                            borderRadius: 1,
                        }}
                    />
                    <p
                        style={{
                            fontFamily: "var(--font-inter), Inter, sans-serif",
                            fontWeight: 300,
                            fontSize: Math.round(28 * scale),
                            lineHeight: 1.45,
                            color: "rgba(255,255,255,0.65)",
                            margin: 0,
                            maxWidth: "72%",
                        }}
                    >
                        {spec.body}
                    </p>
                </>
            )}
        </>
    )
}

function ArtifactBody({ spec, scale }: { spec: CardSpec; scale: number }) {
    if (!spec.artifact) return null

    if (spec.artifact.kind === "equation") {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: Math.round(40 * scale) }}>
                <div
                    style={{
                        fontFamily: "'STIX Two Math', 'Times New Roman', serif",
                        fontSize: Math.round(96 * scale),
                        lineHeight: 1.1,
                        color: "#FFFFFF",
                        letterSpacing: "0",
                        textAlign: "center",
                    }}
                >
                    {spec.artifact.latex}
                </div>
                {spec.artifact.gloss && (
                    <>
                        <div style={{ width: Math.round(64 * scale), height: 2, background: "#3B82F6", borderRadius: 1 }} />
                        <p
                            style={{
                                fontFamily: "var(--font-inter), Inter, sans-serif",
                                fontWeight: 300,
                                fontSize: Math.round(24 * scale),
                                lineHeight: 1.5,
                                color: "rgba(255,255,255,0.65)",
                                textAlign: "center",
                                maxWidth: "78%",
                                margin: 0,
                            }}
                        >
                            {spec.artifact.gloss}
                        </p>
                    </>
                )}
            </div>
        )
    }

    if (spec.artifact.kind === "table") {
        const rowHeight = Math.round(72 * scale)
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        maxWidth: "92%",
                        margin: "0 auto",
                        width: "100%",
                    }}
                >
                    {spec.artifact.rows.map((row) => (
                        <div
                            key={row.label}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: `0 ${Math.round(16 * scale)}px`,
                                height: rowHeight,
                                borderBottom: "1px solid rgba(255,255,255,0.08)",
                                background: row.accent ? "rgba(59,130,246,0.06)" : "transparent",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "var(--font-inter), Inter, sans-serif",
                                    fontWeight: 400,
                                    fontSize: Math.round(28 * scale),
                                    color: row.accent ? "#FFFFFF" : "rgba(255,255,255,0.75)",
                                }}
                            >
                                {row.label}
                            </span>
                            <span
                                style={{
                                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                                    fontWeight: 300,
                                    fontSize: Math.round(40 * scale),
                                    color: row.accent ? "#3B82F6" : "#FFFFFF",
                                    letterSpacing: "-0.01em",
                                }}
                            >
                                {row.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return null
}
