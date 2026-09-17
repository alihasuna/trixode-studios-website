// Tailwind config used ONLY by design-sync to compile a static stylesheet.
// Extends the site's real config and adds the authored preview sources to `content`,
// so utility classes written in .design-sync/previews/*.tsx actually get generated.
// Run from the repo root (content globs are cwd-relative).
import type { Config } from "tailwindcss";
import base from "../tailwind.config";

const config: Config = {
	...base,
	content: [
		...((base.content as string[]) ?? []),
		"./.design-sync/previews/**/*.{js,ts,jsx,tsx}",
	],
};

export default config;
