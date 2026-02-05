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
                    filter: drop-shadow(0 0 40px rgba(59, 130, 246, 0.18));
                }

                .liquid-metal {
                    position: absolute;
                    border-radius: 50%;
                    will-change: transform, border-radius;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }

                /* Base metallic chrome blob */
                .liquid-metal-base {
                    width: 420px;
                    height: 420px;
                    background: 
                        radial-gradient(ellipse at 28% 20%, rgba(255, 255, 255, 0.32) 0%, transparent 42%),
                        radial-gradient(ellipse at 72% 82%, rgba(120, 135, 160, 0.22) 0%, transparent 55%),
                        linear-gradient(
                            135deg,
                            #1a1a2e 0%,
                            #3d4f6f 20%,
                            #a8b5c9 40%,
                            #e8eef5 50%,
                            #a8b5c9 60%,
                            #3d4f6f 80%,
                            #1a1a2e 100%
                        );
                    filter: blur(12px) saturate(1.05);
                    box-shadow: 
                        0 0 50px rgba(168, 181, 201, 0.28),
                        0 0 90px rgba(59, 130, 246, 0.18),
                        inset 0 0 80px rgba(0, 0, 0, 0.3);
                    animation: morph-metal 8s ease-in-out infinite;
                }

                /* Bright highlight reflection */
                .liquid-metal-highlight {
                    width: 220px;
                    height: 140px;
                    background: radial-gradient(
                        ellipse at 50% 30%,
                        rgba(255, 255, 255, 0.8) 0%,
                        rgba(255, 255, 255, 0.3) 30%,
                        transparent 70%
                    );
                    filter: blur(10px);
                    animation: morph-highlight 8s ease-in-out infinite;
                    animation-delay: -0.5s;
                    mix-blend-mode: overlay;
                }

                /* Secondary flowing element */
                .liquid-metal-flow {
                    width: 300px;
                    height: 300px;
                    background: 
                        radial-gradient(ellipse at 60% 30%, rgba(200, 215, 235, 0.4) 0%, transparent 55%),
                        linear-gradient(
                            225deg,
                            rgba(61, 79, 111, 0.6) 0%,
                            rgba(168, 181, 201, 0.4) 50%,
                            rgba(61, 79, 111, 0.6) 100%
                        );
                    filter: blur(16px);
                    animation: morph-flow 12s ease-in-out infinite;
                    animation-delay: -3s;
                }

                /* Inner glowing core */
                .liquid-metal-core {
                    width: 160px;
                    height: 160px;
                    background: radial-gradient(
                        circle,
                        rgba(59, 130, 246, 0.5) 0%,
                        rgba(139, 92, 246, 0.3) 40%,
                        transparent 70%
                    );
                    filter: blur(26px);
                    animation: pulse-core 4s ease-in-out infinite;
                }

                @keyframes morph-metal {
                    0%, 100% {
                        border-radius: 55% 45% 42% 58% / 55% 45% 55% 45%;
                        transform: translate(0, 0) rotate(0deg) scale(1);
                    }
                    25% {
                        border-radius: 48% 52% 58% 42% / 50% 50% 45% 55%;
                        transform: translate(18px, -10px) rotate(18deg) scale(1.01);
                    }
                    50% {
                        border-radius: 52% 48% 40% 60% / 45% 55% 50% 50%;
                        transform: translate(-10px, 14px) rotate(36deg) scale(0.99);
                    }
                    75% {
                        border-radius: 46% 54% 55% 45% / 55% 45% 50% 50%;
                        transform: translate(8px, -8px) rotate(54deg) scale(1);
                    }
                }

                @keyframes morph-highlight {
                    0%, 100% {
                        border-radius: 62% 38% 42% 58% / 55% 45% 55% 45%;
                        transform: translate(-50px, -70px) rotate(0deg) scale(1);
                        opacity: 0.9;
                    }
                    33% {
                        border-radius: 50% 50% 60% 40% / 50% 50% 50% 50%;
                        transform: translate(-35px, -60px) rotate(12deg) scale(1.06);
                        opacity: 1;
                    }
                    66% {
                        border-radius: 55% 45% 45% 55% / 45% 55% 45% 55%;
                        transform: translate(-60px, -80px) rotate(-8deg) scale(0.97);
                        opacity: 0.8;
                    }
                }

                @keyframes morph-flow {
                    0%, 100% {
                        border-radius: 48% 52% 52% 48% / 50% 50% 50% 50%;
                        transform: translate(22px, 14px) rotate(0deg) scale(1);
                    }
                    33% {
                        border-radius: 56% 44% 40% 60% / 45% 55% 45% 55%;
                        transform: translate(-14px, -8px) rotate(-18deg) scale(1.04);
                    }
                    66% {
                        border-radius: 44% 56% 50% 50% / 55% 45% 55% 45%;
                        transform: translate(10px, -16px) rotate(14deg) scale(0.98);
                    }
                }

                @keyframes pulse-core {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.12);
                        opacity: 0.9;
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
