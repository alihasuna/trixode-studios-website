import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PREVIEW_AUTH_HASH, PREVIEW_COOKIE, sha256Hex } from "@/lib/preview-auth"

// Temporary: serve the under-construction page on every route except the
// canonical Hussien identity hub. Delete this file to bring the full site back.
//
// A valid preview cookie (set via /preview) bypasses the holding page and
// serves the full site — see lib/preview-auth.ts.
export default async function proxy(request: NextRequest) {
    // Launch switch: set PUBLIC_SITE_OPEN=1 in the deployment environment (and
    // redeploy) to retire the holding page without a code change.
    if (process.env.PUBLIC_SITE_OPEN === "1") {
        return NextResponse.next()
    }

    // Local development only: `PREVIEW_BYPASS=1 npm run dev` skips the gate so
    // the full site can be previewed without the password. NODE_ENV is
    // "production" in every deployed build, so this can never open the public
    // site.
    if (process.env.NODE_ENV === "development" && process.env.PREVIEW_BYPASS === "1") {
        return NextResponse.next()
    }

    const cookie = request.cookies.get(PREVIEW_COOKIE)?.value
    if (cookie && (await sha256Hex(cookie)) === PREVIEW_AUTH_HASH) {
        return NextResponse.next()
    }

    const url = request.nextUrl.clone()
    url.pathname = "/under-construction"
    return NextResponse.rewrite(url)
}

export const config = {
    // Everything except the holding page, the public identity hub, the preview
    // gate, API routes, Next internals, and static files (anything with a file
    // extension).
    matcher: ["/((?!under-construction|hussien(?:/.*)?|preview(?:/.*)?|api|_next|.*\\..*).*)"],
}
