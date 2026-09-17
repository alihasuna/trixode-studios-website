import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "my-v0-project"

// Action/Cancel already carry buttonVariants() from the source -- they are the
// buttons, so nothing is nested inside them. `defaultOpen` is what makes the
// portaled content visible in a static card.

export const DestructiveConfirm = () => (
	<AlertDialog defaultOpen>
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Delete the fusor simulation build?</AlertDialogTitle>
				<AlertDialogDescription>
					This removes the WebAssembly artifact and all 128 cached frames.
					Everyone on the Westcom engagement loses access immediately, and the
					build cannot be recovered.
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Keep build</AlertDialogCancel>
				<AlertDialogAction>Delete build</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
)
