import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "my-v0-project"

// Menubar CAN open without interaction: Root takes `defaultValue` and each
// MenubarMenu takes `value`. Both are required -- omit `value` and Radix
// generates an id that `defaultValue` can never match, so the bar renders
// closed.

export const SimulationBar = () => (
	<div style={{ display: "flex", justifyContent: "center" }}>
		<Menubar defaultValue="simulation">
			<MenubarMenu value="simulation">
				<MenubarTrigger>Simulation</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>
						Run solver
						<MenubarShortcut>&#8984;R</MenubarShortcut>
					</MenubarItem>
					<MenubarItem>
						Step one frame
						<MenubarShortcut>&#8594;</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator />
					<MenubarCheckboxItem checked>Deterministic seed</MenubarCheckboxItem>
					<MenubarSeparator />
					<MenubarRadioGroup value="wasm">
						<MenubarRadioItem value="wasm">WebAssembly</MenubarRadioItem>
						<MenubarRadioItem value="native">Native build</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />
					<MenubarItem>
						Reset chamber
						<MenubarShortcut>&#8984;&#8679;R</MenubarShortcut>
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu value="view">
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Field lines</MenubarItem>
					<MenubarItem>Particle trails</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu value="export">
				<MenubarTrigger>Export</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>PNG sequence</MenubarItem>
					<MenubarItem>MP4 render</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu value="help">
				<MenubarTrigger>Help</MenubarTrigger>
				<MenubarContent>
					<MenubarItem>Solver documentation</MenubarItem>
					<MenubarItem>Keyboard shortcuts</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	</div>
)
