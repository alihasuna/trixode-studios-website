import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import {
    AUTONOMY_OPTIONS,
    DATA_CLASS_OPTIONS,
    INDUSTRY_OPTIONS,
    INFRA_OPTIONS,
    MATURITY_OPTIONS,
    SIZE_OPTIONS,
    TOOL_OPTIONS,
    fullSchema,
} from "@/app/lab/workflow/_components/schema"

const ADMIN_EMAIL = "hussienb@trixode-studios.com"
const FROM_ADDRESS = "Trixode Lab <lab@trixode-studios.com>"

const resend = new Resend(process.env.RESEND_API_KEY || "fallback-key-for-build")

function labelFor(options: { value: string; label: string }[], value: string) {
    return options.find((o) => o.value === value)?.label || value || "—"
}

function labelsFor(options: { value: string; label: string }[], values: string[]) {
    if (!values || values.length === 0) return "—"
    return values.map((v) => labelFor(options, v)).join(", ")
}

function escapeHtml(str: string) {
    return (str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const parsed = fullSchema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid submission", issues: parsed.error.issues },
                { status: 400 }
            )
        }

        if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "fallback-key-for-build") {
            console.error("Resend API key not configured")
            return NextResponse.json(
                {
                    error:
                        "Email service not configured. Please contact us directly at ceo@trixode-studios.com.",
                },
                { status: 500 }
            )
        }

        const { about, company, ai, workflow, security, intent } = parsed.data

        const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Vancouver" })

        const adminHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#030303;font-family:Inter,Arial,sans-serif;color:#fff;">
  <div style="max-width:680px;margin:0 auto;padding:40px 24px;">
    <h1 style="color:#3b82f6;font-size:24px;font-weight:300;margin:0 0 8px;letter-spacing:-0.01em;">New workflow submission</h1>
    <p style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 32px;">${submittedAt} · Trixode Lab</p>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">01 · About</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;width:160px;font-size:12px;">Name</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(about.name)}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;">Email</td><td style="padding:6px 0;color:#fff;font-size:15px;"><a href="mailto:${escapeHtml(about.email)}" style="color:#3b82f6;text-decoration:none;">${escapeHtml(about.email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;">Company</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(about.company)}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;">Role</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(about.role)}</td></tr>
    </table>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">02 · Company profile</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;width:160px;font-size:12px;">Industry</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelFor(INDUSTRY_OPTIONS, company.industry))}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;">Team size</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelFor(SIZE_OPTIONS, company.size))}</td></tr>
    </table>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">03 · AI footprint</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;width:160px;font-size:12px;">Maturity</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelFor(MATURITY_OPTIONS, ai.maturity))}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;vertical-align:top;">Tools in use</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelsFor(TOOL_OPTIONS, ai.tools))}</td></tr>
    </table>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">04 · Workflow & data</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;width:160px;font-size:12px;">Autonomy</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelFor(AUTONOMY_OPTIONS, workflow.autonomy))}</td></tr>
      <tr><td style="padding:6px 0;color:#888;font-size:12px;vertical-align:top;">Data classes</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelsFor(DATA_CLASS_OPTIONS, workflow.dataClasses))}</td></tr>
    </table>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">05 · Infrastructure & security</h2>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#888;width:160px;font-size:12px;vertical-align:top;">Requirements</td><td style="padding:6px 0;color:#fff;font-size:15px;">${escapeHtml(labelsFor(INFRA_OPTIONS, security.infra))}</td></tr>
    </table>

    <h2 style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;margin:32px 0 16px;">06 · What they're trying to figure out</h2>
    <div style="background:rgba(59,130,246,0.04);border:1px solid rgba(255,255,255,0.08);padding:16px 18px;border-radius:8px;font-size:15px;line-height:1.6;color:#ddd;white-space:pre-wrap;">${escapeHtml(intent.goal || "—")}</div>
    ${intent.url ? `<p style="color:#888;font-size:12px;margin-top:12px;">Link: <a href="${escapeHtml(intent.url)}" style="color:#3b82f6;">${escapeHtml(intent.url)}</a></p>` : ""}

    <div style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);color:#555;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;">
      Trixode-Studios · Lab · ${submittedAt}
    </div>
  </div>
</body>
</html>`

        await resend.emails.send({
            from: FROM_ADDRESS,
            to: ADMIN_EMAIL,
            replyTo: about.email,
            subject: `🧪 Lab workflow: ${about.name} · ${about.company}`,
            html: adminHtml,
        })

        const userHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#030303;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#030303;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
        <tr><td style="padding:40px;border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="color:#3b82f6;font-size:11px;text-transform:uppercase;letter-spacing:0.22em;margin:0 0 12px;">Trixode Lab</p>
          <h1 style="color:#fff;font-size:28px;font-weight:300;margin:0;letter-spacing:-0.01em;line-height:1.2;">Thanks${about.name ? `, ${escapeHtml(about.name.split(" ")[0])}` : ""}.</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="color:#bbb;font-size:16px;line-height:1.7;margin:0 0 20px;font-weight:300;">
            Your workflow notes are in. We've got everything we need to give you a useful first read.
          </p>
          <p style="color:#bbb;font-size:16px;line-height:1.7;margin:0 0 20px;font-weight:300;">
            What happens next: within a day, one of us will write back with what we'd measure first,
            what we wouldn't touch yet, and whether it makes sense to set up a short call.
          </p>
          <p style="color:#bbb;font-size:16px;line-height:1.7;margin:0;font-weight:300;">
            No decks, no boilerplate.
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px 40px;">
          <p style="color:#666;font-size:14px;line-height:1.7;margin:0;font-weight:300;">
            — The Trixode Lab team<br />
            <a href="mailto:ceo@trixode-studios.com" style="color:#3b82f6;text-decoration:none;">ceo@trixode-studios.com</a>
          </p>
        </td></tr>
        <tr><td style="padding:20px 40px;background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);">
          <p style="color:#444;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;margin:0;">
            Trixode-Studios Inc. · Victoria, BC
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

        await resend.emails.send({
            from: FROM_ADDRESS,
            to: about.email,
            subject: "We got your workflow notes — Trixode Lab",
            html: userHtml,
        })

        return NextResponse.json(
            { success: true, message: "Submission received." },
            { status: 200 }
        )
    } catch (error) {
        console.error("lab-workflow submission error:", error)
        return NextResponse.json(
            { error: "Failed to submit. Please email ceo@trixode-studios.com directly." },
            { status: 500 }
        )
    }
}
