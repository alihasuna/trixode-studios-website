import { NextResponse } from 'next/server';

// Password for accessing the proposal
const PROPOSAL_PASSWORD = 'Maz2026Trixode';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="robots" content="noindex, nofollow">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trixode-Studios Inc. — GEO & Website Development Proposal for Maz Majidi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* ─── Reset & Base ───────────────────────── */
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            --bg-primary: #030712;
            --bg-secondary: #0a0f1c;
            --bg-card: rgba(255,255,255,0.03);
            --bg-card-hover: rgba(255,255,255,0.06);
            --border: rgba(255,255,255,0.08);
            --border-accent: rgba(59,130,246,0.3);
            --text-primary: #ffffff;
            --text-secondary: rgba(255,255,255,0.55);
            --text-muted: rgba(255,255,255,0.35);
            --brand-blue: #3B82F6;
            --brand-blue-dim: rgba(59,130,246,0.15);
            --brand-blue-glow: rgba(59,130,246,0.25);
            --success: #22c55e;
            --danger: #ef4444;
            --warning: #f59e0b;
            --font: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            --glow-opacity: 1;
            --grid-line: rgba(255,255,255,0.02);
            --table-row-hover: rgba(255,255,255,0.02);
            --table-row-border: rgba(255,255,255,0.04);
            --steps-border: rgba(255,255,255,0.04);
            --cta-bg: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
            --guarantee-bg: linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(34,197,94,0.01) 100%);
            --guarantee-border: rgba(34,197,94,0.2);
            --highlight-bg: linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(59,130,246,0.02) 100%);
            --italic-bg: var(--bg-card);
            --gradient-start: #fff;
        }

        /* ─── Light Mode ───────────────────────── */
        [data-theme="light"] {
            --bg-primary: #f0f2f5;
            --bg-secondary: #ffffff;
            --bg-card: rgba(0,0,0,0.02);
            --bg-card-hover: rgba(0,0,0,0.04);
            --border: rgba(0,0,0,0.08);
            --border-accent: rgba(59,130,246,0.25);
            --text-primary: #0f172a;
            --text-secondary: rgba(15,23,42,0.6);
            --text-muted: rgba(15,23,42,0.4);
            --brand-blue: #2563eb;
            --brand-blue-dim: rgba(37,99,235,0.08);
            --brand-blue-glow: rgba(37,99,235,0.1);
            --success: #16a34a;
            --danger: #dc2626;
            --warning: #d97706;
            --glow-opacity: 0.3;
            --grid-line: rgba(0,0,0,0.03);
            --table-row-hover: rgba(0,0,0,0.02);
            --table-row-border: rgba(0,0,0,0.05);
            --steps-border: rgba(0,0,0,0.06);
            --cta-bg: linear-gradient(135deg, #e0e7ff 0%, #dbeafe 50%, #e0e7ff 100%);
            --guarantee-bg: linear-gradient(135deg, rgba(22,163,74,0.06) 0%, rgba(22,163,74,0.02) 100%);
            --guarantee-border: rgba(22,163,74,0.2);
            --highlight-bg: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 100%);
            --italic-bg: rgba(0,0,0,0.02);
            --gradient-start: #0f172a;
        }

        html {
            font-size: 15px;
            scroll-behavior: smooth;
        }

        body {
            font-family: var(--font);
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.7;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* ─── Print Styles ───────────────────────── */
        @media print {
            body { background: #fff; color: #111; }
            .page { break-after: page; box-shadow: none; border: none; }
            .glow-orb, .grid-bg { display: none; }
            .confidential-bar { color: #666; border-color: #ccc; }
            .glass-card { background: #f9f9f9; border-color: #ddd; }
            table th { background: #222; color: #fff; }
            .brand-blue { color: #2563eb; }
            .cta-section { background: #1e293b; }
            @page { margin: 0.75in; }
        }

        /* ─── Layout ───────────────────────── */
        .document {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .page {
            position: relative;
            padding: 60px 64px;
            margin-bottom: 48px;
            overflow: hidden;
            border-radius: 16px;
            border: 1px solid var(--border);
            background: var(--bg-secondary);
        }

        /* ─── Ambient Glow ───────────────────────── */
        .glow-orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            pointer-events: none;
            z-index: 0;
        }

        .glow-orb.blue {
            width: 400px; height: 400px;
            background: var(--brand-blue-glow);
            top: -100px; right: -100px;
            opacity: var(--glow-opacity);
            transition: opacity 0.4s ease;
        }

        .glow-orb.blue-bottom {
            width: 300px; height: 300px;
            background: var(--brand-blue-glow);
            bottom: -80px; left: -60px;
            opacity: var(--glow-opacity);
            transition: opacity 0.4s ease;
        }

        /* ─── Grid Background ───────────────────── */
        .grid-bg {
            position: absolute;
            inset: 0;
            background-image:
                linear-gradient(var(--grid-line) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
            background-size: 40px 40px;
            pointer-events: none;
            z-index: 0;
            transition: background-image 0.4s ease;
        }

        .page > *:not(.glow-orb):not(.grid-bg) {
            position: relative;
            z-index: 1;
        }

        /* ─── Header & Logo ───────────────────────── */
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 48px;
            padding-bottom: 24px;
            border-bottom: 1px solid var(--border);
        }

        .logo-group {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .logo-icon {
            width: 38px; height: 38px;
            color: var(--brand-blue);
        }

        .logo-text {
            font-size: 1.35rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--text-primary);
        }

        .header-meta {
            text-align: right;
            font-size: 0.75rem;
            color: var(--text-muted);
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        /* ─── Confidential Bar ───────────────────── */
        .confidential-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.7rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--text-muted);
            padding-bottom: 16px;
            border-bottom: 1px solid var(--border);
            margin-bottom: 48px;
        }

        .confidential-bar .dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--brand-blue);
            box-shadow: 0 0 8px var(--brand-blue-glow);
        }

        /* ─── Hero Title ───────────────────────── */
        .hero-section {
            text-align: center;
            padding: 56px 0 48px;
        }

        .hero-label {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: var(--brand-blue);
            background: var(--brand-blue-dim);
            padding: 6px 18px;
            border-radius: 100px;
            margin-bottom: 28px;
        }

        .hero-title {
            font-size: 2.6rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.15;
            margin-bottom: 20px;
        }

        .hero-title .gradient {
            background: linear-gradient(135deg, var(--gradient-start) 0%, var(--brand-blue) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero-subtitle {
            font-size: 1.05rem;
            color: var(--text-secondary);
            font-weight: 400;
            line-height: 1.6;
        }

        .hero-meta {
            margin-top: 36px;
            display: flex;
            justify-content: center;
            gap: 40px;
        }

        .hero-meta-item {
            text-align: center;
        }

        .hero-meta-label {
            font-size: 0.65rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--text-muted);
            margin-bottom: 4px;
        }

        .hero-meta-value {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--text-primary);
        }

        .hero-meta-value a {
            color: var(--brand-blue);
            text-decoration: none;
        }

        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--border), transparent);
            margin: 40px 0;
        }

        .divider-accent {
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--brand-blue), transparent);
            margin: 40px 0;
            opacity: 0.3;
        }

        /* ─── Section Headers ───────────────────── */
        .section-number {
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--brand-blue);
            margin-bottom: 6px;
        }

        .section-title {
            font-size: 1.6rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 16px;
        }

        .section-subtitle {
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 32px;
            line-height: 1.7;
        }

        /* ─── Glass Cards ───────────────────── */
        .glass-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 32px;
            margin-bottom: 20px;
            transition: background 0.3s ease, border-color 0.3s ease;
        }

        .glass-card:hover {
            background: var(--bg-card-hover);
            border-color: var(--border-accent);
        }

        .glass-card .card-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .glass-card .card-icon {
            width: 20px; height: 20px;
            color: var(--brand-blue);
            flex-shrink: 0;
        }

        .glass-card p, .glass-card li {
            font-size: 0.88rem;
            color: var(--text-secondary);
            line-height: 1.75;
        }

        .glass-card ul {
            list-style: none;
            padding: 0;
        }

        .glass-card ul li {
            padding: 5px 0;
            padding-left: 20px;
            position: relative;
        }

        .glass-card ul li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 13px;
            width: 6px; height: 6px;
            border-radius: 50%;
            background: var(--brand-blue);
            opacity: 0.7;
        }

        /* ─── Comparison Table ───────────────────── */
        .table-wrapper {
            overflow-x: auto;
            border-radius: 14px;
            border: 1px solid var(--border);
            margin: 24px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.82rem;
        }

        thead th {
            background: rgba(59,130,246,0.12);
            color: var(--brand-blue);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.7rem;
            padding: 14px 18px;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }

        tbody td {
            padding: 14px 18px;
            border-bottom: 1px solid var(--table-row-border);
            vertical-align: top;
        }

        tbody tr:last-child td {
            border-bottom: none;
        }

        tbody tr:hover {
            background: var(--table-row-hover);
        }

        td:first-child {
            font-weight: 600;
            color: var(--text-primary);
            white-space: nowrap;
        }

        .status-bad {
            color: var(--danger);
            font-weight: 500;
        }

        .status-good {
            color: var(--success);
            font-weight: 500;
        }

        /* ─── Pricing Table ───────────────────── */
        .pricing-table thead th {
            background: var(--brand-blue);
            color: #fff;
        }

        .pricing-table .price-free {
            color: var(--success);
            font-weight: 700;
            font-size: 0.9rem;
        }

        .pricing-table .price-included {
            color: var(--brand-blue);
            font-weight: 600;
        }

        .pricing-table .price-highlight {
            color: var(--success);
            font-weight: 700;
            font-size: 0.9rem;
        }

        .pricing-table .price-original {
            color: var(--text-muted);
            text-decoration: line-through;
            font-size: 0.8rem;
        }

        /* ─── Highlight Box ───────────────────── */
        .highlight-box {
            background: var(--highlight-bg);
            border: 1px solid var(--border-accent);
            border-radius: 14px;
            padding: 28px 32px;
            margin: 24px 0;
        }

        .highlight-box .label {
            font-size: 0.65rem;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--brand-blue);
            font-weight: 600;
            margin-bottom: 8px;
        }

        .highlight-box .value {
            font-size: 1.5rem;
            font-weight: 700;
        }

        .highlight-box .detail {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-top: 8px;
        }

        /* ─── Guarantee Section ───────────────────── */
        .guarantee-card {
            background: var(--guarantee-bg);
            border: 1px solid var(--guarantee-border);
            border-radius: 14px;
            padding: 28px 32px;
            margin: 24px 0;
        }

        .guarantee-card .shield-icon {
            width: 28px; height: 28px;
            color: var(--success);
            margin-bottom: 12px;
        }

        .guarantee-card h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--success);
            margin-bottom: 10px;
        }

        .guarantee-card p {
            font-size: 0.88rem;
            color: var(--text-secondary);
        }

        /* ─── Steps List ───────────────────── */
        .steps-list {
            list-style: none;
            padding: 0;
            counter-reset: step-counter;
        }

        .steps-list li {
            counter-increment: step-counter;
            display: flex;
            gap: 18px;
            padding: 18px 0;
            border-bottom: 1px solid var(--steps-border);
            align-items: flex-start;
        }

        .steps-list li:last-child {
            border-bottom: none;
        }

        .steps-list li::before {
            content: counter(step-counter, decimal-leading-zero);
            font-size: 0.8rem;
            font-weight: 700;
            color: var(--brand-blue);
            background: var(--brand-blue-dim);
            min-width: 36px; height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .step-content .step-title {
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 4px;
        }

        .step-content .step-desc {
            font-size: 0.82rem;
            color: var(--text-secondary);
        }

        /* ─── CTA Section ───────────────────── */
        .cta-section {
            background: var(--cta-bg);
            border: 1px solid var(--border-accent);
            border-radius: 16px;
            padding: 48px 40px;
            text-align: center;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
        }

        .cta-section .cta-glow {
            position: absolute;
            width: 300px; height: 300px;
            border-radius: 50%;
            background: var(--brand-blue-glow);
            filter: blur(80px);
            top: -100px; left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
        }

        .cta-section > * {
            position: relative; z-index: 1;
        }

        .cta-section h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }

        .cta-section p {
            color: var(--text-secondary);
            font-size: 0.92rem;
            margin-bottom: 24px;
        }

        .cta-contact {
            display: flex;
            justify-content: center;
            gap: 28px;
            flex-wrap: wrap;
        }

        .cta-contact a {
            color: var(--brand-blue);
            text-decoration: none;
            font-weight: 600;
            font-size: 0.92rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: color 0.2s;
        }

        .cta-contact a:hover {
            color: #60a5fa;
        }

        .cta-contact .separator {
            color: var(--text-muted);
        }

        /* ─── Design Preview Cards ───────────────── */
        .preview-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin: 24px 0;
        }

        .preview-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
        }

        .preview-card:hover {
            border-color: var(--border-accent);
            transform: translateY(-2px);
        }

        .preview-card .preview-number {
            font-size: 0.65rem;
            font-weight: 600;
            color: var(--brand-blue);
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .preview-card .preview-title {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 6px;
        }

        .preview-card .preview-desc {
            font-size: 0.78rem;
            color: var(--text-muted);
        }

        /* ─── Stat Badges ───────────────────── */
        .stat-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin: 32px 0;
        }

        .stat-badge {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 24px;
            text-align: center;
        }

        .stat-badge .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--brand-blue);
            line-height: 1;
            margin-bottom: 6px;
        }

        .stat-badge .stat-label {
            font-size: 0.65rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--text-muted);
        }

        /* ─── Footer ───────────────────── */
        .page-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 24px;
            border-top: 1px solid var(--border);
            margin-top: 48px;
            font-size: 0.7rem;
            color: var(--text-muted);
        }

        .page-footer a {
            color: var(--brand-blue);
            text-decoration: none;
        }

        /* ─── Italics Block ──────────────────── */
        .italic-note {
            font-style: italic;
            font-size: 0.85rem;
            color: var(--text-secondary);
            background: var(--italic-bg);
            border-left: 3px solid var(--brand-blue);
            border-radius: 0 10px 10px 0;
            padding: 20px 24px;
            margin: 20px 0;
        }

        /* ─── Theme Toggle Button ───────────────── */
        .theme-toggle {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1000;
            width: 44px; height: 44px;
            border-radius: 50%;
            border: 1px solid var(--border);
            background: var(--bg-card);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }

        .theme-toggle:hover {
            border-color: var(--brand-blue);
            box-shadow: 0 0 16px var(--brand-blue-glow);
            transform: scale(1.05);
        }

        .theme-toggle svg {
            width: 20px; height: 20px;
            color: var(--brand-blue);
            transition: transform 0.3s ease;
        }

        .theme-toggle:hover svg {
            transform: rotate(15deg);
        }

        .theme-toggle .icon-sun { display: none; }
        .theme-toggle .icon-moon { display: block; }
        [data-theme="light"] .theme-toggle .icon-sun { display: block; }
        [data-theme="light"] .theme-toggle .icon-moon { display: none; }

        /* ─── Global Transition ───────────────────── */
        body, .page, .glass-card, .stat-badge, .preview-card,
        .highlight-box, .guarantee-card, .cta-section, .table-wrapper,
        thead th, tbody td, .header, .confidential-bar, .page-footer,
        .italic-note, .hero-label, .theme-toggle {
            transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }

        /* ─── Light mode pricing table ───────────── */
        [data-theme="light"] .pricing-table thead th {
            background: var(--brand-blue);
            color: #fff;
        }

        [data-theme="light"] .cta-section h2,
        [data-theme="light"] .cta-section p {
            color: var(--text-primary);
        }

        [data-theme="light"] .cta-section p {
            color: var(--text-secondary);
        }

        [data-theme="light"] .price-original {
            color: var(--text-muted);
        }

        [data-theme="light"] .page {
            box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
        }

        /* ─── Responsive ───────────────────── */
        @media (max-width: 700px) {
            .page { padding: 36px 28px; }
            .hero-title { font-size: 1.8rem; }
            .hero-meta { flex-direction: column; gap: 16px; }
            .stat-row, .preview-grid { grid-template-columns: 1fr; }
            .header { flex-direction: column; gap: 12px; }
            .theme-toggle { top: 12px; right: 12px; width: 38px; height: 38px; }
        }
    </style>
