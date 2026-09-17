import { Button } from "my-v0-project"

// Only classes that already exist in the compiled CSS are used for layout glue
// (flex, gap-*, items-center) -- see NOTES.md: Tailwind only emits what it saw.

export const Variants = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Button>Get started</Button>
		<Button variant="secondary">Learn more</Button>
		<Button variant="outline">View pricing</Button>
		<Button variant="ghost">Cancel</Button>
		<Button variant="destructive">Delete project</Button>
		<Button variant="link">Read the docs</Button>
	</div>
)

export const Sizes = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Button size="sm">Small</Button>
		<Button size="default">Default</Button>
		<Button size="lg">Large</Button>
	</div>
)

export const Disabled = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Button disabled>Get started</Button>
		<Button variant="outline" disabled>
			View pricing
		</Button>
		<Button variant="destructive" disabled>
			Delete project
		</Button>
	</div>
)
