import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "my-v0-project"

// vaul's Root takes `defaultOpen`, so the bottom sheet mounts already slid in.
// The inner max-width wrapper is the shadcn convention for a full-bleed drawer
// (the content itself is inset-x-0); inline style because arbitrary widths are
// not in the precompiled CSS.

export const ExportFrames = () => (
	<Drawer defaultOpen>
		<DrawerContent>
			<div style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
				<DrawerHeader>
					<DrawerTitle>Export simulation frames</DrawerTitle>
					<DrawerDescription>
						128 frames at 1920&times;1080, rendered from the last committed
						solver state.
					</DrawerDescription>
				</DrawerHeader>
				<div className="p-4">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Format</span>
						<span className="font-medium">PNG sequence</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Estimated size</span>
						<span className="font-medium tabular-nums">2.1 GB</span>
					</div>
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Estimated time</span>
						<span className="font-medium tabular-nums">4 min 20 s</span>
					</div>
				</div>
				<DrawerFooter>
					<Button>Start export</Button>
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</div>
		</DrawerContent>
	</Drawer>
)
