import { memo } from "react";
import { useProviderHome } from "@/hooks/providers/useProviderHome";
import { revColumns } from "@/components/ui/table/column";
import { DataTable } from "@/components/ui/table/data-table";
import { DonutChart } from "@/components/ui/donut-chart/donut-chart";
import Hero from "@/components/cards/hero";

function SecondSection() {
	const { resultRevTable, provinceLoading, filterDataRevNational } =
		useProviderHome();

	if (provinceLoading) return <p>Loading</p>;

	return (
		<section className="grid grid-cols-3 gap-4 relative w-full min-h-screen p-6">
			<Hero
				title="Revitalisasi Sekolah Berdasarkan Provinsi"
				description="Daftar jumlah sekolah yang direvitalisasi beserta anggaran"
				className="col-span-2">
				<DataTable data={resultRevTable} columns={revColumns} />
			</Hero>
			<Hero
				title="Anggaran Revitalisasi - Nasional"
				description="Per-tingkat pendidikan"
				className="col-span-1 justify-center items-center">
				<DonutChart data={filterDataRevNational} />
			</Hero>
		</section>
	);
}

export default memo(SecondSection);
