import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "my-v0-project"

// ResizablePanelGroup is h-full w-full with no intrinsic size, and
// react-resizable-panels requires `direction` -- so every cell sets direction
// plus an explicit box via inline style, otherwise the group collapses to zero
// height. `withHandle` is passed on the handles: the 1px seam itself is
// bg-border (a dead token in this palette -- see learnings/layout.md), but the
// grip's border + GripVertical icon paint in currentColor, so the drag affordance
// is still visible.

export const Horizontal = () => (
	<ResizablePanelGroup
		direction="horizontal"
		className="rounded-lg border"
		style={{ height: 220, width: 460 }}
	>
		<ResizablePanel defaultSize={38}>
			<div className="flex h-full items-center justify-center p-6">
				<span className="text-sm font-semibold font-grotesk">Scene tree</span>
			</div>
		</ResizablePanel>
		<ResizableHandle withHandle />
		<ResizablePanel defaultSize={62}>
			<div className="flex h-full items-center justify-center p-6">
				<span className="text-sm font-semibold font-grotesk">Viewport</span>
			</div>
		</ResizablePanel>
	</ResizablePanelGroup>
)

export const Vertical = () => (
	<ResizablePanelGroup
		direction="vertical"
		className="rounded-lg border"
		style={{ height: 240, width: 380 }}
	>
		<ResizablePanel defaultSize={65}>
			<div className="flex h-full items-center justify-center p-6">
				<span className="text-sm font-semibold font-grotesk">Simulation</span>
			</div>
		</ResizablePanel>
		<ResizableHandle withHandle />
		<ResizablePanel defaultSize={35}>
			<div className="flex h-full items-center justify-center p-6">
				<span className="text-sm text-muted-foreground">Solver log</span>
			</div>
		</ResizablePanel>
	</ResizablePanelGroup>
)

export const NestedPanels = () => (
	<ResizablePanelGroup
		direction="horizontal"
		className="rounded-lg border"
		style={{ height: 260, width: 520 }}
	>
		<ResizablePanel defaultSize={30}>
			<div className="flex h-full items-center justify-center p-6">
				<span className="text-sm font-semibold font-grotesk">Inspector</span>
			</div>
		</ResizablePanel>
		<ResizableHandle withHandle />
		<ResizablePanel defaultSize={70}>
			<ResizablePanelGroup direction="vertical">
				<ResizablePanel defaultSize={70}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="text-sm font-semibold font-grotesk">
							Plasma viewport
						</span>
					</div>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel defaultSize={30}>
					<div className="flex h-full items-center justify-center p-6">
						<span className="text-sm text-muted-foreground tabular-nums">
							262,144 particles / 16.6 ms
						</span>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</ResizablePanel>
	</ResizablePanelGroup>
)
