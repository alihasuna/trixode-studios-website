import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarSeparator,
	SidebarTrigger,
} from "my-v0-project"
import {
	Boxes,
	FlaskConical,
	LifeBuoy,
	Palette,
	Settings,
	Users,
} from "lucide-react"

// SidebarProvider is mandatory -- every sub-part reads useSidebar() and throws
// without it. collapsible="none" is used deliberately: the default "offcanvas"
// path renders `fixed inset-y-0 h-svh hidden md:block`, which in a captured
// card positions against the viewport rather than the card and depends on
// useIsMobile()'s matchMedia settling. "none" is the same component, rendered
// in flow, so the composition is what actually gets verified.
//
// The inline heights are a preview-LAYOUT fix, not a restyle. Sidebar carries
// `h-full`, but a percentage height against SidebarProvider's `min-h-svh` (a
// MIN, not a definite height) resolves to auto, so the rail stops at its
// content instead of running the full shell. Giving the provider a definite
// height makes `h-full` resolve on its own -- no override on the component
// itself. SidebarInset's own `min-h-svh` is zeroed for the same reason: left
// alone it drives the row past the captured card box and clips the footer.
// In the app a definite-height ancestor does all of this for free.

export const AppShell = () => (
	<SidebarProvider style={{ height: 400, minHeight: 400 }}>
		<Sidebar collapsible="none">
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2 py-2">
					<Boxes className="h-5 w-5" />
					<span className="text-sm font-semibold font-grotesk">
						Trixode Studios
					</span>
				</div>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton isActive>
									<FlaskConical />
									<span>Fusor Simulation</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>4</SidebarMenuBadge>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Boxes />
									<span>Morphika</span>
								</SidebarMenuButton>
								<SidebarMenuBadge>12</SidebarMenuBadge>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Palette />
									<span>Brand System</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Studio</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Users />
									<span>People</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<LifeBuoy />
							<span>Support</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
		<SidebarInset style={{ minHeight: 0 }}>
			<div className="flex items-center gap-2 border-b px-4 py-3">
				<SidebarTrigger />
				<span className="text-sm font-semibold font-grotesk">
					Fusor Simulation
				</span>
			</div>
			<div className="p-6 space-y-2">
				<h3 className="text-lg font-semibold font-grotesk">Run 118</h3>
				<p className="text-sm text-muted-foreground">
					262,144 particles, 16.6 ms per frame, deterministic seed.
				</p>
			</div>
		</SidebarInset>
	</SidebarProvider>
)

export const WithSubmenu = () => (
	<SidebarProvider style={{ height: 400, minHeight: 400 }}>
		<Sidebar collapsible="none">
			<SidebarHeader>
				<div className="flex items-center gap-2 px-2 py-2">
					<FlaskConical className="h-5 w-5" />
					<span className="text-sm font-semibold font-grotesk">
						Fusor Simulation
					</span>
				</div>
			</SidebarHeader>
			<SidebarSeparator />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Build</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Boxes />
									<span>Targets</span>
								</SidebarMenuButton>
								<SidebarMenuSub>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton isActive>
											<span>native / CMake</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>wasm / emscripten</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton>
											<span>headless / CI</span>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton>
									<Settings />
									<span>Run configuration</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
		<SidebarInset style={{ minHeight: 0 }}>
			<div className="p-6 space-y-2">
				<h3 className="text-lg font-semibold font-grotesk">Targets</h3>
				<p className="text-sm text-muted-foreground">
					The native target builds through CMake and fetches raylib 5.5; the
					wasm target bootstraps emsdk on first run.
				</p>
			</div>
		</SidebarInset>
	</SidebarProvider>
)
