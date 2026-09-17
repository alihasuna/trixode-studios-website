import { Label, RadioGroup, RadioGroupItem } from "my-v0-project"

// RadioGroupItem only renders meaningfully inside RadioGroup (it reads the
// group's value from context), so every story composes the pair.

export const Default = () => (
	<RadioGroup defaultValue="sprint" className="w-80">
		<div className="flex items-center gap-2">
			<RadioGroupItem value="sprint" id="e-sprint" />
			<Label htmlFor="e-sprint">Two-week discovery sprint</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="build" id="e-build" />
			<Label htmlFor="e-build">Full build engagement</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="retainer" id="e-retainer" />
			<Label htmlFor="e-retainer">Monthly retainer</Label>
		</div>
	</RadioGroup>
)

export const WithDescriptions = () => (
	<RadioGroup defaultValue="wasm" className="w-80 gap-4">
		<div className="flex items-start gap-3">
			<RadioGroupItem value="wasm" id="t-wasm" className="mt-1" />
			<div className="flex flex-col gap-1">
				<Label htmlFor="t-wasm">WebAssembly</Label>
				<p className="text-sm text-muted-foreground">
					C++17 solver, emscripten build, runs in the browser.
				</p>
			</div>
		</div>
		<div className="flex items-start gap-3">
			<RadioGroupItem value="native" id="t-native" className="mt-1" />
			<div className="flex flex-col gap-1">
				<Label htmlFor="t-native">Native desktop</Label>
				<p className="text-sm text-muted-foreground">
					raylib window, macOS and Linux binaries.
				</p>
			</div>
		</div>
		<div className="flex items-start gap-3">
			<RadioGroupItem value="both" id="t-both" className="mt-1" />
			<div className="flex flex-col gap-1">
				<Label htmlFor="t-both">Both targets</Label>
				<p className="text-sm text-muted-foreground">
					One CMake source tree, two build scripts.
				</p>
			</div>
		</div>
	</RadioGroup>
)

export const Horizontal = () => (
	<RadioGroup defaultValue="dark" className="flex items-center gap-6">
		<div className="flex items-center gap-2">
			<RadioGroupItem value="dark" id="th-dark" />
			<Label htmlFor="th-dark">Dark</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="light" id="th-light" />
			<Label htmlFor="th-light">Light</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="system" id="th-system" />
			<Label htmlFor="th-system">System</Label>
		</div>
	</RadioGroup>
)

export const Disabled = () => (
	<RadioGroup defaultValue="annual" disabled className="w-80">
		<div className="flex items-center gap-2">
			<RadioGroupItem value="annual" id="b-annual" />
			<Label htmlFor="b-annual" className="text-muted-foreground">
				Annual — locked for the current term
			</Label>
		</div>
		<div className="flex items-center gap-2">
			<RadioGroupItem value="monthly" id="b-monthly" />
			<Label htmlFor="b-monthly" className="text-muted-foreground">
				Monthly
			</Label>
		</div>
	</RadioGroup>
)
