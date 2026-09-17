import {
	Card,
	CardContent,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "my-v0-project"

// CarouselPrevious / CarouselNext are absolutely positioned at -left-12 /
// -right-12, i.e. OUTSIDE the carousel box -- every cell therefore sits inside
// a wrapper with inline horizontal padding so the arrows are inside the card.
// Slide widths use inline flexBasis (basis-1/2 is not in the compiled CSS).

export const Default = () => (
	<div style={{ width: 420, paddingLeft: 56, paddingRight: 56 }}>
		<Carousel>
			<CarouselContent>
				{["Morphika", "Fusor Simulation", "Brand System"].map((title) => (
					<CarouselItem key={title}>
						<Card>
							<CardContent className="flex items-center justify-center p-6">
								<span className="text-lg font-semibold font-grotesk">
									{title}
								</span>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</div>
)

export const MultipleSlides = () => (
	<div style={{ width: 460, paddingLeft: 56, paddingRight: 56 }}>
		<Carousel opts={{ align: "start" }}>
			<CarouselContent>
				{[
					{ label: "Particles", value: "262,144" },
					{ label: "Frame budget", value: "16.6 ms" },
					{ label: "Solver", value: "PIC" },
					{ label: "Renderer", value: "WebGL2" },
					{ label: "Targets", value: "2" },
				].map((stat) => (
					<CarouselItem key={stat.label} style={{ flexBasis: "50%" }}>
						<Card>
							<CardContent className="p-6 space-y-1">
								<div className="text-xs text-muted-foreground">
									{stat.label}
								</div>
								<div className="text-2xl font-bold font-grotesk tabular-nums">
									{stat.value}
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	</div>
)
