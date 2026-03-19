#!/usr/bin/env python3

from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory

import matplotlib.pyplot as plt
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


def create_charts(tmp_dir: Path) -> dict[str, Path]:
    plt.style.use("seaborn-v0_8-whitegrid")

    # Chart 1: Victoria market shifts
    c1 = tmp_dir / "victoria_market.png"
    labels = ["Total sales", "Condo sales", "Single-family", "Active listings"]
    values = [-19.7, -25.3, -21.1, 9.6]
    bar_colors = ["#EF4444" if v < 0 else "#10B981" for v in values]

    fig, ax = plt.subplots(figsize=(7.6, 3.7), dpi=220)
    bars = ax.bar(labels, values, color=bar_colors, width=0.65)
    ax.axhline(0, color="#0F172A", linewidth=1.1)
    ax.set_title("Victoria Market Shift (Jan 2026 vs Jan 2025)", fontsize=12, fontweight="bold")
    ax.set_ylabel("% change")
    ax.set_ylim(-30, 14)
    ax.tick_params(axis="x", rotation=9)

    for b, v in zip(bars, values):
        y = v + 0.7 if v >= 0 else v - 1.7
        ax.text(
            b.get_x() + b.get_width() / 2,
            y,
            f"{v:+.1f}%",
            ha="center",
            va="bottom" if v >= 0 else "top",
            fontsize=9,
            fontweight="bold",
            color="#111827",
        )

    fig.tight_layout()
    fig.savefig(c1, bbox_inches="tight")
    plt.close(fig)

    # Chart 2: Canada + US pulse
    c2 = tmp_dir / "na_market_pulse.png"
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10.4, 3.8), dpi=220)

    can_labels = ["Sales", "New listings", "HPI"]
    can_values = [-5.8, 7.3, -0.9]
    can_colors = ["#EF4444", "#10B981", "#F59E0B"]
    bars = ax1.bar(can_labels, can_values, color=can_colors, width=0.6)
    ax1.axhline(0, color="#0F172A", linewidth=1)
    ax1.set_title("Canada MoM (Jan 2026)", fontsize=11, fontweight="bold")
    ax1.set_ylabel("% change")
    ax1.set_ylim(-8, 10)
    for b, v in zip(bars, can_values):
        ax1.text(
            b.get_x() + b.get_width() / 2,
            v + (0.3 if v >= 0 else -0.5),
            f"{v:+.1f}%",
            ha="center",
            va="bottom" if v >= 0 else "top",
            fontsize=9,
            fontweight="bold",
        )

    x = [0, 1]
    x_labels = ["Feb 2025", "Feb 2026"]
    rate30 = [6.85, 6.01]
    rate15 = [6.04, 5.35]
    ax2.plot(x, rate30, marker="o", linewidth=2.3, color="#2563EB", label="30Y fixed")
    ax2.plot(x, rate15, marker="o", linewidth=2.3, color="#0EA5E9", label="15Y fixed")
    ax2.set_xticks(x)
    ax2.set_xticklabels(x_labels)
    ax2.set_title("U.S. Mortgage Rate Relief", fontsize=11, fontweight="bold")
    ax2.set_ylabel("Rate %")
    ax2.set_ylim(5.1, 7.1)
    ax2.legend(frameon=False, loc="upper right")
    for xv, v in zip(x, rate30):
        ax2.text(xv, v + 0.06, f"{v:.2f}%", ha="center", fontsize=8.5)
    for xv, v in zip(x, rate15):
        ax2.text(xv, v - 0.16, f"{v:.2f}%", ha="center", fontsize=8.5)

    fig.suptitle("North America Market Pulse", fontsize=12, fontweight="bold", y=1.03)
    fig.tight_layout()
    fig.savefig(c2, bbox_inches="tight")
    plt.close(fig)

    # Chart 3: weekly outbound funnel
    c3 = tmp_dir / "weekly_funnel.png"
    stages = ["Emails", "Replies", "Positive", "Calls", "Proposals", "Closes"]
    counts = [250, 21, 7, 4, 2, 0.5]

    fig, ax = plt.subplots(figsize=(7.6, 3.7), dpi=220)
    bars = ax.barh(stages, counts, color=["#1D4ED8", "#0EA5E9", "#22C55E", "#F59E0B", "#FB7185", "#A855F7"])
    ax.set_title("Weekly Outbound Funnel (Target)", fontsize=12, fontweight="bold")
    ax.set_xlabel("Count")
    ax.invert_yaxis()

    for bar, c in zip(bars, counts):
        ax.text(c + 2 if c >= 2 else c + 0.25, bar.get_y() + bar.get_height() / 2, f"{c:g}", va="center", fontsize=9, fontweight="bold")

    fig.tight_layout()
    fig.savefig(c3, bbox_inches="tight")
    plt.close(fig)

    return {"victoria": c1, "pulse": c2, "funnel": c3}


