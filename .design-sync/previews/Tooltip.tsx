import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "my-v0-project"

// `defaultOpen` skips the hover delay; the Provider is still required (Radix
// throws without it). TooltipContent is not portaled here, so the trigger is
// centred to leave room for a top-side tooltip.

export const RecompileHint = () => (
	<TooltipProvider>
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: 260,
			}}
		>
			<Tooltip defaultOpen>
				<TooltipTrigger asChild>
					<Button variant="outline">Recompile shaders</Button>
				</TooltipTrigger>
				<TooltipContent side="top">
					Rebuilds the GLSL pipeline &mdash; about 40 seconds
				</TooltipContent>
			</Tooltip>
		</div>
	</TooltipProvider>
)
