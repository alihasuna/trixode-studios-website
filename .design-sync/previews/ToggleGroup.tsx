import { ToggleGroup, ToggleGroupItem } from "my-v0-project"

// Radix's ToggleGroup Root REQUIRES `type` -- omitting it throws at runtime.
// defaultValue is set so an item carries data-[state=on].
//
// Known limitation, not an authoring miss: the selected treatment is
// `data-[state=on]:bg-accent`, and `--accent` is `#3b82f6` in this palette, so
// `hsl(var(--accent))` is invalid and the fill is transparent; the paired
// `text-accent-foreground` (0 0% 98%) is indistinguishable from the default
// foreground. See .design-sync/learnings/layout.md.

export const Single = () => (
	<ToggleGroup type="single" defaultValue="grid" variant="outline">
		<ToggleGroupItem value="list" aria-label="List view">
			List
		</ToggleGroupItem>
		<ToggleGroupItem value="grid" aria-label="Grid view">
			Grid
		</ToggleGroupItem>
		<ToggleGroupItem value="timeline" aria-label="Timeline view">
			Timeline
		</ToggleGroupItem>
	</ToggleGroup>
)

export const Multiple = () => (
	<ToggleGroup
		type="multiple"
		defaultValue={["bloom", "grid"]}
		variant="outline"
	>
		<ToggleGroupItem value="bloom" aria-label="Toggle bloom">
			Bloom
		</ToggleGroupItem>
		<ToggleGroupItem value="grid" aria-label="Toggle grid">
			Grid
		</ToggleGroupItem>
		<ToggleGroupItem value="trails" aria-label="Toggle particle trails">
			Trails
		</ToggleGroupItem>
	</ToggleGroup>
)

export const Sizes = () => (
	<div className="flex flex-col items-start gap-4">
		<ToggleGroup type="single" defaultValue="native" size="sm" variant="outline">
			<ToggleGroupItem value="native">Native</ToggleGroupItem>
			<ToggleGroupItem value="wasm">WebAssembly</ToggleGroupItem>
		</ToggleGroup>
		<ToggleGroup type="single" defaultValue="native" variant="outline">
			<ToggleGroupItem value="native">Native</ToggleGroupItem>
			<ToggleGroupItem value="wasm">WebAssembly</ToggleGroupItem>
		</ToggleGroup>
		<ToggleGroup type="single" defaultValue="native" size="lg" variant="outline">
			<ToggleGroupItem value="native">Native</ToggleGroupItem>
			<ToggleGroupItem value="wasm">WebAssembly</ToggleGroupItem>
		</ToggleGroup>
	</div>
)
