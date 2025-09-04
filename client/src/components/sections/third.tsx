import Hero from "@/components/cards/hero";
import { memo, useMemo } from "react";
import { useProviderHome } from "@/hooks/providers/useProviderHome";
import { ComposedChartComponent } from "@/components/ui/donut-chart/composed-chart";
import type { DataKab } from "@/types/provinces";
import type { ChartData } from "@/types/chart";

function ThirdSection() {
	const { findRevByKab } = useProviderHome();

	const data: ChartData[] = useMemo(() => {
		return Object.values(findRevByKab).map((item: DataKab) => {
			return {
				name: item.Kabupaten,
				uv: Number(item.TotalAnggaran),
				pv: Number(item.TotalSekolah),
				amt: Number(item.TotalSekolah),
			};
		});
	}, [findRevByKab]);

	return (
		<section className="flex relative w-full min-h-screen p-6">
			<Hero
				title="Revitalisasi Sekolah Berdasarkan Anggaran Revitalisasi di seluruh Kabupaten"
				description="Daftar jumlah sekolah yang direvitalisasi beserta anggaran"
				className="col-span-2">
				<div className="h-[500px]">
					{" "}
					{/* Bungkus komponen dengan div yang memiliki tinggi tetap */}
					<ComposedChartComponent data={data} />
				</div>
			</Hero>
		</section>
	);
}

export default memo(ThirdSection);
