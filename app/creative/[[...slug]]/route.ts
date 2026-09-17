import { NextResponse } from "next/server"
import { CREATIVE_LIVE, CREATIVE_URL } from "@/lib/destinations"

// /creative and /creative/* on the studio host forward to the Creative
// destination, a separate deployment. This sits behind proxy.ts like every
// other route, so the public holding page still applies until launch.
export async function GET(request: Request, ctx: { params: Promise<{ slug?: string[] }> }) {
    if (!CREATIVE_LIVE) return NextResponse.redirect(new URL("/", request.url), 307)
    const { slug = [] } = await ctx.params
    const target = new URL(slug.length ? `${CREATIVE_URL}/${slug.join("/")}` : CREATIVE_URL)
    target.search = new URL(request.url).search
    return NextResponse.redirect(target, 307)
}
