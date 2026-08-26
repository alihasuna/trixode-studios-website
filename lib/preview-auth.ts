// Private-preview gate for the full site while the public sees /under-construction.
//
// This repo is public, so no secret lives here — only a double SHA-256 of the
// preview password. The login route verifies sha256(sha256(input)) against
// PREVIEW_AUTH_HASH and sets the intermediate hash sha256(password) in an
// HttpOnly cookie; proxy.ts re-hashes the cookie value on every request.
// Recovering the password or forging the cookie requires inverting SHA-256
// of a 64-bit random secret.

export const PREVIEW_COOKIE = "trx_preview"
export const PREVIEW_AUTH_HASH = "3b3200338741c1407ee0c7c0691bec2c182f0f11956521faa33f8943400fc355"

export async function sha256Hex(input: string): Promise<string> {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input))
    return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
}
