import { Separator } from "my-v0-project"

// Separator paints a 1px bg-border rule and nothing else, so every cell gives
// it an explicit box (inline style) plus real content on both sides -- a bare
// <Separator /> in an auto-height card collapses to an invisible hairline.

export const Horizontal = () => (
	<div className="w-80">
		<div className="space-y-1">
			<h4 className="text-sm font-medium font-grotesk">Trixode Studios</h4>
			<p className="text-sm text-muted-foreground">
				Simulation, brand systems, and AI products.
			</p>
		</div>
		<Separator className="mt-4 mb-4" />
		<div className="space-y-2 text-sm">
			<div>Morphika</div>
			<div>Fusor simulation</div>
			<div>Brand kit</div>
		</div>
	</div>
)

export const Vertical = () => (
	<div className="flex items-center text-sm" style={{ height: 28 }}>
		<span>Docs</span>
		<Separator
			orientation="vertical"
			style={{ height: 20, marginLeft: 16, marginRight: 16 }}
		/>
		<span>Simulations</span>
		<Separator
			orientation="vertical"
			style={{ height: 20, marginLeft: 16, marginRight: 16 }}
		/>
		<span>Careers</span>
	</div>
)

export const InList = () => (
	<div className="w-80 text-sm">
		<div className="flex items-center justify-between py-3">
			<span>Particle count</span>
			<span className="text-muted-foreground tabular-nums">262,144</span>
		</div>
		<Separator />
		<div className="flex items-center justify-between py-3">
			<span>Frame budget</span>
			<span className="text-muted-foreground tabular-nums">16.6 ms</span>
		</div>
		<Separator />
		<div className="flex items-center justify-between py-3">
			<span>Renderer</span>
			<span className="text-muted-foreground">raylib / WebGL2</span>
		</div>
	</div>
)
