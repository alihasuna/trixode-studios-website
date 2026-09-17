import { Input, Label } from "my-v0-project"

// Only utility classes already present in .design-sync/compiled.css are used as
// layout glue -- Tailwind can't be recompiled from here (NOTES.md).

export const Default = () => (
	<Input className="w-80" placeholder="Project name" />
)

export const Field = () => (
	<div className="w-80 space-y-2">
		<Label htmlFor="brief-email">Work email</Label>
		<Input
			id="brief-email"
			type="email"
			defaultValue="hello@trixode-studios.com"
			placeholder="you@company.com"
		/>
		<p className="text-sm text-muted-foreground">
			We reply to every brief within two business days.
		</p>
	</div>
)

export const Types = () => (
	<div className="w-80 space-y-3">
		<Input type="email" placeholder="you@company.com" />
		<Input type="password" defaultValue="plasma-core-2026" />
		<Input type="number" defaultValue={48} />
		<Input type="search" placeholder="Search case studies" />
		<Input type="file" />
	</div>
)

export const Disabled = () => (
	<div className="w-80 space-y-3">
		<Input disabled placeholder="Locked while the SOW is in review" />
		<Input disabled defaultValue="Morphika — Discovery Phase" />
		<Input readOnly defaultValue="TRX-2026-0412" />
	</div>
)
