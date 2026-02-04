import React from "react"

interface HexagonLogoProps {
    size?: number
    className?: string
}

export const HexagonLogo: React.FC<HexagonLogoProps> = ({
    size = 32,
    className = ""
}) => {
    const hexagonPoints = []
    const center = size / 2
    const radius = size * 0.35

    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const x = center + radius * Math.cos(angle)
        const y = center + radius * Math.sin(angle)
        hexagonPoints.push({ x, y })
    }

    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="absolute inset-0">
                <polygon
                    points={hexagonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-blue-400"
                />
                {hexagonPoints.map((point, i) => (
                    <g key={i}>
                        <line
                            x1={center}
                            y1={center}
                            x2={point.x}
                            y2={point.y}
                            stroke="currentColor"
                            strokeWidth="1"
                            className="text-blue-400/60"
                        />
                        <circle cx={point.x} cy={point.y} r="2" fill="currentColor" className="text-blue-400" />
                    </g>
                ))}
                <circle cx={center} cy={center} r="2" fill="currentColor" className="text-blue-400" />
            </svg>
        </div>
    )
}
