#!/usr/bin/env node
// Generates one .design-sync/docs/<Name>.md per exported component.
//
// Why: with a flat components/ui/ directory and no dist, the converter's group
// heuristic (last meaningful src path segment) yields "general" for all 248
// components -- one giant unbrowsable group in the Design System pane. The
// converter reads `category` from a per-component doc's frontmatter to set the
// group, and binds docs by slug from cfg.docsDir, so generating these files
// groups everything without a 248-entry docsMap (which the skill warns rots).
//
// Family is assigned per SOURCE FILE, so every export of dialog.tsx lands in
// "Overlays & Menus" together. Regenerate with: node .design-sync/build-docs.mjs

import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const SRC = join(repoRoot, "components/ui");
const OUT = join(here, "docs");

// source file (without extension) -> Design System pane group
const FAMILY = {
	button: "Actions",
	toggle: "Actions",
	"toggle-group": "Actions",

	form: "Forms",
	input: "Forms",
	"input-otp": "Forms",
	textarea: "Forms",
	label: "Forms",
	checkbox: "Forms",
	"radio-group": "Forms",
	select: "Forms",
	switch: "Forms",
	slider: "Forms",

	// Split three ways: a single "Overlays & Menus" was 106 of 246 components --
	// 43% of the library in one unbrowsable group.
	dialog: "Dialogs & Sheets",
	"alert-dialog": "Dialogs & Sheets",
	sheet: "Dialogs & Sheets",
	drawer: "Dialogs & Sheets",

	"context-menu": "Menus",
	"dropdown-menu": "Menus",
	menubar: "Menus",
	command: "Menus",

	popover: "Popovers & Tooltips",
	"hover-card": "Popovers & Tooltips",
	tooltip: "Popovers & Tooltips",

	accordion: "Layout & Disclosure",
	collapsible: "Layout & Disclosure",
	tabs: "Layout & Disclosure",
	carousel: "Layout & Disclosure",
	resizable: "Layout & Disclosure",
	"scroll-area": "Layout & Disclosure",
	separator: "Layout & Disclosure",
	"aspect-ratio": "Layout & Disclosure",
	sidebar: "Layout & Disclosure",

	table: "Data Display",
	chart: "Data Display",
	avatar: "Data Display",
	badge: "Data Display",
	card: "Data Display",
	skeleton: "Data Display",
	progress: "Data Display",

	alert: "Feedback",
	toast: "Feedback",
	toaster: "Feedback",
	sonner: "Feedback",

	breadcrumb: "Navigation",
	pagination: "Navigation",
	"navigation-menu": "Navigation",

	HexagonLogo: "Brand",
	ThemeToggle: "Brand",
	CustomCursor: "Brand",
	WelcomeLoader: "Brand",
};

function exportsOf(src) {
	const names = new Set();
	for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) {
		for (let part of m[1].split(",")) {
			part = part.trim();
			if (!part) continue;
			const as = part.split(/\s+as\s+/);
			const n = (as[1] || as[0]).trim();
			if (/^[A-Z][A-Za-z0-9]*$/.test(n)) names.add(n);
		}
	}
	for (const m of src.matchAll(/export\s+(?:const|function|class)\s+([A-Z][A-Za-z0-9]*)/g)) {
		names.add(m[1]);
	}
	return names;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const unmapped = new Set();
let written = 0;
const byGroup = {};

for (const f of readdirSync(SRC)) {
	if (!/\.tsx?$/.test(f)) continue;
	const stem = basename(f).replace(/\.tsx?$/, "");
	const group = FAMILY[stem];
	if (!group) {
		unmapped.add(stem);
		continue;
	}
	const src = readFileSync(join(SRC, f), "utf8");
	for (const name of exportsOf(src)) {
		// The real import path an engineer writes in this app -- there is no
		// published package, components are imported via the @/ alias.
		const body = `---
category: ${group}
---

# ${name}

\`\`\`tsx
import { ${name} } from "@/components/ui/${stem}"
\`\`\`
`;
		writeFileSync(join(OUT, `${name}.md`), body);
		written++;
		(byGroup[group] ??= []).push(name);
	}
}

for (const [g, names] of Object.entries(byGroup).sort()) {
	console.error(`  ${g.padEnd(22)} ${names.length}`);
}
console.error(`[docs] wrote ${written} docs to .design-sync/docs/`);
if (unmapped.size) {
	console.error(`[docs] unmapped source files (no category -> stay "general"): ${[...unmapped].sort().join(", ")}`);
}
