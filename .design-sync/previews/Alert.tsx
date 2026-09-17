import { Alert, AlertDescription, AlertTitle } from "my-v0-project"
import { AlertTriangle, Rocket, Terminal } from "lucide-react"

// alert.tsx positions a leading `svg` absolutely and indents the siblings via
// `[&>svg~*]:pl-7`, so the icon must be the FIRST child of <Alert> — any other
// order silently collapses the indent. Both icon and icon-free cells are here.
//
// The destructive cell is wrapped in `.dark` on purpose: alert.tsx carries
// `dark:border-destructive`, and compiled.css emits dark variants as
// `:is(.dark *)`. The design surface has no `.dark` ancestor, so without this
// wrapper the destructive border renders at the light-mode 50% opacity.
// See .design-sync/learnings/display-nav.md.

export const Default = () => (
	<Alert>
		<Rocket className="h-4 w-4" />
		<AlertTitle>Deploy queued</AlertTitle>
		<AlertDescription>
			The Morphika staging build is compiling on iad1. A preview URL lands in
			about two minutes.
		</AlertDescription>
	</Alert>
)

export const Destructive = () => (
	<div className="dark">
		<Alert variant="destructive">
			<AlertTriangle className="h-4 w-4" />
			<AlertTitle>WebGL context lost</AlertTitle>
			<AlertDescription>
				The fusor simulation dropped its GPU context. Reload to restart the
				particle solver from the last checkpoint.
			</AlertDescription>
		</Alert>
	</div>
)

export const WithoutIcon = () => (
	<Alert>
		<AlertTitle>Reduced motion is on</AlertTitle>
		<AlertDescription>
			Blob morphing and scroll choreography are disabled for this session,
			matching your system preference.
		</AlertDescription>
	</Alert>
)

export const TitleOnly = () => (
	<Alert>
		<Terminal className="h-4 w-4" />
		<AlertTitle>Turbopack dev server ready on :3000</AlertTitle>
	</Alert>
)
