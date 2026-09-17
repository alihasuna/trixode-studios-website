import { AspectRatio, Card, CardContent, CardHeader, CardTitle } from "my-v0-project"

// AspectRatio is Radix's padding-bottom box: it has zero intrinsic size, so
// every cell gives the WRAPPER an explicit width (inline style) and the child
// h-full w-full. Media is drawn with a CSS gradient / inline SVG data URI --
// the capture has no network, so a remote <img> would render as a broken box
// and the cell would look empty rather than correct.

const thumb =
	"data:image/svg+xml;utf8," +
	encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
			<defs>
				<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stop-color="#3b82f6"/>
					<stop offset="0.55" stop-color="#8b5cf6"/>
					<stop offset="1" stop-color="#06b6d4"/>
				</linearGradient>
			</defs>
			<rect width="480" height="270" fill="#0b0b0f"/>
			<circle cx="240" cy="135" r="86" fill="url(#g)" opacity="0.85"/>
			<circle cx="240" cy="135" r="34" fill="#0b0b0f"/>
		</svg>`
	)

export const Ratio16x9 = () => (
	<div style={{ width: 340 }}>
		<AspectRatio ratio={16 / 9}>
			<img
				src={thumb}
				alt="Fusor simulation plasma core"
				className="h-full w-full rounded-lg object-cover"
			/>
		</AspectRatio>
	</div>
)

export const Ratio1x1 = () => (
	<div style={{ width: 220 }}>
		<AspectRatio ratio={1}>
			<div
				className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
				style={{ borderWidth: 1 }}
			>
				1 : 1
			</div>
		</AspectRatio>
	</div>
)

export const InCard = () => (
	<Card className="w-80">
		<CardHeader>
			<CardTitle>Fusor Simulation</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<AspectRatio ratio={16 / 9}>
				<img
					src={thumb}
					alt="Fusor simulation plasma core"
					className="h-full w-full rounded-md object-cover"
				/>
			</AspectRatio>
			<p className="text-sm text-muted-foreground">
				A C++17 particle solver compiled to WebAssembly, held at 60fps.
			</p>
		</CardContent>
	</Card>
)
