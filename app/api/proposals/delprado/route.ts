import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  isHoneypotFilled,
  isTooFast,
  checkRateLimit,
  getClientIp,
  looksLikeSpam,
} from '@/lib/anti-spam'

// Initialize Resend with fallback for build time (same pattern as app/api/contact/route.ts)
const resend = new Resend(process.env.RESEND_API_KEY || 'fallback-key-for-build')

// Where Delprado's discovery answers land. Defaults to the same inbox as the
// contact form; override with DELPRADO_NOTIFY_TO if you'd rather route it to
// ceo@trixode-studios.com or another address.
const NOTIFY_TO = process.env.DELPRADO_NOTIFY_TO || 'hussienballouk@protonmail.com'

// Generic success used when we silently swallow a spam submission so bots
// can't tell they were caught (mirrors the contact route).
const SILENT_OK = NextResponse.json({ success: true }, { status: 200 })

type AnswerEntry = { question?: string; answer?: string }

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, contactPref, answers, elapsedMs } = body as {
      name?: string
      email?: string
      company?: string
      contactPref?: string
      answers?: Record<string, AnswerEntry>
      elapsedMs?: number
    }

    // --- Anti-spam layer 1: honeypot (hidden `company` field) ----------
    if (isHoneypotFilled(company)) {
      console.warn('[delprado] honeypot triggered', { ip: getClientIp(request.headers) })
      return SILENT_OK
    }

    // --- Anti-spam layer 2: timing -------------------------------------
    if (isTooFast(elapsedMs)) {
      console.warn('[delprado] too-fast submit blocked', { elapsedMs, ip: getClientIp(request.headers) })
      return SILENT_OK
    }

    // --- Anti-spam layer 3: rate limit ---------------------------------
    const ip = getClientIp(request.headers)
    if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many submissions. Please try again in a few minutes.' }, { status: 429 })
    }

    // --- Validate: we need a way to reply ------------------------------
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'An email is required so we can reply.' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Normalize answers into an ordered list (q1..q8).
    const entries = Object.entries(answers || {})
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => ({ key, question: (v?.question || '').trim(), answer: (v?.answer || '').trim() }))

    // Require at least one substantive answer so empty/bot posts don't notify.
    const filled = entries.filter((e) => e.answer.length > 0)
    if (filled.length === 0) {
      return NextResponse.json({ error: 'Please answer at least one question before sending.' }, { status: 400 })
    }

    // --- Anti-spam layer 4: content heuristics (links/keywords only;
    //     length is intentionally ignored — long, thoughtful answers are good) ---
    const joined = filled.map((e) => e.answer).join('\n').slice(0, 4000)
    const spamReason = looksLikeSpam({ name: name || '', message: joined })
    if (spamReason && spamReason !== 'message too long') {
      console.warn('[delprado] heuristic spam blocked', { spamReason, ip })
      return SILENT_OK
    }

    // --- Resend configured? --------------------------------------------
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'fallback-key-for-build') {
      console.error('[delprado] Resend API key not configured')
      return NextResponse.json(
        { error: 'Submission service not configured. Please email us at contact@trixode-studios.com.' },
        { status: 500 },
      )
    }

    const clientName = (name || '').trim() || 'Delprado Studio'

    // Branded notification with every answer.
    const answersHtml = entries
      .map(
        (e) => `
          <div style="margin: 0 0 22px;">
            <p style="color:#60a5fa; font-size:13px; font-weight:600; margin:0 0 6px; line-height:1.5;">${esc(e.question)}</p>
            <div style="background:#0a0f1c; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:14px 16px; color:#e8eaed; font-size:14px; line-height:1.6;">
              ${e.answer ? esc(e.answer).replace(/\n/g, '<br>') : '<span style="color:rgba(255,255,255,0.3);">— left blank —</span>'}
            </div>
          </div>`,
      )
      .join('')

    const notificationEmail = await resend.emails.send({
      from: 'contact@trixode-studios.com',
      to: NOTIFY_TO,
      replyTo: email,
      subject: `Delprado discovery answers — ${clientName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width:640px; margin:0 auto; background:#030712; padding:32px; border-radius:16px;">
          <h2 style="color:#3b82f6; font-size:18px; margin:0 0 4px;">New Delprado proposal responses</h2>
          <p style="color:rgba(255,255,255,0.55); font-size:13px; margin:0 0 24px;">Submitted via /pitch/delprado</p>
          <table style="width:100%; border-collapse:collapse; margin:0 0 24px;">
            <tr><td style="color:rgba(255,255,255,0.5); font-size:13px; padding:4px 0; width:120px;">Name</td><td style="color:#ffffff; font-size:14px;">${esc(clientName)}</td></tr>
            <tr><td style="color:rgba(255,255,255,0.5); font-size:13px; padding:4px 0;">Email</td><td style="color:#ffffff; font-size:14px;">${esc(email)}</td></tr>
            ${contactPref ? `<tr><td style="color:rgba(255,255,255,0.5); font-size:13px; padding:4px 0;">Prefers</td><td style="color:#ffffff; font-size:14px;">${esc(contactPref)}</td></tr>` : ''}
          </table>
          <hr style="border:none; border-top:1px solid rgba(255,255,255,0.1); margin:0 0 24px;" />
          ${answersHtml}
        </div>
      `,
    })

    // Branded auto-reply to the client.
    const autoReply = await resend.emails.send({
      from: 'Trixode Studios <noreply@trixode-studios.com>',
      to: email,
      subject: 'We have your answers — Trixode Studios',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="margin:0; padding:0; background:#030712; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#030712; padding:40px 20px;">
            <tr><td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#030303; border:1px solid #1a1a1a; border-radius:20px;">
                <tr><td style="padding:36px 36px 8px; text-align:center;">
                  <span style="color:#ffffff; font-size:16px; font-weight:600; letter-spacing:-0.3px;">Trixode&nbsp;Studios</span>
                </td></tr>
                <tr><td style="padding:8px 36px 28px;">
                  <p style="color:#ffffff; font-size:18px; font-weight:300; line-height:1.5; margin:0 0 16px;">Thank you, ${esc(clientName)}.</p>
                  <p style="color:#cccccc; font-size:15px; font-weight:300; line-height:1.65; margin:0 0 16px;">
                    We've received your answers and we'll read every word. The clearer your vision, the sharper what we build —
                    so this is exactly where the good work starts.
                  </p>
                  <p style="color:#cccccc; font-size:15px; font-weight:300; line-height:1.65; margin:0 0 16px;">
                    We'll come back to you shortly with a refined direction built around what you told us. In the meantime,
                    if anything else comes to mind, just reply to this email.
                  </p>
                  <p style="color:#aaaaaa; font-size:14px; font-weight:300; line-height:1.6; margin:24px 0 0;">
                    Hussien Ballouk<br>
                    <span style="color:#3b82f6; font-size:13px;">Founder, Trixode-Studios Inc.</span>
                  </p>
                </td></tr>
                <tr><td style="padding:0 36px 32px; text-align:center;">
                  <p style="color:#555555; font-size:11px; line-height:1.6; margin:0;">© 2026 Trixode-Studios Inc. · Victoria, BC</p>
                </td></tr>
              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `,
      headers: { 'X-Mailer': 'Trixode Studios — Delprado Proposal' },
    })

    console.log('[delprado] sent', { notificationEmail, autoReply })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[delprado] submission error:', error)
    return NextResponse.json(
      { error: 'Failed to send. Please try again or email us at contact@trixode-studios.com.' },
      { status: 500 },
    )
  }
}