def page_decor(canvas, doc):
    canvas.saveState()
    page_w, page_h = A4

    canvas.setFillColor(HexColor("#0F172A"))
    canvas.rect(0, page_h - 22, page_w, 22, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 8.5)
    canvas.drawString(doc.leftMargin, page_h - 14.5, "TRIXODE | REAL ESTATE OUTBOUND OPERATING PLAYBOOK")

    canvas.setStrokeColor(HexColor("#CBD5E1"))
    canvas.setLineWidth(0.6)
    canvas.line(doc.leftMargin, 16, page_w - doc.rightMargin, 16)

    canvas.setFillColor(HexColor("#334155"))
    canvas.setFont("Helvetica", 8)
    canvas.drawString(doc.leftMargin, 7, "Data cut: Feb 2026 | Victoria, BC + North America")
    canvas.drawRightString(page_w - doc.rightMargin, 7, f"Page {doc.page}")
    canvas.restoreState()


def card(text_rows: list[str], width: float, bg: str = "#F8FAFC", border: str = "#CBD5E1") -> Table:
    tbl = Table([[Paragraph(r, STYLES["Body"]) for r in ["<br/>".join(text_rows)]]], colWidths=[width])
    tbl.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HexColor(bg)),
                ("BOX", (0, 0), (-1, -1), 0.8, HexColor(border)),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return tbl


