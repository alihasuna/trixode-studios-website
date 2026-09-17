import { Slider } from "my-v0-project"

// The shipped Slider hardcodes exactly ONE SliderPrimitive.Thumb, so a
// two-value (range) defaultValue would render a track with a missing handle.
// The variant axis here is fill / step / bounds, not thumb count.

export const Default = () => (
	<div className="w-80 space-y-3">
		<div className="flex items-center justify-between">
			<span className="text-sm font-medium">Particle count</span>
			<span className="text-sm text-muted-foreground tabular-nums">62%</span>
		</div>
		<Slider defaultValue={[62]} max={100} step={1} />
	</div>
)

export const Values = () => (
	<div className="w-80 space-y-6">
		<Slider defaultValue={[0]} max={100} step={1} />
		<Slider defaultValue={[35]} max={100} step={1} />
		<Slider defaultValue={[72]} max={100} step={1} />
		<Slider defaultValue={[100]} max={100} step={1} />
	</div>
)

export const Steps = () => (
	<div className="w-80 space-y-6">
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Solver substeps</span>
				<span className="text-sm text-muted-foreground tabular-nums">8</span>
			</div>
			<Slider defaultValue={[8]} min={1} max={16} step={1} />
		</div>
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">Timescale</span>
				<span className="text-sm text-muted-foreground tabular-nums">
					0.25×
				</span>
			</div>
			<Slider defaultValue={[0.25]} min={0} max={2} step={0.25} />
		</div>
	</div>
)

export const ParameterPanel = () => (
	<div className="w-80 space-y-6">
		<p className="text-sm font-medium">Fusor parameters</p>
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">Grid voltage</span>
				<span className="text-sm tabular-nums">18 kV</span>
			</div>
			<Slider defaultValue={[18]} max={40} step={1} />
		</div>
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">Chamber pressure</span>
				<span className="text-sm tabular-nums">4 mTorr</span>
			</div>
			<Slider defaultValue={[4]} max={20} step={1} />
		</div>
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">Bloom intensity</span>
				<span className="text-sm tabular-nums">0.9</span>
			</div>
			<Slider defaultValue={[0.9]} max={1} step={0.05} />
		</div>
	</div>
)

// No Disabled story on purpose: the shipped Slider puts
// `disabled:opacity-50 disabled:pointer-events-none` on SliderPrimitive.Thumb,
// which renders a <span role="slider"> -- a span can never match :disabled, and
// the Root carries no disabled styling at all. A `disabled` Slider therefore
// renders pixel-identical to an enabled one. See .design-sync/learnings/forms.md.
