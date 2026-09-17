import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "my-v0-project"

// `modal={false}` keeps the open menu from scroll-locking the capture page.
// The Sub is present for its chevron affordance but deliberately not opened --
// a second column would run off a 760px viewport.

export const SimulationActions = () => (
	<div style={{ display: "flex", justifyContent: "center", paddingTop: 16 }}>
		<DropdownMenu defaultOpen modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">Simulation</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel>Fusor build 24.8</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Run solver
						<DropdownMenuShortcut>&#8984;R</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Reset chamber
						<DropdownMenuShortcut>&#8984;&#8679;R</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Export frames</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>PNG sequence</DropdownMenuItem>
							<DropdownMenuItem>MP4 render</DropdownMenuItem>
							<DropdownMenuItem>Frame manifest (JSON)</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem checked>
					Show field lines
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem>Show particle trails</DropdownMenuCheckboxItem>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value="wasm">
					<DropdownMenuRadioItem value="wasm">WebAssembly</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="native">Native</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Delete build
					<DropdownMenuShortcut>&#9003;</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
)
