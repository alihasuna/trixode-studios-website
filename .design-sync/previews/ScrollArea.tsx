import { ScrollArea, ScrollBar } from "my-v0-project"

// ScrollArea has no intrinsic size, so every cell sets an explicit box with an
// inline style and overflows it. type="always" keeps the scrollbar track
// mounted -- Radix's default type="hover" leaves it invisible in a static
// capture, so the card would read as a plain clipped div.

const commits = [
	"feat(solver): semi-implicit PIC integrator",
	"perf(render): batch particle draw calls",
	"fix(wasm): guard emscripten heap growth",
	"chore(build): pin raylib to 5.5",
	"feat(ui): plasma core bloom pass",
	"fix(sim): deterministic seed on reset",
	"docs: document the fusor run config",
	"feat(export): frame capture to PNG",
	"refactor(core): split field and particle passes",
	"fix(input): clamp chamber pressure slider",
	"test: golden-frame comparison harness",
	"chore: drop unused three.js import",
]

export const Vertical = () => (
	<ScrollArea
		type="always"
		className="rounded-md border"
		style={{ height: 200, width: 320 }}
	>
		<div className="p-4 space-y-3">
			{commits.map((c) => (
				<div key={c} className="text-sm">
					{c}
				</div>
			))}
		</div>
	</ScrollArea>
)

export const Horizontal = () => (
	<ScrollArea
		type="always"
		className="rounded-md border"
		style={{ width: 340 }}
	>
		<div className="flex gap-4 p-4">
			{["Morphika", "Fusor Sim", "Brand Kit", "Math Art", "Social Kit"].map(
				(name) => (
					<div
						key={name}
						className="flex items-center justify-center rounded-md bg-muted text-sm whitespace-nowrap"
						style={{ height: 96, width: 140, flexShrink: 0 }}
					>
						{name}
					</div>
				)
			)}
		</div>
		<ScrollBar orientation="horizontal" />
	</ScrollArea>
)

export const InPanel = () => (
	<div className="rounded-md border" style={{ width: 320 }}>
		<div className="px-4 py-3 text-sm font-semibold font-grotesk">
			Recent commits
		</div>
		<ScrollArea type="always" style={{ height: 168 }}>
			<div className="px-4 py-2 space-y-2">
				{commits.map((c) => (
					<div key={c} className="text-xs text-muted-foreground">
						{c}
					</div>
				))}
			</div>
		</ScrollArea>
	</div>
)
