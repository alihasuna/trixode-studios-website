import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Trixode — social card",
    robots: { index: false, follow: false },
}

export default function PrintSocialLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="bg-[#030303] text-white"
            style={{
                minHeight: "100vh",
                fontFeatureSettings: '"ss01", "cv11"',
            }}
        >
            {children}
        </div>
    )
}
