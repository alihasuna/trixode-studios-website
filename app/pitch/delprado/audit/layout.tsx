import type { Metadata } from "next"

// Confidential client audit — keep out of search indexes (matches the Delprado/Maz pattern).
export const metadata: Metadata = {
  title: "Delprado Studio — Website Audit | Trixode Studios",
  description: "A confidential website audit prepared exclusively for Delprado Studio.",
  robots: { index: false, follow: false, nocache: true },
}

export default function DelpradoAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
