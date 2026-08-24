import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Temporary: serve the under-construction page on every route.
// Delete this file to bring the full site back.
export default function proxy(request: NextRequest) {
    const url = request.nextUrl.clone()
    url.pathname = "/under-construction"
    return NextResponse.rewrite(url)
}

export const config = {
    // Everything except the holding page itself, API routes, Next internals,
    // and static files (anything with a file extension, e.g. favicon, images).
    matcher: ["/((?!under-construction|api|_next|.*\\..*).*)"],
}
