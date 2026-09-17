import { Label, Textarea } from "my-v0-project"

export const Default = () => (
	<Textarea
		className="w-80"
		placeholder="Tell us what you're building…"
	/>
)

export const Field = () => (
	<div className="w-80 space-y-2">
		<Label htmlFor="scope">Project brief</Label>
		<Textarea
			id="scope"
			placeholder="What are we building, and what does done look like?"
		/>
		<p className="text-sm text-muted-foreground">
			Markdown is fine. 2,000 characters max.
		</p>
	</div>
)

// `rows` does not survive the shipped Textarea's own height rules, so the
// filled story sets an explicit height inline rather than shipping clipped copy.
export const Filled = () => (
	<Textarea
		className="w-80"
		style={{ height: 212 }}
		defaultValue={
			"Real-time fusor simulation for the Westcom briefing.\n\n" +
			"Deterministic particle solver in C++17, compiled to WebAssembly, " +
			"rendered with raylib at 60fps in the browser.\n\n" +
			"Deliverables: native build, web build, and a 13-slide walkthrough."
		}
	/>
)

export const Disabled = () => (
	<div className="w-80 space-y-3">
		<Textarea disabled placeholder="Locked while the SOW is in review" />
		<Textarea
			disabled
			defaultValue="Scope frozen 12 Aug 2026 — reopen via change order."
		/>
	</div>
)
