import {
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Area,
	Bar,
	Line,
	ResponsiveContainer,
} from "recharts";
import type { ChartData } from "@/types/chart";

export function ComposedChartComponent({ data }: { data: ChartData[] }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<ComposedChart width={730} height={250} data={data}>
				<XAxis dataKey="name" />
				{/* Sumbu Y pertama untuk 'uv' (Anggaran) */}
				<YAxis yAxisId="left" orientation="left" stroke="#ff7300" />
				{/* Sumbu Y kedua untuk 'pv' dan 'amt' (Jumlah Sekolah) */}
				<YAxis yAxisId="right" orientation="right" stroke="#413ea0" />

				<Tooltip />
				<Legend />
				<CartesianGrid stroke="#f5f5f5" />

				{/* Kaitkan Bar dengan Y-Axis kanan */}
				<Bar yAxisId="right" dataKey="pv" barSize={20} fill="#413ea0" />

				{/* Kaitkan Area dengan Y-Axis kanan */}
				<Area
					yAxisId="right"
					type="monotone"
					dataKey="amt"
					fill="#8884d8"
					stroke="#8884d8"
				/>

				{/* Kaitkan Line dengan Y-Axis kiri */}
				<Line
					yAxisId="left"
					type="monotone"
					dataKey="uv"
					stroke="#ff7300"
				/>
			</ComposedChart>
		</ResponsiveContainer>
	);
}
