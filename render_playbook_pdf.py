#!/usr/bin/env python3

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path
from typing import List, Sequence

from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


def inline_format(text: str) -> str:
    """Escape text for ReportLab paragraph XML and style inline code."""
    parts = re.split(r"(`[^`]+`)", text)
    out: List[str] = []
    for part in parts:
        if part.startswith("`") and part.endswith("`"):
            code_text = html.escape(part[1:-1])
            out.append(f"<font name='Courier'>{code_text}</font>")
        else:
            out.append(html.escape(part))
    return "".join(out)


def split_markdown_row(row: str) -> List[str]:
    trimmed = row.strip().strip("|")
    cells = [cell.strip() for cell in trimmed.split("|")]
    return cells


def is_separator_row(cells: Sequence[str]) -> bool:
    for cell in cells:
        token = cell.replace(":", "").replace("-", "").strip()
        if token:
            return False
    return True


def build_table(
    table_lines: Sequence[str],
    doc_width: float,
    header_style: ParagraphStyle,
    cell_style: ParagraphStyle,
):
    rows = [split_markdown_row(line) for line in table_lines if line.strip()]
    if not rows:
        return None

    if len(rows) > 1 and is_separator_row(rows[1]):
        rows.pop(1)

    num_cols = max(len(r) for r in rows)
    normalized: List[List[str]] = []
    for row in rows:
        normalized.append(row + [""] * (num_cols - len(row)))

    char_weights = [1] * num_cols
    for c in range(num_cols):
        max_len = 1
        for row in normalized[: min(len(normalized), 40)]:
            max_len = max(max_len, len(row[c]))
        char_weights[c] = max_len

    total_weight = sum(char_weights)
    widths = [doc_width * (w / total_weight) for w in char_weights]

    min_col = 45
    widths = [max(min_col, w) for w in widths]
    width_total = sum(widths)
    if width_total > doc_width:
        scale = doc_width / width_total
        widths = [w * scale for w in widths]

    data = []
    for ridx, row in enumerate(normalized):
        row_data = []
        for col in row:
            txt = inline_format(col)
            row_data.append(Paragraph(txt, header_style if ridx == 0 else cell_style))
        data.append(row_data)

    table = Table(data, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), HexColor("#0F172A")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.3, HexColor("#CBD5E1")),
                ("LINEBELOW", (0, 0), (-1, 0), 0.7, HexColor("#0EA5E9")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
            + [
                (
                    "BACKGROUND",
                    (0, row),
                    (-1, row),
                    HexColor("#F8FAFC") if row % 2 == 1 else colors.white,
                )
                for row in range(1, len(data))
            ]
        )
    )
    return table


def page_chrome(canvas, doc):
    canvas.saveState()

    page_w, page_h = A4

    canvas.setFillColor(HexColor("#F1F5F9"))
    canvas.rect(0, page_h - 30, page_w, 30, stroke=0, fill=1)

    canvas.setFillColor(HexColor("#0F172A"))
    canvas.setFont("Helvetica-Bold", 9)
    canvas.drawString(doc.leftMargin, page_h - 19, "Trixode Studios")

    canvas.setFillColor(HexColor("#334155"))
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(page_w - doc.rightMargin, page_h - 19, "Outbound Playbook - Real Estate")

    canvas.setStrokeColor(HexColor("#CBD5E1"))
    canvas.setLineWidth(0.6)
    canvas.line(doc.leftMargin, 20, page_w - doc.rightMargin, 20)

    canvas.setFillColor(HexColor("#64748B"))
    canvas.setFont("Helvetica", 8)
    canvas.drawString(doc.leftMargin, 9, "Updated: Feb 2026")
    canvas.drawRightString(page_w - doc.rightMargin, 9, f"Page {doc.page}")

    canvas.restoreState()


