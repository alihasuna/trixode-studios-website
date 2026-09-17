import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "my-v0-project"

// Command is the only non-overlay in this batch -- it renders inline, so it
// only needs a width and a surface. Group labels come from `heading`, not from
// children (a missing heading renders silently unlabelled).

export const CommandPalette = () => (
	<div style={{ maxWidth: 520, margin: "0 auto" }}>
		<Command className="rounded-lg border shadow-md">
			<CommandInput placeholder="Search projects, docs and actions..." />
			<CommandList>
				<CommandEmpty>No matching results.</CommandEmpty>
				<CommandGroup heading="Projects">
					<CommandItem>
						Morphika
						<CommandShortcut>&#8984;1</CommandShortcut>
					</CommandItem>
					<CommandItem>
						Fusor simulation
						<CommandShortcut>&#8984;2</CommandShortcut>
					</CommandItem>
					<CommandItem>
						Adriftwood brand system
						<CommandShortcut>&#8984;3</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Actions">
					<CommandItem>
						Start a new engagement
						<CommandShortcut>&#8984;N</CommandShortcut>
					</CommandItem>
					<CommandItem>
						Invite a collaborator
						<CommandShortcut>&#8984;I</CommandShortcut>
					</CommandItem>
					<CommandItem disabled>Archive workspace</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	</div>
)
