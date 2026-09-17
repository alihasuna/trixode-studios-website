import {
	Button,
	Input,
	Label,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "my-v0-project"

// sheetVariants ships `gap-4` but no display, so the gap only bites once the
// content is a flex column -- that is why `flex flex-col` is added here rather
// than padding each block by hand.

export const DeploymentSettings = () => (
	<Sheet defaultOpen>
		<SheetContent side="right" className="flex flex-col">
			<SheetHeader>
				<SheetTitle>Deployment settings</SheetTitle>
				<SheetDescription>
					Applies to the next Morphika release. Running instances keep their
					current configuration until they restart.
				</SheetDescription>
			</SheetHeader>
			<div className="grid gap-4 py-4">
				<div className="grid gap-2">
					<Label htmlFor="sheet-region">Region</Label>
					<Input id="sheet-region" defaultValue="iad1" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="sheet-workers">Solver workers</Label>
					<Input id="sheet-workers" defaultValue="8" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="sheet-branch">Deploy branch</Label>
					<Input id="sheet-branch" defaultValue="main" />
				</div>
			</div>
			<SheetFooter className="mt-auto">
				<Button variant="outline">Discard</Button>
				<Button>Save changes</Button>
			</SheetFooter>
		</SheetContent>
	</Sheet>
)
