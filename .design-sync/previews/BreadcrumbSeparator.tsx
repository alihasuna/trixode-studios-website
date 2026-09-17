import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "my-v0-project"

// BreadcrumbSeparator is [RENDER_THIN] with no props ONLY because it needs a
// list context to inherit text-sm / text-muted-foreground and a 14px svg box
// (`[&>svg]:w-3.5 [&>svg]:h-3.5`). It is not broken: rendered inside a
// BreadcrumbList it paints its default ChevronRight, and it accepts arbitrary
// children as a glyph override. Every cell keeps the valid <ol><li> nesting.

export const Default = () => (
	<Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>Fusor Simulation</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
)

export const Glyphs = () => (
	<div className="flex flex-col gap-4">
		<div className="flex items-center gap-3">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				default
			</span>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Work</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Morphika</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				slash
			</span>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Work</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>/</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Morphika</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				middot
			</span>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/">Work</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator>·</BreadcrumbSeparator>
					<BreadcrumbItem>
						<BreadcrumbPage>Morphika</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	</div>
)

export const DeepPath = () => (
	<Breadcrumb>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/blog?tag=simulation">Simulation</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>Deterministic particle solvers</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumb>
)