def build_pdf(markdown_path: Path, pdf_path: Path) -> None:
    lines = markdown_path.read_text(encoding="utf-8").splitlines()

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=13,
            textColor=HexColor("#1E293B"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H1",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=28,
            textColor=HexColor("#0F172A"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=HexColor("#0F172A"),
            spaceBefore=8,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H3",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=HexColor("#1D4ED8"),
            spaceBefore=6,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BulletList",
            parent=styles["Body"],
            leftIndent=11,
            bulletIndent=0,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHeader",
            parent=styles["Body"],
            fontName="Helvetica-Bold",
            textColor=colors.white,
            fontSize=8.6,
            leading=11,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            parent=styles["Body"],
            fontSize=8.5,
            leading=11,
            textColor=HexColor("#0F172A"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtle",
            parent=styles["Body"],
            fontSize=10,
            leading=14,
            textColor=HexColor("#334155"),
        )
    )

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        rightMargin=14 * mm,
        leftMargin=14 * mm,
        topMargin=20 * mm,
        bottomMargin=18 * mm,
        title="Trixode Outbound Playbook",
        author="Trixode Studios",
    )

    story = []

    title = "Trixode Outbound Sales Playbook"
    subtitle = ""
    start_idx = 0

    for idx, line in enumerate(lines):
        if line.startswith("# "):
            title = line[2:].strip()
            start_idx = idx + 1
            break

    for idx in range(start_idx, len(lines)):
        if lines[idx].strip():
            subtitle = lines[idx].strip()
            start_idx = idx + 1
            break

    story.append(Spacer(1, 14))
    story.append(Paragraph(inline_format(title), styles["H1"]))
    if subtitle:
        story.append(Paragraph(inline_format(subtitle), styles["Subtle"]))
        story.append(Spacer(1, 8))

    hero_card = Table(
        [[Paragraph("Actionable outbound system with live Victoria + North America real estate data.", styles["Body"])]],
        colWidths=[doc.width],
    )
    hero_card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), HexColor("#E2E8F0")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW", (0, 0), (-1, -1), 0.8, HexColor("#0EA5E9")),
            ]
        )
    )
    story.append(hero_card)
    story.append(Spacer(1, 12))

    i = start_idx
    while i < len(lines):
        raw = lines[i].rstrip()
        stripped = raw.strip()

        if not stripped:
            i += 1
            story.append(Spacer(1, 2))
            continue

        if stripped == "---":
            story.append(Spacer(1, 4))
            story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#CBD5E1")))
            story.append(Spacer(1, 5))
            i += 1
            continue

        heading = re.match(r"^(#{1,3})\s+(.*)$", raw)
        if heading:
            level = len(heading.group(1))
            text = heading.group(2).strip()
            style = styles["H1"] if level == 1 else styles["H2"] if level == 2 else styles["H3"]
            story.append(Paragraph(inline_format(text), style))
            i += 1
            continue

        if raw.lstrip().startswith("|"):
            table_lines = []
            while i < len(lines) and lines[i].lstrip().startswith("|"):
                table_lines.append(lines[i])
                i += 1
            table = build_table(table_lines, doc.width, styles["TableHeader"], styles["TableCell"])
            if table:
                story.append(table)
                story.append(Spacer(1, 8))
            continue

        if stripped.startswith("- "):
            while i < len(lines) and lines[i].strip().startswith("- "):
                item = lines[i].strip()[2:].strip()
                story.append(Paragraph("• " + inline_format(item), styles["BulletList"]))
                i += 1
            story.append(Spacer(1, 4))
            continue

        para_lines = [raw]
        i += 1
        while i < len(lines):
            nxt = lines[i]
            nxt_strip = nxt.strip()
            if not nxt_strip:
                break
            if (
                nxt_strip == "---"
                or re.match(r"^(#{1,3})\s+", nxt)
                or nxt.lstrip().startswith("|")
                or nxt_strip.startswith("- ")
            ):
                break
            para_lines.append(nxt.rstrip())
            i += 1

        paragraph_text = " ".join(part.strip() for part in para_lines)
        story.append(Paragraph(inline_format(paragraph_text), styles["Body"]))
        story.append(Spacer(1, 2))

    doc.build(story, onFirstPage=page_chrome, onLaterPages=page_chrome)


def main() -> None:
    parser = argparse.ArgumentParser(description="Render markdown playbook to styled PDF.")
    parser.add_argument("input", type=Path, help="Input markdown path")
    parser.add_argument("output", type=Path, help="Output PDF path")
    args = parser.parse_args()

    build_pdf(args.input, args.output)
    print(f"Styled PDF created: {args.output}")


if __name__ == "__main__":
    main()
