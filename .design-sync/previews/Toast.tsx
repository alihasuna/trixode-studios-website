import * as React from "react"
import {
	Toast,
	ToastAction,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "my-v0-project"

// Toast is an app-level singleton driven by useToast(), so there is no
// imperative API to fire here. It is composed statically instead — which is
// legitimate: Radix portals every <Toast> into whatever element ToastViewport
// mounts, so a Provider + Viewport + Toast tree is the real render path.
//
// Two deliberate overrides, both required for a static card:
//  - ToastViewport is `fixed ... p-4` in toast.tsx. .ds-cell sets
//    transform:translateZ(0) (so `fixed` is contained by the cell) AND
//    overflow:hidden, which would clip the toast and leave the cell at zero
//    height. `static p-0` (cn() is twMerge, so it drops fixed/p-4) keeps the
//    toast in normal flow.
//  - duration={Infinity} on the Provider stops the 5s auto-dismiss from
//    racing the screenshot (toast.tsx's Root honours the Infinity guard).
// ToastClose is `opacity-0 group-hover:opacity-100` and hover never fires in a
// static capture, so it is forced to opacity-100 to be verifiable at all.

const Stage = ({ children }: { children: React.ReactNode }) => (
	<ToastProvider duration={Infinity} swipeDirection="right">
		{children}
		<ToastViewport className="static p-0 gap-3" />
	</ToastProvider>
)

export const Default = () => (
	<Stage>
		<Toast>
			<div className="grid gap-1">
				<ToastTitle>Build published</ToastTitle>
				<ToastDescription>
					Morphika v0.9.2 is live on iad1.
				</ToastDescription>
			</div>
			<ToastClose className="opacity-100" />
		</Toast>
	</Stage>
)

export const WithAction = () => (
	<Stage>
		<Toast>
			<div className="grid gap-1">
				<ToastTitle>Project archived</ToastTitle>
				<ToastDescription>
					Adriftwood Brand System moved out of the active board.
				</ToastDescription>
			</div>
			<ToastAction altText="Undo archiving the project">Undo</ToastAction>
			<ToastClose className="opacity-100" />
		</Toast>
	</Stage>
)

export const Destructive = () => (
	<Stage>
		<Toast variant="destructive">
			<div className="grid gap-1">
				<ToastTitle>Deploy failed</ToastTitle>
				<ToastDescription>
					The fusor WASM bundle exceeded the 4 MB edge limit.
				</ToastDescription>
			</div>
			<ToastAction altText="Retry the deploy">Retry</ToastAction>
			<ToastClose className="opacity-100" />
		</Toast>
	</Stage>
)

export const Stacked = () => (
	<Stage>
		<Toast>
			<div className="grid gap-1">
				<ToastTitle>Message sent</ToastTitle>
				<ToastDescription>
					We reply to every enquiry within one business day.
				</ToastDescription>
			</div>
			<ToastClose className="opacity-100" />
		</Toast>
		<Toast variant="destructive">
			<div className="grid gap-1">
				<ToastTitle>Newsletter signup failed</ToastTitle>
				<ToastDescription>
					Resend rejected the address. Check the domain and try again.
				</ToastDescription>
			</div>
			<ToastClose className="opacity-100" />
		</Toast>
	</Stage>
)
