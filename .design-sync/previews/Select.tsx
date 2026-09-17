import {
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "my-v0-project"

// Compound: SelectTrigger/SelectValue/SelectContent/SelectItem only render
// inside Select. `Open` is the story that actually verifies the portalled
// content, SelectGroup/SelectLabel/SelectSeparator and the check indicator.

export const Default = () => (
	<Select>
		<SelectTrigger className="w-80">
			<SelectValue placeholder="Select an engagement type" />
		</SelectTrigger>
		<SelectContent>
			<SelectItem value="discovery">Discovery sprint</SelectItem>
			<SelectItem value="build">Full build</SelectItem>
			<SelectItem value="retainer">Monthly retainer</SelectItem>
		</SelectContent>
	</Select>
)

export const Field = () => (
	<div className="w-80 space-y-2">
		<Label htmlFor="region">Deploy region</Label>
		<Select defaultValue="iad1">
			<SelectTrigger id="region">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="iad1">iad1 — Washington, D.C.</SelectItem>
				<SelectItem value="cdg1">cdg1 — Paris</SelectItem>
				<SelectItem value="hnd1">hnd1 — Tokyo</SelectItem>
			</SelectContent>
		</Select>
		<p className="text-sm text-muted-foreground">
			Edge functions run closest to this region.
		</p>
	</div>
)

export const Open = () => (
	<Select defaultValue="morphika" defaultOpen>
		<SelectTrigger className="w-80">
			<SelectValue />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>Products</SelectLabel>
				<SelectItem value="morphika">Morphika</SelectItem>
				<SelectItem value="intellicycle">Intellicycle</SelectItem>
			</SelectGroup>
			<SelectSeparator />
			<SelectGroup>
				<SelectLabel>Simulations</SelectLabel>
				<SelectItem value="fusor">Fusor simulation</SelectItem>
				<SelectItem value="donut">Donut solver</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>
)

export const Disabled = () => (
	<div className="w-80 space-y-3">
		<Select disabled defaultValue="frozen">
			<SelectTrigger>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="frozen">Scope frozen — 12 Aug 2026</SelectItem>
			</SelectContent>
		</Select>
		<Select disabled>
			<SelectTrigger>
				<SelectValue placeholder="Requires an active engagement" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="none">None</SelectItem>
			</SelectContent>
		</Select>
	</div>
)
