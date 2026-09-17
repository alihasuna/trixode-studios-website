import {
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "my-v0-project"

// HoverCardContent is NOT portaled in this repo's wrapper -- it renders inline,
// next to its trigger, so the wrapper below has to leave room in the direction
// the card opens (`side="bottom"`).

export const ProjectPeek = () => (
	<div style={{ display: "flex", justifyContent: "center", paddingTop: 32 }}>
		<HoverCard defaultOpen>
			<HoverCardTrigger asChild>
				<Button variant="link">Morphika</Button>
			</HoverCardTrigger>
			<HoverCardContent side="bottom" align="center" className="w-72">
				<div className="flex flex-col gap-2">
					<h4 className="font-grotesk font-semibold">Morphika</h4>
					<p className="text-sm text-muted-foreground">
						The operating layer for the AI-native company. Agent runtime, policy
						engine, and audit trail in one deployment.
					</p>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>TypeScript</span>
						<span>&middot;</span>
						<span>Updated 2 days ago</span>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	</div>
)
