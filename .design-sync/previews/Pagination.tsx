import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "my-v0-project"

// Pagination is `mx-auto flex w-full justify-center` and paints nothing itself;
// the pills come from PaginationLink, which reuses buttonVariants (outline when
// isActive, ghost otherwise). Full compound tree in every cell — that is the
// only render that verifies PaginationContent / PaginationItem too.

export const Default = () => (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationPrevious href="#" />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">1</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#" isActive>
					2
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">3</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationNext href="#" />
			</PaginationItem>
		</PaginationContent>
	</Pagination>
)

export const WithEllipsis = () => (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationPrevious href="#" />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">1</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationEllipsis />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">7</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#" isActive>
					8
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">9</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationEllipsis />
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">24</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationNext href="#" />
			</PaginationItem>
		</PaginationContent>
	</Pagination>
)

export const FirstPage = () => (
	<Pagination>
		<PaginationContent>
			<PaginationItem>
				<PaginationLink href="#" isActive>
					1
				</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">2</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationLink href="#">3</PaginationLink>
			</PaginationItem>
			<PaginationItem>
				<PaginationNext href="#" />
			</PaginationItem>
		</PaginationContent>
	</Pagination>
)

export const BlogFooter = () => (
	<div className="flex flex-col gap-4">
		<span className="text-xs uppercase tracking-widest text-muted-foreground">
			Journal — page 3 of 12
		</span>
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="/blog?page=2" />
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="/blog?page=2">2</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="/blog?page=3" isActive>
						3
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="/blog?page=4">4</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="/blog?page=4" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	</div>
)
