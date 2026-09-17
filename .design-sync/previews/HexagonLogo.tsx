import { HexagonLogo } from "my-v0-project"

// HexagonLogo is the Trixode brand mark: a stroked hexagon with six spokes and
// seven vertex dots, all locked to `text-blue-400`. Its `size` prop drives an
// inline width/height (and the 0.35 * size circumradius), so the scale axis
// below is CSS-independent. It defaults to 32px, which is why the floor card
// read as near-empty — the mark needs to be shown at real display sizes.

export const Sizes = () => (
	<div className="flex items-end gap-8">
		<div className="flex flex-col items-center gap-2">
			<HexagonLogo size={32} />
			<span className="text-xs font-mono text-muted-foreground">32</span>
		</div>
		<div className="flex flex-col items-center gap-2">
			<HexagonLogo size={64} />
			<span className="text-xs font-mono text-muted-foreground">64</span>
		</div>
		<div className="flex flex-col items-center gap-2">
			<HexagonLogo size={128} />
			<span className="text-xs font-mono text-muted-foreground">128</span>
		</div>
	</div>
)

export const Lockup = () => (
	<div className="flex flex-col gap-6">
		<div className="flex items-center gap-3">
			<HexagonLogo size={40} />
			<span className="font-grotesk text-lg font-bold tracking-tight">
				Trixode Studios
			</span>
		</div>
		<div className="flex items-center gap-4">
			<HexagonLogo size={72} />
			<div className="flex flex-col">
				<span className="font-grotesk text-2xl font-bold tracking-tight">
					Trixode Studios
				</span>
				<span className="text-xs uppercase tracking-widest text-muted-foreground">
					Simulations · Brand systems · AI products
				</span>
			</div>
		</div>
	</div>
)

export const NavMark = () => (
	<div
		className="flex w-full items-center justify-between gap-4 border-b pb-4"
		style={{ minWidth: 280 }}
	>
		<div className="flex items-center gap-2">
			<HexagonLogo size={28} />
			<span className="font-grotesk text-sm font-bold tracking-tight">
				Trixode
			</span>
		</div>
		<div className="flex items-center gap-4">
			<span className="text-sm text-muted-foreground">Work</span>
			<span className="text-sm text-muted-foreground">Pricing</span>
			<span className="text-sm font-medium">Contact</span>
		</div>
	</div>
)

export const Oversized = () => (
	<div className="flex items-center justify-center" style={{ minHeight: 200 }}>
		<HexagonLogo size={180} />
	</div>
)
