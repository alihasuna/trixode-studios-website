import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "my-v0-project"

// NavigationMenuContent is `md:absolute` and NavigationMenuViewport sits in an
// `absolute left-0 top-full` wrapper, so an OPEN menu contributes zero height
// and .ds-cell's overflow:hidden clips it. The open cells therefore reserve
// height with an inline minHeight — a card-framing concern, not a component
// one. The closed cell needs no such help and is the insurance render.
//
// Radix sets --radix-navigation-menu-viewport-height/width at runtime; those
// are the [TOKENS_MISSING] vars NOTES.md already triages.

export const Closed = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Work</NavigationMenuTrigger>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Studio</NavigationMenuTrigger>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink
					href="/pricing"
					className={navigationMenuTriggerStyle()}
				>
					Pricing
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink
					href="/contact"
					className={navigationMenuTriggerStyle()}
				>
					Contact
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
)

export const OpenWork = () => (
	<div className="relative" style={{ minHeight: 320 }}>
		<NavigationMenu defaultValue="work">
			<NavigationMenuList>
				<NavigationMenuItem value="work">
					<NavigationMenuTrigger>Work</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 w-[400px]">
							<li>
								<NavigationMenuLink href="/projects/morphika">
									<span className="text-sm font-medium">Morphika</span>
									<p className="text-sm text-muted-foreground">
										The operating layer for the AI-native company.
									</p>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="/projects/fusor">
									<span className="text-sm font-medium">
										Fusor Simulation
									</span>
									<p className="text-sm text-muted-foreground">
										Real-time plasma physics in C++17, shipped to WebAssembly.
									</p>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="/projects/brand-systems">
									<span className="text-sm font-medium">Brand Systems</span>
									<p className="text-sm text-muted-foreground">
										Token-level identity kits with slide and document templates.
									</p>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="studio">
					<NavigationMenuTrigger>Studio</NavigationMenuTrigger>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/pricing"
						className={navigationMenuTriggerStyle()}
					>
						Pricing
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</div>
)

export const OpenStudio = () => (
	<div className="relative" style={{ minHeight: 280 }}>
		<NavigationMenu defaultValue="studio">
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink
						href="/"
						className={navigationMenuTriggerStyle()}
					>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="studio">
					<NavigationMenuTrigger>Studio</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid grid-cols-2 gap-3 p-4 w-[400px]">
							<li>
								<NavigationMenuLink href="/about">
									<span className="text-sm font-medium">About</span>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="/people">
									<span className="text-sm font-medium">People</span>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="/careers">
									<span className="text-sm font-medium">Careers</span>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink href="/blog">
									<span className="text-sm font-medium">Journal</span>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	</div>
)

export const LinksOnly = () => (
	<NavigationMenu>
		<NavigationMenuList>
			{["Work", "Studio", "Pricing", "Journal", "Contact"].map((label) => (
				<NavigationMenuItem key={label}>
					<NavigationMenuLink
						href={`/${label.toLowerCase()}`}
						className={navigationMenuTriggerStyle()}
					>
						{label}
					</NavigationMenuLink>
				</NavigationMenuItem>
			))}
		</NavigationMenuList>
	</NavigationMenu>
)
