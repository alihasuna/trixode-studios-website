import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
} from "my-v0-project"

// Overlay: `defaultOpen` is the only way a portaled Dialog shows anything in a
// static card -- without it the cell is a lone trigger button. Radix portals to
// document.body; the screenshot is the whole viewport, so that reads fine.

export const InviteCollaborator = () => (
	<Dialog defaultOpen>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Invite a collaborator</DialogTitle>
				<DialogDescription>
					They get read and write access to the Morphika workspace and every
					simulation build attached to it.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="invite-email">Work email</Label>
					<Input id="invite-email" defaultValue="rowan@adriftwood.co" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="invite-role">Role</Label>
					<Input id="invite-role" defaultValue="Simulation engineer" />
				</div>
			</div>
			<DialogFooter>
				<Button variant="outline">Cancel</Button>
				<Button>Send invite</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
)