def section_header(title: str) -> Table:
    t = Table([[Paragraph(title, STYLES["Section"]) ]], colWidths=[DOC_WIDTH])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HexColor("#E2E8F0")),
                ("LINEBELOW", (0, 0), (-1, -1), 1.1, HexColor("#0EA5E9")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def build_pdf(output_pdf: Path) -> None:
    with TemporaryDirectory(prefix="trixode_pdf_") as td:
        charts = create_charts(Path(td))

        doc = SimpleDocTemplate(
            str(output_pdf),
            pagesize=A4,
            rightMargin=14 * mm,
            leftMargin=14 * mm,
            topMargin=28 * mm,
            bottomMargin=18 * mm,
            title="Trixode Real Estate Outbound Playbook",
            author="Trixode Studios",
        )

        story = []

        # Cover
        story.append(Paragraph("Trixode Outbound Playbook", STYLES["Title"]))
        story.append(Paragraph("Real Estate Operator Edition (Practical)", STYLES["SubTitle"]))
        story.append(Spacer(1, 8))

        metrics = Table(
            [
                [
                    Paragraph("<b>Victoria Sales</b><br/>339", STYLES["Metric"]),
                    Paragraph("<b>Active Listings</b><br/>2,624", STYLES["Metric"]),
                    Paragraph("<b>US 30Y Rate</b><br/>6.01%", STYLES["Metric"]),
                    Paragraph("<b>BoC Policy Rate</b><br/>2.25%", STYLES["Metric"]),
                ]
            ],
            colWidths=[DOC_WIDTH / 4] * 4,
        )
        metrics.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), HexColor("#0F172A")),
                    ("TEXTCOLOR", (0, 0), (-1, -1), colors.white),
                    ("INNERGRID", (0, 0), (-1, -1), 0.4, HexColor("#334155")),
                    ("BOX", (0, 0), (-1, -1), 0.8, HexColor("#334155")),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("TOPPADDING", (0, 0), (-1, -1), 10),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
                ]
            )
        )
        story.append(metrics)
        story.append(Spacer(1, 10))

        story.append(
            card(
                [
                    "<b>What this means this quarter:</b>",
                    "1) Sales volume is down while inventory is up -> your prospects feel urgency.",
                    "2) Buyers still use agents heavily -> trust + response speed win deals.",
                    "3) Mortgage-rate relief is reactivating demand -> fastest teams capture the upside.",
                ],
                DOC_WIDTH,
                bg="#ECFEFF",
                border="#06B6D4",
            )
        )
        story.append(Spacer(1, 10))
        story.append(HRFlowable(width="100%", thickness=0.7, color=HexColor("#CBD5E1")))
        story.append(Spacer(1, 8))

        # Market charts
        story.append(section_header("1) Market Reality (Use this in your outreach hooks)"))
        story.append(Spacer(1, 6))

        story.append(Image(str(charts["victoria"]), width=DOC_WIDTH, height=72 * mm))
        story.append(Spacer(1, 6))
        story.append(Image(str(charts["pulse"]), width=DOC_WIDTH, height=63 * mm))
        story.append(Spacer(1, 8))

        story.append(
            card(
                [
                    "<b>Copy-ready market hook:</b>",
                    "[FIRST_NAME], with Victoria sales down 19.7% YoY and listings up 9.6%, teams with weak web-to-consult funnels are losing listing-side share quickly.",
                ],
                DOC_WIDTH,
            )
        )
        story.append(Spacer(1, 10))

        # ICP
        story.append(section_header("2) ICP This Week (Who to target first)"))
        story.append(Spacer(1, 6))
        icp_tbl = Table(
            [
                ["Tier", "Who", "Trigger", "Priority"],
                ["Tier 1", "Team leads / boutique brokerages in Victoria", "Listings falling, competitor relaunch, hiring ISA", "Send video + custom email"],
                ["Tier 2", "5-80 agent teams across Canada/US", "Low conversion website, weak local SEO", "Send personalized text sequence"],
                ["Disqualify", "No budget / no decision maker / pure price shoppers", "No urgency, no timeline", "Nurture only"],
            ],
            colWidths=[DOC_WIDTH * 0.13, DOC_WIDTH * 0.33, DOC_WIDTH * 0.29, DOC_WIDTH * 0.25],
            repeatRows=1,
        )
        icp_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1E293B")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                    ("GRID", (0, 0), (-1, -1), 0.3, HexColor("#CBD5E1")),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ("BACKGROUND", (0, 1), (-1, 1), HexColor("#F8FAFC")),
                    ("BACKGROUND", (0, 3), (-1, 3), HexColor("#FEF2F2")),
                ]
            )
        )
        story.append(icp_tbl)
        story.append(Spacer(1, 10))

        # Weekly operating system
        story.append(section_header("3) Weekly Operating System (practical execution)") )
        story.append(Spacer(1, 6))
        score_tbl = Table(
            [
                ["Metric", "Weekly target", "Formula"],
                ["Leads researched", "125", "25/day x 5"],
                ["Emails sent", "250", "50/day x 5"],
                ["LinkedIn DMs", "30", "Warm prospects"],
                ["Replies", "21", "(250 x 6%) + (30 x 20%)"],
                ["Calls booked", "4", "21 x 35% x 55%"],
                ["Proposals", "2", "3 calls held x 67%"],
                ["Closes", "0.5", "2 proposals x 25%"],
            ],
            colWidths=[DOC_WIDTH * 0.35, DOC_WIDTH * 0.2, DOC_WIDTH * 0.45],
            repeatRows=1,
        )
        score_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1E293B")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8.7),
                    ("GRID", (0, 0), (-1, -1), 0.3, HexColor("#CBD5E1")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ("BACKGROUND", (0, 1), (-1, 1), HexColor("#F8FAFC")),
                ]
            )
        )
        story.append(score_tbl)
        story.append(Spacer(1, 6))
        story.append(Image(str(charts["funnel"]), width=DOC_WIDTH, height=68 * mm))

        story.append(PageBreak())

        # Script pack
        story.append(section_header("4) Script Pack (copy and send)") )
        story.append(Spacer(1, 6))

        story.append(card([
            "<b>Hook:</b> [FIRST_NAME], with local sales down and listings up, weak web funnels are costing listing-side share.",
            "<b>Meat:</b> We help teams improve web-to-consult conversion by fixing [FIX_1], [FIX_2], and [FIX_3].",
            "<b>CTA:</b> Want the 1-page audit for [BROKERAGE] so you can decide quickly?",
        ], DOC_WIDTH, bg="#F0F9FF", border="#0284C7"))
        story.append(Spacer(1, 6))

        story.append(card([
            "<b>Email Day 1 subject:</b> quick idea for [brokerage]",
            "<b>Body:</b> [FirstName], noticed [specific_site_gap] on [BrokerageSite]. In this market, that usually means fewer qualified consult calls. We help real estate teams improve listing and buyer lead conversion with conversion-first websites, local SEO, and AI follow-up. I mapped 3 fixes for [Brokerage]. Want the one-page version?",
        ], DOC_WIDTH))
        story.append(Spacer(1, 5))

        story.append(card([
            "<b>Email Day 3 subject:</b> 3 wins for [brokerage]",
            "<b>Body:</b> Top opportunities: [WIN_1], [WIN_2], [WIN_3]. No hard pitch. Want the full notes?",
        ], DOC_WIDTH))
        story.append(Spacer(1, 5))

        story.append(card([
            "<b>LinkedIn connect:</b> Hey [FirstName], saw your work in [MARKET] and wanted to connect.",
            "<b>DM after accept:</b> Noticed [OBSERVATION] at [BROKERAGE]. Is [PAIN_POINT] a focus this quarter?",
            "<b>Voice note:</b> Quick 30 sec: spotted [GAP], simple fix is [FIX], want the one-page breakdown?",
        ], DOC_WIDTH))
        story.append(Spacer(1, 10))

        # Discovery + objections
        story.append(section_header("5) 15-Min Discovery + Objection Responses"))
        story.append(Spacer(1, 6))
        story.append(card([
            "<b>Discovery flow (15 min):</b> 2 min agenda -> 5 min diagnosis -> 3 min offer pivot -> 3 min close -> 2 min buffer.",
            "<b>Best questions:</b> lead volume/month, consult conversion, avg GCI/side, response-time SLA, decision-maker map.",
            "<b>Pivot line:</b> Based on [PAIN], best fit is [OFFER_NAME] focused on [LEVER_1], [LEVER_2], [LEVER_3].",
        ], DOC_WIDTH, bg="#EFF6FF", border="#3B82F6"))
        story.append(Spacer(1, 6))

        objection_tbl = Table(
            [
                ["Objection", "Fast response"],
                ["Too expensive", "Compare price to cost of missed transactions in current market."],
                ["Not right now", "Offer phased rollout: [PHASE_1] now, [PHASE_2] next month."],
                ["How do I know?", "Show KPI milestones + written guarantee."],
                ["Need partner approval", "Send one-page decision brief + schedule 3-way call."],
            ],
            colWidths=[DOC_WIDTH * 0.28, DOC_WIDTH * 0.72],
            repeatRows=1,
        )
        objection_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1E293B")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8.6),
                    ("GRID", (0, 0), (-1, -1), 0.3, HexColor("#CBD5E1")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ("BACKGROUND", (0, 1), (-1, 1), HexColor("#F8FAFC")),
                ]
            )
        )
        story.append(objection_tbl)
        story.append(Spacer(1, 10))

        # KPI and launch
        story.append(section_header("6) KPI Dashboard + 7-Day Launch"))
        story.append(Spacer(1, 6))

        story.append(card([
            "<b>Red flags to monitor weekly:</b>",
            "• Reply rate < 4% for 2 weeks",
            "• Bounce rate > 2%",
            "• Show rate < 70%",
            "• Proposal close rate < 20%",
            "• Pipeline coverage < 3x monthly booking target",
        ], DOC_WIDTH, bg="#FEF2F2", border="#EF4444"))
        story.append(Spacer(1, 6))

        launch_tbl = Table(
            [
                ["Day", "Action", "Output"],
                ["1", "Build 125-lead list (Victoria + NA)", "Segmented lead sheet"],
                ["2", "Run 5-minute audits on top 40", "Tier-1 personalization notes"],
                ["3", "Send first 50 personalized emails", "Initial reply data"],
                ["4", "Record 10 Loom audits", "Video assets"],
                ["5", "Launch LinkedIn sequence", "Multichannel touches live"],
                ["6", "Run first discovery calls", "Qualification data"],
                ["7", "Friday retro + optimize hooks", "Week-2 plan"],
            ],
            colWidths=[DOC_WIDTH * 0.09, DOC_WIDTH * 0.53, DOC_WIDTH * 0.38],
            repeatRows=1,
        )
        launch_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), HexColor("#1E293B")),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, -1), 8.6),
                    ("GRID", (0, 0), (-1, -1), 0.3, HexColor("#CBD5E1")),
                    ("LEFTPADDING", (0, 0), (-1, -1), 5),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ("BACKGROUND", (0, 1), (-1, 1), HexColor("#F8FAFC")),
                ]
            )
        )
        story.append(launch_tbl)
        story.append(Spacer(1, 8))
        story.append(Paragraph("Sources: VREB, CREA, NAR, Freddie Mac, Bank of Canada (latest available as of Feb 2026).", STYLES["Foot"]))

        doc.build(story, onFirstPage=page_decor, onLaterPages=page_decor)


