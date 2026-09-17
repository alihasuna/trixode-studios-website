import { HexagonLogo, ThemeToggle } from "my-v0-project"

// Every surface of this button is a `dark:` utility (bg-black/5 dark:bg-white/5,
// border-black/10 dark:border-white/10, text-slate-600 dark:text-slate-300) and
// compiled.css emits dark variants as `:is(.dark *)`. The design surface has no
// .dark ancestor, so unwrapped the toggle renders black-on-black — invisible.
// The `.dark` wrapper reproduces the shipped condition (app/layout.tsx runs
// next-themes with defaultTheme="dark", i.e. html.dark). See
// .design-sync/learnings/display-nav.md — the card root should carry it.
//
// Honest caveat: with no ThemeProvider in the card, next-themes reports
// resolvedTheme === undefined, so isDark is false and the button shows the
// Moon ("switch to dark") affordance. In the real app it shows the Sun.

export const Default = () => (
	<div className="dark flex items-center gap-4">
		<ThemeToggle />
	</div>
)

export const WithLabel = () => (
	<div className="dark flex items-center gap-3">
		<ThemeToggle />
		<div className="flex flex-col">
			<span className="text-sm font-medium">Appearance</span>
			<span className="text-xs text-muted-foreground">
				Flashes a radial wash, then swaps the theme after 150ms.
			</span>
		</div>
	</div>
)

export const InNavBar = () => (
	<div className="dark flex w-full items-center justify-between gap-4 border-b pb-4">
		<div className="flex items-center gap-2">
			<HexagonLogo size={28} />
			<span className="font-grotesk text-sm font-bold tracking-tight">
				Trixode
			</span>
		</div>
		<div className="flex items-center gap-4">
			<span className="text-sm text-muted-foreground">Work</span>
			<span className="text-sm text-muted-foreground">Pricing</span>
			<ThemeToggle />
		</div>
	</div>
)

export const SettingsRow = () => (
	<div className="dark flex w-full items-center justify-between gap-4 border-b pb-4">
		<div className="flex flex-col">
			<span className="text-sm font-medium">Theme</span>
			<span className="text-xs text-muted-foreground">
				Dark is the default across the site.
			</span>
		</div>
		<ThemeToggle />
	</div>
)
