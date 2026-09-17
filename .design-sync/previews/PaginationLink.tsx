import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "my-v0-project"

// PaginationLink is [RENDER_THIN] with no children: it is an <a> carrying
// buttonVariants({ variant: isActive ? "outline" : "ghost", size }) and a ghost
// pill with no label paints literally nothing. The real axis is isActive
// (outline border + bg-background vs transparent ghost) crossed with `size`.
// Both cells that need list semantics keep the Pagination > ul > li nesting.

export const ActiveState = () => (
	<div className="flex flex-col gap-4">
		<div className="flex items-center gap-3">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				default
			</span>
			<Pagination className="w-fit" style={{ marginLeft: 0, marginRight: 0 }}>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#">4</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
		<div className="flex items-center gap-3">
			<span className="text-xs uppercase tracking-widest text-muted-foreground">
				isActive
			</span>
			<Pagination className="w-fit" style={{ marginLeft: 0, marginRight: 0 }}>
				<PaginationContent>
					<PaginationItem>
						<PaginationLink href="#" isActive>
							4
						</PaginationLink>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	</div>
)

export const Sizes = () => (
	<div className="flex flex-col gap-4">
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationLink href="#" size="icon">
						1
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="icon" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="sm">
						Page 3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="default" isActive>
						Page 4
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" size="lg">
						Last page
					</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
		<span className="text-xs uppercase tracking-widest text-muted-foreground">
			icon · icon active · sm · default active · lg
		</span>
	</div>
)

export const PageRun = () => (
	<Pagination>
		<PaginationContent>
			{[1, 2, 3, 4, 5, 6].map((n) => (
				<PaginationItem key={n}>
					<PaginationLink href={`/blog?page=${n}`} isActive={n === 3}>
						{n}
					</PaginationLink>
				</PaginationItem>
			))}
		</PaginationContent>
	</Pagination>
)

export const LabelledLinks = () => (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationLink href="/projects" size="default">
					Projects
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="/pricing" size="default" isActive>
					Pricing
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="/careers" size="default">
					Careers
				</PaginationLink>
			</PaginationItem>
		</PaginationContent>
	</Pagination>
)
