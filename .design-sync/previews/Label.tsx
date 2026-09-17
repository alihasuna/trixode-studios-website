import { Checkbox, Input, Label, Switch, Textarea } from "my-v0-project"

// Label paints nothing on its own -- it is only true next to the control it
// names, so every story wires a real htmlFor/id pair.

export const Default = () => (
	<div className="w-80 space-y-2">
		<Label htmlFor="studio">Studio name</Label>
		<Input id="studio" placeholder="Trixode Studios" />
	</div>
)

export const Required = () => (
	<div className="w-80 space-y-2">
		<Label htmlFor="budget">
			Budget range <span className="text-destructive">*</span>
		</Label>
		<Input id="budget" placeholder="$25k – $60k" />
		<p className="text-sm text-muted-foreground">
			Required — it sets the engagement tier.
		</p>
	</div>
)

export const WithControls = () => (
	<div className="w-80 space-y-4">
		<div className="flex items-center gap-2">
			<Checkbox id="nda" defaultChecked />
			<Label htmlFor="nda">Send a mutual NDA first</Label>
		</div>
		<div className="flex items-center gap-3">
			<Switch id="digest" defaultChecked />
			<Label htmlFor="digest">Weekly build digest</Label>
		</div>
	</div>
)

export const Stacked = () => (
	<div className="w-80 space-y-4">
		<div className="space-y-2">
			<Label htmlFor="lead">Primary contact</Label>
			<Input id="lead" defaultValue="Ali Hasuna" />
		</div>
		<div className="space-y-2">
			<Label htmlFor="context">Context</Label>
			<Textarea
				id="context"
				placeholder="Anything we should know before the call?"
			/>
		</div>
	</div>
)
