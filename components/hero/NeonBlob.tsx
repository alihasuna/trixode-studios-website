"use client"

import { memo } from "react"

/**
 * NeonBlob - Liquid Metal morphing blob animation
 * Creates a chrome/mercury-like fluid effect with metallic gradients
 * Uses CSS @keyframes with transform for GPU-accelerated performance.
 */
const NeonBlob = memo(function NeonBlob() {
    return (
        <div className="liquid-metal-container">
            {/* Base metallic blob */}
            <div className="liquid-metal liquid-metal-base" />
            {/* Highlight reflection */}
            <div className="liquid-metal liquid-metal-highlight" />
            {/* Secondary flow */}
            <div className="liquid-metal liquid-metal-flow" />
            {/* Inner glow */}
            <div className="liquid-metal liquid-metal-core" />

            <style jsx>{`
                .liquid-metal-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    filter: drop-shadow(0 0 50px rgba(59, 130, 246, 0.22))
                           drop-shadow(0 0 100px rgba(139, 92, 246, 0.1));
                }

                .liquid-metal {
                    position: absolute;
                    border-radius: 50%;
                    will-change: transform, border-radius;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }

                /* Base metallic chrome blob — sharper definition */
                .liquid-metal-base {
                    width: 420px;
                    height: 420px;
                    background:
                        radial-gradient(ellipse at 25% 18%, rgba(255, 255, 255, 0.45) 0%, transparent 38%),
                        radial-gradient(ellipse at 75% 85%, rgba(100, 120, 160, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
                        linear-gradient(
                            135deg,
                            #0d0d1a 0%,
                            #2a3a5c 18%,
                            #7b8fad 35%,
                            #c8d4e5 48%,
                            #eef2f8 52%,
                            #c8d4e5 56%,
                            #7b8fad 70%,
                            #2a3a5c 85%,
                            #0d0d1a 100%
                        );
                    filter: blur(6px) saturate(1.1) contrast(1.05);
                    box-shadow:
                        0 0 60px rgba(168, 181, 201, 0.35),
                        0 0 100px rgba(59, 130, 246, 0.2),
                        inset 0 -20px 60px rgba(0, 0, 0, 0.4),
                        inset 0 20px 40px rgba(255, 255, 255, 0.06);
                    animation: morph-metal 10s ease-in-out infinite;
                }

                /* Bright highlight reflection — sharper specular */
                .liquid-metal-highlight {
                    width: 200px;
                    height: 120px;
                    background: radial-gradient(
                        ellipse at 50% 35%,
                        rgba(255, 255, 255, 0.9) 0%,
                        rgba(255, 255, 255, 0.4) 25%,
                        rgba(255, 255, 255, 0.1) 50%,
                        transparent 70%
                    );
                    filter: blur(6px);
                    animation: morph-highlight 10s ease-in-out infinite;
                    animation-delay: -0.5s;
                    mix-blend-mode: overlay;
                }

                /* Secondary flowing element — tighter blur */
                .liquid-metal-flow {
                    width: 320px;
                    height: 320px;
                    background:
                        radial-gradient(ellipse at 65% 25%, rgba(200, 215, 240, 0.45) 0%, transparent 50%),
                        linear-gradient(
                            225deg,
                            rgba(45, 65, 100, 0.7) 0%,
                            rgba(140, 160, 200, 0.45) 50%,
                            rgba(45, 65, 100, 0.7) 100%
                        );
                    filter: blur(10px);
                    animation: morph-flow 14s ease-in-out infinite;
                    animation-delay: -3s;
                }

                /* Inner glowing core — more vivid, less blur */
                .liquid-metal-core {
                    width: 180px;
                    height: 180px;
                    background: radial-gradient(
                        circle,
                        rgba(59, 130, 246, 0.55) 0%,
                        rgba(99, 102, 241, 0.35) 30%,
                        rgba(139, 92, 246, 0.2) 55%,
                        transparent 75%
                    );
                    filter: blur(18px);
                    animation: pulse-core 5s ease-in-out infinite;
                }

                @keyframes morph-metal {
                    0%, 100% {
                        border-radius: 58% 42% 40% 60% / 55% 45% 55% 45%;
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    20% {
                        border-radius: 45% 55% 60% 40% / 48% 52% 42% 58%;
                        transform: translate(20px, -12px) rotate(12deg) scale(1.02);
                    }
                    40% {
                        border-radius: 52% 48% 38% 62% / 58% 42% 55% 45%;
                        transform: translate(-8px, 18px) rotate(28deg) scale(0.98);
                    }
                    60% {
                        border-radius: 42% 58% 55% 45% / 45% 55% 48% 52%;
                        transform: translate(-15px, -6px) rotate(42deg) scale(1.01);
                    }
                    80% {
                        border-radius: 50% 50% 48% 52% / 52% 48% 50% 50%;
                        transform: translate(10px, -10px) rotate(56deg) scale(0.99);
                    }
                }

                @keyframes morph-highlight {
                    0%, 100% {
                        border-radius: 62% 38% 42% 58% / 55% 45% 55% 45%;
                        transform: translate(-55px, -75px) rotate(0deg) scale(1);
                        opacity: 0.85;
                    }
                    25% {
                        border-radius: 50% 50% 58% 42% / 48% 52% 48% 52%;
                        transform: translate(-38px, -60px) rotate(8deg) scale(1.08);
                        opacity: 1;
                    }
                    50% {
                        border-radius: 55% 45% 45% 55% / 45% 55% 45% 55%;
                        transform: translate(-65px, -82px) rotate(-6deg) scale(0.96);
                        opacity: 0.75;
                    }
                    75% {
                        border-radius: 48% 52% 55% 45% / 52% 48% 52% 48%;
                        transform: translate(-42px, -68px) rotate(4deg) scale(1.02);
                        opacity: 0.9;
                    }
                }

                @keyframes morph-flow {
                    0%, 100% {
                        border-radius: 48% 52% 52% 48% / 50% 50% 50% 50%;
                        transform: translate(22px, 14px) rotate(0deg) scale(1);
                    }
                    25% {
                        border-radius: 56% 44% 40% 60% / 45% 55% 45% 55%;
                        transform: translate(-14px, -8px) rotate(-14deg) scale(1.03);
                    }
                    50% {
                        border-radius: 44% 56% 50% 50% / 55% 45% 55% 45%;
                        transform: translate(10px, -16px) rotate(10deg) scale(0.97);
                    }
                    75% {
                        border-radius: 52% 48% 46% 54% / 48% 52% 50% 50%;
                        transform: translate(-6px, 10px) rotate(-6deg) scale(1.01);
                    }
                }

                @keyframes pulse-core {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.55;
                    }
                    50% {
                        transform: scale(1.15);
                        opacity: 0.85;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .liquid-metal {
                        animation: none;
                    }
                }
            `}</style>
        </div>
    )
})

export default NeonBlob
