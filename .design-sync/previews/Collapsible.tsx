import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "my-v0-project"

// Collapsible's three exports are unstyled Radix primitives -- the DS carries
// no classes of its own here, so the idiomatic composition is
// CollapsibleTrigger asChild around a real DS Button. defaultOpen so the
// content is visible in the capture.

export const Default = () => (
	<Collapsible defaultOpen className="w-80 space-y-2">
		<div className="flex items-center justify-between">
			<h4 className="text-sm font-semibold font-grotesk">Build targets</h4>
			<CollapsibleTrigger asChild>
				<Button variant="ghost" size="sm">
					Toggle
				</Button>
			</CollapsibleTrigger>
		</div>
		<div className="rounded-md border px-4 py-3 text-sm">native / CMake</div>
		<CollapsibleContent className="space-y-2">
			<div className="rounded-md border px-4 py-3 text-sm">
				wasm / emscripten
			</div>
			<div className="rounded-md border px-4 py-3 text-sm">
				headless / CI capture
			</div>
		</CollapsibleContent>
	</Collapsible>
)

export const Details = () => (
	<Collapsible defaultOpen className="w-80 space-y-3">
		<CollapsibleTrigger asChild>
			<Button variant="outline" className="w-full justify-between">
				Run configuration
				<span className="text-muted-foreground text-xs">3 settings</span>
			</Button>
		</CollapsibleTrigger>
		<CollapsibleContent>
			<div className="rounded-md border p-4 space-y-2 text-sm">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Particles</span>
					<span className="tabular-nums">262,144</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Timestep</span>
					<span className="tabular-nums">1.0e-9 s</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Seed</span>
					<span className="tabular-nums">0x5F3759DF</span>
				</div>
			</div>
		</CollapsibleContent>
	</Collapsible>
)
