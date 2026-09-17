import { Card, CardContent, CardHeader, Skeleton } from "my-v0-project"

// Skeleton is a single animate-pulse bg-muted box -- it only reads as a
// loading state when several are stacked at realistic content widths.
// Dimensions come from inline style so nothing depends on a class that may
// not exist in the compiled CSS.

export const LoadingCard = () => (
	<Card className="w-80">
		<CardHeader className="space-y-2">
			<Skeleton style={{ height: 20, width: "60%" }} />
			<Skeleton style={{ height: 12, width: "85%" }} />
		</CardHeader>
		<CardContent className="space-y-2">
			<Skeleton style={{ height: 12, width: "100%" }} />
			<Skeleton style={{ height: 12, width: "92%" }} />
			<Skeleton style={{ height: 12, width: "70%" }} />
		</CardContent>
	</Card>
)

export const Media = () => (
	<div className="w-80 space-y-4">
		<Skeleton className="rounded-lg" style={{ height: 140, width: "100%" }} />
		<div className="space-y-2">
			<Skeleton style={{ height: 16, width: "55%" }} />
			<Skeleton style={{ height: 12, width: "80%" }} />
		</div>
	</div>
)

export const ListRows = () => (
	<div className="w-80 space-y-4">
		<div className="flex items-center gap-4">
			<Skeleton className="rounded-full" style={{ height: 40, width: 40 }} />
			<div className="flex-1 space-y-2">
				<Skeleton style={{ height: 12, width: "45%" }} />
				<Skeleton style={{ height: 10, width: "70%" }} />
			</div>
		</div>
		<div className="flex items-center gap-4">
			<Skeleton className="rounded-full" style={{ height: 40, width: 40 }} />
			<div className="flex-1 space-y-2">
				<Skeleton style={{ height: 12, width: "60%" }} />
				<Skeleton style={{ height: 10, width: "50%" }} />
			</div>
		</div>
		<div className="flex items-center gap-4">
			<Skeleton className="rounded-full" style={{ height: 40, width: 40 }} />
			<div className="flex-1 space-y-2">
				<Skeleton style={{ height: 12, width: "38%" }} />
				<Skeleton style={{ height: 10, width: "64%" }} />
			</div>
		</div>
	</div>
)
