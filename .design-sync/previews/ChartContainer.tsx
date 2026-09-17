import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "my-v0-project"
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "recharts"

// ChartContainer hardcodes a recharts <ResponsiveContainer>, which measures its
// parent through a ResizeObserver and renders nothing until it has a definite
// box. The component's own `aspect-video` only derives height from an inherited
// width, so every cell states width AND height inline — that is the single
// lever that makes a static capture deterministic. recharts also animates
// every mark in on mount (1.5s), which the screenshot caught mid-draw as a
// half-rendered line/area - hence isAnimationActive={false} on every series.
//
// Series colours come from the `config` prop: ChartStyle emits
// `[data-chart=<id>] { --color-<key>: … }` (its light-theme selector has an
// empty prefix, so it resolves without a .dark ancestor), and the marks read
// them back as var(--color-<key>). That is the token path a DS author uses.

const runsConfig = {
	native: { label: "Native", color: "hsl(217 91% 60%)" },
	wasm: { label: "WebAssembly", color: "hsl(258 90% 66%)" },
}

const runs = [
	{ month: "Mar", native: 186, wasm: 120 },
	{ month: "Apr", native: 205, wasm: 152 },
	{ month: "May", native: 237, wasm: 191 },
	{ month: "Jun", native: 173, wasm: 224 },
	{ month: "Jul", native: 289, wasm: 268 },
	{ month: "Aug", native: 314, wasm: 341 },
]

const frameConfig = {
	frame: { label: "Frame time (ms)", color: "hsl(188 94% 43%)" },
}

const frames = [
	{ t: "0s", frame: 16.4 },
	{ t: "5s", frame: 15.1 },
	{ t: "10s", frame: 18.9 },
	{ t: "15s", frame: 14.2 },
	{ t: "20s", frame: 13.7 },
	{ t: "25s", frame: 16.8 },
	{ t: "30s", frame: 12.9 },
]

export const Bars = () => (
	<ChartContainer config={runsConfig} style={{ width: 560, height: 300 }}>
		<BarChart data={runs}>
			<CartesianGrid vertical={false} />
			<XAxis dataKey="month" tickLine={false} axisLine={false} />
			<YAxis tickLine={false} axisLine={false} width={32} />
			<ChartTooltip content={<ChartTooltipContent />} />
			<Bar
				dataKey="native"
				fill="var(--color-native)"
				radius={4}
				isAnimationActive={false}
			/>
			<Bar
				dataKey="wasm"
				fill="var(--color-wasm)"
				radius={4}
				isAnimationActive={false}
			/>
		</BarChart>
	</ChartContainer>
)

export const WithLegend = () => (
	<ChartContainer config={runsConfig} style={{ width: 560, height: 320 }}>
		<AreaChart data={runs}>
			<CartesianGrid vertical={false} />
			<XAxis dataKey="month" tickLine={false} axisLine={false} />
			<YAxis tickLine={false} axisLine={false} width={32} />
			<ChartLegend content={<ChartLegendContent />} />
			<Area
				dataKey="native"
				type="monotone"
				stroke="var(--color-native)"
				fill="var(--color-native)"
				fillOpacity={0.2}
				strokeWidth={2}
				isAnimationActive={false}
			/>
			<Area
				dataKey="wasm"
				type="monotone"
				stroke="var(--color-wasm)"
				fill="var(--color-wasm)"
				fillOpacity={0.2}
				strokeWidth={2}
				isAnimationActive={false}
			/>
		</AreaChart>
	</ChartContainer>
)

export const SingleSeriesLine = () => (
	<ChartContainer config={frameConfig} style={{ width: 560, height: 260 }}>
		<LineChart data={frames}>
			<CartesianGrid vertical={false} />
			<XAxis dataKey="t" tickLine={false} axisLine={false} />
			<YAxis tickLine={false} axisLine={false} width={32} domain={[10, 20]} />
			<Line
				dataKey="frame"
				type="monotone"
				stroke="var(--color-frame)"
				strokeWidth={2}
				dot={{ r: 3, fill: "var(--color-frame)" }}
				isAnimationActive={false}
			/>
		</LineChart>
	</ChartContainer>
)
