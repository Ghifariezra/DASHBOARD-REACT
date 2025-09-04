import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

type Data = {
	name: string;
	value: number;
};

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

export function DonutChart({ data }: { data: Data[] }) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					dataKey="value"
					nameKey="name"
					cx="50%"
					cy="50%"
					innerRadius={70}
					outerRadius={100}
					fill="#8884d8"
					paddingAngle={8}
					label
					fontSize={12}>
					{data.map((_, index) => (
						<Cell
							key={index}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</ResponsiveContainer>
	);
}
