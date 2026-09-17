import { Badge } from "my-v0-project"

// Badge is the site's status vocabulary — it labels engagement state in the
// projects table and tags stack items on the pricing page. Only utility
// classes already present in .design-sync/compiled.css are used as glue.

export const Variants = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Badge>Shipped</Badge>
		<Badge variant="secondary">In review</Badge>
		<Badge variant="destructive">Blocked</Badge>
		<Badge variant="outline">Scoping</Badge>
	</div>
)

export const ProjectStatus = () => (
	<div className="flex flex-col gap-3">
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm font-medium">Morphika</span>
			<Badge>Shipped</Badge>
		</div>
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm font-medium">Fusor Simulation</span>
			<Badge variant="secondary">In review</Badge>
		</div>
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm font-medium">Adriftwood Brand System</span>
			<Badge variant="outline">Scoping</Badge>
		</div>
		<div className="flex items-center justify-between gap-4">
			<span className="text-sm font-medium">Intellicycle Rollout</span>
			<Badge variant="destructive">Blocked</Badge>
		</div>
	</div>
)

export const StackTags = () => (
	<div className="flex flex-col gap-3">
		<span className="text-xs uppercase tracking-widest text-muted-foreground">
			Simulation engine
		</span>
		<div className="flex flex-wrap items-center gap-2">
			<Badge variant="secondary">C++17</Badge>
			<Badge variant="secondary">raylib 5.5</Badge>
			<Badge variant="secondary">WebAssembly</Badge>
			<Badge variant="secondary">60fps</Badge>
			<Badge variant="outline">+4 more</Badge>
		</div>
	</div>
)

export const Inline = () => (
	<p className="text-sm leading-relaxed text-muted-foreground">
		The WebGL renderer is <Badge variant="outline">experimental</Badge> and
		falls back to the Canvas2D solver on hardware without float textures.
	</p>
)
