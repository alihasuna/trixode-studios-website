import { Progress } from "my-v0-project"

// Only classes already present in compiled.css are used as layout glue
// (see NOTES.md: Tailwind only emits what it saw at build time).

export const Default = () => (
	<div className="w-80">
		<Progress value={64} />
	</div>
)

export const Steps = () => (
	<div className="w-80 space-y-4">
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="font-medium">Discovery</span>
				<span className="text-muted-foreground tabular-nums">100%</span>
			</div>
			<Progress value={100} />
		</div>
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="font-medium">Solver implementation</span>
				<span className="text-muted-foreground tabular-nums">72%</span>
			</div>
			<Progress value={72} />
		</div>
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="font-medium">WebAssembly build</span>
				<span className="text-muted-foreground tabular-nums">35%</span>
			</div>
			<Progress value={35} />
		</div>
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="font-medium">Launch review</span>
				<span className="text-muted-foreground tabular-nums">0%</span>
			</div>
			<Progress value={0} />
		</div>
	</div>
)

export const Compact = () => (
	<div className="w-80 space-y-2">
		<div className="flex items-center justify-between text-xs text-muted-foreground">
			<span>Compiling plasma solver to WebAssembly</span>
			<span className="tabular-nums">48%</span>
		</div>
		<Progress value={48} className="h-2" />
	</div>
)
