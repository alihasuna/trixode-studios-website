import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Private Preview",
    robots: { index: false, follow: false },
}

export default async function PreviewLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ e?: string }>
}) {
    const { e } = await searchParams

    return (
        <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6">
            <div className="flex w-full max-w-sm flex-col items-center text-center">
                <p className="mb-8 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/40">
                    Trixode Studios
                </p>
                <h1 className="font-grotesk text-3xl font-light tracking-[-0.025em] text-white">
                    Private preview
                </h1>
                <p className="mt-3 text-sm font-light text-white/50">
                    Enter the password to view the full site.
                </p>

                <form method="POST" action="/preview/login" className="mt-10 flex w-full flex-col gap-3">
                    <input
                        type="password"
                        name="key"
                        autoFocus
                        autoComplete="current-password"
                        placeholder="Password"
                        className="h-11 w-full rounded-md border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#3b82f6]/60"
                    />
                    <button
                        type="submit"
                        className="h-11 w-full rounded-md bg-white/90 text-sm font-medium text-black transition-colors hover:bg-white"
                    >
                        Enter
                    </button>
                </form>

                <p className="mt-4 h-5 text-sm text-[#fbbf24]" aria-live="polite">
                    {e ? "Wrong password." : ""}
                </p>
            </div>
        </main>
    )
}
