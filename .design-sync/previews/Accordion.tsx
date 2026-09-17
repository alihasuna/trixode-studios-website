import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "my-v0-project"

// Compound: AccordionItem / AccordionTrigger / AccordionContent are only real
// inside <Accordion>. defaultValue keeps one panel open so the capture shows
// content and the chevron's data-[state=open] rotation.

export const Default = () => (
	<Accordion type="single" collapsible defaultValue="scope" className="w-80">
		<AccordionItem value="scope">
			<AccordionTrigger>What does an engagement include?</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				Discovery, a working prototype, and a production hand-off with the
				source, the build scripts, and a short operating guide.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="timeline">
			<AccordionTrigger>How long does a build take?</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				Most simulation and brand-system projects run six to ten weeks.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="ownership">
			<AccordionTrigger>Who owns the work?</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				You do. Every repository, asset, and token file transfers on delivery.
			</AccordionContent>
		</AccordionItem>
	</Accordion>
)

export const Multiple = () => (
	<Accordion
		type="multiple"
		defaultValue={["solver", "renderer"]}
		className="w-80"
	>
		<AccordionItem value="solver">
			<AccordionTrigger>Solver</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				Semi-implicit particle-in-cell integrator, 262,144 particles per step.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="renderer">
			<AccordionTrigger>Renderer</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				raylib over WebGL2 with an additive bloom pass on the plasma core.
			</AccordionContent>
		</AccordionItem>
		<AccordionItem value="targets">
			<AccordionTrigger>Build targets</AccordionTrigger>
			<AccordionContent className="text-muted-foreground">
				Native via CMake, and WebAssembly via emscripten.
			</AccordionContent>
		</AccordionItem>
	</Accordion>
)
