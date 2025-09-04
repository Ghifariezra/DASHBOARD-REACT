import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { BarChartType } from "@/types/chart";

export function BarChartComponent({ data }: { data: BarChartType[] }) {
	return (
		<BarChart width={730} height={250} data={data}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis
				dataKey="name"
				label={{ value: "Jenjang Pendidikan", position: "bottomRight" }}
			/>
			<YAxis
				label={{
					value: "Jumlah Revitalisasi",
					angle: -90,
					position: "insideLeft",
				}}
			/>
			<Tooltip />
			<Legend />
			<Bar dataKey="pv" fill="#8884d8" />
			<Bar dataKey="uv" fill="#82ca9d" />
		</BarChart>
	);
}