if __name__ == "__main__":
    STYLESHEET = getSampleStyleSheet()
    STYLES = {
        "Title": ParagraphStyle(
            "TitleCustom",
            parent=STYLESHEET["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=28,
            textColor=HexColor("#0F172A"),
            spaceAfter=2,
        ),
        "SubTitle": ParagraphStyle(
            "SubTitleCustom",
            parent=STYLESHEET["Normal"],
            fontName="Helvetica",
            fontSize=11,
            leading=14,
            textColor=HexColor("#334155"),
            spaceAfter=8,
        ),
        "Section": ParagraphStyle(
            "SectionCustom",
            parent=STYLESHEET["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11.4,
            leading=14,
            textColor=HexColor("#0F172A"),
            spaceAfter=0,
        ),
        "Body": ParagraphStyle(
            "BodyCustom",
            parent=STYLESHEET["Normal"],
            fontName="Helvetica",
            fontSize=9.3,
            leading=12.8,
            textColor=HexColor("#0F172A"),
        ),
        "Metric": ParagraphStyle(
            "MetricCustom",
            parent=STYLESHEET["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            alignment=1,
            textColor=colors.white,
        ),
        "Foot": ParagraphStyle(
            "FootCustom",
            parent=STYLESHEET["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            leading=10,
            textColor=HexColor("#64748B"),
        ),
    }

    DOC_WIDTH = A4[0] - (14 * mm * 2)
    out = Path("trixode_outbound_playbook_real_estate_victoria_na.pdf")
    build_pdf(out)
    print(f"Practical styled PDF created: {out}")
