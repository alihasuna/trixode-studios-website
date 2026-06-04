/**
 * Lightweight, dependency-free anti-spam helpers for public form endpoints.
 *
 * Layers (use together — each catches a different kind of bot):
 *   1. Honeypot   — a hidden field real users never fill (see isHoneypotFilled)
 *   2. Timing     — humans take a few seconds; instant submits are bots (see isTooFast)
 *   3. Rate limit — caps submissions per IP to stop floods (see checkRateLimit)
 *   4. Heuristics — blocks link-stuffed / keyword spam (see looksLikeSpam)
 *
 * Note: checkRateLimit is in-memory and therefore per-serverless-instance.
 * It blunts floods but is not a global counter. For hard guarantees across
 * all instances, back it with Upstash/Redis later — the signature can stay.
 */

/* ------------------------------------------------------------------ */
/*  1. Honeypot                                                         */
/* ------------------------------------------------------------------ */

/** True when the hidden honeypot field has any content — a bot filled it. */
export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0
}

/* ------------------------------------------------------------------ */
/*  2. Timing                                                           */
/* ------------------------------------------------------------------ */

/**
 * elapsedMs is measured on the client (Date.now() at submit minus Date.now()
 * at form mount), so it is immune to clock skew. Real users take >3s; bots
 * that POST directly omit it entirely (treated as too fast).
 */
export function isTooFast(elapsedMs: unknown, minMs = 3000): boolean {
  const n = typeof elapsedMs === "number" ? elapsedMs : Number(elapsedMs)
  if (!Number.isFinite(n)) return true // missing/garbage → direct bot POST
  return n < minMs
}

/* ------------------------------------------------------------------ */
/*  3. Rate limiting (in-memory sliding window)                         */
/* ------------------------------------------------------------------ */

const hits = new Map<string, number[]>()

/** Returns true if allowed, false if the IP is over the limit. */
export function checkRateLimit(
  ip: string,
  max = 5,
  windowMs = 10 * 60 * 1000,
): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs)

  if (recent.length >= max) {
    hits.set(ip, recent)
    return false
  }

  recent.push(now)
  hits.set(ip, recent)

  // Opportunistic cleanup so the map can't grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      const live = times.filter((t) => now - t < windowMs)
      if (live.length === 0) hits.delete(key)
      else hits.set(key, live)
    }
  }

  return true
}

/** Best-effort client IP from common proxy headers (Vercel sets these). */
export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return headers.get("x-real-ip") || "unknown"
}

/* ------------------------------------------------------------------ */
/*  4. Content heuristics                                               */
/* ------------------------------------------------------------------ */

const SPAM_KEYWORDS =
  /\b(viagra|cialis|casino|porn|escort|crypto\s*airdrop|forex|loan\s*offer|seo\s*(services|expert|agency)|guest\s*post|backlinks?|buy\s*now|act\s*now|limited\s*time\s*offer|work\s*from\s*home|make\s*money\s*(fast|online))\b/i

function countLinks(s: string): number {
  const urls = (s.match(/https?:\/\//gi) || []).length
  const bbcode = (s.match(/\[url/gi) || []).length
  const anchors = (s.match(/<a\s/gi) || []).length
  return urls + bbcode + anchors
}

/**
 * Conservative content check — tuned to avoid blocking real clients who
 * paste a single link. Returns a reason string when it looks like spam,
 * otherwise null.
 */
export function looksLikeSpam(input: {
  name?: string
  email?: string
  message?: string
}): string | null {
  const name = (input.name || "").trim()
  const message = (input.message || "").trim()

  // Absurd field sizes — real names/messages aren't this long.
  if (name.length > 100) return "name too long"
  if (message.length > 5000) return "message too long"

  // A name should never contain a URL or markup.
  if (countLinks(name) > 0 || /[<>]/.test(name)) return "links/markup in name"

  // Link-stuffing is the #1 tell of automated spam.
  if (countLinks(message) > 4) return "too many links"

  // Classic spam vocabulary.
  if (SPAM_KEYWORDS.test(name) || SPAM_KEYWORDS.test(message))
    return "spam keywords"

  return null
}
