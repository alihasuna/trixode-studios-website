import { Toggle } from "my-v0-project"
import { AlignCenter, AlignLeft, Bold, Grid3x3, Italic, Ruler, Underline } from "lucide-react"

// No pressed/on story: `data-[state=on]:bg-accent` resolves to
// hsl(var(--accent)) and the derived dark :root sets --accent to the RAW hex
// #3b82f6 (the custom-token system's --accent shadowing the shadcn HSL triplet
// of the same name), so hsl(#3b82f6) is invalid and bg-accent paints nothing.
// A pressed Toggle is therefore pixel-identical to an unpressed one.
// See .design-sync/learnings/forms.md -- this is DS-level, not preview-level.

export const Variants = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Toggle>Wireframe</Toggle>
		<Toggle variant="outline">Snap to grid</Toggle>
	</div>
)

export const Sizes = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Toggle variant="outline" size="sm">
			Small
		</Toggle>
		<Toggle variant="outline" size="default">
			Default
		</Toggle>
		<Toggle variant="outline" size="lg">
			Large
		</Toggle>
	</div>
)

export const Disabled = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Toggle variant="outline">Bloom</Toggle>
		<Toggle variant="outline" disabled>
			Bloom
		</Toggle>
		<Toggle>Trails</Toggle>
		<Toggle disabled>Trails</Toggle>
	</div>
)

export const IconToggles = () => (
	<div className="flex flex-wrap items-center gap-2">
		<Toggle variant="outline" aria-label="Bold">
			<Bold />
		</Toggle>
		<Toggle variant="outline" aria-label="Italic">
			<Italic />
		</Toggle>
		<Toggle variant="outline" aria-label="Underline">
			<Underline />
		</Toggle>
		<Toggle variant="outline" aria-label="Align left">
			<AlignLeft />
		</Toggle>
		<Toggle variant="outline" aria-label="Align center">
			<AlignCenter />
		</Toggle>
	</div>
)

export const WithLabel = () => (
	<div className="flex flex-wrap items-center gap-3">
		<Toggle variant="outline">
			<Grid3x3 />
			Grid
		</Toggle>
		<Toggle variant="outline">
			<Ruler />
			Rulers
		</Toggle>
	</div>
)
