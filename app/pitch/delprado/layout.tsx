import type { Metadata } from "next"

// Confidential client proposal — keep out of search indexes (matches the Maz/Adriftwood pattern).
export const metadata: Metadata = {
  title: "Delprado Studio — Private Proposal | Trixode Studios",
  description: "A confidential brand, strategy & web proposal prepared exclusively for Delprado Studio.",
  robots: { index: false, follow: false, nocache: true },
}

export default function DelpradoProposalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
