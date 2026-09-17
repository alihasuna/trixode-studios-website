import { Avatar, AvatarFallback, AvatarImage } from "my-v0-project"

// Avatar is a 40px circle with `overflow-hidden` and NOTHING inside it by
// default — that is why it lands [RENDER_THIN] with no children. It only
// paints once an AvatarFallback (or a loaded AvatarImage) is composed inside.
//
// The image source is an inline SVG data: URI so the card renders offline;
// Radix falls through to AvatarFallback if it ever fails to decode, so this
// cell degrades to initials rather than to an empty circle.

const HEX_AVATAR =
	"data:image/svg+xml;utf8," +
	encodeURIComponent(
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
			'<rect width="64" height="64" fill="#0b1220"/>' +
			'<polygon points="54.4,32 43.2,51.4 20.8,51.4 9.6,32 20.8,12.6 43.2,12.6" ' +
			'fill="none" stroke="#60a5fa" stroke-width="2.5"/>' +
			'<circle cx="32" cy="32" r="4" fill="#60a5fa"/>' +
			"</svg>"
	)

export const Fallbacks = () => (
	<div className="flex items-center gap-4">
		<Avatar>
			<AvatarFallback>AH</AvatarFallback>
		</Avatar>
		<Avatar>
			<AvatarFallback>MJ</AvatarFallback>
		</Avatar>
		<Avatar>
			<AvatarFallback>TS</AvatarFallback>
		</Avatar>
	</div>
)

export const WithImage = () => (
	<div className="flex items-center gap-4">
		<Avatar>
			<AvatarImage src={HEX_AVATAR} alt="Trixode Studios" />
			<AvatarFallback>TS</AvatarFallback>
		</Avatar>
		<Avatar className="h-12 w-12">
			<AvatarImage src={HEX_AVATAR} alt="Trixode Studios" />
			<AvatarFallback>TS</AvatarFallback>
		</Avatar>
		<Avatar className="h-16 w-16">
			<AvatarImage src={HEX_AVATAR} alt="Trixode Studios" />
			<AvatarFallback>TS</AvatarFallback>
		</Avatar>
	</div>
)

export const Sizes = () => (
	<div className="flex items-end gap-4">
		<Avatar className="h-8 w-8">
			<AvatarFallback className="text-xs">AH</AvatarFallback>
		</Avatar>
		<Avatar>
			<AvatarFallback className="text-sm">AH</AvatarFallback>
		</Avatar>
		<Avatar className="h-12 w-12">
			<AvatarFallback className="text-sm font-medium">AH</AvatarFallback>
		</Avatar>
		<Avatar className="h-16 w-16">
			<AvatarFallback className="text-base font-grotesk font-medium">
				AH
			</AvatarFallback>
		</Avatar>
	</div>
)

export const TeamStack = () => (
	<div className="flex items-center gap-4">
		<div className="flex items-center">
			{["AH", "MJ", "RK", "SL"].map((initials, i) => (
				<Avatar
					key={initials}
					className="border-2"
					style={{ marginLeft: i === 0 ? 0 : -12, borderColor: "#030303" }}
				>
					<AvatarFallback className="text-xs font-medium">
						{initials}
					</AvatarFallback>
				</Avatar>
			))}
		</div>
		<span className="text-sm text-muted-foreground">
			4 people on Morphika
		</span>
	</div>
)

export const WithLabel = () => (
	<div className="flex items-center gap-3">
		<Avatar className="h-12 w-12">
			<AvatarImage src={HEX_AVATAR} alt="Ali Hasuna" />
			<AvatarFallback>AH</AvatarFallback>
		</Avatar>
		<div className="flex flex-col">
			<span className="text-sm font-medium">Ali Hasuna</span>
			<span className="text-xs text-muted-foreground">
				Simulation & brand systems
			</span>
		</div>
	</div>
)
