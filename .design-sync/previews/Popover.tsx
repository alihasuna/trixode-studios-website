import {
	Button,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "my-v0-project"

// `defaultOpen` keeps the Popper mounted so the card shows the surface, not the
// trigger. The wrapper only gives the anchor somewhere to sit -- inline styles,
// because arbitrary spacing values are not in the precompiled CSS.

export const SolverParameters = () => (
	<div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
		<Popover defaultOpen>
			<PopoverTrigger asChild>
				<Button variant="outline">Solver parameters</Button>
			</PopoverTrigger>
			<PopoverContent align="center">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<h4 className="font-medium">Solver parameters</h4>
						<p className="text-sm text-muted-foreground">
							Applies to the next fusor run. Existing frames are untouched.
						</p>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center justify-between gap-4">
							<Label htmlFor="pop-particles">Particles</Label>
							<Input
								id="pop-particles"
								defaultValue="240,000"
								className="w-24 h-8"
							/>
						</div>
						<div className="flex items-center justify-between gap-4">
							<Label htmlFor="pop-timestep">Timestep</Label>
							<Input
								id="pop-timestep"
								defaultValue="0.004 s"
								className="w-24 h-8"
							/>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	</div>
)
