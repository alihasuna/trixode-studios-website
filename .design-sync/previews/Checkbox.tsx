import { Checkbox, Label } from "my-v0-project"

export const Default = () => (
	<div className="flex items-center gap-2">
		<Checkbox id="msa" />
		<Label htmlFor="msa">Accept the master services agreement</Label>
	</div>
)

export const Checked = () => (
	<div className="flex items-center gap-2">
		<Checkbox id="nda-signed" defaultChecked />
		<Label htmlFor="nda-signed">Mutual NDA on file</Label>
	</div>
)

export const Group = () => (
	<div className="w-80 space-y-4">
		<p className="text-sm font-medium">Deliverables</p>
		<div className="space-y-4">
			<div className="flex items-start gap-3">
				<Checkbox id="d-sim" defaultChecked className="mt-1" />
				<div className="flex flex-col gap-1">
					<Label htmlFor="d-sim">Simulation core</Label>
					<p className="text-sm text-muted-foreground">
						C++17 solver compiled to WebAssembly.
					</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<Checkbox id="d-brand" defaultChecked className="mt-1" />
				<div className="flex flex-col gap-1">
					<Label htmlFor="d-brand">Brand system</Label>
					<p className="text-sm text-muted-foreground">
						Tokens, typography and a component vocabulary.
					</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<Checkbox id="d-film" className="mt-1" />
				<div className="flex flex-col gap-1">
					<Label htmlFor="d-film">Launch film</Label>
					<p className="text-sm text-muted-foreground">
						90-second Remotion render, 4K master.
					</p>
				</div>
			</div>
		</div>
	</div>
)

export const Disabled = () => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Checkbox id="d-sso" disabled />
			<Label htmlFor="d-sso" className="text-muted-foreground">
				Enterprise SSO — shipping Q4 2026
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<Checkbox id="d-escrow" disabled defaultChecked />
			<Label htmlFor="d-escrow" className="text-muted-foreground">
				Source escrow — included on every engagement
			</Label>
		</div>
	</div>
)
