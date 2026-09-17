import { Label, Switch } from "my-v0-project"

export const Default = () => (
	<div className="flex items-center gap-3">
		<Switch id="telemetry" />
		<Label htmlFor="telemetry">Ship telemetry with the build</Label>
	</div>
)

export const Checked = () => (
	<div className="flex items-center gap-3">
		<Switch id="reduced-motion" defaultChecked />
		<Label htmlFor="reduced-motion">Respect prefers-reduced-motion</Label>
	</div>
)

export const SettingsList = () => (
	<div className="w-96 space-y-6">
		<div className="flex items-center justify-between gap-4">
			<div className="flex flex-col gap-1">
				<Label htmlFor="s-bloom">Bloom pass</Label>
				<p className="text-sm text-muted-foreground">
					UnrealBloom on the plasma renderer.
				</p>
			</div>
			<Switch id="s-bloom" defaultChecked />
		</div>
		<div className="flex items-center justify-between gap-4">
			<div className="flex flex-col gap-1">
				<Label htmlFor="s-preview">Preview deploys</Label>
				<p className="text-sm text-muted-foreground">
					Build every branch, not just main.
				</p>
			</div>
			<Switch id="s-preview" />
		</div>
		<div className="flex items-center justify-between gap-4">
			<div className="flex flex-col gap-1">
				<Label htmlFor="s-digest">Weekly digest</Label>
				<p className="text-sm text-muted-foreground">
					One email, Monday morning.
				</p>
			</div>
			<Switch id="s-digest" defaultChecked />
		</div>
	</div>
)

export const Disabled = () => (
	<div className="space-y-4">
		<div className="flex items-center gap-3">
			<Switch id="s-sso" disabled />
			<Label htmlFor="s-sso" className="text-muted-foreground">
				Enterprise SSO — not on this plan
			</Label>
		</div>
		<div className="flex items-center gap-3">
			<Switch id="s-audit" disabled defaultChecked />
			<Label htmlFor="s-audit" className="text-muted-foreground">
				Audit log — always on
			</Label>
		</div>
	</div>
)
