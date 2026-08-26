import { NextResponse } from "next/server"
import { PREVIEW_AUTH_HASH, PREVIEW_COOKIE, sha256Hex } from "@/lib/preview-auth"

export async function POST(request: Request) {
    const form = await request.formData()
    const key = String(form.get("key") ?? "")
    const cookieValue = await sha256Hex(key)

    if ((await sha256Hex(cookieValue)) === PREVIEW_AUTH_HASH) {
        const res = NextResponse.redirect(new URL("/", request.url), 303)
        res.headers.set("Cache-Control", "no-store")
        res.cookies.set(PREVIEW_COOKIE, cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 14,
        })
        return res
    }

    const res = NextResponse.redirect(new URL("/preview?e=1", request.url), 303)
    res.headers.set("Cache-Control", "no-store")
    return res
}
