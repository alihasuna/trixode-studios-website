import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "my-v0-project"

// Compound: the sub-parts (CardHeader/CardTitle/CardContent/CardFooter) are
// verified here, inside the parent -- that is the only render that is true.

export const Default = () => (
	<Card className="w-80">
		<CardHeader>
			<CardTitle>Simulation Engine</CardTitle>
			<CardDescription>
				Real-time plasma physics, rendered in the browser at 60fps.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<p className="text-sm">
				Built on a C++17 core compiled to WebAssembly, with a raylib
				renderer and a deterministic particle solver.
			</p>
		</CardContent>
		<CardFooter className="gap-3">
			<Button>Open demo</Button>
			<Button variant="outline">Source</Button>
		</CardFooter>
	</Card>
)

export const Pricing = () => (
	<Card className="w-80">
		<CardHeader>
			<CardTitle>Studio</CardTitle>
			<CardDescription>For teams shipping production work.</CardDescription>
		</CardHeader>
		<CardContent>
			<div className="flex items-baseline gap-2">
				<span className="text-4xl font-grotesk font-bold">$2,400</span>
				<span className="text-sm text-muted-foreground">/month</span>
			</div>
		</CardContent>
		<CardFooter>
			<Button className="w-full">Start a project</Button>
		</CardFooter>
	</Card>
)
