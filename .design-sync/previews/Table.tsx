import {
	Badge,
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "my-v0-project"

// The text-heavy calibration preview: this is what proves the self-hosted
// Inter / Space Grotesk actually landed. If the type here looks like system
// sans, the font wiring regressed (see NOTES.md "Fonts").

export const Default = () => (
	<Table>
		<TableCaption>Active engagements, Q3 2026.</TableCaption>
		<TableHeader>
			<TableRow>
				<TableHead>Project</TableHead>
				<TableHead>Client</TableHead>
				<TableHead>Status</TableHead>
				<TableHead className="text-right">Value</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			<TableRow>
				<TableCell className="font-medium">Morphika</TableCell>
				<TableCell>Internal</TableCell>
				<TableCell>
					<Badge>Active</Badge>
				</TableCell>
				<TableCell className="text-right">$48,000</TableCell>
			</TableRow>
			<TableRow>
				<TableCell className="font-medium">Fusor Simulation</TableCell>
				<TableCell>Westcom</TableCell>
				<TableCell>
					<Badge variant="secondary">In review</Badge>
				</TableCell>
				<TableCell className="text-right">$12,500</TableCell>
			</TableRow>
			<TableRow>
				<TableCell className="font-medium">Brand System</TableCell>
				<TableCell>Adriftwood</TableCell>
				<TableCell>
					<Badge variant="outline">Scoping</Badge>
				</TableCell>
				<TableCell className="text-right">$6,200</TableCell>
			</TableRow>
		</TableBody>
		<TableFooter>
			<TableRow>
				<TableCell colSpan={3}>Total</TableCell>
				<TableCell className="text-right">$66,700</TableCell>
			</TableRow>
		</TableFooter>
	</Table>
)