</head>
<body>
    <!-- Password Protection Overlay -->
    <div id="passwordOverlay" style="
        position: fixed;
        inset: 0;
        background: var(--bg-primary);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    ">
        <div style="
            max-width: 420px;
            width: 100%;
            background: var(--bg-secondary);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 48px 40px;
            text-align: center;
        ">
            <svg style="width: 48px; height: 48px; color: var(--brand-blue); margin: 0 auto 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; color: var(--text-primary);">
                Confidential Proposal
            </h2>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 32px;">
                This document is password protected. Please enter the password to continue.
            </p>
            <form id="passwordForm" onsubmit="return false;">
                <input
                    type="password"
                    id="passwordInput"
                    placeholder="Enter password"
                    autocomplete="off"
                    style="
                        width: 100%;
                        padding: 14px 18px;
                        font-size: 0.95rem;
                        background: var(--bg-card);
                        border: 1px solid var(--border);
                        border-radius: 10px;
                        color: var(--text-primary);
                        margin-bottom: 16px;
                        font-family: var(--font);
                        outline: none;
                        transition: border-color 0.2s;
                    "
                    onfocus="this.style.borderColor='var(--brand-blue)'"
                    onblur="this.style.borderColor='var(--border)'"
                />
                <button
                    type="submit"
                    onclick="checkPassword()"
                    style="
                        width: 100%;
                        padding: 14px 18px;
                        font-size: 0.95rem;
                        font-weight: 600;
                        background: var(--brand-blue);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-family: var(--font);
                        transition: opacity 0.2s;
                    "
                    onmouseover="this.style.opacity='0.9'"
                    onmouseout="this.style.opacity='1'"
                >
                    Access Proposal
                </button>
                <p id="errorMessage" style="
                    color: var(--danger);
                    font-size: 0.85rem;
                    margin-top: 12px;
                    display: none;
                ">
                    Incorrect password. Please try again.
                </p>
            </form>
        </div>
    </div>

    <div class="document" id="proposalContent" style="display: none;">

        <!-- ═══════════ PAGE 1: COVER & INTRODUCTION ═══════════ -->
        <div class="page" id="page-1">
            <div class="glow-orb blue"></div>
            <div class="glow-orb blue-bottom"></div>
            <div class="grid-bg"></div>

            <!-- Header -->
            <div class="header">
                <div class="logo-group">
                    <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L34.6 12V28L20 36L5.4 28V12L20 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <path d="M20 4L20 36" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M5.4 12L34.6 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M34.6 12L5.4 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <circle cx="20" cy="4" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="34.6" cy="12" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="34.6" cy="28" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="20" cy="36" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="5.4" cy="28" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="5.4" cy="12" r="2.5" fill="currentColor" opacity="0.8"/>
                        <circle cx="20" cy="20" r="3" fill="currentColor"/>
                    </svg>
                    <span class="logo-text">Trixode-Studios Inc.</span>
                </div>
                <div class="header-meta">
                    Victoria, BC, Canada<br>
                    <a href="https://www.trixode-studios.com" style="color: var(--brand-blue); text-decoration: none;">trixode-studios.com</a>
                </div>
            </div>

            <!-- Confidential -->
            <div class="confidential-bar">
                <span class="dot"></span>
                Confidential — Prepared exclusively for Maz Majidi
            </div>

            <!-- Hero -->
            <div class="hero-section">
                <div class="hero-label">Proposal · March 2026</div>
                <h1 class="hero-title">
                    GEO &amp; Website<br>
                    <span class="gradient">Development Proposal</span>
                </h1>
                <p class="hero-subtitle">
                    A complete website redesign paired with Generative Engine Optimization —<br>
                    built to dominate AI-powered search.
                </p>
                <div class="hero-meta">
                    <div class="hero-meta-item">
                        <div class="hero-meta-label">Prepared For</div>
                        <div class="hero-meta-value">Maz Majidi</div>
                    </div>
                    <div class="hero-meta-item">
                        <div class="hero-meta-label">Market</div>
                        <div class="hero-meta-value">Luxury Real Estate</div>
                    </div>
                    <div class="hero-meta-item">
                        <div class="hero-meta-label">Region</div>
                        <div class="hero-meta-value">North Shore &amp; Downtown Vancouver</div>
                    </div>
                    <div class="hero-meta-item">
                        <div class="hero-meta-label">Website</div>
                        <div class="hero-meta-value"><a href="https://mazmajidi.ca">mazmajidi.ca</a></div>
                    </div>
                </div>
            </div>

            <div class="divider-accent"></div>

            <!-- Letter -->
            <div style="max-width: 680px;">
                <p style="font-size: 1.05rem; font-weight: 600; margin-bottom: 20px; color: var(--text-primary);">Dear Maz,</p>

                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
                    We have reviewed your website at mazmajidi.ca and see a significant opportunity. Your expertise, track record, and reputation in the luxury North Shore market are exceptional — but right now, when a potential buyer or seller asks ChatGPT, Perplexity, or Google AI Overviews for the best luxury real estate advisor in West Vancouver or North Vancouver, your name does not consistently appear.
                </p>

                <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px;">
                    This proposal outlines a complete package to change that: a state-of-the-art website redesign paired with Generative Engine Optimization (GEO) — the new standard for being found in AI-powered search. As we are at an early stage of our market penetration into the real estate sector, we are offering a unique opportunity: the full website restructure at no cost, with GEO optimization at a 30% introductory discount.
                </p>
            </div>

            <!-- Stat Badges -->
            <div class="stat-row">
                <div class="stat-badge">
                    <div class="stat-value">\$0</div>
                    <div class="stat-label">Website Redesign</div>
                </div>
                <div class="stat-badge">
                    <div class="stat-value">30%</div>
                    <div class="stat-label">GEO Discount</div>
                </div>
                <div class="stat-badge">
                    <div class="stat-value">30d</div>
                    <div class="stat-label">Performance Guarantee</div>
                </div>
            </div>

            <!-- Footer -->
            <div class="page-footer">
                <span>GEO &amp; Web Development Proposal · mazmajidi.ca</span>
                <span>Page 1 of 4</span>
            </div>
        </div>

        <!-- ═══════════ PAGE 2: WHAT'S INCLUDED ═══════════ -->
        <div class="page" id="page-2">
            <div class="glow-orb blue" style="top: 50%; right: -150px; opacity: 0.4;"></div>
            <div class="grid-bg"></div>

            <!-- Header -->
            <div class="header">
                <div class="logo-group">
                    <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L34.6 12V28L20 36L5.4 28V12L20 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <path d="M20 4L20 36" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M5.4 12L34.6 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M34.6 12L5.4 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <circle cx="20" cy="20" r="3" fill="currentColor"/>
                    </svg>
                    <span class="logo-text">Trixode-Studios Inc.</span>
                </div>
                <div class="header-meta">Proposal · March 2026</div>
            </div>

            <div class="confidential-bar">
                <span class="dot"></span>
                Confidential — Prepared exclusively for Maz Majidi
            </div>

            <!-- Section: What's Included -->
            <div class="section-number">01</div>
            <h2 class="section-title">What's Included</h2>
            <p class="section-subtitle">Two interconnected pillars designed to transform your digital presence and AI visibility.</p>

            <!-- Card 1: Website -->
            <div class="glass-card">
                <div class="card-title">
                    <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                    Website Restructure &amp; Redesign
                    <span style="margin-left: auto; font-size: 0.7rem; font-weight: 600; color: var(--success); background: rgba(34,197,94,0.1); padding: 4px 12px; border-radius: 100px;">COMPLIMENTARY</span>
                </div>
                <p style="margin-bottom: 16px;">Your website's framework will be completely rebuilt for both visual excellence and AI compatibility. All your existing content — listings, testimonials, market insights, about page — will be preserved and elevated within a modern, luxury design system appropriate for your clientele.</p>
                <ul>
                    <li>State-of-the-art luxury design tailored to the North Shore market</li>
                    <li>Two dedicated iteration sessions to customize the design to your exact taste</li>
                    <li>Mobile-first, fast-loading architecture (Core Web Vitals optimized)</li>
                    <li>Full content migration — nothing is lost, everything is improved</li>
                    <li>AI-compatible page structure built in from day one</li>
                </ul>
            </div>

            <!-- Card 2: GEO -->
            <div class="glass-card">
                <div class="card-title">
                    <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    Generative Engine Optimization — Monthly Retainer
                    <span style="margin-left: auto; font-size: 0.7rem; font-weight: 600; color: var(--brand-blue); background: var(--brand-blue-dim); padding: 4px 12px; border-radius: 100px;">30% OFF</span>
                </div>
                <p style="margin-bottom: 16px;">GEO ensures that when AI tools like ChatGPT, Perplexity, Gemini, or Google AI Overviews are asked about luxury real estate advisors in your area, your name and expertise are recognized and cited as an authoritative source.</p>
                <ul>
                    <li>Full schema markup suite (LocalBusiness, RealEstateListing, FAQPage, etc.)</li>
                    <li>Content restructured for LLM citation patterns</li>
                    <li>2–4 AI-targeted blog and Q&amp;A posts per month</li>
                    <li>Monthly prompt testing across ChatGPT, Perplexity, Gemini, and Claude</li>
                    <li>Citation monitoring and competitor gap analysis</li>
                    <li>Monthly GEO performance reports with actionable insights</li>
                    <li>On-call support for emerging AI search changes</li>
                </ul>
            </div>

            <!-- Footer -->
            <div class="page-footer">
                <span>GEO &amp; Web Development Proposal · mazmajidi.ca</span>
                <span>Page 2 of 4</span>
            </div>
        </div>

        <!-- ═══════════ PAGE 3: COMPARISON & INVESTMENT ═══════════ -->
        <div class="page" id="page-3">
            <div class="glow-orb blue" style="top: -50px; left: -100px; opacity: 0.3;"></div>
            <div class="grid-bg"></div>

            <!-- Header -->
            <div class="header">
                <div class="logo-group">
                    <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L34.6 12V28L20 36L5.4 28V12L20 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <path d="M20 4L20 36" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M5.4 12L34.6 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M34.6 12L5.4 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <circle cx="20" cy="20" r="3" fill="currentColor"/>
                    </svg>
                    <span class="logo-text">Trixode-Studios Inc.</span>
                </div>
                <div class="header-meta">Proposal · March 2026</div>
            </div>

            <div class="confidential-bar">
                <span class="dot"></span>
                Confidential — Prepared exclusively for Maz Majidi
            </div>

            <!-- Section: Comparison Table -->
            <div class="section-number">02</div>
            <h2 class="section-title">Current vs. Optimized</h2>
            <p class="section-subtitle">A side-by-side comparison of your current digital presence against the optimized experience we will deliver.</p>

            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Current Status</th>
                            <th>After GEO Optimization</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Schema Markup</td>
                            <td class="status-bad">None detected</td>
                            <td class="status-good">Full suite: LocalBusiness, RealEstateListing, FAQPage, etc.</td>
                        </tr>
                        <tr>
                            <td>AI / LLM Visibility</td>
                            <td class="status-bad">Not indexed by AI tools</td>
                            <td class="status-good">Optimized for ChatGPT, Perplexity, Claude, Gemini</td>
                        </tr>
                        <tr>
                            <td>Google Search Ranking</td>
                            <td class="status-bad">Mid-page / inconsistent</td>
                            <td class="status-good">Targeted top-3 for luxury North Shore queries</td>
                        </tr>
                        <tr>
                            <td>Content Structure for AI</td>
                            <td class="status-bad">Unstructured blog/listing format</td>
                            <td class="status-good">Conversational Q&amp;A format optimized for LLM citation patterns</td>
                        </tr>
                        <tr>
                            <td>Page Speed (Core Web Vitals)</td>
                            <td class="status-bad">Not optimized</td>
                            <td class="status-good">Fully optimized — LLMs and Google favor fast, clean sites</td>
                        </tr>
                        <tr>
                            <td>Internal Linking Architecture</td>
                            <td class="status-bad">Minimal / ad hoc</td>
                            <td class="status-good">Semantic topic clusters: West Van, North Van, Downtown, Luxury</td>
                        </tr>
                        <tr>
                            <td>AI Crawler Access</td>
                            <td class="status-bad">Robots.txt not AI-configured</td>
                            <td class="status-good">Sitemap + Robots.txt updated for GPTBot, PerplexityBot, Googlebot</td>
                        </tr>
                        <tr>
                            <td>Local Authority Signals</td>
                            <td class="status-bad">Limited citations online</td>
                            <td class="status-good">Structured citations + entity clarity across web</td>
                        </tr>
                        <tr>
                            <td>Metadata &amp; Page Architecture</td>
                            <td class="status-bad">Generic titles/descriptions</td>
                            <td class="status-good">AI-readable metadata, entity-rich page architecture</td>
                        </tr>
                        <tr>
                            <td>Monthly Content Strategy</td>
                            <td class="status-bad">Irregular posting</td>
                            <td class="status-good">2–4 AI-targeted Q&amp;A posts/month aligned with buyer intent</td>
                        </tr>
                        <tr>
                            <td>Competitor Gap Monitoring</td>
                            <td class="status-bad">None</td>
                            <td class="status-good">Monthly GEO gap analysis vs. top North Shore competitors</td>
                        </tr>
                        <tr>
                            <td>Citation Monitoring</td>
                            <td class="status-bad">None</td>
                            <td class="status-good">Monthly tracking of AI-generated mentions and recommendations</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="divider"></div>

            <!-- Section: Investment -->
            <div class="section-number">03</div>
            <h2 class="section-title">Investment Summary</h2>
            <p class="section-subtitle">As we begin our work in the real estate sector, we are offering Maz Majidi a founding client rate: the complete website restructure is provided at no charge, and the monthly GEO retainer is offered at a 30% discount.</p>

            <div class="table-wrapper">
                <table class="pricing-table">
                    <thead>
                        <tr>
                            <th>Component</th>
                            <th>Scope</th>
                            <th>Standard Price</th>
                            <th>Your Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Website Restructure</td>
                            <td style="color: var(--text-secondary);">Full framework rebuild, state-of-the-art design, 2 iteration sessions</td>
                            <td><span class="price-original">\$2,200</span></td>
                            <td><span class="price-free">FREE</span></td>
                        </tr>
                        <tr>
                            <td>GEO Optimization Setup</td>
                            <td style="color: var(--text-secondary);">Schema markup, content restructuring, AI crawler config, health report</td>
                            <td><span class="price-original">\$1,200</span></td>
                            <td><span class="price-included">Included</span></td>
                        </tr>
                        <tr>
                            <td>Monthly GEO Retainer</td>
                            <td style="color: var(--text-secondary);">4 AI posts, citation monitoring, prompt testing, competitor gap analysis</td>
                            <td><span class="price-original">\$990/mo</span></td>
                            <td><span class="price-highlight">\$700/mo</span></td>
                        </tr>
                        <tr>
                            <td>First Client Discount</td>
                            <td style="color: var(--text-secondary);">30% applied to monthly retainer</td>
                            <td>—</td>
                            <td style="color: var(--success); font-weight: 600;">Save \$290/mo</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pricing Highlight -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="highlight-box">
                    <div class="label">Your Monthly Investment</div>
                    <div class="value">\$700<span style="font-size: 0.8rem; font-weight: 400; color: var(--text-muted);">/month</span></div>
                    <div class="detail">Regular: \$990/mo — you save \$290 every month</div>
                </div>
                <div class="highlight-box">
                    <div class="label">Website Redesign Value</div>
                    <div class="value" style="color: var(--success);">Complimentary</div>
                    <div class="detail">Valued at \$2,200+ — provided at no cost</div>
                </div>
            </div>

            <!-- Guarantee -->
            <div class="guarantee-card">
                <svg class="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <h3>Our 30-Day Performance Guarantee</h3>
                <p>If our GEO and SEO efforts do not result in measurable improvement in your website's search rankings within 30 days of work completion, you may choose between a complimentary additional month of service or a full one-month refund — no questions asked.</p>
            </div>

            <div class="divider"></div>

            <!-- Section: SEO Preservation -->
            <div class="section-number">04</div>
            <h2 class="section-title">SEO Preservation During Rebuild</h2>
            <p class="section-subtitle">A common concern: "Won't we lose our current Google rankings if we rebuild the site?" The answer is no — when done correctly, a rebuild actually improves SEO.</p>

            <!-- Current Site Performance -->
            <div class="glass-card" style="margin-bottom: 24px;">
                <div class="card-title">
                    <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3v18h18"/><polyline points="7 15 12 10 16 14 21 9"/>
                    </svg>
                    Current Site Performance Baseline (mazmajidi.ca)
                </div>
                <p style="margin-bottom: 16px; color: var(--text-secondary);">Based on technical analysis of your current WordPress site:</p>
                <div class="table-wrapper">
                    <table style="font-size: 0.85rem;">
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Current Score</th>
                                <th>Target After Rebuild</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Performance (Mobile)</td>
                                <td class="status-bad">52/100</td>
                                <td class="status-good">90+/100</td>
                            </tr>
                            <tr>
                                <td>Performance (Desktop)</td>
                                <td class="status-bad">68/100</td>
                                <td class="status-good">95+/100</td>
                            </tr>
                            <tr>
                                <td>SEO</td>
                                <td class="status-neutral">78/100</td>
                                <td class="status-good">95+/100</td>
                            </tr>
                            <tr>
                                <td>Accessibility</td>
                                <td class="status-neutral">82/100</td>
                                <td class="status-good">95+/100</td>
                            </tr>
                            <tr>
                                <td>Best Practices</td>
                                <td class="status-neutral">75/100</td>
                                <td class="status-good">95+/100</td>
                            </tr>
                            <tr>
                                <td>Largest Contentful Paint</td>
                                <td class="status-bad">4.2s</td>
                                <td class="status-good">&lt;2.5s</td>
                            </tr>
                            <tr>
                                <td>Total Page Weight</td>
                                <td class="status-bad">3.8 MB</td>
                                <td class="status-good">&lt;1.5 MB</td>
                            </tr>
                            <tr>
                                <td>Schema Markup</td>
                                <td class="status-bad">Basic only</td>
                                <td class="status-good">Full LocalBusiness + RealEstateAgent + FAQPage</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Why SEO Won't Be Lost -->
            <div class="glass-card">
                <div class="card-title">
                    <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Our SEO Migration Protocol
                </div>
                <p style="margin-bottom: 20px; color: var(--text-secondary);">We use a proven 5-step process to ensure your existing Google rankings are preserved and improved:</p>

                <div style="display: grid; gap: 16px;">
                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-dim); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem;">1</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">URL Mapping &amp; 301 Redirects</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">Every existing URL is mapped to its new equivalent. All pages that change URLs receive permanent 301 redirects, ensuring Google and visitors are seamlessly guided to the correct new location. Zero link equity is lost.</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-dim); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem;">2</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Content Preservation &amp; Enhancement</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">All your existing blog content, property listings, about page, and testimonials are migrated to the new site. We don't delete content — we elevate it with better formatting, proper headers, and schema markup that Google can read more effectively.</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-dim); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem;">3</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Metadata Migration</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">Every page title, meta description, and alt text that currently ranks well is preserved. We improve weak metadata but never discard what's already working. This ensures continuity in how Google sees your pages.</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-dim); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem;">4</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Search Console Monitoring</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">We submit the new sitemap to Google Search Console immediately upon launch and monitor for crawl errors. If Google reports any issues (404s, broken redirects, crawl failures), we fix them within 24 hours.</div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 16px; align-items: flex-start;">
                        <div style="flex-shrink: 0; width: 32px; height: 32px; border-radius: 8px; background: var(--brand-blue-dim); color: var(--brand-blue); display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem;">5</div>
                        <div>
                            <div style="font-weight: 600; margin-bottom: 4px; color: var(--text-primary);">Performance Gains = SEO Gains</div>
                            <div style="font-size: 0.85rem; color: var(--text-secondary);">Google's Core Web Vitals are now a ranking factor. Your current site loads slowly on mobile (4.2s LCP), which actively hurts rankings. The new site will be 3x faster, which Google rewards with better positioning. Speed is SEO.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="italic-note" style="margin-top: 24px;">
                <strong>Bottom line:</strong> Rebuilding a website does not inherently harm SEO — poor execution does. When migrations are done with proper redirects, content preservation, and technical rigor, most sites see improved rankings within 4–6 weeks due to better performance, structure, and schema markup. Your domain authority, backlink profile, and content history remain intact.
            </div>

            <!-- Footer -->
            <div class="page-footer">
                <span>GEO &amp; Web Development Proposal · mazmajidi.ca</span>
                <span>Page 3 of 4</span>
            </div>
        </div>

        <!-- ═══════════ PAGE 4: PREVIEWS & NEXT STEPS ═══════════ -->
        <div class="page" id="page-4">
            <div class="glow-orb blue" style="bottom: -100px; right: -80px; opacity: 0.35;"></div>
            <div class="grid-bg"></div>

            <!-- Header -->
            <div class="header">
                <div class="logo-group">
                    <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L34.6 12V28L20 36L5.4 28V12L20 4Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        <path d="M20 4L20 36" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M5.4 12L34.6 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <path d="M34.6 12L5.4 28" stroke="currentColor" stroke-width="1" opacity="0.4"/>
                        <circle cx="20" cy="20" r="3" fill="currentColor"/>
                    </svg>
                    <span class="logo-text">Trixode-Studios Inc.</span>
                </div>
                <div class="header-meta">Proposal · March 2026</div>
            </div>

            <div class="confidential-bar">
                <span class="dot"></span>
                Confidential — Prepared exclusively for Maz Majidi
            </div>

            <!-- Section: Previews -->
            <div class="section-number">04</div>
            <h2 class="section-title">Initial Pre-Design Previews</h2>

            <div class="italic-note">
                We have already completed some initial design work on your website. The links below are private previews for your eyes only. Please note that these represent an early-stage pre-design to demonstrate the possible potential — they are not final deliverables, and full customization happens during our two dedicated iteration sessions.
            </div>

            <div class="preview-grid">
                <a href="/pitch/mazmajidi/mockup-1" target="_blank" class="preview-card" style="text-decoration: none; color: inherit;">
                    <div class="preview-number">Mockup 01</div>
                    <div class="preview-title">Digital FinTech Style</div>
                    <div class="preview-desc">Clean grids, modern luxury — Inspired by TREF</div>
                    <div style="margin-top: 12px; font-size: 0.7rem; color: var(--brand-blue); font-weight: 500;">
                        VIEW LIVE DEMO →
                    </div>
                </a>
                <a href="/pitch/mazmajidi/mockup-2" target="_blank" class="preview-card" style="text-decoration: none; color: inherit;">
                    <div class="preview-number">Mockup 02</div>
                    <div class="preview-title">LA Monolith Style</div>
                    <div class="preview-desc">Bold typography, cinematic — Inspired by Altman Brothers</div>
                    <div style="margin-top: 12px; font-size: 0.7rem; color: var(--brand-blue); font-weight: 500;">
                        VIEW LIVE DEMO →
                    </div>
                </a>
                <a href="/pitch/mazmajidi/mockup-3" target="_blank" class="preview-card" style="text-decoration: none; color: inherit;">
                    <div class="preview-number">Mockup 03</div>
                    <div class="preview-title">Quiet Luxury Style</div>
                    <div class="preview-desc">Elegant serif, serene — Inspired by Kumara Wilcoxon</div>
                    <div style="margin-top: 12px; font-size: 0.7rem; color: var(--brand-blue); font-weight: 500;">
                        VIEW LIVE DEMO →
                    </div>
                </a>
            </div>

            <div class="divider"></div>

            <!-- Section: Next Steps -->
            <div class="section-number">05</div>
            <h2 class="section-title">Next Steps</h2>
            <p class="section-subtitle">Getting started is simple. Here is how the process works:</p>

            <ol class="steps-list">
                <li>
                    <div class="step-content">
                        <div class="step-title">Review</div>
                        <div class="step-desc">Review this proposal and the design previews at your convenience</div>
                    </div>
                </li>
                <li>
                    <div class="step-content">
                        <div class="step-title">Book a Call</div>
                        <div class="step-desc">Book a 30-minute call to discuss any questions or adjustments</div>
                    </div>
                </li>
                <li>
                    <div class="step-content">
                        <div class="step-title">Sign Agreement</div>
                        <div class="step-desc">Sign a simple one-page agreement to kick off the project</div>
                    </div>
                </li>
                <li>
                    <div class="step-content">
                        <div class="step-title">Iteration Session 1</div>
                        <div class="step-desc">First design iteration within 5 business days of signing</div>
                    </div>
                </li>
                <li>
                    <div class="step-content">
                        <div class="step-title">Go Live</div>
                        <div class="step-desc">Website live and GEO optimization active within 3–4 weeks</div>
                    </div>
                </li>
            </ol>

            <div class="divider-accent"></div>

            <!-- CTA -->
            <div class="cta-section">
                <div class="cta-glow"></div>
                <h2>Ready to get started?</h2>
                <p>We look forward to building something exceptional together.</p>
                <div class="cta-contact">
                    <a href="mailto:cso@trixode-studios.com">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        cso@trixode-studios.com
                    </a>
                    <span class="separator">|</span>
                    <a href="https://www.trixode-studios.com/contact">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                        Book a Strategy Call
                    </a>
                </div>
            </div>

            <!-- Footer -->
            <div class="page-footer">
                <span>© 2026 Trixode-Studios Inc. · All rights reserved</span>
                <span>Page 4 of 4</span>
            </div>
        </div>

    </div>

    <!-- Theme Toggle Button -->
    <button class="theme-toggle" id="themeToggle" aria-label="Toggle light/dark mode" title="Toggle light/dark mode">
        <!-- Sun icon (shown in light mode — click to go dark) -->
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <!-- Moon icon (shown in dark mode — click to go light) -->
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    </button>

    <script>
        // Password Protection
        const CORRECT_PASSWORD = '${PROPOSAL_PASSWORD}';

        function checkPassword() {
            const input = document.getElementById('passwordInput');
            const error = document.getElementById('errorMessage');
            const overlay = document.getElementById('passwordOverlay');
            const content = document.getElementById('proposalContent');

            if (input.value === CORRECT_PASSWORD) {
                // Store auth in localStorage (persists across tabs)
                localStorage.setItem('maz-proposal-auth', 'authenticated');
                overlay.style.display = 'none';
                content.style.display = 'block';
                error.style.display = 'none';
            } else {
                error.style.display = 'block';
                input.value = '';
                input.focus();
            }
            return false;
        }

        // Check if already authenticated
        window.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('maz-proposal-auth') === 'authenticated') {
                document.getElementById('passwordOverlay').style.display = 'none';
                document.getElementById('proposalContent').style.display = 'block';
            } else {
                document.getElementById('passwordInput').focus();
            }
        });

        // Handle Enter key
        document.getElementById('passwordInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });

        // Theme Toggle
        (function() {
            const toggle = document.getElementById('themeToggle');
            const html = document.documentElement;

            // Check for saved preference
            const saved = localStorage.getItem('trixode-proposal-theme');
            if (saved) {
                html.setAttribute('data-theme', saved);
            }

            toggle.addEventListener('click', function() {
                const current = html.getAttribute('data-theme');
                const next = current === 'light' ? 'dark' : 'light';
                if (next === 'dark') {
                    html.removeAttribute('data-theme');
                } else {
                    html.setAttribute('data-theme', next);
                }
                localStorage.setItem('trixode-proposal-theme', next);
            });
        })();
    </script>
</body>
</html>
`;

export async function GET() {
  return new NextResponse(htmlContent, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow'
    },
  });
}
