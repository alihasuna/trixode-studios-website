import * as React from "react"

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "my-v0-project"

// Radix's ContextMenu Root has NO `open`/`defaultOpen` prop (checked against
// @radix-ui/react-context-menu 2.2.4's index.d.ts) -- the only way to show it
// open is to send the trigger the event it listens for. bubbles+cancelable are
// required (React delegates onContextMenu at the root and Radix
// preventDefault()s it), and clientX/clientY become the menu's anchor point.

export const ViewportActions = () => {
	const trigger = React.useRef<HTMLSpanElement>(null)
	React.useEffect(() => {
		const el = trigger.current
		if (!el) return
		const box = el.getBoundingClientRect()
		el.dispatchEvent(
			new MouseEvent("contextmenu", {
				bubbles: true,
				cancelable: true,
				clientX: Math.round(box.left + 140),
				clientY: Math.round(box.top + 72),
			})
		)
	}, [])

	return (
		<div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
			<ContextMenu modal={false}>
				<ContextMenuTrigger
					ref={trigger}
					className="flex items-start rounded-md border border-dashed p-4 text-sm text-muted-foreground"
					style={{ width: 420, height: 280 }}
				>
					Right-click the simulation viewport
				</ContextMenuTrigger>
				<ContextMenuContent className="w-56">
					<ContextMenuLabel>Chamber view</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuItem>
						Reframe camera
						<ContextMenuShortcut>&#8984;F</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						Capture frame
						<ContextMenuShortcut>&#8984;&#8679;S</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSub>
						<ContextMenuSubTrigger>Overlays</ContextMenuSubTrigger>
						<ContextMenuSubContent>
							<ContextMenuItem>Magnetic field lines</ContextMenuItem>
							<ContextMenuItem>Particle trails</ContextMenuItem>
							<ContextMenuItem>Temperature map</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem checked>
						Snap to grid
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem>Show diagnostics</ContextMenuCheckboxItem>
					<ContextMenuSeparator />
					<ContextMenuItem>
						Reset viewport
						<ContextMenuShortcut>&#8984;0</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	)
}
