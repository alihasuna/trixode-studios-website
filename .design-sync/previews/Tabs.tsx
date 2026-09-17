import {
	Button,
	Input,
	Label,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "my-v0-project"

// Compound: TabsList / TabsTrigger / TabsContent only render meaningfully
// inside <Tabs>. defaultValue is required so a panel is open in the capture.

export const Default = () => (
	<Tabs defaultValue="overview" className="w-80">
		<TabsList>
			<TabsTrigger value="overview">Overview</TabsTrigger>
			<TabsTrigger value="solver">Solver</TabsTrigger>
			<TabsTrigger value="renderer">Renderer</TabsTrigger>
		</TabsList>
		<TabsContent value="overview" className="text-sm text-muted-foreground">
			A deterministic fusor simulation running a C++17 core compiled to
			WebAssembly, held at 60fps in the browser.
		</TabsContent>
		<TabsContent value="solver" className="text-sm text-muted-foreground">
			Semi-implicit particle-in-cell integrator, 262,144 particles per step.
		</TabsContent>
		<TabsContent value="renderer" className="text-sm text-muted-foreground">
			raylib over WebGL2, with an additive bloom pass on the plasma core.
		</TabsContent>
	</Tabs>
)

export const WithForm = () => (
	<Tabs defaultValue="project" className="w-80">
		<TabsList className="w-full">
			<TabsTrigger value="project" className="flex-1">
				Project
			</TabsTrigger>
			<TabsTrigger value="billing" className="flex-1">
				Billing
			</TabsTrigger>
		</TabsList>
		<TabsContent value="project" className="space-y-4 mt-4">
			<div className="space-y-2">
				<Label htmlFor="tabs-project-name">Project name</Label>
				<Input id="tabs-project-name" defaultValue="Morphika" />
			</div>
			<div className="space-y-2">
				<Label htmlFor="tabs-project-lead">Engagement lead</Label>
				<Input id="tabs-project-lead" defaultValue="Studio team" />
			</div>
			<Button>Save changes</Button>
		</TabsContent>
		<TabsContent value="billing" className="space-y-4 mt-4">
			<div className="space-y-2">
				<Label htmlFor="tabs-po">Purchase order</Label>
				<Input id="tabs-po" placeholder="PO-2026-0114" />
			</div>
			<Button>Update billing</Button>
		</TabsContent>
	</Tabs>
)
